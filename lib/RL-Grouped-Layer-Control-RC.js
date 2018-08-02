'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * baseLayers
 * checkhedBaseLayer
 * overlays
 * exclusiveGroups
 */

class RLGroupedLayerControlRC extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.fillStateWithProps = this.fillStateWithProps.bind(this);
        this.listItem = this.listItem.bind(this);
        this.state = {
            open: false,
            checked: []
        };
        this.groups;
    }

    /**
     * Events
     */
    mainDivMouseEnter(e) {
        this.state.open || this.setState({ open: true });
    }
    mainDivMouseLeave(e) {
        // console.log('LEAVE', e.currentTarget)
        this.setState({ open: false });
    }
    // Events End

    fillStateWithProps() {
        this.groups = this.props.overlays.reduce((a, b) => {
            if (typeof a[b.groupTitle] === 'undefined') {
                a[b.groupTitle] = {
                    exclusive: undefined,
                    groupItems: []
                };
            }
            if (typeof a[b.groupTitle]['exclusive'] === 'undefined') {
                if (this.props.exclusiveGroups.includes(b.groupTitle)) {
                    a[b.groupTitle]['exclusive'] = true;
                } else {
                    a[b.groupTitle]['exclusive'] = false;
                }
            }
            a[b.groupTitle]['groupItems'].push(b);
            return a;
        }, { init: true });
        this.groupTitles = [...new Set(this.props.overlays.map(e => e.groupTitle))];
    }

    componentDidMount() {
        // console.log('didMount')
    }

    groupContainer(groupTitle, groupElemans, key) {
        return _react2.default.createElement(
            'div',
            { key: key, className: `rlglc-group` },
            groupTitle,
            groupElemans
        );
    }

    listItem(groupName, e, checked, type, onClick) {
        return _react2.default.createElement(
            'label',
            { htmlFor: e.name, key: e.name, className: `rlglc-option` },
            _react2.default.createElement('input', { name: groupName, id: e.name, className: `rlglc-input`, type: type,
                defaultChecked: checked,
                onClick: onClick || (() => {})
            }),
            _react2.default.createElement(
                'span',
                { className: `rlglc-title` },
                e.title
            )
        );
    }

    overlayChanged(exclusive, event) {
        // console.log(event.target.id, event.target.checked);
        const overlays = [...this.props.overlays];
        let newOverlays;
        if (exclusive === 'exclusive') {
            // event.target true other items in exclusive group is false
            newOverlays = overlays.map((overlay, index) => {
                if (overlay.groupTitle === event.target.name) {
                    return {
                        checked: false,
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    };
                }
                if (overlay.name === event.target.id) {
                    return {
                        checked: true,
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
            newOverlays = overlays.map((overlay, index) => {
                if (overlay.name === event.target.id) {
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

    render() {
        this.fillStateWithProps();
        // console.log('state change with fillStateWithProps')
        // console.log(this.groupTitles)
        // console.log('rlglc rendered')

        const baseGroup = this.groupContainer(_react2.default.createElement(
            'span',
            { key: `title-baselayer`, className: `rlglc-grouptitle` },
            'Base Layers'
        ), this.props.baseLayers.map((e, i) => this.listItem('baselayer', e, e.name === this.props.checkedBaseLayer, 'radio', this.props.onBaseLayerChange)), `baselayer`);

        const groups = this.groupTitles.reduce((a, b) => {
            const groupTitle = _react2.default.createElement(
                'span',
                { key: `title-${b}`, className: `rlglc-grouptitle` },
                b
            );
            let groupElemans;
            if (this.props.exclusiveGroups.includes(b)) {
                // exclusives
                groupElemans = this.groups[b].groupItems.map((e, i) => {
                    return this.listItem(b, e, e.checked, 'radio', this.overlayChanged.bind(this, 'exclusive'));
                });
            } else {
                // standard overlays
                groupElemans = this.groups[b].groupItems.map((e, i) => {
                    return this.listItem(b, e, e.checked, 'checkbox', this.overlayChanged.bind(this, 'nonExclusive'));
                });
            }
            return [...a, this.groupContainer(groupTitle, groupElemans, b)];
        }, []);

        return _react2.default.createElement(
            'div',
            {
                className: `rlglc${this.state.open ? ' rlglc-active' : ''}`,
                onMouseEnter: this.mainDivMouseEnter.bind(this),
                onMouseLeave: this.mainDivMouseLeave.bind(this)
            },
            _react2.default.createElement(
                'a',
                { className: `rlglc-a` },
                _react2.default.createElement(
                    'div',
                    { className: this.state.open ? 'rlglc-open' : 'rlglc-close' },
                    baseGroup,
                    _react2.default.createElement('div', { className: `rlglc-seperator` }),
                    groups
                )
            )
        );
    }
}
exports.default = RLGroupedLayerControlRC;