import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import styledMap, { mapToTheme as theme } from 'styled-map';

const topSpacing = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Bg = styled.SafeAreaView`
  flex: 1;
  ${props => `
    background-color: ${props.theme.color.bg};
  `}
  padding-top: ${topSpacing}px;
  padding-horizontal: ${theme('spacing')}px;
`;

export const Body = styled.Text`
  font-size: ${theme('size')}px;
  color: ${theme('colors')};
  margin-bottom: ${theme('spacing')}
  opacity: ${props => (props.faded ? 0.6 : 1)};
  font-family: 'space-mono';
`;

// const Heading = Body.extend`
//   font-size: 24px;
// `;

export default {
  Bg,
  Body
  // Heading
};
