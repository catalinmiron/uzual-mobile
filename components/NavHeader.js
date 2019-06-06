import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import * as Icon from '@expo/vector-icons';
import { withTheme } from 'styled-components';
import { Header } from './styled';

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

export default ({ onBackPress }) => (
  <Header>
    <BackButton onPress={onBackPress} />
  </Header>
);
