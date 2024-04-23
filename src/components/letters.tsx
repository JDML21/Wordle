import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

const Letter = ({ letterPos, attemptVal }: { letterPos: number, attemptVal: number }) => {
  const { board = [], setDisabledLetters, currAttempt, correctWord } = useAppContext();
  const letter = board[attemptVal] ? board[attemptVal][letterPos] : '';
const correct = correctWord && correctWord.toUpperCase()[letterPos] === letter;
const almost = correctWord && !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");


  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev: string[]) => [...prev, letter]);
    }
  }, [currAttempt.attempt, letter, correct, almost, setDisabledLetters]);

  return (
    <View style={[styles.letter, letterState === 'correct' && styles.correct, letterState === 'almost' && styles.almost, letterState === 'error' && styles.error]}>
      <Text>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  letter: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  correct: {
    backgroundColor: 'green',
  },
  almost: {
    backgroundColor: 'yellow',
  },
  error: {
    backgroundColor: 'red',
  },
});

export default Letter;
