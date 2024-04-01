import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../constants/colors';
import axios from 'axios';
import { User } from "../../hooks/useContext"; 
import { API_NOTIFICATION, API_PRODUCT } from '../../config/api-consts';
import { firebase } from '@react-native-firebase/database';



const Notification = ({navigation}) => {

  const [notificationData, setNotificationData] = useState([]);
  const { userData } = User();
  const refConversation = firebase.app().database('https://vidu2-96b2f-default-rtdb.asia-southeast1.firebasedatabase.app/',).ref('/thongbao');
  const [sp, setSp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = [];
        const snapshot = await refConversation.once('value');
        const messages = snapshot.val();
        if (messages) {
           dataArray = Object.values(messages);
           setNotificationData(dataArray);
           console.log(dataArray, "======>>>>>>>")
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

  const DetailTB = async (content,name) =>{

      if(content === "Trạng Thái Đơn Hàng"){
          console.log("TT");
      }else if(content === "Sản Phẩm Mới"){
        console.log("SPM");
    
          try {
              const response = await axios.get(`http://192.168.1.10:3000/api-sanpham/name/${name}`, {
                  headers: {
                      Cookie: "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw"
                  }
              });
              setSp(response.data);
              console.log(sp);
              // console.log("Dữ liệu trả về từ API:", response.data);
          } catch (error) {
              console.error("Lỗi khi lấy danh sách sản phẩm yêu thích:", error);
          }
  
        navigation.navigate('DetailProductScreen', {
          _id: sp._id,
          name: sp.name,
          image: sp.image,
          category: sp.loai,
          price: sp.price,
          quantitySold: sp.quantitySold
      })
      }


  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={()=>{DetailTB(item.content,item.name)}} >
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.status}</Text>
      <Text style={styles.time}>{item.date}</Text>
    </View>
  </TouchableOpacity>
  
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