import './styles.css'
import React, { Component } from 'react'
import StreetViewPanorama from '../../gmaps/StreetViewPanorama'
import PropTypes from 'prop-types'

class StreetViewQuery extends Component {
  static propTypes = {
    mapsApi: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  state = {
    lat: this.props.location.latLng.lat,
    lng: this.props.location.latLng.lng,
  }
  render() {
    const { lat, lng } = this.state
    const { onBack, onSubmit, mapsApi } = this.props
    const submit = e => {
      e.preventDefault()
      onSubmit({ lat, lng })
      onBack()
    }
    const styles = {
      minHeight: '400px',
      width: 'auto',
    }
    return (
      <section className='gmaps-StreetViewQuery'>
        <form className='gmaps-StreetViewQuery-form' onSubmit={submit}>
          <h2>StreetView</h2>
          <label className='gmaps-StreetViewQuery-label' htmlFor='lat'>Latitutde</label>
          <input id='lat' className='gmaps-StreetViewQuery-input' type='number' value={lat} onChange={e => this.setState({ lat: e.target.value })} />
          <label className='gmaps-StreetViewQuery-label' htmlFor='lng'>Longitude</label>
          <input id='lng' className='gmaps-StreetViewQuery-input' type='number' value={lng} onChange={e => this.setState({ lng: e.target.value })} />
          <button className='gmaps-StreetViewQuery-button' type='submit'>Udpate Location</button>
          <button className='gmaps-StreetViewQuery-button' type='button' onClick={onBack}>Back</button>
        </form>
        <StreetViewPanorama latLng={{ lat, lng }} mapsApi={mapsApi} styles={styles} />
      </section>
    )
  }
}

export default StreetViewQuery

