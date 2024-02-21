import {Modal, Text, View} from 'react-native';
import COLORS from '../../constants/colors';
import {FontText} from '../../constants/Constant';
import {StyleSheet} from 'react-native';
import {OutlinedButton} from '../../components/button/OutlinedButton';
import {FilledButton} from '../../components/button/FilledButton';

const ModalConfirm = ({
  title,
  message,
  cancelText,
  confirmText,
  cancelCallback,
  confirmCallBack,
}) => {
  return (
    <Modal statusBarTranslucent={false}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textMessage}>{message}</Text>
        <View style={{flexDirection: 'row'}}>
          <OutlinedButton label={cancelText} onPress={cancelCallback} />
          <View style={{width: 8}} />
          <FilledButton label={cancelText} onPress={confirmCallBack} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 16,
    flex: 1,
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
