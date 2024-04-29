import { View  ,StyleSheet, TextInput} from "react-native";
import InputView from "../../components/atoms/InputView/InputView";

export default function ChangePasswordScreen(){
    return(
    <View style ={styles.container}>
        <InputView
        >
        <TextInput
        
        />
        </InputView>
    </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1
    }
})