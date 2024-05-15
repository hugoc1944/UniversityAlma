import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Picker} from '@react-native-picker/picker';

export default function Publish() {
  const[courseInfo, setCourseInfo] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    sessions: [

    ]
  });

  // Handle input changes
  const handleInputChange = (key, text) => {
    setCourseInfo({...courseInfo, [key]: text});
  }
  // Handle form submission
  const handleSubmit = () => {
    // All fields filled?
    const allFieldsFilled = Object.values(courseInfo).every((value) => typeof value === 'string' && value.trim() !== '')
    if (!allFieldsFilled){
      console.log('Form Submitted', courseInfo)
    } else{
      alert('Please fill in all fields.');
    }
  };

  return (
    <View style={{marginTop: 50,padding:20}}>
      <TextInput
       style={styles.input}
        value={courseInfo.title}
        onChangeText={(text) => handleInputChange('title', text)}
        placeholder='Title'
      />
      <TextInput
       style={styles.input}
        value={courseInfo.description}
        onChangeText={(text) => handleInputChange('description', text)}
        placeholder='Description'
      />
      <TextInput
       style={styles.input}
        value={courseInfo.author}
        onChangeText={(text) => handleInputChange('author', text)}
        placeholder='Author'
      />
      <Picker style={styles.input} selectedValue={courseInfo.category} onValueChange={(itemValue, itemIndex) => handleInputChange('category', itemValue)}>
        <Picker.Item label="Select a Category" value=""/>
        <Picker.Item label="Calm" value="Calm"/>
        <Picker.Item label="Sleep" value="Sleep"/>
        <Picker.Item label="Relax" value="Relax"/>
        <Picker.Item label="Focus" value="Focus"/>
        <Picker.Item label="Breathe" value="Breathe"/>
      </Picker>

      <Button style={styles.submit} title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 50,
    backgroundColor: "rgba(8,30,63,0.08)",
    color: "#081E3F",
    fontSize: 18,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  submit: {
    marginTop: 15
  },
});