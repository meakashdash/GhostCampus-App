import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Terms and Conditions</Text>
      <Text style={styles.sectionDescription}>
        By using GhostCampus, you agree to the following terms and conditions.
        Please read carefully to ensure a positive and respectful experience for
        all users.
      </Text>

      {/* Sections */}
      <View style={styles.sectionContainer}>
        {/* User Conduct */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>📝 User Conduct</Text>
          <Text style={styles.sectionDescription}>
            Users must interact respectfully and avoid sharing offensive,
            inappropriate, or harmful content. Violators may face account
            suspension or permanent removal.
          </Text>
        </View>

        {/* Anonymous Posting */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>🕵️ Anonymous Posting</Text>
          <Text style={styles.sectionDescription}>
            While profiles are anonymous, any misuse or abuse of anonymity to
            harm others will not be tolerated. GhostCampus reserves the right to
            investigate and take action where necessary.
          </Text>
        </View>

        {/* Privacy */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>🔒 Privacy Policy</Text>
          <Text style={styles.sectionDescription}>
            Your data is securely stored, and no personal information will be
            shared without your consent. For more details, refer to our Privacy
            Policy.
          </Text>
        </View>

        {/* Marketplace Usage */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>🛒 Marketplace Usage</Text>
          <Text style={styles.sectionDescription}>
            The marketplace is designed for students to buy and sell items.
            Illegal or prohibited items are not allowed and will result in
            account suspension.
          </Text>
        </View>

        {/* Mood Calendar */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>📅 Mood Calendar</Text>
          <Text style={styles.sectionDescription}>
            The Mood Calendar feature is for personal reflection. GhostCampus
            will never share this data and ensures its complete confidentiality.
          </Text>
        </View>

        {/* Termination */}
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>⚠️ Termination</Text>
          <Text style={styles.sectionDescription}>
            GhostCampus reserves the right to suspend or terminate accounts that
            violate these terms without prior notice.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        By continuing to use GhostCampus, you acknowledge that you have read,
        understood, and agree to abide by these terms and conditions.
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

export default TermsAndConditions;
