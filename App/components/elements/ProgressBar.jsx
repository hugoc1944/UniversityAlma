import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = ({ mediaFile, isSessionChanging, onAudioPause }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (mediaFile) {
      loadAudio(mediaFile);
    }
    return () => {
      if (sound) {
        sound.unloadAsync().catch((error) => console.error('Failed to unload sound:', error));
      }
    };
  }, [mediaFile]);

  useEffect(() => {
    if (isSessionChanging) {
      pauseAudio();
      onAudioPause();
    }
  }, [isSessionChanging]);

  const getLocalAudioPath = (fileName) => {
    const audioMap = {
      'house_on_sand.mp3': require('./house_on_sand.mp3'),
      'Rain.mp3': require('./Rain.mp3'),
    };
    return audioMap[fileName];
  };

  const loadAudio = async (fileName) => {
    const audioPath = getLocalAudioPath(fileName);

    if (!audioPath) {
      console.error('Invalid media file:', fileName);
      return;
    }

    try {
      const { sound: audioSound, status } = await Audio.Sound.createAsync(
        audioPath,
        { shouldPlay: false, isLooping: false },
        updateStatus
      );
      setSound(audioSound);
      setDuration(status.durationMillis);
    } catch (error) {
      console.error('Failed to load audio:', error);
    }
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
    if (!sound) return;
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
    setIsPlaying(!isPlaying);
  };

  const pauseAudio = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
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
      const newLoopingStatus = !isLooping; // Determine the new looping status
      await sound.setIsLoopingAsync(newLoopingStatus); // Apply it asynchronously
      setIsLooping(newLoopingStatus); // Update state to reflect the change
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60000);
    const seconds = Math.floor((secs % 60000) / 1000);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const progressBarImage = require('../../assets/course/full_wave.png');
  const playedWidth = `${(currentTime / duration) * 100}%`;

  return (
    <View style={styles.audioPlayer}>
      <Text style={styles.buffering}>{isBuffering ? '' : ' '}</Text>
      <View style={[styles.controls, { justifyContent: 'space-between' }, { width: '80%' }, { top: '7%' }]}>
        <TouchableOpacity style={styles.skipButton} onPress={skipBackward}>
          <Icon name="favorite-border" size={36} color="#9BB1FD" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={skipBackward}>
          <Icon name="fast-rewind" size={36} color="#9BB1FD" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <FontAwesomeIcon size={65} icon={isPlaying ? faCirclePause : faCirclePlay} color={"#9BB1FD"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={skipForward}>
          <Icon name="fast-forward" size={36} color="#9BB1FD" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={putRepeat}>
          <Icon name={isLooping ? 'repeat-one' : 'repeat'} size={36} color="#9BB1FD" />
        </TouchableOpacity>
      </View>
      <View style={[styles.controls, { justifyContent: 'center' }, { width: '100%' }, { top: '4%' }]}>
        <Text style={styles.time}>{calculateTime(currentTime)}</Text>

        <View style={styles.progressContainer}>
          <ImageBackground
            source={progressBarImage}
            resizeMode="cover"
            style={styles.imageBackgroundStyle}
            imageStyle={{ opacity: 0.3 }}
            pointerEvents="none"
          />
          <View style={[styles.progressMask, { width: playedWidth }]} pointerEvents="none">
            <ImageBackground
              source={progressBarImage}
              resizeMode="cover"
              style={[styles.imageBackgroundStyle]}
              imageStyle={{ opacity: 1 }}
              pointerEvents="none"
            />
          </View>
          <Slider
            style={styles.timeline}
            value={currentTime}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={onSliderValueChange}
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSlidingComplete}
            minimumTrackTintColor="#9BB1FD"
            thumbTintColor="#9BB1FD"
            trackHeight={0}
          />
        </View>
        <Text style={styles.time}>{calculateTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayer: {
    padding: 20,
    position: 'absolute',
    bottom: '35%',
    width: '100%',
    alignItems: 'center',
  },
  trackTitle: {
    fontSize: 18,
    marginBottom: 0,
    marginLeft: 90,
  },
  timeline: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: 20,
    opacity: 0,
    borderRadius: 0,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  progressContainer: {
    height: 50,
    position: 'relative',
    left: 0,
    overflow: 'hidden',
  },
  imageBackgroundStyle: {
    flex: 1,
    width: 220,
    height: '100%',
  },
  progressMask: {
    height: '100%',
    width: 220,
    position: 'absolute',
    overflow: 'hidden',
  },
  playPauseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  time: {
    bottom: 5,
    fontSize: 13,
    marginHorizontal: 14,
  },
  buffering: {
    fontSize: 14,
    color: '#FF0000',
  },
});

export default AudioPlayer;
