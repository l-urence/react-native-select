/**
 * Sample React Native Select
 * https://github.com/l-urence/react-native-select
 */

'use strict';

var React = require('react-native');
var { Option, Select } = require('react-native-select');
var { AppRegistry, StyleSheet, View } = React;

var SelectExample = React.createClass({
  getInitialState() {
    return { layout: undefined };
  },

  render: function() {
    return (
      <View style={styles.container} onLayout={({nativeEvent: e}) =>
        this.setState({layout: e.layout})}
      >
        <Select parentLayout={this.state.layout} label="Character:">
          <Option value="han">Han Solo</Option>
          <Option value="leia">Princess Leia Organa</Option>
          <Option value="luke">Luke Skywalker</Option>
          <Option value="obiwan" default={true}>Obi-Wan Kenobi</Option>
        </Select>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20
  }
});

AppRegistry.registerComponent('SelectExample', () => SelectExample);
