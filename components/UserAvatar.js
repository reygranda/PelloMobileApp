import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import * as React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Poppins_300Light, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ProjectCard from './ProjectCard';
import CreateProject from './CreateProject';
import ViewProject from './ViewProject';
import { Amplify, Auth } from 'aws-amplify';
import { useEffect } from 'react';
const axios = require('axios');
import { AuthContext } from './contexts/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Dashboard({ navigation }) {
  // const userId = props.userId
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const isFocused = useIsFocused();
  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (isFocused) {
        getInitialData();
      }
    }
    fetchData();
  }, [isFocused]);

  const getInitialData = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const res = await axios.get(
      'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/getUserInfo',
      { params: { email: attributes.email } }
    );
    await setAvatarUrl(res.data.avatarUrl);
  };

  return (
        <TouchableOpacity onPress={signOut}>
            <Avatar
            source={{
                uri: avatarUrl,
            }}
            />
        </TouchableOpacity>
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projtitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
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
    height: 550,
  },
});
