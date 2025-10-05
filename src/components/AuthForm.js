import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Form, FormGroup, FormLabel, FormInput, FormError } from './ui/form';
import { cn } from '../lib/utils';

// BottomGradient component for cool hover effects
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

// LabelInputContainer for consistent spacing
const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const AuthForm = ({ mode = 'login' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup, addNotification } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'signup') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let response;
      
      if (mode === 'login') {
        response = await login(formData.email, formData.password);
      } else {
        // Signup
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        };
        response = await signup(userData);
      }

      addNotification({
        type: 'success',
        title: mode === 'signup' ? 'Account Created!' : 'Welcome Back!',
        message: mode === 'signup' 
          ? `Welcome to BugBridge, ${response.user.name}!`
          : `Welcome back, ${response.user.name}!`
      });

      navigate('/dashboard');
    } catch (error) {
      // Handle different types of errors professionally
      if (error.message.includes('Invalid credentials') || error.message.includes('401')) {
        addNotification({
          type: 'error',
          title: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect. Please try again.'
        });
      } else if (error.message.includes('404') || error.message.includes('Failed to fetch')) {
        addNotification({
          type: 'error',
          title: 'Connection Error',
          message: 'Unable to connect to the server. Please check your internet connection and try again.'
        });
      } else if (error.message.includes('Email already exists') || error.message.includes('409')) {
        addNotification({
          type: 'error',
          title: 'Account Already Exists',
          message: 'An account with this email address already exists. Please try logging in instead.'
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Authentication Error',
          message: error.message || 'Something went wrong. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to BugBridge
            </h1>
            <p className="text-slate-400">
              {mode === 'login' 
                ? 'Sign in to your BugBridge account' 
                : 'Create your BugBridge account'
              }
            </p>
          </div>

          {/* Form */}
          <form className="my-8" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <LabelInputContainer>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className=""
                    />
                    {errors.firstName && <FormError>{errors.firstName}</FormError>}
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className=""
                    />
                    {errors.lastName && <FormError>{errors.lastName}</FormError>}
                  </LabelInputContainer>
                </div>

              </>
            )}

            <LabelInputContainer className="mb-4">
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className=""
              />
              {errors.email && <FormError>{errors.email}</FormError>}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className=""
              />
              {errors.password && <FormError>{errors.password}</FormError>}
            </LabelInputContainer>

            {mode === 'signup' && (
              <LabelInputContainer className="mb-8">
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <FormInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className=""
                />
                {errors.confirmPassword && <FormError>{errors.confirmPassword}</FormError>}
              </LabelInputContainer>
            )}

            {mode === 'login' && (
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              className="group/btn relative block h-12 w-full rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 font-semibold text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <span className="ml-2">→</span>
                </span>
              )}
              <BottomGradient />
            </button>
          </form>


          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-slate-400">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <Link 
                to={mode === 'login' ? '/signup' : '/login'} 
                className="text-blue-400 hover:text-blue-300 ml-1 font-medium transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
