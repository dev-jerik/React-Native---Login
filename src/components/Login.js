import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import { Constants } from 'expo';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      focusPassword: false
    };
    /*
      don’t store the reference with setState; doing so will cause an infinite loop.
    */
    this.inputs = {};
  }

  _focusNextField(key){
    this.inputs[key].focus();
  }

  _handleInputChange(input, name){
    this.setState({ [name]: input });
  }

  _validatePassword = () => {
    let passwordLength = this.state.password.length;
    let isSuccess = false;
    if (passwordLength < 6 || passwordLength > 12){
      this.setState({errorPassword: 'please use at least 6 - 12 characters!'});
    }else {
      this.setState({
        errorPassword: ''
      });
      isSuccess = true;
    }
    return isSuccess;
  }

  _validateEmail =()=>{
    let reg = /^([^_\-\.\@]+([A-Za-z0-9_\-\.])+[^_\-\.\@])+\@(([^_\-\.\@]+[A-Za-z0-9_\-\.])+[^_\-\.\@])+\.([A-Za-z]{2,4})$/
    let isSuccess = false;
    
    if(reg.test(this.state.email) === false){
      this.setState({errorEmail: 'not correct format for email address'});
    }else {
      this.setState({
        errorEmail: ''
      });
      isSuccess = true;
    }
    return isSuccess;
  }

  _handleSignin = () => {
    if (this._validateEmail() && this._validatePassword()){
      //Server request here
      Alert.alert(
      'Hooray!',
      'Successfully logged in.',
      );
    } else {
      /*
      *  Oopps!
      *  Logged in Failed.
      */
    }
  };

  render() {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image resizeMode='center' source={require("../../assets/logo.png")}/>
        </View>
        <View style={styles.loginFormContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.textInput}
            placeholder='Input email address'
            placeholderTextColor='rgba(225,225,225,0.7)'
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.email}
            onChangeText={(input) => {this._handleInputChange(input, 'email')}} 
            onBlur={this._validateEmail} 
            keyboardType='email-address'
            returnKeyType='next'
            blurOnSubmit={ false }
            onSubmitEditing={() => {
              this._focusNextField('password');
            }}
            ref={ input => {
              this.inputs['email'] = input;
            }}
          />
          <Text style={styles.textError}>{this.state.errorEmail}</Text>
          
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.textInput}
            placeholder='Input Password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.password}
            onChangeText={(input) => {this._handleInputChange(input, 'password')}} 
            onBlur={this._validatePassword} 
            secureTextEntry
            ref={ input => {
              this.inputs['password'] = input;
            }}
          />
          <Text style={styles.textError}>{this.state.errorPassword}</Text>

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.textInput}
            placeholder='Input Password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.password}
            onChangeText={(input) => {this._handleInputChange(input, 'password')}} 
            onBlur={this._validatePassword} 
            secureTextEntry
            ref={ input => {
              this.inputs['password'] = input;
            }}
          />
          <Text style={styles.textError}>{this.state.errorPassword}</Text>
          
          <TouchableOpacity style={styles.btnSignIn} 
                      onPress={this._handleSignin}>
              <Text  style={styles.buttonTextWhite}>Sign in</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   logoContainer:{
      flex: 1, justifyContent: 'center'
   },
   loginFormContainer:{
      flex: 1
   },
   textInput: {
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      padding: 8,
      color: '#000',
      borderColor: 'rgb(113, 77, 178)',
      borderWidth: 2,
      borderRadius: 4
   },
   label: {
     fontSize: 18,
   },
   textError: {
     color: 'red',
     fontStyle: 'italic',
     marginBottom: 10
   },
   btnSignIn:{
        backgroundColor: 'rgb(113, 77, 178)',
        paddingVertical: 15,
        borderRadius: 2,
        marginTop: 10
    },
    buttonTextWhite:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});

