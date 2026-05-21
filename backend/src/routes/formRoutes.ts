import express from 'express';
import FormData from '../models/FormModel';
import sendEmail from '../utils/emailSender';

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const formData = new FormData({ name, email, message });
    await formData.save();

    // Send Email Notification (Background process so form submits instantly)
    sendEmail(email, name, message);

    // Instant Greeting Message
    res.status(200).json({
      success: true,
      message: `👋 Hello ${name}! Your form has been submitted successfully. We will contact you soon.`
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;