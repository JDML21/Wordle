import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';


const ScoreScreen: React.FC = () => {
  const [gameResults, setGameResults] = useState<{ username: string; result: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgroundColorAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResultsData = await AsyncStorage.getItem('gameResults');
        if (gameResultsData) {
          const parsedResults = JSON.parse(gameResultsData);
          setGameResults(parsedResults);
        }
      } catch (error) {
        console.error('Error fetching game results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
   
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColorAnimation, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColorAnimation, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColorInterpolation = backgroundColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(204, 229, 255, 1)', 'rgba(255, 204, 204, 1)'],
  });

  const renderAvatar = (result: string) => {
    return (
      <View style={[styles.avatar, { backgroundColor: result === 'won' ? 'green' : 'red' }]}>
        <Text style={styles.avatarText}>{result === 'won' ? '🏆' : '😢'}</Text>
      </View>
    );
  };

  const renderGameResult = (player: { username: string; result: string }, index: number) => {
    return (
      <Animatable.View key={index} animation="fadeInDown" style={styles.resultContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.resultContent}>
          {renderAvatar(player.result)}
          <Text style={styles.resultText}>{player.username}: {player.result}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolation }]}>
      <Text style={styles.title}>Lista de puntajes:</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando puntajes...</Text>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false} 
        >
          {gameResults.map((player, index) => renderGameResult(player, index))}
        </ScrollView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultText: {
    fontSize: 18,
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ScoreScreen;
