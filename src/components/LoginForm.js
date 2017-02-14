import React, { Component } from 'react';
import { Text } from 'react-native';
import Firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginFrom extends Component {
  state = { email: '', password: '', error_message: '', loading: false }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error_message: '', loading: true });

    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ loading: false, error_message: 'Authentication Failed.' });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error_message: 'Successfully logged in.',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={'user@gmail.com'}
            label={'Email: '}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder={'password'}
            label={'Password: '}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>{this.state.error_message}</Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center'
  }
};

export default LoginFrom;
