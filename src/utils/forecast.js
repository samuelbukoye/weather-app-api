const axios = require('axios').default

function ConvertToTime (timestamp) {
  var date = new Date(timestamp * 1000)
  var hours = date.getHours()
  var minutes = ('0' + date.getMinutes()).slice(-2)
  var seconds = ('0' + date.getSeconds()).slice(-2)

  return `${hours}:${minutes}`
}

const forecast = (lat, long, location, callback) => {
  const openweatherapiKey = '127d9e2cd99015fdd06f93737e4b535b'
  const openweatherapiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${openweatherapiKey}`

  axios
    .get(openweatherapiUrl)
    .then(function (res) {
      const data = res.data
      callback(
        undefined,
        `It is currently ${
          data.current.temp
        } degrees out in ${location}, with ${
          data.current.weather[0].description
        }. Sunrise at ${ConvertToTime(
          data.current.sunrise
        )}, and Sunset at ${ConvertToTime(data.current.sunset)}`
      )
    })
    .catch(function (err) {
      if (err.response) {
        callback(
          `${err.response.data.cod}: ${err.response.data.message}`,
          undefined
        )
      } else {
        callback('Unable to connect to weather service', undefined)
      }
    })
}

module.exports = forecast
