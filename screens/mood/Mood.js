import React from 'react';
import FullLoading from '../../components/FullLoading';
import { Body, Heading, Wrapper, Scroll } from '../../components/styled';
import MoodGraph from '../../components/MoodGraph';
import { start, end, current, TIME_FORMAT } from '../../utils/dayjs';
export default class Mood extends React.Component {
  static navigationOptions = {
    header: null
  };

  _renderX = () => {
    const { moods } = this.props.data;
    return (
      <Wrapper>
        <Heading left large>
          MOODS
        </Heading>
        {/* <Body>
          From: {start.format(TIME_FORMAT)} - To:{current.format(TIME_FORMAT)}
        </Body> */}
        <MoodGraph moods={moods} />
      </Wrapper>
    );
  };

  render() {
    if (this.props.data.loading && !this.props.data.moods) {
      return <FullLoading />;
    }
    return <Scroll>{this._renderX()}</Scroll>;
  }
}
