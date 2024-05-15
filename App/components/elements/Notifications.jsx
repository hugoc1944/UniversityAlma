import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import TopHeader from '../parents/TopHeader';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'Reminder: Complete your mindfulness exercise today', 
      subtitle: '10:42 am', 
      icon: '🎧', 
      actionText: 'Listen & Relax', 
      backgroundColor: '#C2A5F7'  // Assuming the color from your design
    },
    { 
      id: 2, 
      title: 'Consistency is key! Keep up with your meditation practice.', 
      subtitle: 'Yesterday', 
      icon: '🌙', 
      actionText: 'Simple Sleeping', 
      backgroundColor: '#C2A5F7'  // Assuming the color from your design
    }
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TopHeader data={{ heading: 'Notifications' }} />
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <View key={notification.id} style={styles.notification}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.subtitle}>{notification.subtitle}</Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, {backgroundColor: notification.backgroundColor}]}>
                <Text style={styles.actionText}>{notification.actionText}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nothing new here yet.</Text>
            <Text style={styles.suggestion}>How about a peaceful meditation session now?</Text>
          </View>
        )}
      </ScrollView>
      {notifications.length > 0 && (
        <TouchableOpacity style={styles.readAllButton} onPress={clearNotifications}>
          <Text style={styles.readAllText}>Read All</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  notification: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    paddingTop: 5
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  emptyContainer: {
    padding: 20,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestion: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  readAllButton: {
    backgroundColor: '#C2A5F7',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  readAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default NotificationsScreen;
