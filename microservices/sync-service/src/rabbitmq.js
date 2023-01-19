const amqp = require('amqplib');


exports.connect = function() {
    const user = process.env.RABBIT_USER;
    const password = process.env.RABBIT_PASSWORD;
    const host = process.env.RABBIT_HOST;
    const exchange = process.env.RABBIT_EXCHANGE;

    const connectString = `amqp://${user}:${password}@${host}`;

    console.log(`Connect to RabbitMQ: ${connectString}`);

    return amqp
        .connect(connectString)
        .then(connection => connection.createChannel())
        .then(channel => {
            const chok = channel.assertExchange(exchange, 'fanout', { durable: true });

            return chok
                .then(() => channel.assertQueue('', { exclusive: true }))
                .then(qok => channel.bindQueue(qok.queue, exchange, '').then(() => qok.queue))
                .then(queue => {
                    return {
                        publish(message) {
                            const buffer = new Buffer(JSON.stringify(message));
    
                            channel.publish(exchange, '', buffer);
                        },
                        subscribe(fn) {
                            const consumer = msg => {
                                const message = msg.content.toString();

                                fn(message);
                                channel.ack(msg);
                            };

                            channel.consume(queue, consumer, { noAck: false });
                        },
                    };
                })
        })
        .catch(error => console.error('Error connection to RabbitMQ: ', error));
}
