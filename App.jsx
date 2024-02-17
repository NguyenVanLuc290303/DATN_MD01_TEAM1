/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FisrtScreen from './src/Screens/FisrtScreen/FisrtScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen/RegisterScreen';
import BottomNavigation from './src/navigation/BottomNavigation';
import DetailProductScreen from './src/Screens/DetailProductScreen/DetailProductScreen';


import ForgotPassword from './src/Screens/ForgotPassword';

function App() {


  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'LoginScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="FisrtScreen"
          component={FisrtScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // </SafeAreaView>
  );
}

export default App;
