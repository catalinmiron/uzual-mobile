import React from 'react';
import { Text } from 'react-native';

// const fontFamily = Platform.select({
//   ios: 'Menlo',
//   android: 'Code'
// });

export class MonoText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          this.props.style,
          { fontFamily: this.props.heading ? 'Menlo' : 'space-mono' }
        ]}
      />
    );
  }
}
