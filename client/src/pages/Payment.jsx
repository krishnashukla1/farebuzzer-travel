import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const [amount, setAmount] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "360px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          padding: "25px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Secure Payment</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
          Enter amount & pay securely with PayPal
        </p>

        {/* Amount Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "14px", color: "#555" }}>
            Enter Amount (USD)
          </label>
          <input
            type="number"
            placeholder="e.g. 49.99"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Display Amount */}
        {amount && (
          <div
            style={{
              background: "#f8f9fb",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              Total Amount
            </p>
            <h1 style={{ margin: "5px 0", color: "#003087" }}>
              ${Number(amount).toFixed(2)}
            </h1>
          </div>
        )}

        {/* PayPal Button */}
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
              "http://localhost:5000/api/paypal/create-order",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
              }
            );

            const data = await res.json();
            if (!data.id) throw new Error("Order ID not received");
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch(
              "http://localhost:5000/api/paypal/capture-order",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              }
            );

            const result = await res.json();

            if (result.status === "COMPLETED") {
              alert(`Payment Successful ✅\nAmount: $${amount}`);
            }
          }}
          onError={(err) => {
            console.error(err);
            alert("PayPal payment failed");
          }}
        />

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#777",
            marginTop: "15px",
          }}
        >
          🔒 100% secure payment • Powered by PayPal
        </p>
      </div>
    </div>
  );
}

export default Payment;
