// SignUpService.ts
import axios from 'axios';
import { API_URL } from '../Services/http'; // adjust the path if this file lives elsewhere
import { googleSignIn as startGoogleSession } from '../Services/Login';

interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

// Turns whatever the API returned into one readable sentence:
// { error: "..." } | { detail: "..." } | { email: ["..."], password: ["..."] } | plain text.
const describe = (data: unknown): string => {
  if (typeof data === 'string') {
    return data.trim().startsWith('<') ? '' : data; // ignore HTML error pages
  }

  if (Array.isArray(data)) {
    return data.map(describe).filter(Boolean).join(' ');
  }

  if (data && typeof data === 'object') {
    return Object.entries(data as Record<string, unknown>)
      .map(([key, value]) => {
        const text = describe(value);
        const bare = ['error', 'detail', 'message', 'non_field_errors'].includes(key);
        return bare || !text ? text : `${key.replace(/_/g, ' ')}: ${text}`;
      })
      .filter(Boolean)
      .join(' ');
  }

  return '';
};

const getErrorMessage = (error: any): string => {
  if (!error.response) {
    return 'Unable to reach the server. Check your connection.';
  }
  return describe(error.response.data) || error.message || 'Something went wrong';
};

export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
  try {
    const response = await axios.post(`${API_URL}signup/`, data);
    const successMessage = response.data.message || 'Sign up successful!';
    return { success: true, message: successMessage, data: response.data };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: getErrorMessage(error) };
  }
};

// Delegates to the one Google sign-in in Login.ts, which verifies that the cookies were stored
// and records the signed-in user. Tokens live in HttpOnly cookies, so none are returned here.
export const googleSignIn = async (access_token: string): Promise<SignUpResponse> => {
  try {
    const result = await startGoogleSession(access_token);

    if (result.success) {
      return {
        success: true,
        message: 'Google sign-in successful',
        data: {
          success: true,
          email: result.user?.email,
          created: result.created,
          user: result.user,
        },
      };
    }

    return { success: false, error: result.error || 'Google sign-in failed' };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return {
      success: false,
      error: getErrorMessage(error) || 'Something went wrong during Google sign-in',
    };
  }
};