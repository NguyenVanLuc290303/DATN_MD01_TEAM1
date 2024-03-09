import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from "react-native";

const VoucherScreen = () => {
    const [dataVoucher, setDataVoucher] = useState([
        {
            name: 'Giảm giá 10K',
            content: 'Shop tặng voucher giảm 10K cho tất cả các đơn hàng',
            image: '@/images/logoAPP_MD01_png.png',
            price: 10000,
            fromDate: '01/03/2024',
            toDate: '08/03/2024'
        },
        {
            name: 'Giảm giá 10K',
            content: 'Shop tặng voucher giảm 10K cho tất cả các đơn hàng',
            image: '@/images/logoAPP_MD01_png.png',
            price: 10000,
            fromDate: '01/03/2024',
            toDate: '08/03/2024'
        },
        {
            name: 'Giảm giá 10K',
            content: 'Shop tặng voucher giảm 10K cho tất cả các đơn hàng',
            image: '@/images/logoAPP_MD01_png.png',
            price: 10000,
            fromDate: '01/03/2024',
            toDate: '08/03/2024'
        }
    ])

    const HandleVoucher = () => {
        console.log(' click HandleVoucher !!!!')
    }
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
                    <Text style={{ fontSize: 22, color: 'black' }}>Chọn Voucher</Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                height: 1,
                backgroundColor: 'grey'
            }}></View>
            <View>
                <FlatList data={dataVoucher} renderItem={({ item, index }) => {
                    return (
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 10,
                                backgroundColor: 'white',
                                padding: 10
                            }}>
                                <View style={{ borderBlockColor: 'black' }}>
                                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={require('@/images/logoAPP_MD01_png.png')} />
                                </View>


                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 22, color: 'black' }}>{item.name}</Text>
                                    <Text style={{ color: 'grey' }}>{item.content}</Text>
                                    <Text style={{ color: 'black' }}>BĐ: {item.fromDate}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'black' }}>HSD: {item.toDate}</Text>
                                        <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={HandleVoucher}>
                                            <Text style={{ color: '#FF2271', fontSize: 20 }}> Dùng ngay</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}
                />
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

export default VoucherScreen;