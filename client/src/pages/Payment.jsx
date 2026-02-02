// import { useState } from "react";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// function Payment() {
//   const [amount, setAmount] = useState("");

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           width: "360px",
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
//           padding: "25px",
//         }}
//       >
//         <h2 style={{ textAlign: "center" }}>Secure Payment</h2>
//         <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
//           Enter amount & pay securely with PayPal
//         </p>

//         {/* Amount Input */}
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ fontSize: "14px", color: "#555" }}>
//             Enter Amount (USD)
//           </label>
//           <input
//             type="number"
//             placeholder="e.g. 49.99"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               fontSize: "16px",
//             }}
//           />
//         </div>

//         {/* Display Amount */}
//         {amount && (
//           <div
//             style={{
//               background: "#f8f9fb",
//               borderRadius: "10px",
//               padding: "15px",
//               marginBottom: "15px",
//               textAlign: "center",
//             }}
//           >
//             <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
//               Total Amount
//             </p>
//             <h1 style={{ margin: "5px 0", color: "#003087" }}>
//               ${Number(amount).toFixed(2)}
//             </h1>
//           </div>
//         )}

//         {/* PayPal Button */}
//         <PayPalButtons
//           disabled={!amount || Number(amount) <= 0}
//           style={{
//             layout: "vertical",
//             color: "gold",
//             shape: "rect",
//             label: "paypal",
//           }}
//           createOrder={async () => {
//             const res = await fetch(
//               "http://localhost:5000/api/paypal/create-order",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ amount }),
//               }
//             );

//             const data = await res.json();
//             if (!data.id) throw new Error("Order ID not received");
//             return data.id;
//           }}
//           onApprove={async (data) => {
//             const res = await fetch(
//               "http://localhost:5000/api/paypal/capture-order",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ orderID: data.orderID }),
//               }
//             );

//             const result = await res.json();

//             if (result.status === "COMPLETED") {
//               alert(`Payment Successful ✅\nAmount: $${amount}`);
//             }
//           }}
//           onError={(err) => {
//             console.error(err);
//             alert("PayPal payment failed");
//           }}
//         />

//         <p
//           style={{
//             textAlign: "center",
//             fontSize: "12px",
//             color: "#777",
//             marginTop: "15px",
//           }}
//         >
//           🔒 100% secure payment • Powered by PayPal
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Payment;

//====================2 feb==========

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking data from navigation state or URL parameters
  const [bookingData, setBookingData] = useState(null);
  const [amount, setAmount] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    bookingRef: ""
  });

  // Initialize PayPal script
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=ASd1ald0hcH2ql2-ZniX6lJaGBOGYp-XwzEIvVlzV40Jd6AVzMExEkCR7YlrHU3YY_BulDkUFjlQSM80&currency=USD";
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log("Payment page loaded. Location state:", location.state);
    console.log("URL search params:", window.location.search);

    // Try to get data from navigation state first
    if (location.state?.bookingData) {
      console.log("Getting booking data from navigation state:", location.state.bookingData);
      setBookingData(location.state.bookingData);
      setAmount(location.state.bookingData.bookingAmount || "");
      setCustomerInfo({
        name: location.state.bookingData.customerName || "",
        email: location.state.bookingData.customerEmail || "",
        phone: location.state.bookingData.customerPhone || "",
        bookingRef: location.state.bookingData.confirmationNumber || ""
      });
    } 
    // If no state, try to get from URL parameters
    else {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get('customerName');
      const urlEmail = params.get('email');
      const urlPhone = params.get('phone');
      const urlAmount = params.get('amount');
      const urlRef = params.get('bookingRef');

      if (urlName || urlEmail || urlAmount) {
        console.log("Getting data from URL parameters");
        setCustomerInfo({
          name: decodeURIComponent(urlName || ""),
          email: decodeURIComponent(urlEmail || ""),
          phone: decodeURIComponent(urlPhone || ""),
          bookingRef: decodeURIComponent(urlRef || "")
        });
        setAmount(urlAmount || "");
        
        // Create booking data from URL params
        setBookingData({
          customerName: decodeURIComponent(urlName || ""),
          customerEmail: decodeURIComponent(urlEmail || ""),
          customerPhone: decodeURIComponent(urlPhone || ""),
          bookingAmount: urlAmount || "",
          confirmationNumber: decodeURIComponent(urlRef || "")
        });
      }
    }
  }, [location]);

  const handlePaymentSuccess = async (details) => {
    try {
      // Save payment record to your database
      const paymentRecord = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        bookingRef: customerInfo.bookingRef,
        amount: amount,
        paymentId: details.id,
        payerEmail: details.payer.email_address,
        payerId: details.payer.payer_id,
        paymentTime: new Date().toISOString(),
        status: "COMPLETED"
      };

      // Send to your backend
      const response = await fetch("https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payments/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentRecord)
      });

      if (response.ok) {
        // Show success message
        alert(`✅ Payment Successful!\nAmount: $${amount}\nCustomer: ${customerInfo.name}\nEmail: ${customerInfo.email}`);
        
        // Redirect to success page or back to admin
        setTimeout(() => {
          navigate("/admin/send-email");
        }, 2000);
      } else {
        console.error("Failed to save payment record");
      }
    } catch (error) {
      console.error("Error recording payment:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          padding: "30px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#003087", fontWeight: "bold" }}>
            ✈️ FareBuzzer Travel
          </h1>
          <p style={{ margin: "10px 0 0", color: "#666", fontSize: "16px" }}>
            Secure Payment Gateway
          </p>
        </div>

        {/* Customer Info Display */}
        {customerInfo.name && (
          <div
            style={{
              background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "25px",
              border: "2px solid #0ea5e9",
            }}
          >
            <h3 style={{ margin: "0 0 15px", color: "#0369a1", fontSize: "18px" }}>
              Customer Details
            </h3>
            <div style={{ display: "grid", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#475569", fontWeight: "500" }}>Name:</span>
                <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.name}</span>
              </div>
              {customerInfo.email && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569", fontWeight: "500" }}>Email:</span>
                  <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.email}</span>
                </div>
              )}
              {customerInfo.phone && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569", fontWeight: "500" }}>Phone:</span>
                  <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.phone}</span>
                </div>
              )}
              {customerInfo.bookingRef && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569", fontWeight: "500" }}>Booking Ref:</span>
                  <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.bookingRef}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Amount Section */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <label style={{ fontSize: "16px", color: "#555", fontWeight: "500" }}>
              Payment Amount (USD)
            </label>
            {amount && (
              <span style={{ fontSize: "14px", color: "#10b981", fontWeight: "600" }}>
                Pre-filled from booking
              </span>
            )}
          </div>
          
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#003087" }}>
              $
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "15px 15px 15px 40px",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#003087",
                transition: "all 0.3s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          
          {amount && (
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "10px",
                padding: "15px",
                marginTop: "15px",
                textAlign: "center",
                border: "1px solid #e2e8f0",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
                Total Payment Amount
              </p>
              <h1 style={{ margin: "5px 0", color: "#003087", fontSize: "36px", fontWeight: "bold" }}>
                ${Number(amount).toFixed(2)}
              </h1>
              <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
                All prices in US Dollars
              </p>
            </div>
          )}
        </div>

        {/* PayPal Button */}
        {paypalLoaded ? (
          <div style={{ marginBottom: "20px" }}>
            <PayPalButtons
              disabled={!amount || Number(amount) <= 0}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
                height: 48,
              }}
              createOrder={async () => {
                try {
                  const res = await fetch(
                    "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/paypal/create-order",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ 
                        amount,
                        customerName: customerInfo.name,
                        customerEmail: customerInfo.email,
                        bookingRef: customerInfo.bookingRef 
                      }),
                    }
                  );

                  const data = await res.json();
                  console.log("Order created:", data);
                  
                  if (!data.id) throw new Error("Order ID not received");
                  return data.id;
                } catch (error) {
                  console.error("Create order error:", error);
                  throw error;
                }
              }}
              onApprove={async (data) => {
                try {
                  const res = await fetch(
                    "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/paypal/capture-order",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ orderID: data.orderID }),
                    }
                  );

                  const result = await res.json();
                  console.log("Payment captured:", result);

                  if (result.status === "COMPLETED") {
                    await handlePaymentSuccess(result);
                  } else {
                    alert("Payment processing failed. Please try again.");
                  }
                } catch (error) {
                  console.error("Capture order error:", error);
                  alert("Payment processing error. Please try again.");
                }
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                alert("PayPal payment failed. Please try again or use a different payment method.");
              }}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px", background: "#f8fafc", borderRadius: "10px", marginBottom: "20px" }}>
            <p style={{ margin: 0, color: "#64748b" }}>Loading PayPal...</p>
          </div>
        )}

        {/* Security Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#10b981", fontSize: "16px" }}>🔒</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>SSL Secured</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#003087", fontSize: "16px" }}>✓</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>PayPal Verified</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#f59e0b", fontSize: "16px" }}>⚡</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Instant</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
          <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#64748b" }}>
            Need help? Contact support:
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#003087", fontWeight: "500" }}>
            📧 enquiry@farebuzzertravel.com | 📞 844 784 3676
          </p>
          <p style={{ margin: "15px 0 0", fontSize: "12px", color: "#94a3b8" }}>
            © {new Date().getFullYear()} FareBuzzer Travel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;