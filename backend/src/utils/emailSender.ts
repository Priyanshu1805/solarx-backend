import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (to: string, name: string, message: string) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY is missing in Render environment variables');
    return;
  }

  // The sender email must be the one you verify on Brevo (usually your Gmail)
  const senderEmail = process.env.EMAIL_USER || 'ankushpatle31@gmail.com';
  const sender = {
    name: 'SolarX Team',
    email: senderEmail
  };

  const customerPayload = {
    sender,
    to: [{ email: to, name }],
    subject: '🎉 Thank You for Submitting the Form!',
    textContent: `Hello ${name},\n\nThank you for submitting the form. We have received your message: "${message}".\n\nWe will get back to you soon.\n\nBest Regards,\nYour Team`
  };

  const adminPayload = {
    sender,
    to: [{ email: senderEmail, name: 'Admin' }],
    subject: `New Lead: ${name} submitted a form!`,
    textContent: `You have a new form submission.\n\nName: ${name}\nEmail: ${to}\nDetails:\n${message}`
  };

  try {
    // Send to customer via HTTP API
    const resCustomer = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(customerPayload)
    });

    if (!resCustomer.ok) {
      console.error('❌ Failed to send to customer:', await resCustomer.text());
    }

    // Send to admin via HTTP API
    const resAdmin = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(adminPayload)
    });

    if (!resAdmin.ok) {
      console.error('❌ Failed to send to admin:', await resAdmin.text());
    }

    if (resCustomer.ok && resAdmin.ok) {
      console.log('✅ Email sent successfully to both customer and admin via API');
    }
  } catch (error) {
    console.error('❌ Error in Brevo API request:', error);
  }
};

export default sendEmail;