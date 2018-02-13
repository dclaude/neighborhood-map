import './styles.css'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import LocationAdd from '../LocationAdd'
import LocationRemove from '../LocationRemove'
import NotFound from '../../app/NotFound'

class Admin extends Component {
  static propTypes = {
    mapApiKey: PropTypes.string.isRequired,
    onAddLocation: PropTypes.func.isRequired,
    onRemoveLocation: PropTypes.func.isRequired,
    onRemoveAllLocations: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
  }
  render() {
    const { mapApiKey, onAddLocation, onRemoveLocation, onRemoveAllLocations, onBack, locations, language, onLanguageChange } = this.props
    const languages = [ 'en', 'fr', 'es', 'de', 'it' ]
    return (
      <Switch>
        <Route exact path='/admin'
          render={({ history }) => (
            <section className='admin-Admin'>
              <form>
                <label className='admin-Admin-label' htmlFor='language'>Language</label>
                <select id='language' className='admin-Admin-select' value={language} onChange={e => onLanguageChange(e.target.value)}>
                  {languages.map(language => {
                    return <option key={language} value={language}>{language.toUpperCase()}</option>
                  })}
                </select>
              </form>
              <button className='admin-Admin-button' type='button' onClick={() => history.push('/admin/add')}>Add Location</button>
              <button className='admin-Admin-button' type='button' onClick={() => history.push('/admin/remove')}>Remove Location</button>
              <button
                className='admin-Admin-button'
                type='submit'
                onClick={() => {
                  onRemoveAllLocations()
                }}
              >Remove All Locations</button>
              <button className='admin-Admin-button' type='button' onClick={onBack}>Back</button>
          </section>
          )}
        />
        <Route path='/admin/add'
          render={({ history }) => (
            <LocationAdd
              mapApiKey={mapApiKey}
              onAddLocation={loc => {
                onAddLocation(loc)
              }}
              onBack={() => history.push('/admin')}
              language={language}
            />
          )}
        />
        <Route path='/admin/remove'
          render={({ history }) => (
            <LocationRemove
              locations={locations}
              onRemoveLocation={locationLabel => {
                onRemoveLocation(locationLabel)
              }}
              onBack={() => history.push('/admin')}
            />
          )}
        />
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Admin

