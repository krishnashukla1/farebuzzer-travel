import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    bookingRef: "",
  });

  /* ----------------------------------------
     READ DATA FROM URL OR NAVIGATION STATE
  -----------------------------------------*/
  useEffect(() => {
    if (location.state?.bookingData) {
      const b = location.state.bookingData;
      setCustomerInfo({
        name: b.customerName || "",
        email: b.customerEmail || "",
        phone: b.customerPhone || "",
        bookingRef: b.confirmationNumber || "",
      });
      setAmount(b.bookingAmount || "");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const name = params.get("customerName");
    const email = params.get("email");
    const phone = params.get("phone");
    const amt = params.get("amount");
    const ref = params.get("bookingRef");

    if (name || email || amt) {
      setCustomerInfo({
        name: name || "",
        email: email || "",
        phone: phone || "",
        bookingRef: ref || "",
      });
      setAmount(amt || "");
    }
  }, [location]);

  /* ----------------------------------------
     PAYPAL SUCCESS HANDLER
  -----------------------------------------*/
  const handlePaymentSuccess = async (paypalResult) => {
    try {
      const capture =
        paypalResult?.purchase_units?.[0]?.payments?.captures?.[0];

      const paymentRecord = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        bookingRef: customerInfo.bookingRef,
        amount,
        paymentId: capture?.id || paypalResult.id,
        payerEmail: paypalResult?.payer?.email_address || "",
        payerId: paypalResult?.payer?.payer_id || "",
        status: capture?.status || "COMPLETED",
        paymentTime: new Date().toISOString(),
      };

      await fetch(
        "https://farebuzzer-travel-backend.onrender.com/api/payment/record",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentRecord),
        }
      );

      alert("✅ Payment Successful!");
      navigate("/payment-success", { replace: true });
    } catch (err) {
      console.error("Payment record error:", err);
    }
  };

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <div style={{ maxWidth: 500, width: "100%", padding: 24, background: "#fff", borderRadius: 12 }}>

//         <h2 style={{ textAlign: "center" }}>✈️ FareBuzzer Travel</h2>

//         {/* CUSTOMER INFO */}
//         {customerInfo.name && (
//           <div style={{ marginBottom: 16 }}>
//             <p><b>Name:</b> {customerInfo.name}</p>
//             <p><b>Email:</b> {customerInfo.email}</p>
//             <p><b>Phone:</b> {customerInfo.phone}</p>
//             <p><b>Booking Ref:</b> {customerInfo.bookingRef}</p>
//           </div>
//         )}

//         {/* AMOUNT */}
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount USD"
//           style={{ width: "100%", padding: 12, marginBottom: 20 }}
//         />

//         {/* PAYPAL BUTTON */}
//         <PayPalButtons
//           disabled={!amount || Number(amount) <= 0}
//           style={{ layout: "vertical" }}

//           createOrder={async () => {
//             const res = await fetch(
//               "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/create-order",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   amount,
//                   customerName: customerInfo.name,
//                   customerEmail: customerInfo.email,
//                   bookingRef: customerInfo.bookingRef,
//                 }),
//               }
//             );

//             const data = await res.json();
//             console.log("ORDER CREATED:", data.id);
//             return data.id;
//           }}

//           onApprove={async (data) => {
//             const res = await fetch(
//               "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/capture-order",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ orderID: data.orderID }),
//               }
//             );

//             const result = await res.json();
//             console.log("CAPTURE RESULT:", result);

//             if (
//               result?.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
//               "COMPLETED"
//             ) {
//               handlePaymentSuccess(result);
//             } else {
//               alert("❌ Payment not completed");
//             }
//           }}

//           onError={(err) => {
//             console.error("PayPal Error:", err);
//             alert("❌ PayPal payment failed");
//           }}
//         />
//       </div>
//     </div>
//   );

return (
  <div style={styles.page}>
    <div style={styles.card}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.logo}>✈️ FareBuzzer Travel</h1>
        <p style={styles.sub}>Secure Payment Gateway</p>
      </div>

      {/* CUSTOMER DETAILS */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Customer Details</h3>

        <div style={styles.infoRow}>
          <span>Name</span>
          <b>{customerInfo.name}</b>
        </div>
        <div style={styles.infoRow}>
          <span>Email</span>
          <b>{customerInfo.email}</b>
        </div>
        <div style={styles.infoRow}>
          <span>Phone</span>
          <b>{customerInfo.phone}</b>
        </div>
        <div style={styles.infoRow}>
          <span>Booking Ref</span>
          <b>{customerInfo.bookingRef}</b>
        </div>
      </div>

      {/* AMOUNT */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Payment Amount (USD)</h3>

        <div style={styles.amountBox}>
          <span style={styles.currency}>$</span>
          <span style={styles.amount}>{Number(amount).toFixed(2)}</span>
        </div>

        <p style={styles.amountNote}>All prices are in US Dollars</p>
      </div>

      {/* PAYPAL */}
      <div style={styles.paypal}>
        <PayPalButtons
          disabled={!amount || Number(amount) <= 0}
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={async () => {
            const res = await fetch(
              "https://farebuzzer-travel-backend.onrender.com/api/payment/create-order",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  amount,
                  customerName: customerInfo.name,
                  customerEmail: customerInfo.email,
                  bookingRef: customerInfo.bookingRef,
                }),
              }
            );
            const data = await res.json();
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch(
              "https://farebuzzer-travel-backend.onrender.com/api/payment/capture-order",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              }
            );

            const result = await res.json();
            if (
              result?.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
              "COMPLETED"
            ) {
              handlePaymentSuccess(result);
            } else {
              alert("❌ Payment not completed");
            }
          }}
          onError={(err) => {
            console.error(err);
            alert("❌ PayPal payment failed");
          }}
        />
      </div>

      {/* FOOTER */}
      <p style={styles.footer}>
        🔒 Payments are securely processed by PayPal
      </p>
    </div>
  </div>
);


}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #d9e4f5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #0047ab, #0066ff)",
    color: "#fff",
    padding: "24px 20px",
    textAlign: "center",
  },
  logo: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
  },
  sub: {
    marginTop: 6,
    fontSize: 13,
    opacity: 0.9,
  },
  section: {
    padding: 20,
    borderBottom: "1px solid #eee",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 12,
    color: "#0047ab",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: 8,
  },
  amountBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    background: "#f4f7fb",
    padding: 16,
    borderRadius: 12,
  },
  currency: {
    fontSize: 20,
    marginRight: 4,
    color: "#0047ab",
  },
  amount: {
    fontSize: 32,
    fontWeight: 700,
    color: "#0047ab",
  },
  amountNote: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    color: "#777",
  },
  paypal: {
    padding: 20,
  },
  footer: {
    fontSize: 11,
    textAlign: "center",
    padding: 12,
    color: "#666",
  },
};

export default Payment;

//=======code 3 merge code 1 code 2

// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// function Payment() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [bookingData, setBookingData] = useState(null);
//     const [amount, setAmount] = useState("");
//     const [customerInfo, setCustomerInfo] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         bookingRef: ""
//     });
//     const [paypalLoaded, setPaypalLoaded] = useState(false);

//     // Initialize PayPal script
//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://www.paypal.com/sdk/js?client-id=ASd1ald0hcH2ql2-ZniX6lJaGBOGYp-XwzEIvVlzV40Jd6AVzMExEkCR7YlrHU3YY_BulDkUFjlQSM80&currency=USD";
//         script.async = true;
//         script.onload = () => setPaypalLoaded(true);
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     // Get booking data from navigation state or URL parameters
//     useEffect(() => {
//         if (location.state?.bookingData) {
//             const b = location.state.bookingData;
//             setBookingData(b);
//             setAmount(b.bookingAmount || "");
//             setCustomerInfo({
//                 name: b.customerName || "",
//                 email: b.customerEmail || "",
//                 phone: b.customerPhone || "",
//                 bookingRef: b.confirmationNumber || ""
//             });
//         } else {
//             const params = new URLSearchParams(window.location.search);
//             const name = params.get("customerName");
//             const email = params.get("email");
//             const phone = params.get("phone");
//             const amt = params.get("amount");
//             const ref = params.get("bookingRef");

//             if (name || email || amt) {
//                 setCustomerInfo({
//                     name: decodeURIComponent(name || ""),
//                     email: decodeURIComponent(email || ""),
//                     phone: decodeURIComponent(phone || ""),
//                     bookingRef: decodeURIComponent(ref || "")
//                 });
//                 setAmount(amt || "");
                
//                 setBookingData({
//                     customerName: decodeURIComponent(name || ""),
//                     customerEmail: decodeURIComponent(email || ""),
//                     customerPhone: decodeURIComponent(phone || ""),
//                     bookingAmount: amt || "",
//                     confirmationNumber: decodeURIComponent(ref || "")
//                 });
//             }
//         }
//     }, [location]);

//     /* ----------------------------------------
//        PAYPAL SUCCESS HANDLER - From Code 2
//     -----------------------------------------*/
//     const handlePaymentSuccess = async (paypalResult) => {
//         try {
//             const capture = paypalResult?.purchase_units?.[0]?.payments?.captures?.[0];

//             const paymentRecord = {
//                 customerName: customerInfo.name,
//                 customerEmail: customerInfo.email,
//                 customerPhone: customerInfo.phone,
//                 bookingRef: customerInfo.bookingRef,
//                 amount: amount,
//                 paymentId: capture?.id || paypalResult.id,
//                 payerEmail: paypalResult?.payer?.email_address || "",
//                 payerId: paypalResult?.payer?.payer_id || "",
//                 status: capture?.status || "COMPLETED",
//                 paymentTime: new Date().toISOString(),
//             };

//             // Send to backend
//             await fetch(
//                 "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/record",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(paymentRecord),
//                 }
//             );

//             // Show success alert
//             alert("✅ Payment Successful!");
            
//             // Redirect to success page
//             navigate("/payment-success", { replace: true });
//         } catch (err) {
//             console.error("Payment record error:", err);
//             alert("⚠️ Payment was successful but there was an error saving the record.");
//         }
//     };

//     return (
//         <div
//             style={{
//                 minHeight: "100vh",
//                 background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontFamily: "Arial, sans-serif",
//                 padding: "20px",
//             }}
//         >
//             <div
//                 style={{
//                     width: "100%",
//                     maxWidth: "500px",
//                     background: "#fff",
//                     borderRadius: "20px",
//                     boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
//                     padding: "30px",
//                     overflow: "hidden",
//                 }}
//             >
//                 {/* Header */}
//                 <div style={{ textAlign: "center", marginBottom: "25px" }}>
//                     <h1 style={{ margin: 0, fontSize: "28px", color: "#003087", fontWeight: "bold" }}>
//                         ✈️ FareBuzzer Travel
//                     </h1>
//                     <p style={{ margin: "10px 0 0", color: "#666", fontSize: "16px" }}>
//                         Secure Payment Gateway
//                     </p>
//                 </div>

//                 {/* Customer Info Display */}
//                 {customerInfo.name && (
//                     <div
//                         style={{
//                             background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
//                             borderRadius: "15px",
//                             padding: "20px",
//                             marginBottom: "25px",
//                             border: "2px solid #0ea5e9",
//                         }}
//                     >
//                         <h3 style={{ margin: "0 0 15px", color: "#0369a1", fontSize: "18px" }}>
//                             Customer Details
//                         </h3>
//                         <div style={{ display: "grid", gap: "10px" }}>
//                             <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                 <span style={{ color: "#475569", fontWeight: "500" }}>Name:</span>
//                                 <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.name}</span>
//                             </div>
//                             {customerInfo.email && (
//                                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                     <span style={{ color: "#475569", fontWeight: "500" }}>Email:</span>
//                                     <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.email}</span>
//                                 </div>
//                             )}
//                             {customerInfo.phone && (
//                                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                     <span style={{ color: "#475569", fontWeight: "500" }}>Phone:</span>
//                                     <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.phone}</span>
//                                 </div>
//                             )}
//                             {customerInfo.bookingRef && (
//                                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                     <span style={{ color: "#475569", fontWeight: "500" }}>Booking Ref:</span>
//                                     <span style={{ color: "#1e293b", fontWeight: "600" }}>{customerInfo.bookingRef}</span>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Amount Section */}
//                 <div style={{ marginBottom: "25px" }}>
//                     {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
//                         <label style={{ fontSize: "16px", color: "#555", fontWeight: "500" }}>
//                             Payment Amount (USD)
//                         </label>
//                         {amount && (
//                             <span style={{ fontSize: "14px", color: "#10b981", fontWeight: "600" }}>
//                                 Pre-filled from booking
//                             </span>
//                         )}
//                     </div> */}

//                     {/* <div style={{ position: "relative" }}>
//                         <div style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#003087" }}>
//                             $
//                         </div>
//                         <input
//                             type="number"
//                             placeholder="Enter amount"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             style={{
//                                 width: "100%",
//                                 padding: "15px 15px 15px 40px",
//                                 borderRadius: "12px",
//                                 border: "2px solid #e2e8f0",
//                                 fontSize: "20px",
//                                 fontWeight: "bold",
//                                 color: "#003087",
//                                 transition: "all 0.3s",
//                             }}
//                             onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
//                             onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
//                         />
//                     </div> */}

//                     {amount && (
//                         <div
//                             style={{
//                                 background: "#f8fafc",
//                                 borderRadius: "10px",
//                                 padding: "15px",
//                                 marginTop: "15px",
//                                 textAlign: "center",
//                                 border: "1px solid #e2e8f0",
//                             }}
//                         >
//                             <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
//                                 Total Payment Amount
//                             </p>
//                             <h1 style={{ margin: "5px 0", color: "#003087", fontSize: "36px", fontWeight: "bold" }}>
//                                 ${Number(amount).toFixed(2)}
//                             </h1>
//                             <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
//                                 All prices in US Dollars
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* PayPal Button */}
//                 {paypalLoaded ? (
//                     <div style={{ marginBottom: "20px" }}>
//                         <PayPalButtons
//                             disabled={!amount || Number(amount) <= 0}
//                             style={{
//                                 layout: "vertical",
//                                 color: "blue",
//             // color: "gold",

//                                 shape: "rect",
//                                 label: "paypal",
//                                 height: 48,
//                             }}


//                             createOrder={async () => {
//                                 const res = await fetch(
//                                     "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/create-order",
//                                     {
//                                         method: "POST",
//                                         headers: { "Content-Type": "application/json" },
//                                         body: JSON.stringify({
//                                             amount,
//                                             customerName: customerInfo.name,
//                                             customerEmail: customerInfo.email,
//                                             bookingRef: customerInfo.bookingRef,
//                                         }),
//                                     }
//                                 );

//                                 const data = await res.json();
//                                 console.log("ORDER CREATED:", data.id);
//                                 return data.id;
//                             }}
//                             onApprove={async (data) => {
//                                 console.log("ON APPROVE:", data);

//                                 const res = await fetch(
//                                     "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/capture-order",
//                                     {
//                                         method: "POST",
//                                         headers: { "Content-Type": "application/json" },
//                                         body: JSON.stringify({ orderID: data.orderID }),
//                                     }
//                                 );

//                                 const result = await res.json();
//                                 console.log("CAPTURE RESULT:", result);

//                                 if (
//                                     result?.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
//                                     "COMPLETED"
//                                 ) {
//                                     // Use the success handler from Code 2
//                                     await handlePaymentSuccess(result);
//                                 } else {
//                                     alert("❌ Payment not completed");
//                                 }
//                             }}
//                             onError={(err) => {
//                                 console.error("PayPal Error:", err);
//                                 alert("❌ PayPal payment failed. Please try again or use a different payment method.");
//                             }}
//                         />
//                     </div>
//                 ) : (
//                     <div style={{ textAlign: "center", padding: "20px", background: "#f8fafc", borderRadius: "10px", marginBottom: "20px" }}>
//                         <p style={{ margin: 0, color: "#64748b" }}>Loading PayPal...</p>
//                     </div>
//                 )}

//                 {/* Security Info */}
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "15px",
//                         marginBottom: "20px",
//                         flexWrap: "wrap",
//                     }}
//                 >
//                     <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                         <span style={{ color: "#10b981", fontSize: "16px" }}>🔒</span>
//                         <span style={{ fontSize: "12px", color: "#64748b" }}>SSL Secured</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                         <span style={{ color: "#003087", fontSize: "16px" }}>✓</span>
//                         <span style={{ fontSize: "12px", color: "#64748b" }}>PayPal Verified</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                         <span style={{ color: "#f59e0b", fontSize: "16px" }}>⚡</span>
//                         <span style={{ fontSize: "12px", color: "#64748b" }}>Instant</span>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
//                     <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#64748b" }}>
//                         Need help? Contact support:
//                     </p>
//                     <p style={{ margin: 0, fontSize: "14px", color: "#003087", fontWeight: "500" }}>
//                         📧 enquiry@farebuzzertravel.com | 📞 844 784 3676
//                     </p>
//                     <p style={{ margin: "15px 0 0", fontSize: "12px", color: "#94a3b8" }}>
//                         © {new Date().getFullYear()} FareBuzzer Travel. All rights reserved.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Payment;



//============code 4===5 feb================

// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [amount, setAmount] = useState("");
//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     bookingRef: "",
//   });

//   /* ----------------------------------
//      LOAD DATA (state or URL params)
//   -----------------------------------*/
//   useEffect(() => {
//     if (location.state?.bookingData) {
//       const b = location.state.bookingData;
//       setAmount(b.bookingAmount || "");
//       setCustomerInfo({
//         name: b.customerName || "",
//         email: b.customerEmail || "",
//         phone: b.customerPhone || "",
//         bookingRef: b.confirmationNumber || "",
//       });
//     } else {
//       const params = new URLSearchParams(window.location.search);
//       setAmount(params.get("amount") || "");
//       setCustomerInfo({
//         name: params.get("customerName") || "",
//         email: params.get("email") || "",
//         phone: params.get("phone") || "",
//         bookingRef: params.get("bookingRef") || "",
//       });
//     }
//   }, [location]);

//   /* ----------------------------------
//      UI
//   -----------------------------------*/
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#f5f7fa,#c3cfe2)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 500,
//           width: "100%",
//           background: "#fff",
//           borderRadius: 20,
//           padding: 30,
//           boxShadow: "0 20px 60px rgba(0,0,0,.15)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", color: "#003087" }}>
//           ✈️ FareBuzzer Travel
//         </h2>

//         {/* CUSTOMER INFO */}
//         {customerInfo.name && (
//           <div style={{ marginTop: 20 }}>
//             <p><b>Name:</b> {customerInfo.name}</p>
//             <p><b>Email:</b> {customerInfo.email}</p>
//             <p><b>Booking Ref:</b> {customerInfo.bookingRef}</p>
//           </div>
//         )}

//         {/* AMOUNT */}
//         <div style={{ marginTop: 20 }}>
//           <label>Amount (USD)</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             style={{
//               width: "100%",
//               padding: 12,
//               fontSize: 18,
//               marginTop: 8,
//             }}
//           />
//         </div>

//         {/* PAYPAL BUTTON */}



//         <div style={{ marginTop: 25 }}>
//           <PayPalButtons
//             disabled={!amount || Number(amount) <= 0}

//             // 1️⃣ CREATE ORDER (backend)
//             createOrder={async () => {
//               try {
//                 const res = await fetch(
//                   "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/create-order",
//                   {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                       amount,
//                       customerName: customerInfo.name,
//                       customerEmail: customerInfo.email,
//                       bookingRef: customerInfo.bookingRef,
//                     }),
//                   }
//                 );

//                 const data = await res.json();
//                 console.log("ORDER CREATED:", data);

//                 if (!data.id) {
//                   throw new Error("Order ID not received from backend");
//                 }

//                 return data.id; // ✅ VERY IMPORTANT
//               } catch (err) {
//                 console.error("CREATE ORDER ERROR:", err);
//                 alert("❌ Unable to create PayPal order");
//               }
//             }}





//             onApprove={(data) => {
//               // VERY IMPORTANT: return a Promise
//               return fetch(
//                 "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/payment/capture-order",
//                 {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({ orderID: data.orderID }),
//                 }
//               )
//                 .then((res) => res.json())
//                 .then((result) => {
//                   console.log("CAPTURE RESULT:", result);

//                   if (result?.status === "COMPLETED") {
//                     alert("✅ Payment Successful");

//                     navigate("/payment-success", {
//                       replace: true,
//                       state: {
//                         orderId: result.id,
//                         payer: result.payer,
//                         amount,
//                       },
//                     });
//                   } else {
//                     throw new Error("Payment not completed");
//                   }
//                 })
//                 .catch((err) => {
//                   console.error("CAPTURE ERROR:", err);
//                   alert("❌ Payment failed");
//                   throw err; // 🔥 REQUIRED
//                 });
//             }}


//             onError={(err) => {
//               console.error("PayPal Error:", err);
//               alert("❌ PayPal error occurred");
//             }}
//           />
//         </div>



//       </div>
//     </div>
//   );
// }

// export default Payment;