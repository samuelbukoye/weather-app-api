const axios = require('axios').default

const geocode = (address, callback) => {
  const mapboxKey =
    'pk.eyJ1IjoicHN0YXJseWsiLCJhIjoiY2t4aHZocGY1MDRrYTJycWt5d3psbXBseSJ9.XJdIhUYxjSNQNl13nfSuTA'
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxKey}&limit=1`
  //   mapbox
  axios
    .get(mapboxUrl)
    .then(function (res) {
      if (res.data.features.length === 0) {
        callback('Unable to find location. Try another search', undefined)
      } else {
        const features = res.data.features[0]
        const long = features.center[0]
        const lat = features.center[1]
        const location = features.place_name

        callback(undefined, {
          lat,
          long,
          location
        })
      }
    })
    .catch(function (err) {
      if (err.response) {
        callback(err.response.data.message, undefined)
      } else {
        callback('Unable to connect to location services', undefined)
      }
    })
}

module.exports = geocode
