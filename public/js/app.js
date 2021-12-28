const log = console.log

log('thus is clint side js')

fetch('http://localhost:3000/weather?address="!"')
  .then(res => res.json())
  .then(data => log(data))
  .catch(err => log(err))
