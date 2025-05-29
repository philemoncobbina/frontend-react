import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { signUp, googleSignIn } from '../../Services/signup';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear specific error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const { confirmPassword, ...submissionData } = formData;
        const response = await signUp(submissionData);

        if (response.success) {
          setShowSuccessAlert(true);
          // Reset form
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          // Hide success alert after 5 seconds
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 5000);
        } else {
          setErrors({ submit: response.error || 'Signup failed' });
        }
      } catch (error) {
        setErrors({ submit: 'An unexpected error occurred' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsGoogleLoading(true);
      try {
        const serverResponse = await googleSignIn(codeResponse.access_token);
        
        if (serverResponse.success) {
          window.location.href = '/dashboard';
        } else {
          setErrors({ submit: serverResponse.error || 'Google Sign-Up failed' });
        }
      } catch (error) {
        setErrors({ submit: 'Google Sign-Up failed' });
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setErrors({ submit: 'Google Sign-Up error' });
      setIsGoogleLoading(false);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        
        {showSuccessAlert && (
          <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2">
            <CheckCircle2 className="text-green-500 w-5 h-5" />
            <p className="text-green-700">Account created successfully! Thank you for signing up.</p>
          </div>
        )}

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-center">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 
                  ${errors.first_name 
                    ? 'border-red-500 focus:ring-red-300' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'}`}
                placeholder="John"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 
                  ${errors.last_name 
                    ? 'border-red-500 focus:ring-red-300' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'}`}
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'}`}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 pr-10
                  ${errors.password 
                    ? 'border-red-500 focus:ring-red-300' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 pr-10
                  ${errors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-300' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 
              flex items-center justify-center space-x-2 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={() => handleGoogleSignUp()}
            disabled={isGoogleLoading}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 
              flex items-center justify-center space-x-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-gray-700 rounded-full"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l2.66-2.09z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.86-2.59 3.29-4.51 6.16-4.51z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;