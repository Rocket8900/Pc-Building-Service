const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const handleRepairEmails = require('./functions/handleRepairEmails');
const sendOrderMail = require('./templates/sendOrderMail')

const amqp = require("amqplib");
require("dotenv").config();

const exchangeName = "ESDTimez";
const queueName = "Email_Queue";  
const routingKey = "*.email";
// Function to consume messages from RabbitMQ
async function consumeMessages() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // Assert the exchange
    await channel.assertExchange(exchangeName, "topic", { durable: true });

    // Assert the queue
    const assertQueue = await channel.assertQueue(queueName, { durable: true });

    // Bind the queue to the exchange with the routing key
    await channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

    console.log("Waiting for messages in %s. To exit press CTRL+C", queueName);

    // Consume messages
    channel.consume(queueName, (msg) => {
      try {
        if (msg !== null) {
          //   console.log("Received message:", msg.content.toString());
          const messageContent = JSON.parse(msg.content.toString());
          console.log(messageContent);
          if(messageContent.type === "repairemail"){
            console.log("im sending a repair email")
            handleRepairEmails(messageContent);
          }
          else {
            const cart_data = messageContent.cart_data.data;
            console.log("CD: ", cart_data);
            const total = calculateTotal(cart_data.cart_item);
            sendOrderMail(
              cart_data.customer_id,
              "nashwyns.2022@smu.edu.sg",
              cart_data.cart_item,
              total,
              cart_data.date
            );
          }
      }} catch (error) {
        console.log("Message is unable to be processed due to data", msg)
      }
channel.ack(msg);
      
    });
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
}

consumeMessages();

function calculateTotal(cart_item) {
  let tempTotal = 0.0;

  cart_item.map((item) => {
    item.parts.map((part) => {
      tempTotal += part.quantity * part.parts_price;
    });
  });

  return tempTotal;
}
