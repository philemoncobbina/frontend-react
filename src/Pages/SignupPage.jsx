
import SignupForm from '@/layouts/Signup/SignupForm'
import { GoogleOAuthProvider } from '@react-oauth/google';

const SignupPage = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SignupForm />
    </GoogleOAuthProvider>
  )
}

export default SignupPage
