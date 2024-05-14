import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfilePicture({ imageUrl, onClick }) {
  return (

      <View style={styles.profilePicContainer} >
          <TouchableOpacity onPress={onClick}>
            <Image source={require('../../assets/user_male.png')} style={styles.profilePic}/>
          </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
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
});
