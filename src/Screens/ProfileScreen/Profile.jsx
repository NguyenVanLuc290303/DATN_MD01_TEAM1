import { StyleSheet, Text, View } from "react-native";


const Profile =  () => {
    return(
        <View style = {styles.container}>
            <Text>Profile</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        flex : 1, 
        backgroundColor : '#FFFFFF'
    }
})

export default Profile;