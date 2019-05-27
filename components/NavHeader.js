import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import { withTheme } from 'styled-components';
import { Body, Header } from './styled';

export const BackButton = withTheme(({ onPress, theme }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon.Ionicons
      name={
        Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'
      }
      size={theme.size.xlarge}
      style={{ marginBottom: -3 }}
      color={theme.colors.default}
    />
  </TouchableOpacity>
));

/* <Header>
<NavButton onPress={() => this.props.navigation.goBack()}>
  <H blue medium>
    Back
  </H>
</NavButton>
</Header> */

// export const Header = styled.View`
//   ${props => `
//     height: 44px;
//     align-items: center;
//     flex-direction: row;
//     justify-content: space-between;
//     padding-horizontal: ${props.theme.spacing.huge};
//   `};
// `;

export default ({ onBackPress }) => (
  <Header>
    <BackButton onPress={onBackPress} />
  </Header>
);

// export const NavButton = styled.TouchableOpacity`
//   ${props => `
//     color: ${props.theme.color.blue};
//   `};
// `;
