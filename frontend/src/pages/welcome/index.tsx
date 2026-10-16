import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import images from '../../assets/images';
import { useCallback, useEffect, useState } from 'react';
import Toggle from '../../components/Toggle';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { useNavigation } from '@react-navigation/native';
import { EnumScreen } from '../../navigation/interface/rootstack';

const Welcome = () => {
  const {
    rt: { themeName },
  } = useUnistyles();
  const [boot, setBoot] = useState(true);
  const nav = useNavigation();

  const anim = useSharedValue(10);

  const imgStyle = useAnimatedStyle(() => ({
    width: `${interpolate(anim.value, [0, 10], [10, 60])}%`,
    transform: [
      {
        translateX: `${interpolate(anim.value, [0, 10], [0, 25])}%`,
      },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 5], [1, 0]),
  }));

  const toggle = useCallback(() => {
    setTimeout(() => {
      setBoot(false);
    }, 600);
    anim.value = withSpring(0, {
      duration: 500,
    });
  }, [anim]);

  const animatedTheme = useAnimatedTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: animatedTheme.value.colors.background,
  }));

  useEffect(() => {
    toggle();
  }, [toggle]);

  if (boot) {
    return (
      <Animated.View style={styleBoot.container}>
        <Animated.Image
          source={images.logo}
          style={[styleBoot.img, imgStyle]}
        />
        <Animated.View style={textStyle}>
          <Text style={styleBoot.text}>AEON Bank</Text>
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      entering={FadeIn.delay(500)}
    >
      <View style={styles.pinkBg}>
        <Toggle />
      </View>
      <Image source={images.cat} style={styles.imgCat} />
      <Text key={themeName + 'textWelcome'} style={styles.textWelcome}>
        Welcome to AEON Bank
      </Text>
      <Text key={themeName + 'textIntro'} style={styles.textIntro}>
        Malaysia’s first islamic digital bank
      </Text>
      <View style={styles.spacer} />

      <Text key={themeName + 'textManage'} style={styles.textManage}>
        managing your money is now easier with aeon bank
      </Text>
      <Pressable
        style={styles.btnPrimary}
        onPress={() => {
          nav.reset({
            routes: [
              {
                name: EnumScreen.HOME,
              },
            ],
          });
        }}
      >
        <Text style={styles.textBtn}>Get Started</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Welcome;

const styles = StyleSheet.create(({ colors }) => {
  return {
    container: {
      flex: 1,
    },
    pinkBg: {
      backgroundColor: colors.accent,
      width: '100%',
      height: '40%',
      position: 'absolute',
      alignItems: 'flex-end',
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    imgCat: {
      height: '46%',
      aspectRatio: 2,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    textWelcome: {
      fontWeight: '700',
      textAlign: 'center',
      fontSize: 48,
      letterSpacing: 0.3,
      marginTop: 20,
      color: colors.primary,
    },
    textIntro: {
      color: colors.primary,
      fontSize: 20,
      marginTop: 20,
      textAlign: 'center',
      fontWeight: '500',
    },
    textManage: {
      color: colors.foreground + 'aa',
      fontSize: 20,
      marginTop: '15%',
      textAlign: 'center',
      fontWeight: '300',
      width: '70%',
      alignSelf: 'center',
    },
    btnPrimary: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 15,
      backgroundColor: colors.accent,
      alignSelf: 'center',
      marginVertical: 20,
    },
    spacer: {
      flex: 1,
    },
    textBtn: {
      color: 'white',
      fontWeight: '600',
      fontSize: 15,
    },
  };
});

const styleBoot = StyleSheet.create(({ colors }) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'row',
    gap: 10,
  },
  img: {
    aspectRatio: 1,
  },
  text: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
}));
