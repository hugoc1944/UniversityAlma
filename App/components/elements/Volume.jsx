import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import VolumeControl from 'react-native-volume-control';

// Function to calculate the point on a Bezier curve based on a parameter t
function calculateBezierPoint(t, p0, p1, p2, p3) {
  const cx = 3 * (p1.x - p0.x);
  const cy = 3 * (p1.y - p0.y);
  const bx = 3 * (p2.x - p1.x) - cx;
  const by = 3 * (p2.y - p1.y) - cy;
  const ax = p3.x - p0.x - cx - bx;
  const ay = p3.y - p0.y - cy - by;

  const tSquared = t * t;
  const tCubed = tSquared * t;

  const resultX = (ax * tCubed) + (bx * tSquared) + (cx * t) + p0.x;
  const resultY = (ay * tCubed) + (by * tSquared) + (cy * t) + p0.y;

  return { x: resultX, y: resultY };
}

const CurvedSlider = () => {
  const [sliderValue, setSliderValue] = useState(0.5); // Inicia no meio do caminho
  useEffect(() => {
    const setAudioVolume = async () => {
      await VolumeControl.change(sliderValue); // Define o volume conforme o valor do slider
    };
    setAudioVolume();
  }, [sliderValue]);

  // Definição dos pontos de controle
  const p0 = { x: 10, y: 150 };
  const p1 = { x: 100, y: 200 };
  const p2 = { x: 200, y: 200 };
  const p3 = { x: 290, y: 150 };
  const thumbPosition = calculateBezierPoint(sliderValue, p0, p1, p2, p3);

  // Responder para movimentos no slider
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Ensure the calculation is proportional to the SVG width
      const newSliderValue = Math.min(Math.max(0, (gestureState.moveX / 300)), 1);
      console.log('New Slider Value:', newSliderValue);
      setSliderValue(newSliderValue);
    }
    
  });

  return (
    <View style={styles.container}>
      <Svg height="200" width="300">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset={sliderValue.toString()} stopColor="#9BB1FD" stopOpacity="1" />
            <Stop offset={sliderValue.toString()} stopColor="#EEEEFF" stopOpacity="1" />
            <Stop offset="1" stopColor="#EEEEFF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d="M10,150 C100,200 200,200 290,150"
          stroke="url(#grad)"
          strokeWidth="2"
          fill="none"
        />
        <Circle
          cx={thumbPosition.x}
          cy={thumbPosition.y}
          r="7"
          fill="#9BB1FD"
          {...panResponder.panHandlers}
        />
      </Svg>
      <View style={styles.volumeIcon}>
        <FontAwesomeIcon icon={faVolumeXmark} size={21} color={'rgb(155,177,253)'} />
        <FontAwesomeIcon icon={faVolumeHigh} size={21} color={'rgb(155,177,253)'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Use absolute positioning
    top: 130,  // Adjust the top position
    left:45,  // Adjust the left position
    justifyContent: 'center',
    alignItems: 'center',
    width: 300, // Set width to ensure it doesn't stretch across the entire parent
  },
  volumeIcon: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Distribui os ícones uniformemente
      width: 300,                      // Largura suficiente para dois ícones
      top: -40                  // Espaço acima dos ícones
  }
});

export default CurvedSlider;
