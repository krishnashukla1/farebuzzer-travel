// import { useEffect, useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const PayNow = () => {
//   const [searchParams] = useSearchParams();
//   const invoice = searchParams.get("invoice");

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     amount: "",
//     remarks: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // 🔹 If invoice link is opened from CRM
//   useEffect(() => {
//     if (invoice) {
//       setLoading(true);
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/invoice/${invoice}`)
//         .then((res) => {
//           setFormData({
//             name: res.data.name,
//             phone: res.data.phone,
//             email: res.data.email,
//             amount: res.data.amount,
//             remarks: res.data.remarks,
//           });
//         })
//         .catch(() => {})
//         .finally(() => setLoading(false));
//     }
//   }, [invoice]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//       <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Pay Securely To Us Online
//         </h1>

//         {loading ? (
//           <p className="text-center">Loading invoice...</p>
//         ) : (
//           <>
//             <div className="space-y-4">

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Contact Number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email ID"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <input
//                 type="number"
//                 name="amount"
//                 placeholder="Amount (INR)"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <textarea
//                 name="remarks"
//                 placeholder="Remarks"
//                 value={formData.remarks}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//               ></textarea>

//             </div>

//             {/* PAY NOW SECTION */}
//             <div className="mt-8">

//               <PayPalScriptProvider
//                 options={{
//                   "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
//                   currency: "USD",
//                 }}
//               >
//                 <PayPalButtons
//                   style={{ layout: "vertical" }}
//                   createOrder={(data, actions) => {
//                     return actions.order.create({
//                       purchase_units: [
//                         {
//                           description: formData.remarks || "Payment",
//                           amount: {
//                             value: (formData.amount / 83).toFixed(2), // INR → USD conversion
//                           },
//                         },
//                       ],
//                     });
//                   }}
//                   onApprove={(data, actions) => {
//                     return actions.order.capture().then((details) => {
//                       alert("Payment Successful!");

//                       // 🔹 Save payment in backend
//                       axios.post(
//                         `${import.meta.env.VITE_API_URL}/payment-success`,
//                         {
//                           invoice,
//                           payer: details.payer,
//                           amount: formData.amount,
//                         }
//                       );
//                     });
//                   }}
//                   onError={(err) => {
//                     console.log(err);
//                     alert("Payment Failed!");
//                   }}
//                 />
//               </PayPalScriptProvider>

//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PayNow;



import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayNow = () => {
  const [searchParams] = useSearchParams();
  const invoiceNumber = searchParams.get("invoice");

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (invoiceNumber) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/invoice/${invoiceNumber}`)
        .then((res) => setInvoice(res.data));
    }
  }, [invoiceNumber]);

  if (!invoice) return <p className="text-center mt-10">Loading...</p>;

  if (invoice.status === "Paid")
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-green-600">
          Payment Already Completed ✅
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Invoice #{invoice.invoiceNumber}
        </h2>

        <p><strong>Name:</strong> {invoice.customerName}</p>
        <p><strong>Amount:</strong> ₹{invoice.amount}</p>

        <div className="mt-6">
          <PayPalScriptProvider
            options={{
              "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
              currency: "USD",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (invoice.amount / 83).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  axios.post(
                    `${import.meta.env.VITE_API_URL}/invoice/payment-success`,
                    {
                      invoiceNumber: invoice.invoiceNumber,
                      transactionId: details.id,
                    }
                  );

                  alert("Payment Successful!");
                  window.location.reload();
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default PayNow;
