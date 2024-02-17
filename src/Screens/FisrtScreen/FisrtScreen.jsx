import { useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FisrtScreen = ({navigation}) =>{

    useEffect(() =>{
        const timer = setTimeout(() => {
          navigation.replace('Login')
        }, 2000);

        return () => clearTimeout(timer);
    },[navigation]);

    // const handlerLogin = () =>{
    //     navigation.navigate('DetailProductScreen');
    // }
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                ScreenFisrt
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFFFFF',
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default FisrtScreen;
