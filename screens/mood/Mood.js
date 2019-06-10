import React from 'react';
import { v4 as uuid } from 'uuid';
import queries from './queries.gql';
import FullLoading from '../../components/FullLoading';
import { Body, Heading, Wrapper, Scroll } from '../../components/styled';
import MoodGraph from '../../components/MoodGraph';
import DayMood from '../../components/DayMood';
import { start, current, end, TIME_FORMAT } from '../../utils/dayjs';
import { POLL_INTERVAL } from '../../constants/vars';

export default class Mood extends React.Component {
  static navigationOptions = {
    header: null
  };

  _onSetMood = async type => {
    const date = current.format(TIME_FORMAT);
    await this.props.data.stopPolling();
    this.props.setMood({
      variables: {
        date,
        type
      },
      optimisticResponse: {
        __typename: 'Mutation',
        setMood: {
          __typename: 'Mood',
          date,
          type,
          id: uuid()
        }
      },
      update: (proxy, { data: { setMood } }) => {
        try {
          const data = proxy.readQuery({
            query: queries.moods,
            variables: { start, end }
          });

          const lastMood = data.moods.slice(-1);
          if (lastMood[0].date.startsWith(date)) {
            data.moods.splice(-1, 1, setMood);
          } else {
            data.moods.push(setMood);
          }

          proxy.writeQuery({
            query: queries.moods,
            variables: { start, end },
            data
          });
          this.props.data.startPolling(POLL_INTERVAL);
        } catch (err) {
          console.error(err);
        }
      }
    });
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
        {moods && <MoodGraph moods={moods} />}
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
