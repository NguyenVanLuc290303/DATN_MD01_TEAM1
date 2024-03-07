import React,{useState} from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


function OrderScreen({ navigation}) {

    const [OderArray, setOderArray] = useState([
        {
            id: 1,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '659.000',
            Status: 'Đang giao'

        },
        {
            id: 2,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '399.000',
            Status: 'Đã nhận'

        },
        {
            id: 3,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '450.000',
            Status: 'Đang giao'

        },
        {
            id: 4,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '339.000',
            Status: 'Đã nhận'

        },
        {
            id: 5,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '199.000',
            Status: 'Đang giao'

        },
        {
            id: 6,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '769.000',
            Status: 'Đã nhận'

        },
        {
            id: 7,
            Image: '',
            namePr: 'Áo khoác vest sang trọng thời trang nam',
            ColorCode: 'xanh',
            Size: 'S',
            Price: '599.000',
            Status: 'Đang giao'

        },


    ]);


    const renderItem = ({ item, index }) => (

        <View style={styles.item}>
            <View style={styles.ViewImg}>
                <View style={styles.ImgItem}>

                </View>



                <View style={styles.Orders}>


                    <Text style={styles.textNamePr}>{item.namePr}</Text>

                    <View style={styles.viewColorSize}>
                        <Text style={styles.textColor}>Màu {item.ColorCode},</Text>
                        <Text style={styles.textSize}>Size {item.Size}</Text>
                    </View>

                 
                        <Text style={styles.textPriceNew}>{item.Price} <Text style={styles.d}> đ</Text> </Text>
                        <Text style={styles.textPriceOld}>799.000 đ</Text>
                 
                    <View style={styles.viewStatus}>
                        <Text style={styles.textNone}>Trạng thái :</Text>
                        <Text style={styles.textStatus}>{item.Status}</Text>
                    </View>

                </View>



            </View>

        </View>
    );


    return (


        <View style={styles.container}>

            <View style={styles.Header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                </TouchableOpacity>
                <View style={styles.viewText}>
                    <Text style={styles.textHead}> ĐƠN HÀNG </Text>
                    <Text style={styles.textHeadAddress}>Địa chỉ người dùng  </Text>
                </View>

            </View>


            <FlatList
                data={OderArray}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                nestedScrollEnabled={true}
                style={{ paddingBottom: 100 }}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    ImgItem: {
        width: '24%',
        height: 100,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'red',


    },

    Header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    ViewImg:{
        flexDirection: 'row',
    },
    viewText: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    textHead: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
    },

    textHeadAddress: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 13,
        fontWeight: '300',

    },
    item: {
        width: "100%",
        height: 180,
        borderBottomWidth: 10,
        marginTop: 8,
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        borderColor: '#F2F2F2',

    },

    Orders: { 
        width: '76%',
        padding: 10,
       
    },
    viewColorSize: {
        marginTop:5,
        paddingLeft: 5,
        flexDirection: 'row',
        backgroundColor: '#EFEFEF',
        width: 120,
    },
    viewStatus: {
       
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
       
    },


    textNamePr: {
        fontSize: 19,
        fontWeight: '500',
        color: 'black',
        flexWrap: 'wrap',


    },
    textColor: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',

    },
    textSize: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',

    },
    textPriceNew: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginTop:8,
    },
    d:{
textDecorationLine:'underline'
    },

    textPriceOld: {
        fontSize: 14,
        textDecorationLine: 'line-through',
    },

    textNone: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
    textStatus: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'red',
        marginRight:10,


    },

});

export default OrderScreen;
