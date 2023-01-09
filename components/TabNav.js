import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import EditProject from './EditProject';
import CreateProject from './CreateProject';
import SignUp from './SignUp';

const Tab = createBottomTabNavigator();

export default function TabNav(props) {
  const { route, navigation } = props;
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={SignUp}
          options={({ route }) => ({ tabBarShowLabel: false })}
        />
        <Tab.Screen
          name="CreateProject"
          component={CreateProject}
          options={({ route }) => ({ tabBarShowLabel: false })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
