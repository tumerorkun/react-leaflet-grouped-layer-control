import React, { Component } from 'react'
import {Map, TileLayer} from 'react-leaflet'
import {
  ReactLeafletGroupedLayerControl
} from '../../src';

export default class SimpleExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      count:0,
      maxZoom:13,
      maxBounds:[[-90, -180], [90, 180]],
      bounds: [
        {
          lat: 33.100745405144245,
          lng: 24.510498046875,
        },
        {
          lat: 33.100745405144245,
          lng: 46.48315429687501,
        },
        {
          lat: 44.55916341529184,
          lng: 46.48315429687501,
        },
        {
          lat: 44.55916341529184,
          lng: 24.510498046875,
        },
      ],
    }
  }
  shouldComponentUpdate(...a) {
    console.log('simple should', ...a)
    return true
  }

  render() {
    return (
      <Map
          className="simpleMap"
          scrollWheelZoom={false}
          bounds={this.state.bounds}
          maxZoom={this.state.maxZoom}
          maxBounds={this.state.maxBounds}>
        <TileLayer noWrap={true} url={this.props.TileLayerUrl} />
        <ReactLeafletGroupedLayerControl
          position="topleft"
          baseLayers={this.props.baseLayers}
          checkedBaseLayer={this.props.checkedBaseLayer}
          exclusiveGroups={this.props.exclusiveGroups}
          overlays={this.props.overlays}
          onBaseLayerChange={this.props.onBaseLayerChange}
          onOverlayChange={this.props.onOverlayChange}
        />
      </Map>
    )
  }
}
