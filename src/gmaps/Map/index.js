import './styles.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tools from '../../Tools'
import NotAvailable from '../NotAvailable'

class Map extends Component {
  static propTypes = {
    mapsApi: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
  }
  state = {
    map: null,
    bounds: null,
    google: null,
  }
  bounds = null
  mapDivElement = null
  createMap() {
    const { mapCenter, mapZoom } = this.props
    const { google } = this.state
    const { bounds } = this
    const map = new google.maps.Map(this.mapDivElement, {
      center: mapCenter,
      zoom: mapZoom,
    })
    google.maps.event.addDomListener(window, 'resize', () => {
      if (map && bounds) {
        map.fitBounds(bounds)
      }
    })
    Tools.addOrientationChangeEventListener(() => {
      google.maps.event.trigger(map, 'resize')
      if (map && bounds) {
        map.fitBounds(bounds)
      }
    })
    this.setState({ map })
  }
  componentDidMount() {
    const { mapsApi } = this.props
    mapsApi.googlePromise
      .then(google => this.setState({ google }))
      .catch(err => console.log(`gmaps.Map googlePromise failed ${err}`))
  }
  componentWillUpdate() {
    const { google } = this.state
    if (google) {
      this.bounds = new google.maps.LatLngBounds(); // need to be created each time the locations change
    }
  }
  componentDidUpdate() {
    /*
    since the 'map <div>' is not always rendered
    we need to wait for this.mapDivElement to be renderered to create the map
    */
    if (this.mapDivElement && !this.state.map) {
      this.createMap()
    }
    const { map } = this.state
    const { bounds } = this
    if (map) {
      map.fitBounds(bounds)
    }
  }
  render() {
    const { children } = this.props
    const { google, map } = this.state
    const { bounds } = this
    if (!google) {
      return <NotAvailable />
    }
    return (
      <section className='gmaps-Map'>
        {/*aria 'role' attribute*/}
        <div id='gmaps-Map-map' role='application' ref={el => this.mapDivElement = el}>
          {
            // render children
            map ?
            React.Children.map(children, child => {
              this.bounds.extend(child.props.latLng)
              return React.cloneElement(child, { map, bounds }) // add map and bounds props to the existing props of each child
            })
            : null
          }
        </div>
      </section>
    )
  }
}

export default Map;

