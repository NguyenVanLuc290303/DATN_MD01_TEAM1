
import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../constants/colors';
import axios from 'axios';
import { User } from "../../hooks/useContext"; 
import { API_NOTIFICATION } from '../../config/api-consts';



const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const { userData } = User();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData) {
          console.error("User data is not provided.");
          return;
        }

        console.log("User data:", userData);

        // Gửi request lấy thông báo dựa trên userId
        const response = await axios.get(API_NOTIFICATION, {
          params: { id: userData._id },
          headers: {
            Cookie: "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw"
          }
        });
        
        console.log("Dữ liệu trả về từ API thông báo:", response.data); 
        setNotificationData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API thông báo:", error); 
      }
    };

    fetchData();

  }, [userData]); // Đảm bảo useEffect chạy lại khi userData thay đổi

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.status}</Text>
      <Text style={styles.time}>{item.date}</Text>
    </View>
  );
  

  console.log("User data:", userData); // Kiểm tra giá trị của userData


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
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
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
});

export default Notification;
