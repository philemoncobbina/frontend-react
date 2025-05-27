import React from 'react'
import SignupForm from '@/layouts/Signup/SignupForm'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignupPage = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SignupForm />
    </GoogleOAuthProvider>
  )
}

export default SignupPage
