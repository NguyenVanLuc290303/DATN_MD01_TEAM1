import { View ,StyleSheet ,Text} from "react-native";
import COLORS from "../../../../constants/colors";

const AllOrderProduct = () =>{
    return(
        <View style={styles.container}>
            <Text>ALL</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : COLORS.red
    }
})

export default AllOrderProduct;