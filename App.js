import React from 'react';
import { AppProvider } from './src/context/AppContext';
import GameScreen from './src/views/GameScreen';
import AppNavigator from './src/navigation/navigation';

const App = () => {
  return (
    <AppProvider>
      <AppNavigator/>
    </AppProvider>
  );
}

export default App;
