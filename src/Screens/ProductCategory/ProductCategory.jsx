import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderTitle from "../../components/atoms/HeaderTitle/HeaderTitle";
import Icon from "react-native-vector-icons/Ionicons"
import COLORS from "../../constants/colors";
    const data = [
        {
            "_id": {
              "$oid": "65bd004238bc7fd0c2198f96"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc7fd0c2198f97"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc7fd0c2198f98"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc7fd0c2198f99"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc8fd0c2198f99"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc9fd0c2198f99"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc9fd0c2198f99"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          },
          {
            "_id": {
              "$oid": "65bd004238bc9fd0c2198f99"
            },
            "name": "ẻgergher",
            "image": "https://via.placeholder.com/150/771796",
            "mota": "sề",
            "price": 43545,
            "loai": "Mới",
            "timeCreate": "2024-02-02 21:46:26",
            "quantitySold": 0,
            "__v": 0
          }

    ];

    // const renderItem = React.useCallback(({item}) =>(
    //     <View style={styles.itemProduct}>
    //         <Image source={{ uri : item.image}} style={{ width : 80 , height : 60}}/>
    //         <HeaderTitle name={item.name}/>
    //         <Text>{item.price}</Text>
    //     </View>
    // ),[])

const ProductCategory =  ({navigation}) => {
    return(
        <View style ={styles.container}>
            <View style={{ flexDirection : 'row', 
                           alignItems : 'center'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={24}/>  
                </TouchableOpacity>
                <HeaderTitle>Jeans</HeaderTitle>              
            </View>
            <View>
            <FlatList
                data={data}
                numColumns={2}
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