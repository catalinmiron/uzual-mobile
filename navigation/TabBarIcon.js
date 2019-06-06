import React from 'react';
import * as Icon from '@expo/vector-icons';
import { withTheme } from 'styled-components';

class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={28}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused
            ? this.props.theme.colors.primary
            : this.props.theme.colors.placeholder
        }
      />
    );
  }
}

export default withTheme(TabBarIcon);
