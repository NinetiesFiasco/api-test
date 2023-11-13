const express = require('express')
const { rpcServer } = require('./rabbit')

const app = express()
const PORT = process.env.PORT || 3502

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

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT} environment: ${process.env.NODE_ENV}`)
  try {
    await rpcServer()
    console.log('RabbitMQ launched')
  } catch (err) {
    console.log(`Something going wrong with RabbitMQ: ${err}`)
  } 
})