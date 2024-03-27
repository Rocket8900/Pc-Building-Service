import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Firebase configuration (Retrieved from environment variable)
const firebaseConfig = {
  apiKey: "AIzaSyDTCXW8ScG4qE-uZEpdwz-zkjuiC5KhFHQ",
  authDomain: "esdtimez.firebaseapp.com",
  projectId: "esdtimez",
  storageBucket: "esdtimez.appspot.com",
  messagingSenderId: "1093698459831",
  appId: "1:1093698459831:web:76e151390544a0b7bf5532",
};

// Initializing Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Initializing Express.js to listen for POST requests
const app = express();
const port = 3900;

// For allowing CORS
app.use(cors({ origin: "http://localhost:5173" }));

// For Content Security Policy
// Add CSP middleware to set Content-Security-Policy header
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' http://localhost:3900; connect-src 'self' ws://localhost:3900 wss://localhost:3900"
  );
  next();
});

// For parsing JSON bodies
app.use(bodyParser.json());

// Route to receive data via POST request
app.post("/api/data", cors(), async (req, res) => {
  // ___ Expecting data of this format ___
  // { "log_type": "Activity_Logs" / "Error_Logs" }

  const { log_type } = req.body;

  let data = [];
  console.log("Received data:", log_type);

  try {
    // // Retrieving from Firebase
    const querySnapshot = await getDocs(collection(db, log_type));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    // Returning data back to caller
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

app.options("/api/data", cors(), (req, res) => {
  // Respond to preflight request with appropriate headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your allowed origin
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Add allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Add allowed headers
  res.status(200).send();
});

// Listener
app.listen(port, () => {
  console.log(`Server is listening on port:`, port);
});
