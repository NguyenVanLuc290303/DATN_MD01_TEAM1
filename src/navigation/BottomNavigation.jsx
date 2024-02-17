import { StyleSheet, Text, View ,TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconAndesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Ionicons'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from "../Screens/HomeScreen/Home";
import Love from "../Screens/LoveScreen/Love";
import Notification from "../Screens/NotificationScreen/Notification";
import Chat from "../Screens/ChatScreen/Chat";
import Profile from "../Screens/ProfileScreen/Profile";

const BottomNavigation = ({navigation}) =>{

    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#0c090a',
                headerShown : false ,
                tabBarShowLabel : true,
                
              }}
        >
                <Tab.Screen
                name="Home"
                component={Home}
                options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({focused , color, size }) => (
                    <IconAndesign   name="home" color={color}  size={  focused ? 32 : 26}/>
                ),
                }}
                />
                <Tab.Screen
                name="Love"
                component={Love}
                headerShown={true}
                options={{
                tabBarLabel: 'Love',
                tabBarIcon: ({focused , color, size }) => (
                    <IconAndesign   name="heart" color={color}  size={  focused ? 32 : 26}/>
                ),
                }}
                />
                <Tab.Screen
                name="Notification"
                component={Notification}
                
                options={{
                tabBarLabel: '',
                tabBarIcon: ({focused, color, size }) => (
                    <TouchableOpacity style={{ 
                    width : 50 ,
                    height : 50,
                    backgroundColor : 'white',
                    alignItems : 'center',
                    justifyContent : 'center',
                    borderRadius : 25,
                    marginBottom : 20, 
                    borderWidth :1,
                    borderColor : focused ? '#000000' : color
                    
                    }}
                    onPress={() =>navigation.navigate('Notification')}
                    >
                    <View >
                    <MaterialCommunityIcons name="bell" color={ focused ? '#040303' : color} size={ focused ? 32 : 26} />
                    </View>
                    </TouchableOpacity>
                ),

                }}
                />
                <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({focused , color, size }) => (
                    <IconAndesign   name="wechat" color={color}  size={  focused ? 34 : 26}/>
                ),
                }}
                />
                <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({focused , color, size }) => (
                    <Icon name="person" color={color}  size={  focused ? 32 : 26}/>
                ),
                }}
                />
        </Tab.Navigator>
    )
}

export default BottomNavigation;