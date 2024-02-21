import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/colors';

const Notification = () => {
  const notificationArray = [
    {
      id: 1,
      titleMessage: 'Notification display to user',
      time: '2000',
    },
    {
      id: 2,
      titleMessage: 'Notification display to user',
      time: '2000',
    },
    {
      id: 3,
      titleMessage: 'Notification display to user',
      time: '2000',
    },
    {
      id: 3,
      titleMessage: 'Notification display to user',
      time: '2000',
    },
    {
      id: 4,
      titleMessage: 'Notification display to user',
      time: '2000',
    },
  ];
  const Item = ({title, time}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notificationArray}
        renderItem={({item}) => <Item title={item.titleMessage} />}
        keyExtractor={item => item.id}
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
    fontSize: 12,
    color: COLORS.black,
    justifyContent: 'flex-start',
  },
});
export default Notification;
