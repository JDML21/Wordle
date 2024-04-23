import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext'; // Importa useAppContext en lugar de AppContext

const GameOver = () => {
  const {
    gameOver,
    currAttempt,
    correctWord,
  } = useAppContext(); // Utiliza useAppContext en lugar de useContext(AppContext)

  return (
    <View style={styles.gameOver}>
      <Text style={styles.heading}>
        {gameOver.guessedWord
          ? '¡Has adivinado correctamente la palabra!'
          : '¡Has fallado en adivinar la palabra!'}
      </Text>
      <Text style={styles.correctWord}>Palabra correcta: {correctWord}</Text>
      {gameOver.guessedWord && (
        <Text style={styles.attempts}>Has adivinado en {currAttempt.attempt} intentos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameOver: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  correctWord: {
    fontSize: 20,
    marginBottom: 10,
  },
  attempts: {
    fontSize: 18,
  },
});

export default GameOver;
