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
// =======
// import {
//   Image,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import {Icons} from '../constants/images';

// import Home from "../Screens/HomeScreen/Home";
// import Love from "../Screens/LoveScreen/Love";
// import Notification from "../Screens/NotificationScreen/Notification";
// import Chat from "../Screens/ChatScreen/Chat";
// import Profile from "../Screens/ProfileScreen/Profile";

// const Tab = createBottomTabNavigator();
// const screenOptions = {
//   tabBarShowLabel: false,
//   headerShow: false,
//   tabBarStyle: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     left: 0,
//     elevation: 0,
//     height: 60,
//     background: '#fff',
//   },
// };
// const BottomNavigation = () => {
//   return (
//     <NavigationContainer independent={true}>
//       <Tab.Navigator screenOptions={screenOptions}>
//         <Tab.Screen
//           name="Chat"
//           component={Chat}
//           options={{
//             tabBarIcon: ({focused}) => {
//               return (
//                 <View style={{alignItems: 'center', justifyContent: 'center'}}>
//                   <Image source={Icons.IconChat} style={styles.iconStyle} />
//                   <Text style={{fontSize: 12, color: '#16247d'}}>Chat</Text>
//                 </View>
//               );
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Love"
//           component={Love}
//           options={{
//             tabBarIcon: ({focused}) => {
//               return (
//                 <View style={{alignItems: 'center', justifyContent: 'center'}}>
//                   <Image source={Icons.IconLove} style={styles.iconStyle} />
//                   <Text style={{fontSize: 12, color: '#16247d'}}>Love</Text>
//                 </View>
//               );
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Home"
//           component={Home}
//           options={{
//             tabBarIcon: ({focused}) => {
//               return (
//                 <View
//                   style={{
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     backgroundColor: '#fff',
//                     borderWidth: 1,
//                     borderColor: '#959595',
//                     top: Platform.OS === 'ios' ? -10 : -20,
//                     width: Platform.OS === 'ios' ? 50 : 60,
//                     height: Platform.OS === 'ios' ? 50 : 60,
//                     borderRadius: Platform.OS === 'ios' ? 25 : 30,
//                   }}>
//                   <Image source={Icons.IconHome} style={styles.iconStyle} />
//                 </View>
//               );
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Notification"
//           component={Notification}
//           options={{
//             tabBarIcon: ({focused}) => {
//               return (
//                 <View style={{alignItems: 'center', justifyContent: 'center'}}>
//                   <Image
//                     source={Icons.IconNotification}
//                     style={styles.iconStyle}
//                   />
//                   <Text style={{fontSize: 12, color: '#16247d'}}>
//                     Notification
//                   </Text>
//                 </View>
//               );
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={Profile}
//           options={{
//             tabBarIcon: ({focused}) => {
//               return (
//                 <View style={{alignItems: 'center', justifyContent: 'center'}}>
//                   <Image source={Icons.IconCustomer} style={styles.iconStyle} />
//                   <Text style={{fontSize: 12, color: '#16247d'}}>Profile</Text>
//                 </View>
//               );
//             },
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };
// // >>>>>>> bfcd93fff15fd254c3beb34e05dec967706b37db
// const styles = StyleSheet.create({
//   container: {},
//   iconStyle: {
//     width: 24,
//     height: 24,
//   },
// });

export default BottomNavigation;
