import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Chat, Love, Notification, Profile} from '../Screens';
import {NavigationContainer} from '@react-navigation/native';
import {Icons} from '../constants/images';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../Screens/EditProfile';
import MessageScreen from '../Screens/MessageScreen';

const Tab = createBottomTabNavigator();
const ScreensApp = createNativeStackNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShow: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: '#fff',
  },
};
const BottomNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Chat"
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={Icons.IconChat} style={styles.iconStyle} />
                <Text style={{fontSize: 12, color: '#16247d'}}>Chat</Text>
              </View>
            ),
          }}>
          {() => (
            <ScreensApp.Navigator>
              <ScreensApp.Screen
                name="Chat"
                component={Chat}
                options={{headerShown: false}}
              />
              <ScreensApp.Screen
                name="MessageScreen"
                component={MessageScreen}
                options={{headerShown: false}}
              />
            </ScreensApp.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Love"
          component={Love}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={Icons.IconLove} style={styles.iconStyle} />
                <Text style={{fontSize: 12, color: '#16247d'}}>Love</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#959595',
                  top: Platform.OS === 'ios' ? -10 : -20,
                  width: Platform.OS === 'ios' ? 50 : 60,
                  height: Platform.OS === 'ios' ? 50 : 60,
                  borderRadius: Platform.OS === 'ios' ? 25 : 30,
                }}>
                <Image source={Icons.IconHome} style={styles.iconStyle} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={Icons.IconNotification}
                  style={styles.iconStyle}
                />
                <Text style={{fontSize: 12, color: '#16247d'}}>
                  Notification
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={Icons.IconCustomer} style={styles.iconStyle} />
                <Text style={{fontSize: 12, color: '#16247d'}}>Profile</Text>
              </View>
            ),
          }}>
          {() => (
            <ScreensApp.Navigator>
              <ScreensApp.Screen
                name="Security"
                component={Profile}
                options={{headerShown: false}}
              />
              <ScreensApp.Screen
                name="EditProfile"
                component={EditProfile}
                options={{headerShown: false}}
              />
            </ScreensApp.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {},
  iconStyle: {
    width: 24,
    height: 24,
  },
});

export default BottomNavigation;
