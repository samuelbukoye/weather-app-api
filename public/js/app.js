const log = console.log

log('thus is clint side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => log(data))
    .catch(err => log(err))
})
