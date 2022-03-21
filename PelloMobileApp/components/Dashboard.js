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

export default function Landing() {
  //   const [fullname, onChangeFullName] = React.useState(null);
  //   const [email, onChangeEmail] = React.useState(null);
  //   const [password, onChangePassword] = React.useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View>
          <Text style={styles.username}>Rey Granda</Text>
          <Text style={styles.welcome}>Hello,</Text>
        </View>
        <Avatar
          style={styles.avatar}
          source={{
            uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg",
          }}
        />
      </View>
      <View style={styles.projects}>
        <Text style={styles.projtitle}>Projects</Text>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Web App</Text>
          <Text style={styles.cardSubTitle}>January 5th, 2022</Text>
          <Avatar size={24}></Avatar>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Web App</Text>
          <Text style={styles.cardSubTitle}>January 5th, 2022</Text>
          <Avatar size={24}></Avatar>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Web App</Text>
          <Text style={styles.cardSubTitle}>January 5th, 2022</Text>
          <Avatar size={24}></Avatar>
        </Card>
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
  projects: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  projtitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    paddingBottom: 30,
  },
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
  user: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
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
