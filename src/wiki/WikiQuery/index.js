import './styles.css'
import React, { Component } from 'react'
import NearbyPlaces from '../../wiki/NearbyPlaces'
import PropTypes from 'prop-types'

class WikiQuery extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }
  state = {
    lat: this.props.location.latLng.lat,
    lng: this.props.location.latLng.lng,
  }
  render() {
    const { lat, lng } = this.state
    const { onBack, onSubmit, language } = this.props
    const submit = e => {
      e.preventDefault()
      onSubmit({ lat, lng })
      onBack()
    }
    return (
      <section className='wiki-WikiQuery'>
        <form className='wiki-WikiQuery-form' onSubmit={submit}>
          <h2>Wikimedia Queries</h2>
          <label className='wiki-WikiQuery-label' htmlFor='lat'>Latitutde</label>
          <input id='lat' className='wiki-WikiQuery-input' type='number' value={lat} onChange={e => this.setState({ lat: e.target.value })} />
          <label className='wiki-WikiQuery-label' htmlFor='lng'>Longitude</label>
          <input id='lng' className='wiki-WikiQuery-input' type='number' value={lng} onChange={e => this.setState({ lng: e.target.value })} />
          <button className='wiki-WikiQuery-button' type='submit'>Udpate Location</button>
          <button className='wiki-WikiQuery-button' type='button' onClick={onBack}>Back</button>
        </form>
        <NearbyPlaces latLng={{ lat, lng }} styles={{}} language={language} />
      </section>
    )
  }
}

export default WikiQuery

