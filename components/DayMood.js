import React from 'react';
import { Dimensions } from 'react-native';
import { withTheme } from 'styled-components';
import Svg, { Circle, G, Path, Symbol, Use } from 'react-native-svg';

import { start, end, TIME_FORMAT } from '../utils/dayjs';
import { icns, icons } from '../utils/icons';
import {
  Body,
  FullScreenWrapper,
  Row,
  Heading,
  Wrapper,
  Button
} from './styled';
const { width, height } = Dimensions.get('screen');

const iconSize = (width * 0.8) / icns.length;
const iconSpacing = (width * 0.2) / icns.length;
const svgSize = (iconSize + iconSpacing) * (icns.length - 1);

class DayMood extends React.Component {
  _renderMoodIcons = () => {
    const { theme } = this.props;

    return icns.map((iconType, index) => {
      const icon = icons[iconType];
      const [w, h, _, __, path] = icon.icon;
      return [
        <Symbol
          viewBox={`0 0 ${w} ${h}`}
          id={`symbol_${icon.iconName}`}
          key={`symbol-${icon.iconName}`}
        >
          <Path
            d={path}
            stroke={`${theme.colors.moodColors[icon.iconName]}`}
            strokeWidth='24'
            fill={`${theme.colors.moodColors[icon.iconName]}20`}
          />
        </Symbol>,
        <G
          key={`heading-${icon.iconName}`}
          onPress={() => this.props.setMood(iconType)}
          width={iconSize}
          height={iconSize}
          x={index * (iconSize + iconSpacing)}
        >
          <Circle
            r={iconSize / 2}
            fill='transparent'
            cx={iconSize / 2}
            cy={iconSize / 2}
          />
          <Use
            href={`#symbol_${icon.iconName}`}
            width={iconSize}
            height={iconSize}
          />
        </G>
      ];
    });
  };

  _renderIconList = () => {
    return (
      <Svg
        height={iconSize}
        width={svgSize}
        viewBox={`0 0 ${width} ${iconSize}`}
      >
        {this._renderMoodIcons()}
      </Svg>
    );
  };

  render() {
    return (
      <FullScreenWrapper center>
        <Heading medium huge>
          Actually, what's your mood today?
        </Heading>
        {this._renderIconList()}
      </FullScreenWrapper>
    );
  }
}

export default withTheme(DayMood);
