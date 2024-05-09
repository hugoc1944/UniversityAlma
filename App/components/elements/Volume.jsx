import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';  // Import de React ajustado
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons/faVolumeXmark';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';

export default function Volume() {
  const [range, setRange] = useState(50); // Valor inicial como número, não como string

  console.log(range); // Para debug, mostra o valor do range no console
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor='#9BB1FD'
        maximumTrackTintColor='rgba(8,30,63,0.1)'
        thumbTintColor='#9BB1FD'
        value={range}
        onValueChange={value => setRange(parseInt(value))}
      />
      <View style={styles.volumeIcon}>
        <FontAwesomeIcon icon={faVolumeXmark} size={21} color={range === 0 ? 'rgb(155,177,253)' : 'rgba(155,177,253,0.5)'}/>
        <FontAwesomeIcon icon={faVolumeHigh} size={21} color={range > 0 ? 'rgb(155,177,253)' : 'rgba(155,177,253,0.5)'}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center',
        position: 'absolute',     // Centraliza o conteúdo horizontalmente
        backgroundColor: '#fff',
        bottom:'40%'   // Define a cor de fundo como branco
    },
    slider: {
        width: 250,
        height: 40
    },
    volumeIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribui os ícones uniformemente
        width: 60,                      // Largura suficiente para dois ícones
        marginTop: 20                   // Espaço acima dos ícones
    }
});
