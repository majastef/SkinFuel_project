const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./mongoose')

const http = require('http')
const socketio = require('socket.io')

const { sendHelpEmail } = require('./email')
const { fetchData } = require('./mongoose')

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

let filters = [String]

io.on('connection', (socket) => {
  console.log('New WebSocket Connection!')

  socket.on('send-email', (email, content) => {
    sendHelpEmail(email, content)
  })

  socket.on('filter', (nonvegan, allergy) => {
    filters = [nonvegan, allergy]
  })
})

app.get('', (req, res) => {
  res.render('index')
})

app.get('/recipes', (req, res) => {
  res.render('recipes')
})

app.get('/recipes/meals', async (req, res) => {
  const breakfast = await fetchData('breakfast', filters)
  const lunch = await fetchData('lunch', filters)
  const dinner = await fetchData('dinner', filters)
  
  res.render('recipes/meals', {
    breakfast,
    lunch,
    dinner
  })
})

app.get('/recipes/snacks', (req, res) => {
  res.render('recipes/snacks')
})

app.get('/recipes/juices', (req, res) => {
  res.render('recipes/juices')
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