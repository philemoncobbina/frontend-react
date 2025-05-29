import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isStudentLoggedIn, getCurrentUser, checkSession } from './studentApi';

// Create Student Auth Context
const StudentAuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);
  
  // Check student session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();
        if (session.loggedIn && session.isStudent && session.user) {
          setCurrentUser(session.user);
        }
      } catch (error) {
        console.error("Failed to verify student session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifySession();
  }, []);
  
  // Context value with memoization to prevent unnecessary re-renders
  const value = useMemo(() => ({
    isStudentAuthenticated: () => isAuthenticated() && isStudentLoggedIn(),
    currentUser,
    isLoading
  }), [currentUser, isLoading]);
  
  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
};

// Custom hook to use the Student Auth Context
export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (context === undefined) {
    throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  }
  return context;
};

// Student-specific auth component
export const RequireStudentAuth = ({ children }) => {
  const location = useLocation();
  const { isStudentAuthenticated, isLoading } = useStudentAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  
  if (!isStudentAuthenticated()) {
    // Redirect to student login portal
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Optional student login modal component
export const StudentLoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl border border-gray-200">
        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-600 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21v-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm0 0H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Student Portal Access</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Please log in with your student credentials to access the student portal.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={onClose}  
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 font-medium"
            >
              Cancel
            </button>
            <a 
              href="/login" 
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Student Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};