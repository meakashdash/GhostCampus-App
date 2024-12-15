import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Privacy Policy</Text>
      <Text style={styles.sectionDescription}>
        Your privacy is important to us. GhostCampus is committed to protecting
        your personal information and ensuring your anonymity while using our
        app.
      </Text>

      {/* Policy Sections */}
      <View style={styles.sectionContainer}>
        {/* Data Collection */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>📊 Data Collection</Text>
          <Text style={styles.sectionDescription}>
            We only collect necessary information, such as your college email
            for account verification. All posts, marketplace data, and mood
            calendar entries remain anonymous and encrypted.
          </Text>
        </View>

        {/* Data Usage */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>⚙️ How We Use Your Data</Text>
          <Text style={styles.sectionDescription}>
            Your data is used to provide core functionalities, such as user
            authentication, maintaining anonymous posts, and offering a seamless
            experience. We never share or sell your data to third parties.
          </Text>
        </View>

        {/* Anonymity */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>🕵️ Anonymity</Text>
          <Text style={styles.sectionDescription}>
            GhostCampus ensures your anonymity while posting and interacting
            with others. Your identity will never be revealed to other users or
            external parties.
          </Text>
        </View>

        {/* Data Storage */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>💾 Data Storage and Security</Text>
          <Text style={styles.sectionDescription}>
            All data is stored securely using advanced encryption methods. We
            take all reasonable steps to protect your data from unauthorized
            access or misuse.
          </Text>
        </View>

        {/* Mood Calendar Privacy */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>📅 Mood Calendar Data</Text>
          <Text style={styles.sectionDescription}>
            Your mood calendar entries are private and visible only to you. We
            do not use this data for analytics or tracking purposes.
          </Text>
        </View>

        {/* User Rights */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>🔑 Your Rights</Text>
          <Text style={styles.sectionDescription}>
            You have the right to delete your account and all associated data at
            any time. For data deletion requests, please contact our support
            team.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        By using GhostCampus, you agree to our Privacy Policy. If you have any
        concerns, feel free to reach out to us.
      </Text>
    </ScrollView>
  );
};

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
  sectionContainer: {
    marginTop: 20,
  },
  sectionItem: {
    backgroundColor: '#252526',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#B20000',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#eeeeee',
    lineHeight: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
});

export default PrivacyPolicy;
