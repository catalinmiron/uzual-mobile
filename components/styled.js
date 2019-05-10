import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import styledMap, { mapToTheme as theme } from 'styled-map';
import SafeAreaView from 'react-native-safe-area-view';

const topSpacing = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
`;

export const RowAligned = styled(Row)`
  align-items: ${theme('flexAlign')}
  justify-content: ${theme('flexAlign')}
`;

export const Block = styled.View`
  margin-bottom: ${theme('spacing')};
`;

export const Spacer = styled(Block)`
  margin-top: ${theme('spacing')};
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: ${theme('flexAlign')};
  justify-content: ${theme('flexAlign')};
  padding-horizontal: ${theme('spacing')};
  background-color: ${props => props.theme.colors.bg};
`;

export const Bg = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.bg};
`.withComponent(SafeAreaView);

export const LoginWrapper = styled(Wrapper)`
  padding-horizontal: 0;
  width: 260px;
`.withComponent(KeyboardAvoidingView);

export const LoadingWrapper = styled(Wrapper)`
  position: absolute;
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: ${props => props.theme.colors.loadingBg}
`;

export const Scroll = styled.ScrollView`
  flex: 1
  background-color: ${props => props.theme.colors.bg};
`;

export const Body = styled.Text`
  font-size: ${theme('size')}px;
  color: ${theme('colors')};
  margin-bottom: ${theme('spacing')}
  opacity: ${props => (props.faded ? 0.6 : 1)};
  font-family: 'space-mono';
  text-align: ${theme('textAlign')};
  align-self: ${theme('flexAlign')}
  margin-right: ${props =>
    props.marginRight ? props.theme.spacing.default : 0}
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

export const Badge = styled.View`
  background-color: ${theme('colors')}
  border-radius: ${props => props.theme.layout.badgeRadius}
  padding: 0 4px;
`;

export const Heading = styled(Body)`
  font-family: 'Menlo';
`;
export const Button = styled.TouchableOpacity`
  align-items: center
  justify-content: center
  background-color: ${theme('colors')}
  height: ${theme('button')};
  width: ${props => props.width || props.theme.layout.width}
  margin-top: ${theme('spacing')};
`;

export const HabitSquare = styled.View`
  height: ${props => props.theme.layout.habitSquareSize}
  width: ${props => props.theme.layout.habitSquareSize}
  margin-right: 1
  margin-bottom: 1
  align-items: center
  justify-content: center
  backgroundColor: ${props =>
    props.done ? props.theme.colors.primary : props.theme.colors.shadow}
`;
