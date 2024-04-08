import { ScrollView, View  ,TouchableOpacity ,Image ,Text} from "react-native";
import { styles } from "./ProductListAll.style";
import useListProduct from "../../../services/product-services/use-all-list-product";
import Icon from 'react-native-vector-icons/FontAwesome';


const ProductListAll = ({dataListProduct , onpressLove , heartColor , navigation})=>{
    return(
        <>
            <ScrollView contentContainerStyle={{  flexDirection: 'row', flexWrap: 'wrap'}}>
            {dataListProduct.map((item, index) => (
                  <View
                    key={index}
                    style={[styles.viewItemProducts]}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '5%',
                      }}
                      onPress={() =>
                        navigation.navigate('DetailProductScreen', {
                          _id: item._id,
                          name: item.name,
                          image: item.image,
                          category: item.loai,
                          describe : item.describe,
                          price: item.price,
                          quantitySold: item.quantitySold,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 90, height: 131}}
                      />
                      <Text>{item.name}</Text>
                      <Text>{item.price} USD</Text>
                      {/* Thêm icon trái tim */}
                      <TouchableOpacity
                      style={styles.heartIcon}
                      onPress={() => onpressLove(item._id)}>
                      <Icon name="heart" size={20} color={heartColor(item.id)} />
                    </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
        </>
    )
}

export default ProductListAll;