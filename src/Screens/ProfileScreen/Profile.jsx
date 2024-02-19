import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icons} from '../../constants/images';
import COLORS from '../../constants/colors';
import {Fragment} from 'react';

const Profile = ({navigation}) => {
  const navigateToEditProfile = () => {
    console.log('Edit Profile Action');
    navigation.navigate('EditProfile');
  };
  const navigateToSecurity = () => {
    console.log('Security Action');
  };

  const navigateToNotifications = () => {
    console.log('Notifications Action');
  };

  const navigateToPrivacy = () => {
    console.log('Privacy Action');
  };
  const accountItem = [
    {
      icon: Icons.IconEditProfile,
      text: 'Edit Profile',
      action: navigateToEditProfile,
    },

    {
      icon: Icons.IconSecurity,
      text: 'Security',
      action: navigateToSecurity,
    },

    {
      icon: Icons.IconNotification,
      text: 'Notifications',
      action: navigateToNotifications,
    },

    {
      icon: Icons.IconPrivacy,
      text: 'Privacy',
      action: navigateToPrivacy,
    },
  ];

  const renderSettingItem = ({icon, text, action}) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
      }}>
      <Image source={icon} style={styles.iconStyle} />
      <Text style={{marginLeft: 36, fontSize: 16, color: COLORS.black}}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const navigateToSubscription = () => {
    console.log('My Subscription Action');
  };

  const navigateToSupport = () => {
    console.log('Help & Support Action');
  };

  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies Action');
  };

  const supportItems = [
    {
      icon: Icons.IconSubscription,
      text: 'My Subscription',
      action: navigateToSubscription,
    },
    {icon: Icons.IconHelp, text: 'Help & Support', action: navigateToSupport},
    {
      icon: Icons.IconInfo,
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies,
    },
  ];

  const navigateToFreeUpSpace = () => {
    console.log('Free up space Action');
  };

  const navigateToDataSaver = () => {
    console.log('Data Saver Action');
  };

  const navigateToReportProblem = () => {
    console.log('Data Saver Action');
  };

  const addAccount = () => {
    console.log('Add Account Action');
  };

  const logout = () => {
    console.log('Logout Action');
    navigation.navigate('LoginScreen');
  };

  const cacheAndCellularItems = [
    {
      icon: Icons.IconFreeUpSpace,
      text: 'Free up space',
      action: navigateToFreeUpSpace,
    },
    {icon: Icons.IconDownload, text: 'Data Saver', action: navigateToDataSaver},
  ];

  const actionsItems = [
    {
      icon: Icons.IconReport,
      text: 'Report a problem',
      action: navigateToReportProblem,
    },
    {
      icon: Icons.IconPeople,
      text: 'Add Account',
      action: addAccount,
    },
    {
      icon: Icons.IconLogOut,
      text: 'Log out',
      action: logout,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', left: 0}}
        />

        <ScrollView style={{marginBottom: 12}}>
          {/*Account Setting*/}
          <View style={{marginBottom: 12}}>
            <Text style={{marginVertical: 10, color: COLORS.black}}>
              Account
            </Text>
            <View style={{borderRadius: 12, color: COLORS.black}}>
              {accountItem.map((item, index) => (
                <Fragment key={index}>{renderSettingItem(item)}</Fragment>
              ))}
            </View>
          </View>

          {/*Support and About Setting*/}
          <View style={{marginBottom: 12}}>
            <Text style={{marginVertical: 10, color: COLORS.black}}>
              Support and About
            </Text>
            <View style={{borderRadius: 12, color: COLORS.black}}>
              {supportItems.map((item, index) => (
                <Fragment key={index}>{renderSettingItem(item)}</Fragment>
              ))}
            </View>
          </View>

          {/*Cache & Cellular*/}
          <View style={{marginBottom: 12}}>
            <Text style={{marginVertical: 10, color: COLORS.black}}>
              Support and About
            </Text>
            <View style={{borderRadius: 12, color: COLORS.black}}>
              {cacheAndCellularItems.map((item, index) => (
                <Fragment key={index}>{renderSettingItem(item)}</Fragment>
              ))}
            </View>
          </View>

          {/*Actions Settings*/}
          <View style={{marginBottom: 12}}>
            <Text style={{marginVertical: 10, color: COLORS.black}}>
              Support and About
            </Text>
            <View style={{borderRadius: 12, color: COLORS.black}}>
              {actionsItems.map((item, index) => (
                <Fragment key={index}>{renderSettingItem(item)}</Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});

export default Profile;
