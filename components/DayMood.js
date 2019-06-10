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

const iconSize = (width * 0.7) / icns.length;
const iconSpacing = (width * 0.2) / icns.length;
const svgSize = (iconSize + iconSpacing) * (icns.length - 1);

class DayMood extends React.Component {
  _renderMoodIcons = () => {
    const { theme } = this.props;

    return icns.map((n, index) => {
      const icon = icons[n];
      const [w, h, _, __, path] = icon.icon;
      return [
        <Symbol
          viewBox={`0 0 ${w} ${h}`}
          id={`symbol_${icon.iconName}`}
          key={`symbol-${icon.iconName}`}
        >
          <Path
            d={path}
            fill='none'
            stroke={`${theme.colors.moodGraphColor}dd`}
            strokeWidth='24'
            fill={`${theme.colors.moodGraphColor}10`}
          />
        </Symbol>,
        // 0.35 => cellSize / 2 (0.5) - 0.7/2
        // subtract the cellSize / 2 to align it to the middle
        // subtract half of the actual size
        // (cellSize * .7) / 2 => cellSize * .3 or 30% :p
        <G
          key={`heading-${icon.iconName}`}
          onPressIn={() => console.log(icon.iconName)}
          width={iconSize}
          height={iconSize}
          x={index * (iconSize + iconSpacing)}
        >
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
      <Row>
        {icns.map(icon => {
          return (
            <Button
              width='-1'
              key={icon}
              onPress={this.props.setMood.bind(this, icon)}
            >
              <Body white noMargin>
                {icon}
              </Body>
            </Button>
          );
        })}
      </Row>
    );
    return (
      <Svg height={iconSize} width={width} viewBox={`0 0 ${width} ${iconSize}`}>
        {this._renderMoodIcons()}
      </Svg>
    );
  };

  render() {
    return (
      <FullScreenWrapper center>
        <Body>Actually, what's your mood today?</Body>
        {this._renderIconList()}
      </FullScreenWrapper>
    );
  }
}

export default withTheme(DayMood);
