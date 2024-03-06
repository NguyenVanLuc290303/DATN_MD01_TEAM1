import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import COLORS from '../../constants/colors';
import {FontText} from '../../constants/Constant';

const FilledButton = props => {
  const {label, onPressed, isEnabled = true} = props;
  return (
    <TouchableOpacity
      style={styles.button(isEnabled)}
      disabled={!isEnabled}
      onPress={onPressed}>
      <Text style={styles.buttonLabel(isEnabled)}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: isEnabled => ({
    flex: 1,
    alignItems: 'center',
    backgroundColor: isEnabled ? COLORS.primary : COLORS.color_E4E4E4,
    borderWidth: 1,
    borderColor: COLORS.color_EEEEEE,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
  }),
  buttonLabel: isEnabled => ({
    backgroundColor: isEnabled ? COLORS.white : COLORS.color_text_main,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FontText.FS_PF_BeauSans_Pro_SemiBold,
  }),
});

export default FilledButton;
