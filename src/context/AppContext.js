import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api';

const AppContext = createContext();

const initialState = {
  user: null,
  companyProfile: null, // null if no company profile exists
  bugReports: [],
  notifications: [],
  companies: [],
  loading: false,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        companyProfile: action.payload.companyProfile || null,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        companyProfile: null,
        bugReports: [],
        companies: [],
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_COMPANIES':
      return {
        ...state,
        companies: action.payload
      };
    case 'SET_BUG_REPORTS':
      return {
        ...state,
        bugReports: action.payload
      };
    case 'SET_COMPANY_PROFILE':
      return {
        ...state,
        companyProfile: action.payload
      };
    case 'ADD_BUG_REPORT':
      return {
        ...state,
        bugReports: [...state.bugReports, action.payload]
      };
    case 'UPDATE_BUG_REPORT_STATUS':
      return {
        ...state,
        bugReports: state.bugReports.map(report =>
          report.id === action.payload.id
            ? { ...report, status: action.payload.status }
            : report
        )
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing auth token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Only auto-login if not using mock data
      const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';
      if (!useMockData && token.includes('mock-jwt-token')) {
        // Skip auto-login for mock tokens when not in mock mode
        localStorage.removeItem('authToken');
        return;
      }
      
      // Verify token and get user data
      apiService.getCurrentUser()
        .then(userData => {
          dispatch({
            type: 'LOGIN',
            payload: {
              user: userData.user,
              companyProfile: userData.companyProfile || null
            }
          });
        })
        .catch(error => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('authToken');
        });
    }
  }, []);

  // API integration functions
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiService.login(email, password);

      // Store token
      localStorage.setItem('authToken', response.token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: response.user,
          companyProfile: response.companyProfile || null
        }
      });

      return response;
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiService.signup(userData);

      // Store token
      localStorage.setItem('authToken', response.token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: response.user,
          companyProfile: response.companyProfile || null
        }
      });

      return response;
    } catch (error) {
      console.error('Signup error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const loadCompanies = async () => {
    try {
      const companies = await apiService.getCompanies();
      // Ensure companies is always an array
      const safeCompanies = Array.isArray(companies) ? companies : [];
      dispatch({ type: 'SET_COMPANIES', payload: safeCompanies });
      return safeCompanies;
    } catch (error) {
      console.error('Load companies error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      // Set empty array on error to prevent filter issues
      dispatch({ type: 'SET_COMPANIES', payload: [] });
      throw error;
    }
  };

  const loadBugReports = async (userId = null) => {
    try {
      const reports = await apiService.getBugReports(userId);
      // Ensure reports is always an array
      const safeReports = Array.isArray(reports) ? reports : [];
      dispatch({ type: 'SET_BUG_REPORTS', payload: safeReports });
      return safeReports;
    } catch (error) {
      console.error('Load bug reports error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      // Set empty array on error to prevent filter issues
      dispatch({ type: 'SET_BUG_REPORTS', payload: [] });
      throw error;
    }
  };

  const createBugReport = async (reportData) => {
    try {
      const newReport = await apiService.createBugReport(reportData);
      dispatch({ type: 'ADD_BUG_REPORT', payload: newReport });
      return newReport;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const createCompany = async (companyData) => {
    try {
      const newCompany = await apiService.createCompany(companyData);
      dispatch({ type: 'SET_COMPANY_PROFILE', payload: newCompany });
      return newCompany;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const addNotification = (notification) => {
    const id = Date.now();
    dispatch({ type: 'ADD_NOTIFICATION', payload: { ...notification, id } });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, 5000);
  };

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const value = {
    state,
    dispatch,
    // API functions
    login,
    signup,
    logout,
    loadCompanies,
    loadBugReports,
    createBugReport,
    createCompany,
    addNotification,
    removeNotification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
