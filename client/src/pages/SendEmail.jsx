
// import { useState } from "react";
// import API from "../api";
// import PageWithCloseButton from "./PageWithCloseButton";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund");
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     customerName: "",
//     airline: "",
//     confirmationNumber: "",
//     refundAmount: "",
//     cancellationDate: "",
//     billingName: "",
//     billingAddress: "",
//     billingEmail: "",
//     billingPhone: "",
//     travellers: "",
//     ticketType: "",
//     cardLast4: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     travelDate: "",
//     departure: "",
//     arrival: "",
//     bookingAmount: "",
//     customMessage: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await API.post("/email/send", {
//         emailType,
//         ...form
//       });
//       alert("Email sent successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

//   return (
//     <PageWithCloseButton title="Send Customer Email">
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-2xl p-10">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* EMAIL TYPE DROPDOWN */}
//             <div className="mb-6">
//               <label className="block text-sm font-semibold mb-2">Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={(e) => setEmailType(e.target.value)}
//                 className={inputClass + " bg-white cursor-pointer"}
//               >
//                 <option value="new_booking">New Booking</option>
//                 <option value="change_booking">Change Booking</option>
//                 <option value="refund">Refund</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* CUSTOMER INFO */}
//             <section className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-lg font-semibold mb-4 border-b pb-2">Customer Information</h3>
//               <div className="grid md:grid-cols-2 gap-5">
//                 <input
//                   name="customerName"
//                   placeholder="Customer Name"
//                   className={inputClass}
//                   onChange={handleChange}
//                   required
//                 />
//                 {/* {emailType !== "other" && ( */}
//                   {(emailType !== "other" || emailType === "other") && (
//                   <input
//                     name="billingEmail"
//                     placeholder="Customer Email"
//                     className={inputClass}
//                     onChange={handleChange}
//                   />
//                 )}
//               </div>
//             </section>

//             {/* NEW BOOKING */}
//             {emailType === "new_booking" && (
//               <section className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4 border-b pb-2">Booking Details</h3>
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <input name="airline" placeholder="Airline" className={inputClass} onChange={handleChange} required />
//                   <input name="confirmationNumber" placeholder="Confirmation Number" className={inputClass} onChange={handleChange} />
//                   <input name="departure" placeholder="Departure" className={inputClass} onChange={handleChange} />
//                   <input name="arrival" placeholder="Arrival" className={inputClass} onChange={handleChange} />
//                   <input type="date" name="travelDate" className={inputClass} onChange={handleChange} />
//                   <input name="bookingAmount" placeholder="Booking Amount (USD)" className={inputClass} onChange={handleChange} />
//                 </div>
//               </section>
//             )}

//             {/* CHANGE BOOKING */}
//             {emailType === "change_booking" && (
//               <section className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4 border-b pb-2">Change Booking Details</h3>
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <input name="airline" placeholder="Airline" className={inputClass} onChange={handleChange} required />
//                   <input name="confirmationNumber" placeholder="Confirmation Number" className={inputClass} onChange={handleChange} />
//                   <input type="date" name="oldTravelDate" placeholder="Old Travel Date" className={inputClass} onChange={handleChange} />
//                   <input type="date" name="newTravelDate" placeholder="New Travel Date" className={inputClass} onChange={handleChange} />
//                   <input name="changeFee" placeholder="Change Fee (USD)" className={inputClass} onChange={handleChange} />
//                   <input name="fareDifference" placeholder="Fare Difference (USD)" className={inputClass} onChange={handleChange} />
//                 </div>
//               </section>
//             )}

//             {/* REFUND */}
//             {emailType === "refund" && (
//               <section className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4 border-b pb-2">Refund Details</h3>
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <input name="airline" placeholder="Airline" className={inputClass} onChange={handleChange} required />
//                   <input name="confirmationNumber" placeholder="Confirmation Number" className={inputClass} onChange={handleChange} />
//                   <input name="refundAmount" placeholder="Refund Amount (USD)" className={inputClass} onChange={handleChange} required />
//                   <input type="date" name="cancellationDate" className={inputClass} onChange={handleChange} />
//                   <input name="billingName" placeholder="Billing Name" className={inputClass} onChange={handleChange} />
//                   <input name="billingAddress" placeholder="Billing Address" className={inputClass} onChange={handleChange} />
//                   <input name="billingPhone" placeholder="Billing Phone" className={inputClass} onChange={handleChange} />
//                   <input name="travellers" placeholder="Number of Travellers" className={inputClass} onChange={handleChange} />
//                   <input name="ticketType" placeholder="Ticket Type" className={inputClass} onChange={handleChange} />
//                   <input name="cardLast4" placeholder="Card Last 4 Digits" className={inputClass} onChange={handleChange} />
//                 </div>
//               </section>
//             )}

//             {/* OTHER */}
//             {emailType === "other" && (
//               <section className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4 border-b pb-2">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Type your message here..."
//                   className={inputClass}
//                   onChange={handleChange}
//                 />
//               </section>
//             )}

//             {/* SUBMIT */}
//             <div className="pt-6">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 !text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
//               >
//                 {loading ? "Sending..." : "Send Email"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </PageWithCloseButton>
//   );
// };

// export default SendEmail;

//================with added extra fileld==========


// import { useState, useEffect } from "react";
// import API from "../api";
// import PageWithCloseButton from "./PageWithCloseButton";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const [form, setForm] = useState({
//     customerName: "",
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);




//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setSuccessMessage("");
//   setErrorMessage("");

//   try {
//     await API.post("/email/send", {
//       emailType,
//       ...form,
//     });

//     setSuccessMessage("Email sent successfully");

//     // Reset the form after successful submission
//     setForm({
//       customerName: "",
//       billingEmail: "",
//       confirmationNumber: "",
//       airline: "",
//       departure: "",
//       arrival: "",
//       travelDate: "",
//       bookingAmount: "",
//       oldTravelDate: "",
//       newTravelDate: "",
//       changeFee: "",
//       fareDifference: "",
//       refundAmount: "",
//       cancellationDate: "",
//       customMessage: ""
//     });


//   } catch (err) {
//     setErrorMessage(err.response?.data?.message || "Failed to send email");
//   } finally {
//     setLoading(false);
//   }
// };


//   // Reusable input styles
//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   return (
//     <PageWithCloseButton title="Send Customer Email">
//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden ">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1 ">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//             {/* <p className="text-blue-100">Select category and fill details</p> */}
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">

//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={(e) => setEmailType(e.target.value)}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundSize: '12px', backgroundPosition: 'right 1rem center' }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//               </select>
//             </div>

//             {/* Customer Information */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Billing Email</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* New Reservation Fields */}
//             {/* {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <input name="departure" placeholder="Departure City/Airport" className={inputClass} onChange={handleChange} />
//                   <input name="arrival" placeholder="Arrival City/Airport" className={inputClass} onChange={handleChange} />
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input type="date" name="travelDate" className={inputClass} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input name="bookingAmount" placeholder="0.00" className={inputClass} onChange={handleChange} />
//                   </div>
//                 </div>
//               </section>
//             )} */}

//             {/* New Reservation Fields */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="Departure City/Airport (e.g. New York - JFK)"
//                       className={inputClass}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="Arrival City/Airport (e.g. London - LHR)"
//                       className={inputClass}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input type="date" name="oldTravelDate" className={inputClass} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input type="date" name="newTravelDate" className={inputClass} onChange={handleChange} />
//                   </div>
//                   {/* <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input name="changeFee" placeholder="0.00" className={inputClass} onChange={handleChange} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input name="fareDifference" placeholder="0.00" className={inputClass} onChange={handleChange} />
//                   </div> */}

//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input type="date" name="cancellationDate" className={inputClass} onChange={handleChange} />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {/* {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Refund Amount (USD)</label>
//                   <input
//                     name="refundAmount"
//                     placeholder="0.00"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </section>
//             )} */}
//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   {/* Optional: add cancellation date here if needed for refunds */}
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support Message */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                 />
//               </section>
//             )}

//             {/* Success / Error Message */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 !text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//               {/* Messages */}
//               {successMessage && <p className="text-green-600 font-semibold mt-4">{successMessage}</p>}
//               {errorMessage && <p className="text-red-600 font-semibold mt-4">{errorMessage}</p>}

//             </div>

//           </form>
//         </div>
//       </div>
//     </PageWithCloseButton>
//   );
// };

// export default SendEmail;


//==============clear form after send email=============

// import { useState, useEffect } from "react";
// // import API from "../api";
// import API from "../api/axios";


// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const initialFormState = {
//     customerName: "",
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: ""
//   };

//   const [form, setForm] = useState(initialFormState);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       await API.post("/email/send", {
//         emailType,
//         ...form,
//       });

//       setSuccessMessage("Email sent successfully");

//       // Reset form exactly like in Code 2 — clean initial state
//       setForm(initialFormState);

//       // Optional: keep emailType as is (user can send same type again quickly)
//       // If you want to reset it too, uncomment the line below:
//       // setEmailType("refund_request");

//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reusable input styles
//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   return (

// <div className="p-4">
//   <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden ">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1 ">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">

//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={(e) => setEmailType(e.target.value)}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundSize: '12px', backgroundPosition: 'right 1rem center' }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//               </select>
//             </div>

//             {/* Customer Information */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerName}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Billing Email</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.billingEmail}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.confirmationNumber}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.airline}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* New Reservation Fields */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="Departure City/Airport (e.g. New York - JFK)"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.departure}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="Arrival City/Airport (e.g. London - LHR)"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.arrival}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.travelDate}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.bookingAmount}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input type="date" name="oldTravelDate" className={inputClass} onChange={handleChange} value={form.oldTravelDate} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input type="date" name="newTravelDate" className={inputClass} onChange={handleChange} value={form.newTravelDate} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.changeFee}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.fareDifference}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input type="date" name="cancellationDate" className={inputClass} onChange={handleChange} value={form.cancellationDate} />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.refundAmount}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.cancellationDate}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support Message */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                   value={form.customMessage}
//                 />
//               </section>
//             )}

//             {/* Success / Error Message */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 !text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmail;

//==================with added phn number also=============

// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const initialFormState = {
//     customerName: "",
//     customerPhone: "",           // ← ADDED
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: ""
//   };

//   const [form, setForm] = useState(initialFormState);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setSuccessMessage("");
//   //   setErrorMessage("");

//   //   try {
//   //     await API.post("/email/send", {
//   //       emailType,
//   //       ...form,
//   //     });

//   //     setSuccessMessage("Email sent successfully!");
//   //     setForm(initialFormState);
//   //   } catch (err) {
//   //     setErrorMessage(err.response?.data?.message || "Failed to send email");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // Reusable classes
 
 
 
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const phone = (form.customerPhone || "").trim();

//   // ── Real working regex for phone ─────────────────────────────
//   const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

//   if (phone === "") {
//     setErrorMessage("Phone number is required");
//     return;
//   }

//   if (!phoneRegex.test(phone)) {
//     setErrorMessage(
//       "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
//     );
//     return;
//   }

//   setLoading(true);
//   setSuccessMessage("");
//   setErrorMessage("");

//   try {
//     await API.post("/email/send", {
//       emailType,
//       ...form,
//     });

//     setSuccessMessage("Email sent successfully!");
//     setForm(initialFormState);
//   } catch (err) {
//     setErrorMessage(err.response?.data?.message || "Failed to send email");
//   } finally {
//     setLoading(false);
//   }
// };
 
//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">
//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={(e) => setEmailType(e.target.value)}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                   backgroundSize: "12px",
//                   backgroundPosition: "right 1rem center",
//                 }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//               </select>
//             </div>

//             {/* Customer Information - NOW WITH PHONE */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-3 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name *</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerName}
//                     required
//                   />
//                 </div>
//                 {/* <div>
//                   <label className={labelClass}>Phone Number *</label>
//                   <input
//                     name="customerPhone"
//                     type="tel"
//                     placeholder="+1 555 123 4567"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerPhone}
//                     required
//                   />
//                 </div> */}

//               {/* Phone Input */}
// <div>
//   <label className={labelClass}>Phone Number *</label>
//   <input
//     name="customerPhone"
//     type="tel"
//     // placeholder="+91 98765 43210 or +1 202 555 0123"
//     placeholder="Only numbers, spaces, +, -, () allowed (8–20 characters)"
//     className={inputClass}
//     onChange={handleChange}
//     value={form.customerPhone}
//     required
//   />
//   {/* <p className="text-xs text-gray-500 mt-1">
//     Only numbers, spaces, +, -, () allowed (8–20 characters)
//   </p> */}
// </div>

//                 <div>
//                   <label className={labelClass}>Billing Email *</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.billingEmail}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.confirmationNumber}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.airline}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* ────────────────────────────────────────────── */}
//             {/* New Reservation */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="e.g. New York - JFK"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.departure}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="e.g. London - LHR"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.arrival}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.travelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.bookingAmount}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input
//                       type="date"
//                       name="oldTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.oldTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input
//                       type="date"
//                       name="newTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.newTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.changeFee}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.fareDifference}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Flight Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input
//                     type="date"
//                     name="cancellationDate"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.cancellationDate}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD) *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.refundAmount}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.cancellationDate}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                   value={form.customMessage}
//                 />
//               </section>
//             )}

//             {/* Messages */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmail;

//===========with dynamic data=============

// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const initialFormState = {
//     customerName: "",
//     customerPhone: "",           // ← ADDED
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: "",
//     searchQuery: "",    // NEW: Add search query field
//     category: "",       // NEW: Add category field
//     destination: ""     // NEW: Add destination field
//   };

//   const [form, setForm] = useState(initialFormState);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phone = (form.customerPhone || "").trim();

//     // ── Real working regex for phone ─────────────────────────────
//     const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

//     if (phone === "") {
//       setErrorMessage("Phone number is required");
//       return;
//     }

//     if (!phoneRegex.test(phone)) {
//       setErrorMessage(
//         "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
//       );
//       return;
//     }

//     setLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       const response = await API.post("/email/send", {
//         emailType,
//         ...form,
//       });

//       setSuccessMessage(`Email sent successfully! ${response.data?.data?.dynamicGreeting ? `(${response.data.data.dynamicGreeting})` : ''}`);
//       setForm(initialFormState);
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">
//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={(e) => setEmailType(e.target.value)}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                   backgroundSize: "12px",
//                   backgroundPosition: "right 1rem center",
//                 }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//               </select>
//             </div>

//             {/* Customer Information */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-3 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name *</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerName}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Phone Number *</label>
//                   <input
//                     name="customerPhone"
//                     type="tel"
//                     placeholder="Only numbers, spaces, +, -, () allowed (8–20 characters)"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerPhone}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Billing Email *</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.billingEmail}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* NEW: Dynamic Greeting Information Section */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
//                 Enquiry Details (For Personalized Greeting)
//                 <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Optional</span>
//               </h3>
//               <div className="space-y-4">
//                 <p className="text-sm text-gray-600 mb-4">
//                   These fields help personalize the greeting in the email. Fill based on what the customer enquired about.
//                 </p>
//                 <div className="grid sm:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Customer's Search Query</label>
//                     <input
//                       name="searchQuery"
//                       placeholder="e.g., 'flights to Dubai' or 'Kashmir packages'"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.searchQuery}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       What the customer searched for
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Service Category</label>
//                     <select
//                       name="category"
//                       className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                       onChange={handleChange}
//                       value={form.category}
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                         backgroundSize: "12px",
//                         backgroundPosition: "right 1rem center",
//                       }}
//                     >
//                       <option value="">Select category</option>
//                       <option value="flight">Flight Booking</option>
//                       <option value="hotel">Hotel Booking</option>
//                       <option value="package">Holiday Package</option>
//                       <option value="car_rental">Car Rental</option>
//                       <option value="cruise">Cruise</option>
//                       <option value="visa">Visa Assistance</option>
//                       <option value="insurance">Travel Insurance</option>
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Type of service enquired
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Destination</label>
//                     <input
//                       name="destination"
//                       placeholder="e.g., Kashmir, Manali, Goa, Dubai"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.destination}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Specific destination if known
//                     </p>
//                   </div>
//                 </div>
//                 {/* Preview of greeting */}
//                 {(form.searchQuery || form.category || form.destination) && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <p className="text-sm text-blue-800">
//                       <span className="font-medium">Preview greeting:</span> 
//                       <span className="italic ml-2">
//                         "Thank you for your enquiry regarding the {form.destination ? `${form.destination} package` : form.category ? `${form.category} booking` : 'travel enquiry'}."
//                       </span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.confirmationNumber}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.airline}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* ────────────────────────────────────────────── */}
//             {/* New Reservation */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="e.g. New York - JFK"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.departure}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="e.g. London - LHR"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.arrival}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.travelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.bookingAmount}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input
//                       type="date"
//                       name="oldTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.oldTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input
//                       type="date"
//                       name="newTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.newTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.changeFee}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.fareDifference}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Flight Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input
//                     type="date"
//                     name="cancellationDate"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.cancellationDate}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD) *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.refundAmount}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.cancellationDate}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                   value={form.customMessage}
//                 />
//               </section>
//             )}

//             {/* Messages */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmail;



//==================template========
// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showTemplateModal, setShowTemplateModal] = useState(false);
//   const [newTemplateName, setNewTemplateName] = useState("");
//   const [isSavingTemplate, setIsSavingTemplate] = useState(false);
//   const [loadingTemplates, setLoadingTemplates] = useState(true);

//   const initialFormState = {
//     customerName: "",
//     customerPhone: "",
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: "",
//     searchQuery: "",
//     category: "",
//     destination: "",
//     packageName: "",
//     packageNights: "",
//     packageStartDate: "",
//     packageEndDate: "",
//     packagePrice: "",
//     numberOfPersons: "",
//     hotelName: "",
//     roomType: "",
//     carType: "",
//     rentalDays: "",
//     insuranceType: "",
//     insuranceCoverage: ""
//   };

//   const [form, setForm] = useState(initialFormState);

//   // Load templates on component mount
//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       setLoadingTemplates(true);
//       const response = await API.get("/email/templates");
//       setTemplates(response.data?.data || []);
//     } catch (error) {
//       console.error("Error loading templates:", error);
//       setTemplates([]);
//     } finally {
//       setLoadingTemplates(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleEmailTypeChange = (e) => {
//     setEmailType(e.target.value);
//     setSelectedTemplate(""); // Clear template selection when email type changes
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   // Handle template selection
//   const handleTemplateSelect = (templateId) => {
//     setSelectedTemplate(templateId);
//     const template = templates.find(t => t._id === templateId);
//     if (template) {
//       // Merge template data with current form, but keep customer info fields
//       setForm(prev => ({
//         ...prev,
//         ...template.data,
//         customerName: prev.customerName,
//         customerPhone: prev.customerPhone,
//         billingEmail: prev.billingEmail,
//         searchQuery: prev.searchQuery,
//         category: prev.category,
//         destination: prev.destination
//       }));
//     }
//   };

//   // Save current form as template
//   const saveAsTemplate = async () => {
//     if (!newTemplateName.trim()) {
//       setErrorMessage("Please enter a template name");
//       return;
//     }

//     setIsSavingTemplate(true);
//     try {
//       // Extract template data (exclude customer-specific fields)
//       const templateData = {
//         name: newTemplateName,
//         emailType: emailType,
//         data: {
//           packageName: form.packageName,
//           packageNights: form.packageNights,
//           packageStartDate: form.packageStartDate,
//           packageEndDate: form.packageEndDate,
//           packagePrice: form.packagePrice,
//           numberOfPersons: form.numberOfPersons,
//           hotelName: form.hotelName,
//           roomType: form.roomType,
//           carType: form.carType,
//           rentalDays: form.rentalDays,
//           insuranceType: form.insuranceType,
//           insuranceCoverage: form.insuranceCoverage,
//           departure: form.departure,
//           arrival: form.arrival,
//           travelDate: form.travelDate,
//           bookingAmount: form.bookingAmount,
//           oldTravelDate: form.oldTravelDate,
//           newTravelDate: form.newTravelDate,
//           changeFee: form.changeFee,
//           fareDifference: form.fareDifference,
//           refundAmount: form.refundAmount,
//           cancellationDate: form.cancellationDate,
//           customMessage: form.customMessage,
//           confirmationNumber: form.confirmationNumber,
//           airline: form.airline
//         }
//       };

//       await API.post("/email/templates", templateData);
//       setSuccessMessage("Template saved successfully!");
//       setNewTemplateName("");
//       setShowTemplateModal(false);
//       fetchTemplates(); // Refresh templates list
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Failed to save template");
//     } finally {
//       setIsSavingTemplate(false);
//     }
//   };

//   // Delete template
//   const deleteTemplate = async (templateId, e) => {
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this template?")) {
//       try {
//         await API.delete(`/email/templates/${templateId}`);
//         setTemplates(templates.filter(t => t._id !== templateId));
//         if (selectedTemplate === templateId) {
//           setSelectedTemplate("");
//         }
//         setSuccessMessage("Template deleted successfully!");
//       } catch (error) {
//         setErrorMessage("Failed to delete template");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phone = (form.customerPhone || "").trim();
//     const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

//     if (phone === "") {
//       setErrorMessage("Phone number is required");
//       return;
//     }

//     if (!phoneRegex.test(phone)) {
//       setErrorMessage(
//         "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
//       );
//       return;
//     }

//     setLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       const response = await API.post("/email/send", {
//         emailType,
//         ...form,
//         templateUsed: selectedTemplate || null
//       });

//       setSuccessMessage(`Email sent successfully! ${response.data?.data?.dynamicGreeting ? `(${response.data.data.dynamicGreeting})` : ''}`);
//       setForm(initialFormState);
//       setSelectedTemplate("");
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   // Filter templates by current email type
//   const filteredTemplates = templates.filter(t => t.emailType === emailType);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">
//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={handleEmailTypeChange}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                   backgroundSize: "12px",
//                   backgroundPosition: "right 1rem center",
//                 }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//                 <option value="holiday_package">Holiday Package</option>
//                 <option value="travel_insurance">Travel Insurance</option>
//               </select>
//             </div>

//             {/* Template Selection Section */}
//             <section className={sectionClass}>
//               <div className="flex justify-between items-center mb-5">
//                 <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
//                   Template Selection
//                   <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Optional</span>
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowTemplateModal(true)}
//                   className="text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-all"
//                 >
//                   Save Current as Template
//                 </button>
//               </div>

//               {loadingTemplates ? (
//                 <div className="text-center py-4">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//                 </div>
//               ) : filteredTemplates.length > 0 ? (
//                 <div className="space-y-3">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                     {filteredTemplates.map(template => (
//                       <div
//                         key={template._id}
//                         onClick={() => handleTemplateSelect(template._id)}
//                         className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${selectedTemplate === template._id
//                             ? 'border-purple-500 bg-purple-50'
//                             : 'border-gray-200 hover:border-purple-300'
//                           }`}
//                       >
//                         <div className="flex justify-between items-start">
//                           <h4 className="font-medium text-gray-800 truncate">
//                             {template.name}
//                           </h4>
//                           <button
//                             type="button"
//                             onClick={(e) => deleteTemplate(template._id, e)}
//                             className="text-red-500 hover:text-red-700 ml-2"
//                           >
//                             ×
//                           </button>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Type: {template.emailType.replace('_', ' ')}
//                         </p>
//                         {template.data.packageNights && (
//                           <p className="text-xs text-gray-600 mt-1">
//                             {template.data.packageNights} nights • ${template.data.packagePrice}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {selectedTemplate && (
//                     <p className="text-sm text-green-600 mt-2">
//                       ✓ Template loaded. You can now edit the details below.
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-gray-500">No templates saved for this category yet.</p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Fill in details below and click "Save Current as Template" to create one.
//                   </p>
//                 </div>
//               )}
//             </section>

//             {/* Customer Information */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-3 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name *</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerName}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Phone Number *</label>
//                   <input
//                     name="customerPhone"
//                     type="tel"
//                     placeholder="Only numbers, spaces, +, -, () allowed (8–20 characters)"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerPhone}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Billing Email *</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.billingEmail}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* NEW: Dynamic Greeting Information Section */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
//                 Enquiry Details (For Personalized Greeting)
//                 <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Optional</span>
//               </h3>
//               <div className="space-y-4">
//                 <p className="text-sm text-gray-600 mb-4">
//                   These fields help personalize the greeting in the email. Fill based on what the customer enquired about.
//                 </p>
//                 <div className="grid sm:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Customer's Search Query</label>
//                     <input
//                       name="searchQuery"
//                       placeholder="e.g., 'flights to Dubai' or 'Kashmir packages'"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.searchQuery}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       What the customer searched for
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Service Category</label>
//                     <select
//                       name="category"
//                       className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                       onChange={handleChange}
//                       value={form.category}
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                         backgroundSize: "12px",
//                         backgroundPosition: "right 1rem center",
//                       }}
//                     >
//                       <option value="">Select category</option>
//                       <option value="flight">Flight Booking</option>
//                       <option value="hotel">Hotel Booking</option>
//                       <option value="package">Holiday Package</option>
//                       <option value="car_rental">Car Rental</option>
//                       <option value="cruise">Cruise</option>
//                       <option value="visa">Visa Assistance</option>
//                       <option value="insurance">Travel Insurance</option>
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Type of service enquired
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Destination</label>
//                     <input
//                       name="destination"
//                       placeholder="e.g., Kashmir, Manali, Goa, Dubai"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.destination}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Specific destination if known
//                     </p>
//                   </div>
//                 </div>
//                 {/* Preview of greeting */}
//                 {(form.searchQuery || form.category || form.destination) && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <p className="text-sm text-blue-800">
//                       <span className="font-medium">Preview greeting:</span> 
//                       <span className="italic ml-2">
//                         "Thank you for your enquiry regarding the {form.destination ? `${form.destination} package` : form.category ? `${form.category} booking` : 'travel enquiry'}."
//                       </span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Package-specific fields for holiday packages */}
//             {emailType === "holiday_package" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
//                   Package Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Package Name *</label>
//                     <input
//                       name="packageName"
//                       placeholder="e.g., Kashmir 5 Nights Package"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageName}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Number of Nights *</label>
//                     <input
//                       name="packageNights"
//                       type="number"
//                       placeholder="e.g., 5"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageNights}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Package Price (USD) *</label>
//                     <input
//                       name="packagePrice"
//                       type="number"
//                       step="0.01"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packagePrice}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Start Date</label>
//                     <input
//                       type="date"
//                       name="packageStartDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageStartDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>End Date</label>
//                     <input
//                       type="date"
//                       name="packageEndDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageEndDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Number of Persons</label>
//                     <input
//                       name="numberOfPersons"
//                       type="number"
//                       placeholder="e.g., 2"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.numberOfPersons}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Hotel-specific fields */}
//             {emailType === "hotel_booking" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Hotel Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Hotel Name</label>
//                     <input
//                       name="hotelName"
//                       placeholder="e.g., Taj Palace"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.hotelName}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Room Type</label>
//                     <input
//                       name="roomType"
//                       placeholder="e.g., Deluxe Room"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.roomType}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.confirmationNumber}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.airline}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* ────────────────────────────────────────────── */}
//             {/* New Reservation */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="e.g. New York - JFK"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.departure}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="e.g. London - LHR"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.arrival}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.travelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.bookingAmount}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input
//                       type="date"
//                       name="oldTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.oldTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input
//                       type="date"
//                       name="newTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.newTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.changeFee}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.fareDifference}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Flight Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input
//                     type="date"
//                     name="cancellationDate"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.cancellationDate}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD) *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.refundAmount}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.cancellationDate}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                   value={form.customMessage}
//                 />
//               </section>
//             )}

//             {/* Messages */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Save Template Modal */}
//       {showTemplateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Save as Template</h3>
//             <p className="text-gray-600 mb-4">
//               Save the current details as a template for future use. Customer-specific information will not be saved.
//             </p>
//             <input
//               type="text"
//               placeholder="Enter template name (e.g., Kashmir 5 Nights Package)"
//               className={`${inputClass} mb-4`}
//               value={newTemplateName}
//               onChange={(e) => setNewTemplateName(e.target.value)}
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowTemplateModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={saveAsTemplate}
//                 disabled={isSavingTemplate || !newTemplateName.trim()}
//                 className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium disabled:opacity-70 transition-all"
//               >
//                 {isSavingTemplate ? "Saving..." : "Save Template"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendEmail;


//====================

// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showTemplateModal, setShowTemplateModal] = useState(false);
//   const [newTemplateName, setNewTemplateName] = useState("");
//   const [isSavingTemplate, setIsSavingTemplate] = useState(false);
//   const [loadingTemplates, setLoadingTemplates] = useState(true);

//   const initialFormState = {
//     customerName: "",
//     customerPhone: "",
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: "",
//     searchQuery: "",
//     category: "",
//     destination: "",
//     packageName: "",
//     packageNights: "",
//     packageStartDate: "",
//     packageEndDate: "",
//     packagePrice: "",
//     numberOfPersons: "",
//     hotelName: "",
//     roomType: "",
//     carType: "",
//     rentalDays: "",
//     insuranceType: "",
//     insuranceCoverage: ""
//   };

//   const [form, setForm] = useState(initialFormState);

//   // Load templates on component mount
//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   // Load templates when email type changes
//   useEffect(() => {
//     if (emailType) {
//       fetchTemplates();
//     }
//   }, [emailType]);

//   const fetchTemplates = async () => {
//     try {
//       setLoadingTemplates(true);
//       const response = await API.get("/email/templates");
//       setTemplates(response.data?.data || []);
//     } catch (error) {
//       console.error("Error loading templates:", error);
//       setTemplates([]);
//     } finally {
//       setLoadingTemplates(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleEmailTypeChange = (e) => {
//     const newType = e.target.value;
//     setEmailType(newType);
//     setSelectedTemplate("");
//     // Clear form when changing email type (except customer info)
//     setForm({
//       ...initialFormState,
//       customerName: form.customerName,
//       customerPhone: form.customerPhone,
//       billingEmail: form.billingEmail,
//       searchQuery: form.searchQuery,
//       category: form.category,
//       destination: form.destination
//     });
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   // Handle template selection - FIXED THIS FUNCTION
//   const handleTemplateSelect = (templateId) => {
//     console.log("Selecting template:", templateId);
//     setSelectedTemplate(templateId);
//     const template = templates.find(t => t._id === templateId);
    
//     if (template && template.data) {
//       console.log("Template data found:", template.data);
      
//       // Create a new form state with template data merged
//       const newForm = {
//         ...initialFormState,
//         // Keep customer info if already entered
//         customerName: form.customerName || "",
//         customerPhone: form.customerPhone || "",
//         billingEmail: form.billingEmail || "",
//         searchQuery: form.searchQuery || "",
//         category: form.category || "",
//         destination: form.destination || "",
//         // Apply all template data
//         ...template.data,
//         // Ensure email type matches
//         emailType: template.emailType
//       };
      
//       setForm(newForm);
      
//       // Also update the email type to match the template
//       if (template.emailType !== emailType) {
//         setEmailType(template.emailType);
//       }
      
//       setSuccessMessage(`Template "${template.name}" loaded successfully!`);
//     } else {
//       console.error("Template not found or has no data:", template);
//       setErrorMessage("Failed to load template data");
//     }
//   };

//   // Save current form as template - FIXED: Added missing fields
//   const saveAsTemplate = async () => {
//     if (!newTemplateName.trim()) {
//       setErrorMessage("Please enter a template name");
//       return;
//     }

//     setIsSavingTemplate(true);
//     try {
//       // Extract template data (exclude customer-specific fields)
//       const templateData = {
//         name: newTemplateName,
//         emailType: emailType,
//         data: {
//           // Package details
//           packageName: form.packageName || "",
//           packageNights: form.packageNights || "",
//           packageStartDate: form.packageStartDate || "",
//           packageEndDate: form.packageEndDate || "",
//           packagePrice: form.packagePrice || "",
//           numberOfPersons: form.numberOfPersons || "",
          
//           // Hotel details
//           hotelName: form.hotelName || "",
//           roomType: form.roomType || "",
          
//           // Flight details
//           departure: form.departure || "",
//           arrival: form.arrival || "",
//           travelDate: form.travelDate || "",
//           bookingAmount: form.bookingAmount || "",
//           oldTravelDate: form.oldTravelDate || "",
//           newTravelDate: form.newTravelDate || "",
//           changeFee: form.changeFee || "",
//           fareDifference: form.fareDifference || "",
//           refundAmount: form.refundAmount || "",
//           cancellationDate: form.cancellationDate || "",
//           customMessage: form.customMessage || "",
//           confirmationNumber: form.confirmationNumber || "",
//           airline: form.airline || "",
          
//           // Other services
//           carType: form.carType || "",
//           rentalDays: form.rentalDays || "",
//           insuranceType: form.insuranceType || "",
//           insuranceCoverage: form.insuranceCoverage || "",
          
//           // Search fields (optional)
//           searchQuery: form.searchQuery || "",
//           category: form.category || "",
//           destination: form.destination || ""
//         }
//       };

//       console.log("Saving template data:", templateData);
      
//       const response = await API.post("/email/templates", templateData);
//       console.log("Template saved:", response.data);
      
//       setSuccessMessage("Template saved successfully!");
//       setNewTemplateName("");
//       setShowTemplateModal(false);
//       fetchTemplates(); // Refresh templates list
//     } catch (error) {
//       console.error("Error saving template:", error);
//       setErrorMessage(error.response?.data?.message || "Failed to save template");
//     } finally {
//       setIsSavingTemplate(false);
//     }
//   };

//   // Delete template
//   const deleteTemplate = async (templateId, e) => {
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this template?")) {
//       try {
//         await API.delete(`/email/templates/${templateId}`);
//         setTemplates(templates.filter(t => t._id !== templateId));
//         if (selectedTemplate === templateId) {
//           setSelectedTemplate("");
//         }
//         setSuccessMessage("Template deleted successfully!");
//       } catch (error) {
//         setErrorMessage("Failed to delete template");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phone = (form.customerPhone || "").trim();
//     const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

//     if (phone === "") {
//       setErrorMessage("Phone number is required");
//       return;
//     }

//     if (!phoneRegex.test(phone)) {
//       setErrorMessage(
//         "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
//       );
//       return;
//     }

//     setLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       const response = await API.post("/email/send", {
//         emailType,
//         ...form,
//         templateUsed: selectedTemplate || null
//       });

//       setSuccessMessage(`Email sent successfully! ${response.data?.data?.dynamicGreeting ? `(${response.data.data.dynamicGreeting})` : ''}`);
//       setForm(initialFormState);
//       setSelectedTemplate("");
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   // Filter templates by current email type
//   const filteredTemplates = templates.filter(t => t.emailType === emailType);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">
//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={handleEmailTypeChange}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                   backgroundSize: "12px",
//                   backgroundPosition: "right 1rem center",
//                 }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//                 <option value="holiday_package">Holiday Package</option>
//                 <option value="travel_insurance">Travel Insurance</option>
//               </select>
//             </div>

//             {/* Template Selection Section */}
//             <section className={sectionClass}>
//               <div className="flex justify-between items-center mb-5">
//                 <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
//                   Template Selection
//                   <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Optional</span>
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowTemplateModal(true)}
//                   className="text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-all"
//                 >
//                   Save Current as Template
//                 </button>
//               </div>

//               {loadingTemplates ? (
//                 <div className="text-center py-4">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//                 </div>
//               ) : filteredTemplates.length > 0 ? (
//                 <div className="space-y-3">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                     {filteredTemplates.map(template => (
//                       <div
//                         key={template._id}
//                         onClick={() => handleTemplateSelect(template._id)}
//                         className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
//                           selectedTemplate === template._id
//                             ? 'border-purple-500 bg-purple-50'
//                             : 'border-gray-200 hover:border-purple-300'
//                         }`}
//                       >
//                         <div className="flex justify-between items-start">
//                           <h4 className="font-medium text-gray-800 truncate">
//                             {template.name}
//                           </h4>
//                           <button
//                             type="button"
//                             onClick={(e) => deleteTemplate(template._id, e)}
//                             className="text-red-500 hover:text-red-700 ml-2"
//                           >
//                             ×
//                           </button>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Type: {template.emailType.replace('_', ' ')}
//                         </p>
//                         {template.data?.packageNights && (
//                           <p className="text-xs text-gray-600 mt-1">
//                             {template.data.packageNights} nights • ${template.data.packagePrice || "0"}
//                           </p>
//                         )}
//                         {template.data?.hotelName && (
//                           <p className="text-xs text-gray-600 mt-1">
//                             Hotel: {template.data.hotelName}
//                           </p>
//                         )}
//                         {template.data?.carType && (
//                           <p className="text-xs text-gray-600 mt-1">
//                             Car: {template.data.carType}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {selectedTemplate && (
//                     <p className="text-sm text-green-600 mt-2">
//                       ✓ Template loaded. You can now edit the details below.
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-gray-500">No templates saved for this category yet.</p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Fill in details below and click "Save Current as Template" to create one.
//                   </p>
//                 </div>
//               )}
//             </section>

//             {/* Customer Information */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-3 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name *</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerName}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Phone Number *</label>
//                   <input
//                     name="customerPhone"
//                     type="tel"
//                     placeholder="Only numbers, spaces, +, -, () allowed (8–20 characters)"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerPhone}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Billing Email *</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.billingEmail}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* NEW: Dynamic Greeting Information Section */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
//                 Enquiry Details (For Personalized Greeting)
//                 <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Optional</span>
//               </h3>
//               <div className="space-y-4">
//                 <p className="text-sm text-gray-600 mb-4">
//                   These fields help personalize the greeting in the email. Fill based on what the customer enquired about.
//                 </p>
//                 <div className="grid sm:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Customer's Search Query</label>
//                     <input
//                       name="searchQuery"
//                       placeholder="e.g., 'flights to Dubai' or 'Kashmir packages'"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.searchQuery}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       What the customer searched for
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Service Category</label>
//                     <select
//                       name="category"
//                       className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                       onChange={handleChange}
//                       value={form.category}
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                         backgroundSize: "12px",
//                         backgroundPosition: "right 1rem center",
//                       }}
//                     >
//                       <option value="">Select category</option>
//                       <option value="flight">Flight Booking</option>
//                       <option value="hotel">Hotel Booking</option>
//                       <option value="package">Holiday Package</option>
//                       <option value="car_rental">Car Rental</option>
//                       <option value="cruise">Cruise</option>
//                       <option value="visa">Visa Assistance</option>
//                       <option value="insurance">Travel Insurance</option>
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Type of service enquired
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Destination</label>
//                     <input
//                       name="destination"
//                       placeholder="e.g., Kashmir, Manali, Goa, Dubai"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.destination}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Specific destination if known
//                     </p>
//                   </div>
//                 </div>
//                 {/* Preview of greeting */}
//                 {(form.searchQuery || form.category || form.destination) && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <p className="text-sm text-blue-800">
//                       <span className="font-medium">Preview greeting:</span> 
//                       <span className="italic ml-2">
//                         "Thank you for your enquiry regarding the {form.destination ? `${form.destination} package` : form.category ? `${form.category} booking` : 'travel enquiry'}."
//                       </span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Package-specific fields for holiday packages */}
//             {emailType === "holiday_package" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
//                   Package Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Package Name *</label>
//                     <input
//                       name="packageName"
//                       placeholder="e.g., Kashmir 5 Nights Package"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageName}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Number of Nights *</label>
//                     <input
//                       name="packageNights"
//                       type="number"
//                       placeholder="e.g., 5"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageNights}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Package Price (USD) *</label>
//                     <input
//                       name="packagePrice"
//                       type="number"
//                       step="0.01"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packagePrice}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Start Date</label>
//                     <input
//                       type="date"
//                       name="packageStartDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageStartDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>End Date</label>
//                     <input
//                       type="date"
//                       name="packageEndDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageEndDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Number of Persons</label>
//                     <input
//                       name="numberOfPersons"
//                       type="number"
//                       placeholder="e.g., 2"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.numberOfPersons}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Hotel-specific fields */}
//             {emailType === "hotel_booking" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Hotel Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Hotel Name</label>
//                     <input
//                       name="hotelName"
//                       placeholder="e.g., Taj Palace"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.hotelName}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Room Type</label>
//                     <input
//                       name="roomType"
//                       placeholder="e.g., Deluxe Room"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.roomType}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Car Rental fields */}
//             {emailType === "car_rental" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Car Rental Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Car Type</label>
//                     <input
//                       name="carType"
//                       placeholder="e.g., SUV, Sedan, Hatchback"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.carType}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Rental Days</label>
//                     <input
//                       name="rentalDays"
//                       type="number"
//                       placeholder="e.g., 3"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.rentalDays}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Travel Insurance fields */}
//             {emailType === "travel_insurance" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Insurance Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Insurance Type</label>
//                     <input
//                       name="insuranceType"
//                       placeholder="e.g., Comprehensive, Medical, Trip Cancellation"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.insuranceType}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Coverage Amount</label>
//                     <input
//                       name="insuranceCoverage"
//                       placeholder="e.g., $50,000"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.insuranceCoverage}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && emailType !== "holiday_package" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.confirmationNumber}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.airline}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* New Reservation */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="e.g. New York - JFK"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.departure}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="e.g. London - LHR"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.arrival}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.travelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.bookingAmount}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input
//                       type="date"
//                       name="oldTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.oldTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input
//                       type="date"
//                       name="newTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.newTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.changeFee}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.fareDifference}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Flight Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input
//                     type="date"
//                     name="cancellationDate"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.cancellationDate}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD) *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.refundAmount}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.cancellationDate}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                   value={form.customMessage}
//                 />
//               </section>
//             )}

//             {/* Messages */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Save Template Modal */}
//       {showTemplateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Save as Template</h3>
//             <p className="text-gray-600 mb-4">
//               Save the current details as a template for future use. Customer-specific information will not be saved.
//             </p>
//             <input
//               type="text"
//               placeholder="Enter template name (e.g., Kashmir 5 Nights Package)"
//               className={`${inputClass} mb-4`}
//               value={newTemplateName}
//               onChange={(e) => setNewTemplateName(e.target.value)}
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowTemplateModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={saveAsTemplate}
//                 disabled={isSavingTemplate || !newTemplateName.trim()}
//                 className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium disabled:opacity-70 transition-all"
//               >
//                 {isSavingTemplate ? "Saving..." : "Save Template"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendEmail;

//=================correct======

// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const SendEmail = () => {
//   const [emailType, setEmailType] = useState("refund_request");
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [showTemplateModal, setShowTemplateModal] = useState(false);
//   const [newTemplateName, setNewTemplateName] = useState("");
//   const [isSavingTemplate, setIsSavingTemplate] = useState(false);
//   const [loadingTemplates, setLoadingTemplates] = useState(true);

//   const initialFormState = {
//     customerName: "",
//     customerPhone: "",
//     billingEmail: "",
//     confirmationNumber: "",
//     airline: "",
//     departure: "",
//     arrival: "",
//     travelDate: "",
//     bookingAmount: "",
//     oldTravelDate: "",
//     newTravelDate: "",
//     changeFee: "",
//     fareDifference: "",
//     refundAmount: "",
//     cancellationDate: "",
//     customMessage: "",
//     searchQuery: "",
//     category: "",
//     destination: "",
//     packageName: "",
//     packageNights: "",
//     packageStartDate: "",
//     packageEndDate: "",
//     packagePrice: "",
//     numberOfPersons: "",
//     hotelName: "",
//     roomType: "",
//     carType: "",
//     rentalDays: "",
//     insuranceType: "",
//     insuranceCoverage: ""
//   };

//   const [form, setForm] = useState(initialFormState);

//   // Load templates on component mount
//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   // Load templates when email type changes
//   useEffect(() => {
//     if (emailType) {
//       fetchTemplates();
//     }
//   }, [emailType]);

//   const fetchTemplates = async () => {
//     try {
//       setLoadingTemplates(true);
//       const response = await API.get("/email/templates");
//       setTemplates(response.data?.data || []);
//     } catch (error) {
//       console.error("Error loading templates:", error);
//       setTemplates([]);
//     } finally {
//       setLoadingTemplates(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleEmailTypeChange = (e) => {
//     const newType = e.target.value;
//     setEmailType(newType);
//     setSelectedTemplate("");
//     // Clear form when changing email type (except customer info)
//     setForm({
//       ...initialFormState,
//       customerName: form.customerName,
//       customerPhone: form.customerPhone,
//       billingEmail: form.billingEmail,
//       searchQuery: form.searchQuery,
//       category: form.category,
//       destination: form.destination
//     });
//   };

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage]);

//   // Handle template selection - FIXED THIS FUNCTION
//   const handleTemplateSelect = (templateId) => {
//     console.log("Selecting template:", templateId);
//     setSelectedTemplate(templateId);
//     const template = templates.find(t => t._id === templateId);
    
//     if (template && template.data) {
//       console.log("Template data found:", template.data);
      
//       // Create a new form state with template data merged
//       const newForm = {
//         ...initialFormState,
//         // Keep customer info if already entered
//         customerName: form.customerName || "",
//         customerPhone: form.customerPhone || "",
//         billingEmail: form.billingEmail || "",
//         searchQuery: form.searchQuery || "",
//         category: form.category || "",
//         destination: form.destination || "",
//         // Apply all template data
//         ...template.data,
//         // Ensure email type matches
//         emailType: template.emailType
//       };
      
//       setForm(newForm);
      
//       // Also update the email type to match the template
//       if (template.emailType !== emailType) {
//         setEmailType(template.emailType);
//       }
      
//       setSuccessMessage(`Template "${template.name}" loaded successfully!`);
//     } else {
//       console.error("Template not found or has no data:", template);
//       setErrorMessage("Failed to load template data");
//     }
//   };

//   // Save current form as template
//   const saveAsTemplate = async () => {
//     if (emailType !== "holiday_package") {
//       setErrorMessage("Templates can only be saved for Holiday Packages");
//       return;
//     }

//     if (!newTemplateName.trim()) {
//       setErrorMessage("Please enter a template name");
//       return;
//     }

//     setIsSavingTemplate(true);
//     try {
//       // Extract template data (exclude customer-specific fields)
//       const templateData = {
//         name: newTemplateName,
//         emailType: emailType,
//         data: {
//           // Package details
//           packageName: form.packageName || "",
//           packageNights: form.packageNights || "",
//           packageStartDate: form.packageStartDate || "",
//           packageEndDate: form.packageEndDate || "",
//           packagePrice: form.packagePrice || "",
//           numberOfPersons: form.numberOfPersons || "",
          
//           // Hotel details
//           hotelName: form.hotelName || "",
//           roomType: form.roomType || "",
          
//           // Flight details
//           departure: form.departure || "",
//           arrival: form.arrival || "",
//           travelDate: form.travelDate || "",
//           bookingAmount: form.bookingAmount || "",
//           oldTravelDate: form.oldTravelDate || "",
//           newTravelDate: form.newTravelDate || "",
//           changeFee: form.changeFee || "",
//           fareDifference: form.fareDifference || "",
//           refundAmount: form.refundAmount || "",
//           cancellationDate: form.cancellationDate || "",
//           customMessage: form.customMessage || "",
//           confirmationNumber: form.confirmationNumber || "",
//           airline: form.airline || "",
          
//           // Other services
//           carType: form.carType || "",
//           rentalDays: form.rentalDays || "",
//           insuranceType: form.insuranceType || "",
//           insuranceCoverage: form.insuranceCoverage || "",
          
//           // Search fields (optional)
//           searchQuery: form.searchQuery || "",
//           category: form.category || "",
//           destination: form.destination || ""
//         }
//       };

//       console.log("Saving template data:", templateData);
      
//       const response = await API.post("/email/templates", templateData);
//       console.log("Template saved:", response.data);
      
//       setSuccessMessage("Template saved successfully!");
//       setNewTemplateName("");
//       setShowTemplateModal(false);
//       fetchTemplates(); // Refresh templates list
//     } catch (error) {
//       console.error("Error saving template:", error);
//       setErrorMessage(error.response?.data?.message || "Failed to save template");
//     } finally {
//       setIsSavingTemplate(false);
//     }
//   };

//   // Delete template
//   const deleteTemplate = async (templateId, e) => {
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this template?")) {
//       try {
//         await API.delete(`/email/templates/${templateId}`);
//         setTemplates(templates.filter(t => t._id !== templateId));
//         if (selectedTemplate === templateId) {
//           setSelectedTemplate("");
//         }
//         setSuccessMessage("Template deleted successfully!");
//       } catch (error) {
//         setErrorMessage("Failed to delete template");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phone = (form.customerPhone || "").trim();
//     const phoneRegex = /^[+0-9\s\-\(\)]{8,20}$/;

//     if (phone === "") {
//       setErrorMessage("Phone number is required");
//       return;
//     }

//     if (!phoneRegex.test(phone)) {
//       setErrorMessage(
//         "Invalid phone number format. Use only numbers, spaces, +, -, () (8–20 characters)"
//       );
//       return;
//     }

//     setLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       const response = await API.post("/email/send", {
//         emailType,
//         ...form,
//         templateUsed: selectedTemplate || null
//       });

//       setSuccessMessage(`Email sent successfully! ${response.data?.data?.dynamicGreeting ? `(${response.data.data.dynamicGreeting})` : ''}`);
//       setForm(initialFormState);
//       setSelectedTemplate("");
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

//   const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

//   const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

//   // Filter templates by current email type
//   const filteredTemplates = templates.filter(t => t.emailType === emailType);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

//       <div className="max-w-full mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1">
//             <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-7">
//             {/* Email Category */}
//             <div>
//               <label className={labelClass}>Email Category</label>
//               <select
//                 value={emailType}
//                 onChange={handleEmailTypeChange}
//                 className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                   backgroundSize: "12px",
//                   backgroundPosition: "right 1rem center",
//                 }}
//               >
//                 <option value="new_reservation">New Reservation</option>
//                 <option value="exchange_ticket">Exchange Ticket</option>
//                 <option value="flight_cancellation">Flight Cancellation</option>
//                 <option value="refund_request">Refund Request</option>
//                 <option value="seat_addons">Seat / Add-ons</option>
//                 <option value="name_correction">Name Correction</option>
//                 <option value="add_pet">Add Pet</option>
//                 <option value="flight_confirmation">Flight Confirmation</option>
//                 <option value="hotel_booking">Hotel Booking</option>
//                 <option value="car_rental">Car Rental</option>
//                 <option value="customer_support">Customer Support</option>
//                 <option value="holiday_package">Holiday Package</option>
//                 <option value="travel_insurance">Travel Insurance</option>
//               </select>
//             </div>

//             {/* Template Selection Section - ONLY FOR HOLIDAY PACKAGE */}
//             {emailType === "holiday_package" && (
//               <section className={sectionClass}>
//                 <div className="flex justify-between items-center mb-5">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                     <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
//                     Template Selection
//                     <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Optional</span>
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => setShowTemplateModal(true)}
//                     className="cursor-pointer text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-all"
//                   >
//                     Save Current as Template
//                   </button>
//                 </div>

//                 {loadingTemplates ? (
//                   <div className="text-center py-4">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//                   </div>
//                 ) : filteredTemplates.length > 0 ? (
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                       {filteredTemplates.map(template => (
//                         <div
//                           key={template._id}
//                           onClick={() => handleTemplateSelect(template._id)}
//                           className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
//                             selectedTemplate === template._id
//                               ? 'border-purple-500 bg-purple-50'
//                               : 'border-gray-200 hover:border-purple-300'
//                           }`}
//                         >
//                           <div className="flex justify-between items-start">
//                             <h4 className="font-medium text-gray-800 truncate">
//                               {template.name}
//                             </h4>
//                             <button
//                               type="button"
//                               onClick={(e) => deleteTemplate(template._id, e)}
//                               className="text-red-500 hover:text-red-700 ml-2"
//                             >
//                               ×
//                             </button>
//                           </div>
//                           <p className="text-xs text-gray-500 mt-1">
//                             Type: {template.emailType.replace('_', ' ')}
//                           </p>
//                           {template.data?.packageNights && (
//                             <p className="text-xs text-gray-600 mt-1">
//                               {template.data.packageNights} nights • ${template.data.packagePrice || "0"}
//                             </p>
//                           )}
//                           {template.data?.hotelName && (
//                             <p className="text-xs text-gray-600 mt-1">
//                               Hotel: {template.data.hotelName}
//                             </p>
//                           )}
//                           {template.data?.carType && (
//                             <p className="text-xs text-gray-600 mt-1">
//                               Car: {template.data.carType}
//                             </p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     {selectedTemplate && (
//                       <p className="text-sm text-green-600 mt-2">
//                         ✓ Template loaded. You can now edit the details below.
//                       </p>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
//                     <p className="text-gray-500">No templates saved for holiday packages yet.</p>
//                     <p className="text-sm text-gray-400 mt-1">
//                       Fill in package details below and click "Save Current as Template" to create one.
//                     </p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Customer Information */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
//                 Customer Information
//               </h3>
//               <div className="grid sm:grid-cols-3 gap-5">
//                 <div>
//                   <label className={labelClass}>Customer Name *</label>
//                   <input
//                     name="customerName"
//                     placeholder="Enter full name"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerName}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Phone Number *</label>
//                   <input
//                     name="customerPhone"
//                     type="tel"
//                     placeholder="Only numbers, spaces, +, -, () allowed (8–20 characters)"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.customerPhone}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Billing Email *</label>
//                   <input
//                     name="billingEmail"
//                     type="email"
//                     placeholder="customer@example.com"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.billingEmail}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* NEW: Dynamic Greeting Information Section */}
//             <section className={sectionClass}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
//                 Enquiry Details (For Personalized Greeting)
//                 <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Optional</span>
//               </h3>
//               <div className="space-y-4">
//                 <p className="text-sm text-gray-600 mb-4">
//                   These fields help personalize the greeting in the email. Fill based on what the customer enquired about.
//                 </p>
//                 <div className="grid sm:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Customer's Search Query</label>
//                     <input
//                       name="searchQuery"
//                       placeholder="e.g., 'flights to Dubai' or 'Kashmir packages'"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.searchQuery}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       What the customer searched for
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Service Category</label>
//                     <select
//                       name="category"
//                       className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
//                       onChange={handleChange}
//                       value={form.category}
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
//                         backgroundSize: "12px",
//                         backgroundPosition: "right 1rem center",
//                       }}
//                     >
//                       <option value="">Select category</option>
//                       <option value="flight">Flight Booking</option>
//                       <option value="hotel">Hotel Booking</option>
//                       <option value="package">Holiday Package</option>
//                       <option value="car_rental">Car Rental</option>
//                       <option value="cruise">Cruise</option>
//                       <option value="visa">Visa Assistance</option>
//                       <option value="insurance">Travel Insurance</option>
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Type of service enquired
//                     </p>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Destination</label>
//                     <input
//                       name="destination"
//                       placeholder="e.g., Kashmir, Manali, Goa, Dubai"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.destination}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Specific destination if known
//                     </p>
//                   </div>
//                 </div>
//                 {/* Preview of greeting */}
//                 {(form.searchQuery || form.category || form.destination) && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <p className="text-sm text-blue-800">
//                       <span className="font-medium">Preview greeting:</span> 
//                       <span className="italic ml-2">
//                         "Thank you for your enquiry regarding the {form.destination ? `${form.destination} package` : form.category ? `${form.category} booking` : 'travel enquiry'}."
//                       </span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Package-specific fields for holiday packages */}
//             {emailType === "holiday_package" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
//                   Package Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                   <div>
//                     <label className={labelClass}>Package Name *</label>
//                     <input
//                       name="packageName"
//                       placeholder="e.g., Kashmir 5 Nights Package"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageName}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Number of Nights *</label>
//                     <input
//                       name="packageNights"
//                       type="number"
//                       placeholder="e.g., 5"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageNights}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Package Price (USD) *</label>
//                     <input
//                       name="packagePrice"
//                       type="number"
//                       step="0.01"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packagePrice}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Start Date</label>
//                     <input
//                       type="date"
//                       name="packageStartDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageStartDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>End Date</label>
//                     <input
//                       type="date"
//                       name="packageEndDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.packageEndDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Number of Persons</label>
//                     <input
//                       name="numberOfPersons"
//                       type="number"
//                       placeholder="e.g., 2"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.numberOfPersons}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Hotel-specific fields */}
//             {emailType === "hotel_booking" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Hotel Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Hotel Name</label>
//                     <input
//                       name="hotelName"
//                       placeholder="e.g., Taj Palace"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.hotelName}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Room Type</label>
//                     <input
//                       name="roomType"
//                       placeholder="e.g., Deluxe Room"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.roomType}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Car Rental fields */}
//             {emailType === "car_rental" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Car Rental Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Car Type</label>
//                     <input
//                       name="carType"
//                       placeholder="e.g., SUV, Sedan, Hatchback"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.carType}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Rental Days</label>
//                     <input
//                       name="rentalDays"
//                       type="number"
//                       placeholder="e.g., 3"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.rentalDays}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Travel Insurance fields */}
//             {emailType === "travel_insurance" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Insurance Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Insurance Type</label>
//                     <input
//                       name="insuranceType"
//                       placeholder="e.g., Comprehensive, Medical, Trip Cancellation"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.insuranceType}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Coverage Amount</label>
//                     <input
//                       name="insuranceCoverage"
//                       placeholder="e.g., $50,000"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.insuranceCoverage}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Common Booking Info */}
//             {emailType !== "customer_support" && emailType !== "holiday_package" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//                   <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
//                   Booking Details
//                 </h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Confirmation Number</label>
//                     <input
//                       name="confirmationNumber"
//                       placeholder="e.g. ABC123"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.confirmationNumber}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Airline</label>
//                     <input
//                       name="airline"
//                       placeholder="e.g. Delta Airlines"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.airline}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* New Reservation */}
//             {emailType === "new_reservation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Departure</label>
//                     <input
//                       name="departure"
//                       placeholder="e.g. New York - JFK"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.departure}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Arrival</label>
//                     <input
//                       name="arrival"
//                       placeholder="e.g. London - LHR"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.arrival}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Travel Date</label>
//                     <input
//                       type="date"
//                       name="travelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.travelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Booking Amount (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="bookingAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.bookingAmount}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Exchange Ticket */}
//             {emailType === "exchange_ticket" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Original Travel Date</label>
//                     <input
//                       type="date"
//                       name="oldTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.oldTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>New Travel Date</label>
//                     <input
//                       type="date"
//                       name="newTravelDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.newTravelDate}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Change Fee (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="changeFee"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.changeFee}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Fare Difference (USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="fareDifference"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.fareDifference}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Flight Cancellation */}
//             {emailType === "flight_cancellation" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
//                 <div className="max-w-md">
//                   <label className={labelClass}>Date of Cancellation</label>
//                   <input
//                     type="date"
//                     name="cancellationDate"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={form.cancellationDate}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* Refund Request */}
//             {emailType === "refund_request" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
//                 <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
//                   <div>
//                     <label className={labelClass}>Refund Amount (USD) *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       name="refundAmount"
//                       placeholder="0.00"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.refundAmount}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cancellation Date (optional)</label>
//                     <input
//                       type="date"
//                       name="cancellationDate"
//                       className={inputClass}
//                       onChange={handleChange}
//                       value={form.cancellationDate}
//                     />
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Customer Support */}
//             {emailType === "customer_support" && (
//               <section className={sectionClass}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
//                 <textarea
//                   name="customMessage"
//                   rows="6"
//                   placeholder="Write your detailed message here..."
//                   className={`${inputClass} resize-none`}
//                   onChange={handleChange}
//                   value={form.customMessage}
//                 />
//               </section>
//             )}

//             {/* Messages */}
//             {successMessage && (
//               <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-all"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Email"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Save Template Modal */}
//       {showTemplateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Save as Template</h3>
//             <p className="text-gray-600 mb-4">
//               Save the current details as a template for future use. Customer-specific information will not be saved.
//             </p>
//             <input
//               type="text"
//               placeholder="Enter template name (e.g., Kashmir 5 Nights Package)"
//               className={`${inputClass} mb-4`}
//               value={newTemplateName}
//               onChange={(e) => setNewTemplateName(e.target.value)}
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowTemplateModal(false)}
//                 className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={saveAsTemplate}
//                 disabled={isSavingTemplate || !newTemplateName.trim()}
//                 className="cursor-pointer px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium disabled:opacity-70 transition-all"
//               >
//                 {isSavingTemplate ? "Saving..." : "Save Template"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendEmail;

//=================22 jan==========

// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const SendEmail = () => {
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const [emailType, setEmailType] = useState("flight_confirmation");
//   const [senderBrand, setSenderBrand] = useState("lowfare_studio");

//   const initialForm = {
//     customerName: "",
//     customerPhone: "",
//     billingEmail: "",

//     pnr: "",
//     airline: "",
//     from: "",
//     to: "",
//     travelDate: "",
//     departureTime: "",
//     arrivalTime: "",
//     cabinClass: "Economy",

//     ticketNumber: "",
//     bookingAmount: "",
//     paymentMode: "Credit Card",

//     customMessage: "",
//   };

//   const [form, setForm] = useState(initialForm);

//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const t = setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//       return () => clearTimeout(t);
//     }
//   }, [successMessage, errorMessage]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!form.customerPhone || !form.billingEmail) {
//       setErrorMessage("Customer phone & email are required");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       await API.post("/email/send", {
//         emailType,
//         senderBrand, // Airline Desk / AA / LowfareStudio
//         ...form,
//       });

//       setSuccessMessage("Flight ticket email sent successfully");
//       setForm(initialForm);
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "Email sending failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const input =
//     "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500";

//   const section =
//     "bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4";

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Send Flight Ticket Email</h1>

//       <form onSubmit={submitHandler} className="space-y-6">

//         {/* Sender / Brand */}
//         <section className={section}>
//           <h3 className="font-semibold text-lg">Sender / Charge Reference</h3>
//           <select
//             value={senderBrand}
//             onChange={(e) => setSenderBrand(e.target.value)}
//             className={input}
//           >
//             <option value="airline_desk">Airline Desk</option>
//             <option value="american_airlines">American Airlines</option>
//             <option value="lowfare_studio">Lowfare Studio</option>
//           </select>
//         </section>

//         {/* Customer */}
//         <section className={section}>
//           <h3 className="font-semibold text-lg">Customer Details</h3>
//           <input
//             name="customerName"
//             placeholder="Customer Name"
//             className={input}
//             value={form.customerName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="customerPhone"
//             placeholder="Phone Number"
//             className={input}
//             value={form.customerPhone}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="billingEmail"
//             type="email"
//             placeholder="Email Address"
//             className={input}
//             value={form.billingEmail}
//             onChange={handleChange}
//             required
//           />
//         </section>

//         {/* Flight Ticket */}
//         <section className={section}>
//           <h3 className="font-semibold text-lg">Flight Ticket Details</h3>

//           <div className="grid sm:grid-cols-2 gap-4">
//             <input name="pnr" placeholder="PNR" className={input} onChange={handleChange} />
//             <input name="ticketNumber" placeholder="Ticket Number" className={input} onChange={handleChange} />
//             <input name="airline" placeholder="Airline Name" className={input} onChange={handleChange} />
//             <input name="cabinClass" placeholder="Cabin Class" className={input} onChange={handleChange} />
//             <input name="departure" placeholder="From (JFK)" className={input} onChange={handleChange} />
//             <input name="arrival" placeholder="To (LHR)" className={input} onChange={handleChange} />
//             <input type="date" name="travelDate" className={input} onChange={handleChange} />
//             <input name="departureTime" placeholder="Departure Time" className={input} onChange={handleChange} />
//             <input name="arrivalTime" placeholder="Arrival Time" className={input} onChange={handleChange} />
//           </div>
//         </section>

//         {/* Payment */}
//         <section className={section}>
//           <h3 className="font-semibold text-lg">Payment Information</h3>
//           <input
//             name="bookingAmount"
//             type="number"
//             placeholder="Amount Paid (USD)"
//             className={input}
//             onChange={handleChange}
//           />
//           <select
//             name="paymentMode"
//             className={input}
//             onChange={handleChange}
//           >
//             <option>Credit Card</option>
//             <option>Debit Card</option>
//             <option>UPI</option>
//             <option>Net Banking</option>
//           </select>

//           <p className="text-sm text-gray-600">
//             Charges will reflect as <b>LowfareStudio</b> on customer statement.
//           </p>
//         </section>

//         {/* Custom Message */}
//         <section className={section}>
//           <h3 className="font-semibold text-lg">Custom Message</h3>
//           <textarea
//             name="customMessage"
//             rows="4"
//             placeholder="Additional notes for customer..."
//             className={input}
//             onChange={handleChange}
//           />
//         </section>

//         {/* Alerts */}
//         {successMessage && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg">
//             {successMessage}
//           </div>
//         )}
//         {errorMessage && (
//           <div className="bg-red-100 text-red-700 p-3 rounded-lg">
//             {errorMessage}
//           </div>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
//         >
//           {loading ? "Sending Ticket..." : "Send Flight Ticket"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SendEmail;

import { useState, useEffect } from "react";
import API from "../api/axios";

const SendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [emailType, setEmailType] = useState("flight_confirmation");
  const [senderBrand, setSenderBrand] = useState("lowfare_studio");

  const initialForm = {
    customerName: "",
    customerPhone: "",
    billingEmail: "",

    pnr: "",
    ticketNumber: "",
    airline: "",
    from: "",
    to: "",
    travelDate: "",
    departureTime: "",
    arrivalTime: "",
    cabinClass: "Economy",

    bookingAmount: "",
    paymentMode: "Credit Card",

    customMessage: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const t = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.customerPhone || !form.billingEmail) {
      setErrorMessage("Customer phone & email are required");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await API.post("/email/send", {
        emailType,
        senderBrand,
        ...form,
      });

      setSuccessMessage("Flight ticket email sent successfully");
      setForm(initialForm);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Email sending failed");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500";

  const section =
    "bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Send Flight Ticket Email</h1>

      <form onSubmit={submitHandler} className="space-y-6">

        {/* Sender */}
        <section className={section}>
          <h3 className="font-semibold text-lg">Sender / Charges Reference</h3>
          <select
            value={senderBrand}
            onChange={(e) => setSenderBrand(e.target.value)}
            className={input}
          >
            <option value="airline_desk">Airline Desk</option>
            <option value="american_airlines">American Airlines</option>
            <option value="lowfare_studio">Lowfare Studio</option>
          </select>
        </section>

        {/* Customer */}
        <section className={section}>
          <h3 className="font-semibold text-lg">Customer Details</h3>
          <input name="customerName" placeholder="Customer Name" className={input} value={form.customerName} onChange={handleChange} required />
          <input name="customerPhone" placeholder="Phone Number" className={input} value={form.customerPhone} onChange={handleChange} required />
          <input name="billingEmail" type="email" placeholder="Email Address" className={input} value={form.billingEmail} onChange={handleChange} required />
        </section>

        {/* Flight */}
        <section className={section}>
          <h3 className="font-semibold text-lg">Flight Ticket Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="pnr" placeholder="PNR" className={input} onChange={handleChange} />
            <input name="ticketNumber" placeholder="Ticket Number" className={input} onChange={handleChange} />
            <input name="airline" placeholder="Airline" className={input} onChange={handleChange} />
            <input name="cabinClass" placeholder="Cabin Class" className={input} onChange={handleChange} />
            <input name="from" placeholder="From (JFK)" className={input} onChange={handleChange} />
            <input name="to" placeholder="To (LHR)" className={input} onChange={handleChange} />
            <input type="date" name="travelDate" className={input} onChange={handleChange} />
            <input name="departureTime" placeholder="Departure Time" className={input} onChange={handleChange} />
            <input name="arrivalTime" placeholder="Arrival Time" className={input} onChange={handleChange} />
          </div>
        </section>

        {/* Payment */}
        <section className={section}>
          <h3 className="font-semibold text-lg">Payment Information</h3>
          <input name="bookingAmount" type="number" placeholder="Amount Paid" className={input} onChange={handleChange} />
          <select name="paymentMode" className={input} onChange={handleChange}>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
          </select>
          <p className="text-sm text-gray-600">
            Charges will reflect as <b>LowfareStudio</b>
          </p>
        </section>

        {/* Message */}
        <section className={section}>
          <h3 className="font-semibold text-lg">Custom Message</h3>
          <textarea name="customMessage" rows="4" className={input} onChange={handleChange} />
        </section>

        {successMessage && <div className="bg-green-100 text-green-700 p-3 rounded-lg">{successMessage}</div>}
        {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{errorMessage}</div>}

        <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl">
          {loading ? "Sending..." : "Send Flight Ticket"}
        </button>
      </form>
    </div>
  );
};

export default SendEmail;

