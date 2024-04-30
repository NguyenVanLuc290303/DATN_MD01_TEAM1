import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import InputView from '../../components/atoms/InputView/InputView';
import COLORS from '../../constants/colors';
import IconI from 'react-native-vector-icons/Ionicons';

import {useState} from 'react';

export default function ChangePasswordScreen() {
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const [showPasswordOld, setShowPasswordOld] = useState(false);

  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


  const toggleShowPasswordOld = () => {
    setShowPasswordOld(!showPasswordOld);
  };

  const toggleShowPasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <IconI name="lock-closed" size={24} />
        <TextInput
          defaultValue={password}
          secureTextEntry={!showPasswordOld}
          style={{flex: 1, paddingLeft: 10, color: COLORS.black}}
          // value={form.password}
          placeholder="Enter your password"
          placeholderTextColor="#6b7280"
          onChangeText={Text => setPasswordOld(Text)}
        />
        <TouchableOpacity onPress={toggleShowPasswordOld}>
          <IconI name={showPasswordOld ? 'eye' : 'eye-off'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <IconI name="lock-closed" size={24} />
        <TextInput
          defaultValue={password}
          secureTextEntry={!showPasswordNew}
          style={{flex: 1, paddingLeft: 10, color: COLORS.black}}
          // value={form.password}
          placeholder="Enter your password"
          placeholderTextColor="#6b7280"
          onChangeText={Text => setPasswordNew(Text)}
        />
        <TouchableOpacity onPress={toggleShowPasswordNew}>
          <IconI name={showPasswordNew ? 'eye' : 'eye-off'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <IconI name="lock-closed" size={24} />
        <TextInput
          defaultValue={password}
          secureTextEntry={!showPasswordConfirm}
          style={{flex: 1, paddingLeft: 10, color: COLORS.black}}
          // value={form.password}
          placeholder="Enter your password"
          placeholderTextColor="#6b7280"
          onChangeText={Text => setPasswordConfirm(Text)}
        />
        <TouchableOpacity onPress={toggleShowPasswordConfirm}>
          <IconI name={showPasswordConfirm ? 'eye' : 'eye-off'} size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handerOnlickChangePassword}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Đăng nhập</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
