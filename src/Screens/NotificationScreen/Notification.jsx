import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
} from 'react-native';
import COLORS from '../../constants/colors';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = () => {
  const notificationArray = [
    {
      id: 1,
      titleMessage: 'Notification 1: This is a notification to the user',
      time: '2000/12/12',
    },
    {
      id: 2,
      titleMessage: 'Notification 2: This is another notification to the user',
      time: '2000/12/12',
    },
    {
      id: 3,
      titleMessage:
        'Notification 3: This is yet another notification to the user',
      time: '2000/12/12',
    },
    {
      id: 4,
      titleMessage: 'Notification 4: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 5,
      titleMessage: 'Notification 5: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 6,
      titleMessage: 'Notification 6: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 7,
      titleMessage: 'Notification 7: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 8,
      titleMessage: 'Notification 8: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 9,
      titleMessage: 'Notification 9: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 10,
      titleMessage:
        'Notification 10: This is one more notification to the user',
      time: '2000/12/12',
    },
    {
      id: 11,
      titleMessage:
        'Notification 11: This is one more notification to the user',
      time: '2000/12/12',
    },
  ];

  const [notifications, setNotifications] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [touchedItems, setTouchedItems] = useState([]);

  useEffect(() => {
    // Nạp lại dữ liệu khi màn hình được load
    loadNotifications();
  }, []);

  useEffect(() => {
    // Lưu trữ dữ liệu khi dữ liệu thay đổi
    saveNotifications();
  }, [notifications]);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('@notifications');
      if (storedNotifications !== null) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Error loading notifications: ', error);
    }
  };

  const saveNotifications = async () => {
    try {
      await AsyncStorage.setItem(
        '@notifications',
        JSON.stringify(notifications),
      );
    } catch (error) {
      console.error('Error saving notifications: ', error);
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItemId === item.id;
    const isTouched = touchedItems.includes(item.id);
    const fontWeight = isTouched ? 'normal' : 'bold';

    return (
      <TouchableHighlight
        underlayColor={COLORS.gray} // Màu khi chạm vào
        onPress={() => {
          if (!isTouched) {
            setTouchedItems([...touchedItems, item.id]); // Thêm id của mục vào danh sách đã chạm vào
          }
          setSelectedItemId(item.id === selectedItemId ? null : item.id); // Nếu mục đã được chọn, hủy chọn nó. Nếu chưa, chọn mục mới.
        }}
        style={[
          styles.item,
          {backgroundColor: isSelected ? COLORS.white : COLORS.white}, // Áp dụng màu đỏ nếu mục được chọn, ngược lại áp dụng màu mặc định.
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ScrollView style={{flex: 1}}>
            <Text style={[styles.title, {fontWeight}]}>
              {item.titleMessage}
            </Text>
            <Text style={[styles.time, {fontWeight}]}>{item.time}</Text>
          </ScrollView>
          <Icon
            name="arrow-forward-outline"
            size={20}
            color={isSelected ? COLORS.white : COLORS.black}
            style={{alignSelf: 'center'}}
          />
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notificationArray}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure keyExtractor uses a unique value for each item
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
