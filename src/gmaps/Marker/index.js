import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Marker extends Component {
  static propTypes = {
    mapsApi: PropTypes.object.isRequired,
    latLng: PropTypes.object.isRequired,
    map: PropTypes.object, // no 'isRequired' because 'map' prop is not filled in a JSX attribute but in Map.render()
    bounds: PropTypes.object, // no 'isRequired' because 'bounds' prop is not filled in a JSX attribute but in Map.render()
    onClick: PropTypes.func.isRequired,
    animation: PropTypes.bool.isRequired,
  }
  state = {
    marker: null,
    google: null,
  }
  timeoutId = 0
  componentWillMount() {
    const { mapsApi, latLng, map, onClick } = this.props
    mapsApi.googlePromise
      .then(google => {
        const marker = new google.maps.Marker({
          map: map,
          position: latLng,
        })
        marker.addListener('click', () => {
          onClick(latLng)
        })
        this.setState({ google, marker })
      })
      .catch(err => console.log(`gmaps.Marker googlePromise failed ${err}`))
  }
  componentWillUnmount() {
    const { marker } = this.state
    window.clearTimeout(this.timeoutId);
    marker.setMap(null)
  }
  render() {
    const { marker, google } = this.state
    const { children, map, bounds, animation } = this.props
    if (!google) {
      return null
    }
    bounds.extend(marker.position)
    if (animation) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      this.timeoutId = window.setTimeout(() => marker.setAnimation(null), 750);
    }
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { map, marker }) // add map and marker props to the existing props of each child
    })
    return childrenWithProps
  }
}

export default Marker

