import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const Notification = ({ notification }) => {
  const { dispatch } = useApp();
  const [progress, setProgress] = useState(100);

  const handleClose = () => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
  };

  // Auto-dismiss notification after 5 seconds with progress bar
  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms for smooth animation
    const totalSteps = duration / interval;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = Math.max(0, 100 - (currentStep / totalSteps) * 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(progressTimer);
        handleClose();
      }
    }, interval);

    // Cleanup timer if component unmounts or notification is manually closed
    return () => clearInterval(progressTimer);
  }, [notification.id]);

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 ${
      notification.type === 'success' ? 'border-green-500/30' : 'border-red-500/30'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`text-sm font-semibold ${
            notification.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {notification.title}
          </h4>
          <p className="text-gray-300 text-sm mt-1">
            {notification.message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 w-full bg-slate-700 rounded-full h-1">
        <div 
          className={`h-1 rounded-full transition-all duration-75 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Notification;
