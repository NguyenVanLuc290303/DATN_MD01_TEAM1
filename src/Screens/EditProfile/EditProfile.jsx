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
import COLORS from '../../constants/colors';
import {Icons} from '../../constants/images';
import {useState} from 'react';

const EditProfile = ({navigation}) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView style={{flex: 1, marginHorizontal: 22}}>
        <View
          style={{
            marginBottom: 80,
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Image
            source={Icons.IconApp}
            style={{
              width: 200,
              height: 200,
              borderRadius: 400 / 2,
              borderWidth: 1,
              borderColor: COLORS.gray,
            }}
          />
          <Image
            source={Icons.IconPlus}
            style={{width: 35, height: 30, marginTop: -30, marginLeft: 120}}
          />
        </View>

        <View style={{paddingTop: 10, justifyContent: 'center'}}>
          <View style={{marginBottom: 22}}>
            <Text>Name</Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
              }}>
              <TextInput
                placeholder=""
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 22}}>
            <Text>Email</Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
              }}>
              <TextInput
                placeholder=""
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 22}}>
            <Text>Phone Number</Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
              }}>
              <TextInput
                placeholder=""
                placeholderTextColor={COLORS.black}
                keyboardType="phone-pad"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={{marginBottom: 22}}>
            <Text>Address</Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
              }}>
              <TextInput
                placeholder=""
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{
                width: '100%',
                marginTop: 18,
                marginBottom: 4,
                borderWidth: 1,
                borderRadius: 8,
                height: 50,
                backgroundColor: COLORS.black,
              }}>
              <Text style={styles.submitText}>Change Information</Text>
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

export default EditProfile;
