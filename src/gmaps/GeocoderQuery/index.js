import './styles.css'
import React, { Component } from 'react'
import GeocoderApi from '../../gmaps/GeocoderApi'
import PropTypes from 'prop-types'
import Location from '../../location/Location'
import MapsNotAvailable from '../../gmaps/NotAvailable'

class GeocoderQuery extends Component {
  static propTypes = {
    mapsApi: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  state = {
    address: '',
    lat: 0,
    lng: 0,
    google: null,
  }
  geocoderApi = new GeocoderApi(this.props.mapsApi)
  componentDidMount() {
    const { mapsApi } = this.props
    mapsApi.googlePromise
      .then(google => this.setState({ google }))
      .catch(err => console.log(`GeocoderQuery googlePromise failed ${err}`))
  }
  render() {
    const { google, address, lat, lng } = this.state
    const { onBack, onSubmit } = this.props
    if (!google) {
      return <MapsNotAvailable />
    }
    const onGeocode = e => {
      e.preventDefault()
      this.geocoderApi.geocodeAddress(this.state.address)
        .then(results => {
          if (!results || !results[0]) {
            console.log('GeocoderQuery invalid response content')
            return
          }
          const latLng = results[0].geometry.location
          this.setState({
            lat: latLng.lat(),
            lng: latLng.lng(),
          })
        })
        .catch(err => console.log(`GeocoderQuery geocode failed ${err}`))
    }
    const submit = e => {
      e.preventDefault()
      onSubmit(new Location(address, lat, lng))
      onBack()
    }
    return (
      <form className='gmaps-GeocoderQuery' onSubmit={submit}>
        <h2>Geocode Address</h2>
        <label className='gmaps-GeocoderQuery-label' htmlFor='address'>Address</label>
        <input id='label' className='gmaps-GeocoderQuery-input' type='text' value={address} onChange={e => this.setState({ address: e.target.value })} />
        <label className='gmaps-GeocoderQuery-label' htmlFor='lat'>Latitutde</label>
        <input id='lat' className='gmaps-GeocoderQuery-input' type='number' value={lat} disabled />
        <label className='gmaps-GeocoderQuery-label' htmlFor='lng'>Longitude</label>
        <input id='lng' className='gmaps-GeocoderQuery-input' type='number' value={lng} disabled />
        <button className='gmaps-GeocoderQuery-button' type='button' onClick={onGeocode}>Geocode Address</button>
        <button className='gmaps-GeocoderQuery-button' type='submit'>Udpate Location</button>
        <button className='gmaps-GeocoderQuery-button' type='button' onClick={onBack}>Back</button>
      </form>
    )
  }
}

export default GeocoderQuery

