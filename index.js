'use strict';

var React = require('react-native');
var { once } = require('./utils');
var {
  Animated,
  Children,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  cloneElement
} = React;

var onLayout = once(function(e) {
  this.setState({layout: e.nativeEvent.layout})
});

var Option = React.createClass({
  propTypes: {
    /**
     * This will be displayed as the label text for
     * this option.
     */
    children: React.PropTypes.string.isRequired,
    /**
     * Mark the default option with `default={true}`.
     */
    default: React.PropTypes.bool,
    /**
     * These styles will be applied to option container and
     * will overwrite default styles.
     */
    style: View.propTypes.style,
    /**
     * These styles will be applied to the options label
     * text and will overwrite default styles.
     */
    textStyle: Text.propTypes.style,
    /**
     * The actual option value.
     */
    value: React.PropTypes.string.isRequired
  },

  render() {
    var { style, textStyle, children } = this.props;
    return (
      <View style={[styles.option, style]}>
        <Text style={[styles.optionText, textStyle]}>{children}</Text>
      </View>
    );
  }
});

var Select = React.createClass({
  propTypes: {
    /**
     * Pass the options you want to show as children
     * to the Select component.
     */
    children: React.PropTypes.arrayOf(React.PropTypes.element),
    /**
     * This prop is not required but recommended. Pass the
     * layout of the `Select` parent element to enable open
     * and close animations. In some cases this is necessary
     * to get a corrent representation of the options overlay.
     *
     * ### Example
     *
     * ```
     *  <View onLayout={({nativeEvent: e}) =>
     *    this.setState({layout: e.layout})}
     *  >
     *    <Select parentLayout={this.state.layout}>
     *      <Option value="option_1">Option 1</Option>
     *      // ...
     *    </Select>
     *  </View>
     * ```
     */
    parentLayout: React.PropTypes.shape({
      height: React.PropTypes.number.isRequired,
      width: React.PropTypes.number.isRequired
    }),
    /**
     * Assign a label to the selection button. The label
     * will be displayed nearby the current selected value.
     */
    label: React.PropTypes.string,
    /**
     * Assign a function which will be called when the user
     * selects an option. Example: `onSelect={(value) => ...}`
     */
    onSelect: React.PropTypes.func,
    /**
     * These styles will be applied to the slected text
     * label and will overwrite the default styles.
     */
    selectedTextStyle: Text.propTypes.style
  },

  getInitialState() {
    var { children } = this.props;
    var defaultOption = children.find((child) => !!child.props.default);
    return {
      open: false,
      openVal: new Animated.Value(0),
      selected: defaultOption || children[0]
    };
  },

  _open() {
    this.setState({open: true})
    Animated.timing(this.state.openVal, {
      toValue: 1, duration: 200, easing: Easing.elastic()
    }).start();
  },

  _close() {
    Animated.timing(this.state.openVal, {
      toValue: 0, duration: 200, easing: Easing.out(Easing.elastic())
    }).start(() => this.setState({open: false}));
  },

  _select(selected) {
    this.setState({selected});
    this.props.onSelect && this.props.onSelect(selected.props.value);
    this._close();
  },

  _renderToggle() {
    var { open, selected } = this.state;
    var { label, selectedTextStyle } = this.props;
    var textStyle = [styles.selected, selectedTextStyle, {fontSize: 14}];
    return (
      <TouchableOpacity onPress={open ? this._close : this._open}>
        {open ? (<Text style={styles.closeButtonText}>×</Text>) : (
          <View style={styles.selectButton}>
            <Text>{label}</Text>
            {cloneElement(selected, {textStyle})}
          </View>
        )}
      </TouchableOpacity>
    );
  },

  _renderOptions() {
    var { children, selectedTextStyle } = this.props;
    var { value: selectedValue } = this.state.selected.props;
    var textStyle = [styles.selected, selectedTextStyle];
    return (
      <View style={styles.options}>
        {children.map((child, i) => child.props.value === selectedValue ?
          cloneElement(child, {key: i, textStyle}) : (
            <TouchableOpacity key={i} onPress={() => this._select(child)}>
              {child}
            </TouchableOpacity>
          )
        )}
      </View>
    );
  },

  render() {
    var { layout, open, openVal: val } = this.state;
    var { parentLayout: parent } = this.props;

    if (open && parent) {
      var { x, y } = layout;
      var openStyle = [styles.open, {
        height: val.interpolate({inputRange: [0, 1], outputRange: [0, parent.height]}),
        left: val.interpolate({inputRange: [0, 1], outputRange: [x, 0]}),
        top: val.interpolate({inputRange: [0, 1], outputRange: [y, 0]}),
        width: val.interpolate({inputRange: [0, 1], outputRange: [0, parent.width]}),
        borderRadius: val.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0]
        })
      }];
    }

    return (
      <Animated.View style={openStyle} onLayout={onLayout.bind(this)}>
        {this._renderToggle()}
        {open && this._renderOptions()}
      </Animated.View>
    );
  }
});

var styles = StyleSheet.create({
  open: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
    borderRadius: 0,
    bottom: 0,
    flexDirection: 'column',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0
  },
  options: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    padding: 20
  },
  selectButton: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  closeButtonText: {
    alignSelf: 'flex-end',
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 5,
    marginRight: 10
  },
  optionText: {
    fontSize: 16,
    margin: 5
  },
  selected: {
    fontWeight: 'bold'
  }
});

module.exports = { Option, Select };
