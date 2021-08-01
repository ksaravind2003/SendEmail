require('dotenv').config();

const nodemailer = require("nodemailer");

// The port to use when connecting to the SMTP server.
const port = 587;

// (Optional) the name of a configuration set to use for this message.
var configurationSet = "SendRawEmail";

// The subject line of the email
var subject = "Send Grid email test (Nodemailer)";

// The email body for recipients with non-HTML email clients.
var body_text = `Successfully sent email using SendGrid - SMTP Configuration.
`;

// The body of the email for recipients whose email clients support HTML content.
var body_html = `<html>
<head></head>
<body>
  <h1>SendGrid email Test (Nodemailer)</h1>
  <p>This email was sent with SendGrid using Node.js.</p>
</body>
</html>`;

// The message tags that you want to apply to the email.
var tag0 = "key0=value0";
var tag1 = "key1=value1";

async function main(){
  // Create the SMTP transport.
  let transporter = nodemailer.createTransport({
    host: process.env.SENDGRID_SMTP,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDGRID_SMTP_USERNAME,
      pass: process.env.SENDGRID_SMTP_KEY
    }
  });

  // Specify the fields in the email.
  let mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: process.env.TO_EMAIL_ADDRESS,
    subject: subject,
    text: body_text,
    html: body_html,
    // Custom headers for configuration set and message tags.
    headers: {      
      'X-SES-MESSAGE-TAGS': tag0,
      'X-SES-MESSAGE-TAGS': tag1
    }
  };

  // Send the email.
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent! Message ID: ", info.messageId);
}

main().catch(console.error);