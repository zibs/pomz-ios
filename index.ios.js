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

var radio_props = [
  {label: 'daily', value: 'daily' },
  {label: 'yearly', value: 'yearly' },
  {label: 'random', value: 'random' }
];

class WaitForPoem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return(
      <Text> Cycle Complete ^_^ </Text>
    );
  }
}

class RadioButtonSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0, push_token: this.props.push_token};
  }
  signUpToApp(value) {
    // fetch("http://59038919.ngrok.com/api/v1/users/", {
    fetch("http://192.168.1.145:3000/api/v1/users/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: { push_frequency: value, push_token: this.state.push_token },
      })
    }).then((response) => response.text())
      .then((responseText) => {
        return this.props.renderNewView(<WaitForPoem renderNewView={this.props.renderNewView } />);
      })
      .catch((error) => {
        // display error component
        console.warn(error);
      });
   }
  render(){
    {console.log(this.state);}
    return(
      <Radio
          radio_props={radio_props}
          initial={0}
          /*onPress={(value) => {this.setState({value:value});}}*/
          onPress={ (value) => {this.signUpToApp(value);} }
        />
    );
  }
}

class RequestPushNotifications extends Component {
  constructor(props) {
    super(props);
  }
  sendtoRadioButtons(token){
    return this.props.renderNewView( <RadioButtonSignUpForm push_token={token} renderNewView={this.props.renderNewView.bind(this)}  />);
  }
  componentDidMount(){
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener('register', function(token) {
        this.sendtoRadioButtons(token);
      }.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
        </Text>
      </View>
    );
  }
}
class PoemView extends Component {
  constructor(props) {
    super(props);
    this.setState({});
  }
}

class iozpomz extends Component {
  constructor(props) {
    super(props);
    this.state = { mainView: <View></View> };
  }
  renderNewView(template) {
    this.setState({mainView: template });
  }
  componentDidMount() {
    PushNotificationIOS.checkPermissions(function(permissions){
      if (permissions.badge === 0) {
        this.setState({mainView: <RequestPushNotifications renderNewView={this.renderNewView.bind(this)}/>
        });
      }
      else {
        this.setState({mainView: <RadioButtonSignUpForm />
        });
        PushNotificationIOS.addEventListener('notification', function(notification){
          console.log(notification);
          console.log(notification._data.pom_url);
          console.log(notification._alert);
          // this.setState({mainView: <Text></Text>});
        });
      }
    }.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.mainView}
      </View>
    );
  }
}

AppRegistry.registerComponent('iozpomz', () => iozpomz, 'SignUpForm', () => SignUpForm, 'RequestPushNotifications', () => RequestPushNotifications);


// check what the push notification delivers
// I think have checked that? I can send the device token in the push notification?
//



// { _data: { pom_url: 'http://localhost:3000/api/v1/poems/03-16-2016' },
//   _alert: 'a pom 4 u',
//   _sound: 'default',
//   _badgeCount: undefined }
