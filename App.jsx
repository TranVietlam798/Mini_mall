import React from 'react';
import {
  View,
} from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { ContextStateProvider } from './src/Contexts/StateContext';



function App() {

  return (
    <ContextStateProvider>
      <StackNavigator />
    </ContextStateProvider>

  );
}



export default App;
