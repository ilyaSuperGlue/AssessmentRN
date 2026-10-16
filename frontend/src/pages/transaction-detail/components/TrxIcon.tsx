import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import images from '../../../assets/images';
import useGetcolor from '../../../lib/useGetColor';
import { useMemo } from 'react';

type Props = {
  transferName: string;
  amount: number;
};

const TrxIcon = ({ transferName, amount }: Props) => {
  const { colors } = useGetcolor();

  const image = useMemo(() => {
    const name = transferName?.toLowerCase();
    let img = images.exchange;

    if (!name) {
      return img;
    }

    if (name.includes('salary')) img = images.payment;
    else if (name.includes('invoice')) img = images.receipt;
    else if (name.includes('bonus')) img = images.dollar;
    return img;
  }, [transferName]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: amount > 0 ? colors.success : colors.danger },
      ]}
    >
      <Image source={image} style={styles.icon} />
    </View>
  );
};

export default TrxIcon;

const styles = StyleSheet.create(() => ({
  container: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: { width: 25, height: 25, resizeMode: 'contain' },
}));
