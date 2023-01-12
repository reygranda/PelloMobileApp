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
} from 'react-native-ui-lib'; //eslint-disable-line
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from './contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function SignUp() {
  const [fullname, onChangeFullName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const { signUp, error } = React.useContext(AuthContext);
  const navigator = useNavigation();

  return (
    <KeyboardAwareScrollView
      extraHeight={25}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Pello</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFullName}
          value={fullname}
          placeholder="Enter Full Name"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Enter Email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Enter Password"
          keyboardType="default"
        />
        <TouchableOpacity onPress={() => signUp({ fullname, email, password })} style={styles.button}>
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigator.navigate("Login")} style={styles.button}>
          <Text style={styles.btntext}>Go to Login</Text>
        </TouchableOpacity>
        {error && <Text>{error}</Text>}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    width: 250,
    marginBottom: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 50,
    paddingLeft: 20,
    borderColor: '#e7e7f7',
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 150,
  },
  button: {
    backgroundColor: 'black',
    color: '#fff',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  btntext: {
    color: '#fff',
    textAlign: 'center',
  },
});
