import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  // Customer information
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: String,
  
  // Invoice details
  invoiceNumber: { type: String, unique: true, required: true },
  invoiceDate: { type: Date, default: Date.now },
  dueDate: { 
    type: Date, 
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  },
  
  // Booking information
  bookingRef: String,
  emailType: String,
  senderBrand: String,
  
  // Payment information
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: "USD" },
  
  // Payment status
  paymentStatus: {
    type: String,
    enum: ["UNPAID", "PAID", "PARTIAL", "CANCELLED"],
    default: "UNPAID"
  },
  
  // Payment tracking
  paymentLink: String,
  paymentMethod: String,
  transactionId: String,
  paymentDate: Date,
  
  // Email tracking
  messageId: String,
  
  // Invoice items
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Pre-save middleware
invoiceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate invoice number
invoiceSchema.statics.generateInvoiceNumber = async function() {
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const prefix = `INV-${year}${month}`;
  
  const lastInvoice = await this.findOne({ 
    invoiceNumber: new RegExp(`^${prefix}`) 
  }).sort({ createdAt: -1 });
  
  let sequence = 1;
  if (lastInvoice) {
    const lastSeq = parseInt(lastInvoice.invoiceNumber.split('-')[2]) || 0;
    sequence = lastSeq + 1;
  }
  
  return `${prefix}-${sequence.toString().padStart(4, '0')}`;
};

export default mongoose.model("Invoice", invoiceSchema);