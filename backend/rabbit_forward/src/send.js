const amqp = require("amqplib");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3200;

// For parsing JSON bodies
app.use(bodyParser.json());

// Route to receive data via POST request
app.post("/api/data", async (req, res) => {
  // ___ Expecting data of this format ___
  // {
  //   "routingKey": "*.error" / "*.log",
  //   "data": "data stuff"
  // }
  const { routingKey, data } = req.body;

  console.log("Received data:", data);

  try {
    const connection = await amqp.connect("amqp://host.docker.internal:5672");
    const channel = await connection.createChannel();

    const exchange = "ESDTimez";

    await channel.assertExchange(exchange, "topic", { durable: true });

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));
    res.status(200).send(`${routingKey} received & sent to RabbitMQ`);

    await channel.close();
    await connection.close();
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Listener
app.listen(port, () => {
  console.log(`Server is listening on port:`, port);
});
