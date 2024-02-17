import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import  IconI from "react-native-vector-icons/Ionicons";


const Home =  ({navigation}) => {

    const [dataCategory ,setDataCategory ] = useState([
        {
            name : "Jeans" , 
            image : 'https://via.placeholder.com/150/771796',
        },
        {
            name : "Jeans" , 
            image : "https://via.placeholder.com/150/771796",
        },
        {
            name : "Jeans" , 
            image : "https://via.placeholder.com/150/771796",
        },
        {
            name : "Jeans" , 
            image : "https://via.placeholder.com/150/771796",
        },
        {
            name : "Jeans" , 
            image : "https://via.placeholder.com/150/771796",
        },
        {
            name : "Jeans" , 
            image : "https://via.placeholder.com/150/771796",
        },
    ])

    const [dataProduct , setProduct] = useState([
        {
            id_Product : 1,
            id_Category : 1,
            dicrible : "kkkkk",
            name : "Holide Pink",
            quantity : 2,
            quantity_sold : 2,
            price : 40.00,
            state : false,
            image :"https://via.placeholder.com/150/771796",
        },
        {
            id_Product : 1,
            id_Category : 1,
            dicrible : "kkkkk",
            name : "Holide Pink",
            quantity : 2,
            quantity_sold : 2,
            price : 40.00,
            state : false,
            image :"https://via.placeholder.com/150/771796",
        },
        {
            id_Product : 1,
            id_Category : 1,
            dicrible : "kkkkk",
            name : "Holide Pink",
            quantity : 2,
            quantity_sold : 2,
            price : 40.00,
            state : false,
            image :"https://via.placeholder.com/150/771796",
        },
        {
            id_Product : 1,
            id_Category : 1,
            dicrible : "kkkkk",
            name : "Holide Pink",
            quantity : 2,
            quantity_sold : 2,
            price : 40.00,
            state : false,
            image :"https://via.placeholder.com/150/771796",
        },
        {
            id_Product : 1,
            id_Category : 1,
            dicrible : "kkkkk",
            name : "Holide Pink",
            quantity : 2,
            quantity_sold : 2,
            price : 40.00,
            state : false,
            image :"https://via.placeholder.com/150/771796",
        },
        {
            id_Product : 1,
            id_Category : 1,
            dicrible : "kkkkk",
            name : "Holide Pink",
            quantity : 2,
            quantity_sold : 2,
            price : 40.00,
            state : false,
            image :"https://via.placeholder.com/150/771796",
        },
    ]);


    const handlerItemProducts = () =>{
        navigation.navigate('DetailProductScreen')
    }

    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <View>
                    <Image style={styles.imageTitle} source={require('@/images/logoAPP_MD01_png.png')}/>
                </View>
                <TouchableOpacity>
                        <Image source={require('@/icons/png/local_mall.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft : 10}}>
                <Text style={styles.textTitle}>Men Clothes Store</Text>
            </View>
            <View style={styles.viewSearch}>
                <View style={styles.search}>
                    <View>
                        <TextInput style={styles.textInputSearch} placeholder="Search" />
                    </View>
                    <View>
                        <IconI name="search-outline" size={30} color={"gray"}  />
                    </View>
                </View>
            </View>
            <View style={{ paddingLeft : 10 , marginTop : 10}}>
                <Text style={styles.textHead}>Category</Text>
            </View>
            <View style={{ marginTop : 10}}>
                <FlatList horizontal data={dataCategory} renderItem={({item}) =>{
                    return(
                        <View style={styles.viewItem}>
                            <Text>{item.name}</Text>
                            <Image style={{ width : 40 , height : 40}} source={{ uri : item.image}}/>
                        </View>
                    )
                }}/>
            </View>
            <View style={{ paddingLeft : 10 , marginTop : 10}}>
                <Text style={styles.textHead}>Recommend</Text>
            </View>
            
                <FlatList numColumns={2} data={dataProduct} renderItem={({item}) =>{
                    return(
                        <View style={styles.viewItemProducts}>
                            <TouchableOpacity style={{ 
                                        alignItems : 'center',
                                        justifyContent :"center",
                                        paddingTop : "5%"
                            }}  onPress={handlerItemProducts}>
                                <Image source={{ uri : item.image}} style={{ width : 90 , height : 131}}/>
                                <Text>{item.name}</Text>
                                <Text>{item.price} USD</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}/>
            

        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        flex : 1, 
        backgroundColor : '#FFFFFF'
    },
    header :{
        width : '100%',
        justifyContent : 'space-between',
        flexDirection : 'row',
        padding : 15,
        paddingLeft : 10
    },
    imageTitle :{
        width  : 40 ,
        height : 40,
        borderRadius : 20,
        backgroundColor : '#f5f2f2'
    },
    textTitle:{
        fontSize : 25,
        fontFamily : 'Inter-Bold',
    },
    textHead :{
        fontSize : 16,
        fontFamily : "Inter-Bold"
    },
    viewSearch:{
        width : "100%",
        alignItems :"center", 
        justifyContent : "center",
        marginTop : 10,
    },
    search :{
        width : "80%",
        height : 55,
        flexDirection : "row",
        backgroundColor : '#F5F5F5',
        borderRadius: 10,
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingLeft : 10,
        paddingRight : 10,
        borderWidth : 1,
        borderColor : "#DEDEDE"

    }
    ,
    textInputSearch :{
       

    },
    viewItem :{
        width : 75,
        height : 105,
        alignItems : "center",
        borderRadius : 15,
        borderWidth : 1,
        justifyContent : 'space-around',
        marginLeft : 20,
        borderColor : "#DEDEDE"
    },
    viewItemProducts:{
        width : "43%",
        height : 210,
        borderWidth : 1,
        borderColor : "#DEDEDE",
        borderRadius : 10,
        marginTop : 15,
        marginLeft : "5%"
    }
})

export default Home;