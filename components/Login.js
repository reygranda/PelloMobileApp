import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from './contexts/AuthContext';

export default function Login() {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const { signIn } = React.useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      extraHeight={25}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Pello</Text>
      <View>
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
        <TouchableOpacity onPress={() => signIn({ email, password })} style={styles.button}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
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
