import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import useGetcolor from '../../../lib/useGetColor';
import { StyleSheet } from 'react-native-unistyles';
import maskMoney from '../../../lib/maskMoney';
import { useSettingStore } from '../../../store/useSettingStore';

const HomeCard = () => {
  const { colors } = useGetcolor();
  const { visible } = useSettingStore();
  return (
    <View
      style={[
        styles.card,
        {
          shadowColor: colors.foreground,
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text style={[styles.txtBalance, { color: colors.foreground }]}>
        Savings Account Balance:
      </Text>

      <Text style={[styles.txtValue, { color: colors.primary }]}>
        <Text style={styles.txtCurrency}>RM</Text>{' '}
        {maskMoney('123.123.12', visible)}
      </Text>

      <Text style={[styles.txtAcc, { color: colors.foreground }]}>
        {maskMoney('1234 1234 1234 1234', visible)}
      </Text>
      <Image source={images.cat} style={styles.imgWallet} />
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create(() => ({
  card: {
    marginTop: 30,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
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
  },
  txtBalance: {
    fontWeight: '400',
    fontSize: 12,
  },
  txtValue: {
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 1.2,
  },
  txtAcc: {
    fontSize: 12,
  },
  imgWallet: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  txtCurrency: { fontSize: 14 },
}));
