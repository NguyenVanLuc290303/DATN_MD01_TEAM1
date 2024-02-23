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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FisrtScreen from './src/Screens/FisrtScreen/FisrtScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen/RegisterScreen';
import BottomNavigation from './src/navigation/BottomNavigation';
import DetailProductScreen from './src/Screens/DetailProductScreen/DetailProductScreen';
import OnboardingScreen from './src/Screens/OnboardingScreen/OnboardingScreen';
import {EditProfile} from './src/Screens';
import {MessageScreen} from './src/Screens';

import ForgotPassword from './src/Screens/ForgotPassword/ForgotPassword';
import DetailMessage from './src/Screens/MessageScreen/DetailMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './src/Screens/ProfileScreen/Profile';
import SendOtpScreen from './src/Screens/SendOtp/SendOtpScreen';
import PaymentScreen from './src/Screens/PaymentScreen/PaymentScreen';
import OrderDetailsScreen from './src/Screens/OrderDetails/OrderDetailsScreen';
import CartScreen from './src/Screens/CartScreen/CartScreen';

function App() {
  const Stack = createNativeStackNavigator();
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'MessageScreen') {
      return false;
    }
    return true;
  };

  const ProfileStack = ({navigation}) => {
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'CartScreen'}
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
        {/* <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={({route}) => ({
            headerShown: getTabBarVisibility(route),
            tabBarIcon: ({color, size}) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                color={color}
                size={size}
              />
            ),
          })}
        />
        {/* <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailProductScreen"
          component={DetailProductScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DetailMessage"
          component={DetailMessage}
          options={({route}) => ({
            title: route.params.userName,
            headerBackTitleVisible: false,
            headerShown: true,
          })}
        />

        <Stack.Screen
          name="SendOtpScreen"
          component={SendOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // </SafeAreaView>
  );
}

export default App;
