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
      subject: `There has been an update to your order status`,
      html: get_html_message(message),
    };
  
    // Email Content
    function get_html_message(message) {
      return `
              <h3>Congratulations ${message.repairID}!</h3>
              <div>Your order has an update on the status!.</div>
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
                      ${message.status}
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

  module.exports = sendRepairStatusMail;