import { Image, Pressable, Text, View } from 'react-native';
import images from '../../../assets/images';
import useGetcolor from '../../../lib/useGetColor';
import { StyleSheet } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { EnumScreen } from '../../../navigation/interface/rootstack';

const HomeHeader = () => {
  const { colors } = useGetcolor();
  const { navigate } = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.rowLogo}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={[styles.txtLogo, { color: colors.primary }]}>
          AEON Bank
        </Text>
      </View>
      <Pressable onPress={() => navigate(EnumScreen.SETTING)}>
        <Image source={images.person} />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create(() => ({
  logo: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 5,
  },
  txtLogo: {
    fontWeight: '500',
  },
  rowLogo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
