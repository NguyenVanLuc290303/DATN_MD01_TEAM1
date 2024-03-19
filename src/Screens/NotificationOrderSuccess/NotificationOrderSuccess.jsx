import React from 'react';
import {Text, View ,Image , TouchableOpacity} from 'react-native';
import {styles} from './NotificationOrderSuccess.style';

function NotificationOrderSuccess({navigation}) {
  return (
    <View style={styles.container}>
      <View>

      </View>
      <View style={{ flex : 3}}>
        <View style={{position: 'relative'}}>
          <Image source={require('../../assets/images/Ellipse.png')} />
          <View
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
              left: 15,
              bottom: 15,
            }}>
            <Image source={require('../../assets/images/fi_check.png')} />
          </View>
        </View>
      </View>
      <View style={{ flex : 2}}>
        <Text>
            Đơn hàng của bạn đã được đặt thành công đang chỡ xác nhận
        </Text>
      </View>
      <TouchableOpacity style={styles.btn_continueOrder} onPress={() => navigation.goBack()}>
        <Text style={styles.textBtn}>Tiếp tục mua hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_home} onPress={() => navigation.navigate('BottomNavigation')}>
        <Text style={styles.textHome}>Về trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
}
export default NotificationOrderSuccess;
