import { createContext, useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isStudentLoggedIn, getCurrentUser } from './studentApi';

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
  const auth = useAuth();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Student-specific RequireStudentAuth component
export const RequireStudentAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!auth.isStudentLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return children;
};