import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>About GhostCampus</Text>
      <Text style={styles.appDescription}>
        GhostCampus is an anonymous social media app designed exclusively for
        college students. It provides a safe space for students to interact,
        share, and engage without revealing their identities.
      </Text>

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Key Features</Text>

        {/* Anonymous Profiles */}
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🕵️ Anonymous Profiles</Text>
          <Text style={styles.featureDescription}>
            Create anonymous profiles using your college email or a unique
            username. Your identity remains private.
          </Text>
        </View>

        {/* Feed and Posts */}
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>📋 Feed and Posts</Text>
          <Text style={styles.featureDescription}>
            Post anonymously on topics like academics, campus events, and social
            issues. Like, comment, and share posts with your peers.
          </Text>
        </View>

        {/* Mood Calendar */}
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>📅 Mood Calendar</Text>
          <Text style={styles.featureDescription}>
            Track your daily moods and store them to reflect on your emotional
            well-being over time.
          </Text>
        </View>

        {/* Marketplace */}
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🛒 Marketplace</Text>
          <Text style={styles.featureDescription}>
            Buy and sell college items at reasonable prices. A
            student-to-student marketplace made simple and accessible.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Empowering students to express freely and connect anonymously.
        GhostCampus – where your voice matters.
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
  appDescription: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B20000',
    marginBottom: 10,
  },
  featureItem: {
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
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#B20000',
    marginBottom: 5,
  },
  featureDescription: {
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

export default About;
