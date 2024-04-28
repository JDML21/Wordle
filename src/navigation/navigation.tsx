import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Score" component={ScoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
});


export default () => {
  return (
    <View style={styles.container}>
      <AppNav />
    </View>
  );
};
