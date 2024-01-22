import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from "react-native";


const LoginScreen = ({navigation}) =>{

    const [email , setEmail] = useState();
    const [password , setPassWord] = useState();

    const handerOnlickLogin = () =>{
        // event login ( check account is realldy exists ) else if { check account is exitsted , however false password or email  } else{ true change Screen }

        navigation.navigate('BottomNavigation');         // change Screen Onboarding if (user.download === fisrt) else { change screen bottomNavigation }
    }


    const hanlderOnlickSignup = () =>{
        navigation.navigate('RegisterScreen');
    }
    return(
        <View>
            <Image style={styles.imageTitle}/>
            <View style={styles.body}>
                <Text>Login</Text>
                <Text>please sign in to continus</Text>
                <View>
                    <TextInput placeholder="Email" onChangeText={(Text) => setEmail(Text)}/>
                </View>
                <View>
                    <TextInput placeholder="Password" onChangeText={(Text) => setPassWord(Text)}/>
                </View>
                <View>
                    <Text>Forget password</Text>
                </View>
                <View>
                    <TouchableOpacity style={btnLogin} onPress={handerOnlickLogin}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Don't have an account</Text>
                    <TouchableOpacity onPress={hanlderOnlickSignup}>
                        <Text>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1 , 
        backgroundColor : '#FFFFFF'
    },
    imageTitle :{
        width : 300,
        height : 300
    },
    body :{

    },
    btnLogin :{
        width : 340 , 
        height : 50,
        justifyContent : 'center',
        alignItems : 'center'
    }
})


export default LoginScreen;