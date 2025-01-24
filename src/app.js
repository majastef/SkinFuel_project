const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./mongoose')

const http = require('http')
const socketio = require('socket.io')

const { sendHelpEmail } = require('./email')
const { fetchMeals, fetchJuices } = require('./mongoose')

// Generate an application
const app = express()

const server = http.createServer(app) // Use the HTTP server to support WebSockets
const io = socketio(server) // Create a new instance of Socket.IO

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Customize a server, static takes a path to the folder we want to serve up
app.use(express.static(publicDirectoryPath))

let filters = []
let fetchedFilters = []
let filter = ''
let fetchedFilter = ''

io.on('connection', (socket) => {
  console.log('New WebSocket Connection!')

  socket.on('send-email', (email, content) => {
    sendHelpEmail(email, content)
  })

  socket.on('meals-filter', (vegan, allergy) => {
    fetchedFilters = [vegan, allergy]
  })

  socket.on('juices-filter', (diet) => {
    fetchedFilter = diet
  })
})

app.get('', (req, res) => {
  res.render('index')
})

app.get('/recipes', (req, res) => {
  res.render('recipes')
})

app.get('/recipes/meals', async (req, res) => {
  filters = ['none', 'none']
  let breakfastTitle = ''
  let lunchTitle = ''
  let dinnerTitle = ''
  let msg = ''

  if (fetchedFilters.length) {
    filters = fetchedFilters
  } 

  const breakfast = await fetchMeals('breakfast', filters)
  const lunch = await fetchMeals('lunch', filters)
  const dinner = await fetchMeals('dinner', filters)

  if (breakfast.length !== 0) {
    breakfastTitle = 'BREAKFAST'
  }

  if (lunch.length !== 0) {
    lunchTitle = 'LUNCH'
  }

  if (dinner.length !== 0) {
    dinnerTitle = 'DINNER'
  }

  if (breakfast.length === 0 && lunch.length === 0 && dinner.length === 0) {
    msg = 'Oops! There are no recipes for those filters!'
  }
  
  res.render('recipes/meals', {
    breakfast,
    breakfastTitle,
    lunch,
    lunchTitle,
    dinner,
    dinnerTitle,
    msg
  })
})


app.get('/recipes/juices', async (req, res) => {
  filter = 'none'
  let juicesTitle = ''
  let msg = ''

  if (fetchedFilter) {
    filter = fetchedFilter
  }

  const juices = await fetchJuices(filter)
  
  if (juices.length === 0) {
    msg = 'Oops! There are no juices for those filters!'
  } else {
    juicesTitle = 'JUICES'
  }

  res.render('recipes/juices', {
    juices,
    juicesTitle,
    msg
  })
})

app.get('/help', (req, res) => {
  res.render('help')
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found!',
    title: '404'
  })
})

// Run the server
server.listen(port, () => {
  console.log('Server is up on port ' + port)
})