import {useState} from 'react';
import {
  Alert,
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
import {Icons} from '../../constants/images';
import { User } from '../../hooks/useContext';
import { API_LOGIN } from '../../config/api-consts';
import { API_ADD_USERS } from '../../config/api-consts';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [phone, setPhoneNumber] = useState();

  const [password, setPassWord] = useState();

  const [dataUser,setDataUser] = useState({});

  const {setUserData} = User();
  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  // });

  const handerOnlickLogin = () => {
    // event login ( check account is realldy exists ) else if { check account is exitsted , however false password or email  } else{ true change Screen }
    // change Screen Onboarding if (user.download === fisrt) else { change screen bottomNavigation }
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3A2ZxJ5qiC033izH_apThtJr0MlnV8Uz4z.N3Nf0xYBaBKssx0FkCehJrfHAfR3bNl85nnEvrjfLfA");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${API_ADD_USERS}/${phone}`, requestOptions)
      .then((response) => response.json())
      .then((result) => loginUser(result))
      .catch((error) => console.error(error));
  
  };

  const loginUser = (dataUser) =>{

    try {
      if(dataUser === null){
        Alert.alert('thông tin null');
      }
      if(phone === dataUser.numberPhone && password === dataUser.passwd){
        // console.log(dataUser)
          setUserData(dataUser);
          navigation.navigate('BottomNavigation');
      }else{
        Alert.alert('thông tin sai');
      }
    } catch (error) {
      console.log(error);
    }
 
  }
  // const hanlderOnlickSignup = () => {
   
  // };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={Icons.IconApp} style={styles.iconShop} alt="Logo" />

          <Text style={styles.title}>Login</Text>

          <Text style={styles.subtitle}>Please sign in to continue</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              // keyboardType="phone-pad"
              style={styles.inputControl}
              // value={form.email}
              placeholder="Enter your phone"
              placeholderTextColor="#6b7280"
              onChangeText={(Text) => setPhoneNumber(Text)}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              // value={form.password}
              placeholder="Enter your password"
              placeholderTextColor="#6b7280"
              onChangeText={(Text) => setPassWord(Text)}
            />
          </View>
          <Text
            style={styles.title2}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Text>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handerOnlickLogin}>

              <View style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{marginTop: 'auto'}}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.formFooter}>
              Don't have an account?{''}
              <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
            </Text>
          </TouchableOpacity>
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
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    marginLeft: 24,
  },
  title2: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
  body: {},
  btnLogin: {
    width: 340,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconShop: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    marginLeft: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    marginLeft: 10,
    padding: 10,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
    borderColor: '#817C7C',
    borderWidth: 1,
  },
  btn: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  form: {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});

export default LoginScreen;
