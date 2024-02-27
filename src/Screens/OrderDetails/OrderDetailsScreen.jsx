import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
        <View style={styles.viewImageContainer}>
          <Image source={Icons.IconView} style={styles.iconView} />
        </View>
        <View style={styles.item}>
          <View style={styles.productInfo}>
            <Image
              source={require('../../assets/images/image_product.png')}
              style={styles.imgStyle}
            />
            <View style={styles.textContainer}>
              {/* Three Texts */}
              <Text style={styles.textStyle}>Text 1</Text>
              <Text style={styles.textStyle}>Text 2</Text>
              <Text style={styles.textStyle}>Text 3</Text>
            </View>
          </View>
        </View>

        <View style={styles.textTransport}>
          <Text style={styles.transportInfo}>Vận chuyển tiêu chuẩn</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color_EEEEEE,
    justifyContent: 'space-between',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  textAddress: {
    marginLeft: 30,
    flex: 1,
  },
  iconAddress: {
    width: 20,
    height: 20,
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
    marginRight: 20,
  },
  borderStyles: {},
  viewImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconView: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 0.5,
    marginLeft: 30,
  },
  item: {
    flex: 1,
  },
  productInfo: {
    flexDirection: 'row',
  },
  borderInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetailsContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: COLORS.black,
  },
  productDetailsWrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
    alignSelf: 'flex-start', // Căn chỉnh cho phù hợp với vùng chữ
  },
  productDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceContainer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgStyle: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 5,
  },
  textTransport: {
    flexDirection: 'row',
    flex: 1,
  },
  transportInfo: {
    color: COLORS.black,
  },
});

export default OrderDetailsScreen;
