var React = require('react-native');
var {
  StyleSheet,
} = React;

var Style = StyleSheet.create({
  radioForm: {
  },

  radioWrap: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    borderColor: '#535a60',
    borderWidth: 3,
    borderRadius: 30,
  },

  radioLabel: {
    // backgroundColor: "red",
    marginTop: 30,
    marginBottom: 30,
    paddingLeft: 15,
    lineHeight: 30,
  },

  radioActive: {
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: '#535a60',
  },

  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },

  labelVertical: {
    paddingLeft: 0,
  },

  formHorizontal: {
    flexDirection: 'row',
  },
});

module.exports = Style;
