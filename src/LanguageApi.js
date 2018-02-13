class LanguageApi {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey
  }
  loadLanguage() {
    return new Promise((resolve, reject) => {
      const rawStorage = localStorage[this.localStorageKey]
      let storage = null
      if (rawStorage)
        storage = JSON.parse(rawStorage)
      if (!storage || !storage.language) {
        const language = 'en'
        const newStorage = storage ? { ...storage, language } : { language }
        localStorage[this.localStorageKey] = JSON.stringify(newStorage)
        resolve(language)
      }
      else {
        const { language } = JSON.parse(localStorage[this.localStorageKey])
        resolve(language)
      }
    })
  }
  updateLanguage(language) {
    return new Promise((resolve, reject) => {
      let storage = JSON.parse(localStorage[this.localStorageKey])
      if (language === storage.language) {
        const err = `LanguageApi.updateLanguage() language ${language} already in use`
        reject(err)
        return
      }
      storage.language = language
      localStorage[this.localStorageKey] = JSON.stringify(storage)
      resolve(language)
    })
  }
}

export default LanguageApi
