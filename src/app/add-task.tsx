
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function AddTaskScreen() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert(
        'Missing Details',
        'Please enter both subject and task description.'
      );
      return;
    }

    try {
      const savedTasks = await AsyncStorage.getItem('studyTasks');

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];

      const newTask = {
        id: Date.now().toString(),
        subject: subject.trim(),
        description: description.trim(),
        completed: false,
      };

      const updatedTasks = [...tasks, newTask];

      await AsyncStorage.setItem(
        'studyTasks',
        JSON.stringify(updatedTasks)
      );

      Alert.alert(
        'Success',
        'Your new study task has been added!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to add new task.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Add New Task</Text>

      <Text style={styles.subtitle}>
        Create your new study task.
      </Text>

      <Text style={styles.label}>Subject</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Mathematics"
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Task Description</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter your study task"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={addTask}
      >
        <Text style={styles.addButtonText}>
          + Add Task
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  content: {
    padding: 22,
    paddingTop: 55,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 25,
  },
  backText: {
    fontSize: 17,
    color: '#2563EB',
    fontWeight: '600',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginTop: 18,
    marginBottom: 9,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE3EF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 35,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
