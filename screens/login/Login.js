import React from "react";
import { TouchableOpacity, View, Text, TextInput, Button,AsyncStorage } from "react-native";
import { USER_ACCESS_TOKEN } from "../../constants/auth";
import { MonoText } from "../../components/StyledText";

export default class Login extends React.Component {
  state = {
    email: 'mironcatalin@gmail.com',
    password: 'password'
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
        });
  }

  render() {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: 260, alignSelf: "center" }}>
      <MonoText style={{fontFamily: "Menlo", fontSize: 42}}>UZUAL</MonoText>
      <MonoText style={{fontSize: 12, color: 'rgba(0,0,0,0.2)', marginBottom: 60, textAlign:"center"}}>Feed your brain with habits for a better mood</MonoText>
      <MonoText style={{alignSelf: "flex-start", marginBottom: 10, color: 'rgba(0,0,0,0.4)',}}>Email</MonoText>
      <TextInput defaultValue={this.state.email} autoCapitalize={"none"} onChangeText={(e) => this._change('email', e.toLowerCase())} style={{height: 40, borderBottomColor: "#d3d3d3", borderBottomWidth:2 , width: 260, fontFamily: 'space-mono', marginBottom: 40}}/>
      <MonoText style={{alignSelf: "flex-start", marginBottom: 10, color: 'rgba(0,0,0,0.4)',}}>Password</MonoText>
      <TextInput defaultValue={this.state.password} secureTextEntry onChangeText={(e) => this._change('password', e)} style={{height: 40, borderBottomColor: "#d3d3d3", borderBottomWidth:2 , width: 260, fontFamily: 'space-mono', marginBottom: 40}}/>
      <TouchableOpacity onPress={this._login} style={{alignItems: "center", justifyContent: "center", backgroundColor: 'turquoise', width: 260, height: 50, marginTop: 50}}>
        <MonoText style={{color: "#fff"}}>LOGIN</MonoText>
      </TouchableOpacity>
    </View>
  }
}