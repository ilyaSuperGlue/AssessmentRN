import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import images from '../../assets/images';
import { useEffect, useMemo, useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { ThemeEnum } from '../../constant/theme';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const Toggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isToggled, setIsToggled] = useState(theme === ThemeEnum.DARK);
  const imgSource = useMemo(
    () => (!isToggled ? images.lightmode : images.darkmode),
    [isToggled],
  );

  const isActive = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(isActive.value, [0, 1], [0, 22]),
      },
    ],
  }));

  useEffect(() => {
    isActive.value = withSpring(isToggled ? 1 : 0, {
      duration: 500,
    });
  }, [isActive, isToggled]);

  return (
    <Pressable
      style={styles.container(isToggled)}
      onPress={() => {
        setIsToggled(p => !p);
        setTimeout(() => {
          toggleTheme();
        }, 100);
      }}
    >
      <Animated.Image source={imgSource} style={[styles.img, animStyle]} />
    </Pressable>
  );
};

export default Toggle;

const styles = StyleSheet.create(({ colors }) => ({
  container: (toggled: boolean) => ({
    backgroundColor: toggled ? colors.black : colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    width: 60,
    borderWidth: 2,
    borderColor: !toggled ? colors.black + 'aa' : colors.white + 'aa',
    zIndex: 100,
  }),
  img: {
    height: 18,
    aspectRatio: 1,
  },
}));
