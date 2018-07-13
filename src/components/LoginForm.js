import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Keyboard, 
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';
import { Card, Button, FormInput } from 'react-native-elements';
import { SpinnerModal } from './common/SpinnerModal';
import { emailChanged, passwordChanged, loginUser } from '../actions/Index';
import { connect } from 'react-redux';

class LoginForm extends React.Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
        BackHandler.exitApp();
    })
}

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    renderError() {
      if(this.props.error) {
      return (
          <View style={{backgroundColor: 'white'}}>
              <Text style={styles.errorTextStyle}>
                  {this.props.error}
              </Text>
          </View>
      );
  }
  }

  renderSpinner() {
      if(this.props.loading) {
          return (
              <SpinnerModal size='large' />
          )
      }
  }

  onButtonPress() {
      const { email, password } = this.props;
      this.props.loginUser({ email, password });
  }

  render () {

    return(

      <View
        style={{flex: 1, backgroundColor: '#FFFFFF'}}
      >

      <KeyboardAvoidingView
        //behavior="padding"
        style={styles.container}
      >

        <Card
          containerStyle={{padding: 5}}
        >

          <Text style={styles.headerTextStyle}> Welcome Back, </Text>

          <Text style={styles.descriptionTextStyle}> Please, Sign in to continue.</Text>

          <Text style={styles.textStyle}>
            Phone
          </Text>

          <FormInput
            placeholderTextColor="#007aff"
            onBlur={Keyboard.dismiss}
            containerStyle={{borderRadius: 5, borderWidth: 1, borderColor: "#007aff"}}
            inputStyle={{color: '#007aff', fontSize: 18, paddingLeft: 8}}
            underlineColorAndroid="transparent"
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
            placeholder="Enter email"
          />

          <Text style={styles.textStyle}>
            Password
          </Text>

          <FormInput
            placeholderTextColor="#007aff"
            secureTextEntry
            onBlur={Keyboard.dismiss}
            containerStyle={{borderRadius: 5, borderWidth: 1, borderColor: "#007aff"}}
            inputStyle={{color: '#007aff', fontSize: 18, paddingLeft: 8}}
            underlineColorAndroid="transparent"
            value={this.props.password}
            placeholder="Enter your Password"
            onChangeText={this.onPasswordChange.bind(this)}
          />

          {this.renderError()}

          <Button
            title="Sign In"
            textStyle={{color: '#fff', fontSize: 20}}
            buttonStyle={{backgroundColor: '#007aff', borderRadius: 7, marginTop: 15, marginBottom: 20 }}
            color='#007aff'
            onPress={this.onButtonPress.bind(this)}
          />

          {this.renderSpinner()}

        </Card>

      </KeyboardAvoidingView>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStyle: {
    fontSize: 20,
    fontWeight: '400',
    paddingBottom: 20,
    marginTop: 20,
    paddingLeft: 15,
    color: '#007aff'
  },

  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingLeft: 3,
    paddingTop: 10,
    color: '#000'
},
descriptionTextStyle: {
    fontWeight: '100',
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 10,
    color: '#74777c'
},
errorTextStyle: {
  paddingTop: 15,
  fontSize: 20,
  alignSelf: 'center',
  color: 'red'
}

})

const mapStateToProps = ({ auth }) => {    //called with global application level state
    
    const { email, password, error, loading } = auth;

    return{ email, password, error, loading };
}

export default connect(mapStateToProps, {
    emailChanged, 
    passwordChanged,
    loginUser
})(LoginForm);