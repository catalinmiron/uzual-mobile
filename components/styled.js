import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import styledMap, { mapToTheme as theme } from 'styled-map';

const topSpacing = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
`;

export const Block = styled.View`
  margin-bottom: ${theme('spacing')};
`;

export const Bg = styled.SafeAreaView`
  flex: 1;
  ${props => `
    background-color: ${props.theme.color.bg};
  `}
  padding-top: ${topSpacing}px;
  padding-horizontal: ${theme('spacing')}px;
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: ${theme('flexAlign')};
  justify-content: ${theme('flexAlign')};
  padding-horizontal: ${theme('spacing')}px;
`;

export const LoginWrapper = styled(Wrapper)`
  padding-horizontal: 0;
  width: 260px;
`;

export const Body = styled.Text`
  font-size: ${theme('size')}px;
  color: ${theme('colors')};
  margin-bottom: ${theme('spacing')}
  opacity: ${props => (props.faded ? 0.6 : 1)};
  font-family: 'space-mono';
  text-align: ${theme('textAlign')};
  align-self: ${theme('flexAlign')}
`;

export const Input = styled.TextInput`
  height: ${props => props.theme.height.input};
  border-bottom-color: ${props => props.theme.colors.shadow};
  border-bottom-width: 1px;
  margin-bottom: ${theme('spacing')};
  font-family: 'space-mono';
  color: ${theme('colors')}
  width: 260px;
`;

export const Heading = styled(Body)`
  font-family: 'Menlo';
`;

export const HabitSquare = styled.View`
  height: ${props => props.theme.layout.habitSquareSize}
  width: ${props => props.theme.layout.habitSquareSize}
  margin-right: 1
  margin-bottom: 1
  align-items: center
  justify-content: center
  backgroundColor: ${props => (props.done ? props.theme.colors.primary : props.theme.colors.shadow)}
`;
