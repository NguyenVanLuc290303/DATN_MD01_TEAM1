import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconAndesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from "../components/Home";
import Love from "../components/Love";
import Notification from "../components/Notification";
import Chat from "../components/Chat";
import Profile from "../components/Profile";

const BottomNavigation = () =>{

    const BotTab = createBottomTabNavigator();

    return(
        <BotTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#0c090a',
                headerShown : false,
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
                options={{
                tabBarLabel: 'Love',
                tabBarIcon: ({focused , color, size }) => (
                    <IconAndesign   name="home" color={color}  size={  focused ? 32 : 26}/>
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
                    borderColor : focused ? 'red' : color
                    
                    }}
                    onPress={() =>navigation.navigate('Notification')}
                    >
                    <View >
                    <MaterialCommunityIcons name="bell" color={ focused ? '#040303' : color} size={26} />
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
                    <IconAndesign   name="home" color={color}  size={  focused ? 32 : 26}/>
                ),
                }}
                />
                <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({focused , color, size }) => (
                    <IconAndesign   name="home" color={color}  size={  focused ? 32 : 26}/>
                ),
                }}
                />
        </BotTab.Navigator>
    )
}
const styles = StyleSheet.create({
    container :{
        
    }
})


export default BottomNavigation;