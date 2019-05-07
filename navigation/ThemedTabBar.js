import React from 'react';
import { withTheme } from 'styled-components';
import { BottomTabBar } from 'react-navigation';

class ThemedTabBar extends React.Component {
  render() {
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.props.theme.colors.primary}
        inactiveTintColor={this.props.theme.colors.placeholder}
        style={{
          backgroundColor: this.props.theme.colors.tabBar,
          borderTopColor: this.props.theme.colors.shadow,
          height: this.props.theme.height.tabBar,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        // safeAreaInset="never"
        tabStyle={{
          justifyContent: 'center',
          flex: 0.25
        }}
      />
    );
  }
}

export default withTheme(ThemedTabBar);
