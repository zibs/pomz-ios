/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// 'use strict';
var React = require("react-native");

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  PushNotificationIOS,
  WebView,
  View
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class iozpomz extends Component {
  displaySignUp(token) {
    return(
      <SignUpForm push_token={token} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {PushNotificationIOS.requestPermissions()};

          {PushNotificationIOS.addEventListener('register', function(token) {
            console.log('You are registered and the device token is: ', token);
            })}
            
          {PushNotificationIOS.addEventListener('notification', function(notification){
            console.log('You have received a new notification!', notification);
            })}
        </Text>
      </View>
    );
  }
}



AppRegistry.registerComponent('iozpomz', () => iozpomz,'SignUpForm', () => SignUpForm);
