import React, { createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameResult {
  username: string;
  result: 'won' | 'lost';
}

interface GameContextType {
  saveGameResult: (username: string, result: 'won' | 'lost') => Promise<void>;
}

const GameContext = createContext<GameContextType>({
  saveGameResult: async () => {},
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const saveGameResult = async (username: string, result: 'won' | 'lost') => {
    try {
      const gameResult: GameResult = { username, result };
      const existingResults = await AsyncStorage.getItem('gameResults');
      const resultsArray: GameResult[] = existingResults ? JSON.parse(existingResults) : [];
      resultsArray.push(gameResult);
      await AsyncStorage.setItem('gameResults', JSON.stringify(resultsArray));
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  };

  return (
    <GameContext.Provider value={{ saveGameResult }}>
      {children}
    </GameContext.Provider>
  );
};
