const path = require('path')
const express = require('express')
const app = express()
const log = console.log

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

app.get('/weather', (req, res) => {
  res.send('weather page')
})

app.listen(3000, () => {
  log('server is up on port 3000')
})
