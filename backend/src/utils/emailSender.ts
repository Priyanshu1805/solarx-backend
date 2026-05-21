import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to: string, name: string, message: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '🎉 Thank You for Submitting the Form!',
    text: `Hello ${name},\n\nThank you for submitting the form. We have received your message: "${message}".\n\nWe will get back to you soon.\n\nBest Regards,\nYour Team`
  };

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Lead: ${name} submitted a form!`,
    text: `You have a new form submission.\n\nName: ${name}\nEmail: ${to}\nDetails:\n${message}`
  };

  try {
    // Send to customer
    await transporter.sendMail(mailOptions);
    // Send to admin
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Email sent successfully to both customer and admin');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

export default sendEmail;