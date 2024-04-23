import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from '../views/GameScreen';
import ScoreScreen from '../views/ScoreScreen';
import HomeScreen from '../views/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Scores" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
