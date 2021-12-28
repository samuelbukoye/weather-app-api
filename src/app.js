const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const log = console.log

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Samuel Bukoye'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Samuel Bukoye'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Samuel Bukoye',
    message: 'This is something to help you'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: 'must provide address parameter'
    })
  }
  geocode(req.query.address, (err, geocodeData) => {
    if (err) {
      return res.send({ err })
    }
    const { lat, long, location } = geocodeData
    forecast(lat, long, (err, forecastData) => {
      if (err) {
        return res.send({ err })
      }
      res.send({
        forecast: forecastData,
        location: location
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    name: 'Samuel Bukoye',
    message: 'Help Article Not Found'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: 'Help',
    name: 'Samuel Bukoye',
    message: 'Page Not Found'
  })
})

app.listen(3000, () => {
  log('server is up on port 3000')
})
