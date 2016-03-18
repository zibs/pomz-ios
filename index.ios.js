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
  View,
  WebView,
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
  webView: {
   backgroundColor: "rgba(255,255,255,0.8)",
   height: 350,
   width: 300,
 },
 poemWaiter: {
   backgroundColor: "rgba(104, 185, 155, 0.7)",
   lineHeight: 50,
   fontSize: 30,
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
        console.warn(error);
      });
   }
  render(){
    {console.log(this.state);}
    return(
      <Radio
          radio_props={radio_props}
          initial={0}
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
class CountDownPoem extends Component {
  constructor(props){
    super(props);
    this.state = {hours: 0, minutes: 0, seconds: 0 };
  }
  tick() {
    let hoursTillMidnight =  numToWord[(24 - (new Date().getHours())).toString()];
    let minutesInHour =  numToWord[(60 - (new Date().getMinutes())).toString()];
    let secondsInMinute =  numToWord[(60 - (new Date().getSeconds())).toString()];
    this.setState({
        hours: hoursTillMidnight,
        minutes: minutesInHour,
        seconds: secondsInMinute
      });
  }
  componentDidMount() {
    this.interval = setInterval(function() {
                      this.tick();
                    }.bind(this), 1000);
    }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return(
      <Text style={styles.poemWaiter}>a nu 1 in {"\n"}
            {this.state.hours} hours {"\n"}
            {this.state.minutes} minutes {"\n"}
            {this.state.seconds} seconds {"\n"}
      </Text>
    );
  }
}


class PoemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.poemUrl,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
    };
  }
  render() {
    return(
      <WebView
          ref='webview'
          style={styles.webView}
          automaticallyAdjustContentInsets={false}
          source={{uri: this.state.url}}
          scalesPageToFit={this.state.scalesPageToFit}
          startInLoadingState={true}
          />
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
    // display poem on cold-launch
    const notification = PushNotificationIOS.popInitialNotification();
    if (notification){
      this.setState({mainView: <PoemView poemUrl={notification._data.poem_url} renderNewView={this.renderNewView.bind(this)}/>});
    }
    // check if permissions are enabled for push.
    PushNotificationIOS.checkPermissions(function(permissions){
      if (permissions.badge === 0) {
        this.setState({mainView: <RequestPushNotifications renderNewView={this.renderNewView.bind(this)}/>
        });
      }
    // app is otherwise open - display poem upon push notification.
      else {
        PushNotificationIOS.addEventListener('notification', function(notification){
          this.setState({mainView: <PoemView poemUrl={notification._data.poem_url} />});
        }.bind(this));
      }
    }.bind(this));
    // finally, display countdown poem page since the user has already seen the poem.
    this.setState({mainView: <CountDownPoem />});
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.mainView}
      </View>
    );
  }
}

AppRegistry.registerComponent('iozpomz', () => iozpomz, 'RadioButtonSignUpForm', () => RadioButtonSignUpForm, 'RequestPushNotifications', () => RequestPushNotifications, 'PoemView', () => PoemView);

const numToWord = {
      0: "zero",
       1: "one",
       2: "two",
       3: "three",
       4: "four",
       5: "five",
       6: "six",
       7: "seven",
       8: "eight",
       9: "nine",
       10: "ten",
       11: "eleven",
       12: "twelve",
       13: "thirteen",
       14: "fourteen",
       15: "fifteen",
       16: "sixteen",
       17: "seventeen",
       18: "eighteen",
       19: "nineteen",
       20: "twenty",
       21: "twenty-one",
       22: "twenty-two",
       23: "twenty-three",
       24: "twenty-four",
       25: "twenty-five",
       26: "twenty-six",
       27: "twenty-seven",
       28: "twenty-eight",
       29: "twenty-nine",
       30: "thirty",
       31: "thirty-one",
       32: "thirty-two",
       33: "thirty-three",
       34: "thirty-four",
       35: "thirty-five",
       36: "thirty-six",
       37: "thirty-seven",
       38: "thirty-eight",
       39: "thirty-nine",
       40: "forty",
       41: "forty-one",
       42: "forty-two",
       43: "forty-three",
       44: "forty-four",
       45: "forty-five",
       46: "forty-six",
       47: "forty-seven",
       48: "forty-eight",
       49: "forty-nine",
       50: "fifty",
       51: "fifty-one",
       52: "fifty-two",
       53: "fifty-three",
       54: "fifty-four",
       55: "fifty-five",
       56: "fifty-six",
       57: "fifty-seven",
       58: "fifty-eight",
       59: "fifty-nine",
       60: "sixty"
};

// { _data: { pom_url: 'http://localhost:3000/api/v1/poems/03-16-2016' },
//   _alert: 'a pom 4 u',
//   _sound: 'default',
//   _badgeCount: undefined }
