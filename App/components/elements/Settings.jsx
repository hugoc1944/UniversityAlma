import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Linking, StyleSheet } from 'react-native';
import TopHeader from '../parents/TopHeader';
import { width } from '@fortawesome/free-solid-svg-icons/faHeart';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TopHeader data={{ heading: 'Settings' }} />
      <View style={styles.section}>
        <Text style={styles.header}>Account</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Carlos</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>carlos@gmail.com</Text>
        </View>
        <View style={styles.itemLink}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.header}>Notifications</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Enable/Disable</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#C2A5F7" }}
            thumbColor={isEnabled ? "#A083D5" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.itemLink}>
          <Text style={styles.label}>Daily Reminders</Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>Manage</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.header}>Support and Help</Text>
        <View style={styles.itemLink}>
          <Text style={styles.label}>FAQs</Text>
          <TouchableOpacity onPress={() => Linking.openURL('http://link-to-your-faq')}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>FAQ</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemLink}>
          <Text style={styles.label}>Support Contact</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:deti@ua.pt')}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>deti@ua.pt</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Privacy and Security</Text>
        <View style={styles.itemLink}>
          <Text style={styles.label}>Personal Data Management</Text>
          <TouchableOpacity onPress={() => Linking.openURL('http://link-to-personal-data-management')}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>Data Management</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemLink}>
          <Text style={styles.label}>Terms of Service</Text>
          <TouchableOpacity onPress={() => Linking.openURL('http://link-to-terms-of-service')}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>Terms of Service</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemLink}>
          <Text style={styles.label}>Privacy Policy</Text>
          <TouchableOpacity onPress={() => Linking.openURL('http://link-to-privacy-policy')}>
            <View style={styles.linkBackground}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  header1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
    textAlign: 'center',  // Centralize o título
  },
  section1: {
    marginTop: 60,
    paddingHorizontal: 130,  // Adiciona padding horizontal para evitar overflow
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,  // Uniformiza o padding horizontal
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 5,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  itemLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    maxWidth: 170,
    overflowWrap: 'break-word'
  },
  value: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  linkText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  linkBackground: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#C2A5F7', // Light purple background
    borderRadius: 20, // Rounded corners
  }
});

export default SettingsScreen;
