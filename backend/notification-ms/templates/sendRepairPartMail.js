const nodemailer = require("nodemailer");
require("dotenv").config();
const refreshAccessToken = require('../functions/refreshAccessToken')

async function sendRepairStatusMail(message) {
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
      to: "whluk.2022@scis.smu.edu.sg",
      subject: `We found what has been giving you trouble`,
      html: get_html_message(message),
    };
  
    // Email Content
    function get_html_message(message) {
      return `
              <h3>We have an update for your repair: ${message.repairID}!</h3>
              <div>The issue with your repair has been identified.</div>
              <div>Our employee has found that ${message.RepairPart} was faulty. Since your order is within our warranty period, we are replacing this free of charge!!</div>
              <div>Hang tight and we will let you know once the repair is done and ready to be picked up</div>
              
          `;
    }
  
    // Actual sending
    transport.sendMail(mail_options, function (error, result) {
      if (error) console.error("Error: ", error);
      else console.log("Success: ", result);
      transport.close();
    });
  }

  module.exports = sendRepairStatusMail;