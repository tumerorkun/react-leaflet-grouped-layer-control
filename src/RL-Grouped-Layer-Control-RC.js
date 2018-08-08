import React from 'react'

/**
 * Props:
 *  baseLayers
 *  checkhedBaseLayer
 *  overlays
 *  exclusiveGroups
 *  onBaseLayerChange
 *  onOverlayChange
 */

export default class RLGroupedLayerControlRC extends React.Component {
    constructor(props) {
        super(props);
        this.listItem = this.listItem.bind(this);
        this.reduceWithProps = this.reduceWithProps.bind(this);
        this.baseLayerChange = this.baseLayerChange.bind(this);
        this.state = { open: false }
        this.groups;
    }

    /**
     * Events
     */
    mainDivMouseEnter(e) { this.state.open || this.setState({ open: true }); }
    mainDivMouseLeave(e) { this.setState({open: false}); }
    // Events End

    reduceWithProps() {
        this.groups = this.props.overlays.reduce((a, b) => {
            if (typeof a[b.groupTitle] === 'undefined') {
                a[b.groupTitle] = {
                    exclusive: undefined,
                    groupItems: []
                }
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
        this.groupTitles = [ ...new Set(this.props.overlays.map(e => e.groupTitle)) ]
    }

    groupContainer(groupTitle, groupElemans, key) {
        return (
            <div key={key} className={`rlglc-group`}>
                {groupTitle}
                {groupElemans}
            </div>
        )
    }

    listItem(groupName, e, checked, type, onClick) {
        return (
            <label htmlFor={e.name} key={e.name} className={`rlglc-option`}>
                <input name={groupName} id={e.name} className={`rlglc-input`} type={type}
                    defaultChecked={checked}
                    onClick={onClick || (() => {})}
                />
                <span className={`rlglc-title`}>{e.title}</span>
            </label>
        )
    }

    overlayChanged(exclusive, event) {
        const overlays = [...this.props.overlays];
        let newOverlays;
        if (exclusive === 'exclusive') {
            // event.target true other items in exclusive group is false
            newOverlays = overlays.map((overlay, index) => {
                if (overlay.groupTitle === event.target.name) {
                    return {
                        checked: (overlay.name === event.target.id),
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    }
                }
                return overlay;
            });
        }
        if (exclusive === 'nonExclusive') {
            // change with event.target.checked true or false
            newOverlays = overlays.map((overlay, index) => {
                if (overlay.groupTitle === event.target.name && overlay.name === event.target.id) {
                    return {
                        checked: event.target.checked,
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    }
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
            this.props.onBaseLayerChange(event.target.id);
        }
    }

    render() {
        this.reduceWithProps();
        const baseGroup = this.groupContainer(
            (<span key={`title-baselayer`} className={`rlglc-grouptitle`}>Base Layers</span>),
            (
                this.props.baseLayers.map(
                    (e, i) => this.listItem(
                        'baselayer',
                        e,
                        (e.name === this.props.checkedBaseLayer), 'radio',
                        this.baseLayerChange
                    )
                )
            ), `baselayer`
        );

        const groups = this.groupTitles.reduce((a, b) => {
            const groupTitle = (<span key={`title-${b}`} className={`rlglc-grouptitle`}>{b}</span>)
            let groupElemans;
            if (this.props.exclusiveGroups.includes(b)) {
                // exclusives
                groupElemans = this.groups[b].groupItems.map((e, i) => {
                    return this.listItem(b, e, e.checked, 'radio',
                        this.overlayChanged.bind(this, 'exclusive')
                    )
                });
            } else {
                // standard overlays
                groupElemans = this.groups[b].groupItems.map((e, i) => {
                    return this.listItem(b, e, e.checked, 'checkbox',
                        this.overlayChanged.bind(this, 'nonExclusive')
                    )
                });
            }
            return [...a, this.groupContainer(groupTitle, groupElemans, b)];
        }, []);

        return (
            <div
                className = {`rlglc${this.state.open ? ' rlglc-active' : ''}`}
                onMouseEnter={this.mainDivMouseEnter.bind(this)}
                onMouseLeave={this.mainDivMouseLeave.bind(this)}
            >
                <a className={`rlglc-a`}>
                    <div className={this.state.open ? 'rlglc-open' : 'rlglc-close'}>
                        { baseGroup }
                        <div className={`rlglc-seperator`}></div>
                        { groups }
                    </div>
                </a>
            </div>
        )
    }
}
