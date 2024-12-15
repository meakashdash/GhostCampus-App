import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';

const ContactUs = () => {
    const handleEmailPress = () => {
        Linking.openURL('mailto:ghostcampus@gmail.com');
      };
    
      return (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={styles.headerTitle}>Contact Us</Text>
          <Text style={styles.sectionDescription}>
            We'd love to hear from you! Whether you have questions, feedback, or need support,
            feel free to reach out to us. Your thoughts help us improve GhostCampus.
          </Text>
    
          {/* Contact Information */}
          <View style={styles.contactContainer}>
            <Text style={styles.sectionTitle}>📧 Email Us</Text>
            <Text style={styles.sectionDescription}>
              You can contact us anytime by sending an email to:
            </Text>
            <TouchableOpacity onPress={handleEmailPress} style={styles.emailButton}>
              <Text style={styles.emailText}>ghostcampus@gmail.com</Text>
            </TouchableOpacity>
          </View>
    
          {/* Support Information */}
          <View style={styles.contactContainer}>
            <Text style={styles.sectionTitle}>🛠️ Support Hours</Text>
            <Text style={styles.sectionDescription}>
              Our support team is available Monday to Friday, 9 AM to 6 PM (IST).
              We'll get back to you as soon as possible.
            </Text>
          </View>
    
          {/* Footer */}
          <Text style={styles.footerText}>
            Thank you for being a part of GhostCampus. Your voice matters, and we're always
            here to help!
          </Text>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#000000',
      flexGrow: 1,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#B20000',
      textAlign: 'center',
      marginBottom: 10,
    },
    sectionDescription: {
      fontSize: 14,
      color: '#eeeeee',
      lineHeight: 20,
      textAlign: 'center',
      marginBottom: 20,
    },
    contactContainer: {
      backgroundColor: '#252526',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#B20000',
      marginBottom: 5,
      textAlign: 'center',
    },
    emailButton: {
      marginTop: 10,
      alignItems: 'center',
    },
    emailText: {
      fontSize: 16,
      color: '#1E90FF',
      textDecorationLine: 'underline',
      fontWeight: '600',
    },
    footerText: {
      fontSize: 14,
      color: '#7f8c8d',
      textAlign: 'center',
      marginTop: 20,
      lineHeight: 20,
    },
  });

export default ContactUs;
