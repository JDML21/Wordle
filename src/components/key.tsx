import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

const Key = ({ keyVal, bigKey, onPress, disabled }: { keyVal: string, bigKey?: boolean, onPress?: () => void, disabled?: boolean }) => {
  const { gameOver, onSelectLetter } = useAppContext();

  const selectLetter = () => {
    if (onPress) {
      onPress();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.key, bigKey && styles.bigKey, disabled && styles.disabledKey]}
      onPress={selectLetter}
      disabled={disabled || gameOver.gameOver}
    >
      <Text style={styles.keyText}>{keyVal}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  key: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  bigKey: {
    width: 100,
    height: 100,
    fontSize: 24,
  },
  disabledKey: {
    backgroundColor: '#ccc',
  },
  keyText: {
    fontSize: 18,
  },
});

export default Key;
