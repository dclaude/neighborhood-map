import './styles.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Filter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  }
  state = {
    filter: this.props.filter,
  }
  render() {
    const { filter } = this.state
    const { onFilterChange } = this.props
    return (
      <form className='app-Filter'>
        <input id='filter' className='app-Filter-input' type='text' value={filter} placeholder='Search regexp'
          onChange={e => {
            const filter = e.target.value
            this.setState({ filter })
            onFilterChange(filter)
          }}
        />
      </form>
    )
  }
}

export default Filter


