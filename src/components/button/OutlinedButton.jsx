import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import COLORS from '../../constants/colors';
import {FontText} from '../../constants/Constant';

const  OutlinedButton = props => {
  const {label, onPressed, isEnabled = true} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPressed}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.color_EEEEEE,
    height: 46,
    borderRadius: 10,
  },
  buttonLabel: {
    backgroundColor: COLORS.color_EE0033,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FontText.FS_PF_BeauSans_Pro_SemiBold,
  },
});
export default OutlinedButton;
