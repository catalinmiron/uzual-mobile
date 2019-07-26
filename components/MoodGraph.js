import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { withTheme } from 'styled-components';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import dayjs from 'dayjs';
import Svg, {
  Defs,
  Stop,
  LinearGradient,
  Path,
  G,
  Line,
  Circle,
  Text,
  Symbol,
  Use,
  Rect,
  Pattern
} from 'react-native-svg';

import { start, end, days, daysInMonth, current } from '../utils/dayjs';
import { icns, icons } from '../utils/icons';
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const createMoodData = (data = realData) =>
  days.map(({ date: day }, i) => {
    // console.log(d.findIndex(a => a.startsWith(totalDays[i])) === i)
    const index = data.findIndex(a => a.date.startsWith(day));
    const item = index !== -1 ? data[index] : null;
    return {
      x: item ? icns.indexOf(item.type) : 0,
      y: i + 1,
      mood: item ? icons[item.type] : icons['Dizzy'],
      time: item ? dayjs(item.date) : null,
      itemDay: dayjs(day)
    };
  });

const daySpacer = 50;
const height = Platform.select({
  android: screenHeight * 0.75,
  ios: screenHeight * 0.8
});
const ITEMS_PER_ROW = icns.length;
// const cellSize = height / daysInMonth;
const width = screenWidth * 0.8 + daySpacer;
const cellSizeWidth = (width - daySpacer) / ITEMS_PER_ROW;
const cellSizeHeight = height / daysInMonth;
const xRange = icns.length * cellSizeWidth + cellSizeWidth / 2;

const xScale = d3Scale
  .scaleLinear()
  .domain([0, icns.length])
  .range([cellSizeWidth / 2, xRange]);

const yScale = d3Scale
  .scaleTime()
  .domain([start, end])
  .range([cellSizeHeight * 1.4, height + cellSizeHeight * 1.4]);

var line = d3Shape
  .line()
  .defined(function(d) {
    return d.time !== null;
  })
  .x(function(d, i) {
    return xScale(d.x);
  }) // set the x values for the line generator
  .y(function(d, i) {
    return yScale(d.time);
    // return i * cellSize;
  }); // set the y values for the line generator

export default withTheme(({ moods, theme }) => {
  const moodData = createMoodData(moods);
  // TODO: Add a prettier UI!
  if (!moodData.length === 0) {
    return <Body>There's nothing to display.</Body>;
  }

  return (
    <Svg
      height={height}
      width={width}
      viewBox={`-${daySpacer} 0 ${width} ${height + cellSizeHeight}`}
    >
      <Defs>
        <LinearGradient
          id='moodGradient'
          x1={`-${daySpacer}`}
          y1='0'
          x2={`${width - daySpacer - cellSizeWidth}`}
          y2='0'
        >
          <Stop offset='0%' stopColor={theme.colors.moodGraphColorNegative} />
          <Stop offset='100%' stopColor={theme.colors.moodGraphColorPositive} />
        </LinearGradient>
        <Pattern
          id='subtlePattern'
          patternUnits='userSpaceOnUse'
          x='0'
          y='0'
          viewBox='0 0 4 4'
          width='8'
          height='8'
        >
          <Path
            d='M-1,1 l2,-2 M0,3 l3,-3 M3,4 l2,-2'
            stroke={`${theme.colors.moodGraphColor}10`}
          />
        </Pattern>
      </Defs>
      {icns.map((n, index) => {
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
              stroke={`${theme.colors.moodColors[icon.iconName]}`}
              strokeWidth='24'
              fill={`${theme.colors.moodColors[icon.iconName]}20`}
            />
          </Symbol>,
          // 0.35 => cellSize / 2 (0.5) - 0.7/2
          // subtract the cellSize / 2 to align it to the middle
          // subtract half of the actual size
          // (cellSize * .7) / 2 => cellSize * .3 or 30% :p
          <Use
            key={`heading-${icon.iconName}`}
            x={xScale(index) - cellSizeWidth * 0.45}
            href={`#symbol_${icon.iconName}`}
            width={cellSizeWidth * 0.9}
            height={cellSizeHeight * 0.9}
          />
        ];
      })}
      {moodData.map((mood, index) => {
        const { iconName, time, x, y, itemDay } = mood;
        return (
          <G key={time || index}>
            <Text
              fontFamily='Menlo'
              textAnchor='end'
              x={-10}
              y={yScale(itemDay) + 4}
              fontSize={cellSizeHeight / 2.5}
              fill={`${theme.colors.moodGraphColor}80`}
            >
              {dayjs(itemDay).format('ddd DD')}
            </Text>
            {time && (
              <>
                <Circle
                  cx={xScale(x)}
                  cy={yScale(itemDay)}
                  r={cellSizeHeight / 7}
                  fill={theme.colors.moodGraphColor}
                />
                <Circle
                  cx={xScale(x)}
                  cy={yScale(itemDay)}
                  r={cellSizeHeight / 3}
                  fill={`${theme.colors.moodGraphColor}10`}
                />
              </>
            )}
            <Line
              x1={0}
              y1={yScale(itemDay)}
              x2={width}
              y2={yScale(itemDay)}
              key={iconName}
              stroke={`${theme.colors.moodGraphColor}15`}
              strokeWidth='1'
              strokeDasharray={theme.layout.moodGraphStrokeDashArray}
            />
          </G>
        );
      })}
      <Path
        d={line(moodData)}
        fill='none'
        stroke='url(#moodGradient)'
        strokeWidth='1'
      />
      <Rect
        x='0'
        y={yScale(current.subtract(1, 'day')) + cellSizeHeight / 2}
        width={width}
        height={end.diff(current.subtract(1, 'day'), 'day') * cellSizeHeight}
        fill='url(#subtlePattern)'
      />
      {icns.map((icon, index) => {
        return (
          <Line
            key={`${icon.iconName}-${index}`}
            x1={xScale(index)}
            y1={cellSizeHeight}
            x2={xScale(index)}
            y2={height + cellSizeHeight * 1.5}
            stroke={`${theme.colors.moodGraphColor}15`}
            strokeWidth='1'
            strokeDasharray={theme.layout.moodGraphStrokeDashArray}
          />
        );
      })}
    </Svg>
  );
});
