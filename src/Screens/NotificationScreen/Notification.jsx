import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';

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

  const renderItem = ({item}) => (
    <ScrollView style={styles.item}>
      <Text style={styles.title}>{item.titleMessage}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </ScrollView>
  );

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
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
  },
});

export default Notification;
