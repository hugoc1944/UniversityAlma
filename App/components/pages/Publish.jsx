import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import TopHeader from '../parents/TopHeader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileArrowUp, faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useMeditations } from '../../contexts/MeditationsContext';

export default function Publish() {
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
  const [submitted, setSubmitted] = useState(false);

  const { meditations, addMeditation } = useMeditations(); // Access meditations and addMeditation from context
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

    //if (allFieldsFilled) {
      console.log('Form Submitted', courseInfo);
      courseInfo.id = meditations.length + 1;
      console.log(courseInfo);

      // Constructing the new course object
      const newCourse = {
        ...courseInfo,
        sessions: courseInfo.sessions.map((session, index) => ({
          sessionNum: index + 1,
          sessionDescription: '', // Add default session description if needed
          mediaType: 'audio',
          mediaFile: session.mediaTitle,
        })),
      };
      console.log(newCourse);
      addMeditation(newCourse);
      console.log('New course added: ', newCourse);
      setSubmitted(true); // Set submitted state to true
    //} else {
    //  alert('Please fill in all fields.');
    //}
  };

  const handleAddSession = () => {
    const sessionNum = courseInfo.sessions.length + 1;
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {!submitted ? (
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
                      placeholder="Session title"
                    />
                    <TouchableOpacity style={styles.btnSession} onPress={() => handleFileUpload(index)}>
                      <View style={styles.btnContent}>
                        <FontAwesomeIcon icon={faFileArrowUp} size={24} color={'#FDFDFE'} />
                      </View>
                    </TouchableOpacity>
                    {index !== 0 && (
                      <TouchableOpacity style={styles.btnRemove} onPress={() => handleRemoveSession(index)}>
                        <Text style={styles.removeText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.btn} onPress={handleAddSession}>
                <Text style={styles.btnText}>Add Session</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.submitWrapper}>
              <TouchableOpacity style={styles.btnPublish} onPress={handleSubmit}>
                <Text style={styles.btnPublishText}>Publish Course</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.successWrapper}>
          <TopHeader data={''} />
          <TouchableOpacity style={styles.goBack} onPress={() => setSubmitted(!submitted)}>
            <FontAwesomeIcon icon={faArrowLeft} size={23} color={'#081E3F'} />
            <Text style={styles.goBackText}>Go back to editing</Text>
          </TouchableOpacity>

          <View style={styles.textWrapper}>
            <FontAwesomeIcon icon={faCircleCheck} size={70} color={'#C2A5F7'} />
            <Text style={styles.successText}>Your course was submitted for review!</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFE',
  },
  wrapper: {
    padding: 25,
    paddingTop: 5,
  },
  inputSubHeading: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#081E3F',
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 2,
    color: '#081E3F',
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
  },
  sessionWrapper: {
    marginTop: 20,
  },
  removeText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FDFDFE',
  },
  btnSession: {
    backgroundColor: '#C2A5F7',
    width: 60,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnRemove: {
    backgroundColor: '#C2A5F7',
    width: 100,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sessionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitWrapper: {
    alignItems: 'center',
    
  },
  btnPublish: {
    backgroundColor: '#9B51E0',
    borderColor: '#9B51E0', // Darker purple border
    borderWidth: 2,
    width: '100%',
    height: 50,
    elevation: 5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  btnPublishText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FDFDFE',
  },

  //Publish Page
  successWrapper: {
    backgroundColor: '#FDFDFE',
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    position: 'relative',
    bottom: 5,
  },
  goBackText: {
    fontSize: 18,
    marginLeft: 5,
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: 150,
  },
  successText: {
    fontSize: 28,
    textAlign: 'center',
    width: '85%',
    marginTop: 5,
  },
});
