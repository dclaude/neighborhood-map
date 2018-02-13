class Api {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey
  }
  loadLocations() {
    return new Promise((resolve, reject) => {
      const rawStorage = localStorage[this.localStorageKey]
      let storage = null
      if (rawStorage)
        storage = JSON.parse(rawStorage)
      if (!storage || !storage.locations) {
        this.fetchLocations().then(locations => {
          const newStorage = storage ? { ...storage, locations } : { locations }
          localStorage[this.localStorageKey] = JSON.stringify(newStorage)
          resolve(locations)
        }).catch(err => {
          console.log(`location.Api.loadLocations() failed ${err}`)
          reject(err)
        })
      }
      else {
        const { locations } = JSON.parse(localStorage[this.localStorageKey])
        resolve(locations)
      }
    })
  }
  addLocation(location) {
    return new Promise((resolve, reject) => {
      let storage = JSON.parse(localStorage[this.localStorageKey])
      if (storage.locations.filter(l => l.label === location.label).length) {
        const err = `location.Api.addLocation() label ${location.label} already exists`
        reject(err)
        return
      }
      storage.locations.push(location)
      localStorage[this.localStorageKey] = JSON.stringify(storage)
      resolve(location)
    })
  }
  removeLocation(locationLabel) {
    return new Promise((resolve, reject) => {
      const storage = JSON.parse(localStorage[this.localStorageKey])
      const locations = storage.locations.filter(location => location.label !== locationLabel)
      if (locations.length === storage.locations.length) {
        const err = `location.Api.removeLocation() label ${locationLabel} not found`
        console.log(err)
        reject(err)
        return
      }
      localStorage[this.localStorageKey] = JSON.stringify({ ...storage, locations })
      resolve(locationLabel)
    })
  }
  removeAllLocations() {
    return new Promise((resolve, reject) => {
      const storage = JSON.parse(localStorage[this.localStorageKey])
      const locations = []
      localStorage[this.localStorageKey] = JSON.stringify({ ...storage, locations })
      resolve()
    })
  }
  fetchLocations() {
    const headers = {
      'Accept': 'application/json',
    }
    // use of the PUBLIC_URL global variable defines in index.html (window.PUBLIC_URL = "%PUBLIC_URL%")
    return fetch(`${window.PUBLIC_URL}/locations.json`, { headers })
      .then(res => res.json())
  }

}

export default Api

