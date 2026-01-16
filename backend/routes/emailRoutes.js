
import express from "express";
import { sendCustomerEmail } from "../controllers/sendEmailController.js";
import Email from "../models/Email.js"; 
import Template from "../models/Template.js"; 

const router = express.Router();

router.post("/send", sendCustomerEmail);

// GET /emails → fetch inbox for frontend
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find().sort({ receivedAt: -1 }); // latest first
    res.json(emails);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/receive", async (req, res) => {
  try {
    const {
      from,
      subject,
      message,
      customerName,
      confirmationNumber,
      airline,
      departure,
      arrival,
      travelDate,
       refundAmount,
      bookingAmount,
    } = req.body;

    const email = await Email.create({
      type: "received",
      emailType: "customer_support",
      from,
      to: "support@farebuzzer.com",
      subject,
      text: message,
      meta: {
        customerName,
        confirmationNumber,
        airline,
        departure,
        arrival,
        travelDate,
         refundAmount,
        bookingAmount,
        message,
      },
    });

    res.status(200).json({ status: "success", email });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});



// Backend routes for templates (add to your existing email routes)

// GET /email/templates - Get all templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await Template.find({});
    res.json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /email/templates - Create new template
router.post('/templates', async (req, res) => {
  try {
    const { name, emailType, data } = req.body;
    
    const template = new Template({
      name,
      emailType,
      data,
      createdAt: new Date()
    });
    
    await template.save();
    res.json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /email/templates/:id - Delete template
router.delete('/templates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Template.findByIdAndDelete(id);
    res.json({ success: true, message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;

/**
npm install imap-simple mailparser node-cron

imap-simple → Gmail inbox se connect
mailparser → email ka subject, body, sender nikalne ke liye
node-cron → auto sync ke liye (har 1–2 min)
 */