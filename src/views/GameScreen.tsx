import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from '../components/Boards';
import KeyboardComponent from '../components/Keyboards';
import GameOver from '../components/GameOver';
import { useAppContext } from '../context/AppContext';

const GameScreen = () => {
  const { currAttempt } = useAppContext();

  return (
    <View style={styles.container}>
      <Board />
      <KeyboardComponent />
      {currAttempt.attempt > 0 && <GameOver />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default GameScreen;
