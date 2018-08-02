'use strict';

exports.__esModule = true;

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
    constructor(props) {
        super(props);
        this.div = _leaflet.DomUtil.create('div', 'rlglc-wrap');
    }

    createLeafletElement(props) {
        const RLGLC = _leaflet.Control.extend({
            onAdd: map => this.div,
            onRemove: map => {}
        });
        return new RLGLC(props);
    }

    renderReactComponent() {
        _reactDom2.default.render(_react2.default.createElement(_RLGroupedLayerControlRC2.default, this.props), this.div);
    }

    componentDidMount() {
        super.componentDidMount();
        this.renderReactComponent();
    }

    componentDidUpdate(...a) {
        super.componentDidUpdate(...a);
        this.renderReactComponent();
    }

    render() {
        return null;
    }
}
exports.default = ReactLeafletGroupedLayerControl;