import {useState , useEffect , useContext} from 'react';
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
import COLORS from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icons} from '../../constants/images';
import {ToggleButton} from 'react-native-paper';
import axios, { Axios } from 'axios';
import auth from '@react-native-firebase/auth';




const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();


  // const [verification,setVerification] = useState(null);


  const [isPasswordShow, setIsPasswordShow] = useState(false);


  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handerOnlickCreateAccount = async  ()  => {

    try {
      const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
      navigation.navigate('SendOTPRegisterScreen' , data = {
                                                    verification : confirmationResult.verificationId,
                                                    email : email,
                                                    name : name,
                                                    password : password,
                                                    address : address,
                                                    numberPhone : phoneNumber,
                                                  });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send OTP');
    }
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
                placeholder="Enter your number phone"
                placeholderTextColor={COLORS.black}
                keyboardType="phone-pad"
                style={{
                  width: '100%',
                }}
                onChangeText={(Text) => setPhoneNumber(Text)}
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
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: '100%',
                }}
                onChangeText={(Text) => setEmail(Text)}
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
                onChangeText={(Text) => setName(Text)}

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
                onChangeText={(Text) => setPassword(Text)}

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
                placeholder="Enter your address"
                placeholderTextColor={COLORS.black}
                // secureTextEntry={isPasswordShow}
                style={{
                  width: '100%',
                }}
                onChangeText={(Text) => setAddress(Text)}
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
              onPress={handerOnlickCreateAccount}
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
