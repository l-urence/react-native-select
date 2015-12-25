# react-native-select
react-native-select lets you similar to html `<select>` choose one option between a set of other options.

![Slider Examples](https://github.com/l-urence/react-native-select/blob/master/example.gif)

## How to use react-native-select
Before you can use the component install it with npm:

```shell
npm i --save react-native-select
```

or install it from github.com:

```
npm i —save l-urence/react-native-select
```

Here is a small example of react-native-select:

```javascript
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
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('SelectExample', () => SelectExample);
```

## react-native-select props
### Select
| Prop | Type | Description |
:------------ |:---------------:| :-----|
| children | Option | Set of options to display |
| parentLayout | object | The layout of the parent element needs to be set for open / close animation |
| label | string | A label for the `Select` element |
| onSelect | function | Will be called when selection changes `onSelect={(value) => /* ... */}` |
| selectedTextStyle | styleSheet | The style for the selected option text |
### Option
| Prop | Type | Description |
:------------ |:---------------:| :-----|
| children | string | The option text which will be displayed |
| default | bool | The option which will be displayed as selected |
| style | styleSheet | Styles will be applied to the option container |
textStyle | styleSheet | Styles will be applied to to option text |
| value | string | The actual option value |



