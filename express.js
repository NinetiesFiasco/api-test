const express = require('express')
const startRabbitMQserver = require('./rabbit/rpc-server.js')
  // const rabbitReceive = require('./rabbit/rabbit-receive.js')
// const rabbitSend = require('./rabbit/rabbit-send.js')

const app = express()
const port = 3502


// rabbitReceive('my-que', (msg) => {
//   console.log(`tuta 2: ${msg.content.toString()}`)
//   //rabbitSend('my-que-back', `${msg.content.toString()} + Express 2 part`)
// })

app.get('/', (req, res) => {
  res.send('Hello World! Express 2')
})

app.get('/axios', (req, res) => {
  res.send('Express 2 answer on axios')
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  await startRabbitMQserver()
  console.log('RabbitMQ launched')
})