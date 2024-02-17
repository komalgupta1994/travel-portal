const rabbitMQURI = `amqp://${process.env.RabbitMQ_Username || 'guest'}:${process.env.RabbitMQ_Password || 'guest'}@${process.env.RabbitMQ_Host || 'localhost'}:5672`;

export const rabbitMQConfig = {
    exchanges: [
      {
        name: 'notification_exchange',
        type: 'topic',
      },
    ],
    uri: rabbitMQURI, // replace with your RabbitMQ server URI
  }