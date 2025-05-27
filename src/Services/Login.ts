//Login.ts

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

// Base URL for all API requests
const API_BASE_URL = 'https://api.plvcmonline.uk/api';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface LoginResult {
  success: boolean;
  error?: string;
  user?: LoginResponse['user'];
}

export const login = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login/`, { email, password });
    const { access_token, refresh_token, user } = response.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return { success: true, user };
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.response && error.response.data) {
      errorMessage = error.response.data.error;
    }

    return { success: false, error: errorMessage };
  }
};

export const googleSignIn = async (access_token: string): Promise<LoginResult> => {
  try {
    console.log('Attempting Google Sign-In with token:', access_token);

    const serverResponse = await axios.post<{
      success: boolean;
      email: string;
      created: boolean;
      access: string; // Change this to match the backend key
      error?: string;
    }>(
      `${API_BASE_URL}/google-signin/`,
      { access_token: access_token },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    // Log the full response for debugging
    console.log('Google Sign-In Server Response:', serverResponse.data);

    // Rename destructured variable to avoid conflict
    const { access: serverAccessToken, email, success, error } = serverResponse.data; // Update to use 'access'

    if (!success) {
      return { 
        success: false, 
        error: error || 'Google Sign-In failed' 
      };
    }

    // Validation checks for tokens
    if (!serverAccessToken) {
      console.error('Missing access token in the response');
      return { 
        success: false, 
        error: 'Invalid tokens received from server' 
      };
    }

    // Store tokens in localStorage
    try {
      localStorage.setItem('access_token', serverAccessToken);

      console.log('Tokens successfully stored in localStorage');
    } catch (storageError) {
      console.error('Failed to store tokens in localStorage:', storageError);
      return { 
        success: false, 
        error: 'Unable to store authentication tokens' 
      };
    }

    return { 
      success: true, 
      user: { 
        email: email 
      } 
    };
  } catch (error: any) {
    console.error(
      'Google Sign-In Error:',
      'Full Error:', error,
      'Response Data:', error.response?.data,
      'Response Status:', error.response?.status
    );

    return { 
      success: false, 
      error: error.response?.data?.error || 'Google Sign-In failed. Please try again.' 
    };
  }
};

export const logout = async (navigate: ReturnType<typeof useNavigate>): Promise<void> => {
  try {
    const headers = getAuthHeaders();
    await axios.post(`${API_BASE_URL}/logout-auth/`, {}, { headers });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    navigate('/');
  } catch (error: any) {
    console.error('Logout failed:', error.response?.data || error.message);
  }
};

export const isLoggedIn = async (): Promise<{ loggedIn: boolean; user?: { id: number; email: string; role?: string } }> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/session-check/`, { headers });

    const { authenticated, user } = response.data;
    if (authenticated) {
      return { loggedIn: true, user };
    }
  } catch (error: any) {
    console.error('Session check failed:', error.response?.data || error.message);
  }

  return { loggedIn: false };
};

export const getAuthHeaders = (): { Authorization: string } => {
  const accessToken = localStorage.getItem('access_token');
  return { Authorization: `Bearer ${accessToken}` };
};

export const fetchData = async (url: string) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch data:', error.response?.data || error.message);
    throw error;
  }
};

export const useGoogleSignInHandler = (onSuccess: () => void, onError: (error: string) => void) => {
  return useGoogleLogin({
    onSuccess: async (codeResponse) => {
      if (!codeResponse.access_token) {
        onError('Access token not found');
        return;
      }

      try {
        const result = await googleSignIn(codeResponse.access_token);
        if (result.success) {
          await isLoggedIn(); // Trigger session check
          onSuccess();
        } else {
          onError(result.error || 'Google Sign-In failed');
        }
      } catch (error) {
        onError('An unexpected error occurred');
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
      onError('Google Sign-In error. Please try again.');
    },
  });
};