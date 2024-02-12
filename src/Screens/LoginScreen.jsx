import {useState} from 'react';
import {
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
import {Icons} from '../constants/images';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handerOnlickLogin = () => {
    // event login ( check account is realldy exists ) else if { check account is exitsted , however false password or email  } else{ true change Screen }
    navigation.navigate('BottomNavigation'); // change Screen Onboarding if (user.download === fisrt) else { change screen bottomNavigation }
  };

  const hanlderOnlickSignup = () => {
    navigation.navigate('RegisterScreen');
  };
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
              keyboardType="email-address"
              style={styles.inputControl}
              value={form.email}
              placeholder="Enter your email"
              placeholderTextColor="#6b7280"
              onChangeText={email => setForm({...form, email})}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              value={form.password}
              placeholder="Enter your password"
              placeholderTextColor="#6b7280"
              onChangeText={password => setForm({...form, password})}
            />
          </View>
          <Text style={styles.title2}>Forgot Password</Text>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{marginTop: 'auto'}} onPress={() => {}}>
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
