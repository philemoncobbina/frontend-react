// my-project/src/Services/ChangePassword.ts
import axios from 'axios';
import { API_URL } from './http';
import { endLocalSession } from './Login';

// No auth headers and no axios.create() instance here:
// - the HttpOnly cookies are sent by the browser,
// - the CSRF header and the silent refresh come from the interceptors that initAuth() installs
//   on the default axios object. An instance made with axios.create() does NOT inherit them.

export const getUserDetails = async () => {
  const response = await axios.get(`${API_URL}user-detail/`);
  return response.data;
};

export const sendVerificationCode = (email: string) =>
  axios.post(`${API_URL}change-password-request/`, { email });

export const verifyCode = (email: string, verification_code: string) =>
  axios.post(`${API_URL}verify-change-password-code/`, { email, verification_code });

export const changePassword = async (data: {
  email: string;
  verification_code: string;
  old_password: string;
  new_password: string;
}) => {
  const response = await axios.post(`${API_URL}change-password/`, data);

  // The server ends every session when the password changes (and clears this device's cookies),
  // so drop the local "logged in" hint too. The caller should send the user to /login.
  endLocalSession();

  return response;
};