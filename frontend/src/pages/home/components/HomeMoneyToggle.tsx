import { Text, View } from 'react-native';
import MoneyToggle from '../../../components/MoneyToggle';
import { StyleSheet } from 'react-native-unistyles';
import useGetcolor from '../../../lib/useGetColor';
import { useSettingStore } from '../../../store/useSettingStore';

const HomeMoneyToggle = () => {
  const { colors } = useGetcolor();
  const { visible } = useSettingStore();
  return (
    <View
      style={[
        styles.container,
        { shadowColor: colors.black, backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.txt, { color: colors.foreground }]}>
        {!visible ? 'Hide' : 'Show'} Balance
      </Text>
      <MoneyToggle />
    </View>
  );
};

export default HomeMoneyToggle;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#eaeaeaaa',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
