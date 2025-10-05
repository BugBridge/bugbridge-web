import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Notification from './components/Notification';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ModernDashboard from './pages/ModernDashboard';
import Onboarding from './pages/Onboarding';
import BugReport from './pages/BugReport';
import SubmitReport from './pages/SubmitReport';
import ReportDetails from './pages/ReportDetails';

// Protected Route Component
const ProtectedRoute = ({ children, requireCompanyProfile = false }) => {
  const { state } = useApp();
  
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  
  // If company profile is required but user doesn't have one, redirect to onboarding
  if (requireCompanyProfile && !state.companyProfile) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

// Dashboard Route Component - allows access without company profile
const DashboardRoute = () => {
  const { state } = useApp();
  
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  
  // Show modern dashboard regardless of company profile status
  return <ModernDashboard />;
};

// Main App Component
const AppContent = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard - automatically handles company profile check */}
        <Route path="/dashboard" element={<DashboardRoute />} />
        
        {/* Onboarding - for users without company profile */}
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } 
        />
        
        {/* Bug Report - public route for reporting bugs */}
        <Route path="/report/:companyId" element={<BugReport />} />
        
        {/* Submit Report - protected route for submitting new reports */}
        <Route 
          path="/submit-report" 
          element={
            <ProtectedRoute>
              <SubmitReport />
            </ProtectedRoute>
          } 
        />
        
        {/* Submit Report to specific company - protected route */}
        <Route 
          path="/submit-report/:companyId" 
          element={
            <ProtectedRoute>
              <SubmitReport />
            </ProtectedRoute>
          } 
        />
        
        {/* Report Details - protected route for viewing report details */}
        <Route 
          path="/report-details/:id" 
          element={
            <ProtectedRoute>
              <ReportDetails />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Notifications */}
      {state.notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

// App with Provider
const App = () => {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Router>
          <AppContent />
        </Router>
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
