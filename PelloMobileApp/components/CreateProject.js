import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Assets,
  Colors,
  Spacings,
  Typography,
  Text,
  Button,
  Keyboard,
  Incubator,
  Avatar,
  Card,
  Icon,
} from "react-native-ui-lib"; //eslint-disable-line
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Poppins_300Light, Poppins_700Bold } from "@expo-google-fonts/poppins";
import ProjectCard from "./ProjectCard";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import Backarrow from "../assets/backarrow.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function CreateProject() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon></Icon>
        <Text style={styles.headertitle}>Create New Project</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headertitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
  },
  welcome: {
    color: "#989595",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
});
