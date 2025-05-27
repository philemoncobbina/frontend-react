import React from 'react';
import LoginForm from '@/layouts/Login/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginPage = () => {

  console.log("Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
