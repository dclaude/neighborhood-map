class Location {
  constructor(label = '', lat = 0, lng = 0) {
    this.label = label
    this.latLng = { lat, lng }
  }
}

export default Location

