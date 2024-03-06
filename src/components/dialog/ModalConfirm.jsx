import {Modal, Text, TouchableOpacity, View , Dimensions} from 'react-native';
import COLORS from '../../constants/colors';
import {FontText} from '../../constants/Constant';
import {StyleSheet} from 'react-native';
import OutlinedButton from '../../components/button/OutlinedButton';
import FilledButton from '../../components/button/FilledButton';

const {height , width} = Dimensions.get('window');

const ModalConfirm = (props) => {

  const {
    title,
    message,
    cancelText,
    confirmText,
    cancelCallback,
    confirmCallBack,
    visible
  } = props;



  return (
    <Modal
      visible={visible}
      statusBarTranslucent={false}
    >
      <View style={styles.container}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textMessage}>{message}</Text>
        <View style={{flexDirection: 'row'}}>
          <OutlinedButton label={cancelText} onPress={cancelCallback} />
          <View style={{width: 8}} />
          <FilledButton label={confirmText} onPress={confirmCallBack} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent : 'center',
    alignItems : 'center',
  },
  textTitle: {
    color: COLORS.black,
    fontFamily: FontText.FS_PF_BeauSans_Pro,
    alignItems: 'center',
    fontSize: 20,
    marginBottom: 8,
  },
  textMessage: {
    paddingHorizontal: 16,
    color: COLORS.gray,
    fontFamily: FontText.FS_PF_BeauSans_Pro,
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default ModalConfirm;
