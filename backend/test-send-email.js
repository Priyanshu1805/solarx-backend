require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testSend() {
  const to = process.env.EMAIL_USER;
  const name = "Test User";
  const message = "This is a test message";
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '🎉 Thank You for Submitting the Form!',
    text: `Hello ${name},\n\nThank you for submitting the form. We have received your message: "${message}".\n\nWe will get back to you soon.\n\nBest Regards,\nYour Team`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent! Info:", info.messageId);
  } catch(e) {
    console.error("Error sending:", e);
  }
}
testSend();
