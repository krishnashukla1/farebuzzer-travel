// import Invoice from "../models/Invoice.js";
// import transporter from "../utils/email.js";
// import { generateMessageId } from "./sendEmailController.js";

// // Create invoice from booking data
// export const createInvoice = async (req, res) => {
//   try {
//     const {
//       customerName,
//       customerEmail,
//       customerPhone,
//       bookingRef,
//       emailType,
//       senderBrand,
//       amount,
//       messageId,
//       items = []
//     } = req.body;

//     // Generate invoice number
//     const invoiceNumber = await Invoice.generateInvoiceNumber();

//     // Create invoice
//     const invoice = await Invoice.create({
//       invoiceNumber,
//       customerName,
//       customerEmail,
//       customerPhone,
//       bookingRef,
//       emailType,
//       senderBrand,
//       amount,
//       messageId,
//       items: items.length > 0 ? items : [{
//         description: "Booking Amount",
//         quantity: 1,
//         unitPrice: amount,
//         total: amount
//       }],
//       paymentLink: generatePaymentLink(invoiceNumber, amount)
//     });

//     res.status(201).json({
//       status: "success",
//       data: invoice
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// };

// // Generate PayPal payment link
// const generatePaymentLink = (invoiceNumber, amount) => {
//   const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
//   return `${frontendUrl}/pay-invoice/${invoiceNumber}?amount=${amount}`;
// };

// // Get invoice by ID
// export const getInvoice = async (req, res) => {
//   try {
//     const { invoiceNumber } = req.params;
    
//     const invoice = await Invoice.findOne({ invoiceNumber });
    
//     if (!invoice) {
//       return res.status(404).json({
//         status: "error",
//         message: "Invoice not found"
//       });
//     }
    
//     res.status(200).json({
//       status: "success",
//       data: invoice
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// };

// // Update payment status
// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const { invoiceNumber } = req.params;
//     const { 
//       paymentStatus, 
//       paymentMethod, 
//       transactionId 
//     } = req.body;
    
//     const updateData = {
//       paymentStatus,
//       updatedAt: Date.now()
//     };
    
//     if (paymentStatus === "PAID") {
//       updateData.paymentDate = Date.now();
//       updateData.paymentMethod = paymentMethod;
//       updateData.transactionId = transactionId;
//     }
    
//     const invoice = await Invoice.findOneAndUpdate(
//       { invoiceNumber },
//       updateData,
//       { new: true }
//     );
    
//     // Send payment confirmation email if paid
//     if (paymentStatus === "PAID" && invoice) {
//       await sendPaymentConfirmationEmail(invoice);
//     }
    
//     res.status(200).json({
//       status: "success",
//       data: invoice
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// };

// // Send payment confirmation email
// const sendPaymentConfirmationEmail = async (invoice) => {
//   try {
//     const html = `
//       <div style="font-family:Arial,sans-serif;padding:30px;max-width:600px;margin:0 auto;">
//         <div style="text-align:center;padding-bottom:20px;">
//           <h1 style="color:#10b981;">Payment Confirmation</h1>
//         </div>
        
//         <p>Dear ${invoice.customerName},</p>
        
//         <p>Thank you for your payment. We have successfully received your payment for invoice <strong>${invoice.invoiceNumber}</strong>.</p>
        
//         <div style="background:#f0fff4;padding:20px;border-radius:8px;margin:20px 0;">
//           <h3 style="color:#065f46;">Payment Details</h3>
//           <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
//           <p><strong>Amount Paid:</strong> $${invoice.amount}</p>
//           <p><strong>Payment Date:</strong> ${new Date(invoice.paymentDate).toLocaleDateString()}</p>
//           <p><strong>Transaction ID:</strong> ${invoice.transactionId || 'N/A'}</p>
//         </div>
        
//         <p>Thank you for choosing FareBuzzer Travel.</p>
        
//         <p>Regards,<br>
//         <strong>FareBuzzer Support Team</strong></p>
//       </div>
//     `;
    
//     await transporter.sendMail({
//       from: `"FareBuzzer" <${process.env.GMAIL_USER}>`,
//       to: invoice.customerEmail,
//       subject: `Payment Confirmation - Invoice ${invoice.invoiceNumber}`,
//       html,
//       headers: invoice.messageId ? {
//         'In-Reply-To': invoice.messageId,
//         'References': invoice.messageId
//       } : {}
//     });
//   } catch (error) {
//     console.error("Error sending payment confirmation:", error);
//   }
// };

// // Get all invoices for a customer
// export const getCustomerInvoices = async (req, res) => {
//   try {
//     const { email } = req.params;
    
//     const invoices = await Invoice.find({ customerEmail: email })
//       .sort({ createdAt: -1 });
    
//     res.status(200).json({
//       status: "success",
//       data: invoices
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// };

//==================


import Invoice from "../models/Invoice.js";
import transporter from "../utils/email.js";

// ✅ Helper function for message ID
const generateMessageId = (email) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const domain = email.split('@')[1] || 'farebuzzertravel.com';
  return `<${timestamp}.${random}@${domain}>`;
};

// ✅ Generate payment link
const generatePaymentLink = (invoiceNumber) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
  return `${frontendUrl}/invoice/${invoiceNumber}`;
};

// ✅ Send payment confirmation email
const sendPaymentConfirmationEmail = async (invoice) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation - Invoice ${invoice.invoiceNumber}</title>
      </head>
      <body style="font-family:Arial,sans-serif;padding:30px;max-width:600px;margin:0 auto;line-height:1.6;color:#333;">
        <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #10b981;">
          <h1 style="color:#10b981;margin:0;font-size:24px;">✈️ FareBuzzer Travel</h1>
        </div>
        
        <h2 style="color:#1e293b;margin:20px 0 10px 0;">Payment Confirmation</h2>
        
        <p>Dear ${invoice.customerName},</p>
        
        <p>Thank you for your payment. We have successfully received your payment for invoice <strong>${invoice.invoiceNumber}</strong>.</p>
        
        <div style="background:#f0fff4;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #10b981;">
          <h3 style="color:#065f46;margin-top:0;">Payment Details</h3>
          <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
          <p><strong>Amount Paid:</strong> $${invoice.amount}</p>
          <p><strong>Payment Date:</strong> ${new Date(invoice.paymentDate).toLocaleDateString()}</p>
          <p><strong>Payment Method:</strong> ${invoice.paymentMethod || 'N/A'}</p>
          ${invoice.transactionId ? `<p><strong>Transaction ID:</strong> ${invoice.transactionId}</p>` : ''}
        </div>
        
        <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:8px;border-left:4px solid #3b82f6;">
          <p style="margin:0 0 10px 0;font-weight:500;">Contact Us:</p>
          <p style="margin:0;color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
        </div>
        
        <p style="margin-top:30px;color:#64748b;font-size:14px;">
          Regards,<br/>
          <b style="color:#10b981;">FareBuzzer Support Team</b>
        </p>
        
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:30px 0;">
        <p style="text-align:center;font-size:12px;color:#94a3b8;">
          © ${new Date().getFullYear()} FareBuzzer Travel.
        </p>
      </body>
      </html>
    `;
    
    await transporter.sendMail({
      from: `"FareBuzzer" <${process.env.GMAIL_USER}>`,
      to: invoice.customerEmail,
      subject: `Payment Confirmation - Invoice ${invoice.invoiceNumber}`,
      html,
      headers: invoice.messageId ? {
        'In-Reply-To': invoice.messageId,
        'References': invoice.messageId
      } : {}
    });
    
    console.log(`✅ Payment confirmation email sent for invoice ${invoice.invoiceNumber}`);
  } catch (error) {
    console.error("❌ Error sending payment confirmation:", error);
  }
};

// ✅ Create invoice from booking data
export const createInvoice = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      bookingRef,
      emailType,
      senderBrand,
      amount,
      messageId,
      items = []
    } = req.body;

    console.log("📝 Creating invoice for:", customerEmail);

    // Validate required fields
    if (!customerName || !customerEmail || !amount) {
      return res.status(400).json({
        status: "fail",
        message: "Customer name, email, and amount are required"
      });
    }

    // Generate invoice number
    let invoiceNumber;
    if (Invoice.generateInvoiceNumber) {
      invoiceNumber = await Invoice.generateInvoiceNumber();
    } else {
      // Fallback if static method doesn't exist
      const year = new Date().getFullYear();
      const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
      const day = new Date().getDate().toString().padStart(2, '0');
      const random = Math.floor(1000 + Math.random() * 9000);
      invoiceNumber = `INV-${year}${month}${day}-${random}`;
    }
    
    // Create message ID if not provided
    const finalMessageId = messageId || generateMessageId(customerEmail);

    // Create invoice
    const invoiceData = {
      invoiceNumber,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      bookingRef: bookingRef || '',
      emailType: emailType || 'general',
      senderBrand: senderBrand || 'lowfare_studio',
      amount: parseFloat(amount),
      messageId: finalMessageId,
      items: items.length > 0 ? items : [{
        description: "Booking Amount",
        quantity: 1,
        unitPrice: parseFloat(amount),
        total: parseFloat(amount)
      }],
      paymentLink: generatePaymentLink(invoiceNumber)
    };

    console.log("📋 Invoice data:", invoiceData);

    const invoice = await Invoice.create(invoiceData);

    console.log(`✅ Invoice created: ${invoice.invoiceNumber}`);

    res.status(201).json({
      status: "success",
      message: "Invoice created successfully",
      data: invoice
    });
  } catch (error) {
    console.error("❌ Error creating invoice:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// ✅ Get invoice by number
export const getInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    
    console.log("🔍 Fetching invoice:", invoiceNumber);
    
    const invoice = await Invoice.findOne({ invoiceNumber });
    
    if (!invoice) {
      return res.status(404).json({
        status: "error",
        message: "Invoice not found"
      });
    }
    
    console.log(`✅ Invoice found: ${invoice.invoiceNumber}`);
    
    res.status(200).json({
      status: "success",
      data: invoice
    });
  } catch (error) {
    console.error("❌ Error fetching invoice:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// ✅ Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const { 
      paymentStatus, 
      paymentMethod, 
      transactionId 
    } = req.body;
    
    console.log(`📝 Updating payment status for ${invoiceNumber}:`, paymentStatus);

    // Validate payment status
    const validStatuses = ["UNPAID", "PAID", "PARTIAL", "CANCELLED"];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid payment status"
      });
    }

    // Find invoice first
    const invoice = await Invoice.findOne({ invoiceNumber });
    
    if (!invoice) {
      return res.status(404).json({
        status: "error",
        message: "Invoice not found"
      });
    }

    // Prepare update data
    const updateData = {
      paymentStatus,
      updatedAt: new Date()
    };
    
    if (paymentStatus === "PAID") {
      updateData.paymentDate = new Date();
      updateData.paymentMethod = paymentMethod || "PayPal";
      updateData.transactionId = transactionId || `TXN-${Date.now()}`;
    }

    // Update invoice
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber },
      updateData,
      { new: true, runValidators: true }
    );

    // Send payment confirmation email if paid
    if (paymentStatus === "PAID") {
      await sendPaymentConfirmationEmail(updatedInvoice);
    }

    console.log(`✅ Invoice updated: ${updatedInvoice.invoiceNumber} - ${updatedInvoice.paymentStatus}`);

    res.status(200).json({
      status: "success",
      message: `Invoice ${paymentStatus.toLowerCase()} successfully`,
      data: updatedInvoice
    });
  } catch (error) {
    console.error("❌ Error updating invoice:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// ✅ Get all invoices for a customer
export const getCustomerInvoices = async (req, res) => {
  try {
    const { email } = req.params;
    
    console.log("🔍 Fetching invoices for customer:", email);
    
    const invoices = await Invoice.find({ customerEmail: email })
      .sort({ createdAt: -1 })
      .limit(50);
    
    console.log(`✅ Found ${invoices.length} invoices for ${email}`);
    
    res.status(200).json({
      status: "success",
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    console.error("❌ Error fetching customer invoices:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// ✅ Get all invoices (for CRM)
export const getAllInvoices = async (req, res) => {
  try {
    const { status, startDate, endDate, limit = 100 } = req.query;
    
    console.log("🔍 Fetching all invoices with filters:", { status, startDate, endDate });
    
    let filter = {};
    
    // Filter by status
    if (status && status !== "ALL") {
      filter.paymentStatus = status;
    }
    
    // Filter by date range
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }
    
    const invoices = await Invoice.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    console.log(`✅ Found ${invoices.length} invoices`);
    
    // Calculate totals
    const totals = {
      total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
      paid: invoices
        .filter(inv => inv.paymentStatus === "PAID")
        .reduce((sum, inv) => sum + inv.amount, 0),
      unpaid: invoices
        .filter(inv => inv.paymentStatus === "UNPAID")
        .reduce((sum, inv) => sum + inv.amount, 0)
    };
    
    res.status(200).json({
      status: "success",
      count: invoices.length,
      totals,
      data: invoices
    });
  } catch (error) {
    console.error("❌ Error fetching all invoices:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// ✅ Delete invoice (admin only)
export const deleteInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    
    console.log("🗑️ Deleting invoice:", invoiceNumber);
    
    const invoice = await Invoice.findOneAndDelete({ invoiceNumber });
    
    if (!invoice) {
      return res.status(404).json({
        status: "error",
        message: "Invoice not found"
      });
    }
    
    console.log(`✅ Invoice deleted: ${invoiceNumber}`);
    
    res.status(200).json({
      status: "success",
      message: "Invoice deleted successfully"
    });
  } catch (error) {
    console.error("❌ Error deleting invoice:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// ✅ Search invoices
export const searchInvoices = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({
        status: "fail",
        message: "Search query is required"
      });
    }
    
    console.log("🔍 Searching invoices for:", query);
    
    const searchRegex = new RegExp(query, 'i');
    
    const invoices = await Invoice.find({
      $or: [
        { invoiceNumber: searchRegex },
        { customerName: searchRegex },
        { customerEmail: searchRegex },
        { bookingRef: searchRegex },
        { 'items.description': searchRegex }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(50);
    
    console.log(`✅ Found ${invoices.length} invoices matching search`);
    
    res.status(200).json({
      status: "success",
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    console.error("❌ Error searching invoices:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};