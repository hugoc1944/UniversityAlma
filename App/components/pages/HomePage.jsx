import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import AudioPlayer from '../elements/p_bar';
import { StatusBar } from 'expo-status-bar';
import ProfilePicture from '../elements/profile_pic';
import FourSquareButton from '../elements/corner_button';
import CategoryNav from '../elements/category_nav';
export default function HomePage() {
  return (
    
    <View style={styles.container}>
    <FourSquareButton onPress={() => alert('Botão clicado')}/>
      <ProfilePicture imageUrl='https://storage.googleapis.com/sticker-prod/3BtTZYTk8OZCQ9mA21oX/9.png' />

    <CategoryNav />
    <AudioPlayer />
    <StatusBar style="auto" />
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicContainer: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonContainer: {
    position: 'absolute',
    left: 20,
    top: 55,
    width: 40,           // Largura total do container de botões
    height: 40,          // Altura total do container de botões
    flexDirection: 'row', // Organiza os botões horizontalmente
    flexWrap: 'wrap',     // Permite quebra de linha
    justifyContent: 'space-around', // Espaça uniformemente dentro do container
    alignItems: 'center', // Centraliza os quadrados verticalmente dentro do container
  },
  subButton: {
    width: 15,            // Largura do sub-botão
    height: 15,           // Altura do sub-botão
    backgroundColor: '#C2A5F7', // Cor de fundo do sub-botão
    borderRadius: 5,
    margin: 2,            // Espaçamento entre sub-botões
  }
});
