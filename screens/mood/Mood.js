import React from 'react';
import FullLoading from '../../components/FullLoading';
import { Body, Heading, Wrapper, Scroll } from '../../components/styled';

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
        <Body>01/03/2019 - 30/03/2019</Body>
        <Wrapper left>
          {moods.map(mood => {
            return (
              <Body key={mood.id}>
                {new Date(mood.date).toLocaleDateString()} - {mood.type}
              </Body>
            );
          })}
        </Wrapper>
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
