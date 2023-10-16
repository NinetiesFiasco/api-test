const amqp = require('amqplib')

const RABBIT_MQ_URL =  'amqp://localhost'
const RPC_QUEUE = 'rpc_queue'

module.exports = async function() {
  const connection = await amqp.connect(RABBIT_MQ_URL)
  const channel = await connection.createChannel()

  await channel.assertQueue(RPC_QUEUE, {durable: false})
  channel.prefetch(1)
  console.log(' [x] Awaiting RPC requests')

  channel.consume(RPC_QUEUE, function reply(msg){
    const requestedMessage = msg.content.toString()

    const answer = `${requestedMessage} + Express 2 part`
    const {replyTo, correlationId} = msg.properties;
    channel.sendToQueue(replyTo, Buffer.from(answer), {correlationId})
    channel.ack(msg)
  })
}