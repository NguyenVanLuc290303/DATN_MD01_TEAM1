import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios, {isCancel, AxiosError} from 'axios';
import {API_CATEGORY_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT_TOP8} from '../../config/api-consts';
import {User} from '../../hooks/useContext';
import {API_ADD_TO_LOVE} from '../../config/api-consts';
import {API_PRODUCT_TO_CART} from '../../config/api-consts';
import COLORS from '../../constants/colors';
import {Cart} from '../../hooks/cartContext';
import Loading from '../../components/organisms/Loading/Loading';
import LoadingHome from '../../components/organisms/LoadingHome/LoadingHome';
import Slider from '../../components/morecules/SildeShow/Silder';
import {styles} from './Home.style';
const Home = ({navigation}) => {
  const {userData} = User();
  // const userName = dataUser.username;
  const [dataCategory, setDataCategory] = React.useState([]);
  const [dataProduct, setDataProduct] = React.useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const {setDataCart, dataCart} = Cart();

  console.log(dataCart.length, 'dataCart.length');

  const addToLove = async productId => {
    try {
      // console.log("userData:", userData);
      // console.log("ID của sản phẩm:", productId);
      if (!productId) {
        console.error('ID của sản phẩm không hợp lệ');
        return;
      }

      const response = await axios.post(
        `${API_ADD_TO_LOVE}/${userData._id}/${productId}`,
        null,
        {
          headers: {
            Cookie:
              'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
          },
        },
      );
      console.log('Response từ server:', response.data);
      setFavoriteProducts([...favoriteProducts, productId]);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào trang Love:', error);
    }
  };

  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(API_CATEGORY_PRODUCT, requestOptions)
      .then(response => response.json())
      .then(result => setDataCategory(result))
      .catch(error => console.log('error', error));
  }, []);

  React.useEffect(() => {
    axios
      .get(`${API_PRODUCT_TO_CART}/${userData._id}`)
      .then(function (response) {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log(data);
        setDataCart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(dataCart, 'sản phẩm trong giỏ của mỗi người');

  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(API_PRODUCT_TOP8, requestOptions)
      .then(response => response.json())
      .then(result => setDataProduct(result))
      .catch(error => console.log('error', error));
  }, []);

  console.log('render lại , HomeScreen');

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Image
              style={styles.imageTitle}
              source={require('@/images/logoAPP_MD01_png.png')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchProductScreen')}>
              <IconI name="search-outline" size={30} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('CartScreen')}>
              <Image source={require('@/icons/png/local_mall.png')} />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: COLORS.red,
                  position: 'absolute',
                  borderRadius: 10,
                  top: 0,
                  right: 0,
                }}>
                <Text style={{color: COLORS.white, marginLeft: 5}}>
                  {dataCart.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <Slider />

          <View style={{paddingLeft: 10, marginTop: 10}}>
            <Text style={styles.textHead}>Category</Text>
          </View>
          {dataCategory.length > 0 ? (
            <>
              <View style={{marginTop: 10}}>
                <ScrollView horizontal>
                  {dataCategory.map((item, index) => (
                    <TouchableOpacity
                      key={index} // Đảm bảo có key duy nhất cho mỗi mục
                      onPress={() =>
                        navigation.navigate('ProductCategory', {
                          name: item.name,
                        })
                      }>
                      <View style={styles.viewItem}>
                        <Text>{item.name}</Text>
                        <Image
                          style={{width: 52, height: 52}}
                          source={{uri: item.image}}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{paddingLeft: 10, marginTop: 10}}>
                <Text style={styles.textHead}>Recommend</Text>
              </View>
              <ScrollView contentContainerStyle={{  flexDirection: 'row', flexWrap: 'wrap'}}>
                {dataProduct.map((item, index) => (
                  <View
                    key={index}
                    style={[styles.viewItemProducts]}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '5%',
                      }}
                      onPress={() =>
                        navigation.navigate('DetailProductScreen', {
                          _id: item._id,
                          name: item.name,
                          image: item.image,
                          category: item.loai,
                          price: item.price,
                          quantitySold: item.quantitySold,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 90, height: 131}}
                      />
                      <Text>{item.name}</Text>
                      <Text>{item.price} USD</Text>
                      {/* Thêm icon trái tim */}
                      <TouchableOpacity
                        style={styles.heartIcon}
                        onPress={() => addToLove(item._id)}>
                        <Icon name="heart" size={20} color="red" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </>
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
