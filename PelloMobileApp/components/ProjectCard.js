import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
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
} from "react-native-ui-lib"; //eslint-disable-line
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Poppins_300Light, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function ProjectCard(props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>{props.projectTitle}</Text>
      <Text style={styles.cardSubTitle}>{props.date}</Text>
      <Avatar size={24}></Avatar>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#000",
    shadowColor: "#000",
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#fff",
    paddingBottom: 5,
  },
  cardSubTitle: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    color: "#989595",
    paddingBottom: 40,
  },
});
