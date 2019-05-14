import React from 'react';
import { Switch, AsyncStorage, ScrollView } from 'react-native';
import FullLoading from '../../components/FullLoading';
import {
  Body,
  Heading,
  Wrapper,
  Row,
  Spacer,
  Scroll,
  Input,
  Button
} from '../../components/styled';

export default class CreateHabit extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };

  state = {
    title: '',
    description: '',
    starred: false,
    error: null
  };

  _change = (type, value) => {
    this.setState({
      [type]: value,
      error: null
    });
  };
  _getErrorMessage = () => {
    const { title, description } = this.state;
    if (!title && !description) {
      return 'Fields are mandatory';
    }
    if (!title) {
      return 'Title is missing';
    }
    if (!description) {
      return 'Description is missing';
    }
  };

  _goToRegister = () => {
    this.props.navigation.navigate('Register');
  };

  _createHabit = async () => {
    console.log('create habit');
    const { title, description, starred } = this.state;
    if (!title || !description) {
      const error = this._getErrorMessage();
      return this.setState({
        error
      });
    }

    try {
      const { data } = await this.props.createHabit({
        variables: {
          id: '',
          title,
          description,
          starred
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createHabit: {
            __typename: 'Habit',
            id: Math.random().toString(), // uuid
            title,
            description,
            starred,
            habits: []
          }
        }
      });

      this.props.navigation.goBack();
    } catch (err) {
      this.setState({
        error:
          err.graphQLErrors.length > 0
            ? err.graphQLErrors[0].message
            : 'Something went wrong.'
      });
    }
  };

  _renderCreateHabitForm = () => {
    return (
      <Wrapper>
        <Heading left large>
          CREATE HABIT
        </Heading>
        <Body left placeholder tiny>
          Title
        </Body>
        <Input
          defaultValue={this.state.title}
          onChangeText={e => this._change('title', e)}
        />
        <Body left placeholder tiny>
          Description
        </Body>
        <Input
          multiline={true}
          defaultValue={this.state.description}
          onChangeText={e => this._change('description', e)}
        />
        <Body left placeholder tiny>
          Favorite Habit?
        </Body>
        <Switch
          value={this.state.starred}
          onValueChange={() => this._change('starred', !this.state.starred)}
          trackColor={this.props.theme.colors.primary}
        />
        <Spacer big>
          {this.state.error && (
            <Body error noMargin>
              {this.state.error}
            </Body>
          )}
        </Spacer>

        <Body placeholder noMargin>
          {JSON.stringify(this.state, null, 2)}
        </Body>
        <Button onPress={this._createHabit} primary huge>
          <Body white center noMargin>
            CREATE HABIT
          </Body>
        </Button>
      </Wrapper>
    );
  };

  render() {
    if (this.props.createHabit.loading) {
      return <FullLoading />;
    }
    return <Scroll>{this._renderCreateHabitForm()}</Scroll>;
  }
}
