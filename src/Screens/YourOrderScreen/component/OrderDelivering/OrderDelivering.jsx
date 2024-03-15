import { View ,StyleSheet ,Text} from "react-native";

const OrderDelivering = () =>{
    return(
        <View style={styles.container}>
            <Text>ALL Deliving</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default OrderDelivering;