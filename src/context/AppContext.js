import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  companyProfile: null, // null if no company profile exists
  bugReports: [],
  notifications: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        companyProfile: action.payload.companyProfile || null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        companyProfile: null
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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
