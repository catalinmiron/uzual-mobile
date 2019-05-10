import React from 'react';
import { LoadingWrapper, Body } from './styled';

export default () => (
  <LoadingWrapper center>
    {/* <ActivityIndicator size="large" color={Colors.grey} /> */}
    <Body center>Loading...</Body>
  </LoadingWrapper>
);
