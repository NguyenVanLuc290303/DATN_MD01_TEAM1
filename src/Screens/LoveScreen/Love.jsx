import { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";


const Love =  () => {

    const [dataLove , setDataLove] = useState([
        {
            id : 0,
            name : 'Jeans',
            image : "https://via.placeholder.com/150/771796",
            price : 20,
        },
        {
            id : 1,
            name : 'clothes',
            image :"https://via.placeholder.com/150/771796",
            price : 40
        },
        {
            id : 3,
            name : 'seawter',
            image :"https://via.placeholder.com/150/771796",
            price : 50
        },
        {
            id : 5 ,
            name : "shirt",
            image : "https://via.placeholder.com/150/771796",
            price : 60
        },
        {
            id : 7 ,
            name : "shirt",
            image : "https://via.placeholder.com/150/771796",
            price : 60
        },
        {
            id : 8 ,
            name : "shirt",
            image : "https://via.placeholder.com/150/771796",
            price : 60
        }
    ])

    return(
        <View style={styles.container}>
            <View style={styles.viewTextHeadTitle}>
                <Text style={styles.textHeadTitle}>Love Clothes</Text>
            </View>
                <ScrollView style={styles.viewListLove}>
                    {
                        dataLove.map((item) =>
                            (
                                <View style={styles.viewItemLove} key={item.id}>
                                    <Image source={{ uri : item.image}} style={{ width : 100 , height : 100}}/>
                                    <Text>{item.name}</Text>
                                    <Text>{item.price}</Text>
                                </View>
                            )
                        )
                    }
                </ScrollView>
            </View>

    )
}


const styles = StyleSheet.create({
    container :{
        flex : 1, 
        backgroundColor : '#FFFFFF',
    },

    containerListView :{
        width : "100%",
        justifyContent : 'center',
        alignItems : 'center'
    },
    viewTextHeadTitle :{
        width : "100%",
        height : 50,
        alignItems : 'center',
        justifyContent : 'center'
    },
    textHeadTitle :{
        fontSize : 23,
        fontFamily : "Inter-ExtraBold"
    },
    viewListLove :{
        paddingLeft : "5%",
        paddingRight : "5%"
    },
    viewItemLove :{
        height : 125,
        width : "100%",
        backgroundColor : '#F1F4FB',
        marginTop : 20,
        borderRadius : 7,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
    }
})

export default Love;