import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';

const CartScreen = ({navigation}) => {
  const productArray = [
    {
      id: 1,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 2,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 3,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 4,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 5,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 6,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 7,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
    {
      id: 8,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
    },
  ];
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={styles.productInfo}>
        <Image source={item.imageProduct} style={styles.image} />
        <View style={styles.imageContainer}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.nameProduct}
          </Text>
          <Text style={styles.productDetails}>{item.color}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.salePrice}>{item.priceSale}</Text>
            <Text style={styles.regularPrice}>{item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productArray}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  productDetails: {
    fontSize: 14,
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  regularPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
  },
  image: {
    width: 69, // Set the width and height according to your preference
    height: 69,
    resizeMode: 'cover', // You can use other options like 'contain' as per your need
  },
});

export default CartScreen;
