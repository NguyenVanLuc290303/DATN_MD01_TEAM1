import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import HeaderTitle from '../../components/atoms/HeaderTitle/HeaderTitle';
import {User} from '../../hooks/useContext';
import {useCallback, useEffect, useState , useRef} from 'react';
import {firebase} from '@react-native-firebase/database';
import { API_CHAT } from '../../config/api-consts';
import moment from 'moment';
// import { Animated } from 'react-native-reanimated';
const Chat = ({navigation}) => {

  const {userData} = User();

  // console.log(userData);

  // const idUser = userData._id;

  const [contentMessage, setContentMessage] = useState();

  const [dataMessage, setDataMessage] = useState([ ]);
  

  const conversation = userData._id;

  const idSend = userData._id;

  // const refConversation = firebase
  //   .app()
  //   .database(
  //     'https://app-koru-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //   )
  //   .ref('/conversation')
  //   .child(conversation);


  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    fetch(`${API_CHAT}/${idSend}`, requestOptions)
    .then(response => response.json())
    .then(result => setDataMessage(result))
    .catch(error => console.log('error', error));

  }, []);

  console.log(dataMessage);


  const handleOnclickSend = () => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(currentTime); // In ra ngày giờ hiện tại


    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
    'Cookie',
    'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
    );

   

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      content : contentMessage,
      date : currentTime,
      sender : "user",
      UserId : userData._id,
    }),
    redirect: 'follow',
    };

    try {
        
    fetch(API_CHAT, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    
    } catch (error) {
        console.log(error);
    }

    reLoadChat();
  };

  const reLoadChat = useCallback (() =>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    
    fetch(`${API_CHAT}/${idSend}`, requestOptions)
    .then(response => response.json())
    .then(result => setDataMessage(result))
    .catch(error => console.log('error', error));

  },[])

  let scrollOffsetY = useRef(new Animated.Value(0)).current;  

  // const diffCamlp = Animated.diffClamp(scrollY,0,45)

  // const scrollY = new Animated.Value(0);

  const translateY = scrollOffsetY.interpolate({
    inputRange:[0,45],
    outputRange:[0,-45]
  })

  const translateY2 = scrollOffsetY.interpolate({
    inputRange :[0 ,45],
    outputRange : [0 , 45]
  })

  return (
    <View style={styles.container}>

      <Animated.View
        style={[ 
         styles.header, { transform :[
          {translateY : translateY}
        ]}
        ]}
      >
        <Image
          style={styles.logoApp}
          source={require('@/images/logoAPP_MD01_png.png')}
        />
        <HeaderTitle>Fashion Koru</HeaderTitle>
   
      </Animated.View>
     
      <FlatList
          contentContainerStyle ={{ 
            zIndex : 100,
            position : 'relative',
            marginTop : 60,
          }}
          data={dataMessage}
          onScroll={(e) =>{ 
           scrollOffsetY.setValue(e.nativeEvent.contentOffset.y)
          }}
          renderItem={({item}) => {
            const isYour = userData._id === item.UserId && item.sender !=="admin";
            return (
              <View
                style={{
                  alignItems:
                    userData._id === item.UserId && item.sender !=="admin" ? 'flex-end' : 'flex-start',
                  margin: 8,
                  justifyContent: 'center',
                }}>
                {isYour ? (
                  <View
                    style={{
                      height: 45,
                      borderWidth: userData._id === item.UserId && item.sender !=="admin" ? 1 : 1,
                      borderRadius: userData._id === item.UserId && item.sender !=="admin" ? 20 : 20,
                      backgroundColor:
                      userData._id === item.UserId && item.sender !=="admin" ? '#212121' : '#FFFFFF',
                    }}>
                    <Text
                      style={{
                        color:
                        userData._id === item.UserId && item.sender !=="admin"
                            ? '#FFFFFF'
                            : '#000000',
                        fontSize: 20,
                        padding: 10,
                      }}>
                      {item.content}
                    </Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Image
                      source={{uri: image}}
                      style={{width: 40, height: 40, borderRadius: 20}}
                    /> */}
                    <View
                      style={{
                        height: 45,
                        borderWidth: userData._id === item.UserId && item.sender !=="admin" ? 1 : 1,
                        borderRadius: userData._id === item.UserId && item.sender !=="admin" ? 20 : 20,
                        backgroundColor:
                        userData._id === item.UserId && item.sender !=="admin"
                            ? '#212121'
                            : '#FFFFFF',
                      }}>
                      <Text
                        style={{
                          color:
                          userData._id === item.UserId && item.sender !=="admin"

                              ? '#FFFFFF'
                              : '#000000',
                          fontSize: 20,
                          padding: 10,
                        }}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
       
      {/* <Animated.View style={[ 
         styles.inputChat, { transform :[
          {translateY : translateY2}
        ]}
        ]}>
        <TouchableOpacity>
          <Icon name="camera-outline" size={32} />
        </TouchableOpacity>
        <TextInput
          style={{width: '70%'}}
          placeholder="Your content mesages"
          value={contentMessage}
          onChangeText={Text => setContentMessage(Text)}
        />
        <TouchableOpacity>
          <Icon name="mic" size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnclickSend}>
          <IconF name="send" size={32} />
        </TouchableOpacity>
      </Animated.View> */}

      <View style={styles.inputChat}>
      <TouchableOpacity>
          <Icon name="camera-outline" size={32} />
        </TouchableOpacity>
        <TextInput
          style={{width: '70%'}}
          placeholder="Your content mesages"
          value={contentMessage}
          onChangeText={Text => setContentMessage(Text)}
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
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoApp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f2f2',
    marginRight: '5%',
  },

  header: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    top : 0,
    left : 0 , 
    right : 0,
    position : 'absolute',
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
