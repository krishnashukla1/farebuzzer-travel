import { useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const { state } = useLocation();

  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1>✅ Payment Successful</h1>
      <p>Thank you for your payment.</p>

      {state?.payment && (
        <>
          <p><b>Payment ID:</b> {state.payment.id}</p>
          <p><b>Status:</b> {state.payment.status}</p>
        </>
      )}
    </div>
  );
}
