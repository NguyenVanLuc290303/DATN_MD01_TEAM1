import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const RegisterScreen = ({navigation}) =>{

    const [email ,setEmail] = useState();
    const [name ,setName] = useState();
    const [password ,setPassword] = useState();
    const [address,setAddress] = useState();

    const handerOnlickCreateAccount = () =>{
        navigation.navigate('LoginScreen');
    }
    return(
        <View>
            <View style={styles.header}>
                <Image style={styles.imageTitle}/>
            </View>
            <View style={styles.body}>
                <View style={styles.textTitle}>
                    <Text>Create Account</Text>
                </View>
                <View style={styles.viewTextInput}>
                    <TextInput placeholder="Enter your email" onChangeText={(Text) => setEmail(Text)}/>
                </View>
                <View>
                    <TextInput placeholder="Enter your name" onChangeText={(Text) => setName(Text)}/>
                </View>
                <View>
                    <TextInput placeholder="Enter your password" onChangeText={(Text) => setPassword(Text)}/>
                </View>
                <View>
                    <TextInput placeholder="Enter your address" onChangeText={(Text) => setAddress(Text)}/>
                </View>
                <View>
                    <TouchableOpacity onPress={handerOnlickCreateAccount}>
                        <Text>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1, 
        backgroundColor : '#FFFFFF'
    },
    imageTitle:{
        width : 330,
        height : 300
    }
})

export default RegisterScreen;