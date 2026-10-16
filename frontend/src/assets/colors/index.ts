const colors = {
  light: {
    background: '#FFFCFC' as const,
    foreground: '#1A1A1A' as const,
    white: '#ffffff' as const,
    black: '#000000' as const,
    primary: '#161660' as const,
    secondary: '#3B609E' as const,
    accent: '#F11FB9' as const,
    danger: '#EF4444' as const,
    warning: '#FFEAC0' as const,
    success: '#7CCBA5' as const,
  },
  dark: {
    background: '#0F1024' as const,
    foreground: '#F5F5F7' as const,
    white: '#FFFFFF' as const,
    black: '#000000' as const,
    primary: '#8585FF' as const,
    secondary: '#7FA7E8' as const,
    accent: '#FF62D0' as const,
    danger: '#FF6B6B' as const,
    warning: '#5A421F' as const,
    success: '#3E8E72' as const,
  },
};

export default colors;

export type TColor = (typeof colors)['light'] | (typeof colors)['dark'];
