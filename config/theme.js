import React from 'react';

export const ThemeContext = React.createContext(null);
const colors = {
  white: '#FFFFFF',
  bg: '#FAFAFA',
  primary: 'turquoise',
  default: '#333',
  placeholder: '#9B9B9B',
  shadow: '#ddd',
  subheading: '#6D6D6D',
  error: 'rgba(242, 49, 76, 1)',
  loadingBg: 'rgba(255, 255, 255, 0.9)',
  tabBar: 'white',
  noBg: 'transparent'
};

const colorsDark = {
  ...colors,
  bg: '#222',
  default: '#d3d3d3',
  tabBar: '#333',
  shadow: 'rgba(255, 255, 255, 0.25)',
  loadingBg: 'rgba(0, 0, 0, 0.9)'
};

const spacing = {
  small: 10,
  normal: 14,
  big: 20,
  default: 10,
  huge: 30,
  xHuge: 60,
  noMargin: 0
};

const flexAlign = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
  default: 'flex-start'
};
const textAlign = {
  center: 'center',
  left: 'left',
  right: 'right',
  default: 'left'
};

const size = {
  stiny: 10,
  tiny: 12,
  default: 14,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 46,
  xxxlarge: 52
};

const height = {
  input: 40,
  tabBar: 60,
  header: 60
};

const button = {
  default: 40,
  medium: 60,
  big: 80
};

const fontWeight = {
  light: '300',
  regular: '400',
  normal: '500',
  bold: '700',
  extrabold: '900',
  default: '500',
  consi: '400',
  //
  big: '700',
  large: '700',
  xlarge: '700'
};
const fontWeights = {
  small: '500',
  default: '500',
  medium: '500',
  big: '700',
  large: '700',
  xlarge: '700'
};

const avatar = {
  small: 50,
  default: 50,
  big: 60,
  huge: 140,
  light: 40
};
const layout = {
  radius: 10,
  smallRadius: 7,
  badgeRadius: 4,
  habitSquareSize: 22,
  width: 260,
  fabButtonSize: 50
};

export default (theme = 'light') => ({
  colors: theme === 'light' ? colors : colorsDark,
  spacing,
  layout,
  size,
  fontWeight,
  avatar,
  height,
  flexAlign,
  textAlign,
  button
});
