import './styles.css'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import MapsApi from '../../gmaps/Api'
import GeocoderQuery from '../../gmaps/GeocoderQuery'
import WikiQuery from '../../wiki/WikiQuery'
import StreetViewQuery from '../../gmaps/StreetViewQuery'
import NotFound from '../../app/NotFound'
import Location from '../../location/Location'

class LocationAdd extends Component {
  static propTypes = {
    mapApiKey: PropTypes.string.isRequired,
    onAddLocation: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }
  state = {
    label: '',
    lat: 0,
    lng: 0,
  }
  mapsApi = new MapsApi(this.props.mapApiKey, this.props.language)
  componentDidMount() {
    const { mapsApi } = this
    mapsApi.load()
  }
  componentWillUnmount() {
    const { mapsApi } = this
    mapsApi.unload()
  }
  render() {
    const { onAddLocation, onBack, language } = this.props
    const { label, lat, lng } = this.state
    const { mapsApi } = this
    const submit = e => {
      e.preventDefault()
      const location = {
        label,
        latLng: {
          lat: Number(this.state.lat),
          lng: Number(this.state.lng),
        },
      }
      onAddLocation(location)
      onBack()
    }
    return (
      <Switch>
        <Route exact path='/admin/add'
          render={({ history }) => (
            <form className='admin-LocationAdd' onSubmit={submit}>
              <h2>Add Location</h2>
              <button
                className='admin-LocationAdd-button'
                type='button'
                onClick={e => {
                  e.preventDefault()
                  history.push('/admin/add/maps')
                }}
              >GoogleMaps / Geocode Address</button>
              <button
                className='admin-LocationAdd-button'
                type='button'
                onClick={e => {
                  e.preventDefault()
                  history.push('/admin/add/street')
                }}
              >StreetView / Location Panorama</button>
              <button
                className='admin-LocationAdd-button'
                type='button'
                onClick={e => {
                  e.preventDefault()
                  history.push('/admin/add/wiki')
                }}
              >Wikimedia / Geosearch Location</button>
              <label className='admin-LocationAdd-label' htmlFor='label'>Label</label>
              <input id='label' className='admin-LocationAdd-input' type='text' value={label} onChange={e => this.setState({ label: e.target.value })} />
              <label className='admin-LocationAdd-label' htmlFor='lat'>Latitude</label>
              <input id='lat' className='admin-LocationAdd-input' type='number' value={lat} onChange={e => this.setState({ lat: e.target.value })} />
              <label className='admin-LocationAdd-label' htmlFor='lng'>Longitude</label>
              <input id='lng' className='admin-LocationAdd-input' type='number' value={lng} onChange={e => this.setState({ lng: e.target.value })} />
              <button className='admin-LocationAdd-button' type='submit'>Add Location</button>
              <button className='admin-LocationAdd-button' type='button' onClick={onBack}>Back</button>
            </form>
          )}
        />
        <Route path='/admin/add/maps'
          render={({ history }) => {
            return (
              <GeocoderQuery
                mapsApi={mapsApi}
                onSubmit={location => this.setState({ label: location.label, ...location.latLng })}
                onBack={() => history.push('/admin/add')}
              />
            )
          }}
        />
        <Route path='/admin/add/street'
          render={({ history }) => {
            return (
              <StreetViewQuery
                mapsApi={mapsApi}
                location={new Location(label, lat, lng)}
                onSubmit={latLng => this.setState(latLng)}
                onBack={() => history.push('/admin/add')}
              />
            )
          }}
        />
        <Route path='/admin/add/wiki'
          render={({ history }) => {
            return (
              <WikiQuery
                location={new Location(label, lat, lng)}
                onSubmit={latLng => this.setState(latLng)}
                onBack={() => history.push('/admin/add')}
                language={language}
              />
            )
          }}
        />
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default LocationAdd

