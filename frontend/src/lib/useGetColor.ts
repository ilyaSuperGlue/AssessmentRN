import { useUnistyles } from 'react-native-unistyles';
import colors, { TColor } from '../assets/colors';
import { ThemeEnum } from '../constant/theme';
import { useMemo } from 'react';

export const getColor = (theme: ThemeEnum) => {
  return colors[theme];
};

const useGetcolor = () => {
  const { rt } = useUnistyles();
  const colorstheme = useMemo<TColor>(
    () => getColor((rt.themeName as ThemeEnum) ?? ThemeEnum.LIGHT),
    [rt.themeName],
  );
  return { colors: colorstheme };
};

export default useGetcolor;
