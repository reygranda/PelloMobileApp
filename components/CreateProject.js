import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import backArrow from '../assets/arrow-back-svgrepo-com.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { Amplify, Auth } from 'aws-amplify';

export default function CreateProject(migrate) {
  const [projName, setProjName] = useState('');
  const [error, setError] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const navigation = useNavigation();

  const createProj = async () => {
    // Creating axios call to backend
    let projectId = uuidv4();
    const { attributes } = await Auth.currentAuthenticatedUser();
    if (!projName) {
      setError('Please Enter Project Name');
      return;
    }
    axios
      // POST Request
      .post(
        'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/createProject',
        {
          id: projectId,
          projectTitle: projName,
          projectDescription: projDescription,
          currentUser: attributes.email,
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
          navigation.navigate('Dashboard');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.header}>
        <Icon.Button
          name="arrow-back-outline"
          size={28}
          backgroundColor="#fff"
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        ></Icon.Button>
        <Text style={styles.headertitle}>Create New Project</Text>
        <TouchableOpacity style={styles.editBtn}></TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.projTitle}>Project Details</Text>
        <TextField
          migrate
          placeholder={'Project Name'}
          floatingPlaceholder
          fieldStyle={styles.underline}
          onChangeText={(text) => setProjName(text)}
        ></TextField>
        {error && <Text>{error}</Text>}

        <TextField
          migrate
          placeholder={'Description'}
          floatingPlaceholder
          fieldStyle={styles.underline}
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
    marginLeft: 10,
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

  btnText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    justifyContent: 'flex-end',
  },
  btn: {
    marginTop: 290,
  },
  underline: {
    border: 'none',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
