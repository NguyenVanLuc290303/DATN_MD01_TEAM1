import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
  Button,
} from 'react-native';
import axios, {Axios} from 'axios';
import {API_PRODUCT_ORDER, API_PRODUCT_ORDER_ID} from '../../config/api-consts';
import {Icons} from '../../constants/images';
import COLORS from '../../constants/colors';
import {User} from '../../hooks/useContext';
import { API_ORDER } from '../../config/api-consts';
import { API_DELETE_IN_CART } from '../../config/api-consts';
import ModalConfirm from '../../components/morecules/ModalConfirm/ModalConfirm';

const YourOrderDetailScreen = ({navigation, route}) => {
  const {OrderId, status , address} = route.params;

  // console.log(OrderId, 'OrderId 000000');

  // console.log(status, 'status : --------');

  const {userData} = User();

  const [dataOrderDetail, setDataOrderDetail] = useState([]);

  const [dataSP, setDataSP] = useState([]);

  const costTranformer = 22000;

  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    axios
      .get(`${API_PRODUCT_ORDER_ID}/${OrderId}`)
      .then(function (response) {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setDataOrderDetail(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCancelOrder = () => {
    setIsModalVisible(true);
  };
  
  const cancelOrder = async () => {
    if (status == "Chờ xác nhận") {

      axios.get(`${API_ORDER}/SPDDC/${OrderId}`)
      .then(function (response) {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];

          const orderItems1 = data.map(item => ({
            sizeId: item.PropertiesId,
            quantity: item.Quantity
          }));
          console.log(data);

                  axios
                  .post(`${API_DELETE_IN_CART}/add-quantity`, {
                    orderItems : orderItems1, // Truyền mảng productIds vào body của request
                  })
                  .then(response => {
                    console.log(response.data);
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });
      
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
        .delete(`${API_ORDER}/${OrderId}`)
        .then(function (response) {
          console.log(response.msg);
        })
        .catch(function (error) {
          console.log(error);
        });
      Alert.alert('Hủy Thành CÔng !  ');
      navigation.navigate('BottomNavigation');
    } else {
      Alert.alert('Đơn Hàng Của Bạn Đã Được Xác Nhận ! Không Thể Hủy ');
    }
  };

  const handleNo = () => {
    setIsModalVisible(false);
  };
  
  const handleYes = () => {
    setIsModalVisible(false);
    cancelOrder();
  };
  

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: 22, height: 22}}
            source={require('@/images/back.png')}
          />
        </TouchableOpacity>
        <View style={{marginLeft: '5%'}}>
          <Text style={{fontSize: 24, fontFamily: 'Inter-SemiBold'}}>
            {status}
          </Text>
          <Text>Ngày giao dự kiến : Jan 21 - Jan 23</Text>
        </View>
        <View></View>
      </View>
      <View style={styles.address}>
        {/* <Image source={Icons.IconAddress} style={styles.iconAddress} /> */}
        <View style={styles.textAddress}>
          {/* <Text style={styles.textInfo}>{userData.username}</Text>
          <Text style={styles.textInfo}>{userData.numberPhone}</Text> */}
          <Text style={styles.textInfo2}>{address}</Text>
        </View>

        {/* <Text>
          {address}
        </Text> */}
      </View>

      <View>
        <Text>Thông tin đơn hàng</Text>
        <FlatList
          data={dataOrderDetail}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.productInfo}>
                <Image source={{uri: item.Image}} style={styles.imgStyle} />
                <View style={{paddingLeft: '3%'}}>
                  <Text></Text>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: `#${item.ColorCode}`,
                    }}></View>
                  <Text style={{marginTop: 5}}>Size : {item.Size}</Text>
                </View>
                <View style={{position: 'absolute', bottom: 10, right: 10}}>
                  <Text>Số lượng : {item.Quantity}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item._id}
        />
        <View style={styles.textTransport}>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'normal',
              marginLeft: 10,
              marginTop: 7,
            }}>
            Vận chuyển
          </Text>
          <Text style={styles.priceTransport}>{costTranformer}</Text>
        </View>
      </View>

      <View style={styles.contactAdmin}></View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {status === 'Đã giao' ? (
          <TouchableOpacity
            style={{
              width: 350,
              height: 55,
              borderRadius: 56,
              borderWidth: 1,
              borderColor: COLORS.black,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Black',
                fontSize: 20,
                color: COLORS.black,
              }}>
              Mua lại
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          onPress={handleCancelOrder}
          style={{
            width: 350,
            height: 55,
            borderRadius: 56,
            borderWidth: 1,
            borderColor: COLORS.black,
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Lato-Black',
              fontSize: 20,
              color: COLORS.black,
            }}>
            Hủy đơn hàng
          </Text>
        </TouchableOpacity>
        )}
      </View>
    <ModalConfirm
      visible={isModalVisible}
      content={"Bạn muốn Hủy đơn hàng không ?"}
      onClose={handleNo}
      onConfirm={handleYes}
    />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  textTransport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.white,
    paddingLeft: '2%',
    paddingRight: '2%',
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
    fontSize: 14,
    marginBottom: 5,
    fontStyle : 'italic',
    fontWeight : '600'
  },
  iconNext: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  productInfo: {
    flexDirection: 'row',
    margin: '2%',
    backgroundColor: COLORS.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 5,
  },
  imgStyle: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  contactAdmin: {},
});

export default YourOrderDetailScreen;
