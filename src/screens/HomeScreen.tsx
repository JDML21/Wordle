import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';

const HomeScreen: React.FC = ({ navigation }: any) => {

  const playBackgroundMusic = async (soundObject: Audio.Sound) => {
    try {
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  };

  useEffect(() => {
    const soundObject = new Audio.Sound();
  
    const loadAndPlayBackgroundMusic = async () => {
      try {
        await soundObject.loadAsync(require('../../assets/pista.mp3'));
        await playBackgroundMusic(soundObject);
        soundObject.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded && status.positionMillis === status.durationMillis) {
            await soundObject.replayAsync();
          }
        });
      } catch (error) {
        console.error('Error loading and playing background music:', error);
      }
    };
  
    loadAndPlayBackgroundMusic();
  
    return () => {
      soundObject.stopAsync();
    };
  }, []);
  
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" style={styles.gifContainer}>
        <Image
          source={require('../../assets/gif.gif')}
          style={styles.gif}
          resizeMode="contain"
        />
      </Animatable.View>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="fadeInUp" delay={500} style={styles.buttonWrapper}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Game')}>
            <Button
              mode="contained"
              style={[styles.button, { backgroundColor: '#4CAF50' }]} // Verde
            >
              Play Game
            </Button>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={700} style={styles.buttonWrapper}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Score')}>
            <Button
              mode="outlined"
              style={[styles.button, { borderColor: '#FFEB3B', borderWidth: 2 }]} 
              labelStyle={{ color: '#FFEB3B' }} 
            >
              View Scores
            </Button>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  gifContainer: {
    marginBottom: 20,
  },
  gif: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    width: '80%',
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  button: {
    width: '100%',
    borderRadius: 30,
  },
});

export default HomeScreen;
