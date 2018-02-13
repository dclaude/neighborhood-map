/*
use of jQuery.ajax() because fetch() does not support jsonp
https://stackoverflow.com/questions/43471288/how-to-use-jsonp-on-fetch-axios-cross-site-requests
https://stackoverflow.com/questions/5943630/basic-example-of-using-ajax-with-jsonp/6879276#6879276
*/
import $ from 'jquery'

class Api {
  constructor(language = 'en') {
    this.url = `https://${language}.wikipedia.org`
    this.apiUrl = `${this.url}/w/api.php`
  }
  geosearchLocation(lat, lng) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.apiUrl,
        data: { format: 'json', action: 'query', list: 'geosearch', 'gsradius': 10000, gscoord: `${lat}|${lng}` },
        dataType: 'jsonp',
      })
        .done((results, textStatus, request) => {
          if (request.status === 200) {
            resolve(results)
          }
          else {
            reject(`status ${request.status}`)
          }
        })
        .fail(request => reject(`status ${request.status}`))
    })
  }
  searchPageIds(pageIds) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.apiUrl,
        data: { format: 'json', action: 'query', prop: 'extracts', 'exintro': '', pageids: pageIds.join('|') },
        dataType: 'jsonp',
      })
        .done((results, textStatus, request) => {
          if (request.status === 200) {
            resolve(results)
          }
          else {
            reject(`status ${request.status}`)
          }
        })
        .fail(request => reject(`status ${request.status}`))
    })
  }
  openNearbyPlaces(latLng, el) {
    this.geosearchLocation(latLng.lat, latLng.lng)
      .then(results => {
        const pageIds = results.query.geosearch.map(item => item.pageid)
        return this.searchPageIds(pageIds)
      })
      .then(results => {
        let content = `<h2>Nearby Wikis</h2>
                       <span><a href="https://www.wikimedia.org/"><small>Powered by Wikimedia</small></a><span>
                       <ul>`
        Object.keys(results.query.pages).forEach(key => {
          const value = results.query.pages[key]
          const url = `${this.url}/?curid=${value.pageid}`
          content +=
            `<li>
               <h3><a href=${url} target="_blank">${value.title}</a></h3>
               <p>${value.extract}</p>
             </li>`
        })
        content += '</ul>'
        if (el) {
          el.innerHTML = content
        }
      })
      .catch(error => {
        if (el) {
          el.textContent = `Wikimedia errror (${error})`
        }
      })
  }

}

export default Api

