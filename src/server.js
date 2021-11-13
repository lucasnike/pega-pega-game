const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, '..', 'static')))

const server = http.createServer(app)
const io = new Server(server)

app.get('/', (request, response) => {
  const pathHTML = path.resolve(__dirname, '..', 'static', 'index.html')
  response.sendFile(pathHTML)
})

io.on('connection', socket => {
  console.log('Conectado')

  socket.on('keydown', (info) => {

    io.emit('keydown', info)

  })

  socket.on('score', score => {

    console.log(score)
    io.emit('score', score)
  })
})



server.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000 🚀')
})