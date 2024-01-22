import { useEffect } from "react";
import { StyleSheet, Text, Vibration, View } from "react-native";

const FisrtScreen = ({navigation}) =>{

    useEffect(() =>{
        const time = setTimeout(() => {
            navigation.navigate('LoginScreen');
        }, 2000);

        return clearTimeout(time);
    },[navigation])
    return(
        <View style={styles.container}>
            <Text>
                ScreenFisrt
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFFFFF'
    }
})

export default FisrtScreen;