import localforage from 'localforage'

localforage.config({
  driver: localforage.IndexedDB, // Force WebSQL same as using setDriver()
    name        : 'Thranslator',
    version     : 1.0,
    storeName   : 'Thranslator', // Should be alphanumeric, with underscores.
    description : 'Thranslator'
})


export default localforage
