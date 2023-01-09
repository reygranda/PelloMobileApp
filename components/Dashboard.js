import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
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
} from 'react-native-ui-lib'; //eslint-disable-line
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Poppins_300Light, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ProjectCard from './ProjectCard';
import CreateProject from './CreateProject';
import { useEffect } from 'react';
const axios = require('axios');

export default function Dashboard({ props, navigation }) {
  // const userId = props.userId
  const userId = '62504c20cd149d35c0719fb8';
  const [projects, setProjects] = React.useState(null);
  //   const [password, onChangePassword] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      axios({
        method: 'GET',
        url: 'http://206.189.195.50:3000/api/project/getusersprojects',
        data: {
          userid: userId,
        },
        'Content-Length': '854',
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
        .then(function (response) {
          console.log(response);
          setProjects(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, []);

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
            uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
          }}
        />
      </View>
      <View style={styles.projects}>
        <Text style={styles.projtitle}>Projects</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateProject')}>
          <Text>Add Project</Text>
        </TouchableOpacity>
        <View style={styles.projCard}>
          <ProjectCard projectTitle="Web App" date="January" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  projects: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingTop: 20,
  },
  projtitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    paddingBottom: 30,
  },
  user: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
  },
  welcome: {
    color: '#989595',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  projCard: {
    marginVertical: 20,
  },
});
