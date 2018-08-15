'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Props:
 *  baseLayers
 *  checkhedBaseLayer
 *  overlays
 *  exclusiveGroups
 *  onBaseLayerChange
 *  onOverlayChange
 */

var RLGroupedLayerControlRC = function (_react2$default$Compo) {
    _inherits(RLGroupedLayerControlRC, _react2$default$Compo);

    function RLGroupedLayerControlRC(props) {
        _classCallCheck(this, RLGroupedLayerControlRC);

        var _this = _possibleConstructorReturn(this, (RLGroupedLayerControlRC.__proto__ || Object.getPrototypeOf(RLGroupedLayerControlRC)).call(this, props));

        _this.listItem = _this.listItem.bind(_this);
        _this.reduceWithProps = _this.reduceWithProps.bind(_this);
        _this.baseLayerChange = _this.baseLayerChange.bind(_this);
        _this.state = { open: false };
        _this.groups;
        _this.id = Math.ceil(Math.random() * 1000);
        return _this;
    }

    /**
     * Events
     */


    _createClass(RLGroupedLayerControlRC, [{
        key: 'mainDivMouseEnter',
        value: function mainDivMouseEnter(e) {
            this.state.open || this.setState({ open: true });
        }
    }, {
        key: 'mainDivMouseLeave',
        value: function mainDivMouseLeave(e) {
            this.setState({ open: false });
        }
        // Events End

    }, {
        key: 'reduceWithProps',
        value: function reduceWithProps() {
            var _this2 = this;

            this.groups = this.props.overlays && this.props.overlays.reduce(function (a, b) {
                if (typeof a[b.groupTitle] === 'undefined') {
                    a[b.groupTitle] = {
                        exclusive: undefined,
                        groupItems: []
                    };
                }
                if (typeof a[b.groupTitle]['exclusive'] === 'undefined') {
                    if (_this2.props.exclusiveGroups && _this2.props.exclusiveGroups.includes(b.groupTitle)) {
                        a[b.groupTitle]['exclusive'] = true;
                    } else {
                        a[b.groupTitle]['exclusive'] = false;
                    }
                }
                a[b.groupTitle]['groupItems'].push(b);
                return a;
            }, { init: true });
            this.groupTitles = this.props.overlays && [].concat(_toConsumableArray(new Set(this.props.overlays.map(function (e) {
                return e.groupTitle;
            }))));
        }
    }, {
        key: 'groupContainer',
        value: function groupContainer(groupTitle, groupElemans, key) {
            return _react2.default.createElement('div', { key: key, className: 'rlglc-group' }, groupTitle, groupElemans);
        }
    }, {
        key: 'listItem',
        value: function listItem(groupName, e, checked, type, onClick) {
            return _react2.default.createElement('label', { htmlFor: e.name + '-' + this.id, key: e.name + '-' + this.id, className: 'rlglc-option' }, _react2.default.createElement('input', { name: groupName + '-' + this.id, 'data-layername': e.name, id: e.name + '-' + this.id, className: 'rlglc-input', type: type,
                defaultChecked: checked,
                onClick: onClick || function () {}
            }), _react2.default.createElement('span', { className: 'rlglc-title' }, e.title));
        }
    }, {
        key: 'overlayChanged',
        value: function overlayChanged(exclusive, event) {
            var _this3 = this;

            var overlays = [].concat(_toConsumableArray(this.props.overlays));
            var id = event.target.getAttribute('data-layername');
            var newOverlays = void 0;
            if (exclusive === 'exclusive') {
                // event.target true other items in exclusive group is false
                newOverlays = overlays.map(function (overlay, index) {
                    if (overlay.groupTitle + '-' + _this3.id === '' + event.target.name) {
                        return {
                            checked: overlay.name === id,
                            groupTitle: overlay.groupTitle,
                            name: overlay.name,
                            title: overlay.title
                        };
                    }
                    return overlay;
                });
            }
            if (exclusive === 'nonExclusive') {
                // change with event.target.checked true or false
                newOverlays = overlays.map(function (overlay, index) {
                    if (overlay.groupTitle + '-' + _this3.id === '' + event.target.name && overlay.name === id) {
                        return {
                            checked: event.target.checked,
                            groupTitle: overlay.groupTitle,
                            name: overlay.name,
                            title: overlay.title
                        };
                    }
                    return overlay;
                });
            }

            if (this.props.onOverlayChange) {
                this.props.onOverlayChange(newOverlays);
            }
        }
    }, {
        key: 'baseLayerChange',
        value: function baseLayerChange(event) {
            if (this.props.onBaseLayerChange) {
                this.props.onBaseLayerChange(event.target.getAttribute('data-layername'));
            }
        }
    }, {
        key: 'setMaxHeight',
        value: function setMaxHeight() {
            var containerRect = this.props.map.getContainer().getBoundingClientRect();
            var divRect = this.div.getBoundingClientRect();
            var maxHeight = Math.floor((containerRect.bottom - divRect.y) * 0.95) + 'px';
            this.div.style.maxHeight = maxHeight;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setMaxHeight();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            this.reduceWithProps();
            var baseGroup = this.groupContainer(_react2.default.createElement('span', { key: 'title-baselayer', className: 'rlglc-grouptitle' }, 'Base Layers'), this.props.baseLayers.map(function (e, i) {
                return _this4.listItem('baselayer', e, e.name === _this4.props.checkedBaseLayer, 'radio', _this4.baseLayerChange);
            }), 'baselayer');

            var groups = this.props.overlays ? this.groupTitles.reduce(function (a, b) {
                var groupTitle = _react2.default.createElement('span', { key: 'title-' + b, className: 'rlglc-grouptitle' }, b);
                var groupElemans = void 0;
                if (_this4.props.exclusiveGroups && _this4.props.exclusiveGroups.includes(b)) {
                    // exclusives
                    groupElemans = _this4.groups[b].groupItems.map(function (e, i) {
                        return _this4.listItem(b, e, e.checked, 'radio', _this4.overlayChanged.bind(_this4, 'exclusive'));
                    });
                } else {
                    // standard overlays
                    groupElemans = _this4.groups[b].groupItems.map(function (e, i) {
                        return _this4.listItem(b, e, e.checked, 'checkbox', _this4.overlayChanged.bind(_this4, 'nonExclusive'));
                    });
                }
                return [].concat(_toConsumableArray(a), [_this4.groupContainer(groupTitle, groupElemans, b)]);
            }, []) : null;

            return _react2.default.createElement('div', {
                ref: function ref(_ref) {
                    return _this4.div = _ref;
                },
                className: 'rlglc' + (this.state.open ? ' rlglc-active' : ''),
                onMouseEnter: this.mainDivMouseEnter.bind(this),
                onMouseLeave: this.mainDivMouseLeave.bind(this)
            }, _react2.default.createElement('a', { className: 'rlglc-a' }, _react2.default.createElement('div', { className: this.state.open ? 'rlglc-open' : 'rlglc-close' }, baseGroup, this.props.overlays ? _react2.default.createElement('div', { className: 'rlglc-seperator' }) : null, groups)));
        }
    }]);

    return RLGroupedLayerControlRC;
}(_react2.default.Component);

exports.default = RLGroupedLayerControlRC;
