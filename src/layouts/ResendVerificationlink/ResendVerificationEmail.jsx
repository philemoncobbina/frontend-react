// src/pages/ResendVerificationEmail.jsx

import React, { useState } from "react";
import { Mail, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { resendVerificationEmail } from "../../Services/Login";

const ResendVerificationEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      console.log('Attempting to resend verification for:', trimmedEmail);

      const response = await resendVerificationEmail(trimmedEmail);

      console.log('Resend verification response:', response);

      if (response.error) {
        // Handle error from the response
        setErrorMessage(response.error);
      } else {
        setSuccessMessage(
          response.message ||
            "A new verification link has been sent to your email. Please check your inbox (and spam folder)."
        );
        setEmail(""); // Clear email on success
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setErrorMessage(
        error?.message || 
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Didn't receive the verification email? We can send you a new one.
        </p>

        {successMessage && (
          <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                outline-none
                transition-colors
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              mt-6
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-lg
              font-medium
              transition-colors
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Resend Verification Email
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Check your spam/junk folder if you don't see the email.
        </p>
      </div>
    </div>
  );
};

export default ResendVerificationEmail;