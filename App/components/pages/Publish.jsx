import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native'
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
  const handleInputChange = (key, text, index) => {

    //Split key

    if (key === 'sessionTitle') {
      const updatedSessions = [...courseInfo.sessions];
      updatedSessions[index] = { ...updatedSessions[index], [key]: text };
      setCourseInfo({ ...courseInfo, sessions: updatedSessions });
    } else{
      setCourseInfo({...courseInfo, [key]: text});
    }

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

  handleAddSession = () => {
    const sessionNum = courseInfo.sessions.length + 1;
    const newSession = {
      sessionNum: sessionNum,
      sessionTitle: '',
      mediaTitle: ''
    };
    setCourseInfo({...courseInfo, sessions: [...courseInfo.sessions, newSession]});
  }

  const handleRemoveSession = (index) => {
    const updatedSessions = [...courseInfo.sessions];
    updatedSessions.splice(index, 1);
    setCourseInfo({...courseInfo, sessions: updatedSessions});
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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

        <View style={styles.sessionWrapper}>
          <Text style={styles.heading}>Course Content</Text>
          {courseInfo.sessions.map((session, index) => (
            <View key={index}>
              <Text style={styles.subHeading}>Session {session.sessionNum}</Text>
              <View style={styles.sessionContent}>
                <TextInput
                  style={[styles.input, styles.titleInput]}
                  value={session.sessionTitle}
                  onChangeText={(text) => handleInputChange("sessionTitle", text, index)}
                  placeholder='Title'
                />
                <Button title="Upload File" onPress={() => console.log('Upload file')} />
                <Button title="Remove Session" onPress={() => handleRemoveSession(index)} />
              </View>
            </View>
          ))}
          <Button title="Add Session" onPress={handleAddSession} />
        </View>

        <Button style={styles.submit} title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
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
  titleInput: {
    flex: 1
  },
  submit: {
    marginTop: 15
  },
  sessionWrapper: {

  },
  sessionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});