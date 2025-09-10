import React, { createContext, useContext } from 'react';
import { AppState } from '../types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};