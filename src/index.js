import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './app/App'
import { BrowserRouter } from 'react-router-dom'

const config = {
  localStorageKey: 'neighborhood-map',
  mapApiKey: 'AIzaSyCZkjL847cY6nQvRo2zhSdVYlMnC59JijA',
  mapCenter: {  lat: 48.856614, lng: 2.3522219000000177 }, // Paris
  mapZoom: 11,
}

ReactDOM.render(
  <BrowserRouter>
    <App
      localStorageKey={config.localStorageKey}
      mapApiKey={config.mapApiKey}
      mapCenter={config.mapCenter}
      mapZoom={config.mapZoom}
    />
  </BrowserRouter>,
  document.getElementById('root'))

registerServiceWorker()

