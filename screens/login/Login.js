import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Button,AsyncStorage } from "react-native";
import { USER_ACCESS_TOKEN } from "../../constants/auth";
import { MonoText } from "../../components/StyledText";
import Colors from "../../constants/Colors";
import FullLoading from "../../components/loading/FullLoading";

export default class Login extends React.Component {
  state = {
    email: 'mironcatalin@gmail.com',
    password: 'password',
    isLoading: false
  }

  _change = (type, value) => {
    this.setState({
      [type]: value
    });
  }

  _login = () => {
    console.log('login')
    const {email, password} = this.state;
    if (!email || !password) {
      return ''
    }
    this.setState({
      isLoading: true
    }, () => {
      this.props
        .login({
          variables: {
            email,
            password
          }
        })
        .then(({data: {login: {token}}}) => {
          return AsyncStorage.setItem(USER_ACCESS_TOKEN, token)
        })
        .then(() => {
          this.props.navigation.navigate("App");
        })
        .catch(err => {
          console.log(err)
          this.setState({
            isLoading: false
          })
        });
    })
  }

  render() {
    return <View style={{ flex: 1 }}>
      <View style={{flex: 1, width: 260, alignItems: "center", justifyContent: "center", alignSelf: "center"}}>
      <MonoText style={{fontFamily: "Menlo", fontSize: 52}}>UZUAL</MonoText>
      <MonoText style={{fontSize: 12, color: Colors.midGrey, marginBottom: 60, textAlign:"center"}}>Feed your brain with habits for a better mood</MonoText>
      <MonoText style={{alignSelf: "flex-start", marginBottom: 10, color: Colors.grey}}>Email</MonoText>
      <TextInput defaultValue={this.state.email} autoCapitalize={"none"} onChangeText={(e) => this._change('email', e.toLowerCase())} style={{height: 40, borderBottomColor: Colors.grey, borderBottomWidth:1, width: 260, fontFamily: 'space-mono', marginBottom: 40}}/>
      <MonoText style={{alignSelf: "flex-start", marginBottom: 10, color: Colors.grey}}>Password</MonoText>
      <TextInput defaultValue={this.state.password} secureTextEntry onChangeText={(e) => this._change('password', e)} style={{height: 40, borderBottomColor: Colors.grey, borderBottomWidth:1 , width: 260, fontFamily: 'space-mono', marginBottom: 40}}/>
      <TouchableOpacity onPress={this._login} style={{alignItems: "center", justifyContent: "center", backgroundColor: Colors.primary, width: 260, height: 50, marginTop: 50}}>
        <MonoText style={{color: Colors.white}}>LOGIN</MonoText>
      </TouchableOpacity>
      </View>
      {this.state.isLoading && <FullLoading style={{...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255,255,255,0.9)"}}/>}
    </View>
  }
}