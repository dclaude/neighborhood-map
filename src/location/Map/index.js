import React, { Component } from 'react'
import GmapsMap from '../../gmaps/Map'
import Marker from '../../gmaps/Marker'
import GmapsInfoWindow from '../../gmaps/InfoWindow'
import InfoWindow from '../InfoWindow'
import PropTypes from 'prop-types'

class Map extends Component {
  static propTypes = {
    mapsApi: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
    locationsInfo: PropTypes.array.isRequired,
    toggleInfoWindowOpened: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }
  render() {
    const { mapsApi, mapCenter, mapZoom, locationsInfo, toggleInfoWindowOpened, language } = this.props
    return (
      <GmapsMap mapsApi={mapsApi} mapCenter={mapCenter} mapZoom={mapZoom}>
        {locationsInfo.map((locationInfo, index) => {
          const { location, isInfoWindowOpened } = locationInfo
          return (
            <Marker
              key={location.label /* do not use 'array index': the key need to remain the same when the 'location search regexp' changes */}
              latLng={location.latLng}
              mapsApi={mapsApi}
              bounds={this.bounds}
              onClick={toggleInfoWindowOpened}
              animation={isInfoWindowOpened}
            >
              {isInfoWindowOpened ? (
                <GmapsInfoWindow
                  divIdSuffix={String(index)}
                  mapsApi={mapsApi}
                  onClose={() => toggleInfoWindowOpened(location)}
                >
                  <InfoWindow location={location} mapsApi={mapsApi} language={language} />
                </GmapsInfoWindow>
              ) : null}
            </Marker>
          )
        })}
      </GmapsMap>
    )
  }
}

export default Map

