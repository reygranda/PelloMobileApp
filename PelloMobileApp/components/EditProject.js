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
  TextField,
} from "react-native-ui-lib"; //eslint-disable-line
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Poppins_300Light, Poppins_700Bold } from "@expo-google-fonts/poppins";
import ProjectCard from "./ProjectCard";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import Backarrow from "../assets/backarrow.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function CreateProject(props) {

const [updateProjTitle, setUpdateProjTitle ] = useState("")
const [updateProjDesc, setUpdateProjDesc ] = useState("")



const updateProject = () => {
  axios
  
  .put("http://206.189.195.50:3000/api/project/adduser", {
    projectid: ,
    projectTitle: setUpdateProjTitle,
    projectDescription: setUpdateProjDesc,

  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err); 
  })
    
}

  return (
    <View>
      <View style={styles.header}>
        <Icon style={styles.icon}></Icon>
        <Text style={styles.headertitle}>Edit Project</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.projTitle}>Project Details</Text>
        <TextField
          placeholder={"Project Name"}
          floatingPlaceholder
          floatingPlaceholderColor="#1C1018"
          fieldStyle={styles.underline}
          underlineColor="#989595"
          onChangeText={(text) => updateProjTitle(text)}
        ></TextField>
        <TextField
          placeholder={"Description"}
          floatingPlaceholder
          floatingPlaceholderColor="#1C1018"
          fieldStyle={styles.underline}
          underlineColor="#989595"
          onChangeText={(text) => updateProjDesc(text)}
        ></TextField>
        <View style={styles.btn}>
          <Button
            borderRadius={5}
            backgroundColor="#1C1018"
            size="large"
            color="#fff"
            style={styles.Btn}
          >
            <Text style={styles.btnText}>Update</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column",
  },
  projTitle: {
    textAlign: "center",
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
    marginTop: 290,
  },
});
