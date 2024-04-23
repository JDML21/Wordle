// HomeScreen.js

import React from 'react';
import { View, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Game"
        onPress={() => navigation.navigate('Game')}
      />
      <Button
        title="Go to Score"
        onPress={() => navigation.navigate('Scores')}
      />
    </View>
  );
}

export default HomeScreen;
