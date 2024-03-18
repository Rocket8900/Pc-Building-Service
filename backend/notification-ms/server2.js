const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const amqp = require("amqplib");
require("dotenv").config();

const exchangeName = "ESDTimez";
const queueName = "Email_Queue";
const routingKey = "*.email";

// Function to consume messages from RabbitMQ
async function consumeMessages() {
  try {
    const connection = await amqp.connect("amqp://host.docker.internal:5672");
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
      if (msg !== null) {
        //   console.log("Received message:", msg.content.toString());
        const messageContent = JSON.parse(msg.content.toString());
        console.log(messageContent);
        const cart_data = messageContent.cart_data.data;
        console.log("CD: ", cart_data);
        const total = calculateTotal(cart_data.cart_item);
        sendMail(
          cart_data.customer_id,
          "whluk.2022@scis.smu.edu.sg",
          cart_data.cart_item,
          total,
          cart_data.date
        );
        channel.ack(msg);
      }
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

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// This will be the start
async function sendMail(name, recipient, cart_items, total, date) {
  const accessToken = await refreshAccessToken();

  // Authentication details
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "esdtimez@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  // Mailing Option
  const mail_options = {
    from: `ESDShop <esdtimez@gmail.com>`,
    to: recipient,
    subject: `Order Success on ${date}`,
    html: get_html_message(name, cart_items, total),
  };

  // Email Content
  function get_html_message(name, cart_items, total) {
    let rows = "";
    cart_items.map((item) => {
      // Header of the Item
      let item_price = 0.0;

      rows += `<tr><th colspan="4" style="background-color: #f0f0f0; padding: 10px;">${item.pc_name}</th></tr>`;

      // Each Part
      rows += item.parts
        .map((part) => {
          let part_total = part.parts_price * part.quantity;
          item_price += part_total;
          return `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; text-align: center">${part.parts_name}</td>
                <td style="padding: 10px; text-align: center">${part.parts_price}</td>
                <td style="padding: 10px; text-align: center">${part.quantity}</td>
                <td style="padding: 10px; text-align: center">${part_total}</td>
            </tr>
        `;
        })
        .join("");

      // Sub-total
      rows += `<tr style="font-weight: bold; background-color: #f0f0f0; text-align: right;">
          <td colspan="4" style="border-top: 2px solid #ddd; margin-top: 3px; text-align: right; margin-right: 5px;">
            Sub-total: $${item_price.toFixed(2)}
          </td>
        </tr>`;
    });

    // Grand Total
    rows += `<tr style="font-weight: bold; background-color: #f0f0f0; text-align: right;">
          <td colspan="4" style="border-top: 2px solid #ddd; margin-top: 3px; text-align: right; margin-right: 5px;">
            Total: $${total.toFixed(2)}
          </td>
        </tr>`;

    return `
            <h3>Congratulations ${name}!</h3>
            <div>Your order is on its way.</div>
            <div>Here are the details on your order:</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border:  1px solid #ddd; width:  100%;">
                <thead>
                    <tr>
                        <th style="padding:  10px; border:  1px solid #ddd;">Name</th>
                        <th style="padding:  10px; border:  1px solid #ddd;">Price</th>
                        <th style="padding:  10px; border:  1px solid #ddd;">Quantity</th>
                        <th style="padding:  10px; border:  1px solid #ddd;">Sub-total</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                    </tr>
                </tbody>
            </table>
        `;
  }

  // Actual sending
  transport.sendMail(mail_options, function (error, result) {
    if (error) console.error("Error: ", error);
    else console.log("Success: ", result);
    transport.close();
  });
}

// Refresh access token using OAuth2_client
async function refreshAccessToken() {
  return new Promise((resolve, reject) => {
    OAuth2_client.refreshAccessToken((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      OAuth2_client.setCredentials(tokens);
      resolve(tokens.access_token);
    });
  });
}
