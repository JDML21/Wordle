import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Button, TextInput } from "react-native";
import { colors, CLEAR, ENTER, colorsToEmoji } from "../constants";
import Keyboard from "../components/keyboards";
import { useGameContext } from '../context/GameContext'; 

const NUMBER_OF_TRIES = 6;
const NUMBER_OF_COLUMNS = 5;

const copyArray = (arr: string[][]) => {
  return [...arr.map((rows) => [...rows])];
};

const GameScreen: React.FC = ({ navigation }: any) => {
  const { saveGameResult } = useGameContext(); 
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [curRow, setCurRow] = useState<number>(0);
  const [curCol, setCurCol] = useState<number>(0);
  const [gameState, setGameState] = useState<string>("playing"); 
  const [inputUsername, setInputUsername] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);


  useEffect(() => {
    if (gameStarted) {
      const words = [
        "house", "apple", "chair", "water", "beach", "plant", "music", "tiger", "smile", "laugh",
        "sleep", "bread", "clean", "happy", "table", "watch", "heart", "green", "ocean", "stone",
        "heart", "mouse", "lemon", "queen", "snake", "light", "cloud", "river", "sword", "paper",
        "dance", "shoes", "socks", "clock", "pencil", "paint", "brush", "grape", "chair", "floor",
        "spoon", "knife", "scarf", "glove", "chair", "brush", "tooth", "mouth", "brush", "tooth"
      ];
      const fiveLetterWords = words.filter(word => word.length === 5);
      const currentWordIndex = Math.floor(Math.random() * fiveLetterWords.length);
      const currentWord = fiveLetterWords[currentWordIndex];
      const currentLetters = currentWord.split("");
      const initialRows = Array.from({ length: NUMBER_OF_TRIES }, () =>
        Array(NUMBER_OF_COLUMNS).fill("")
      );
      setWord(currentWord);
      setLetters(currentLetters);
      setRows(initialRows);
      setCurRow(0);
      setCurCol(0);
      setGameState("playing");
      const updatedWords = [...words.slice(0, currentWordIndex), ...words.slice(currentWordIndex + 1)];
      setWords(updatedWords);
    }
  }, [gameStarted]);
  


  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      Alert.alert("Wooowwwww", "You won!", [
        { text: "Play Again", onPress: startNewGame },
        { text: "Cancel", onPress: navigateToHomeScreen, style: "cancel" },
      ]);
      setGameState("won");
      if (inputUsername.trim() !== '') {
        saveGameResult(inputUsername, 'won'); 
      }
    } else if (checkIfLost() && gameState !== "lost") {
      Alert.alert("Oops", `You lost! The word was "${word}".`, [
        { text: "Try Again", onPress: startNewGame },
        { text: "Cancel", onPress: navigateToHomeScreen, style: "cancel" },
      ]);
      setGameState("lost");
      if (inputUsername.trim() !== '') {
        saveGameResult(inputUsername, 'lost'); 
      }
    }
  };


  const startNewGame = () => {
    setCurRow(0);
    setCurCol(0);
    setRows(Array.from({ length: NUMBER_OF_TRIES }, () => Array(NUMBER_OF_COLUMNS).fill("")));
    setWord(""); 
    setLetters([]); 
    setGameState("playing");
  };
  

  
  
  
const navigateToHomeScreen = () => {
  navigation.navigate('Home')
};


  const checkIfWon = () => {
    const row = rows[curRow - 1];

    return row.join("") === word;
  };

  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  };

  const onKeyPressed = (key: string) => {
    if (gameState !== "playing") {
      return;
    }

    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);

      if (curCol === rows[0].length - 1) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
    }
  };

  const isCellActive = (row: number, col: number) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row: number, col: number) => {
    const letter = rows[row][col];
    
    if (row >= curRow) {
      return colors.black;
    }
    
    if (checkIfWon()) {
      return colors.primary; 
    } else if (checkIfLost()) {
      return colors.red; 
    }
    
    if (letter === letters[col]) {
      return colors.primary;
    }
    
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color: string) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  const handleStartGame = () => {
    if (inputUsername.trim() === '') {
      Alert.alert('Error', 'Please enter your username before starting the game.');
    } else {
      setGameStarted(true); // Establecer gameStarted en true al iniciar el juego
    }
  };
  
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORDLE</Text>
  
      {!gameStarted && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setInputUsername}
            value={inputUsername}
            placeholder="Enter your username"
          />
          <Button title="Start Game" onPress={handleStartGame} />
        </View>
      )}
  
      {gameStarted && (
        <>
          <ScrollView style={styles.map}>
            {rows.map((row, i) => (
              <View key={`row-${i}`} style={styles.row}>
                {row.map((letter, j) => (
                  <View
                    key={`cell-${i}-${j}`}
                    style={[
                      styles.cell,
                      {
                        borderColor: isCellActive(i, j)
                          ? colors.grey
                          : colors.darkgrey,
                        backgroundColor: getCellBGColor(i, j),
                      },
                    ]}
                  >
                    <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
  
          <Keyboard
            onKeyPressed={onKeyPressed}
            greenCaps={greenCaps}
            yellowCaps={yellowCaps}
            greyCaps={greyCaps}
          />
        </>
      )}
  
      <View style={styles.buttonsContainer}>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    paddingTop: 50, 
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: 250,
    color: colors.lightgrey,
  },
  map: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default GameScreen;
