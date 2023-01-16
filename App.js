import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import {
  createNativeStackNavigator,
  useNavigation,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import Dashboard from './components/Dashboard';
import CreateProject from './components/CreateProject';
import Login from './components/Login';
import { AuthContext } from './components/contexts/AuthContext';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './components/aws-exports';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import ViewProject from './components/ViewProject';
import ChangePassword from './components/ChangePassword';
import * as Font from 'expo-font';
import Task from './components/Task';
const axios = require('axios');

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="CreateProject" component={CreateProject} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="ViewProject" component={ViewProject} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'Signup', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const loadFonts = async () => {
    Font.loadAsync({
      Poppins_400Regular: require('./assets/fonts/Poppins-Regular.ttf'),
    });
  };
  const [error, setError] = React.useState(null);

  const changeError = (message) => {
    setError(message);
  };

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      var userToken;

      try {
        Auth.currentSession().then((res) => {
          let accessToken = res.getAccessToken();
          let jwt = accessToken.getJwtToken();
          userToken = jwt;
          //console.log(userToken)
          setError(null);
          console.log(userToken);
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        });
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: null });
    };

    bootstrapAsync();
  }, []);

  const signIn = async (data) => {
    try {
      console.log(data.email, data.password);
      await Auth.signIn(data.email, data.password);
      let res = await Auth.currentSession();
      let accessToken = res.getAccessToken();
      let jwt = accessToken.getJwtToken();
      console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
      dispatch({ type: 'SIGN_IN', token: jwt });
    } catch (e) {
      setError(e.message);
    }
  };

  const signOut = async () => {
    await Auth.signOut();
    setError(null);
    dispatch({ type: 'SIGN_OUT' });
  };

  const signUp = async (data) => {
    try {
      await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
        },
      });
      await Auth.signIn(data.email, data.password);
      await axios
        .post(
          'https://3820foa0lk.execute-api.us-east-1.amazonaws.com/default/createUser',
          {
            email: data.email,
            fullname: data.fullname,
          }
        )
        .then(function (response) {
          console.log(response);
          if (response == 200) {
            console.log(response);
          }
        })
        .catch(function (error) {
          setError(error.message);
          console.log(error.message);
        });
      let res = await Auth.currentSession();
      let accessToken = res.getAccessToken();
      let jwt = accessToken.getJwtToken();
      dispatch({ type: 'SIGN_IN', token: jwt });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp, error }}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading && fontsLoaded ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Loading" component={AppLoading} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
