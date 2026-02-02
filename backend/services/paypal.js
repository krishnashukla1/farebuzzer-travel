
// paypal.js
import dotenv from "dotenv";
dotenv.config(); // Must be first

import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

// Debug
console.log("PayPal SDK init – Mode:", process.env.PAYPAL_MODE || 'sandbox');
console.log("Client ID (first 10 chars):", process.env.PAYPAL_CLIENT_ID?.substring(0,10) || "MISSING");
console.log("Secret length:", process.env.PAYPAL_CLIENT_SECRET?.length || "MISSING");

// Environment
const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);

const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

console.log("PayPal client ready (sandbox mode)");
export default paypalClient;
