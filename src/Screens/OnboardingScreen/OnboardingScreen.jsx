import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('BottomNavigation');
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity {...props}>
        <Text style={styles.doneButton}>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={styles.containerStyles}
        pages={[
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={styles.lottie}>
                <Image
                  source={ require('../../assets/images/SilderShow/sildershow1.png')}
                  style={{ width: '100%', height: '100%', borderRadius: 20 }} // Thay thế bằng kích thước thích hợp
                />
                <Lottie
                  source={require('../../assets/animations/boost.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Đơn giản',
            subtitle: 'Sự đơn giản là sự thanh lịch.',
            titleStyles: { fontFamily: 'Roboto', fontSize: 40, fontWeight: 'bold', color: '#333' }, // Thêm kiểu chữ mới cho title
        subTitleStyles: { fontFamily: 'Roboto', fontSize: 16, color: '#666' }, // Thêm kiểu chữ mới cho subtitle
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={styles.lottie}>
                <Image
                  source={ require('../../assets/images/SilderShow/images_thoitrang.jpeg')}
                  style={{ width: '100%', height: '100%', borderRadius: 20 }} // Thay thế bằng kích thước thích hợp
                />
                <Lottie
                  source={require('../../assets/animations/work.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Thời trang',
            subtitle: 'Thời trang là cách biểu đạt cá nhân.',
            titleStyles: { fontFamily: 'Roboto', fontSize: 40, fontWeight: 'bold', color: '#333' }, // Thêm kiểu chữ mới cho title
        subTitleStyles: { fontFamily: 'Roboto', fontSize: 16, color: '#666' }, // Thêm kiểu chữ mới cho subtitle
          },
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <Image
                  source={ require('../../assets/images/SilderShow/sildershow2.png')}
                  style={{ width: '100%', height: '100%', borderRadius: 20 }} // Thay thế bằng kích thước thích hợp
                />
                <Lottie
                  source={require('../../assets/animations/achieve.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Phong cách',
            subtitle: 'Phong cách không chỉ là bề ngoài, mà còn là cách sống.',
            titleStyles: { fontFamily: 'Roboto', fontSize: 40, fontWeight: 'bold', color: '#FFFFFF' }, // Thêm kiểu chữ mới cho title
        subTitleStyles: { fontFamily: 'Roboto', fontSize: 16, color: '#FFFFFF' }, // Thêm kiểu chữ mới cho subtitle
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerStyles: {
    paddingHorizontal: 15,
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: 'white',
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%',
  },
});
