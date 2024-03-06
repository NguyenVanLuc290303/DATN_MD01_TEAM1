import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from "react-native";



const DeliveryScreen = ({ navigation }) => {
    const [dataDelivery, setdataDelivery] = useState([
        {
            UserId: 1,
            name: 'Vũ Tiến Dũng',
            city: 'Nguyên Xá, Bắc Từ Liêm, Hà Nội',
            street: 'Minh Khai',
            phone: '0989938050',
        },
        {
            UserId: 1,
            name: 'Vũ Tiến Dũng',
            city: 'Trung Hòa, Cầu Giấy, Hà Nội',
            street: 'Hoàng Minh Giám',
            phone: '0989938050',
        },
        {
            UserId: 1,
            name: 'Vũ Tiến Dũng',
            city: 'Dịch Vọng, Cầu Giấy, Hà Nội',
            street: 'Hồ Tùng Mậu',
            phone: '0989938050',
        }
    ])
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                backgroundColor: '#FFFFFF'
            }}>
                <TouchableOpacity>
                    <Image style={{ width: 22, height: 22 }} source={require('@/images/back.png')} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                    <Text style={{ fontSize: 22, color: 'black' }}>Chọn địa chỉ giao hàng</Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                height: 10,
                backgroundColor: '#E5E5E5',
                shadowColor: 'black', // Màu sắc của bóng
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25, // Độ đậm của bóng
                shadowRadius: 3, // Bán kính của bóng
                elevation: 5, // Chỉ định độ nổi của view (chỉ áp dụng cho Android)
            }}></View>
            <View style={{ backgroundColor: '#FFFFFF', paddingBottom: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#CB2027' }} onPress={() => navigation.navigate('AddDeliveryScreen')}>Thêm địa chỉ mới</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <FlatList data={dataDelivery} renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginTop: 10, }}>
                                <View style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: '#E5E5E5'
                                }}></View>
                                <View style={{ width: '100%', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                                    <TouchableOpacity style={{ flexDirection: 'column', flex: 1, }}>
                                        <Text style={{ fontSize: 15, color: 'black' }}>{item.name}</Text>
                                        <Text>{item.phone}</Text>
                                        <Text>{item.street}</Text>
                                        <Text>{item.city}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#FF0000' }}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },

})


export default DeliveryScreen;