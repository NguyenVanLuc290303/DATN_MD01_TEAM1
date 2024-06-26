import {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icons} from '../constants/images';
import {ToggleButton} from 'react-native-paper';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handerOnlickCreateAccount = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginBottom: 80, marginTop: 20, alignItems: 'center'}}>
          <Image source={Icons.IconApp} style={{width: 100, height: 100}} />
        </View>
        <View style={{marginVertical: 22}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}>
            Create Account
          </Text>
        </View>

        <View style={{paddingTop: 10, justifyContent: 'center'}}>
          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry
                style={{
                  width: '100%',
                }}
              />

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 12,
                }}>
                <Image source={Icons.IconEye} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginBottom: 22}}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="Enter your repassword"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShow}
                style={{
                  width: '100%',
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
                style={{
                  position: 'absolute',
                  right: 12,
                }}>
                {isPasswordShow == true ? (
                  <Image source={Icons.IconEyeHide} />
                ) : (
                  <Image source={Icons.IconEye} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={{
                width: '100%',
                marginTop: 18,
                marginBottom: 4,
                borderWidth: 1,
                borderRadius: 8,
                height: 50,
                backgroundColor: COLORS.black,
              }}>
              <Text style={styles.submitText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageTitle: {
    width: 330,
    height: 300,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 13,
  },
});

export default RegisterScreen;
