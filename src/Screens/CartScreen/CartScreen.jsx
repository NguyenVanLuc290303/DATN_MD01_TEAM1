import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import {useState} from 'react';
import {Checkbox} from 'react-native-paper';

const CartScreen = ({navigation}) => {
  const [productArray, setProductArray] = useState([
    {
      id: 1,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 2,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 3,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 4,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 5,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 6,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 7,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
    {
      id: 8,
      imageProduct: require('../../assets/images/image_product.png'),
      nameProduct: 'Áo khoác Vest sang trọng thời trang nam',
      color: 'Màu Be,size L',
      priceSale: '399.000 đ',
      price: '799.000 đ',
      isChecked: false,
      quantity: 1,
    },
  ]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const [allChecked, setAllChecked] = useState(false);

  const handleItemPress = index => {
    const newArray = [...productArray];
    newArray[index].isChecked = !newArray[index].isChecked;
    setProductArray(newArray);
    const atLeastOneUnchecked = newArray.some(item => !item.isChecked);
    setAllChecked(!atLeastOneUnchecked);
  };

  // Hàm để cập nhật trạng thái của tất cả các checkbox
  const handleChooseAll = () => {
    const newArray = productArray.map(item => ({...item, isChecked: true}));
    setProductArray(newArray);
    setAllChecked(true);
  };

  const handleUncheckAll = () => {
    const newArray = productArray.map(item => ({...item, isChecked: false}));
    setProductArray(newArray);
    setAllChecked(false);
  };

  const handleDecreaseQuantity = index => {
    const newArray = [...productArray];
    if (newArray[index].quantity > 1) {
      newArray[index].quantity -= 1;
      setProductArray(newArray);
    }
  };

  const handleIncreaseQuantity = index => {
    const newArray = [...productArray];
    if (newArray[index].quantity < 99) {
      newArray[index].quantity += 1;
      setProductArray(newArray);
    }
  };

  const checkedItemCount = productArray.filter(item => item.isChecked).length;
  const checkedItems = productArray.filter(item => item.isChecked);
  const totalPrice = checkedItems.reduce(
    (accumulator, currentItem) =>
      accumulator + parseFloat(currentItem.priceSale) * currentItem.quantity,
    0,
  );

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3, // Đảm bảo có đủ số 0 phía sau dấu thập phân
  });
  const formatNumber = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };

  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <View style={styles.productInfo}>
        <View style={styles.checkboxStyle}>
          <Checkbox
            status={item.isChecked ? 'checked' : 'unchecked'}
            color={'red'}
            onPress={() => handleItemPress(index)}
          />
        </View>
        <Image source={item.imageProduct} style={styles.image} />
        <View style={styles.borderInfo}>
          <View style={styles.imageContainer}>
            <Text numberOfLines={2} style={styles.productName}>
              {item.nameProduct}
            </Text>
            <View style={styles.productDetailsWrapper}>
              <Text style={styles.productDetails}>{item.color}</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.salePrice}>{item.priceSale}</Text>
                <Text style={styles.regularPrice}>{item.price}</Text>
              </View>
              <View
                style={[
                  styles.countProduct,
                  {
                    flex: 5,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#272727',
                  },
                ]}>
                <TouchableOpacity
                  style={styles.borderCount}
                  onPress={() => handleDecreaseQuantity(index)}>
                  <Text style={{textAlign: 'center', color: COLORS.black}}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    textAlign: 'center',
                    borderWidth: 0.5,
                    borderColor: '#272727',
                    color: COLORS.black,
                  }}>
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.borderCount}
                  onPress={() => handleIncreaseQuantity(index)}>
                  <Text style={{textAlign: 'center', color: COLORS.black}}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
        nestedScrollEnabled={true}
        style={{paddingBottom: 100}}
      />
      {/* Phần nội dung dưới màn hình */}
      <View style={styles.bottomSheet}>
        <View style={styles.rowContainer2}>
          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              color={'red'}
              status={allChecked ? 'checked' : 'unchecked'}
              onPress={allChecked ? handleUncheckAll : handleChooseAll}
            />
            <Text style={styles.checkboxLabel}>
              Choose All ({checkedItemCount})
            </Text>
          </View>
          {/* Title */}
          <Text style={styles.title}>{formatter.format(totalPrice)}</Text>
          {/* Order Button */}
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexShrink: 2,
    color: COLORS.black,
    marginLeft: 20,
    marginRight: 10,
  },
  productDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#939393',
  },
  priceContainer: {
    flexDirection: 'column',
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
    marginRight: 100,
  },
  image: {
    width: 69, // Set the width and height according to your preference
    height: 69,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
  checkboxStyle: {
    justifyContent: 'center',
    marginRight: 10,
  },
  borderInfo: {
    flexDirection: 'row',
  },
  countProduct: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    marginLeft: 30,
    height: 22,
    borderRadius: 8,
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 0.5,
    marginLeft: 30,
  },
  borderCount: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    justifyContent: 'center', // Thêm dòng này để đẩy bottom sheet xuống dưới
  },
  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
    color: COLORS.black,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#FF2271',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  orderButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default CartScreen;
