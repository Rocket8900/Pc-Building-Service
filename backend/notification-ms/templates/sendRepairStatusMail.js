const nodemailer = require("nodemailer");
require("dotenv").config();
const refreshAccessToken = require("../functions/refreshAccessToken");

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
    to: message.customer_email,
    subject: `There has been an update to your order status`,
    html: get_html_message(message),
  };

  // Email Content
  function get_html_message(message) {
    return `
              <h3>Congratulations ${message.customer_name}!</h3>
              <div>Your repair for Order #${message.repairID} has completed!.</div>
              <div>Do come down to our office and collect your repaired pc.</div>
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
