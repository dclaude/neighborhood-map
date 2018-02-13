import './styles.css'
import React, { Component } from 'react'
import Locations from '../../location/Locations'
import PropTypes from 'prop-types'
import MapsApi from '../../gmaps/Api'
import LocationMap from '../../location/Map'
import Tools from '../../Tools'

class Home extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onAdminButton: PropTypes.func.isRequired,
    mapApiKey: PropTypes.string.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
  }
  state = {
    locationsInfo: [],
    showSidebar: false,
    locationsFilter: '',
  }
  mapsApi = new MapsApi(this.props.mapApiKey, this.props.language)
  mediaQuery = window.matchMedia('(max-width: 600px)')
  onFilterChange = locationsFilter => {
    try {
      const { locations } = this.props
      const regexp = new RegExp(locationsFilter);
      const filteredLocations = locations.filter(location => {
        return location.label.search(regexp) >= 0
      })
      this.setState({ locationsFilter })
      this.updateLocationsInfo(filteredLocations)
    }
    catch (err) {
      console.log(`Home RegExp ${err}`)
    }
  }
  toggleInfoWindowOpened = ({ lat, lng }) => {
    const locationsInfo = this.state.locationsInfo.map(locationInfo => {
      const latLng = locationInfo.location.latLng
      let isInfoWindowOpened = false // close all the other opened InfoWindow
      if (latLng.lat === lat && latLng.lng === lng) {
        isInfoWindowOpened = !locationInfo.isInfoWindowOpened // only toggle the clicked InfoWindow
      }
      return {
        ...locationInfo,
        isInfoWindowOpened,
      }
    })
    this.setState({ locationsInfo })
  }
  mediaQueryStates() {
    const smallWidth = this.mediaQuery.matches
    // the viewport width can be checked with window.innerWidth
    //console.log(window.innerWidth)
    return {
      smallWidth,
      showSidebar: !smallWidth,
    }
  }
  updateLocationsInfo(locations) {
    const locationsInfo = locations.map(location => ({
      location,
      isInfoWindowOpened: false,
    }))
    this.setState({ locationsInfo })
  }
  componentDidMount() {
    const { locations } = this.props
    const { mapsApi } = this
    mapsApi.load()
    this.updateLocationsInfo(locations)
    this.setState(this.mediaQueryStates())
    //
    Tools.addOrientationChangeEventListener(() => {
      const locationsInfo = this.state.locationsInfo.map(locationInfo => {
        return {
          ...locationInfo,
          isInfoWindowOpened: false,
        }
      })
      this.setState({ locationsInfo, ...this.mediaQueryStates() })
    })
  }
  componentWillReceiveProps(nextProps) {
    const { locations } = nextProps
    this.updateLocationsInfo(locations)
  }
  componentWillUnmount() {
    const { mapsApi } = this
    mapsApi.unload()
  }
  render() {
    const { locationsInfo, locationsFilter, showSidebar, smallWidth } = this.state
    const { onAdminButton, mapCenter, mapZoom, language } = this.props
    const { mapsApi } = this
    const menuStyle = {
      display: smallWidth ? 'flex' : 'none',
    }
    const locationsStyle = {
      flexDirection: smallWidth ? 'column' : 'row',
    }
    return (
      <div className='app-Home'>
        <main className='main'>
          <section className='menu' style={menuStyle}>
            <button
              className='app-Home-menuButton'
              onClick={() => this.setState({ showSidebar: !showSidebar })}
            >Menu</button>
          </section>
          <section className='locations' style={locationsStyle}>
            {showSidebar && (
              <aside className='sidebar'>
                <Locations
                  locationsInfo={locationsInfo}
                  filter={locationsFilter}
                  onFilterChange={this.onFilterChange}
                  onClick={latLng => {
                    this.toggleInfoWindowOpened(latLng)
                    this.setState({ showSidebar: !smallWidth })
                  }}
                />
                <button className='app-Home-adminButton' onClick={onAdminButton}>Config</button>
              </aside>
            )}
            <LocationMap
              mapsApi={mapsApi}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              locationsInfo={locationsInfo}
              toggleInfoWindowOpened={this.toggleInfoWindowOpened}
              language={language}
            />
          </section>
        </main>
      </div>
    )
  }
}

export default Home

