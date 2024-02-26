const amqp = require("amqplib");
require("dotenv").config();
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");

// Firebase configuration (Retrieved from environment variable)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const exchangeName = "ESDTimez";

// ___ Starting the Logger ___
main();

function main() {
  consumingActivity();
}

// ___ Helper function ___
const generateRandomString = (length = 26) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// ____ FOR ACTIVITY ____
async function consumingActivity() {
  const queue = "Activity_Logs";
  const routingKey = "*.log";
  try {
    // Connecting to the RabbitMQ
    // RABBITMQ_URL="amqp://localhost:15672”
    const connection = await amqp.connect("amqp://host.docker.internal:5672");

    // Creating a Channel
    const channel = await connection.createChannel();

    // Asserting the Exchange
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    await channel.assertQueue(queue);
    await channel.bindQueue(queue, exchangeName, routingKey);

    console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

    // Consuming the Message
    channel.consume(queue, (msg) => handleMessage(msg, queue), {
      noAck: true,
    });
  } catch (e) {
    console.error(e);
  }
}

// 2. Function to send the consumed messages from RabbitMQ to FireStone
function handleMessage(msg, queue) {
  const messageData = JSON.parse(msg.content.toString());
  settingDocuments(messageData, queue);
}

// 3. Sending message to Firestore
async function settingDocuments(messageData, queue) {
  await setDoc(doc(db, queue, generateRandomString()), messageData);
}
