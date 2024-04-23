import React from 'react';
import { View, StyleSheet } from 'react-native';
import Letter from './letters';
import { useAppContext } from '../context/AppContext';

const Board = () => {
 

  const rows = [];
  for (let i = 0; i < 6; i++) {
    const letters = [];
    for (let j = 0; j < 5; j++) {
      letters.push(<Letter key={j} letterPos={j} attemptVal={i} />);
    }
    rows.push(<View key={i} style={styles.row}>{letters}</View>);
  }

  return <View style={styles.board}>{rows}</View>;
}

const styles = StyleSheet.create({
  board: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;
