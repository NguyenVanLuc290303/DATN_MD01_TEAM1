import {
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {styleCommon} from '../../theme/styles/CommomStyle';
import {textStyles} from '../../theme/styles/CommomStyle';
import COLORS from '../../constants/colors';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { API_ADD_USERS } from '../../config/api-consts';
import { User } from '../../hooks/useContext';

const SendOtpScreen = ({navigation , route}) => {

  const { phoneNumber } = route.params;

  const [code, setCode] = React.useState('');

  // const dataUserRegister = {
  //   name : name,
  //   email : email,
  //   passwd : password,
  //   address : address,
  //   numberPhone : numberPhone,
  //   image :'',
  // }


  const handleVerifyOTP = () => {
    try {
      // const credential = auth.PhoneAuthProvider.credential(verification, code);
      //  auth().signInWithCredential(credential);
      
       // Navigate to the main screen upon successful authentication
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

    const handleChangeOtp = React.useCallback((otp) => {
      setCode(otp);
    }, []);


  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
      <ImageBackground
        source={require('@/images/background/backgounrd_OTP.png')}
        style={styles.image}>
        <Text style={[styles.text]}>OTP verification</Text>
        <Text style={[styleCommon.sp1]}>
          We Will send you a one time password on this Mobile Number
        </Text>
        <Text style={[styles.textPhoneNumber, styleCommon.sp1]}></Text>
        <OtpInputs
          handleChange={otp => handleChangeOtp(otp)}
          numberOfInputs={6}
          style={styles.OTP}
          inputContainerStyles={[styles.underLine]}
          clearTextOnFocus
        />
        <Text style={styleCommon.sp1}>00:30</Text>
        <TouchableOpacity style={styles.btn_Otp} >
          <Text style={textStyles.white}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  OTP: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  underLine: {
    height: 42,
    width: 42,
    borderWidth: 1,
    borderRadius: 21,
    backgroundColor: '#F6F6F6',
    borderColor: COLORS.borderColorOTP,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '90%',
  },
  textPhoneNumber: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  btn_Otp: {
    width: 259,
    height: 40,
    borderColor: COLORS.borderColorOTP,
    backgroundColor: '#504093',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
export default SendOtpScreen;
