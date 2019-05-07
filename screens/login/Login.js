import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { USER_ACCESS_TOKEN } from '../../constants/auth';
import { MonoText } from '../../components/StyledText';
import Colors from '../../constants/Colors';
import FullLoading from '../../components/loading/FullLoading';
import { Body, Heading } from '../../components/styled';

export default class Login extends React.Component {
    state = {
        email: 'mironcatalin@gmail.com',
        password: 'password',
        isLoading: false,
        error: null
    };

    _change = (type, value) => {
        this.setState({
            [type]: value,
            error: null
        });
    };

    _getErrorMessage = () => {
        const { email, password } = this.state;
        if (!email && !password) {
            return 'Fields are mandatory';
        }
        if (!email) {
            return 'Email is missing';
        }
        if (!password) {
            return 'Password is missing';
        }
    };

    _login = async () => {
        console.log('login');
        const { email, password } = this.state;
        if (!email || !password) {
            const error = this._getErrorMessage();
            return this.setState({
                error
            });
        }
        await this.setState({
            isLoading: true
        });

        try {
            const { data } = await this.props.login({
                variables: {
                    email,
                    password
                }
            });
            if (data && data.login && data.login.token) {
                await AsyncStorage.setItem(USER_ACCESS_TOKEN, data.login.token);
                return this.props.navigation.navigate('App');
            }
        } catch (err) {
            this.setState({
                isLoading: false,
                error: err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : 'Something went wrong.'
            });
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        width: 260,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}
                >
                    <Heading xxxlarge center>
                        UZUAL
                    </Heading>
                    <Body xHuge faded center>
                        Feed your brain with habits for a better mood
                    </Body>
                    <Body left placeholder tiny>
                        Email
                    </Body>
                    <TextInput
                        defaultValue={this.state.email}
                        autoCapitalize={'none'}
                        onChangeText={e => this._change('email', e.toLowerCase())}
                        style={{
                            height: 40,
                            borderBottomColor: Colors.grey,
                            borderBottomWidth: 1,
                            width: 260,
                            fontFamily: 'space-mono',
                            marginBottom: 40
                        }}
                    />
                    <Body left placeholder tiny>
                        Password
                    </Body>
                    <TextInput
                        defaultValue={this.state.password}
                        secureTextEntry
                        onChangeText={e => this._change('password', e)}
                        style={{
                            height: 40,
                            borderBottomColor: Colors.grey,
                            borderBottomWidth: 1,
                            width: 260,
                            fontFamily: 'space-mono',
                            marginBottom: 40
                        }}
                    />
                    {this.state.error && <Body error>{this.state.error}</Body>}
                    <TouchableOpacity
                        onPress={this._login}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.primary,
                            width: 260,
                            height: 50,
                            marginTop: 50
                        }}
                    >
                        <Body white center noMargin>
                            LOGIN
                        </Body>
                    </TouchableOpacity>
                </View>
                {this.state.isLoading && (
                    <FullLoading
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: 'rgba(255,255,255,0.9)'
                        }}
                    />
                )}
            </View>
        );
    }
}
