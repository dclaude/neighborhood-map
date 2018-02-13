class GeocoderApi {
  constructor(api) {
    this.api = api
    this.google = null
    this.geocoder = null
    this.api.googlePromise
      .then(google => {
        this.google = google
        this.geocoder = new google.maps.Geocoder()
      })
      .catch(err => console.log(`gmaps.GeocoderApi googlePromise failed ${err}`))
  }
  geocode(queryKey, queryValue) {
    const { google, geocoder } = this
    if (!google) {
      return Promise.reject('google maps api not available')
    }
    return new Promise((resolve, reject) => {
      geocoder.geocode({ [queryKey]: queryValue }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results)
        } else {
          reject(`status ${status}`)
        }
      })
    })
  }
  geocodeAddress(address) {
    return this.geocode('address', address)
  }
  geocodePlaceId(placeId) {
    return this.geocode('placeId', placeId)
  }

}

export default GeocoderApi

