import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
} from 'react-native-ui-lib'; //eslint-disable-line
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Poppins_300Light, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ProjectCard from './ProjectCard';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Backarrow from '../assets/backarrow.png';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import { useDidUpdate } from 'react-native-ui-lib/src/hooks';
const axios = require('axios');
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function CreateProject(migrate, { navigation }) {
  const [projName, setProjName] = useState('');
  const [projDescription, setProjDescription] = useState('');

  const createProj = () => {
    // Creating axios call to backend
    let projectId = uuidv4();
    axios
      // POST Request
      .post(
        'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/createProject',
        {
          id: projectId,
          projectTitle: projName,
          projectDescription: projDescription,
          currentUser: 'Rooter',
        }
      )
      // .then to navigate back to Dashboard once project is created
      .then(function (response) {
        if (response == 200) {
          console.log(response);
          navigation.navigate('Dashboard');
        }
      })
      // Catch an error if one exists
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.header}>
        <Icon style={styles.icon}></Icon>
        <Text style={styles.headertitle}>Create New Project</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.projTitle}>Project Details</Text>
        <TextField
          placeholder={'Project Name'}
          floatingPlaceholder
          floatingPlaceholderColor="#1C1018"
          fieldStyle={styles.underline}
          underlineColor="#989595"
          onChangeText={(text) => setProjName(text)}
        ></TextField>
        <TextField
          placeholder={'Description'}
          floatingPlaceholder
          floatingPlaceholderColor="#1C1018"
          fieldStyle={styles.underline}
          underlineColor="#989595"
          onChangeText={(text) => setProjDescription(text)}
        ></TextField>
        <View style={styles.btn}>
          <Button
            borderRadius={5}
            backgroundColor="#1C1018"
            size="large"
            color="#fff"
            style={styles.Btn}
            onPress={() => createProj()}
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
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  headertitle: {
    flex: 3,
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  icon: {
    flex: 1,
    flexDirection: 'column',
  },
  editBtn: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: 'column',
  },
  projTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    paddingBottom: 30,
  },
  underline: {
    borderColor: '#1C1018',
    borderBottomColor: '#1C1018',
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    justifyContent: 'flex-end',
  },
  btn: {
    marginTop: 290,
  },
});
