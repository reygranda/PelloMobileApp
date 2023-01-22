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
import UserAvatar from './UserAvatar'
import { Amplify, Auth, Storage } from 'aws-amplify';
import { useEffect } from 'react';
const axios = require('axios');
import { AuthContext } from './contexts/AuthContext';
import { loadAsync } from 'expo-font';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

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
  const [image, setImage] = React.useState(null);
  const navigation = useNavigation();
  const userId = '62504c20cd149d35c0719fb8';
  const [projects, setProjects] = React.useState(null);
  const { signOut } = React.useContext(AuthContext);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.canceled) {
      const imagePath = result.assets[0].uri;
      const imagePathCleaned = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length)
      const imageExt = imagePath.split('.').pop();
      const imageMime = `image/${imageExt}`;

      let picture = await fetch(imagePath);
      picture = await picture.blob();

      const imageData = new File([picture], `photo.${imageExt}`);
      axios(
          "https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/getPresignedS3Url?fileName=" +
              imagePathCleaned
      ).then(async response => {
          // Getting the url from response
          const url = response.data.fileUploadURL;
          const finalUrl = url.split('?')[0]
          // Initiating the PUT request to upload file    
          await fetch(url, {
              method: "PUT",
              body: imageData,
              key: imagePath,
              headers: {
                'Content-Type': imageMime
              }
          })
              .then(async res => {
                //add the s3 url to the users dynamo table
                const { attributes } = await Auth.currentAuthenticatedUser();
                axios
                // POST Request
                .post(
                  'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/addS3URLtoUser',
                  {
                    s3url: finalUrl,
                    email: attributes.email,
                  }
                )
                .then(function (response) {
                  if (response.status == 200) {
                  }
                })
                .catch(function (error) {
                });
              })
              .catch(err => {
                this.setState({
                    error: "Error Occured while uploading the file",
                    uploadSuccess: undefined
                });
              });
      });
      setImage(result.assets[0].uri);
    }
  };

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
          setProjects(response.data);
        })
        .catch(function (error) {
        });
    }
    fetchData();
  }, []);

  const handleEditImage = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Text style={styles.username}>Rey Granda</Text>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.welcome}>Edit Image</Text>
        </TouchableOpacity>

        <UserAvatar avatarSize={80}/>
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
