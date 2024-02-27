import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icons} from '../../constants/images';
import {FontText} from '../../constants/Constant';
import COLORS from '../../constants/colors';

const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={Icons.ImageForogtPassword} />
      <View style={styles.borderText}>
        <Text style={styles.textStyle}>Forgot</Text>
        <Text style={styles.textStyle}>Password?</Text>
      </View>
      <Text style={styles.textStyle2}>
        Don't worry! It happens. Please enter the phone number we will send the
        OTP in this phone number
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter the phone"
        placeholderTextColor={COLORS.color_7E7D7D}
      />
      <View style={styles.formAction}>
        <TouchableOpacity onPress={() => navigation.navigate('SendOtpScreen')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 100,
    width: 300,
    height: 300,
  },
  textStyle: {
    fontFamily: FontText.FS_PF_BeauSans_Pro_SemiBold,
    fontSize: 24,
    color: COLORS.black,
  },
  textStyle2: {
    fontSize: 14,
    color: COLORS.textHint,
    marginTop: 15,
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: COLORS.color_f6f6f6,
    borderRadius: 8,
    elevation: 4,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    padding: 12,
  },
  formAction: {},
  btn: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  borderText: {
    marginTop: 40,
    flexDirection: 'column',
  },
});

export default ForgotPassword;
