/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, Text, View } from 'react-native';
import images from '../../../assets/images';
import useGetcolor from '../../../lib/useGetColor';
import { StyleSheet } from 'react-native-unistyles';
import { useMemo } from 'react';
import formatMoney from '../../../lib/formatMoney';
import moment from 'moment';
import { DateEnum } from '../../../constant/date';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSettingStore } from '../../../store/useSettingStore';
import maskMoney from '../../../lib/maskMoney';

export interface HomeRecentItemProp {
  refId: string;
  transferDate: string;
  recipientName: string;
  transferName: string;
  amount: number;
  index: number;
  isFull: boolean;
  onPress?: () => void;
}

const HomeRecentItem = ({
  transferName,
  amount,
  transferDate,
  index,
  isFull,
  onPress,
}: HomeRecentItemProp) => {
  const { colors } = useGetcolor();
  const { visible } = useSettingStore();

  const icon = useMemo(() => {
    const isPositive = Number(amount ?? 0) > 0;
    const trxName = transferName.toLowerCase();
    let img = images.exchange;
    if (trxName.includes('salary')) {
      img = images.payment;
    } else if (trxName.includes('invoice')) {
      img = images.receipt;
    } else if (trxName.includes('bonus')) {
      img = images.dollar;
    }
    return {
      color: isPositive ? colors.success : colors.danger,
      img,
      isPositive,
    };
  }, [amount, colors.danger, colors.success, transferName]);

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Animated.View
        style={styles.container}
        entering={FadeIn.delay(isFull ? 50 : 100 * index)}
      >
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: icon.color,
            },
          ]}
        >
          <Image source={icon.img} style={styles.icon} />
        </View>
        <View
          style={{
            flexDirection: isFull ? 'column' : 'row',
            alignItems: isFull ? 'flex-start' : 'center',
            gap: isFull ? 5 : 10,
          }}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              styles.txtStatus,
              {
                color: colors.foreground,
              },
            ]}
          >
            {transferName}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              styles.txtDate,
              {
                color: colors.foreground + 'aa',
              },
            ]}
          >
            {moment(transferDate).format(
              isFull ? DateEnum.DD_MMM_YYYY : DateEnum.MMM_DD,
            )}
          </Text>
        </View>

        <Text
          style={[
            styles.txtMoney,
            {
              color: icon.isPositive ? colors.foreground : colors.danger,
            },
          ]}
        >
          {icon.isPositive ? '' : '-'} RM{' '}
          {maskMoney(formatMoney(Math.abs(amount)), visible)}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default HomeRecentItem;

const styles = StyleSheet.create(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 20,
  },
  logoContainer: {
    borderRadius: 100,
    padding: 5,
  },
  icon: { height: 20, aspectRatio: 1 },
  txtStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  txtDate: {
    fontWeight: '400',
    fontSize: 14,
    maxWidth: 100,
  },
  txtMoney: {
    flex: 1,
    textAlign: 'end',
    fontWeight: '500',
    letterSpacing: 1.2,
  },
}));
