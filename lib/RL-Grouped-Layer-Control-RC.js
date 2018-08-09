'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Props:
 *  baseLayers
 *  checkhedBaseLayer
 *  overlays
 *  exclusiveGroups
 *  onBaseLayerChange
 *  onOverlayChange
 */

class RLGroupedLayerControlRC extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.listItem = this.listItem.bind(this);
        this.reduceWithProps = this.reduceWithProps.bind(this);
        this.baseLayerChange = this.baseLayerChange.bind(this);
        this.state = { open: false };
        this.groups;
        this.id = Math.ceil(Math.random() * 1000);
    }

    /**
     * Events
     */
    mainDivMouseEnter(e) {
        this.state.open || this.setState({ open: true });
    }
    mainDivMouseLeave(e) {
        this.setState({ open: false });
    }
    // Events End

    reduceWithProps() {
        this.groups = this.props.overlays && this.props.overlays.reduce((a, b) => {
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
        this.groupTitles = this.props.overlays && [...new Set(this.props.overlays.map(e => e.groupTitle))];
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
            { htmlFor: `${e.name}-${this.id}`, key: `${e.name}-${this.id}`, className: `rlglc-option` },
            _react2.default.createElement('input', { name: `${groupName}-${this.id}`, 'data-layername': e.name, id: `${e.name}-${this.id}`, className: `rlglc-input`, type: type,
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
        const overlays = [...this.props.overlays];
        const id = event.target.getAttribute('data-layername');
        let newOverlays;
        if (exclusive === 'exclusive') {
            // event.target true other items in exclusive group is false
            newOverlays = overlays.map((overlay, index) => {
                if (`${overlay.groupTitle}-${this.id}` === `${event.target.name}`) {
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
            newOverlays = overlays.map((overlay, index) => {
                if (`${overlay.groupTitle}-${this.id}` === `${event.target.name}` && overlay.name === id) {
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

    baseLayerChange(event) {
        if (this.props.onBaseLayerChange) {
            this.props.onBaseLayerChange(event.target.getAttribute('data-layername'));
        }
    }

    setMaxHeight() {
        const containerRect = this.props.map.getContainer().getBoundingClientRect();
        const divRect = this.div.getBoundingClientRect();
        const maxHeight = `${Math.floor((containerRect.bottom - divRect.y) * 0.95)}px`;
        this.div.style.maxHeight = maxHeight;
    }

    componentDidMount() {
        this.setMaxHeight();
    }

    render() {
        this.reduceWithProps();
        const baseGroup = this.groupContainer(_react2.default.createElement(
            'span',
            { key: `title-baselayer`, className: `rlglc-grouptitle` },
            'Base Layers'
        ), this.props.baseLayers.map((e, i) => this.listItem('baselayer', e, e.name === this.props.checkedBaseLayer, 'radio', this.baseLayerChange)), `baselayer`);

        const groups = this.props.overlays ? this.groupTitles.reduce((a, b) => {
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
        }, []) : null;

        return _react2.default.createElement(
            'div',
            {
                ref: ref => this.div = ref,
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
                    this.props.overlays ? _react2.default.createElement('div', { className: `rlglc-seperator` }) : null,
                    groups
                )
            )
        );
    }
}
exports.default = RLGroupedLayerControlRC;