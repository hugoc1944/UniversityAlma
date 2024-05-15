import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import TopHeader from '../parents/TopHeader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import useFonts from '../elements/useFonts'; // Import the custom hook

export default function Publish() {
  const fontsLoaded = useFonts(); // Load fonts using the custom hook

  const [courseInfo, setCourseInfo] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    coverMedia: '',
    sessions: [
      {
        sessionNum: 1,
        sessionTitle: '',
        mediaTitle: '',
      },
    ],
  });

  const headerData = { user: 'Carlos', heading: 'Upload New Course' };

  const handleInputChange = (key, text, index) => {
    if (key === 'sessionTitle') {
      const updatedSessions = [...courseInfo.sessions];
      updatedSessions[index] = { ...updatedSessions[index], [key]: text };
      setCourseInfo({ ...courseInfo, sessions: updatedSessions });
    } else {
      setCourseInfo({ ...courseInfo, [key]: text });
    }
  };

  const handleSubmit = () => {
    const allFieldsFilled =
      courseInfo.title.trim() !== '' &&
      courseInfo.description.trim() !== '' &&
      courseInfo.author.trim() !== '' &&
      courseInfo.category.trim() !== '' &&
      courseInfo.coverMedia.trim() !== '' &&
      courseInfo.sessions.every((session) => session.sessionTitle.trim() !== '' && session.mediaTitle.trim() !== '');

    if (allFieldsFilled) {
      console.log('Form Submitted', courseInfo);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleAddSession = () => {
    const newSession = {
      sessionNum: courseInfo.sessions.length + 1,
      sessionTitle: '',
      mediaTitle: '',
    };
    setCourseInfo((prevState) => ({
      ...prevState,
      sessions: [...prevState.sessions, newSession].map((session, index) => ({
        ...session,
        sessionNum: index + 1,
      })),
    }));
  };

  const handleRemoveSession = (index) => {
    const updatedSessions = courseInfo.sessions.filter((session, i) => i !== index);
    setCourseInfo((prevState) => ({
      ...prevState,
      sessions: updatedSessions.map((session, index) => ({
        ...session,
        sessionNum: index + 1,
      })),
    }));
  };

  const handleFileUpload = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg',
        copyToCacheDirectory: false,
      });
      if (result.type === 'success') {
        const { name } = result;
        console.log('File selected: ', name);

        const updatedSessions = [...courseInfo.sessions];
        updatedSessions[index].mediaTitle = name;
        setCourseInfo({ ...courseInfo, sessions: updatedSessions });
      }
    } catch (error) {
      console.error('Error selecting file: ', error);
    }
  };

  const handleCoverUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });
      if (result.type === 'success') {
        const { name } = result;
        console.log('File selected: ', name);

        setCourseInfo({ ...courseInfo, coverMedia: name });
      }
    } catch (error) {
      console.error('Error selecting file: ', error);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ backgroundColor: '#FDFDFE' }}>
        <TopHeader data={headerData} />
        <View style={styles.wrapper}>
          <Text style={styles.inputSubHeading}>Title</Text>
          <TextInput
            style={styles.input}
            value={courseInfo.title}
            onChangeText={(text) => handleInputChange('title', text)}
            placeholder="Your course title"
          />

          <Text style={styles.inputSubHeading}>Description</Text>
          <TextInput
            style={styles.input}
            value={courseInfo.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Describe your course"
          />

          <Text style={styles.inputSubHeading}>Authors</Text>
          <TextInput
            style={styles.input}
            value={courseInfo.author}
            onChangeText={(text) => handleInputChange('author', text)}
            placeholder="Your course authors"
          />

          <Text style={styles.inputSubHeading}>Category</Text>
          <Picker
            style={styles.input}
            selectedValue={courseInfo.category}
            onValueChange={(itemValue) => handleInputChange('category', itemValue)}
          >
            <Picker.Item label="Select a Category" value="" />
            <Picker.Item label="Calm" value="Calm" />
            <Picker.Item label="Sleep" value="Sleep" />
            <Picker.Item label="Relax" value="Relax" />
            <Picker.Item label="Focus" value="Focus" />
            <Picker.Item label="Breathe" value="Breathe" />
          </Picker>

          <Text style={styles.inputSubHeading}>Cover Picture</Text>
          <TouchableOpacity style={styles.btn} onPress={handleCoverUpload}>
            <View style={styles.btnContent}>
              <FontAwesomeIcon icon={faFileArrowUp} size={23} color={'#FDFDFE'} />
              <Text style={styles.btnText}>Upload Cover Picture</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.sessionWrapper}>
            <Text style={styles.heading}>Course Content</Text>
            {courseInfo.sessions.map((session, index) => (
              <View key={index}>
                <Text style={styles.subHeading}>Session {session.sessionNum}</Text>
                <View style={styles.sessionContent}>
                  <TextInput
                    style={[styles.input, styles.titleInput]}
                    value={session.sessionTitle}
                    onChangeText={(text) => handleInputChange('sessionTitle', text, index)}
                    placeholder="Title"
                  />
                  <Button title="Upload File" onPress={() => handleFileUpload(index)} />
                  {index !== 0 && <Button title="Remove Session" onPress={() => handleRemoveSession(index)} />}
                </View>
              </View>
            ))}
            <Button title="Add Session" onPress={handleAddSession} />
          </View>

          <Button style={styles.submit} title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    padding: 25,
    paddingTop: 5,
  },
  inputSubHeading: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    marginTop: 5,
    marginLeft: 2,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#081E3F',
    fontFamily: 'OpenSans-Bold',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#081E3F',
    fontFamily: 'OpenSans-Bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(8,30,63,0.08)',
    color: '#081E3F',
    fontSize: 18,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'OpenSans-Regular',
  },
  titleInput: {
    flex: 1,
  },
  submit: {
    marginTop: 15,
  },
  btn: {
    backgroundColor: '#C2A5F7',
    width: '100%',
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FDFDFE',
    marginLeft: 5,
    fontFamily: 'OpenSans-Bold',
  },
  sessionWrapper: {
    marginTop: 20,
  },
  sessionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
