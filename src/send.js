const amqp = require("amqplib");

const currentUTCDate = new Date().toISOString().replace(/\.+$/, "Z");

// ___ SIMULATED DATA FOR CUSTOMER ___
const msg = {
  datetime: currentUTCDate,
  message: "Simulated failure in Purchase2222",
  username: "Jerome",
  usertype: "Customer",
};

// ___ SIMULATED DATA FOR EMPLOYEE ___
const msg2 = {
  datetime: currentUTCDate,
  message: "Simulated Failure in Fix 13 Feb",
  username: "Joseph Tan",
  usertype: "Employee",
};

// ___ ROUTING KEYS ___
const routingKey = "log.error";
const routingKey2 = "customer.log";

// sendData(msg, routingKey);
sendData(msg2, routingKey);

// ___ CONNECTING TO THE RABBITMQ ___
async function sendData(msg, routingKey) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "ESDTimez";

    await channel.assertExchange(exchange, "topic", { durable: true });

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    console.log(`Sent to exchange ${exchange} with routing key: ${routingKey}`);

    await channel.close();
    await connection.close();
  } catch (e) {
    console.error(e);
  }
}
