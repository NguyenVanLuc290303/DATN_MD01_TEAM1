import { Image, ScrollView, StyleSheet, Text, View ,TouchableOpacity , ToastAndroid ,NativeModules} from "react-native";
import {Icons} from '../../constants/images';
import COLORS from "../../constants/colors";
import CryptoJS from 'crypto-js';
import { User } from "../../hooks/useContext";
import { API_ORDER } from "../../config/api-consts";
import { API_PRODUCT_ORDER , API_DELETE_IN_CART } from "../../config/api-consts";
import axios, { Axios } from "axios";
import { Cart } from "../../hooks/cartContext";
import { useState } from "react";



const ZaloPaymentScreen = ({navigation , route}) =>{

    const {userData} = User();
    const {removeFromCart} = Cart();

    const {dataProductOrder , pricePayment , addressReceive , deleteProductInCart} = route.params;
    const [status, setStatus] = useState('chờ xác nhận');

    const handlePaymentZalo = () => {
      createZaloPayOrder();
      return;
    }


    const  getCurrentDateYYMMDD = () => {
        var todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
      }

      const createZaloPayOrder = async () => {
        let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
        let appid = 553;
        let amount = parseInt(pricePayment);
        let appuser = 'ZaloPayDemo';
        let apptime = new Date().getTime();
        let embeddata = '{}';
        let item = dataProductOrder;
        let description = 'Thanh toán đơn hàng quần áo';
        let hmacInput =
          appid +
          '|' +
          apptransid +
          '|' +
          appuser +
          '|' +
          amount +
          '|' +
          apptime +
          '|' +
          embeddata +
          '|' +
          item;
        let mac = CryptoJS.HmacSHA256(
          hmacInput,
          '9phuAOYhan4urywHTh0ndEXiV3pKHr5Q',
        );
        console.log('====================================');
        console.log('hmacInput: ' + hmacInput);
        console.log('mac: ' + mac);
        console.log('====================================');
        var order = {
          app_id: appid,
          app_user: appuser,
          app_time: apptime,
          amount: amount,
          app_trans_id: apptransid,
          embed_data: embeddata,
          item: dataProductOrder,
          description: description,
          mac: mac,
        };
    
        console.log(order);
    
        let formBody = [];
        for (let i in order) {
          var encodedKey = encodeURIComponent(i);
          var encodedValue = encodeURIComponent(order[i]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        await fetch('https://sb-openapi.zalopay.vn/v2/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formBody,
        })
          .then(response => response.json())
          .then(resJson => {
            console.log('createZaloPayOrder ', resJson);
            if (resJson.return_code === 1) {
              var payZP = NativeModules.PayZaloBridge;
              payZP.payOrder(resJson.zp_trans_token);
            }
          })
          .catch(error => {
            console.log('error ', error);
          });
      };


      const pushOrdertoServer = () =>{
        axios.post('/user', {
          fUserId: userData._id,
          status: status,
          date: getCurrentDateYYMMDD(),
          PTTT: "đã thanh toán",
          address: addressReceive,
        })
        .then(function (response) {
          pushProductOnOrder(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    const pushProductOnOrder = (data) =>{
      console.log(data);

      // console.log(numberPhone);
  
      const idOrder = data._id;
  
      console.log(idOrder, 'IdOrder =>>>>>>>>>>>>');
  
      const dataArrayOrder = dataProductOrder;
  
      dataArrayOrder.forEach(item => {
        item.OrderId = idOrder;
      });
      axios.post('/user', {
        danhSachSanPham: dataArrayOrder
      })
      .then(function (response) {
        if(response.data.status ===1){
          deleteProductCart();
          removeFromCart(deleteProductInCart);
          navigation.replace('NotificationOrderSuccess');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    
  const deleteProductCart = () =>{
    axios.delete(`${API_DELETE_IN_CART}`, {
  data: { productIds : deleteProductInCart } // Truyền mảng productIds vào body của request
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }


    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageLogo}>
                <Image source={Icons.IconZaloPay} style={{ width : 100 , height : 100}}/>
            </View>

            <View>
                <Text style={{
                    fontSize : 14,
                    fontWeight : '600',
                    fontStyle : 'italic'
                }}>
                    {addressReceive}
                </Text>
            </View>
            <ScrollView>
              {dataProductOrder.map((item, index) => (
                <View key={index} style={styles.productInfo}>
                  <Image source={{uri: item.Image}} style={styles.imgStyle} />
                  <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.textStyle}>
                      {item.Name}
                    </Text>
                    <View style={styles.productDetailsWrapper}>
                      <Text style={styles.productDetails}>{item.Size}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.salePrice}>{item.Price}</Text>
                      </View>
                      <View
                        style={[
                          styles.countProduct,
                          {
                            width: '50%',
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: '#272727',
                          },
                        ]}>
                        
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
                          {item.Quantity}
                        </Text>
                      
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View>
                <Text style={styles.pricetotal}>Tổng tiền thanh toán : {pricePayment}</Text>
            </View>
            <TouchableOpacity
            style={{
              width: '100%',
              height: 40,
              backgroundColor: COLORS.App,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginTop : 20
            }}
            onPress={handlePaymentZalo}>
            <Text style={{fontFamily: 'Inter-Bold', color: COLORS.white}}>
              Thanh Toán
            </Text>
          </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container :{
        width : '100%',
        padding : 10
    },
    imageLogo:{
        width : '100%',
        justifyContent : 'center',
        height : 200,
        alignItems : 'center'
    },
    textAddress: {
        marginLeft: 30,
        flex: 1,
      },
      iconAddress: {
        width: 20,
        height: 20,
      },
      rowContainer: {
        flexDirection: 'row',
        marginLeft: 10,
      },
      item: {
        marginBottom: 20, // Add margin bottom to separate items
      },
      productInfo: {
        flexDirection: 'row',
        margin: '2%',
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
        marginLeft: 10,
        backgroundColor: '#EFEFEF',
        paddingHorizontal: 10,
        paddingVertical: 1,
        borderRadius: 5,
        alignSelf: 'flex-start', // Căn chỉnh cho phù hợp với vùng chữ
      },
      priceContainer: {
        flexDirection: 'column',
      },
      imgStyle: {
        width: 80,
        height: 80,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignSelf: 'center',
      },
      textContainer: {
        flexDirection: 'column',
      },
      textStyle: {
        fontSize: 16,
        color: COLORS.black, // Ensure text color is visible
        marginBottom: 5,
        fontWeight: 'bold',
      },
      productDetails: {
        fontSize: 14,
        marginTop: 5,
        color: '#939393',
      },
      salePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 10,
      },
      countProduct: {
        backgroundColor: COLORS.white,
        justifyContent: 'flex-end',
        marginLeft: 30,
        height: 22,
        borderRadius: 8,
        flexDirection: 'row',
      },
    pricetotal :{
        fontSize : 15,
        fontStyle : "normal",
        fontWeight : 'bold'
    }
})




export default ZaloPaymentScreen;