import { Image, StyleSheet, View ,SafeAreaView, ScrollView,Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconA from "react-native-vector-icons/AntDesign";

import AddToCart from "../../components/morecules/AddToCard/AddToCard";
import ColorItem from "../../components/morecules/ColorItem/ColorItem";
import SizeItem from "../../components/morecules/SizeItem/SizeItem";
import { styleCommon } from "../../theme/styles/CommomStyle";
import COLORS from "../../constants/colors";
    let data ={
        color : [ "red" , "blue"],
        size : ["XL" , "L" , "S"],
    }

const DetailProductScreen = ({navigation, route}) =>{

    const { _id, 
            name , 
            price , 
            quantitySold, 
            image, 
            category,
         } = route.params;

    console.log(name);
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.ViewImageProduct}>
            <View style={{ padding : 10}}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={32} />
                </TouchableOpacity>
            </View>
            <Image source={{ uri : image}} style={styles.imageProduct}/>
        </View>
    <View style= {{ padding : '2%'}}>
        <View>
            <Text style={styleCommon.h2}>{name}</Text>
        </View>
        <View style={styles.colorProduct}>
            <Text style={styleCommon.h2}>Color</Text>
                <ScrollView
                    horizontal
                >
                    {data.color.map((item) =>(
                        <ColorItem 
                            color={item}
                        />
                    ))}
                </ScrollView>
        </View>
        <View style={styles.sizeProduct}>
            <Text style={styleCommon.h2}>Size</Text>
                <ScrollView
                    horizontal
                >
                    {data.size.map((item) =>(
                        <SizeItem size={item}/>
                    ))}
                </ScrollView>
        </View>
        <View >
            <Text style={styleCommon.h2}>Quantity</Text>
            <View style={{ width : "100%", flexDirection : 'row' , justifyContent : 'space-between'}}>
                <View style={styles.quantity}>
                    <TouchableOpacity>
                        <Icon name='add' size={28} color={'black'} />
                    </TouchableOpacity>
                        <Text>1</Text>
                    <TouchableOpacity>
                        <IconA name='minus' size={28} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{price}</Text>
            </View>

        </View>
        <AddToCart navigation={navigation}/>
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
    },
    quantity :{
        width : 90,
        height : 50,
        flexDirection : 'row',
        borderRadius : 15,
        borderWidth : 1,
        borderColor : COLORS.gray,
        justifyContent : 'space-between',
        alignItems : 'center',
        margin : 10
    }
})

export default DetailProductScreen;