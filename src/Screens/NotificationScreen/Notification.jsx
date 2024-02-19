import {StyleSheet, Text, View} from 'react-native';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text>Nofication</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
export default Notification;
