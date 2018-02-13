import './styles.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationRemove extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onRemoveLocation: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  state = {
    label: '',
  }
  updateLabel(props) {
    const { locations } = props
    if (locations.length) {
      this.setState({ label: locations[0].label })
    }
  }
  componentDidMount() {
    this.updateLabel(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.updateLabel(nextProps)
  }
  render() {
    const { onRemoveLocation, onBack, locations } = this.props
    const { label } = this.state
    const submit = e => {
      e.preventDefault()
      onRemoveLocation(label)
      onBack()
    }
    return (
      <form className='admin-LocationRemove' onSubmit={submit}>
        <h2>Remove Location</h2>
        <label className='admin-LocationRemove-label' htmlFor='label'>Label</label>
        <select id='label' className='admin-LocationRemove-select' value={label} onChange={e => this.setState({ label: e.target.value })}>
          {locations.map(location => {
            return <option key={location.label} value={location.label}>{location.label}</option>
          })}
        </select>
        <button className='admin-LocationRemove-button' type='submit'>Remove Location</button>
        <button className='admin-LocationRemove-button' type='button' onClick={onBack}>Back</button>
      </form>
    )
  }
}

export default LocationRemove

