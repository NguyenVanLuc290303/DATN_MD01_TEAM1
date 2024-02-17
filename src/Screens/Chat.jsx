import {Button, StyleSheet, Text, View} from 'react-native';
import COLORS from '../constants/colors';

const Chat = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.black}}>Message</Text>
      <Button
        title="Click here"
        onPress={() => navigation.navigate('MessageScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default Chat;
