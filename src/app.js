const path = require('path')
const express = require('express')
const app = express()
const log = console.log

const publicDirPath = path.join(__dirname, '../public')
app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Samuel head'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Samuel head'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is something to help you'
  })
})
app.get('/weather', (req, res) => {
  res.send('weather page')
})

app.listen(3000, () => {
  log('server is up on port 3000')
})
