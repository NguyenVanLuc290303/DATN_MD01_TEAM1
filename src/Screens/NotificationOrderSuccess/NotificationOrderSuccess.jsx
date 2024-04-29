import React from 'react';
import {Text, View ,Image , TouchableOpacity , Dimensions} from 'react-native';
import {styles} from './NotificationOrderSuccess.style';
import Icon from 'react-native-vector-icons/Ionicons'
import COLORS from '../../constants/colors';
import OrderItemView from '../../components/organisms/OrderItemView/OrderItemView';

const {HEIGHT , WIDTH} = Dimensions.get("window");

function NotificationOrderSuccess({navigation, route}) {

  const { timeOrder} = route.params || {};

  const dataProductOrder = [
    {
      "_id": "661a9a9bf10cb00dce02a662",
      "OrderId": "661a9a9af10cb00dce02a655",
      "ProductId": "6615072cb4234ad3922c9547",
      "ColorCode": "BDBDBD",
      "Size": "XL",
      "Quantity": 1,
      "PropertiesId": "6615074cb4234ad3922c9557",
      "Image": "https://firebasestorage.googleapis.com/v0/b/vidu2-96b2f.appspot.com/o/uploads%2FScreenshot%202024-03-25%20094627.png?alt=media",
      "__v": 0
    }
  ];


  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
          <View>
            <Icon name="checkmark-circle" size={50} color={"green"}/>
          </View>
          <View>
            <Text style={{ fontSize : 17 , fontWeight : '600'}}>Cảm ơn !</Text>
            <Text>Đơn hàng của bạn đã được đặt thành công</Text>
          </View>
      </View>
      <View style={styles.addressReceive}>

      </View>
      <View style={styles.timeOrder}>
        <Text style={{ fontSize : 14 , fontWeight : '500'}} >
          Thời gian 
        </Text>
        <Text>
        {timeOrder}
        </Text>
      </View>
      <View>
      <Text style={{ fontSize : 16 ,fontWeight : '500'}}>Sản phẩm của đơn hàng</Text>

      <OrderItemView
        dataProductOrder={dataProductOrder}
      />
      
      </View>
      <View style={{ width : WIDTH  , justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
      <TouchableOpacity style={styles.btn_continueOrder} onPress={() => navigation.goBack()}>
        <Text style={styles.textBtn}>Tiếp tục mua hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_home} onPress={() => navigation.navigate('BottomNavigation')}>
        <Text style={styles.textHome}>Về trang chủ</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
}
export default NotificationOrderSuccess;
