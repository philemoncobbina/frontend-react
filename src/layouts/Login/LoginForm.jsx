import React, { useState } from 'react';
import { Eye, EyeOff, X, User, GraduationCap, Mail, Hash } from 'lucide-react';
import { login, useGoogleSignInHandler } from "../../Services/Login";
import { loginStudent } from '../../Services/studentApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('regular'); // 'regular' or 'student'
  const [showPassword, setShowPassword] = useState(false);
  const [studentLoginMethod, setStudentLoginMethod] = useState('email'); // 'email' or 'index'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    indexNumber: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeErrorAlert = () => {
    setError('');
  };

  // Google Sign-In Handler
  const handleGoogleSuccess = () => {
    setIsGoogleLoading(false);
    navigate('/dashboard');
  };

  const handleGoogleError = (errorMessage) => {
    setIsGoogleLoading(false);
    setError(errorMessage);
  };

  const googleSignIn = useGoogleSignInHandler(handleGoogleSuccess, handleGoogleError);

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setError('');
    googleSignIn();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (loginType === 'regular') {
        // Handle regular login
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.error || 'Login failed. Please try again.');
        }
      } else {
        // Handle student login
        const credentials = {
          password: formData.password
        };

        if (studentLoginMethod === 'email') {
          credentials.email = formData.email;
        } else {
          credentials.index_number = formData.indexNumber;
        }

        const result = await loginStudent(credentials);
        if (result.success) {
          navigate('/student-portal');
        } else {
          setError(result.error || 'Student login failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when switching login types
  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormData({
      email: '',
      indexNumber: '',
      password: '',
      rememberMe: false
    });
    setError('');
  };

  // Validation helper
  const isFormValid = () => {
    if (!formData.password.trim()) return false;
    
    if (loginType === 'regular') {
      return formData.email.trim() !== '';
    } else {
      if (studentLoginMethod === 'email') {
        return formData.email.trim() !== '';
      } else {
        return formData.indexNumber.trim() !== '';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <div className="text-white text-2xl font-bold">R</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Ridoana</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        {/* Login Type Toggle */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-1 mb-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => handleLoginTypeChange('regular')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                loginType === 'regular'
                  ? 'bg-white text-blue-600 shadow-md border border-blue-100'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User size={18} />
              Regular Login
            </button>
            <button
              type="button"
              onClick={() => handleLoginTypeChange('student')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                loginType === 'student'
                  ? 'bg-white text-purple-600 shadow-md border border-purple-100'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <GraduationCap size={18} />
              Student Portal
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center shadow-sm">
            <span className="flex-grow text-sm">{error}</span>
            <button onClick={closeErrorAlert} className="ml-4 hover:bg-red-100 p-1 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Index Number Field */}
            <div>
              {loginType === 'student' && (
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setStudentLoginMethod('email')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      studentLoginMethod === 'email'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Mail size={14} />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentLoginMethod('index')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      studentLoginMethod === 'index'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Hash size={14} />
                    Index Number
                  </button>
                </div>
              )}
              
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {loginType === 'regular' 
                  ? 'Email Address' 
                  : studentLoginMethod === 'email' 
                    ? 'Email Address' 
                    : 'Index Number'
                }
              </label>
              
              {loginType === 'regular' || studentLoginMethod === 'email' ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
              ) : (
                <input
                  type="text"
                  name="indexNumber"
                  value={formData.indexNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your index number"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading || isGoogleLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password (Regular Login Only) */}
            {loginType === 'regular' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    disabled={isLoading || isGoogleLoading}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="/forgetpassword" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading || !isFormValid()}
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-200 ${
                loginType === 'regular'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-4 focus:ring-purple-300'
              } ${(isLoading || isGoogleLoading || !isFormValid()) ? 'opacity-70 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'}`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                `Sign in ${loginType === 'student' ? 'to Student Portal' : ''}`
              )}
            </button>

            {/* Google Sign-In (Regular Login Only) */}
            {loginType === 'regular' && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isLoading}
                  className="w-full flex justify-center items-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-4 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Signing in with Google...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-gray-700 font-medium">Sign in with Google</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Sign Up Link (Regular Login Only) */}
          {loginType === 'regular' && (
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign up
              </a>
            </p>
          )}

          {/* Student Help Text */}
          {loginType === 'student' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-2">Having trouble logging in?</p>
              <p className="text-xs text-gray-500">Contact your school administrator for assistance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;