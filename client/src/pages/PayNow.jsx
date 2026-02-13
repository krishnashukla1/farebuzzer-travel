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
//                 placeholder="Amount ($)"
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

//===========13 feb stylish=================


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
//   const [error, setError] = useState(null);

//   // Load invoice data if present
//   useEffect(() => {
//     if (!invoice) return;

//     setLoading(true);
//     setError(null);

//     axios
//       .get(`${import.meta.env.VITE_API_URL}/invoice/${invoice}`)
//       .then((res) => {
//         setFormData({
//           name: res.data.name || "",
//           phone: res.data.phone || "",
//           email: res.data.email || "",
//           amount: res.data.amount || "",
//           remarks: res.data.remarks || "",
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load invoice details. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   }, [invoice]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const isFormValid = formData.name.trim() && formData.email.trim() && formData.amount > 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
//           <h1 className="text-3xl font-bold tracking-tight">Secure Payment</h1>
//           <p className="mt-2 opacity-90">Complete your payment safely with PayPal</p>
//         </div>

//         {/* Main Content */}
//         <div className="p-8">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading invoice details...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
//               <p className="text-red-700">{error}</p>
//             </div>
//           ) : (
//             <form className="space-y-6">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                 />
//               </div>

//               {/* Phone (optional) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+91 98765 43210"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                 />
//               </div>

//               {/* Amount */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Amount (USD) <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleChange}
//                     placeholder="1000"
//                     min="1"
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Remarks */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Remarks / Order ID
//                 </label>
//                 <textarea
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                   placeholder="Order #12345, Subscription renewal, etc."
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
//                 />
//               </div>

//               {/* PayPal Button Area */}
//               <div className="pt-6 border-t border-gray-100">
//                 <PayPalScriptProvider
//                   options={{
//                     "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
//                     currency: "USD",
//                   }}
//                 >
//                   <PayPalButtons
//                     style={{
//                       layout: "vertical",
//                       color: "blue",
//                       shape: "rect",
//                       label: "paypal",
//                       tagline: false,
//                       height: 48,
//                     }}
//                     disabled={!isFormValid || loading}
//                     createOrder={(data, actions) => {
//                       const usdAmount = (Number(formData.amount) / 83).toFixed(2);

//                       return actions.order.create({
//                         purchase_units: [
//                           {
//                             description: formData.remarks || "Online Payment",
//                             amount: {
//                               value: usdAmount,
//                               currency_code: "USD",
//                             },
//                           },
//                         ],
//                       });
//                     }}
//                     onApprove={async (data, actions) => {
//                       try {
//                         const details = await actions.order.capture();
//                         alert("Payment successful! Thank you.");

//                         await axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
//                           invoice,
//                           payer: details.payer,
//                           amount: formData.amount,
//                           transactionId: details.id,
//                           status: details.status,
//                         });
//                       } catch (err) {
//                         console.error(err);
//                         alert("There was an issue processing your payment.");
//                       }
//                     }}
//                     onError={(err) => {
//                       console.error("PayPal Error:", err);
//                       alert("Payment could not be processed at this time.");
//                     }}
//                   />
//                 </PayPalScriptProvider>

//                 <p className="mt-4 text-center text-xs text-gray-500">
//                   Payments are processed securely via PayPal
//                 </p>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-8 py-5 bg-gray-50 text-center text-sm text-gray-500 border-t">
//           © {new Date().getFullYear()} Your Company Name • All payments are secure
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PayNow;

//======genrate py link===

import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PayNow = () => {
  const [searchParams] = useSearchParams();
  const invoice = searchParams.get("invoice");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");

  // ✅ Load invoice if present
  useEffect(() => {
    if (!invoice) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/invoice/${invoice}`)
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          amount: res.data.amount || "",
          remarks: res.data.remarks || "",
        });
      })
      .catch(() => {
        setError("Failed to load invoice details.");
      })
      .finally(() => setLoading(false));
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    Number(formData.amount) > 0;

  // ✅ Generate Payment Link (INSIDE component)
  const generatePaymentLink = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate-link`,
        formData
      );

      setGeneratedLink(res.data.paymentLink);

      await navigator.clipboard.writeText(res.data.paymentLink);

      alert("Payment link generated & copied!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate link");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 text-white px-8 py-8">
          <h1 className="text-2xl font-bold">Secure Payment</h1>
          <p className="opacity-90 mt-1">
            Complete your payment securely via PayPal
          </p>
        </div>

        <div className="p-8">
          {loading ? (
            <p className="text-center">Loading invoice...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form className="space-y-5">
              
              {/* Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full border p-3 rounded-lg"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full border p-3 rounded-lg"
              />

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border p-3 rounded-lg"
              />

              {/* Amount INR */}
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount (USD)"
                required
                min="1"
                className="w-full border p-3 rounded-lg"
              />

              {/* Remarks */}
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Remarks"
                rows="3"
                className="w-full border p-3 rounded-lg"
              />

              {/* ✅ Generate Link Button */}
              <button
                type="button"
                onClick={generatePaymentLink}
                disabled={!isFormValid}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Generate Payment Link
              </button>

              {generatedLink && (
                <div className="text-sm bg-gray-100 p-3 rounded-lg break-all">
                  <p className="font-semibold mb-1">Share this link:</p>
                  {generatedLink}
                </div>
              )}

              {/* PayPal Section */}
              <div className="pt-6 border-t">
                <PayPalScriptProvider
                  options={{
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical", height: 45 }}
                    disabled={!isFormValid}
                    createOrder={(data, actions) => {
                      const usdAmount = (
                        Number(formData.amount) / 83
                      ).toFixed(2); // INR → USD

                      return actions.order.create({
                        purchase_units: [
                          {
                            description:
                              formData.remarks || "Online Payment",
                            amount: {
                              value: usdAmount,
                              currency_code: "USD",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();

                      await axios.post(
                        `${import.meta.env.VITE_API_URL}/payment-success`,
                        {
                          invoice,
                          payer: details.payer,
                          amount: formData.amount,
                          transactionId: details.id,
                          status: details.status,
                        }
                      );

                      alert("Payment Successful!");
                    }}
                    onError={(err) => {
                      console.error(err);
                      alert("Payment failed");
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </form>
          )}
        </div>

        <div className="bg-gray-50 text-center text-sm py-4">
          © {new Date().getFullYear()} Farebuzzer Travel • Secure Payments
        </div>
      </div>
    </div>
  );
};

export default PayNow;






//=============with link generate=================

// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PayNow = () => {
//   const [searchParams] = useSearchParams();
//   const invoiceNumber = searchParams.get("invoice");

//   const [invoice, setInvoice] = useState(null);

//   useEffect(() => {
//     if (invoiceNumber) {
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/invo/${invoiceNumber}`)
//         .then((res) => setInvoice(res.data));
//     }
//   }, [invoiceNumber]);

//   if (!invoice) return <p className="text-center mt-10">Loading...</p>;

//   if (invoice.status === "Paid")
//     return (
//       <div className="text-center mt-20">
//         <h2 className="text-2xl font-bold text-green-600">
//           Payment Already Completed ✅
//         </h2>
//       </div>
//     );

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Invoice #{invoice.invoiceNumber}
//         </h2>

//         <p><strong>Name:</strong> {invoice.customerName}</p>
//         <p><strong>Amount:</strong> ₹{invoice.amount}</p>

//         <div className="mt-6">
//           <PayPalScriptProvider
//             options={{
//               "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
//               currency: "USD",
//             }}
//           >
//             <PayPalButtons
//               createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [
//                     {
//                       amount: {
//                         value: (invoice.amount / 83).toFixed(2),
//                       },
//                     },
//                   ],
//                 });
//               }}
//               onApprove={(data, actions) => {
//                 return actions.order.capture().then((details) => {
//                   axios.post(
//                     `${import.meta.env.VITE_API_URL}/invo/payment-success`,
//                     {
//                       invoiceNumber: invoice.invoiceNumber,
//                       transactionId: details.id,
//                     }
//                   );

//                   alert("Payment Successful!");
//                   window.location.reload();
//                 });
//               }}
//             />
//           </PayPalScriptProvider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PayNow;
