import React, { Component } from 'react'
import StreetViewApi from '../../gmaps/StreetViewApi'
import PropTypes from 'prop-types'

class StreetViewPanorama extends Component {
  static propTypes = {
    latLng: PropTypes.object.isRequired,
    mapsApi: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  }
  streetViewApi = new StreetViewApi(this.props.mapsApi)
  streetViewEl = null
  openPanorama(props) {
    const { mapsApi, latLng } = props
    const { streetViewApi } = this
    mapsApi.googlePromise
      .then(google => {
        streetViewApi.openPanoramaByLocation(latLng, this.streetViewEl)
      })
      .catch(err => console.log(`gmaps.StreetViewPanorama googlePromise failed ${err}`))
  }
  componentDidMount() {
    this.openPanorama(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.openPanorama(nextProps)
  }
  render() {
    const { styles } = this.props
    return <div ref={el => this.streetViewEl = el} style={styles}></div>
  }
}

export default StreetViewPanorama

