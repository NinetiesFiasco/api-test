const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(err0, connection) {
  if (err0) throw err0

  connection.createChannel(function(err1, channel) {
    if (err1) throw err1

    const queue = 'rpc_queue'

    channel.assertQueue(queue, {durable: false})

    channel.prefetch(1)
    console.log(' [x] Awaiting RPC requests')

    channel.consume(queue, function reply(msg){
      const requestedMessage = msg.content.toString()

      const answer = `${requestedMessage} + Express 2 part`
      const {replyTo, correlationId} = msg.properties;
      channel.sendToQueue(replyTo, Buffer.from(answer), {correlationId})
      channel.ack(msg)
    })
  })
})