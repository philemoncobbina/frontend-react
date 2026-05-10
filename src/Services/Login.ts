import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
  };
}

interface GoogleLoginResponse {
  success: boolean;
  email: string;
  created: boolean;
  access: string;
  refresh?: string;
  first_name?: string;
  last_name?: string;
  error?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
  user?: LoginResponse['user'] | { email: string; first_name?: string; last_name?: string };
}

interface AuthUser {
  id: number;
  email: string;
  role?: string;
  first_name?: string;
  last_name?: string;
}

interface SessionCache {
  user: AuthUser;
  validUntil: number; // epoch ms
}

// ---------------------------------------------------------------------------
// In-memory session cache
// ---------------------------------------------------------------------------
// Why in-memory and not localStorage?
//   - Survives re-renders and route changes without any async work.
//   - Cleared automatically on page refresh (desired: forces re-validation).
//   - Not accessible to XSS via document.cookie or storage APIs.
//
// TTL is set to 4 minutes so it expires BEFORE the 5-minute Cache-Control
// header on the server, keeping the two layers in sync.
// ---------------------------------------------------------------------------

const SESSION_TTL_MS = 4 * 60 * 1000; // 4 minutes
let _sessionCache: SessionCache | null = null;

const getCachedSession = (): AuthUser | null => {
  if (_sessionCache && Date.now() < _sessionCache.validUntil) {
    return _sessionCache.user;
  }
  _sessionCache = null;
  return null;
};

const setCachedSession = (user: AuthUser): void => {
  _sessionCache = { user, validUntil: Date.now() + SESSION_TTL_MS };
};

const clearCachedSession = (): void => {
  _sessionCache = null;
};

// ---------------------------------------------------------------------------
// JWT helpers — decode WITHOUT verifying (signature is verified server-side)
// ---------------------------------------------------------------------------
// Why decode locally?
//   - Zero network calls for basic expiry checks.
//   - The token was issued by your server and stored securely; local decode
//     is only used to check expiry, never to grant access.
// ---------------------------------------------------------------------------

interface JWTPayload {
  exp: number;
  user_id?: number;
  email?: string;
  role?: string;
}

const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const payload = token.split('.')[1];
    // atob + replace handles URL-safe base64 padding
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload?.exp) return true;
  // Add a 30-second buffer so we refresh slightly before true expiry
  return Date.now() >= (payload.exp - 30) * 1000;
};

// ---------------------------------------------------------------------------
// Token storage helpers
// ---------------------------------------------------------------------------

export const getAuthHeaders = (): { Authorization: string } => {
  const accessToken = localStorage.getItem('access_token');
  return { Authorization: `Bearer ${accessToken}` };
};

export const getCurrentUser = (): AuthUser | null => {
  // Always check the in-memory cache first
  const cached = getCachedSession();
  if (cached) return cached;

  try {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
// Silent token refresh
// ---------------------------------------------------------------------------
// Called automatically when the access token is expired but a refresh token
// exists. This is the ONLY time we need a network call for auth state.
// ---------------------------------------------------------------------------

let _refreshPromise: Promise<boolean> | null = null;

const silentRefresh = async (): Promise<boolean> => {
  // Deduplicate: if a refresh is already in flight, wait for that one.
  // This prevents multiple simultaneous expired-token requests from all
  // triggering their own refresh (the "thundering herd" problem).
  if (_refreshPromise) return _refreshPromise;

  _refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken || refreshToken === 'google_refresh_placeholder') return false;

      const response = await axios.post<{ access: string }>(
        `${API_BASE_URL}/token/refresh/`,
        { refresh: refreshToken }
      );

      const newAccessToken = response.data.access;
      localStorage.setItem('access_token', newAccessToken);

      // Update the cache with the refreshed token's payload
      const payload = decodeJWT(newAccessToken);
      if (payload) {
        const currentUser = getCurrentUser();
        if (currentUser) setCachedSession(currentUser);
      }

      console.log('Silent token refresh successful');
      return true;
    } catch (error) {
      console.error('Silent refresh failed — clearing session', error);
      clearLocalSession();
      return false;
    } finally {
      _refreshPromise = null;
    }
  })();

  return _refreshPromise;
};

// ---------------------------------------------------------------------------
// Core auth check — the function called on every route change
// ---------------------------------------------------------------------------
// Decision tree:
//   1. No token in storage?           → logged out, no network call
//   2. In-memory cache still valid?   → logged in, no network call  ← 99% of calls
//   3. Token expired + refresh exists → silent refresh, 1 network call
//   4. Token valid, cache stale?      → validate with server, cache result
// ---------------------------------------------------------------------------

export const isLoggedIn = async (): Promise<{ loggedIn: boolean; user?: AuthUser }> => {
  const accessToken = localStorage.getItem('access_token');

  // 1. No token — bail immediately, zero network calls
  if (!accessToken) return { loggedIn: false };

  // 2. In-memory cache hit — return instantly, zero network calls
  const cachedUser = getCachedSession();
  if (cachedUser) return { loggedIn: true, user: cachedUser };

  // 3. Token expired — try silent refresh before giving up
  if (isTokenExpired(accessToken)) {
    const refreshed = await silentRefresh();
    if (!refreshed) return { loggedIn: false };
    // After a successful refresh, fall through to server validation below
    // to re-populate the cache with fresh user data
  }

  // 4. Token looks valid but cache is cold (e.g. first load after page refresh)
  //    — make ONE server call and cache the result for SESSION_TTL_MS
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<{ authenticated: boolean; user: AuthUser }>(
      `${API_BASE_URL}/session-check/`,
      { headers }
    );

    if (response.data.authenticated) {
      setCachedSession(response.data.user);
      // Keep localStorage in sync so getCurrentUser() works synchronously
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
      return { loggedIn: true, user: response.data.user };
    }
  } catch (error: any) {
    console.error('Session validation failed:', error.response?.data || error.message);

    // Network error (offline, server down) — trust the token if it's not expired
    if (!error.response) {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          console.warn('Offline fallback: using cached user data');
          // Don't cache this — we want to re-validate as soon as we're online
          return { loggedIn: true, user };
        } catch { /* fall through */ }
      }
    }
  }

  return { loggedIn: false };
};

// Synchronous check for immediate UI decisions (guards, conditional renders)
// Does NOT hit the network — use isLoggedIn() when you need certainty
export const isAuthenticated = (): boolean => {
  // Check in-memory cache first (fastest)
  if (getCachedSession()) return true;
  // Fall back to token + user_data existence
  return !!(localStorage.getItem('access_token') && localStorage.getItem('user_data'));
};

// ---------------------------------------------------------------------------
// Login / Logout
// ---------------------------------------------------------------------------

export const login = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login/`, { email, password });
    const { access_token, refresh_token, user } = response.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user_data', JSON.stringify(user));
    localStorage.setItem('auth_method', 'regular');

    // Populate cache immediately so the next isLoggedIn() call is instant
    setCachedSession(user);

    return { success: true, user };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.response?.data?.message || 'Login failed';
    return { success: false, error: errorMessage };
  }
};

const clearLocalSession = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_data');
  localStorage.removeItem('auth_method');
  clearCachedSession();
};

export const logout = async (navigate: ReturnType<typeof useNavigate>): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/logout-auth/`, {}, { headers: getAuthHeaders() });
  } catch (error: any) {
    console.error('Logout API call failed:', error.response?.data || error.message);
  } finally {
    clearLocalSession();
    navigate('/');
  }
};

// ---------------------------------------------------------------------------
// Google Sign-In
// ---------------------------------------------------------------------------

export const googleSignIn = async (access_token: string): Promise<LoginResult> => {
  try {
    const serverResponse = await axios.post<GoogleLoginResponse>(
      `${API_BASE_URL}/google-signin/`,
      { access_token },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { access: serverAccessToken, refresh: serverRefreshToken, email, success, error, first_name, last_name } =
      serverResponse.data;

    if (!success || !serverAccessToken) {
      return { success: false, error: error || 'Google Sign-In failed' };
    }

    const userData: AuthUser = { id: 0, email, first_name, last_name };

    localStorage.setItem('access_token', serverAccessToken);
    localStorage.setItem('refresh_token', serverRefreshToken || 'google_refresh_placeholder');
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('auth_method', 'google');

    setCachedSession(userData);

    return { success: true, user: userData };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Google Sign-In failed. Please try again.',
    };
  }
};

export const useGoogleSignInHandler = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  return useGoogleLogin({
    onSuccess: async (codeResponse) => {
      if (!codeResponse.access_token) { onError('Access token not found'); return; }
      try {
        const result = await googleSignIn(codeResponse.access_token);
        if (result.success) setTimeout(onSuccess, 100);
        else onError(result.error || 'Google Sign-In failed');
      } catch {
        onError('An unexpected error occurred');
      }
    },
    onError: () => onError('Google Sign-In error. Please try again.'),
  });
};

export const fetchData = async (url: string) => {
  // Ensure token is fresh before any API call
  const accessToken = localStorage.getItem('access_token');
  if (accessToken && isTokenExpired(accessToken)) {
    await silentRefresh();
  }

  try {
    const response = await axios.get(url, { headers: getAuthHeaders() });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch data:', error.response?.data || error.message);
    throw error;
  }
};