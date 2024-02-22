import React, { Children, useCallback } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/colors";

const ButtonPrimary = () =>{
    
    const handerPress = React.useCallback({

    },[])

    return(
        <>
            <TouchableOpacity
                onPress={handerPress}
                style={[styles.button]}
            >
                <Text
                style={[styles.text]}
                >{Children}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button :{
        width : '80%',
        height : 54,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLORS.black,
        borderRadius : 50
    },
    text:{
        fontSize : 16,
        fontWeight : '600'
    }
});

export default ButtonPrimary;


