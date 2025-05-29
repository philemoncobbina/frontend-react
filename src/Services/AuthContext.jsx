import { createContext, useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../Services/Login';
import { isStudentLoggedIn } from './studentApi';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const value = useMemo(() => ({
    isAuthenticated,
    isStudentLoggedIn,
    currentUser: getCurrentUser()
  }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Regular RequireAuth component (for any authenticated user)
export const RequireAuth = ({ children }) => {
  const location = useLocation();
  
  // Use the synchronous check
  const userLoggedIn = isAuthenticated();
  
  console.log('RequireAuth - Authentication check:', userLoggedIn);
  
  if (!userLoggedIn) {
    console.log('RequireAuth - User not logged in. Redirecting to login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('RequireAuth - User is authenticated, rendering children');
  return children;
};

// Student-specific RequireStudentAuth component
export const RequireStudentAuth = ({ children }) => {
  const location = useLocation();
  
  const userLoggedIn = isAuthenticated();
  const studentLoggedIn = isStudentLoggedIn ? isStudentLoggedIn() : false;
  
  console.log('RequireStudentAuth - Auth check:', { userLoggedIn, studentLoggedIn });

  if (!userLoggedIn) {
    console.log('RequireStudentAuth - User not logged in. Redirecting to login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!studentLoggedIn) {
    console.log('RequireStudentAuth - Not a student user. Redirecting to homepage.');
    return <Navigate to="/" replace />;
  }

  console.log('RequireStudentAuth - Student is authenticated, rendering children');
  return children;
};