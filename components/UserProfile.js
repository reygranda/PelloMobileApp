import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
import { Amplify, Auth } from 'aws-amplify';
import { useEffect } from 'react';
const axios = require('axios');
import { AuthContext } from './contexts/AuthContext';
import { loadAsync } from 'expo-font';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const SettingButton = ({ name, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ChangePassword')}
    >
      <Text style={styles.settingsText}> {name} </Text>
      <Icon.Button
        name="arrow-forward"
        size={28}
        backgroundColor="#fff"
        color="#A9A9A9"
        style={styles.icon}
      ></Icon.Button>
    </TouchableOpacity>
  );
};

export default function UserProfile({ props }) {
  // const userId = props.userId
  const navigation = useNavigation();
  const userId = '62504c20cd149d35c0719fb8';
  const [projects, setProjects] = React.useState(null);
  //   const [password, onChangePassword] = React.useState(null);
  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const { attributes } = await Auth.currentAuthenticatedUser();
      axios({
        method: 'GET',
        url: 'http://206.189.195.50:3000/api/project/getusersprojects',
        data: {
          email: attributes.email,
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
        <Text style={styles.username}>Rey Granda</Text>
        <TouchableOpacity>
          <Text style={styles.welcome}>Edit Image</Text>
        </TouchableOpacity>

        <Avatar
          style={styles.avatar}
          source={{
            uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
          }}
          size={80}
        />
      </View>
      <Text
        style={{
          margin: 20,
          color: '#000',
          fontFamily: 'Poppins_700Bold',
          fontSize: 16,
        }}
      >
        {' '}
        Settings{' '}
      </Text>
      <View style={styles.settingView}>
        <SettingButton name="Change Password" navigation={navigation} />
        <SettingButton name="Change Name" navigation={navigation} />
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
  user: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    paddingBottom: 10,
  },
  welcome: {
    color: '#989595',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    paddingBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    border: 'none',
    backgroundColor: '#ffffff',
  },
  settingsText: {
    color: '#000',
    fontFamily: 'Poppins_400Regular',
  },
  settingView: {
    flex: 1,
    marginHorizontal: 20,
  },
});
