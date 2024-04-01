const nodemailer = require("nodemailer");
require("dotenv").config();
const refreshAccessToken = require("../functions/refreshAccessToken");

async function sendOrderMail(name, recipient, cart_items, total, date) {
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
      // accessToken: process.env.ACCESS_TOKEN,
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

module.exports = sendOrderMail;
