// Create new file: server/routes/agreement.js
import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to get IP address
const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.ip || 
         'Unknown';
};

// Simple agreement endpoint
router.post('/submit-agreement', async (req, res) => {
  try {
    const { 
      customerEmail, 
      customerName, 
      bookingReference 
    } = req.body;

    // Get customer IP
    const clientIp = getClientIp(req);

    // 1. Send email to YOUR inbox
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL, // YOUR email
      subject: `✅ Customer Agreed - ${bookingReference}`,
      html: `
        <h2>Customer Agreement Received</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Booking:</strong> ${bookingReference}</p>
        <p><strong>IP Address:</strong> ${clientIp}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Customer clicked "I Agree" button.</p>
      `
    });

    // 2. Send confirmation to customer
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: customerEmail,
      subject: `Agreement Confirmed - ${bookingReference}`,
      html: `
        <h3>Thank you for your agreement</h3>
        <p>We have received your agreement and will proceed with your request.</p>
        <p><strong>Booking:</strong> ${bookingReference}</p>
        <p>Our team will contact you shortly.</p>
      `
    });

    res.json({
      success: true,
      message: 'Agreement submitted successfully'
    });

  } catch (error) {
    console.error('Agreement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit agreement'
    });
  }
});

export default router;