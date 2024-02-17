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

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const Stack = createNativeStackNavigator();

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    <NavigationContainer>
        <Stack.Navigator initialRouteName='BottomNavigation'>
        <Stack.Screen name='FisrtScreen' component={FisrtScreen} options={{headerShown : false}}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown : false}}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown : false}}/>
        <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{headerShown : false}}/>
        <Stack.Screen name='DetailProductScreen' component={DetailProductScreen} options={{headerShown : false}}/>
        </Stack.Navigator>
    </NavigationContainer>

    // </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
