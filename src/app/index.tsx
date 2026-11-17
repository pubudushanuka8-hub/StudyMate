
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router, useFocusEffect } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type StudyTaskItem = {
  id: string;
  subject: string;
  description: string;
  completed: boolean;
};

const initialTasks: StudyTaskItem[] = [
  {
    id: '1',
    subject: 'Mathematics',
    description: 'Complete mathematics exercises',
    completed: false,
  },
  {
    id: '2',
    subject: 'Programming',
    description: 'Practice JavaScript coding',
    completed: true,
  },
  {
    id: '3',
    subject: 'Electronics',
    description: 'Study circuit theory',
    completed: false,
  },
];

function StudyTask({
  task,
  onToggle,
}: {
  task: StudyTaskItem;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: task.completed }}
    >
      <View style={styles.taskContent}>
        <Text style={styles.taskSubject}>{task.subject}</Text>
        <Text style={styles.taskDescription}>
          {task.description}
        </Text>
      </View>

      <Text style={styles.taskStatus}>
        {task.completed ? '✓' : '○'}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<StudyTaskItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('studyTasks');

      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(initialTasks);
        await AsyncStorage.setItem(
          'studyTasks',
          JSON.stringify(initialTasks)
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to load study tasks.');
    } finally {
      setLoaded(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const saveTasks = async (updatedTasks: StudyTaskItem[]) => {
    try {
      await AsyncStorage.setItem(
        'studyTasks',
        JSON.stringify(updatedTasks)
      );
      setTasks(updatedTasks);
    } catch (error) {
      Alert.alert('Error', 'Unable to save tasks.');
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    saveTasks(updatedTasks);
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  const setReminder = async () => {
    try {
      const permission =
        await Notifications.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow notifications in your phone settings.'
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '📚 StudyMate Reminder',
          body: 'Time to study! Complete your study tasks today.',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 60,
        },
      });

      Alert.alert(
        'Reminder Set!',
        'You will receive a study reminder in 1 minute.'
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to schedule reminder.');
    }
  };

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading StudyMate...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>📚 StudyMate</Text>
        <Text style={styles.greeting}>Good Evening!</Text>
        <Text style={styles.subtitle}>
          Let's make today productive.
        </Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Study Progress</Text>

        <Text style={styles.percentage}>{progress}%</Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {completedCount} of {tasks.length} tasks completed
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* ADD NEW TASK BUTTON */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-task')}
      >
        <Text style={styles.addButtonText}>
          + Add New Task
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Today's Study Tasks
      </Text>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>
          No tasks available. Add your first study task!
        </Text>
      ) : (
        tasks.map((task) => (
          <StudyTask
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
          />
        ))
      )}

      <TouchableOpacity
        style={styles.reminderButton}
        onPress={setReminder}
      >
        <Text style={styles.reminderText}>
          🔔 Set Study Reminder
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Keep learning. Keep growing! 🌟
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6FC',
  },
  loadingText: {
    color: '#2563EB',
    fontSize: 17,
  },
  header: {
    marginTop: 45,
    marginBottom: 25,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
  },
  subtitle: {
    fontSize: 15,
    color: '#777777',
    marginTop: 6,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563EB',
    marginVertical: 12,
  },
  progressBackground: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 10,
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
  progressText: {
    color: '#777777',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 15,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#172554',
  },
  taskDescription: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginLeft: 12,
  },
  emptyText: {
    color: '#777777',
    marginBottom: 20,
  },
  reminderButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  reminderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#888888',
    marginVertical: 25,
  },
});
