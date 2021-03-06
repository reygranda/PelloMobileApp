import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard";
import EditProject from "./EditProject";

const Tab = createBottomTabNavigator();

export default function TabNav(props) {
  const { route, navigation } = props;
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={EditProject}
          options={({ route }) => ({ tabBarShowLabel: false })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
