import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios, {isCancel, AxiosError} from 'axios';
import {API_CATEGORY_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT_TOP8} from '../../config/api-consts';
import {User} from '../../hooks/useContext';
import { API_ADD_TO_LOVE, API_DELETE_TO_LOVE } from "../../config/api-consts";
import { API_PRODUCT_TO_CART } from '../../config/api-consts';
import COLORS from '../../constants/colors';
import { Cart } from '../../hooks/cartContext';
import Loading from '../../components/organisms/Loading/Loading';

const Home = ({ navigation }) => {
  const { userData } = User();
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const { setDataCart, dataCart } = Cart();

  useEffect(() => {
    const loadLikedProducts = async () => {
      try {
        const likedProductsString = await AsyncStorage.getItem(`likedProducts_${userData._id}`);
        if (likedProductsString !== null) {
          setLikedProducts(JSON.parse(likedProductsString));
        }
      } catch (error) {
        console.error('Lỗi khi tải trạng thái yêu thích:', error);
      }
    };

    loadLikedProducts();
  }, [userData._id]); 

  const toggleFavorite = async (productId) => {
    try {
      if (!productId) {
        console.error('ID của sản phẩm không hợp lệ');
        return;
      }

      const isLiked = isProductLiked(productId);

      let response;
      if (isLiked) {
        response = await axios.delete(
          `${API_DELETE_TO_LOVE}/${userData._id}/${productId}`,
          {
            headers: {
              Cookie: 'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
            },
          }
        );
        console.log('Sản phẩm đã được xóa khỏi danh sách yêu thích:', response.data);

        const updatedLikedProducts = likedProducts.filter(id => id !== productId);
        setLikedProducts(updatedLikedProducts);
        await AsyncStorage.setItem(`likedProducts_${userData._id}`, JSON.stringify(updatedLikedProducts));
      } else {
        response = await axios.post(
          `${API_ADD_TO_LOVE}/${userData._id}/${productId}`,
          null,
          {
            headers: {
              Cookie: 'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
            },
          }
        );
        console.log('Sản phẩm đã được thêm vào danh sách yêu thích:', response.data);

        const updatedLikedProducts = [...likedProducts, productId];
        setLikedProducts(updatedLikedProducts);
        await AsyncStorage.setItem(`likedProducts_${userData._id}`, JSON.stringify(updatedLikedProducts));
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện thao tác yêu thích sản phẩm:', error);
    }
  };

  const isProductLiked = productId => {
    return likedProducts.includes(productId);
  };

  const renderHeartColor = productId => {
    return isProductLiked(productId) ? 'red' : 'silver';
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
      .get(`${API_PRODUCT_TO_CART}`)
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
      {dataCategory.length > 0  ? (
        <View>
          <View style={styles.header}>
            <View>
              <Image
                style={styles.imageTitle}
                source={require('@/images/logoAPP_MD01_png.png')}
              />
            </View>
            {/* <Text>Hi {userName}</Text> */}
            <TouchableOpacity style={{ width : 40 , height : 40 , justifyContent : 'center' , alignItems : 'center'}} onPress={() => navigation.navigate('CartScreen')}>
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
                
                }}
                >
                  <Text style={{ color : COLORS.white , marginLeft : 5}}>
                    {dataCart.length}
                  </Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={styles.textTitle}>Men Clothes Store</Text>
          </View>
          <View style={styles.viewSearch}>
            <View style={styles.search}>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('SearchProductScreen')} >
              <TextInput style={styles.textInputSearch} placeholder="Tìm kiếm sản phẩm ở đây" editable={false}/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('SearchProductScreen')}>
              <IconI name="search-outline" size={30} color={'gray'} />
            </TouchableOpacity>
          </View>
            </View>
          </View>
          <View style={{paddingLeft: 10, marginTop: 10}}>
            <Text style={styles.textHead}>Category</Text>
          </View>
          <View style={{marginTop: 10}}>
            <FlatList
              horizontal
              data={dataCategory}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        'ProductCategory',
                        (item = {name: item.name}),
                      )
                    }>
                    <View style={styles.viewItem}>
                      <Text>{item.name}</Text>
                      <Image
                        style={{width: 52, height: 52}}
                        source={{uri: item.image}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{paddingLeft: 10, marginTop: 10}}>
            <Text style={styles.textHead}>Recommend</Text>
          </View>

          <FlatList
            numColumns={2}
            data={dataProduct}
            renderItem={({item, index}) => {
              return (
                <View style={styles.viewItemProducts}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingTop: '5%',
                    }}
                    onPress={() =>
                      navigation.navigate(
                        'DetailProductScreen',
                        (item = {
                          _id: item._id,
                          name: item.name,
                          image: item.image,
                          category: item.loai,
                          price: item.price,
                          quantitySold: item.quantitySold,
                        }),
                      )
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
                      onPress={() => toggleFavorite(item._id)}>
                      <Icon name="heart" size={20} color={renderHeartColor(item._id)} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 10,
  },
  imageTitle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f2f2',
  },
  textTitle: {
    fontSize: 25,
    fontFamily: 'Inter-Bold',
  },
  textHead: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  viewSearch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  search: {
    width: '80%',
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  textInputSearch: {
    fontSize: 18
  },
  viewItem: {
    width: 75,
    height: 105,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'space-around',
    marginLeft: 20,
    borderColor: '#DEDEDE',
    shadowColor: '#000',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  viewItemProducts: {
    width: '43%',
    height: 210,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  heartIcon: { 
    position: 'absolute', 
    top: 5, right: 5,
    // backgroundColor: 'rgba(255, 0, 0, 0.1)', 
    // borderRadius: 30, 
    // padding: 5,
},
});

export default Home;
