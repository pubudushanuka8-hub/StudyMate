
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#777777',
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Study Tasks',
        }}
      />

      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Subjects',
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
        }}
      />
    </Tabs>
  );
}
