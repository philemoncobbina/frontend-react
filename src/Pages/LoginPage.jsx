
import LoginForm from '@/layouts/Login/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginPage = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
