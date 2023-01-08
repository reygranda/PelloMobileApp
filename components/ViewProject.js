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
  Typography,
  Spacings,
  Text,
  Button,
  Keyboard,
  Incubator,
  Avatar,
  Card,
  Icon,
  TextField,
  Colors,
  ExpandableSection,
  ExpandableSectionProps,
} from "react-native-ui-lib"; //eslint-disable-line
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Poppins_300Light, Poppins_700Bold } from "@expo-google-fonts/poppins";
import ProjectCard from "./ProjectCard";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import Backarrow from "../assets/backarrow.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function CreateProject(props) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.header}>
        <View style={styles.row1}>
          <Icon style={styles.icon}></Icon>
          <Text style={styles.headertitle}>Project Name</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <Text style={styles.headerTitle2}>Description</Text>
          <Text style={styles.projDescription}>Project Description</Text>
        </View>
      </View>

      <View style={styles.bucketContainer}>
        <Text style={styles.bucketTitle}>Buckets</Text>
        <View>
          <ExpandableSection
            expanded={true}
            sectionHeader={<Text>Test</Text>}
          ></ExpandableSection>
        </View>
        <View style={styles.btn}>
          <Button
            borderRadius={5}
            backgroundColor="#1C1018"
            size="large"
            color="#fff"
            style={styles.Btn}
          >
            <Text style={styles.btnText}>Create</Text>
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 0,
    justifyContent: "center",
  },
  headertitle: {
    flex: 3,
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  headerTitle2: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    paddingVertical: 20,
  },
  projDescription: {
    color: "#989595",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  icon: {
    flex: 1,
    flexDirection: "column",
  },
  editBtn: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    textAlign: "center",
  },
  row1: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  bucketContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
  },
  bucketTitle: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    paddingBottom: 30,
  },
  underline: {
    borderColor: "#1C1018",
    borderBottomColor: "#1C1018",
  },
  btnText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    justifyContent: "flex-end",
  },
  btn: {
    marginTop: 280,
  },
});
