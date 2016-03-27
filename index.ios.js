/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require("react-native");

var {
  AppStateIOS,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  PushNotificationIOS,
  View,
  Navigator,
  WebView,
} = React;

import Radio, {RadioButton} from 'react-native-simple-radio-button';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  webView: {
   backgroundColor: "rgba(255,255,255,0.8)",
   height: 350,
   width: 300,
 },
 poemWaiter: {
  //  backgroundColor: "rgba(104, 185, 155, 0.7)",
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
      this.state = {
        appState: AppStateIOS.currentState,
        viewed: false,
      };
  }
  viewedThanks(currentAppState){
    if (this.state.viewed) {
      this.props.navigator.push({
        name: "CountDownPoem",
        component: CountDownPoem
      });
    } else {
      return this.setState({viewed: true});
    }
  }
  componentDidMount(){
    AppStateIOS.addEventListener('change', this.viewedThanks.bind(this));
  }
  render(){
    return(
      <View style={styles.container}>
        <Text>Thanks, now wait.</Text>
      </View>

    );
  }
}

class RadioButtonSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 4};
  }
  signUpToApp(value) {
    // fetch("http://59038919.ngrok.com/api/v1/users/", {
    fetch("http://192.168.1.71:3000/api/v1/users/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: { push_frequency: value, push_token: this.props.push_token },
      })
    }).then((response) => response.text())
      .then((responseText) => {
        this.props.navigator.push({
          name: "WaitForPoem",
          component: WaitForPoem
        });
      })
      .catch((error) => {
        console.warn(error);
      });
   }
  render(){
    return(
      <View style={styles.container}>
        <Radio
          radio_props={radio_props}
          initial={this.state.value}
          onPress={ (value) => {this.signUpToApp(value);} }
        />
      </View>
    );
  }
}

class RequestPushNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {whyNot: 4};
  }
  sendtoRadioButtons(token){
    console.log("in the right methods");
    this.props.navigator.push({
      name: "RadioButtonSignUpForm",
      component: RadioButtonSignUpForm,
      props: { push_token: token }
    });
  }
  componentDidMount(){
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', function(token) {
    console.log(token);
    this.sendtoRadioButtons(token);
    }.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}
class CountDownPoem extends Component {
  constructor(props){
    super(props);
    this.state = {
        hours: this.props.hours,
        minutes: this.props.minutes,
        seconds: this.props.seconds,
    };
  }
  tick() {
    let hoursTillMidnight = numToWord[(24 - (new Date().getHours())).toString()];
    let minutesInHour =  numToWord[(60 - (new Date().getMinutes())).toString()];
    let secondsInMinute =  numToWord[(60 - (new Date().getSeconds())).toString()];
    this.setState({
        hours: hoursTillMidnight,
        minutes: minutesInHour,
        seconds: secondsInMinute
      });
  }
  componentWillMount() {
    this.interval = setInterval(function() {
                      this.tick();
                    }.bind(this), 1000);
    }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return(
      <Text style={styles.poemWaiter}>
        <Text>a nu 1 in {"\n"}</Text>
            <Text>{this.state.hours} hours, {"\n"}</Text>
            <Text>{this.state.minutes} minutes, {"\n"}</Text>
            <Text>{this.state.seconds} seconds {"\n"}</Text>
      </Text>
    );
  }
}

class PoemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppStateIOS.currentState,
      url: this.props.route.poemUrl,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
      viewed: false,
    };
  }
  viewablePoem(currentAppState){
    if (currentAppState === "background") {
      this.props.navigator.push({
        name: "CountDownPoem",
        component: CountDownPoem
      });
    }
  }
  componentDidMount(){
    AppStateIOS.addEventListener('change', this.viewablePoem.bind(this));
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
class appController extends Component {
  componentDidMount(){

        PushNotificationIOS.checkPermissions(function(permissions){
          if (permissions.badge === 0) {
            this.props.navigator.push({
              name: 'RequestPushNotifications',
              component: RequestPushNotifications,
            });
          }
          else if (permissions.badge >= 1 && notification === null) {
            this.props.navigator.push({
              name: "CountDownPoem",
              component: CountDownPoem,
              hours: numToWord[(24 - (new Date().getHours())).toString()],
              minutes: numToWord[(60 - (new Date().getMinutes())).toString()],
              seconds: numToWord[(60 - (new Date().getMinutes())).toString()]
            });
          }
        }.bind(this));

    const notification = PushNotificationIOS.popInitialNotification();
      if (notification){
        this.props.navigator.push({
          name: "PoemView",
          component: PoemView,
          poemUrl: notification._data.poem_url
        });
      }

    PushNotificationIOS.addEventListener('notification', function(notification){
        this.props.navigator.push({
          name: "PoemView",
          component: PoemView,
          poemUrl: notification._data.poem_url
          });
      }.bind(this));


    // app is otherwise open - display poem upon push notification.

  }
  render() {
    return (
      <View>
      </View>
    );
  }

}

class iozpomz extends Component {
  _renderScene(route, navigator) {
    var Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  }
  render() {
    return (
        <Navigator
          initialRoute={{
            name: "appController",
            component: appController
          }}
          configureScene={() => {
              return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={this._renderScene} />
    );
  }
}

AppRegistry.registerComponent('iozpomz', () => iozpomz, 'RadioButtonSignUpForm', () => RadioButtonSignUpForm, 'RequestPushNotifications', () => RequestPushNotifications, 'PoemView', () => PoemView);

// { _data: { pom_url: 'http://localhost:3000/api/v1/poems/03-16-2016' },
//   _alert: 'a pom 4 u',
//   _sound: 'default',
//   _badgeCount: undefined }


// (route, navigator) => {
//     if (route.component) {
//         return React.createElement(route.component, {
//           navigator: navigator
//
//         });
//     }
// }
