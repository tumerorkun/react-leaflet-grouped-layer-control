import Leaflet from 'leaflet'
import React from 'react'

import SimpleExample from './simple'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.baseLayers = [
      {
        name: 'tile-texture-1',
        title: 'OpenStreetMap'
      },
      {
        name: 'tile-texture-2',
        title: 'ThunderForest'
      }
    ];
    this.checkedBaseLayer = 'tile-texture-1';
    this.exclusiveGroups = [
      'Choropleths',
      'Shapes'
    ]
    this.overlays = [
      {
        checked: true,
        groupTitle: 'Heats',
        name: 'heat-1',
        title: 'Heat'
      },
      {
        checked: false,
        groupTitle: "Grids",
        name: "grid-1",
        title: "Grid"
      },
      {
        checked: true,
        groupTitle: "Choropleths",
        name: "choropleth-1",
        title: "City Choropleth Layer"
      },
      {
        checked:false,
        groupTitle:"Choropleths",
        name:"choropleth-2",
        title:"District Choropleth Layer"
      },
      {
        checked:false,
        groupTitle:"Choropleths",
        name:"None",
        title:"None"
      },
      {
        checked:true,
        groupTitle:"Marker Clusters",
        name:"2g_sites",
        title:"2G-Sites"
      },
      {
        checked:false,
        groupTitle:"Marker Clusters",
        name:"3g_sites",
        title:"3G-Sites"
      },
      {
        checked:false,
        groupTitle:"Marker Clusters",
        name:"4.5g_sites",
        title:"4.5G-Sites"
      }
    ]
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.baseLayers = [
    //     {
    //       name: 'tile-texture-3',
    //       title: 'denemeMap'
    //     }
    //   ]
    //   this.setState({count:1})
    //   console.log('hebe')
    // }, 3000)
  }
  render() {
    // console.log('app rendered', this.baseLayers)

    return (
      <div>
        <SimpleExample
          baseLayers={this.baseLayers}
          checkedBaseLayer={this.checkedBaseLayer}
          exclusiveGroups={this.exclusiveGroups}
          overlays={this.overlays}
        />
      </div>
    )
  }
}

// const App = () => (
//   <div>
//     <SimpleExample
//       baseLayers={this.baseLayers}
//       checkedBaseLayer={this.checkedBaseLayer}
//       exclusiveGroups={this.exclusiveGroups}
//       overlays={this.overlays}
//     />
//   </div>
// )

export default App
