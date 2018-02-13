import React, { Component } from 'react'
import WikiApi from '../../wiki/Api'
import PropTypes from 'prop-types'

class NearbyPlaces extends Component {
  static propTypes = {
    latLng: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
  }
  wikiEl = null
  openNearbyPlaces(props) {
    const { latLng, language } = props
    const { wikiEl } = this
    const wikiApi = new WikiApi(language)
    wikiApi.openNearbyPlaces(latLng, wikiEl)
  }
  componentDidMount() {
    this.openNearbyPlaces(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.openNearbyPlaces(nextProps)
  }
  render() {
    const { styles } = this.props
    return <div ref={el => this.wikiEl = el} style={styles}></div>
  }
}

export default NearbyPlaces
