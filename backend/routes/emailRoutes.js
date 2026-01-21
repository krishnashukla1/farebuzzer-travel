
// import express from "express";
// import { sendCustomerEmail } from "../controllers/sendEmailController.js";
// import Email from "../models/Email.js"; 
// import Template from "../models/Template.js"; 

// const router = express.Router();

// router.post("/send", sendCustomerEmail);

// // GET /emails → fetch inbox for frontend
// // router.get("/", async (req, res) => {
// //   try {
// //     const emails = await Email.find().sort({ receivedAt: -1 }); // latest first
// //     res.json(emails);
// //   } catch (err) {
// //     res.status(500).json({ status: "error", message: err.message });
// //   }
// // });

// // GET /api/email?type=received
// // GET /api/email?type=received
// router.get("/", async (req, res) => {
//   try {
//     const type = req.query.type; // 'received' or 'sent'
//     const filter = type ? { type } : {};

//     // Use limit for safer queries
//     const emails = await Email.find(filter)
//       .sort({ createdAt: -1 })
//       .limit(100); // fetch latest 100 emails only

//     res.json(emails);
//   } catch (err) {
//     console.error("Error fetching emails:", err);
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });




// router.post("/receive", async (req, res) => {
//   try {
//     const {
//       from,
//       subject,
//       message,
//       customerName,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//        refundAmount,
//       bookingAmount,
//     } = req.body;

//     const email = await Email.create({
//       type: "received",
//       emailType: "customer_support",
//       from,
//       to: "support@farebuzzer.com",
//       subject,
//       text: message,
//       meta: {
//         customerName,
//         confirmationNumber,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//          refundAmount,
//         bookingAmount,
//         message,
//       },
//     });

//     res.status(200).json({ status: "success", email });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });



// // Backend routes for templates (add to your existing email routes)

// // GET /email/templates - Get all templates
// router.get('/templates', async (req, res) => {
//   try {
//     const templates = await Template.find({});
//     res.json({ success: true, data: templates });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // POST /email/templates - Create new template
// router.post('/templates', async (req, res) => {
//   try {
//     const { name, emailType, data } = req.body;
    
//     const template = new Template({
//       name,
//       emailType,
//       data,
//       createdAt: new Date()
//     });
    
//     await template.save();
//     res.json({ success: true, data: template });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // DELETE /email/templates/:id - Delete template
// router.delete('/templates/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Template.findByIdAndDelete(id);
//     res.json({ success: true, message: 'Template deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });


// export default router;

// /**
// npm install imap-simple mailparser node-cron

// imap-simple → Gmail inbox se connect
// mailparser → email ka subject, body, sender nikalne ke liye
// node-cron → auto sync ke liye (har 1–2 min)
//  */




//=====================19 jan============


// import express from "express";
// import { sendCustomerEmail } from "../controllers/sendEmailController.js";
// import Email from "../models/Email.js";
// import Template from "../models/Template.js";

// const router = express.Router();

// /* ======================================================
//    SEND EMAIL (OUTGOING)
// ====================================================== */
// router.post("/send", sendCustomerEmail);

// /* ======================================================
//    GET EMAILS (INBOX / SENT)
//    GET /api/email?type=received | sent
// ====================================================== */
// router.get("/", async (req, res) => {
//   try {
//     const { type } = req.query; // received | sent
//     const filter = type ? { type } : {};

//     const emails = await Email.find(filter)
//       .sort({ createdAt: -1 })
//       .limit(100); // safety limit

//     res.json({ success: true, data: emails });
//   } catch (err) {
//     console.error("Error fetching emails:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch emails",
//     });
//   }
// });

// /* ======================================================
//    RECEIVE EMAIL (FROM WEBSITE / FORM)
// ====================================================== */
// router.post("/receive", async (req, res) => {
//   try {
//     const {
//       from,
//       subject,
//       message, // plain text only
//       customerName,
//       confirmationNumber,
//       airline,
//       departure,
//       arrival,
//       travelDate,
//       refundAmount,
//       bookingAmount,
//     } = req.body;

//     if (!from || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     const email = await Email.create({
//       type: "received",
//       emailType: "customer_support",
//       from,
//       to: "support@farebuzzer.com",
//       subject,
//       text: message, // ✅ ONLY TEXT (NO HTML)
//       meta: {
//         customerName,
//         confirmationNumber,
//         airline,
//         departure,
//         arrival,
//         travelDate,
//         refundAmount,
//         bookingAmount,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Email received & stored",
//       data: email,
//     });
//   } catch (err) {
//     console.error("Receive email error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// /* ======================================================
//    EMAIL TEMPLATES
// ====================================================== */

// // GET all templates
// router.get("/templates", async (req, res) => {
//   try {
//     const templates = await Template.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: templates });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // CREATE template
// router.post("/templates", async (req, res) => {
//   try {
//     const { name, emailType, data } = req.body;

//     if (!name || !data) {
//       return res.status(400).json({
//         success: false,
//         message: "Template name & data required",
//       });
//     }

//     const template = await Template.create({
//       name,
//       emailType,
//       data,
//     });

//     res.json({ success: true, data: template });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // DELETE template
// router.delete("/templates/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Template.findByIdAndDelete(id);

//     res.json({
//       success: true,
//       message: "Template deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// export default router;

/**
 * npm install imap-simple mailparser node-cron
 *
 * imap-simple → Gmail inbox connect
 * mailparser → subject / body parsing
 * node-cron → auto sync (1–2 min)
 */


//===============21 jan===============


// import express from "express";
// import fetchEmails from "../services/fetchEmails.js";
// import Email from "../models/Email.js"; // Only for sent emails
// import Template from "../models/Template.js"; 
// // import { sendCustomerEmail } from "../controllers/sendEmailController.js";

// const router = express.Router();

// // ----------------- LIVE INBOX -----------------
// router.get("/inbox/live", async (req, res) => {
//   try {
//     const emails = await fetchEmails();
//     res.json({ success: true, data: emails });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // ----------------- SENT EMAIL -----------------
// router.post("/send", async (req, res) => {
//   try {
//     // Example send logic (use your sendCustomerEmail controller)
//     const { to, subject, text, html } = req.body;

//     // Save sent email in DB
//     const email = await Email.create({
//       type: "sent",
//       emailType: "customer_support",
//       from: "support@farebuzzer.com",
//       to,
//       subject,
//       text,
//       html,
//     });

//     res.json({ success: true, email });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ----------------- TEMPLATES -----------------
// router.get("/templates", async (req, res) => {
//   try {
//     const templates = await Template.find({});
//     res.json({ success: true, data: templates });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.post("/templates", async (req, res) => {
//   try {
//     const { name, emailType, data } = req.body;
//     const template = new Template({ name, emailType, data });
//     await template.save();
//     res.json({ success: true, data: template });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.delete("/templates/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Template.findByIdAndDelete(id);
//     res.json({ success: true, message: "Template deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;


//===update 

import express from "express";
import fetchEmails from "../services/fetchEmails.js"; // Live inbox fetch
import Email from "../models/Email.js"; // Only store sent emails
import Template from "../models/Template.js"; 
import { sendCustomerEmail } from "../controllers/sendEmailController.js";

const router = express.Router();

/* ======================================================
   LIVE INBOX (Fetch directly from Gmail via IMAP)
   GET /api/email/inbox/live
====================================================== */
router.get("/inbox/live", async (req, res) => {
  try {
    const emails = await fetchEmails(); // fetchEmails returns array of live emails
    res.json({ success: true, data: emails });
  } catch (err) {
    console.error("Live inbox fetch error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
/* ======================================================
  GET CRM SENT EMAILS
   GET /api/email/inbox/sent
====================================================== */
router.get("/inbox/sent", async (req, res) => {
  try {
    const emails = await Email.find({ type: "sent" })
      .sort({ createdAt: -1 })
      .limit(100); // latest 100 sent emails
    res.json({ success: true, data: emails });
  } catch (err) {
    console.error("Sent emails fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch sent emails" });
  }
});

/* ======================================================
   SEND EMAIL (Outgoing)
   POST /api/email/send
====================================================== */
router.post("/send", sendCustomerEmail);

/* ======================================================
   FETCH EMAILS (Inbox / Sent from DB)
   GET /api/email?type=received|sent
====================================================== */
router.get("/", async (req, res) => {
  try {
    const { type } = req.query; // received | sent
    const filter = type ? { type } : {};

    const emails = await Email.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ success: true, data: emails });
  } catch (err) {
    console.error("Fetch emails error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch emails" });
  }
});

/* ======================================================
   RECEIVE EMAIL (From website form / CRM)
   POST /api/email/receive
====================================================== */
router.post("/receive", async (req, res) => {
  try {
    const {
      from,
      subject,
      message, // plain text
      customerName,
      confirmationNumber,
      airline,
      departure,
      arrival,
      travelDate,
      refundAmount,
      bookingAmount,
    } = req.body;

    if (!from || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const email = await Email.create({
      type: "received",
      emailType: "customer_support",
      from,
      to: "besttripmakers@gmail.com", // <-- use your actual Gmail inbox
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
      },
    });

    res.status(200).json({
      success: true,
      message: "Email received & stored",
      data: email,
    });
  } catch (err) {
    console.error("Receive email error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================================================
   EMAIL TEMPLATES
====================================================== */

// GET all templates
router.get("/templates", async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE template
router.post("/templates", async (req, res) => {
  try {
    const { name, emailType, data } = req.body;
    if (!name || !data) {
      return res.status(400).json({ success: false, message: "Template name & data required" });
    }

    const template = await Template.create({ name, emailType, data });
    res.json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE template
router.delete("/templates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Template.findByIdAndDelete(id);
    res.json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
