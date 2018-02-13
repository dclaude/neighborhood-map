import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../../app/Filter'

const Locations = ({ locationsInfo, filter, onFilterChange, onClick }) => {
  return (
    <section className='location-Locations'>
      <h2>Locations</h2>
      <Filter filter={filter} onFilterChange={onFilterChange} />
      <ul className='location-Locations-list'>
        {locationsInfo.map(({ location }, index) => (
          <li key={index} className="location-Locations-listItem">
            <button className='location-Locations-button' onClick={() => onClick(location.latLng)}>{location.label}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

Locations.propTypes = {
  locationsInfo: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Locations

