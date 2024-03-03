import React, { useState, useEffect } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_GET_TO_LOVE } from "../../config/api-consts";
import { User } from "../../hooks/useContext";

const Love = ({ navigation }) => {
    const [dataLove, setDataLove] = useState([]);
    const { userData } = User(); 

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_GET_TO_LOVE}/${userData?._id}`, {
                headers: {
                    Cookie: "connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw"
                }
            });
            setDataLove(response.data);
            console.log("Dữ liệu trả về từ API:", response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm yêu thích:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation, userData]); 
    
    console.log("Mảng dataLove:", dataLove);

    return (
        <View style={styles.container}>
            <View style={styles.viewTextHeadTitle}>
                <Text style={styles.textHeadTitle}>Love Clothes</Text>
            </View>
            <ScrollView style={styles.viewListLove}>
                {dataLove.data && dataLove.data.map((item) => (
                    <TouchableOpacity key={item._id} onPress={() => navigation.navigate('DetailProductScreen', { /* pass item data to detail screen */ })}>
                        <View style={styles.viewItemLove}>
                            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    viewTextHeadTitle: {
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHeadTitle: {
        fontSize: 23,
        fontFamily: "Inter-ExtraBold"
    },
    viewListLove: {
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    viewItemLove: {
        height: 125,
        width: "100%",
        backgroundColor: '#F1F4FB',
        marginTop: 20,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

export default Love;
