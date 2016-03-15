/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

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
import Radio, {RadioButton} from 'react-native-simple-radio-button';

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

class RequestPushNotifications extends Component {

  sendtoRadio(token){
    this.props.renderView(<RadioButtonSignUpForm device_token={token}  />);
  }
  pushRequest(){
    PushNotificationIOS.requestPermissions();
  }
  pushToken(){
    PushNotificationIOS.addEventListener('register', function(token) {
      return token;
    }.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
        {this.pushRequest()}
        {this.sendtoRadio(this.pushToken())}
        <Text>
        </Text>
      </View>
    );
  }
}
var radio_props = [
  {label: 'daily', value: 0 },
  {label: 'yearly', value: 2 },
  {label: 'random', value: 3 }
];
class RadioButtonSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0, push_token: this.props.token};
  }
  render(){
    return(
      <Radio
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value});}}
        />
    );
  }
}

class iozpomz extends Component {
  constructor(props) {
    super(props);
    this.state = { mainView: <View></View> };
  }
  renderView(template) {
    this.setState({mainView: <RadioButtonSignUpForm /> });
  }
  componentDidMount() {

    this.setState({mainView: <RequestPushNotifications renderView={this.renderView.bind(this)}/> });
  }
  displaySignUp(token) {
    return(
      <SignUpForm push_token={token} />
    );
  }
  render() {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(this.state.mainView);
    return (
      <View style={styles.container}>
          {this.state.mainView}
      </View>
    );
  }
}

// how to pass token to rails app
// get request with device token in the API

// view is state?

// states:?
//1. Register for Push Notifications.
//2. if yes render login form.
//3. then display wait for poem countdown page

AppRegistry.registerComponent('iozpomz', () => iozpomz, 'SignUpForm', () => SignUpForm, 'RequestPushNotifications', () => RequestPushNotifications);

  // {PushNotificationIOS.addEventListener('notification', function(notification){
  //   console.log('You have received a new notification!', notification);
  //   })}
