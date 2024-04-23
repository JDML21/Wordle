import React from 'react';
import { View, StyleSheet } from 'react-native';
import Key from './key';
import { useAppContext } from '../context/AppContext';

const KeyboardComponent = () => {
  const { onSelectLetter, onDelete, onEnter, disabledLetters, gameOver } = useAppContext();

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <View style={styles.keyboard}>
      <View style={styles.line}>
        {keys1.map((key) => (
          <Key key={key} keyVal={key} onPress={() => onSelectLetter(key)} disabled={disabledLetters && disabledLetters.includes(key) || gameOver.gameOver} />
        ))}
      </View>
      <View style={styles.line}>
        {keys2.map((key) => (
          <Key key={key} keyVal={key} onPress={() => onSelectLetter(key)} disabled={disabledLetters && disabledLetters.includes(key) || gameOver.gameOver} />
        ))}
      </View>
      <View style={styles.line}>
        <Key keyVal={"ENTER"} bigKey onPress={onEnter} disabled={gameOver.gameOver} />
        {keys3.map((key) => (
          <Key key={key} keyVal={key} onPress={() => onSelectLetter(key)} disabled={disabledLetters && disabledLetters.includes(key) || gameOver.gameOver} />
        ))}
        <Key keyVal={"DELETE"} bigKey onPress={onDelete} disabled={gameOver.gameOver} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KeyboardComponent;
