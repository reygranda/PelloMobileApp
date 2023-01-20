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
  const [projects, setProjects] = React.useState(null);
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
      'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/getUsersProjectPython',
      { params: { email: attributes.email } }
    );
    await setProjects(res.data);
  };

  return (
    <View style={styles.container}>
      {projects === null && <Spinner color="black" />}
      {projects && (
        <View>
          <View style={styles.user}>
            <View>
              <Text style={styles.username}>Rey Granda</Text>
              <Text style={styles.welcome}>Hello,</Text>
            </View>
            <TouchableOpacity onPress={signOut}>
              <Avatar
                source={{
                  uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.projects}>
            <Text style={styles.projtitle}></Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateProject')}
            >
              <Icon
                name="add-circle-outline"
                size={32}
                backgroundColor="#f3f3f3"
                color="#000"
              ></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <ScrollView style={styles.projCard}>
              {projects.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    navigation.navigate('ViewProject', {
                      projectTitle: item.projectTitle,
                      description: item.description,
                    })
                  }
                >
                  <ProjectCard
                    description={item.description}
                    projectTitle={item.projectTitle}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
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
