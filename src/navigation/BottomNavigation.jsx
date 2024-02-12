import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Chat, Love, Notification, Profile} from '../Screens';
import {NavigationContainer} from '@react-navigation/native';
import {Icons} from '../constants/images';

const Tab = createBottomTabNavigator();
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
          component={Chat}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={Icons.IconChat} style={styles.iconStyle} />
                  <Text style={{fontSize: 12, color: '#16247d'}}>Chat</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Love"
          component={Love}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={Icons.IconLove} style={styles.iconStyle} />
                  <Text style={{fontSize: 12, color: '#16247d'}}>Love</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => {
              return (
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
              );
            },
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    source={Icons.IconNotification}
                    style={styles.iconStyle}
                  />
                  <Text style={{fontSize: 12, color: '#16247d'}}>
                    Notification
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={Icons.IconCustomer} style={styles.iconStyle} />
                  <Text style={{fontSize: 12, color: '#16247d'}}>Profile</Text>
                </View>
              );
            },
          }}
        />
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
