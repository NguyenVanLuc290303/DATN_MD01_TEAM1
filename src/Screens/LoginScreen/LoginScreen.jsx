import {useEffect, useState} from 'react';
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
import {User} from '../../hooks/useContext';
import {API_ADD_USERS} from '../../config/api-consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {Axios} from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [phone, setPhoneNumber] = useState();

  const [password, setPassWord] = useState('');

  const [dataUser, setDataUser] = useState({});

  const [luu, setluu] = useState('0');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  let internationalPhoneNumber;

  const [imageUri, setImageUri] = useState(
    'https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180',
  );

  const changeImage = () => {
    if (
      imageUri ===
      'https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180'
    ) {
      setImageUri(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkDBlwOArs4utZVc2M4SJmhWeMbhlyKu9zhg&usqp=CAU',
      );
    } else {
      setImageUri(
        'https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180',
      );
    }
  };

  const {setUserData} = User();

  function convertToInternationalPhoneNumber(phoneNumber) {
    // Kiểm tra nếu số điện thoại không hợp lệ hoặc rỗng
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return null;
    }

    // Xóa các ký tự không phải số
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Nếu số điện thoại không có 10 chữ số (không tính mã quốc gia), trả về null
    if (phoneNumber.length !== 10) {
      return null;
    }

    // Thêm mã quốc gia +84 vào đầu số điện thoại
    return '+84' + phoneNumber.slice(1);
  }

  const handerOnlickLogin = async () => {
    internationalPhoneNumber = await convertToInternationalPhoneNumber(phone);

    console.log(internationalPhoneNumber, 'lllll');
    // setPhoneNumber(internationalPhoneNumber)
    axios
      .get(`${API_ADD_USERS}/${internationalPhoneNumber}`)
      .then(function (response) {
        // const data = Array.isArray(response.data) ? response.data : [response.data];
        loginUser(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loginUser = dataUser => {
    // setdata(dataUser);

    try {
      if (dataUser === null) {
        Alert.alert('thông tin null');
      }
      if (
        internationalPhoneNumber === dataUser.numberPhone &&
        password === dataUser.passwd
      ) {
        console.log(dataUser)
        setUserData(dataUser);
        navigation.navigate('BottomNavigation');
      } else {
        console.log(dataUser + "data")
        Alert.alert('thông tin sai');
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getData() {
    const luu = await AsyncStorage.getItem('luu');
    console.log('luu:', luu);
    if (luu === '1') {
      try {
        const username = await AsyncStorage.getItem('username');
        const account = await AsyncStorage.getItem('pass');
        const img = await AsyncStorage.getItem('img');

        setPhoneNumber(username);
        setPassWord(account);
        setImageUri(img);
        console.log('Username:', username);
        console.log('pass:', account);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  }

  async function saveData(user1, pass1) {
    if (user1 == null || pass1 == null) {
      Alert.alert('Chưa Nhập Thông Tin');
      return;
    }

    if (
      imageUri !==
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkDBlwOArs4utZVc2M4SJmhWeMbhlyKu9zhg&usqp=CAU'
    ) {
      try {
        await AsyncStorage.setItem('username', user1);
        await AsyncStorage.setItem('pass', pass1);
        await AsyncStorage.setItem(
          'img',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkDBlwOArs4utZVc2M4SJmhWeMbhlyKu9zhg&usqp=CAU',
        );
        await AsyncStorage.setItem('luu', '1');

        console.log('Lưu Thành Công');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Không Lưu ');
      await AsyncStorage.setItem('luu', '0');

      await AsyncStorage.setItem(
        'img',
        'https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180',
      );
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
            <Icon name="phone" size={24} />
            <TextInput
              defaultValue={phone}
              autoCapitalize="none"
              autoCorrect={false}
              // keyboardType="phone-pad"
              style={{paddingLeft: 10}}
              // value={form.email}
              placeholder="Enter your phone"
              placeholderTextColor="#6b7280"
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>

          <View style={styles.input}>
            <IconI name="lock-closed" size={24} />
            <TextInput
              defaultValue={password}
              secureTextEntry={!showPassword}
              style={{flex: 1, paddingLeft: 10}}
              // value={form.password}
              placeholder="Enter your password"
              placeholderTextColor="#6b7280"
              onChangeText={Text => setPassWord(Text)}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <IconI name={showPassword ? 'eye' : 'eye-off'} size={24} />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => {
                saveData(phone, password);
                changeImage();
              }}
              style={{marginTop: 20, marginLeft: 160}}>
              <Image
                source={{uri: imageUri}}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginLeft: 170,
                }}
              />
            </TouchableOpacity>
            <Text style={{color: 'blue', marginTop: 0, marginLeft: 220}}>
              Remember Me ?
            </Text>
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
    flexDirection: 'row',
    marginBottom: 16,
    height: 56,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
    borderColor: '#817C7C',
    borderWidth: 1,
    alignItems: 'center',
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
    backgroundColor: COLORS.App,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.App,
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
    padding: 20,
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
