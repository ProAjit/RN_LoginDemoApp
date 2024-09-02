import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

// Sample data with random notifications
const notifications = [
  {
    id: '1',
    title: 'New Update Available',
    description: 'A new update is available for download. Please update your app to the latest version for new features and improvements.',
  },
  {
    id: '2',
    title: 'Scheduled Maintenance',
    description: 'Our servers will undergo scheduled maintenance from 1:00 AM to 3:00 AM. During this time, the app may be unavailable.',
  },
  {
    id: '3',
    title: 'Account Security Alert',
    description: 'We detected a login attempt from an unfamiliar device. If this wasn’t you, please change your password immediately.',
  },
  {
    id: '4',
    title: 'Welcome to Our App',
    description: 'Thank you for signing up! We hope you enjoy our service. If you have any questions, feel free to reach out to our support team.',
  },
  {
    id: '5',
    title: 'Reminder: Complete Your Profile',
    description: 'Please complete your profile to get the most out of our app. It only takes a few minutes!',
  },
];

const SafetyAlertsScreen: React.FC = () => {
  const renderItem = ({ item }: { item: { id: string; title: string; description: string } }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
    paddingVertical: 10,
    paddingHorizontal: '2.5%',
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555555',
  },
});

export default SafetyAlertsScreen;
