import Invoice from "../models/Invoice.js";
import transporter from "../utils/email.js";
import { generateMessageId } from "./sendEmailController.js";

// Create invoice from booking data
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

    // Generate invoice number
    const invoiceNumber = await Invoice.generateInvoiceNumber();

    // Create invoice
    const invoice = await Invoice.create({
      invoiceNumber,
      customerName,
      customerEmail,
      customerPhone,
      bookingRef,
      emailType,
      senderBrand,
      amount,
      messageId,
      items: items.length > 0 ? items : [{
        description: "Booking Amount",
        quantity: 1,
        unitPrice: amount,
        total: amount
      }],
      paymentLink: generatePaymentLink(invoiceNumber, amount)
    });

    res.status(201).json({
      status: "success",
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Generate PayPal payment link
const generatePaymentLink = (invoiceNumber, amount) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
  return `${frontendUrl}/pay-invoice/${invoiceNumber}?amount=${amount}`;
};

// Get invoice by ID
export const getInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    
    const invoice = await Invoice.findOne({ invoiceNumber });
    
    if (!invoice) {
      return res.status(404).json({
        status: "error",
        message: "Invoice not found"
      });
    }
    
    res.status(200).json({
      status: "success",
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const { 
      paymentStatus, 
      paymentMethod, 
      transactionId 
    } = req.body;
    
    const updateData = {
      paymentStatus,
      updatedAt: Date.now()
    };
    
    if (paymentStatus === "PAID") {
      updateData.paymentDate = Date.now();
      updateData.paymentMethod = paymentMethod;
      updateData.transactionId = transactionId;
    }
    
    const invoice = await Invoice.findOneAndUpdate(
      { invoiceNumber },
      updateData,
      { new: true }
    );
    
    // Send payment confirmation email if paid
    if (paymentStatus === "PAID" && invoice) {
      await sendPaymentConfirmationEmail(invoice);
    }
    
    res.status(200).json({
      status: "success",
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Send payment confirmation email
const sendPaymentConfirmationEmail = async (invoice) => {
  try {
    const html = `
      <div style="font-family:Arial,sans-serif;padding:30px;max-width:600px;margin:0 auto;">
        <div style="text-align:center;padding-bottom:20px;">
          <h1 style="color:#10b981;">Payment Confirmation</h1>
        </div>
        
        <p>Dear ${invoice.customerName},</p>
        
        <p>Thank you for your payment. We have successfully received your payment for invoice <strong>${invoice.invoiceNumber}</strong>.</p>
        
        <div style="background:#f0fff4;padding:20px;border-radius:8px;margin:20px 0;">
          <h3 style="color:#065f46;">Payment Details</h3>
          <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
          <p><strong>Amount Paid:</strong> $${invoice.amount}</p>
          <p><strong>Payment Date:</strong> ${new Date(invoice.paymentDate).toLocaleDateString()}</p>
          <p><strong>Transaction ID:</strong> ${invoice.transactionId || 'N/A'}</p>
        </div>
        
        <p>Thank you for choosing FareBuzzer Travel.</p>
        
        <p>Regards,<br>
        <strong>FareBuzzer Support Team</strong></p>
      </div>
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
  } catch (error) {
    console.error("Error sending payment confirmation:", error);
  }
};

// Get all invoices for a customer
export const getCustomerInvoices = async (req, res) => {
  try {
    const { email } = req.params;
    
    const invoices = await Invoice.find({ customerEmail: email })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      status: "success",
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};