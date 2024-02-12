import { StyleSheet, Text, View } from "react-native";


const Chat =  () => {
    return(
        <View style = {styles.container}>
            <Text>Chat</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        flex : 1, 
        backgroundColor : '#FFFFFF'
    }
})

export default Chat;