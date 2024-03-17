import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconAndesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../../Screens/HomeScreen/Home';
import Love from '../../Screens/LoveScreen/Love';
import Notification from '../../Screens/NotificationScreen/Notification';
import Chat from '../../Screens/ChatScreen/Chat';
import Profile from '../../Screens/ProfileScreen/Profile';
import COLORS from '../../constants/colors';

const BottomNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#0c090a',
        headerShown: false,
        tabBarShowLabel: true,
        
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            focused ? (
              <Icon name="home-sharp" color={COLORS.App} size={32}/>
            ) : (
              <IconAndesign name="home" color={color} size={26} />
            )
          ),
        }}
      />
      <Tab.Screen
        name="Love"
        component={Love}
        headerShown={true}
        options={{
          tabBarLabel: 'Love',
          tabBarIcon: ({focused, color, size}) => (
            focused ? (
              <IconAndesign name="heart" color={COLORS.App} size={32} />
            ):(
              <IconAndesign name="hearto" color={color} size={26} />
            )
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: true,
          tabBarLabel: 'Notification',
          tabBarIcon: ({focused, color, size}) => (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: focused ? COLORS.App : color,
              }}
              onPress={() => navigation.navigate('Notification')}>
              <View>
                <MaterialCommunityIcons
                  name="bell"
                  color={focused ? COLORS.App : color}
                  size={focused ? 32 : 26}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: '',
          tabBarIcon: ({focused, color, size}) => (
            focused ? (
              <Icon name="chatbubble-ellipses-sharp" size={32} color={COLORS.App}/>
            ):(
              <Icon name="chatbubble-ellipses-outline" size={26} color={color}/>
            )
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: '',
          tabBarIcon: ({focused, color, size}) => (
            focused ? (
              <Icon name="person" color={COLORS.App} size={32} />

            ) :(
              <Icon name="person-outline" color={color} size={26} />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
