// import Invoice from "../models/Invoice.js";
// import transporter from "../utils/email.js";

// // ✅ Helper function for message ID
// const generateMessageId = (email) => {
//     const timestamp = Date.now();
//     const random = Math.random().toString(36).substring(2, 10);
//     const domain = email.split('@')[1] || 'farebuzzertravel.com';
//     return `<${timestamp}.${random}@${domain}>`;
// };

// // ✅ Generate payment link
// const generatePaymentLink = (invoiceNumber) => {
//     const frontendUrl = process.env.FRONTEND_URL || 'https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host';
//     return `${frontendUrl}/invoice/${invoiceNumber}`;
// };

// // ✅ Send payment confirmation email
// const sendPaymentConfirmationEmail = async (invoice) => {
//     try {
//         const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>Payment Confirmation - Invoice ${invoice.invoiceNumber}</title>
//       </head>
//       <body style="font-family:Arial,sans-serif;padding:30px;max-width:600px;margin:0 auto;line-height:1.6;color:#333;">
//         <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #10b981;">
//           <h1 style="color:#10b981;margin:0;font-size:24px;">✈️ FareBuzzer Travel</h1>
//         </div>
        
//         <h2 style="color:#1e293b;margin:20px 0 10px 0;">Payment Confirmation</h2>
        
//         <p>Dear ${invoice.customerName},</p>
        
//         <p>Thank you for your payment. We have successfully received your payment for invoice <strong>${invoice.invoiceNumber}</strong>.</p>
        
//         <div style="background:#f0fff4;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #10b981;">
//           <h3 style="color:#065f46;margin-top:0;">Payment Details</h3>
//           <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
//           <p><strong>Amount Paid:</strong> $${invoice.amount}</p>
//           <p><strong>Payment Date:</strong> ${new Date(invoice.paymentDate).toLocaleDateString()}</p>
//           <p><strong>Payment Method:</strong> ${invoice.paymentMethod || 'N/A'}</p>
//           ${invoice.transactionId ? `<p><strong>Transaction ID:</strong> ${invoice.transactionId}</p>` : ''}
//         </div>
        
//         <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:8px;border-left:4px solid #3b82f6;">
//           <p style="margin:0 0 10px 0;font-weight:500;">Contact Us:</p>
//           <p style="margin:0;color:#64748b;">📧 <strong>enquiry@farebuzzertravel.com</strong> | 📞 <strong>844 784 3676</strong></p>
//         </div>
        
//         <p style="margin-top:30px;color:#64748b;font-size:14px;">
//           Regards,<br/>
//           <b style="color:#10b981;">FareBuzzer Support Team</b>
//         </p>
        
//         <hr style="border:none;border-top:1px solid #e2e8f0;margin:30px 0;">
//         <p style="text-align:center;font-size:12px;color:#94a3b8;">
//           © ${new Date().getFullYear()} FareBuzzer Travel.
//         </p>
//       </body>
//       </html>
//     `;

//         await transporter.sendMail({
//             from: `"FareBuzzer" <${process.env.GMAIL_USER}>`,
//             to: invoice.customerEmail,
//             subject: `Payment Confirmation - Invoice ${invoice.invoiceNumber}`,
//             html,
//             headers: invoice.messageId ? {
//                 'In-Reply-To': invoice.messageId,
//                 'References': invoice.messageId
//             } : {}
//         });

//         console.log(`✅ Payment confirmation email sent for invoice ${invoice.invoiceNumber}`);
//     } catch (error) {
//         console.error("❌ Error sending payment confirmation:", error);
//     }
// };

// // ✅ Create invoice from booking data
// export const createInvoice = async (req, res) => {
//     try {
//         const {
//             customerName,
//             customerEmail,
//             customerPhone,
//             bookingRef,
//             emailType,
//             senderBrand,
//             amount,
//             messageId,
//             items = []
//         } = req.body;

//         console.log("📝 Creating invoice for:", customerEmail);

//         // Validate required fields
//         if (!customerName || !customerEmail || !amount) {
//             return res.status(400).json({
//                 status: "fail",
//                 message: "Customer name, email, and amount are required"
//             });
//         }

//         // Generate invoice number
//         let invoiceNumber;
//         if (Invoice.generateInvoiceNumber) {
//             invoiceNumber = await Invoice.generateInvoiceNumber();
//         } else {
//             // Fallback if static method doesn't exist
//             const year = new Date().getFullYear();
//             const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
//             const day = new Date().getDate().toString().padStart(2, '0');
//             const random = Math.floor(1000 + Math.random() * 9000);
//             invoiceNumber = `INV-${year}${month}${day}-${random}`;
//         }

//         // Create message ID if not provided
//         const finalMessageId = messageId || generateMessageId(customerEmail);

//         // Create invoice
//         const invoiceData = {
//             invoiceNumber,
//             customerName,
//             customerEmail,
//             customerPhone: customerPhone || '',
//             bookingRef: bookingRef || '',
//             emailType: emailType || 'general',
//             senderBrand: senderBrand || 'lowfare_studio',
//             amount: parseFloat(amount),
//             messageId: finalMessageId,
//             items: items.length > 0 ? items : [{
//                 description: "Booking Amount",
//                 quantity: 1,
//                 unitPrice: parseFloat(amount),
//                 total: parseFloat(amount)
//             }],
//             paymentLink: generatePaymentLink(invoiceNumber)
//         };

//         console.log("📋 Invoice data:", invoiceData);

//         const invoice = await Invoice.create(invoiceData);

//         console.log(`✅ Invoice created: ${invoice.invoiceNumber}`);

//         res.status(201).json({
//             status: "success",
//             message: "Invoice created successfully",
//             data: invoice
//         });
//     } catch (error) {
//         console.error("❌ Error creating invoice:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Get invoice by number
// export const getInvoice = async (req, res) => {
//     try {
//         const { invoiceNumber } = req.params;

//         console.log("🔍 Fetching invoice:", invoiceNumber);

//         const invoice = await Invoice.findOne({ invoiceNumber });

//         if (!invoice) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Invoice not found"
//             });
//         }

//         console.log(`✅ Invoice found: ${invoice.invoiceNumber}`);

//         res.status(200).json({
//             status: "success",
//             data: invoice
//         });
//     } catch (error) {
//         console.error("❌ Error fetching invoice:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Update payment status
// export const updatePaymentStatus = async (req, res) => {
//     try {
//         const { invoiceNumber } = req.params;
//         const {
//             paymentStatus,
//             paymentMethod,
//             transactionId
//         } = req.body;

//         console.log(`📝 Updating payment status for ${invoiceNumber}:`, paymentStatus);

//         // Validate payment status
//         const validStatuses = ["UNPAID", "PAID", "PARTIAL", "CANCELLED"];
//         if (!validStatuses.includes(paymentStatus)) {
//             return res.status(400).json({
//                 status: "fail",
//                 message: "Invalid payment status"
//             });
//         }

//         // Find invoice first
//         const invoice = await Invoice.findOne({ invoiceNumber });

//         if (!invoice) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Invoice not found"
//             });
//         }

//         // Prepare update data
//         const updateData = {
//             paymentStatus,
//             updatedAt: new Date()
//         };

//         if (paymentStatus === "PAID") {
//             updateData.paymentDate = new Date();
//             updateData.paymentMethod = paymentMethod || "PayPal";
//             updateData.transactionId = transactionId || `TXN-${Date.now()}`;
//         }

//         // Update invoice
//         const updatedInvoice = await Invoice.findOneAndUpdate(
//             { invoiceNumber },
//             updateData,
//             { new: true, runValidators: true }
//         );

//         // Send payment confirmation email if paid
//         if (paymentStatus === "PAID") {
//             await sendPaymentConfirmationEmail(updatedInvoice);
//         }

//         console.log(`✅ Invoice updated: ${updatedInvoice.invoiceNumber} - ${updatedInvoice.paymentStatus}`);

//         res.status(200).json({
//             status: "success",
//             message: `Invoice ${paymentStatus.toLowerCase()} successfully`,
//             data: updatedInvoice
//         });
//     } catch (error) {
//         console.error("❌ Error updating invoice:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Get all invoices for a customer
// export const getCustomerInvoices = async (req, res) => {
//     try {
//         const { email } = req.params;

//         console.log("🔍 Fetching invoices for customer:", email);

//         const invoices = await Invoice.find({ customerEmail: email })
//             .sort({ createdAt: -1 })
//             .limit(50);

//         console.log(`✅ Found ${invoices.length} invoices for ${email}`);

//         res.status(200).json({
//             status: "success",
//             count: invoices.length,
//             data: invoices
//         });
//     } catch (error) {
//         console.error("❌ Error fetching customer invoices:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Get all invoices (for CRM)
// export const getAllInvoices = async (req, res) => {
//     try {
//         const { status, startDate, endDate, limit = 100 } = req.query;

//         console.log("🔍 Fetching all invoices with filters:", { status, startDate, endDate });

//         let filter = {};

//         // Filter by status
//         if (status && status !== "ALL") {
//             filter.paymentStatus = status;
//         }

//         // Filter by date range
//         if (startDate || endDate) {
//             filter.createdAt = {};
//             if (startDate) {
//                 filter.createdAt.$gte = new Date(startDate);
//             }
//             if (endDate) {
//                 filter.createdAt.$lte = new Date(endDate);
//             }
//         }

//         const invoices = await Invoice.find(filter)
//             .sort({ createdAt: -1 })
//             .limit(parseInt(limit));

//         console.log(`✅ Found ${invoices.length} invoices`);

//         // Calculate totals
//         const totals = {
//             total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
//             paid: invoices
//                 .filter(inv => inv.paymentStatus === "PAID")
//                 .reduce((sum, inv) => sum + inv.amount, 0),
//             unpaid: invoices
//                 .filter(inv => inv.paymentStatus === "UNPAID")
//                 .reduce((sum, inv) => sum + inv.amount, 0)
//         };

//         res.status(200).json({
//             status: "success",
//             count: invoices.length,
//             totals,
//             data: invoices
//         });
//     } catch (error) {
//         console.error("❌ Error fetching all invoices:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Delete invoice (admin only)
// export const deleteInvoice = async (req, res) => {
//     try {
//         const { invoiceNumber } = req.params;

//         console.log("🗑️ Deleting invoice:", invoiceNumber);

//         const invoice = await Invoice.findOneAndDelete({ invoiceNumber });

//         if (!invoice) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Invoice not found"
//             });
//         }

//         console.log(`✅ Invoice deleted: ${invoiceNumber}`);

//         res.status(200).json({
//             status: "success",
//             message: "Invoice deleted successfully"
//         });
//     } catch (error) {
//         console.error("❌ Error deleting invoice:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Search invoices
// export const searchInvoices = async (req, res) => {
//     try {
//         const { query } = req.query;

//         if (!query || query.trim() === '') {
//             return res.status(400).json({
//                 status: "fail",
//                 message: "Search query is required"
//             });
//         }

//         console.log("🔍 Searching invoices for:", query);

//         const searchRegex = new RegExp(query, 'i');

//         const invoices = await Invoice.find({
//             $or: [
//                 { invoiceNumber: searchRegex },
//                 { customerName: searchRegex },
//                 { customerEmail: searchRegex },
//                 { bookingRef: searchRegex },
//                 { 'items.description': searchRegex }
//             ]
//         })
//             .sort({ createdAt: -1 })
//             .limit(50);

//         console.log(`✅ Found ${invoices.length} invoices matching search`);

//         res.status(200).json({
//             status: "success",
//             count: invoices.length,
//             data: invoices
//         });
//     } catch (error) {
//         console.error("❌ Error searching invoices:", error);
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

// // ✅ Stylish public invoice view (for email links)
// export const viewStyledInvoice = async (req, res) => {
//     try {
//         const { invoiceNumber } = req.params;
//         const invoice = await Invoice.findOne({ invoiceNumber });

//         if (!invoice) {
//             return res.status(404).send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <title>Invoice Not Found</title>
//           <style>
//             body { font-family: Arial; padding: 40px; text-align: center; background: #f8fafc; }
//             .container { max-width: 500px; margin: 50px auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
//             h1 { color: #ef4444; }
//             .logo { color: #10b981; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="logo">✈️ FareBuzzer Travel</div>
//             <h1>Invoice Not Found</h1>
//             <p>Invoice ${invoiceNumber} does not exist or has been deleted.</p>
//           </div>
//         </body>
//         </html>
//       `);
//         }

//         // Calculate days until due
//         const dueDate = new Date(invoice.dueDate);
//         const today = new Date();
//         const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
//         const isOverdue = daysUntilDue < 0;
//         const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

//         // Format date
//         const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });

//         // Status badge color
//         const statusColors = {
//             PAID: 'bg-green-100 text-green-800',
//             UNPAID: 'bg-red-100 text-red-800',
//             PARTIAL: 'bg-yellow-100 text-yellow-800',
//             CANCELLED: 'bg-gray-100 text-gray-800'
//         };

//         const frontendUrl =
//             process.env.FRONTEND_URL ||
//             "https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host";

//         const params = new URLSearchParams({
//             invoice: invoice.invoiceNumber,
//             customerName: invoice.customerName || "",
//             email: invoice.customerEmail || "",
//             phone: invoice.customerPhone || "",
//             amount: invoice.amount,
//             bookingRef: invoice.bookingRef || "",
//             source: "invoice"
//         });

//         const paymentLink = `${frontendUrl}/payment?${params.toString()}`;


//         // Render stylish HTML
//         res.send(`
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Invoice ${invoice.invoiceNumber} | FareBuzzer Travel</title>
//         <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
//         <script src="https://cdn.tailwindcss.com"></script>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
//           body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); min-height: 100vh; }
//           .invoice-container { max-width: 800px; margin: 0 auto; }
//           .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
//           .due-badge { background: ${isOverdue ? '#fee2e2' : (isDueSoon ? '#fef3c7' : '#dbeafe')}; color: ${isOverdue ? '#991b1b' : (isDueSoon ? '#92400e' : '#1e40af')}; }
//           .watermark { position: absolute; opacity: 0.03; font-size: 120px; font-weight: bold; transform: rotate(-45deg); pointer-events: none; }
//           .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
//         </style>
//       </head>
//       <body class="py-10 px-4">
//         <div class="invoice-container">
//           <!-- Watermark -->
//           <div class="watermark top-1/4 left-1/4 text-green-500">${invoice.paymentStatus}</div>
          
//           <!-- Header -->
//           <div class="glass-card rounded-3xl p-8 mb-8 shadow-2xl">
//             <div class="flex justify-between items-center mb-8">
//               <div>
//                 <h1 class="text-4xl font-bold text-green-600 mb-2">
              
//                   <i class="fas fa-plane-departure mr-3"></i>Travel Invoice Platform
//                 </h1>
//                 <p class="text-gray-600">Travel Made Easy & Affordable</p>
//               </div>
//               <div class="text-right">
//                 <h2 class="text-3xl font-bold text-gray-800">INVOICE</h2>
//                 <p class="text-gray-500 text-sm mt-1">${invoice.invoiceNumber}</p>
//               </div>
//             </div>
            
//             <!-- Status Alert -->
//             <div class="flex flex-wrap gap-4 mb-6">
//               <div class="status-badge ${statusColors[invoice.paymentStatus]}">
//                 <i class="fas ${invoice.paymentStatus === 'PAID' ? 'fa-check-circle' : 'fa-clock'} mr-2"></i>
//                 ${invoice.paymentStatus}
//               </div>
//               <div class="status-badge due-badge">
//                 <i class="fas ${isOverdue ? 'fa-exclamation-triangle' : 'fa-calendar-day'} mr-2"></i>
//                 ${isOverdue ? `Overdue by ${Math.abs(daysUntilDue)} days` :
//                 (isDueSoon ? `Due in ${daysUntilDue} days` : `Due on ${formatDate(invoice.dueDate)}`)}
//               </div>
//               <div class="status-badge bg-blue-100 text-blue-800">
//                 <i class="fas fa-dollar-sign mr-2"></i>
//                 ${invoice.currency} ${invoice.amount.toFixed(2)}
//               </div>
//             </div>
//           </div>
          
//           <!-- Invoice Details -->
//           <div class="grid md:grid-cols-2 gap-8 mb-8">
//             <!-- Customer Info -->
//             <div class="glass-card rounded-2xl p-6 shadow-xl">
//               <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center">
//                 <i class="fas fa-user-circle mr-3"></i>Customer Information
//               </h3>
//               <div class="space-y-3">
//                 <p><span class="text-gray-600 font-medium">Name:</span> ${invoice.customerName}</p>
//                 <p><span class="text-gray-600 font-medium">Email:</span> ${invoice.customerEmail}</p>
//                 ${invoice.customerPhone ? `<p><span class="text-gray-600 font-medium">Phone:</span> ${invoice.customerPhone}</p>` : ''}
//                 ${invoice.bookingRef ? `<p><span class="text-gray-600 font-medium">Booking Ref:</span> <span class="font-mono bg-gray-100 px-2 py-1 rounded">${invoice.bookingRef}</span></p>` : ''}
//               </div>
//             </div>
            
//             <!-- Invoice Info -->
//             <div class="glass-card rounded-2xl p-6 shadow-xl">
//               <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center">
//                 <i class="fas fa-file-invoice mr-3"></i>Invoice Details
//               </h3>
//               <div class="space-y-3">
//                 <p><span class="text-gray-600 font-medium">Invoice Date:</span> ${formatDate(invoice.invoiceDate)}</p>
//                 <p><span class="text-gray-600 font-medium">Due Date:</span> ${formatDate(invoice.dueDate)}</p>
//                 <p><span class="text-gray-600 font-medium">Service Type:</span> ${invoice.emailType || 'Travel Booking'}</p>
//                 ${invoice.messageId ? `<p class="text-xs text-gray-500 truncate"><span class="font-medium">Message ID:</span> ${invoice.messageId}</p>` : ''}
//               </div>
//             </div>
//           </div>
          
//           <!-- Items Table -->
//           <div class="glass-card rounded-2xl p-6 mb-8 shadow-xl">
//             <h3 class="text-xl font-bold text-green-700 mb-6 flex items-center">
//               <i class="fas fa-receipt mr-3"></i>Invoice Items
//             </h3>
//             <div class="overflow-x-auto">
//               <table class="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr class="bg-green-50">
//                     <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Description</th>
//                     <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Quantity</th>
//                     <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Unit Price</th>
//                     <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody class="divide-y divide-gray-200">
//                   ${invoice.items.map(item => `
//                     <tr class="hover:bg-gray-50">
//                       <td class="px-6 py-4 text-sm text-gray-800">${item.description}</td>
//                       <td class="px-6 py-4 text-sm text-gray-600">${item.quantity}</td>
//                       <td class="px-6 py-4 text-sm text-gray-600">${invoice.currency} ${item.unitPrice.toFixed(2)}</td>
//                       <td class="px-6 py-4 text-sm font-medium text-gray-900">${invoice.currency} ${item.total.toFixed(2)}</td>
//                     </tr>
//                   `).join('')}
//                 </tbody>
//                 <tfoot>
//                   <tr class="bg-green-50 font-bold">
//                     <td colspan="3" class="px-6 py-4 text-right text-sm text-green-700">TOTAL AMOUNT</td>
//                     <td class="px-6 py-4 text-lg text-green-700">${invoice.currency} ${invoice.amount.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
          
//           <!-- Payment Section -->
//           <div class="glass-card rounded-2xl p-8 mb-8 shadow-xl">
//             <div class="text-center">
//               <h3 class="text-2xl font-bold text-gray-800 mb-2">
//                 <i class="fas fa-credit-card mr-2"></i>
//                 Complete Your Payment
//               </h3>
//               <p class="text-gray-600 mb-6">Secure payment via PayPal or Credit Card</p>
              
//               <!-- Amount Display -->
//               <div class="inline-block bg-gradient-to-r from-green-100 to-blue-100 px-8 py-4 rounded-2xl mb-6">
//                 <p class="text-gray-600 text-sm">Amount Due</p>
//                 <p class="text-4xl font-bold text-green-700">${invoice.currency} ${invoice.amount.toFixed(2)}</p>
//               </div>
              
//               <div class="space-y-4">
//                 <!-- Pay Now Button -->
              


//                 <a href="${paymentLink}"
//    class="inline-flex items-center justify-center
//           bg-gradient-to-r from-green-500 to-green-600
//           hover:from-green-600 hover:to-green-700
//           text-white font-bold py-4 px-12 rounded-2xl
//           text-lg shadow-lg hover:shadow-xl
//           transition-all duration-300 transform hover:-translate-y-1">
//   <i class="fas fa-lock mr-3"></i>
//   Pay Now Securely
// </a>



                
//                 <!-- Download PDF -->
//                 <button onclick="window.print()" 
//                         class="ml-4 inline-flex items-center justify-center bg-white hover:bg-gray-100 text-green-600 border border-green-300 font-bold py-4 px-8 rounded-2xl text-lg shadow hover:shadow-md transition-all duration-300">
//                   <i class="fas fa-print mr-3"></i>
//                   Print Invoice
//                 </button>
//               </div>
              
//               <!-- Payment Methods -->
//               <div class="mt-8 pt-6 border-t border-gray-200">
//                 <p class="text-gray-600 mb-3">Accepted Payment Methods</p>
//                 <div class="flex justify-center space-x-4 text-3xl">
//                   <i class="fab fa-cc-paypal text-blue-500"></i>
//                   <i class="fab fa-cc-visa text-blue-600"></i>
//                   <i class="fab fa-cc-mastercard text-red-500"></i>
//                   <i class="fab fa-cc-amex text-blue-800"></i>
//                   <i class="fab fa-cc-discover text-orange-500"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <!-- Footer -->
//           <div class="text-center text-gray-500 text-sm">
//             <p class="mb-2">
//               <i class="fas fa-envelope mr-2"></i>enquiry@farebuzzertravel.com | 
//               <i class="fas fa-phone ml-4 mr-2"></i>844 784 3676
//             </p>
//             <p>© ${new Date().getFullYear()} FareBuzzer Travel. All rights reserved.</p>
//             <p class="text-xs mt-4 text-gray-400">Invoice ID: ${invoice._id} | Generated on ${new Date().toLocaleString()}</p>
//           </div>
//         </div>
        
//         <!-- Print Styles -->
//         <style media="print">
//           body { background: white !important; }
//           .glass-card { box-shadow: none !important; border: 1px solid #ddd !important; }
//           button, a[href*="payment"] { display: none !important; }
//           .watermark { opacity: 0.1 !important; }
//         </style>
//       </body>
//       </html>
//     `);
//     } catch (error) {
//         console.error("❌ Error rendering invoice:", error);
//         res.status(500).send(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Error</title>
//         <style>body { font-family: Arial; padding: 40px; text-align: center; }</style>
//       </head>
//       <body>
//         <h1 style="color:red;">Error Loading Invoice</h1>
//         <p>Please try again or contact support.</p>
//       </body>
//       </html>
//     `);
//     }
// };



//===========13 feb===========


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

// ✅ Stylish public invoice view (for email links)
export const viewStyledInvoice = async (req, res) => {
    try {
        const { invoiceNumber } = req.params;
        const invoice = await Invoice.findOne({ invoiceNumber });

        if (!invoice) {
            return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice Not Found</title>
          <style>
            body { font-family: Arial; padding: 40px; text-align: center; background: #f8fafc; }
            .container { max-width: 500px; margin: 50px auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            h1 { color: #ef4444; }
            .logo { color: #10b981; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">✈️ FareBuzzer Travel</div>
            <h1>Invoice Not Found</h1>
            <p>Invoice ${invoiceNumber} does not exist or has been deleted.</p>
          </div>
        </body>
        </html>
      `);
        }

        // Calculate days until due
        const dueDate = new Date(invoice.dueDate);
        const today = new Date();
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        const isOverdue = daysUntilDue < 0;
        const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

        // Format date
        const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Status badge color
        const statusColors = {
            PAID: 'bg-green-100 text-green-800',
            UNPAID: 'bg-red-100 text-red-800',
            PARTIAL: 'bg-yellow-100 text-yellow-800',
            CANCELLED: 'bg-gray-100 text-gray-800'
        };

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "https://learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host";

        const params = new URLSearchParams({
            invoice: invoice.invoiceNumber,
            customerName: invoice.customerName || "",
            email: invoice.customerEmail || "",
            phone: invoice.customerPhone || "",
            amount: invoice.amount,
            bookingRef: invoice.bookingRef || "",
            source: "invoice"
        });

        const paymentLink = `${frontendUrl}/payment?${params.toString()}`;


        // Render stylish HTML
        res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${invoice.invoiceNumber} | FareBuzzer Travel</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); min-height: 100vh; }
          .invoice-container { max-width: 800px; margin: 0 auto; }
          .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
          .due-badge { background: ${isOverdue ? '#fee2e2' : (isDueSoon ? '#fef3c7' : '#dbeafe')}; color: ${isOverdue ? '#991b1b' : (isDueSoon ? '#92400e' : '#1e40af')}; }
          .watermark { position: absolute; opacity: 0.03; font-size: 120px; font-weight: bold; transform: rotate(-45deg); pointer-events: none; }
          .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
        </style>
      </head>
      <body class="py-10 px-4">
        <div class="invoice-container">
          <!-- Watermark -->
          <div class="watermark top-1/4 left-1/4 text-green-500">${invoice.paymentStatus}</div>
          
          <!-- Header -->
          <div class="glass-card rounded-3xl p-8 mb-8 shadow-2xl">
            <div class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-4xl font-bold text-green-600 mb-2">
              
                  <i class="fas fa-plane-departure mr-3"></i>Travel Invoice Platform
                </h1>
                <p class="text-gray-600">Travel Made Easy & Affordable</p>
              </div>
              <div class="text-right">
                <h2 class="text-3xl font-bold text-gray-800">INVOICE</h2>
                <p class="text-gray-500 text-sm mt-1">${invoice.invoiceNumber}</p>
              </div>
            </div>
            
            <!-- Status Alert -->
            <div class="flex flex-wrap gap-4 mb-6">
              <div class="status-badge ${statusColors[invoice.paymentStatus]}">
                <i class="fas ${invoice.paymentStatus === 'PAID' ? 'fa-check-circle' : 'fa-clock'} mr-2"></i>
                ${invoice.paymentStatus}
              </div>
              <div class="status-badge due-badge">
                <i class="fas ${isOverdue ? 'fa-exclamation-triangle' : 'fa-calendar-day'} mr-2"></i>
                ${isOverdue ? `Overdue by ${Math.abs(daysUntilDue)} days` :
                (isDueSoon ? `Due in ${daysUntilDue} days` : `Due on ${formatDate(invoice.dueDate)}`)}
              </div>
              <div class="status-badge bg-blue-100 text-blue-800">
                <i class="fas fa-dollar-sign mr-2"></i>
              
                 USD ${invoice.amount.toFixed(2)}
              </div>
            </div>
          </div>
          
          <!-- Invoice Details -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <!-- Customer Info -->
            <div class="glass-card rounded-2xl p-6 shadow-xl">
              <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center">
                <i class="fas fa-user-circle mr-3"></i>Customer Information
              </h3>
              <div class="space-y-3">
                <p><span class="text-gray-600 font-medium">Name:</span> ${invoice.customerName}</p>
                <p><span class="text-gray-600 font-medium">Email:</span> ${invoice.customerEmail}</p>
                ${invoice.customerPhone ? `<p><span class="text-gray-600 font-medium">Phone:</span> ${invoice.customerPhone}</p>` : ''}
                ${invoice.bookingRef ? `<p><span class="text-gray-600 font-medium">Booking Ref:</span> <span class="font-mono bg-gray-100 px-2 py-1 rounded">${invoice.bookingRef}</span></p>` : ''}
              </div>
            </div>
            
            <!-- Invoice Info -->
            <div class="glass-card rounded-2xl p-6 shadow-xl">
              <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center">
                <i class="fas fa-file-invoice mr-3"></i>Invoice Details
              </h3>
              <div class="space-y-3">
                
               
               
               <p><span class="text-gray-600 font-medium">Invoice Date:</span> ${formatDate(invoice.createdAt || new Date())}</p>
                <p><span class="text-gray-600 font-medium">Due Date:</span> ${formatDate(invoice.dueDate)}</p>
                <p><span class="text-gray-600 font-medium">Service Type:</span> ${invoice.emailType || 'Travel Booking'}</p>
                ${invoice.messageId ? `<p class="text-xs text-gray-500 truncate"><span class="font-medium">Message ID:</span> ${invoice.messageId}</p>` : ''}
              </div>
            </div>
          </div>
          
          <!-- Items Table -->
          <div class="glass-card rounded-2xl p-6 mb-8 shadow-xl">
            <h3 class="text-xl font-bold text-green-700 mb-6 flex items-center">
              <i class="fas fa-receipt mr-3"></i>Invoice Items
            </h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr class="bg-green-50">
                    <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Quantity</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Unit Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  ${invoice.items.map(item => `
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 text-sm text-gray-800">${item.description}</td>
                      <td class="px-6 py-4 text-sm text-gray-600">${item.quantity}</td>
                   <td class="px-6 py-4 text-sm text-gray-600">USD ${item.unitPrice.toFixed(2)}</td>
<td class="px-6 py-4 text-sm font-medium text-gray-900">USD ${item.total.toFixed(2)}</td>
                  
                      </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr class="bg-green-50 font-bold">
                    <td colspan="3" class="px-6 py-4 text-right text-sm text-green-700">TOTAL AMOUNT</td>
                  <td class="px-6 py-4 text-lg text-green-700">USD ${invoice.amount.toFixed(2)}</td>
                 
                    </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <!-- Payment Section -->
          <div class="glass-card rounded-2xl p-8 mb-8 shadow-xl">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">
                <i class="fas fa-credit-card mr-2"></i>
                Complete Your Payment
              </h3>
              <p class="text-gray-600 mb-6">Secure payment via PayPal or Credit Card</p>
              
              <!-- Amount Display -->
              <div class="inline-block bg-gradient-to-r from-green-100 to-blue-100 px-8 py-4 rounded-2xl mb-6">
                <p class="text-gray-600 text-sm">Amount Due</p>
             
                <p class="text-4xl font-bold text-green-700">USD ${invoice.amount.toFixed(2)}</p>
             
                </div>
              
              <div class="space-y-4">
                <!-- Pay Now Button -->
              


                <a href="${paymentLink}"
   class="inline-flex items-center justify-center
          bg-gradient-to-r from-green-500 to-green-600
          hover:from-green-600 hover:to-green-700
          text-white font-bold py-4 px-12 rounded-2xl
          text-lg shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:-translate-y-1">
  <i class="fas fa-lock mr-3"></i>
  Pay Now Securely
</a>



                
                <!-- Download PDF -->
                <button onclick="window.print()" 
                        class="ml-4 inline-flex items-center justify-center bg-white hover:bg-gray-100 text-green-600 border border-green-300 font-bold py-4 px-8 rounded-2xl text-lg shadow hover:shadow-md transition-all duration-300">
                  <i class="fas fa-print mr-3"></i>
                  Print Invoice
                </button>
              </div>
              
              <!-- Payment Methods -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <p class="text-gray-600 mb-3">Accepted Payment Methods</p>
                <div class="flex justify-center space-x-4 text-3xl">
                  <i class="fab fa-cc-paypal text-blue-500"></i>
                  <i class="fab fa-cc-visa text-blue-600"></i>
                  <i class="fab fa-cc-mastercard text-red-500"></i>
                  <i class="fab fa-cc-amex text-blue-800"></i>
                  <i class="fab fa-cc-discover text-orange-500"></i>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="text-center text-gray-500 text-sm">
            <p class="mb-2">
              <i class="fas fa-envelope mr-2"></i>enquiry@farebuzzertravel.com | 
              <i class="fas fa-phone ml-4 mr-2"></i>844 784 3676
            </p>
            <p>© ${new Date().getFullYear()} FareBuzzer Travel. All rights reserved.</p>
            <p class="text-xs mt-4 text-gray-400">Invoice ID: ${invoice._id} | Generated on ${new Date().toLocaleString()}</p>
          </div>
        </div>
        
        <!-- Print Styles -->
        <style media="print">
          body { background: white !important; }
          .glass-card { box-shadow: none !important; border: 1px solid #ddd !important; }
          button, a[href*="payment"] { display: none !important; }
          .watermark { opacity: 0.1 !important; }
        </style>
      </body>
      </html>
    `);
    } catch (error) {
        console.error("❌ Error rendering invoice:", error);
        res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
        <style>body { font-family: Arial; padding: 40px; text-align: center; }</style>
      </head>
      <body>
        <h1 style="color:red;">Error Loading Invoice</h1>
        <p>Please try again or contact support.</p>
      </body>
      </html>
    `);
    }
};