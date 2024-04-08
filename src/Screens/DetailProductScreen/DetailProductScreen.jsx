import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  TouchableOpacityBase,
  TouchableHighlight,
  Alert,
  PanResponder,
  Animated,
  Easing,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import {styleCommon} from '../../theme/styles/CommomStyle';
import COLORS from '../../constants/colors';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import {API_COLOR_PRODUCT} from '../../config/api-consts';
import {API_PRODUCT_TO_CART} from '../../config/api-consts';
import {User} from '../../hooks/useContext';
import {Cart} from '../../hooks/cartContext';
import {styles} from './DetailProductScreen.style';
import ProductListAll from '../../components/organisms/ListAllProducts/ProductListAll';
import useListProduct from '../../services/product-services/use-all-list-product';
import useListEvaluate from '../../services/evaluate-services/use-list-evaluate-product';
import { IMAGE_URL_DEFAULT } from '../../assets/images/background/imageURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailProductScreen = ({navigation, route}) => {
  const {_id, name, price, quantitySold, image, category, describe} =
    route.params;

  const {userData} = User();

  const {dataCart, addItemToCart} = Cart();

  const idUser = userData._id;

  const [dataProperties, setDaProperties] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);

  // data select

  const [selectSize, setSelectSize] = useState();

  const [idPropotiesS, setIdPropoties] = useState();

  const [quantity, setQuantity] = useState(1); // Số lượng mặc định là 1

  const [quantityRemain, setQuantityRemain] = useState();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;


  const [productListAll] = useListProduct();

  const listEvaluate = useListEvaluate(_id);

  const productListSimilar = productListAll.filter(
    item => item.category === category && item.id !== _id,
  );

  // console.log(dataCart, 'datacartlength');

  // Hàm xử lý cộng số lượng

  //Đang sai logic render của react
  const incrementQuantity = () => {
    console.log(quantityRemain, ')))))))');
    console.log(quantity, '_____________');
    if (quantityRemain === quantity) {
      ToastAndroid.showWithGravity(
        'Số lượng đã trong kho hàng đã hết',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      setQuantity(quantity + 1);
    }
  };

  // Hàm xử lý trừ số lượng, không cho giảm dưới 1
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3AMdyEBTPnvEcmS-NT5ue39ZeJ81k2qauG.Mh7BuWZzlF%2BJPTKQf61g0jlxRu8%2Fd0phZA8zqYeDr6g',
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_COLOR_PRODUCT}/${_id}`, requestOptions)
      .then(response => response.json())
      .then(result => setDaProperties(result))
      .catch(error => console.error(error));
  }, []);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '70%'], []);

  const handlePresentModalPress = useCallback(index => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {}, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const bottomSheetModalSaleRef = useRef(null);

  const handlePresentModalPressSale = useCallback(index => {
    bottomSheetModalSaleRef.current?.present();
  }, []);

  const handleSheetChangesSale = useCallback(index => {}, []);

  const handleClosePressSale = useCallback(() => {
    bottomSheetModalSaleRef.current?.close();
  }, []);

  const [checkProductCarts, setCheckProductCarts] = useState(null);

  // animation cart

  const animationScale = useRef(new Animated.Value(1)).current;

  // console.log(animationScale, 'LLLLLLLLLLLL');
  const animationPosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const [showImageAnimation, setShowImageAnimation] = useState(false);
  // console.log(windowHeight , windowWidth ,"ooooo");

  const animationCart = () => {
    setShowImageAnimation(true);
    const shrinkAnimation = Animated.timing(animationScale, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    });

    const parabolicAnimation = Animated.timing(animationPosition, {
      toValue: {x: windowWidth / 2.5, y: windowHeight / -3.8},
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      duration: 1000,
      useNativeDriver: false,
    });

    Animated.parallel([shrinkAnimation, parabolicAnimation]).start(() => {
      // Sau khi hoàn thành animation, đặt lại giá trị ban đầu
      animationScale.setValue(1);
      animationPosition.setValue({x: 0, y: 0});
      setShowImageAnimation(false);
    });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    { useNativeDriver: true }
  );
  
  const translateY = scrollOffsetY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate : 'clamp'
  });



  const handleToCart = () => {

    

    if (selectedColor !== null) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3AMUhs3zzQOSqhxF85Fo8cxhWe-tIcn7yJ.4tBwGl%2FKSv%2BCGLjLVN%2BVqs9LV2Tl51tkZIAR8Gd%2Fcwg',
      );

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          CartId: idUser,
          ProductId: _id,
          Name: name,
          Price: price,
          ColorCode: selectedColor.colorId,
          Size: selectSize,
          Quantity: quantity,
          RemainQuantity: quantityRemain,
          PropertiesId: idPropotiesS,
          Image: selectedColor.image,
        }),
        redirect: 'follow',
      };

      try {
        fetch(
          `${API_PRODUCT_TO_CART}/${_id}/${selectedColor.colorId}/${selectSize}/${idUser}`,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => 
            {
            if (result.status === 1) {
              addItemToCart(result);
              animationCart();
              handleClosePress();
            } else {
              ToastAndroid.showWithGravity(
                'Sản phẩm đã có trong giỏ',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          }
        
        );
      } catch (error) {
        console.log(error, ' lỗi thêm vào giỏ hàng');
      }
    } else {
      ToastAndroid.showWithGravity(
        'Bạn chưa chọn màu',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleToSale = () => {
    if (selectedColor !== null) {
      const productSelect = [
        {
          ProductId: _id,
          PropertiesId: idPropotiesS,
          Name: name,
          Size: selectSize,
          Quantity: quantity,
          ColorCode: selectedColor.colorId,
          Price: price,
          Image: selectedColor.image,
        },
      ];

      navigation.navigate('OrderDetailsScreen', {
        dataProductOrder: productSelect,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Bạn chưa chọn màu',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleOnpressSize = (size, id, quantity) => {
    // console.log(quantity ,  "số lượng còn trong size đó ?????");
    setQuantityRemain(quantity);
    setSelectSize(size);
    setIdPropoties(id);
  };

  // console.log('renderlai');

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.container]}>
        <Animated.ScrollView contentContainerStyle={{flexGrow: 1}}
           onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={32} color={COLORS.black} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconF name="search" size={28} color={COLORS.gray} />
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
          <View style={styles.ViewImageProduct}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.imageProduct}
            />
            <Animated.View
              style={[
                {
                  transform: [
                    {translateX: animationPosition.x},
                    {translateY: animationPosition.y},
                    {scale: animationScale},
                  ],
                  width: 100,
                  height: 100,
                  position: 'absolute',
                  borderRadius: 50,
                  zIndex: showImageAnimation ? 4 : -2,
                  backgroundColor: COLORS.white,
                },
              ]}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50}}
                source={{uri: image}}
              />
            </Animated.View>
          </View>
          <View style={styles.infoProduct}>
            <Text
              style={[
                styleCommon.h2,
                {color: COLORS.black, fontWeight: 'bold', marginTop: 10},
              ]}>
              {price}
            </Text>
            <View>
              <Text style={[styleCommon.h2, {color: COLORS.black}]}>
                {name}
              </Text>
            </View>
            <View>
              <Text style={{color: COLORS.black, fontSize: 16}}>
                {describe}
              </Text>
            </View>
            {/* <AddToCart navigation={navigation}/> */}
          </View>
          <View style={styles.star}>
            <Text> Đã bán : {quantitySold}</Text>
          </View>
          <View style={styles.description}></View>
          <View style={styles.evaluation}>
            {listEvaluate.map((item, index) => (
              <View style={{marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{width: 40, height: 40, borderRadius: 20}}
                    source={{uri: item.imageuser }}
                  />

                  <View style={{marginLeft: 10}}>
                    <Text>{item.username}</Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                    {Array.from({ length: item.star }).map((_, starIndex) => (
                        <TouchableOpacity key={starIndex}>
                          <Icon name="star" size={20} color={'yellow'} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>

                <View style={{marginTop: 5, marginLeft: 20}}>
                  <Text>{item.content}</Text>
                  <Image
                    style={{width: 80, height: 80}}
                    source={{uri: item.imageContent}}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#E5E5E5',
                    marginTop: 10
                  }}></View>
              </View>
            ))}
          </View>

          <View
            contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {productListSimilar.map((item, index) => (
              <View style={[styles.viewItemProducts]}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',
                  }}
                  onPress={() =>
                    navigation.replace('DetailProductScreen', {
                      _id: item._id,
                      name: item.name,
                      image: item.image,
                      category: item.loai,
                      describe: item.describe,
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
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.bottomSheet,
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              transform: [{ translateY }]
            },
          ]}>
          <View style={styles.rowContainer2}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BottomNavigation')}
              style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={{color: COLORS.black}}>Home</Text>
              <IconF name="home" size={28} color={COLORS.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={{color: COLORS.black}}>Trò chuyện</Text>
              <Icon
                name="chatbubble-ellipses-outline"
                size={28}
                color={COLORS.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={handlePresentModalPress}>
              <Text style={styles.orderButtonText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={handlePresentModalPressSale}>
              <Text style={styles.orderButtonText}>Order</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.bottomSheetContainer}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {selectedColor && selectedColor.image ? (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 0.5,
                    borderColor: COLORS.black,
                    borderRadius: 2,
                  }}>
                  <Image
                    style={styles.imageProductChild}
                    source={{
                      uri: selectedColor.image,
                    }}
                  />
                </View>
              ) : dataProperties[0] && dataProperties[0].image ? (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 0.5,
                    borderColor: COLORS.black,
                    borderRadius: 2,
                  }}>
                  <Image
                    style={styles.imageProductChild}
                    source={{
                      uri: dataProperties[0].image,
                    }}
                  />
                </View>
              ) : (
                <View>
                  {/* Placeholder or error handling when image is not available */}
                </View>
              )}

              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 25,
                  color: COLORS.black,
                  marginLeft: '2%',
                }}>
                {price}
              </Text>
              <TouchableOpacity
                style={{flex: 1, position: 'absolute', top: 0, right: 0}}
                onPress={handleClosePress}>
                <IconF name="x" size={24} color={'black'} />
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.borderColor,
                marginTop: 15,
                marginBottom: 20,
              }}>

              </View> */}
            <View style={styleCommon.sp1}>
              <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                Màu sắc
              </Text>
              <View>
                <FlatList
                  data={dataProperties}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => {
                    // console.log(item.colorId + 'pppppppppppppppppp');
                    return (
                      <TouchableOpacity
                        style={{
                          width:
                            selectedColor &&
                            selectedColor.colorId === item.colorId
                              ? 40
                              : 35,
                          height:
                            selectedColor &&
                            selectedColor.colorId === item.colorId
                              ? 40
                              : 35,
                          marginRight: 20,
                          marginTop: 10,
                          borderRadius: 10,
                          backgroundColor: `#${item.colorId}`,
                          // borderWidth: 1,
                          // borderColor:
                          //   selectedColor &&
                          //   selectedColor.colorId === item.colorId
                          //     ? COLORS.black
                          //     : `#${item.colorId}`,
                        }}
                        onPress={() => setSelectedColor(item)}>
                        {/* <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> */}
                      </TouchableOpacity>
                    );
                  }}
                  horizontal
                />

                {selectedColor ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                      Sizes:
                    </Text>
                    <FlatList
                      data={
                        selectedColor && selectedColor.sizes
                          ? selectedColor.sizes.filter(
                              size => size.quantity > 0,
                            )
                          : []
                      }
                      // keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 35,
                              alignItems: 'center',
                              borderRadius: 10,
                              marginTop: 10,
                              marginBottom: 10,
                              justifyContent: 'center',
                              backgroundColor:
                                selectSize === item.size
                                  ? '#000000'
                                  : '#D9D9D9',
                            }}
                            onPress={() =>
                              handleOnpressSize(
                                item.size,
                                item._id,
                                item.quantity,
                              )
                            }>
                            <Text
                              style={{
                                width: '85%',
                                // marginRight: 10,
                                // marginLeft: 10,
                                fontSize: 16,
                                fontWeight: '600',
                                paddingLeft: '5%',
                                color:
                                  selectSize === item.size
                                    ? '#FFFFFF'
                                    : '#000000',
                              }}>
                              {item.size}
                            </Text>
                            {/* <Text>{item.quantity}</Text> */}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : dataProperties[0] && dataProperties[0].sizes ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                      Sizes:
                    </Text>
                    <FlatList
                      data={
                        dataProperties[0] && dataProperties[0].sizes
                          ? dataProperties[0].sizes.filter(
                              size => size.quantity > 0,
                            )
                          : []
                      }
                      // keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 35,
                              alignItems: 'center',
                              borderRadius: 10,
                              marginTop: 10,
                              marginBottom: 10,
                              justifyContent: 'center',
                              backgroundColor:
                                selectSize === item.size
                                  ? '#000000'
                                  : '#D9D9D9',
                            }}
                            onPress={() =>
                              handleOnpressSize(
                                item.size,
                                item._id,
                                item.quantity,
                              )
                            }>
                            <Text
                              style={{
                                width: '85%',
                                // marginRight: 10,
                                // marginLeft: 10,
                                fontSize: 16,
                                fontWeight: '600',
                                paddingLeft: '5%',
                                color:
                                  selectSize === item.size
                                    ? '#FFFFFF'
                                    : '#000000',
                              }}>
                              {item.size}
                            </Text>
                            {/* <Text>{item.quantity}</Text> */}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                Số lượng còn : {quantityRemain}
              </Text>
              <View
                style={{
                  width: 70,
                }}>
                <View style={styles.quantity}>
                  <TouchableOpacity onPress={incrementQuantity}>
                    <Icon name="add" size={24} color={'black'} />
                  </TouchableOpacity>
                  <Text>{quantity}</Text>
                  <TouchableOpacity onPress={decrementQuantity}>
                    <IconA name="minus" size={24} color={'black'} />
                  </TouchableOpacity>
                </View>
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
              onPress={handleToCart}>
              <Text style={{fontFamily: 'Inter-Bold', color: COLORS.white}}>
                xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>

        {/* BottomSheet Sale Now */}

        <BottomSheetModal
          ref={bottomSheetModalSaleRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChangesSale}>
          <View style={styles.bottomSheetContainer}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {selectedColor && selectedColor.image ? (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 0.5,
                    borderColor: COLORS.black,
                    borderRadius: 2,
                  }}>
                  <Image
                    style={styles.imageProductChild}
                    source={{
                      uri: selectedColor.image,
                    }}
                  />
                </View>
              ) : dataProperties[0] && dataProperties[0].image ? (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 0.5,
                    borderColor: COLORS.black,
                    borderRadius: 2,
                  }}>
                  <Image
                    style={styles.imageProductChild}
                    source={{
                      uri: dataProperties[0].image,
                    }}
                  />
                </View>
              ) : (
                <View>
                  {/* Placeholder or error handling when image is not available */}
                </View>
              )}

              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 25,
                  color: COLORS.black,
                  marginLeft: '2%',
                }}>
                {price}
              </Text>
              <TouchableOpacity
                style={{flex: 1, position: 'absolute', top: 0, right: 0}}
                onPress={handleClosePressSale}>
                <IconF name="x" size={24} color={'black'} />
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.borderColor,
                marginTop: 15,
                marginBottom: 20,
              }}>

              </View> */}
            <View style={styleCommon.sp1}>
              <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                Màu sắc
              </Text>
              <View>
                <FlatList
                  data={dataProperties}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => {
                    // console.log(item.colorId + 'pppppppppppppppppp');
                    return (
                      <TouchableOpacity
                        style={{
                          width:
                            selectedColor &&
                            selectedColor.colorId === item.colorId
                              ? 40
                              : 35,
                          height:
                            selectedColor &&
                            selectedColor.colorId === item.colorId
                              ? 40
                              : 35,
                          marginRight: 20,
                          marginTop: 10,
                          borderRadius: 10,
                          backgroundColor: `#${item.colorId}`,
                          // borderWidth: 1,
                          // borderColor:
                          //   selectedColor &&
                          //   selectedColor.colorId === item.colorId
                          //     ? COLORS.black
                          //     : `#${item.colorId}`,
                        }}
                        onPress={() => setSelectedColor(item)}>
                        {/* <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> */}
                      </TouchableOpacity>
                    );
                  }}
                  horizontal
                />

                {selectedColor ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                      Sizes:
                    </Text>
                    <FlatList
                      data={
                        selectedColor && selectedColor.sizes
                          ? selectedColor.sizes.filter(
                              size => size.quantity > 0,
                            )
                          : []
                      }
                      // keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 35,
                              alignItems: 'center',
                              borderRadius: 10,
                              marginTop: 10,
                              marginBottom: 10,
                              justifyContent: 'center',
                              backgroundColor:
                                selectSize === item.size
                                  ? '#000000'
                                  : '#D9D9D9',
                            }}
                            onPress={() =>
                              handleOnpressSize(
                                item.size,
                                item._id,
                                item.quantity,
                              )
                            }>
                            <Text
                              style={{
                                width: '85%',
                                // marginRight: 10,
                                // marginLeft: 10,
                                fontSize: 16,
                                fontWeight: '600',
                                paddingLeft: '5%',
                                color:
                                  selectSize === item.size
                                    ? '#FFFFFF'
                                    : '#000000',
                              }}>
                              {item.size}
                            </Text>
                            {/* <Text>{item.quantity}</Text> */}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : dataProperties[0] && dataProperties[0].sizes ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                      Sizes:
                    </Text>
                    <FlatList
                      data={
                        dataProperties[0] && dataProperties[0].sizes
                          ? dataProperties[0].sizes.filter(
                              size => size.quantity > 0,
                            )
                          : []
                      }
                      // keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 35,
                              alignItems: 'center',
                              borderRadius: 10,
                              marginTop: 10,
                              marginBottom: 10,
                              justifyContent: 'center',
                              backgroundColor:
                                selectSize === item.size
                                  ? '#000000'
                                  : '#D9D9D9',
                            }}
                            onPress={() =>
                              handleOnpressSize(
                                item.size,
                                item._id,
                                item.quantity,
                              )
                            }>
                            <Text
                              style={{
                                width: '85%',
                                // marginRight: 10,
                                // marginLeft: 10,
                                fontSize: 16,
                                fontWeight: '600',
                                paddingLeft: '5%',
                                color:
                                  selectSize === item.size
                                    ? '#FFFFFF'
                                    : '#000000',
                              }}>
                              {item.size}
                            </Text>
                            {/* <Text>{item.quantity}</Text> */}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text style={[styleCommon.h4, {color: COLORS.gray}]}>
                Số lượng còn : {quantityRemain}
              </Text>
              <View
                style={{
                  width: 70,
                }}>
                <View style={styles.quantity}>
                  <TouchableOpacity onPress={incrementQuantity}>
                    <Icon name="add" size={24} color={'black'} />
                  </TouchableOpacity>
                  <Text>{quantity}</Text>
                  <TouchableOpacity onPress={decrementQuantity}>
                    <IconA name="minus" size={24} color={'black'} />
                  </TouchableOpacity>
                </View>
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
              onPress={handleToSale}>
              <Text style={{fontFamily: 'Inter-Bold', color: COLORS.white}}>
                xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default DetailProductScreen;
