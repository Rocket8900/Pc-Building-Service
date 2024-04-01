const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

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

module.exports = refreshAccessToken;
