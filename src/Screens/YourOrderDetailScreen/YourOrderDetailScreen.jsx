import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import axios, {Axios} from 'axios';
import {API_PRODUCT_ORDER, API_PRODUCT_ORDER_ID} from '../../config/api-consts';
import {Icons} from '../../constants/images';
import COLORS from '../../constants/colors';
import {User} from '../../hooks/useContext';

const YourOrderDetailScreen = ({navigation, route}) => {
  const {OrderId , status} = route.params;

  console.log(OrderId, 'OrderId 000000');

  console.log(status);

  const {userData} = User();

  const [dataOrderDetail, setDataOrderDetail] = useState([]);

  const costTranformer = 22000;

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

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: 22, height: 22}}
            source={require('@/images/back.png')}
          />
        </TouchableOpacity>
        <View style={{ marginLeft : '5%'}}>
          <Text style={{ fontSize : 24 , fontFamily : 'Inter-SemiBold'}}>{status}</Text>
          <Text>Ngày giao dự kiến : Jan 21 - Jan 23</Text>
        </View>
        <View></View>
      </View>
      <View style={styles.address}>
        <Image source={Icons.IconAddress} style={styles.iconAddress} />
        <View style={styles.textAddress}>
          <Text style={styles.textInfo}>{userData.username}</Text>
          <Text style={styles.textInfo}>{userData.numberPhone}</Text>
          <Text style={styles.textInfo2}>{userData.address}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('DeliveryScreen')}>
          <Image source={Icons.IconNext} style={styles.iconNext} />
        </TouchableOpacity>
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
            Hủy đơn hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection : 'row',
    width: '100%',
    height: 80,
    backgroundColor: COLORS.white,
    alignItems :'center'
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
    width: 24,
    height: 24,
    marginRight: 20,
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
    borderRadius : 5
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
