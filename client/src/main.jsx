// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import App from "./App";
// import './index.css'


// console.log(
//   "PayPal Client ID:",
//   import.meta.env.VITE_PAYPAL_CLIENT_ID
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <PayPalScriptProvider
//       options={{
//         "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
//         currency: "USD",
//         intent: "capture",
//       }}
//     >
//       <App />
//     </PayPalScriptProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./App";
import "./index.css";

console.log(
  "PayPal Client ID:",
  import.meta.env.VITE_PAYPAL_CLIENT_ID
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, // ❗ test fallback hata diya
        currency: "USD",                                  // ❗ MUST match backend
        intent: "capture",
        components: "buttons",                            // ✅ stability
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
