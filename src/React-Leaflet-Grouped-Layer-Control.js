'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.__esModule = true;

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

require('./react-leaflet-grouped-layer-control.css');

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLeaflet = require('react-leaflet');

var _RLGroupedLayerControlRC = require('./RL-Grouped-Layer-Control-RC');

var _RLGroupedLayerControlRC2 = _interopRequireDefault(_RLGroupedLayerControlRC);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var ReactLeafletGroupedLayerControl = function (_reactLeaflet$MapCont) {
    _inherits(ReactLeafletGroupedLayerControl, _reactLeaflet$MapCont);

    function ReactLeafletGroupedLayerControl(props, context) {
        _classCallCheck(this, ReactLeafletGroupedLayerControl);

        var _this = _possibleConstructorReturn(this, (ReactLeafletGroupedLayerControl.__proto__ || Object.getPrototypeOf(ReactLeafletGroupedLayerControl)).call(this, props));

        _this.div = _leaflet.DomUtil.create('div', 'rlglc-wrap');
        _this.map = context.map || props.leaflet.map;
        return _this;
    }

    _createClass(ReactLeafletGroupedLayerControl, [{
        key: 'createLeafletElement',
        value: function createLeafletElement(props) {
            var _this2 = this;

            var RLGLC = _leaflet.Control.extend({
                onAdd: function onAdd(map) {
                    return _this2.div;
                },
                onRemove: function onRemove(map) {}
            });
            return new RLGLC(props);
        }
    }, {
        key: 'renderReactComponent',
        value: function renderReactComponent() {
            _reactDom2.default.render(_react2.default.createElement(_RLGroupedLayerControlRC2.default, _extends({}, this.props, { map: this.map })), this.div);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(ReactLeafletGroupedLayerControl.prototype.__proto__ || Object.getPrototypeOf(ReactLeafletGroupedLayerControl.prototype), 'componentDidMount', this).call(this);
            this.renderReactComponent();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, SS) {
            _get(ReactLeafletGroupedLayerControl.prototype.__proto__ || Object.getPrototypeOf(ReactLeafletGroupedLayerControl.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState, SS);
            // ReactDOM.unmountComponentAtNode(this.div);
            this.renderReactComponent();
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return ReactLeafletGroupedLayerControl;
}(_reactLeaflet.MapControl);

exports.default = ReactLeafletGroupedLayerControl;
