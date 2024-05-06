import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';


const AudioPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    loadAudio();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const loadAudio = async () => {
    const { sound: audioSound, status } = await Audio.Sound.createAsync(
      require('./house_on_sand.mp3'),
      { shouldPlay: false, isLooping: false },
      updateStatus
    );
    setSound(audioSound);
    setDuration(status.durationMillis);
  };

  const updateStatus = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis);
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
      if (status.didJustFinish && !status.isLooping) {
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const onSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(Math.floor(value));
      setCurrentTime(value); // Ensure we update current time as slider moves
    }
  };

  const onSlidingStart = () => {
    if (isPlaying) {
      sound.pauseAsync();
    }
  };

  const onSlidingComplete = async (value) => {
    if (sound) {
      await sound.setPositionAsync(Math.floor(value));
      if (isPlaying) {
        sound.playAsync();
      }
    }
  };

  const skipForward = async () => {
    if (sound && duration) {
      const newPosition = currentTime + 10000;
      if (newPosition < duration) {
        await sound.setPositionAsync(newPosition);
        setCurrentTime(newPosition);
      } else {
        await sound.setPositionAsync(duration);
        setCurrentTime(duration);
      }
    }
  };
  
  const skipBackward = async () => {
    if (sound) {
      const newPosition = currentTime - 10000;
      if (newPosition > 0) {
        await sound.setPositionAsync(newPosition);
        setCurrentTime(newPosition);
      } else {
        await sound.setPositionAsync(0);
        setCurrentTime(0);
      }
    }
  };


  const [isLooping, setIsLooping] = useState(false);

  const putRepeat = async () => {
    if (sound) {
      const newLoopingStatus = !isLooping;  // Determine the new looping status
      await sound.setIsLoopingAsync(newLoopingStatus);  // Apply it asynchronously
      setIsLooping(newLoopingStatus);  // Update state to reflect the change
    }
  };
  
  
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60000);
    const seconds = Math.floor((secs % 60000) / 1000);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  return (
    <View style={styles.audioPlayer}>
      <Text style={styles.trackTitle}>House on Sand</Text>
      <Text style={styles.buffering}>{isBuffering ? '' : ' '}</Text>
      <View style={styles.controls}>
      <Text style={styles.time}>{calculateTime(currentTime)}</Text>

      <Slider
        style={styles.timeline}
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={onSliderValueChange}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        minimumTrackTintColor="#9BB1FD"
        maximumTrackTintColor="rgba(8,30,63,0.1)"
        thumbTintColor="#9BB1FD"
        trackHeight={4}
      />
      <Text style={styles.time}>{calculateTime(duration)}</Text>

      </View>


      <View style={styles.controls}>
      <TouchableOpacity style={styles.skipButton} onPress={skipBackward}>
    <Icon
      name="favorite-border"
      size={36}
      color="#9BB1FD"
    />
  </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={skipBackward}>
    <Icon
      name="fast-rewind"
      size={36}
      color="#9BB1FD"
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
    <Icon
      name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'}
      size={40}
      color="#9BB1FD"
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.skipButton} onPress={skipForward}>
    <Icon
      name="fast-forward"
      marginRight={10}
      marginLeft={10}
      size={36}
      color="#9BB1FD"
    />
  </TouchableOpacity>
<TouchableOpacity style={styles.skipButton} onPress={putRepeat}>
  <Icon
    name={isLooping ? 'repeat-one' : 'repeat'}  // Correctly toggle between 'repeat-one' and 'repeat'
    size={36}
    color="#9BB1FD"
  />
</TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayer: {
    padding: 20
  },
  trackTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  timeline: {
    width: '70%',
    height: 20
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  },
  playPauseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,  
    height: 40,
    borderRadius: 30,  
    backgroundColor: '#FFFFFF',  
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  time: {
    fontSize: 16
  },
  buffering: {
    fontSize: 14,
    color: '#FF0000'
  }
});

export default AudioPlayer;