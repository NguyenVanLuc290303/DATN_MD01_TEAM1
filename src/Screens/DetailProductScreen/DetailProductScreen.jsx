import { Image, StyleSheet, View ,SafeAreaView, ScrollView,Text} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

    let data ={
        id : 1,
        name : "jeans",
        image :"https://via.placeholder.com/150/771796",
        color : [ "red" , "blue"],
        size : ["XL" , "L" , "S"],
        price : 5000,
        quantity : 5,
    }

const DetailProductScreen = () =>{
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.ViewImageProduct}>
            <View style={{ padding : 10}}>
                <Icon name="chevron-back" size={40} color={"#000000"}/>
            </View>
            <Image source={{ uri : data.image}} style={styles.imageProduct}/>
        </View>
        <View>
            <Text style={styles.textNameProduct}></Text>
        </View>
        <View style={styles.colorProduct}>
            <Text>Color</Text>
            <View style={{ width : "80%" ,  backgroundColor : 'red'}}>
                <ScrollView
                    horizontal
                >
                    
                </ScrollView>
            </View>
        </View>
        <View style={styles.sizeProduct}>
            <Text>Size</Text>
            <View>
                <ScrollView
                    horizontal
                >

                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container :{
        flex : 1,
    },
    ViewImageProduct :{
        width : "100%",
        height : "40%",
        flexDirection : 'row',
        backgroundColor : '#DEDEDE',
        borderBottomEndRadius : 30,
        borderBottomStartRadius : 30
    },
    imageProduct :{
        width : '75%',
        height : '90%',
        backgroundColor : 'red',
        marginTop : '5%'
    }
})

export default DetailProductScreen;