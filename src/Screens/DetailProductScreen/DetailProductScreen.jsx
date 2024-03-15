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

const DetailProductScreen = ({navigation, route}) => {
  const {_id, name, price, quantitySold, image, category} = route.params;

  const {userData} = User();

  const {dataCart, addItemToCart} = Cart();

  console.log(dataCart, 'datacartlength');

  const idUser = userData._id;

  const [dataProperties, setDaProperties] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);

  // data select

  const [selectSize, setSelectSize] = useState();

  const [idPropotiesS, setIdPropoties] = useState();

  const [quantity, setQuantity] = useState(1); // Số lượng mặc định là 1

  // Hàm xử lý cộng số lượng
  const incrementQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  });

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

  useEffect(() => {
    // checkProductCart();
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

  console.log(animationScale, "LLLLLLLLLLLL")
  const animationPosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const [showImageAnimation , setShowImageAnimation] = useState(false);

  const handleToCart = () => {

  setShowImageAnimation(true);
 const shrinkAnimation = Animated.timing(animationScale, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
      
    });

    const parabolicAnimation = Animated.timing(animationPosition, {
      toValue: {x: 160, y: -190},
      easing : Easing.bezier(0.25, 0.1 , 0.25 , 1),
      duration: 1000,
      useNativeDriver: false,
    });

    Animated.parallel([shrinkAnimation, parabolicAnimation]).start(() => {
      // Sau khi hoàn thành animation, đặt lại giá trị ban đầu
      animationScale.setValue(1);
      animationPosition.setValue({ x: 0, y: 0 });
      setShowImageAnimation(false);
    });
    
   

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
        PropertiesId: idPropotiesS,
        Image: selectedColor.image,
      }),
      redirect: 'follow',
    };

    try {
      fetch(
        `${API_PRODUCT_TO_CART}/${_id}/${selectedColor.colorId}/${selectSize}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => addItemToCart(result));
      handleClosePress();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToSale = () => {
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
  };

  const handleOnpressSize = (size, id) => {
    // setIsSelectedSize(size);
    setSelectSize(size);
    setIdPropoties(id);
  };

  console.log('renderlai');

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={32} color={COLORS.black} />
          </TouchableOpacity>
          <View
            style={{
              width: '70%',
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.gray,
            }}>
            <IconF name="search" size={28} color={COLORS.gray} />
            <TextInput placeholder="Tìm kiếm" />
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Image source={require('@/icons/png/local_mall.png')} />
        </TouchableOpacity> */}
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
        <View style={styles.ViewImageProduct}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.imageProduct}
          />
          <Animated.View
           style={[
            
            { transform: [
              { translateX: animationPosition.x },
              { translateY: animationPosition.y },
              { scale: animationScale }
            ]
              ,
              width: 100,
              height: 100,
              position: 'absolute',
              borderRadius: 50,
              zIndex : showImageAnimation ? 2 : -2 ,
              backgroundColor : COLORS.white
          }
          ]}
          >
            <Image style={{ width : 100 , height : 100 , borderRadius : 50}} source={{uri: image}} />
          </Animated.View>
        </View>
        <View style={styles.infoProduct}>
          <Text style={[styleCommon.h2, {color: COLORS.black}]}>{price}</Text>
          <View>
            <Text style={[styleCommon.h2, {color: COLORS.black}]}>{name}</Text>
          </View>
          <View>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              Quần jeans ống đẹp , chất liệu mềm mại , thích hợp mặc cả năm
            </Text>
          </View>
          {/* <AddToCart navigation={navigation}/> */}
        </View>
        <View style={styles.star}>
          <Icon name="star" size={24} color={'yellow'} />
          <Text>4.8/5</Text>
          <Text> Đã bán{quantitySold}</Text>
        </View>
        <View style={styles.description}></View>
        <View style={styles.evaluation}></View>

        {/* <View style={styles.footer}>
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
            onPress={handlePresentModalPress}
            style={styles.btnAddToCard}>
            <Text
              style={{
                width: '90%',
                color: COLORS.red,
                fontSize: 18,
                fontFamily: 'Inter-Bold',
              }}>
              Thêm vào giỏ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSaleNow}
            onPress={handlePresentModalPressSale}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontFamily: 'Inter-Bold',
              }}>
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View> */}

      <View
        style={[
          styles.bottomSheet,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
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
      </View>


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
                    console.log(item.colorId + 'pppppppppppppppppp');
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
                          borderRadius: 5,
                          backgroundColor: `#${item.colorId}`,
                          borderWidth: 1,
                          borderColor:
                            selectedColor &&
                            selectedColor.colorId === item.colorId
                              ? COLORS.black
                              : `#${item.colorId}`,
                        }}
                        onPress={() => setSelectedColor(item)}>
                        {/* <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> */}
                      </TouchableOpacity>
                    );
                  }}
                  horizontal
                />

                {selectedColor && (
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
                              width: '50%',
                              height: 30,
                              borderWidth: 1.5,
                              borderColor:
                                selectSize === item.size
                                  ? COLORS.red
                                  : COLORS.gray,
                              alignItems: 'center',
                              borderRadius: 3,
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                            onPress={() =>
                              handleOnpressSize(item.size, item._id)
                            }>
                            <Text
                              style={{
                                width: '85%',
                                // marginRight: 10,
                                // marginLeft: 10,
                                fontSize: 16,
                                fontWeight: '600',
                                paddingLeft: '5%',
                              }}>
                              {item.size}
                            </Text>
                            <Text>{item.quantity}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
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
                Số lượng
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
                    console.log(item.colorId + 'pppppppppppppppppp');
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
                          borderRadius: 5,
                          backgroundColor: `#${item.colorId}`,
                          borderWidth: 1,
                          borderColor:
                            selectedColor &&
                            selectedColor.colorId === item.colorId
                              ? COLORS.black
                              : `#${item.colorId}`,
                        }}
                        onPress={() => setSelectedColor(item)}>
                        {/* <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> */}
                      </TouchableOpacity>
                    );
                  }}
                  horizontal
                />

                {selectedColor && (
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
                              width: '50%',
                              height: 30,
                              borderWidth: 1.5,
                              borderColor:
                                selectSize === item.size
                                  ? COLORS.red
                                  : COLORS.gray,
                              alignItems: 'center',
                              borderRadius: 3,
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                            onPress={() =>
                              handleOnpressSize(item.size, item._id)
                            }>
                            <Text
                              style={{
                                width: '85%',
                                // marginRight: 10,
                                // marginLeft: 10,
                                fontSize: 16,
                                fontWeight: '600',
                                paddingLeft: '5%',
                              }}>
                              {item.size}
                            </Text>
                            <Text>{item.quantity}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
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
                Số lượng
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    elevation: 10,
    justifyContent: 'center', // Thêm dòng này để đẩy bottom sheet xuống dưới
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

  header: {
    height: '6%',
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ViewImageProduct: {
    width: '100%',
    height: '40%',
    // borderBottomEndRadius: 30,
    // borderBottomStartRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProduct: {
    width: '100%',
    height: '100%',
    marginTop: '5%',
  },
  infoProduct: {
    width: '100%',
    marginTop: 10,
    paddingLeft: '2%',
  },
  quantity: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnAddToCard: {
    width: '35%',
    height: 50,
    borderWidth: 1.2,
    borderColor: COLORS.red,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: "#FFF",
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation : 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageProductChild: {
    width: 100,
    height: 100,
    borderWidth: 0.5,
    borderColor: COLORS.black,
    borderRadius: 2,
  },
  btnSaleNow: {
    width: '35%',
    height: 50,
    backgroundColor: COLORS.red,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContainer: {
    flex: 1,
    padding: '3%',
  },
  evaluation: {},
  star: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  description: {},
  animatedImage: {
   
  },
});

export default DetailProductScreen;
