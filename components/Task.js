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
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function Task(migrate) {
  const [projName, setProjName] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const navigation = useNavigation();

  const createProj = async () => {
    // Creating axios call to backend
    let projectId = uuidv4();
    const { attributes } = await Auth.currentAuthenticatedUser();
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
        <Text style={styles.headertitle}>Task Name</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text
            style={{
              color: '#000',
              textAlign: 'right',
              marginRight: 20,
              margiLeft: -50,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.subTitles}>Task Name</Text>

          <Text style={{ color: '#989595' }}>Complete project routes</Text>
        </View>
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.subTitles}>Created By</Text>

          <Text style={{ color: '#989595' }}>Complete project routes</Text>
        </View>
        <View>
          <Text style={styles.subTitles}>Due Date</Text>
          <RNDateTimePicker
            style={{ alignSelf: 'left', marginBottom: 30 }}
            value={new Date()}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Assigned To</Text>
          <TouchableOpacity>
            <Avatar
              style={styles.avatar}
              source={{
                uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <Button
            borderRadius={5}
            backgroundColor="#1C1018"
            size="large"
            color="#fff"
            style={styles.Btn}
            onPress={() => createProj()}
          >
            <Text style={styles.btnText}>Re-Locate Task</Text>
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headertitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  subTitles: {
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Poppins_700Bold',
    paddingBottom: 10,
  },
  icon: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  editBtn: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,

    color: '#000',
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
    bottom: -100,
  },
  underline: {
    border: 'none',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
