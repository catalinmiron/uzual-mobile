import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MonoText } from '../StyledText';
import Colors from '../../constants/Colors';
import { LoadingWrapper, Body } from '../styled';

export default () => (
  <LoadingWrapper center>
    {/* <ActivityIndicator size="large" color={Colors.grey} /> */}
    <Body center>Loading...</Body>
  </LoadingWrapper>
);
