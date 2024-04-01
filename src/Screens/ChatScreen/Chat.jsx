import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import HeaderTitle from '../../components/atoms/HeaderTitle/HeaderTitle';
import { User } from '../../hooks/useContext';

const Chat = ({ navigation }) => {
  const { userData } = User();
  const [contentMessage, setContentMessage] = useState('');
  const [dataMessage, setDataMessage] = useState([]);
  const refConversation = firebase.app().database('https://vidu2-96b2f-default-rtdb.asia-southeast1.firebasedatabase.app/',).ref('/tinnhan');
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataArray = [];
        const snapshot = await refConversation.once('value');
        const messages = snapshot.val();
        if (messages) {
          // Lọc dữ liệu chỉ có UserId bằng userData._id
          const filteredData = Object.values(messages).filter(message => message.UserId === userData._id);
          setDataMessage(filteredData);
        }
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };
  
    fetchData();
  
    const onChildAdded = refConversation.on('child_added', snapshot => {
      const newMessage = snapshot.val();
      // Kiểm tra nếu message có UserId trùng với userData._id thì mới thêm vào state
      if (newMessage.UserId === userData._id) {
        setDataMessage(prevMessages => [...prevMessages, newMessage]);
      }
    });
  
    return () => refConversation.off('child_added', onChildAdded);
  }, []);
  

  const handleOnclickSend = async () => {
    

    // const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

    const year = new Date().getFullYear();

    console.log('year :' + year);
  
    let month = new Date().getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
  
    console.log('month :' + month);
  
    let date = new Date().getDate();
  
    if (date < 10) {
      date = '0' + date;
    }
  
    console.log('date :' + date);
  
    const hour = new Date().getHours();
  
    console.log('hour :' + hour);
  
    const minutes = new Date().getMinutes();
  
    const secounds = new Date().getSeconds();
    console.log('mines :' + minutes);
  
    const currentTime = `${year}-${month}-${date} ${hour}:${minutes}:${secounds}`;
    try {
      await refConversation.push({
        content: contentMessage,
        date: currentTime,
        sender: 'user',
        UserId: userData._id,
      });
      setContentMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const translateY = scrollOffsetY.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <Image style={styles.logoApp} source={require('@/images/logoAPP_MD01_png.png')} />
        <HeaderTitle>Fashion Koru</HeaderTitle>
      </Animated.View>

      <FlatList
        contentContainerStyle={{
          zIndex: 100,
          position: 'relative',
          marginTop: 60,
        }}
        data={dataMessage}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
{ useNativeDriver: false }
        )}
        renderItem={({ item }) => {
          const isYour = userData._id === item.UserId && item.sender !== "admin";
          return (
            <View
              style={{
                alignItems:
                  userData._id === item.UserId && item.sender !== "admin" ? 'flex-end' : 'flex-start',
                margin: 8,
                justifyContent: 'center',
              }}>
              {isYour ? (
                <View style={{
                  height: 45,
                  borderWidth: userData._id === item.UserId && item.sender !== "admin" ? 1 : 1,
                  borderRadius: userData._id === item.UserId && item.sender !== "admin" ? 20 : 20,
                  backgroundColor: userData._id === item.UserId && item.sender !== "admin" ? COLORS.gray : COLORS.white,
                }}>
                  <Text style={{ color: userData._id === item.UserId && item.sender !== "admin" ? COLORS.white : COLORS.black, fontSize: 20, padding: 10 }}>{item.content}</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    height: 45,
                    borderWidth: userData._id === item.UserId && item.sender !== "admin" ? 1 : 1,
                    borderRadius: userData._id === item.UserId && item.sender !== "admin" ? 20 : 20,
                    backgroundColor: userData._id === item.UserId && item.sender !== "admin" ? COLORS.gray : COLORS.white,
                  }}>
                    <Text style={{ color: userData._id === item.UserId && item.sender !== "admin" ? COLORS.white : COLORS.black, fontSize: 20, padding: 10 }}>{item.content}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />

      <View style={styles.inputChat}>
        <TouchableOpacity>
          <Icon name="camera-outline" size={32} />
        </TouchableOpacity>
        <TextInput
          style={{ width: '70%' }}
          placeholder="Your content mesages"
          value={contentMessage}
          onChangeText={text => setContentMessage(text)}
        />
        <TouchableOpacity>
          <Icon name="mic" size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnclickSend}>
          <IconF name="send" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoApp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginRight: '5%',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
inputChat: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    justifyContent: 'space-around',
  },
});

export default Chat;



  
