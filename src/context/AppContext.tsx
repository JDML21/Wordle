import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { generateWordSet } from '../components/word';

interface AppContextType {
  board: string[][];
  setBoard: Dispatch<SetStateAction<string[][]>>;
  currAttempt: { attempt: number; letter: number };
  setCurrAttempt: Dispatch<SetStateAction<{ attempt: number; letter: number }>>;
  correctWord: string;
  onSelectLetter: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  setDisabledLetters: Dispatch<SetStateAction<string[]>>;
  disabledLetters: string[];
  gameOver: { gameOver: boolean; guessedWord: boolean };
}

const AppContext = createContext<AppContextType>({
  board: [],
  setBoard: () => {},
  currAttempt: { attempt: 0, letter: 0 },
  setCurrAttempt: () => {},
  correctWord: '',
  onSelectLetter: () => {},
  onDelete: () => {},
  onEnter: () => {},
  setDisabledLetters: () => {},
  disabledLetters: [],
  gameOver: { gameOver: false, guessedWord: false },
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<string[][]>([]);
  const [currAttempt, setCurrAttempt] = useState<{ attempt: number; letter: number }>({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState<Set<string>>(new Set<string>());
  const [correctWord, setCorrectWord] = useState<string>('');
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<{ gameOver: boolean; guessedWord: boolean }>({ gameOver: false, guessedWord: false });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (key: string) => {
    if (currAttempt.letter > 4 || !board[currAttempt.attempt]) return; 
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  const onDelete = () => {
    if (currAttempt.letter === 0 || !board[currAttempt.attempt]) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = '';
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letter !== 5 || !board[currAttempt.attempt]) return;

    let currWord = '';
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert('Palabra no encontrada');
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        correctWord,
        onSelectLetter,
        onDelete,
        onEnter,
        setDisabledLetters,
        disabledLetters,
        gameOver,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
