/*
- Api.googlePromise
use Api.googlePromise to use 'google' object in a then() clause
- Api.google
use Api.google to synchronously check if google.maps api is available
e.g. to be used in render() to decide if a component can be rendered
- Api.load()
must be called for the Api.googlePromise to be settled
- Api.unload()
must be called for the google.maps api to be unloaded
- language
google maps api is not meant to be reloaded several times on the same page
cf https://stackoverflow.com/questions/11444826/unload-google-maps-api
but it seems to work even if there are a few log error messages
*/
class Api {
  constructor(apiKey, language = 'en') {
    this.apiKey = apiKey
    this.language = language
    this.google = null
    this.resolve = null
    this.reject = null
    this.googlePromise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.script = null
  }
  load() {
    this.googleScriptPromise = new Promise((resolve, reject) => {
      window.onGoogleMapsSuccess = () => {
        resolve(window.google)
      }
      window.onGoogleMapsFailure = () => {
        reject('google maps api load error')
      }
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&v=3&libraries=geometry&language=${this.language}&callback=onGoogleMapsSuccess`
      script.async = true
      script.onerror = window.onGoogleMapsFailure
      document.body.appendChild(script)
      this.script = script
    })
    this.googleScriptPromise
      .then(google => this.resolve(google))
      .catch(err => this.reject(err))
  }
  unload() {
    if (this.script) {
      document.body.removeChild(this.script)
      this.script = null
      this.googleScriptPromise = null
      window.google = null
    }
  }

}

export default Api

