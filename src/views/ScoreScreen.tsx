import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { useScore } from '../context/ScoreContext';

const ScoreScreen: React.FC = () => {
  //const { score } = useScore();

  return (
    <View style={styles.container}>
      <Text>Score</Text>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
