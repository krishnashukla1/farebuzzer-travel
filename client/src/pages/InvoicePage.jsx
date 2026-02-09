
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const InvoicePage = () => {
  const { invoiceNumber } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isSuccessPage = searchParams.get('success') === 'true';

  useEffect(() => {
    if (invoiceNumber) {
      fetchInvoice();
    }
  }, [invoiceNumber]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/invoices/${invoiceNumber}`);
      setInvoice(response.data.data);
    } catch (err) {
      setError("Invoice not found or network error");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    try {
      setPaying(true);
      setError("");

      // Create PayPal order
      const orderResponse = await API.post("/payments/create-order", {
        amount: invoice.amount
      });

      const orderId = orderResponse.data.id;

      // Load PayPal SDK
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;
      script.onload = () => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: invoice.amount.toString()
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              try {
                const details = await actions.order.capture();
                
                // Update invoice status
                await API.patch(`/invoices/${invoiceNumber}/payment`, {
                  paymentStatus: "PAID",
                  paymentMethod: "PayPal",
                  transactionId: details.id
                });

                setSuccess(true);
                fetchInvoice(); // Refresh
                
                // Redirect to success page
                navigate(`/invoice/${invoiceNumber}?success=true`);
              } catch (err) {
                setError("Payment failed. Please try again.");
                setPaying(false);
              }
            },
            onError: (err) => {
              setError("Payment failed. Please try again.");
              setPaying(false);
            }
          })
          .render("#paypal-button-container");
      };
      document.body.appendChild(script);
    } catch (err) {
      setError("Failed to initialize payment");
      setPaying(false);
    }
  };

  const downloadInvoice = () => {
    if (!invoice) return;
    
    const invoiceContent = `
      INVOICE: ${invoice.invoiceNumber}
      Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}
      Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
      
      BILL TO:
      ${invoice.customerName}
      ${invoice.customerEmail}
      ${invoice.customerPhone || ''}
      
      DESCRIPTION: ${invoice.items[0]?.description || 'Travel Service'}
      AMOUNT: $${invoice.amount}
      
      STATUS: ${invoice.paymentStatus}
      ${invoice.paymentDate ? `PAID ON: ${new Date(invoice.paymentDate).toLocaleDateString()}` : ''}
      
      Thank you for your business!
      FareBuzzer Travel
    `;
    
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${invoice.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (error && !invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">❌</div>
          <h2 className="text-xl font-semibold text-gray-800">Invoice Not Found</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (success || isSuccessPage) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-green-600">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
            <p className="text-gray-600 mt-2">Thank you for your payment</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h2 className="font-bold text-lg text-green-800 mb-3">Payment Details</h2>
            <div className="space-y-2">
              <p><span className="text-gray-600">Invoice:</span> <strong>{invoice.invoiceNumber}</strong></p>
              <p><span className="text-gray-600">Amount:</span> <strong>${invoice.amount}</strong></p>
              <p><span className="text-gray-600">Date:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="text-gray-600">Transaction:</span> {invoice.transactionId || 'Completed'}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={downloadInvoice}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg border"
            >
              Download Receipt
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Invoice #{invoice.invoiceNumber}</h1>
                <p className="text-blue-100 mt-1">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  invoice.paymentStatus === "PAID" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {invoice.paymentStatus === "PAID" ? "✅ Paid" : "🟡 Unpaid"}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Customer & Invoice Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Bill To</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{invoice.customerName}</p>
                  <p className="text-gray-600">{invoice.customerEmail}</p>
                  {invoice.customerPhone && <p className="text-gray-600">{invoice.customerPhone}</p>}
                  {invoice.bookingRef && <p className="mt-2 text-sm text-gray-500">Booking: {invoice.bookingRef}</p>}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Invoice Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><span className="text-gray-600">Invoice Date:</span> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Status:</span> <strong className={
                    invoice.paymentStatus === "PAID" ? "text-green-600" : "text-yellow-600"
                  }>{invoice.paymentStatus}</strong></p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="border rounded-lg overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold">${item.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold border-t">
                    <td className="p-4">Total</td>
                    <td className="p-4 text-right">${invoice.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Section */}
            {invoice.paymentStatus !== "PAID" ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-800 text-lg">Payment Pending</h3>
                    <p className="text-yellow-600">Please complete payment to confirm your booking</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handlePayNow}
                    disabled={paying}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {paying ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>💳 Pay Now - ${invoice.amount}</>
                    )}
                  </button>
                  
                  <div id="paypal-button-container" className="w-full md:w-auto"></div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800 text-lg">Payment Complete</h3>
                    <p className="text-green-600">
                      Paid on {new Date(invoice.paymentDate).toLocaleDateString()} via {invoice.paymentMethod}
                    </p>
                    {invoice.transactionId && (
                      <p className="text-green-600 text-sm mt-1">
                        Transaction: {invoice.transactionId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={downloadInvoice}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-lg border"
              >
                📄 Download Invoice
              </button>
              
              <button
                onClick={() => window.print()}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-6 py-3 rounded-lg border"
              >
                🖨️ Print
              </button>
              
              <button
                onClick={() => navigate('/crm/invoices')}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium px-6 py-3 rounded-lg border"
              >
                📊 View in CRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;