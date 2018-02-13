class StreetViewApi {
  constructor(api) {
    this.api = api
    this.google = null
    this.streetViewService = null
    this.api.googlePromise
      .then(google => {
        this.google = google
        this.streetViewService = new google.maps.StreetViewService()
      })
      .catch(err => console.log(`StreetViewApi googlePromise failed ${err}`))
  }
  openPanoramaByLocation({ lat, lng }, el) {
    const { google, streetViewService } = this
    if (!google) {
      return Promise.reject('google maps api not available')
    }
    return new Promise((resolve, reject) => {
      const latLng = new google.maps.LatLng(lat, lng)
      const radius = 50
      const getStreetView = (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          const nearStreetViewLocation = data.location.latLng
          const heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, latLng)
          const panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading,
              pitch: 0,
            }
          }
          if (el) {
            const pano = new google.maps.StreetViewPanorama(el, panoramaOptions)
            resolve(pano)
          }
        }
        else {
          if (el) {
            const err = `StreetView error (status ${status})`
            el.textContent = err
            reject(err)
          }
        }
      }
      streetViewService.getPanoramaByLocation(latLng, radius, getStreetView)
    })
  }

}

export default StreetViewApi

