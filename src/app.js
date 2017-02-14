import React, { Component } from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginFrom from './components/LoginForm';

class App extends Component {
  state = { isLoggedIn: null };

  componentWillMount() {
    Firebase.initializeApp({
      apiKey: 'AIzaSyAMYp8FEchNI-BFTh5tr_NXm2O4aHaU0y0',
      authDomain: 'authentication-8a151.firebaseapp.com',
      databaseURL: 'https://authentication-8a151.firebaseio.com',
      storageBucket: 'authentication-8a151.appspot.com',
      messagingSenderId: '664621712349'
    });

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.isLoggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => { Firebase.auth().signOut(); }}>Log out</Button>
          </CardSection>
        );
      case false:
        return <LoginFrom />;
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
