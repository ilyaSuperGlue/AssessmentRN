import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import images from '../../assets/images';
import { useEffect, useMemo } from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSettingStore } from '../../store/useSettingStore';
import useGetcolor from '../../lib/useGetColor';

const MoneyToggle = () => {
  const { toggleVisible, visible } = useSettingStore();
  const imgSource = useMemo(
    () => (!visible ? images.eye : images.eyelock),
    [visible],
  );
  const { colors } = useGetcolor();

  const isActive = useSharedValue(visible ? 1 : 0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(isActive.value, [0, 1], [0, 22]),
      },
    ],
  }));

  const colorAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isActive.value,
      [0, 1],
      [colors.white, colors.accent],
    ),
  }));

  useEffect(() => {
    isActive.value = withSpring(visible ? 1 : 0, {
      duration: 500,
    });
  }, [isActive, toggleVisible, visible]);

  return (
    <Animated.View style={[styles.container(visible), colorAnimation]}>
      <Pressable onPress={() => toggleVisible()}>
        <Animated.Image source={imgSource} style={[styles.img, animStyle]} />
      </Pressable>
    </Animated.View>
  );
};

export default MoneyToggle;

const styles = StyleSheet.create(({ colors }) => ({
  container: (toggled: boolean) => ({
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    width: 60,
    borderWidth: 2,
    borderColor: !toggled ? colors.black + 'aa' : colors.accent + 'aa',
    zIndex: 100,
  }),
  img: {
    height: 18,
    aspectRatio: 1,
  },
}));
