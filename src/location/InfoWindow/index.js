import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NearbyPlaces from '../../wiki/NearbyPlaces'
import StreetViewPanorama from '../../gmaps/StreetViewPanorama'

class InfoWindow extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    mapsApi: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
  }
  render() {
    const { location, mapsApi, language } = this.props
    const streetViewStyles = {
      width: '250px',
      height: '200px',
    }
    const wikiStyles = {
      width: '250px',
      height: '200px',
    }
    return (
      <section>
        <h2>{location.label}</h2>
        <StreetViewPanorama latLng={location.latLng} mapsApi={mapsApi} styles={streetViewStyles} />
        <NearbyPlaces latLng={location.latLng} styles={wikiStyles} language={language}/>
      </section>
    )
  }

}

export default InfoWindow

