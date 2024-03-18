const amqp = require("amqplib");

// For Setting up the Exchange, Queues & Channels
async function setupRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // Setting the different Queues
    const exchangeName = "ESDTimez";
    const errorQueue = "Error_Logs";
    const activityQueue = "Activity_Logs";
    const emailQueue = "Email_Queue";

    // Asserting the Exchange; Create if don't exist
    // Using "Topic" Exchange Type
    await channel.assertExchange(exchangeName, "topic", { durable: true });

    // Asserting the Queue; Create if don't exist
    await channel.assertQueue(errorQueue, { durable: true });
    await channel.assertQueue(activityQueue, { durable: true });
    await channel.assertQueue(emailQueue, { durable: true });

    // Setting the Binding Key to the Queue
    await channel.bindQueue(errorQueue, exchangeName, "*.error");
    await channel.bindQueue(activityQueue, exchangeName, "*.log");
    await channel.bindQueue(emailQueue, exchangeName, "*.email");
    console.log("Channels, Exchange & Queues created");

    // Closing the Channel & Connections
    channel.close();
    connection.close();
  } catch (e) {
    console.error(e);
  }
}

setupRabbitMQ();
