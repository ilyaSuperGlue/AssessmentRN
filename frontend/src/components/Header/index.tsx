import { Image, Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import useGetcolor from '../../lib/useGetColor';

type Props = {
  title?: string;
};

const Header = ({ title = 'Transactions' }: Props) => {
  const nav = useNavigation();
  const { colors } = useGetcolor();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Image source={images.arrow} style={styles.img} />
      </Pressable>
      <Text
        style={[
          styles.txt,
          {
            color: colors.foreground,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create(() => ({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.2,
  },
  img: {
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
}));
