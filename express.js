const express = require('express')
const startRabbitMQserver = require('./rabbit/rpc-server.js')
  // const rabbitReceive = require('./rabbit/rabbit-receive.js')
// const rabbitSend = require('./rabbit/rabbit-send.js')

const app = express()
const port = process.env.PORT || 3502


// rabbitReceive('my-que', (msg) => {
//   console.log(`tuta 2: ${msg.content.toString()}`)
//   //rabbitSend('my-que-back', `${msg.content.toString()} + Express 2 part`)
// })

app.get('/', (req, res) => {
  try {
    res.send('Hello World! Express 2')
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/axios', (req, res) => {
  try {
    res.send('Express 2 answer on axios')
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  try {
    console.log('amqp://rabbitmq')
    await startRabbitMQserver()
    console.log('RabbitMQ launched')
  } catch (err) {
    console.log(`Something going wrong with RabbitMQ: ${err}`)
  } 
})