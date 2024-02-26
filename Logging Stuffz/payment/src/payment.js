require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Receive data via POST from Checkout page
const app = express();
const port = 3400;

// Global CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "X-My-Custom-Header"],
  })
);

// ____ For retrieving the publishable Key (Stripe) ____
app.get("/api/v1/config", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ publishableKey: process.env.STRIPE_PUBLISH_KEY });
});

// For parsing JSON bodies
app.use(bodyParser.json());

// ____ For Creating the Payment Intent (Stripe) ____
app.post("/api/v1/create-payment-intent", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-My-Custom-Header"
  );
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  const { total } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: total * 100,
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// Listener
app.listen(port, () => {
  console.log(`Server is listening on port:`, port);
});
