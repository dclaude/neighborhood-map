import './styles.css'
import React, { Component } from 'react'
import Home from '../Home'
import Admin from '../../admin/Admin'
import LocationApi from '../../location/Api'
import LanguageApi from '../../LanguageApi'
import NotFound from '../NotFound'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    localStorageKey: PropTypes.string.isRequired,
    mapApiKey: PropTypes.string.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
  }
  state = {
    locations: [],
    language: '',
  }
  locationApi = new LocationApi(this.props.localStorageKey)
  languageApi = new LanguageApi(this.props.localStorageKey)
  loadLocations() {
    return this.locationApi.loadLocations().then(locations => {
      this.setState({ locations })
    })
  }
  loadLanguage() {
    return this.languageApi.loadLanguage().then(language => {
      this.setState({ language })
    })
  }
  componentDidMount() {
    this.loadLocations()
    this.loadLanguage()
  }
  render() {
    const { locations, language } = this.state
    const { mapApiKey, mapCenter, mapZoom } = this.props
    if (!language)
      return null
    return (
      <Switch>
        <Route exact path='/'
          render={({ history }) => (
            <Home
              locations={locations}
              onAdminButton={() => history.push('/admin')}
              mapApiKey={mapApiKey}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              language={language}
            />
          )}
        />
        <Route path='/admin'
          render={({ history }) => (
            <Admin 
              mapApiKey={mapApiKey}
              onAddLocation={location => this.locationApi.addLocation(location).then(() => this.loadLocations())}
              onRemoveLocation={locationLabel => {
                this.locationApi.removeLocation(locationLabel).then(() => this.loadLocations())
              }}
              onRemoveAllLocations={() => this.locationApi.removeAllLocations().then(() => this.loadLocations())}
              onBack={() => history.push('/')}
              locations={locations}
              language={language}
              onLanguageChange={language => this.languageApi.updateLanguage(language).then(() => this.loadLanguage())}
            />
          )}
        />
        <Route component={NotFound}/>
      </Switch>
    )
  }

}

export default App

