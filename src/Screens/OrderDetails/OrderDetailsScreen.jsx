import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import {Icons} from '../../constants/images';

const OrderDetailsScreen = ({navigation}) => {
  //de trong view
  return (
    <View style={styles.container}>
      <View style={styles.borderStyles}>
        <View style={styles.address}>
          <Image source={Icons.IconAddress} style={styles.iconAddress} />
          <View style={styles.textAddress}>
            <Text style={styles.textInfo}>Nguyen Van A</Text>
            <Text style={styles.textInfo}>09888888888888</Text>
            <Text style={styles.textInfo2}>Cau Giay,Ha Noi</Text>
          </View>
          <Image source={Icons.IconNext} style={styles.iconNext} />
        </View>
        <Image source={Icons.IconView} style={{width: '100%'}} />
        <View style={styles.address}>
          <Image source={Icons.IconAddress} style={styles.iconAddress} />
          <View style={styles.textAddress}>
            <Text style={styles.textInfo}>Nguyen Van A</Text>
            <Text style={styles.textInfo}>09888888888888</Text>
            <Text style={styles.textInfo2}>Cau Giay,Ha Noi</Text>
          </View>
          <Image source={Icons.IconNext} style={styles.iconNext} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_EEEEEE,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  address: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  textAddress: {
    flexDirection: 'column',
    marginLeft: 30,
    flex: 1,
  },
  iconAddress: {
    width: 20,
    height: 20,
    justifyContent: 'flex-start',
  },
  textInfo: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  textInfo2: {
    color: COLORS.black,
    fontSize: 13,
    marginBottom: 5,
  },
  iconNext: {
    width: 15,
    height: 10,
    alignItems: 'flex-end',
  },
  borderStyles: {
    flex: 1,
    flexDirection: 'column',
  },
});
export default OrderDetailsScreen;
