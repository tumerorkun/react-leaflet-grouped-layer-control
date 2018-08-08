'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./react-leaflet-grouped-layer-control.css');

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLeaflet = require('react-leaflet');

var _RLGroupedLayerControlRC = require('./RL-Grouped-Layer-Control-RC');

var _RLGroupedLayerControlRC2 = _interopRequireDefault(_RLGroupedLayerControlRC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReactLeafletGroupedLayerControl extends _reactLeaflet.MapControl {
    constructor(props, context) {
        super(props);
        this.div = _leaflet.DomUtil.create('div', 'rlglc-wrap');
        this.map = context.map || props.leaflet.map;
    }

    createLeafletElement(props) {
        const RLGLC = _leaflet.Control.extend({
            onAdd: map => this.div,
            onRemove: map => {}
        });
        return new RLGLC(props);
    }

    renderReactComponent() {
        _reactDom2.default.render(_react2.default.createElement(_RLGroupedLayerControlRC2.default, _extends({}, this.props, { map: this.map })), this.div);
    }

    componentDidMount() {
        super.componentDidMount();
        this.renderReactComponent();
    }

    componentDidUpdate(prevProps, prevState, SS) {
        super.componentDidUpdate(prevProps, prevState, SS);
        // ReactDOM.unmountComponentAtNode(this.div);
        this.renderReactComponent();
    }

    render() {
        return null;
    }
}
exports.default = ReactLeafletGroupedLayerControl;