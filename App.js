import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator, useNavigation } from '@react-navigation/native-stack';
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

Amplify.configure(awsconfig);
Auth.configure(awsconfig)
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="CreateProject" component={CreateProject} />
    </Tab.Navigator>
  );
}

export default function App() {

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
      let userToken;

      try {
        Auth.currentSession().then(res=>{
          let accessToken = res.getAccessToken()
          let jwt = accessToken.getJwtToken()})
          userToken = jwt
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data.email, data.password)
        await Auth.signIn(data.email, data.password);
        let jwt = null
        let accessToken = null
        Auth.currentSession().then(res=>{
        accessToken = res.getAccessToken()
        jwt = accessToken.getJwtToken()
            
        //You can print them to see the full objects
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
        console.log(`myJwt: ${jwt}`)
        dispatch({ type: 'SIGN_IN', token: jwt });
        })
        
      },
      signOut: async () => {
        await Auth.signOut()
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        await Auth.signUp({
            username: data.email,
            password: data.password,
            attributes: {
                email: data.email,        
            }
        }).then(data => {
            let accessToken = res.getAccessToken()
            let jwt = accessToken.getJwtToken()
            dispatch({ type: 'SIGN_IN', token: jwt });
          })
          .catch(err => {
            console.log(err.message);
          });
        
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Loading" component={AppLoading} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )  
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
