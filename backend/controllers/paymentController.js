

import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import paypalClient from "../services/paypal.js";



// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount) {
//       return res.status(400).json({ error: "Amount is required" });
//     }

//     const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
//     request.prefer("return=representation");

//     request.requestBody({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: amount.toString(), // must be string
//           },
//         },
//       ],
//     });

//     const order = await paypalClient.execute(request);

//     console.log("✅ PayPal Order Created:", order.result.id);
//     res.json({ id: order.result.id });
//   } catch (err) {
//     console.error("❌ PayPal Create Order Error:", err);
//     // Very helpful: show the full PayPal error response
//     if (err.response) {
//       console.error("PayPal full error:", JSON.stringify(err.response.data, null, 2));
//       return res.status(500).json({
//         error: err.message,
//         paypalError: err.response.data,
//       });
//     }
//     res.status(500).json({ error: err.message });
//   }
// };

//DYANAMIC AMOUNT

export const createOrder = async (req, res) => {
  try {
    let { amount } = req.body;

    // ✅ Validate amount properly
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Valid amount is required" });
    }

    // ✅ PayPal requires string with 2 decimals
    amount = Number(amount).toFixed(2);

    const request =
      new checkoutNodeJssdk.orders.OrdersCreateRequest();

    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount, // string, e.g. "49.99"
          },
        },
      ],
    });

    const order = await paypalClient.execute(request);

    console.log("✅ PayPal Order Created:", order.result.id);
    console.log("💰 Amount:", amount);

    return res.status(200).json({
      id: order.result.id,
      amount,
      status: order.result.status,
    });
  } catch (err) {
    console.error("❌ PayPal Create Order Error:", err);

    // ✅ Show full PayPal error if available
    if (err.response?.data) {
      console.error(
        "PayPal full error:",
        JSON.stringify(err.response.data, null, 2)
      );
      return res.status(500).json({
        error: err.message,
        paypalError: err.response.data,
      });
    }

    return res.status(500).json({ error: err.message });
  }
};


export const captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "orderID is required" });
    }

    const request =
      new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);

    request.requestBody({});

    const capture = await paypalClient.execute(request);

    console.log("✅ PayPal Payment Captured:", capture.result.id);
    console.log("PAYPAL CAPTURE RESULT 👉", capture.result);
    console.log("Payment Status:", capture.result.status); // ✅ COMPLETED

    // return res.status(200).json({
    //   success: true,
    //   status: capture.result.status,
    //   id: capture.result.id, 
    //   orderId: capture.result.id,
    //   payer: capture.result.payer,
    //   purchase_units: capture.result.purchase_units,
    // });


return res.status(200).json({
  status: capture.result.status, // COMPLETED
  id: capture.result.id,
  payer: capture.result.payer,
});








  } catch (err) {
    console.error("❌ PayPal Capture Error:", err);

    if (err.response) {
      console.error(
        "PayPal full error:",
        JSON.stringify(err.response.data, null, 2)
      );
      return res.status(500).json({
        success: false,
        error: err.message,
        paypalError: err.response.data,
      });
    }

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
