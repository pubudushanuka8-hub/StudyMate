import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons
          name="book"
          size={65}
          color="#2563EB"
        />

        <Text style={styles.appName}>StudyMate</Text>

        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>About StudyMate</Text>

        <Text style={styles.description}>
          StudyMate is a simple study planner application
          designed to help students organize their daily
          study activities.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>App Features</Text>

        <Feature
          icon="checkmark-circle-outline"
          text="Manage daily study tasks"
        />

        <Feature
          icon="bar-chart-outline"
          text="Track study progress"
        />

        <Feature
          icon="library-outline"
          text="View study subjects"
        />

        <Feature
          icon="notifications-outline"
          text="Receive study reminders"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>App Purpose</Text>

        <Text style={styles.description}>
          The purpose of StudyMate is to improve time
          management and help students maintain a
          consistent study routine.
        </Text>
      </View>

      <Text style={styles.footer}>
        Made for students ❤️
      </Text>
    </ScrollView>
  );
}

interface FeatureProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

function Feature({ icon, text }: FeatureProps) {
  return (
    <View style={styles.featureRow}>
      <Ionicons
        name={icon}
        size={22}
        color="#2563EB"
      />

      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    padding: 16,
  },

  logoContainer: {
    alignItems: 'center',
    padding: 30,
  },

  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 12,
  },

  version: {
    color: '#64748B',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
  },

  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 23,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
    gap: 12,
  },

  featureText: {
    fontSize: 14,
    color: '#475569',
  },

  footer: {
    textAlign: 'center',
    color: '#64748B',
    marginVertical: 20,
  },
});