import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AppProvider } from './context/AppProvider';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}