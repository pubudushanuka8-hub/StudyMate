import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const subjects = [
  {
    id: 1,
    name: 'Mathematics',
    description: 'Numbers, equations and calculations',
    icon: 'calculator-outline' as const,
    color: '#2563EB',
  },
  {
    id: 2,
    name: 'Physics',
    description: 'Motion, energy and electricity',
    icon: 'planet-outline' as const,
    color: '#7C3AED',
  },
  {
    id: 3,
    name: 'English',
    description: 'Grammar, writing and reading',
    icon: 'language-outline' as const,
    color: '#EA580C',
  },
  {
    id: 4,
    name: 'ICT',
    description: 'Programming and computer studies',
    icon: 'laptop-outline' as const,
    color: '#059669',
  },
];

export default function SubjectsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Subjects 📚</Text>

      <Text style={styles.subtitle}>
        Manage and organize your study subjects.
      </Text>

      {subjects.map((subject) => (
        <View key={subject.id} style={styles.subjectCard}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: subject.color },
            ]}
          >
            <Ionicons
              name={subject.icon}
              size={28}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.subjectInfo}>
            <Text style={styles.subjectName}>
              {subject.name}
            </Text>

            <Text style={styles.description}>
              {subject.description}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#94A3B8"
          />
        </View>
      ))}

      <View style={styles.noteCard}>
        <Ionicons
          name="bulb-outline"
          size={25}
          color="#D97706"
        />

        <Text style={styles.noteText}>
          Tip: Study one subject at a time and take short breaks.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    padding: 16,
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 25,
  },

  subjectCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subjectInfo: {
    flex: 1,
  },

  subjectName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  description: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },

  noteCard: {
    backgroundColor: '#FEF3C7',
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  noteText: {
    flex: 1,
    color: '#92400E',
    fontSize: 14,
  },
});