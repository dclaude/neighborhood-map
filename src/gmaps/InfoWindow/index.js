import './styles.css'
import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class InfoWindow extends Component {
  static propTypes = {
    divIdSuffix: PropTypes.string.isRequired,
    mapsApi: PropTypes.object.isRequired,
    map: PropTypes.object, // no 'isRequired' because 'map' prop is not filled in a JSX attribute but in Marker.render()
    marker: PropTypes.object, // no 'isRequired' because 'marker' prop is not filled in a JSX attribute but in Marker.render()
    onClose: PropTypes.func.isRequired,
  }
  state = {
    win: null,
    google: null,
  }
  infoWindowClosed = false
  componentDidMount() {
    const { mapsApi, divIdSuffix, marker, map, onClose } = this.props
    mapsApi.googlePromise
      .then(google => {
        const win = new google.maps.InfoWindow()
        const divId = `InfoWindow-${divIdSuffix}`
        win.setContent(`<div id=${divId} class='gmaps-InfoWindow'></div>`)
        win.addListener('closeclick', () => {
          this.infoWindowClosed = true
          onClose()
        })
        google.maps.event.addListener(win, 'domready', () => {
          if (!this.infoWindowClosed) {
            ReactDOM.render(this.props.children, document.getElementById(divId))
          }
        })
        win.open(map, marker)
        this.setState({ google, win })
      })
      .catch(err => console.log(`gmaps.InfoWindow googlePromise failed ${err}`))
  }
  componentWillUnmount() {
    const { win } = this.state
    if (win) {
      win.close()
    }
  }
  render() {
    return null // nothing to render (rendering is done through the above call to ReactDOM.render())
  }
}

export default InfoWindow

