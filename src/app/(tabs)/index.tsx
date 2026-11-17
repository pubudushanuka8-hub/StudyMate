
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type StudyTask = {
  id: number;
  title: string;
  subject: string;
  time: string;
  completed: boolean;
};

const STORAGE_KEY = 'studyTasks';

const defaultTasks: StudyTask[] = [
  {
    id: 1,
    title: 'Read Chapter 01',
    subject: 'Mathematics',
    time: '08:00 AM',
    completed: false,
  },
  {
    id: 2,
    title: 'Complete Tutorial 02',
    subject: 'Physics',
    time: '10:00 AM',
    completed: false,
  },
  {
    id: 3,
    title: 'Study English Grammar',
    subject: 'English',
    time: '02:00 PM',
    completed: false,
  },
  {
    id: 4,
    title: 'Practice Programming',
    subject: 'ICT',
    time: '04:00 PM',
    completed: false,
  },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);

  const loadTasks = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved === null) {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(defaultTasks)
        );
        setTasks(defaultTasks);
      } else {
        const parsed = JSON.parse(saved);
        setTasks(Array.isArray(parsed) ? parsed : defaultTasks);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not load tasks.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const openAddTask = () => {
    router.push('/add-task');
  };

  const toggleTask = async (id: number) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updated);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
    } catch (error) {
      Alert.alert('Error', 'Could not update task.');
      loadTasks();
    }
  };

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.appName}>StudyMate 📚</Text>
        <Text style={styles.welcome}>
          Welcome to your study planner!
        </Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>
          Today's Progress
        </Text>

        <Text style={styles.progressNumber}>
          {progress}%
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {completed} of {tasks.length} tasks completed
        </Text>
      </View>

      {/* ADD TASK BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={openAddTask}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>
          + Add New Study Task
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        My Study Tasks
      </Text>

      {tasks.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No Study Tasks
          </Text>
          <Text style={styles.emptyText}>
            Press the Add Task button to create a new task.
          </Text>
        </View>
      ) : (
        tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => toggleTask(task.id)}
            activeOpacity={0.8}
          >
            <View style={styles.taskInfo}>
              <Text style={styles.subject}>
                {task.subject}
              </Text>

              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.completedTitle,
                ]}
              >
                {task.title}
              </Text>

              <Text style={styles.taskTime}>
                🕒 {task.time}
              </Text>
            </View>

            <View
              style={[
                styles.checkCircle,
                task.completed && styles.checkedCircle,
              ]}
            >
              <Text style={styles.checkText}>
                {task.completed ? '✓' : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.footer}>
        Stay Focused. Keep Learning! 🌟
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  content: {
    paddingBottom: 35,
  },
  header: {
    backgroundColor: '#2563EB',
    padding: 25,
    paddingTop: 35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  welcome: {
    color: '#DBEAFE',
    marginTop: 8,
    fontSize: 14,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#172554',
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 12,
  },
  progressBackground: {
    height: 9,
    backgroundColor: '#DBEAFE',
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 9,
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
  progressText: {
    color: '#64748B',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#2563EB',
    marginHorizontal: 18,
    marginBottom: 22,
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#172554',
    marginHorizontal: 18,
    marginBottom: 15,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginBottom: 13,
    padding: 17,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  taskInfo: {
    flex: 1,
  },
  subject: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 13,
  },
  taskTitle: {
    color: '#172554',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskTime: {
    color: '#64748B',
    marginTop: 8,
    fontSize: 13,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  checkedCircle: {
    backgroundColor: '#2563EB',
  },
  checkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    padding: 25,
    borderRadius: 14,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#172554',
  },
  emptyText: {
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    color: '#64748B',
    margin: 25,
  },
});
