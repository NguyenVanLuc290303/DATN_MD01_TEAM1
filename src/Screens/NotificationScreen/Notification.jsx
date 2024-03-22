
import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../constants/colors';
import axios from 'axios';
import { User } from "../../hooks/useContext"; 
import { API_NOTIFICATION } from '../../config/api-consts';
import { firebase } from '@react-native-firebase/database';



const Notification = ({}) => {

  const [notificationData, setNotificationData] = useState([]);
  const { userData } = User();
  const refConversation = firebase.app().database('https://vidu2-96b2f-default-rtdb.asia-southeast1.firebasedatabase.app/',).ref('/thongbao');



  useEffect(() => {

    // const fetchData = async () => {
    //   try {
    //     if (!userData) {
    //       console.error("User data is not provided.");
    //       return;
    //     }

    //     // console.log("User data:", userData);

    //     // Gửi request lấy thông báo dựa trên userId
    //     const response = await axios.get(`${API_NOTIFICATION}/${userData._id}`, {
    //       params: { id: userData._id },
    //       headers: {
    //         Cookie: "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw"
    //       }
    //     });
        
    //     console.log("Dữ liệu trả về từ API thông báo:", response.data); 
    //     setNotificationData(response.data);
    //   } catch (error) {
    //     console.error("Lỗi khi lấy dữ liệu từ API thông báo:", error); 
    //   }
    // };

    // fetchData();

    const fetchData = async () => {
      try {
        const dataArray = [];
        const snapshot = await refConversation.once('value');
        const messages = snapshot.val();
        if (messages) {
           dataArray = Object.values(messages);
           setNotificationData(dataArray);
        }
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };

    fetchData();

    const onChildAdded = refConversation.on('child_added', snapshot => {
      const newMessage = snapshot.val();
      setNotificationData(prevMessages => [...prevMessages, newMessage]);
    });

    return () => refConversation.off('child_added', onChildAdded);

  }, [userData]); // Đảm bảo useEffect chạy lại khi userData thay đổi

  const renderItem = ({ item }) => (
    <View style={styles.item} >
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.status}</Text>
      <Text style={styles.time}>{item.date}</Text>
    </View>
  </View>
  
  );
  

  // console.log("User data:", userData); // Kiểm tra giá trị của userData



  return (
    <SafeAreaView style={styles.container}>
      <FlatList

        data={notificationData}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          if (item.id) {
            return item.id.toString();
          } else {
            return index.toString();
          }
        }}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_EEEEEE,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
  },
  imageContainer: {
    width: "20%",
  },
  textContainer: {
    flex: 1, // Sử dụng flex để textContainer chiếm phần còn lại của hàng
    marginLeft: 12, // Khoảng cách giữa ảnh và các nội dung văn bản
    justifyContent: 'center', // Canh chỉnh nội dung theo chiều dọc
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
  },
  time: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
  },
  image: {
    width: "100%", // Đảm bảo ảnh đầy đủ chiều rộng trong container của nó
    height: 85,
  },
  
});

export default Notification;
