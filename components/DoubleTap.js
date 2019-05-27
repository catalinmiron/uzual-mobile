import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

export default class DoubleTap extends React.Component {
  lastTap = null;
  _handleDoubleTap = () => {
    const now = Date.now();
    if (this.lastTap && now - this.lastTap < this.props.delay) {
      this.props.onDoubleTap();
    } else {
      this.lastTap = now;
      this.props.onPress();
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this._handleDoubleTap}>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}
