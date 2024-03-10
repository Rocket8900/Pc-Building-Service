// To access env variables
require("dotenv").config();

// For Express Server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// For Email
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Total Cost
let total = 0;

// _________________ Express Stuff to Receive Data _________________

// Receive data via POST from Checkout page
const app = express();
const port = 5900;

// Global CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "X-My-Custom-Header"],
  })
);

// For parsing JSON bodies
app.use(bodyParser.json());

// ____ Sending the Confirmation Email ____
app.post("/send-confirmation-email", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-My-Custom-Header"
  );
  res.setHeader("Content-Type", "application/json");

  // Retrieving from the Body of the Request
  const orders = req.body;

  console.log("DATA: ", orders.data);

  // Retrieving the Customer ID
  const customerID = orders.data.customer_id;

  // Orders are an Array of objects
  const cart_items = orders.data.cart_item;

  getTotalCost(cart_items); // Calculate total cost incurred
  console.log(total);

  try {
    await sendMail(customerID, "whluk.2022@smu.edu.sg", cart_items, total);
    // Send a success response
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error sending email:", error);
    // Send an error response
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Listener
app.listen(port, () => {
  console.log(`Server is listening on port:`, port);
});

// This iterates through all cart_items to calculate the total price
function getTotalCost(cart_items) {
  cart_items.map((item) => {
    item.parts.map((part) => {
      total += part.parts_price * part.quantity;
    });
  });
}

// ________________________ Email Stuff _____________________________________

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// This will be the start
async function sendMail(name, recipient, cart_items, total) {
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
    subject: "Order Success",
    html: get_html_message(name, cart_items, total),
  };

  // Email Content
  function get_html_message(name, cart_items, total) {
    let rows = "";
    cart_items.map((item) => {
      // Header of the Item
      rows += `<tr><th colspan="4" style="background-color: #f0f0f0; padding: 10px;">${item.pc_name}</th></tr>`;

      // Each Part
      rows += item.parts
        .map(
          (part) => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; text-align: center">${
                  part.parts_name
                }</td>
                <td style="padding: 10px; text-align: center">${
                  part.parts_price
                }</td>
                <td style="padding: 10px; text-align: center">${
                  part.quantity
                }</td>
                <td style="padding: 10px; text-align: center">${
                  part.parts_price * part.quantity
                }</td>
            </tr>
        `
        )
        .join("");

      // Sub-total
      rows += `<tr style="font-weight: bold; background-color: #f0f0f0; text-align: right;">
      <td colspan="4" style="border-top: 2px solid #ddd; margin-top: 3px; text-align: right; margin-right: 5px;">
        Sub-total: $${item.price.toFixed(2)}
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
