const amqp = require('amqplib')

const RABBIT_MQ_URL =  'amqp://rabbitmq'
const RPC_QUEUE = 'rpc_queue'

module.exports = async function() {
  const connection = await createConnection()  
  
  const channel = await connection.createChannel()

  await channel.assertQueue(RPC_QUEUE, {durable: false})
  channel.prefetch(1)
  console.log(' [x] Awaiting RPC requests')

  channel.consume(RPC_QUEUE, function reply(msg){
    console.log(new Date().toLocaleTimeString())
    const requestedMessage = msg.content.toString()

    const answer = `${requestedMessage} + Express 2 part`
    const {replyTo, correlationId} = msg.properties;
    channel.sendToQueue(replyTo, Buffer.from(answer), {correlationId})
    channel.ack(msg)
  })
}

const createConnection = async function() {
  const maxTries = 12
  let tries = 0
  let connection

  while (!connection && tries < maxTries) {
    tries++;
    try {
      connection = await amqp.connect(RABBIT_MQ_URL)
    } catch (err) {
      console.log(`RabbitMQ connection failed: ${tries}`)
    }
    console.log(connection)
    await delay(10000)
  }
  if (!connection) {
    connection = await amqp.connect(RABBIT_MQ_URL)
  }

  return connection
}

const delay = ms => new Promise(res => setTimeout(res, ms));