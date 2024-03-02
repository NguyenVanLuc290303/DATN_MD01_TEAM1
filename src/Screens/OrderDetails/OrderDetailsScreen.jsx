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
import { User } from '../../hooks/useContext';

import {useState , useCallback} from 'react';
import CheckBox from '@react-native-community/checkbox';
import { API_ORDER } from '../../config/api-consts';
import { API_PRODUCT_ORDER } from '../../config/api-consts';

const OrderDetailsScreen = ({navigation , route}) => {

  const { idProduct, idPropoties , name , size , quantity , color , price , image } = route.params;

  // console.log( idProduct  + "Product ID PPPPP");
  // console.log( size  + "size ID PPPPP");
  // console.log( quantity  + "quantity ID PPPPP");
  // console.log( color  + "color ID PPPPP");
  // console.log( price  + "price ID PPPPP");
  // console.log( image  + "image URL ID PPPPP");
   console.log( idPropoties  + "id URL ID PPPPP");


  const {userData} = User();

  const idUser = userData._id;
  const userName = userData.username;
  const email = userData.email;
  const address = userData.address;
  const numberPhone = userData.numberPhone;

  // console.log(idUser , userName , email , address , numberPhone);

  const [isChecked, setIsChecked] = useState(false); // State để lưu trạng thái của checkbox

  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Hàm để đảo ngược trạng thái của checkbox
  };

  var costTranformer = 22000;

  const [total , setTotal] = useState(price * quantity + costTranformer);

  const [status ,setStatus] = useState("chờ xác nhận");

  const [methodPay , setMethodPay] = useState("thanh toán khi nhận hàng");

  const callBackPriceProduct = useCallback ((quantityFinish)=>{

    var totalPriceProduct = (price * quantityFinish) + costTranformer;

    setTotal(totalPriceProduct);

  },[quantityFinish])


  const [quantityFinish, setQuantityFinish] = useState(quantity); // Số lượng mặc định là 1


    // Hàm xử lý cộng số lượng
    const incrementQuantity = useCallback(() => {
      setQuantityFinish(quantityFinish + 1);

      callBackPriceProduct(quantityFinish + 1);
    });


  
    // Hàm xử lý trừ số lượng, không cho giảm dưới 1
    const decrementQuantity = () => {
      if (quantityFinish > 1) {
        setQuantityFinish(quantityFinish - 1);

        
        callBackPriceProduct(quantityFinish -1);
      }
    };
  //de trong view

  const year = new Date().getFullYear();

  console.log("year :" + year);

  const month = new Date().getMonth() + 1;

  console.log("month :" +month);

  const date = new Date().getDate();

  console.log("date :" + date);

  const hour = new Date().getHours();

  console.log("hour :" + hour);

  const minutes = new Date().getMinutes();

  const secounds = new Date().getSeconds();
  console.log("mines :" + minutes);

  // const formatDateTimeOrder = year + '-' + month + '-' + date + ' ' + hour + ":" + minutes  + ":" + secounds ;

  // const stringFormatDateTimeOrder = formatDateTimeOrder.toString();

  const formattedDate = `${year}-${month}-${date} ${hour}:${minutes}:${secounds}`;


  
  console.log(formattedDate);

  

  const handleOrderProduct = () =>{
      const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
        'Cookie',
        'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
        );

        // console.log(numberPhone);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            UserId : idUser,
            status : status,
            date : formattedDate,
            PTTT : methodPay
        }),
        redirect: 'follow',
        };

        try {
            
        fetch(API_ORDER, requestOptions)
        .then(response => response.json())
        .then(result => pushProductOnOrder(result))
     

        } catch (error) {
            console.log(error);
        }
  }

  const pushProductOnOrder = (data) =>{
    console.log(data._id);

    const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
        'Cookie',
        'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
        );

        // console.log(numberPhone);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            OrderId : data._id,
            ProductId : idProduct,
            ColorCode : color,
            Size : size,
            Quantity : quantityFinish,
            PropertiesId: idPropoties,
            Image: image,
        }),
        redirect: 'follow',
        };

        try {
            
        fetch(API_PRODUCT_ORDER, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
     

        } catch (error) {
            console.log(error);
        }

  }

  



  return (
    <View style={styles.container}>
      <View style={styles.borderStyles}>
        <View style={styles.address}>
          <Image source={Icons.IconAddress} style={styles.iconAddress} />
          <View style={styles.textAddress}>
            <Text style={styles.textInfo}>{userName}</Text>
            <Text style={styles.textInfo}>{numberPhone}</Text>
            <Text style={styles.textInfo2}>{address}</Text>
          </View>
          <Image source={Icons.IconNext} style={styles.iconNext} />
        </View>
        <View style={styles.viewImageContainer}>
          <Image source={Icons.IconView} style={styles.iconView} />
        </View>
        <View style={styles.item}>
          <View style={styles.productInfo}>
            <Image
              source={{ uri : image}}
              style={styles.imgStyle}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.textStyle}>
                {name}
              </Text>
              <View style={styles.productDetailsWrapper}>
                <Text style={styles.productDetails}>{size}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.priceContainer}>
                  <Text style={styles.salePrice}>{price}</Text>
                  {/* <Text style={styles.regularPrice}>799000d</Text> */}
                </View>
                <View
                  style={[
                    styles.countProduct,
                    {
                      // flex: 5,
                      width : '50%',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#272727',
                    },
                  ]}>
                  <TouchableOpacity style={styles.borderCount} onPress={decrementQuantity}>
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
                    {quantityFinish}
                  </Text>
                  <TouchableOpacity style={styles.borderCount} onPress={incrementQuantity}>
                    <Text style={{textAlign: 'center', color: COLORS.black}}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.textTransport}>
          <Text style={styles.transportInfo}>Vận chuyển tiêu chuẩn</Text>
          <Text style={styles.priceTransport}>{costTranformer}</Text>
        </View>
        <View style={styles.addressTransport}>
          <Image
            source={require('../../assets/images/send.png')}
            style={{width: 13, height: 12, marginTop: 5, marginRight: 5}}
          />
          <Text style={{marginBottom: 3, color: COLORS.black}}>
            Từ Cầu Giấy
          </Text>
        </View>
        <View style={styles.timeTransport}>
          <Image
            source={require('../../assets/images/clock.png')}
            style={{width: 13, height: 12, marginTop: 5, marginRight: 5}}
          />
          <Text style={{marginBottom: 3, color: COLORS.black}}>
            Ngày giao dự kiến: Jan 16 - Jan 18
          </Text>
        </View>
        <View style={{marginLeft: 25, marginTop: 15}}>
          <Text style={{marginBottom: 3, color: COLORS.black}}>
            Tin nhắn: Che tên sản phẩm
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          marginTop: 10,
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: COLORS.black,
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 10,
            fontSize: 16,
          }}>
          Tóm tắt yêu cầu
        </Text>
        <View style={styles.textTransport}>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'normal',
              marginLeft: 10,
              marginTop: 7,
            }}>
            Sản phẩm
          </Text>
          <Text style={styles.priceTransport}>{price}</Text>
        </View>
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
        <View style={styles.textTransport2}>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 7,
            }}>
            Tổng
          </Text>
          <Text style={styles.priceTransport2}>{total}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          marginTop: 10,
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: COLORS.black,
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 10,
            fontSize: 16,
          }}>
          Phương thức thanh toán
        </Text>
        <View style={styles.textTransport3}>
          <Image
            style={{
              width: 18,
              height: 16,
              marginLeft: 10,
              marginTop: 5,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            source={require('../../assets/images/payment_code.png')}
          />
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'normal',
              marginTop: 7,
              marginLeft: 20,
            }}>
            Thanh toán khi nhận hàng
          </Text>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={toggleCheckbox}>
            {/* Hình ảnh checkbox tùy chỉnh */}
            {isChecked ? (
              <Image
                source={require('../../assets/images/checkbox_checked.png')}
                style={styles.checkbox}
              />
            ) : (
              <Image
                source={require('../../assets/images/checkbox_checked.png')}
                style={styles.checkbox}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.textTransport3}>
          <Image
            style={{
              width: 34,
              height: 16,
              marginLeft: 10,
              marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            source={require('../../assets/images/zalopay.png')}
          />
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'normal',
              marginTop: 10,
              marginLeft: 20,
            }}>
            Zalo Pay
          </Text>
          <Text style={styles.priceTransport3}>Liên kết</Text>
        </View>
        <View style={styles.textTransport3}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            source={require('../../assets/images/paypal.jpg')}
          />
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'normal',
              marginTop: 10,
              marginLeft: 20,
            }}>
            PayPal
          </Text>
          <Text style={styles.priceTransport3}>Liên kết</Text>
        </View>
        <View style={styles.textTransport4}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            source={require('../../assets/images/credit-card.png')}
          />
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'normal',
              marginTop: 10,
              marginLeft: 20,
            }}>
            Thẻ tín dụng/Ghi nợ
          </Text>
        </View>
      </View>
      <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                backgroundColor: COLORS.red,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 15,
                right: 50,
                left: 50,
                borderRadius: 5,
              }}
              onPress={handleOrderProduct}>
              <Text style={{fontFamily: 'Inter-Bold', color: COLORS.white}}>
                Đặt hàng
              </Text>
            </TouchableOpacity>
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
    width: 15,
    height: 10,
    marginRight: 20,
  },
  borderStyles: {
    backgroundColor: COLORS.white,
  },
  viewImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconView: {
    width: '100%',
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
  textTransport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textTransport4: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  textTransport3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textTransport2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 10,
  },
  transportInfo: {
    color: COLORS.black,
  },
  priceTransport: {
    alignSelf: 'flex-end',
    color: COLORS.black,
    marginRight: 20,
  },
  priceTransport2: {
    alignSelf: 'flex-end',
    color: COLORS.black,
    marginRight: 20,
    fontWeight: 'bold',
  },
  priceTransport3: {
    color: COLORS.black,
    marginLeft: 50,
    fontWeight: 'bold',
    marginTop: 5,
    marginRight: 15,
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
  regularPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  countProduct: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    marginLeft: 30,
    height: 22,
    borderRadius: 8,
    flexDirection: 'row',
  },
  borderCount: {
    flex: 1,
  },
  addressTransport: {
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 10,
  },
  timeTransport: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  checkbox: {
    alignSelf: 'center',
    width: 10,
    height: 10,
  },
  checkboxContainer: {
    borderRadius: 20, // Border radius cho view bao bọc
    overflow: 'hidden', // Cắt bớt phần ngoài ra khỏi vùng border
  },
});

export default OrderDetailsScreen;
