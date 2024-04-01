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
      to: "nashwyns.2022@smu.edu.sg",
      subject: `Your Repair has just been assigned an employee`,
      html: get_html_message(message),
    };
  
    // Email Content
    function get_html_message(message) {
      return `
              <h3>We have an update for your repair: ${message.repairID}!</h3>
              <div>Your repair has just been assigned to an employee!.</div>
              <div>${message.employeeName} has been assigned to your repair! Once the fault has been identified, you will be updated.</div>
              
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