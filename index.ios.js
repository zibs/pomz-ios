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

class RequestPushNotifications extends Component {
  constructor(props) {
    super(props);
    // this.state = ({device_token: 0});
  }
  sendtoRadio(token){
    return this.props.renderNewView( <RadioButtonSignUpForm device_token={token}  />);
  }
  componentDidMount(){
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener('register', function(token) {
        // this.setState({device_token: token});
        this.sendtoRadio(token);
      }.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {/*{After component did mount, it will have the correct state, and depending on that state, I could render the correct form?}*/}
          {console.log(this.props)}
          {console.log(this.state.device_token)}
        </Text>
      </View>
    );
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
        // console.log(typeof(permissions));
        this.setState({mainView: <RequestPushNotifications renderNewView={this.renderNewView.bind(this)}/>
        });
      }
      else {
        // we will render the wait for poem thing here.
        this.setState({mainView: <RadioButtonSignUpForm />
        });
      }
    }.bind(this));
    // this.setState({mainView: <RequestPushNotifications/>
    // });
  }
  // displaySignUp(token) {
  //   return(
  //     <SignUpForm push_token={token} />
  //   );
  // }
  render() {
    return (
      <View style={styles.container}>
        {console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")}
        {console.log(this.state)}
        {console.log("CURRENT STATE IS " + this.state )}
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
