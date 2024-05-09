import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ProfilePicture({ imageUrl }) {
  return (
    <View style={styles.profilePicContainer}>
      <Image source={require('../../assets/user_male.png')} style={styles.profilePic}/>
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
