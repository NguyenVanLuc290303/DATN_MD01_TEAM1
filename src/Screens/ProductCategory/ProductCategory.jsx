import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderTitle from "../../components/atoms/HeaderTitle/HeaderTitle";
import Icon from "react-native-vector-icons/Ionicons"
import COLORS from "../../constants/colors";
import { API_CATEGORY_PRODUCT } from "../../config/api-consts";
import { API_PRODUCT } from "../../config/api-consts";
    // const data = [
    //     {
    //         "_id": {
    //           "$oid": "65bd004238bc7fd0c2198f96"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc7fd0c2198f97"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc7fd0c2198f98"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc7fd0c2198f99"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc8fd0c2198f99"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc9fd0c2198f99"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc9fd0c2198f99"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       },
    //       {
    //         "_id": {
    //           "$oid": "65bd004238bc9fd0c2198f99"
    //         },
    //         "name": "ẻgergher",
    //         "image": "https://via.placeholder.com/150/771796",
    //         "mota": "sề",
    //         "price": 43545,
    //         "loai": "Mới",
    //         "timeCreate": "2024-02-02 21:46:26",
    //         "quantitySold": 0,
    //         "__v": 0
    //       }

    // ];

    // const renderItem = React.useCallback(({item}) =>(
    //     <View style={styles.itemProduct}>
    //         <Image source={{ uri : item.image}} style={{ width : 80 , height : 60}}/>
    //         <HeaderTitle name={item.name}/>
    //         <Text>{item.price}</Text>
    //     </View>
    // ),[])

    



const ProductCategory =  ({navigation, route}) => {
  
  const [dataPr,setDataPr] = React.useState([]);
  const {name} = route.params;
  // console.log(name);

    React.useEffect(() =>{

      var myHeaders = new Headers();
      myHeaders.append("Cookie", "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw");

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch(API_PRODUCT, requestOptions)
      .then(response => response.json())
      .then(result => filterDataByName(result))
      .catch(error => console.log('error', error));

  },[]);

  const filterDataByName = (data) => {
    const filtered = data.filter(item => item.loai === name);
    setDataPr(filtered);
    // console.log(filtered);
  };

    return(
        <View style ={styles.container}>
            <View style={{ flexDirection : 'row', 
                           alignItems : 'center'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={24}/>  
                </TouchableOpacity>
                <HeaderTitle>{name}</HeaderTitle>              
            </View>
            <View>
            <FlatList
                data={dataPr}
                numColumns={2}
                contentContainerStyle={{width: '100%'}}
                // keyExtractor={item => item._id}     
                renderItem={({item}) =>{
                    return(
                        <TouchableOpacity style={styles.itemProduct} onPress={() => navigation.navigate('DetailProductScreen')}>
                            <Image source={{ uri : item.image}} style={{ width : '70%' , height : '70%'}}/>
                            <HeaderTitle>{item.name}</HeaderTitle>
                            <Text>{item.price}</Text>
                        </TouchableOpacity>   
                    )
                }}    
            />
            </View>
           
        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        // flex : 1, 
        backgroundColor : '#FFFFFF'
    },
    itemProduct:{
        width : "46%",
        height : 220,
        borderRadius : 8,
        borderWidth : 1,
        borderColor : COLORS.borderColor,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 20,
        marginLeft : "2.5%"
    }
})

export default ProductCategory;