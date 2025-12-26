
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

import { useState, useEffect } from "react";
// import API from "../api";
import API from "../api/axios";



const SendEmail = () => {
  const [emailType, setEmailType] = useState("refund_request");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const initialFormState = {
    customerName: "",
    billingEmail: "",
    confirmationNumber: "",
    airline: "",
    departure: "",
    arrival: "",
    travelDate: "",
    bookingAmount: "",
    oldTravelDate: "",
    newTravelDate: "",
    changeFee: "",
    fareDifference: "",
    refundAmount: "",
    cancellationDate: "",
    customMessage: ""
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await API.post("/email/send", {
        emailType,
        ...form,
      });

      setSuccessMessage("Email sent successfully");

      // Reset form exactly like in Code 2 — clean initial state
      setForm(initialFormState);

      // Optional: keep emailType as is (user can send same type again quickly)
      // If you want to reset it too, uncomment the line below:
      // setEmailType("refund_request");

    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  // Reusable input styles
  const inputClass =
    "w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

  const labelClass = "text-sm font-medium text-gray-700 mb-2 block";

  const sectionClass = "bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200";

  return (

<div className="p-4">
  <h1 className="text-xl font-bold mb-4">Send Customer Email</h1>

      <div className="max-w-full mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden ">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 pt-2 pb-1 ">
            <h2 className="text-xl font-bold text-white">Select category and fill details</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-7">

            {/* Email Category */}
            <div>
              <label className={labelClass}>Email Category</label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className={`${inputClass} cursor-pointer appearance-none bg-white pr-10 bg-chevron-down bg-no-repeat bg-right-center`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundSize: '12px', backgroundPosition: 'right 1rem center' }}
              >
                <option value="new_reservation">New Reservation</option>
                <option value="exchange_ticket">Exchange Ticket</option>
                <option value="flight_cancellation">Flight Cancellation</option>
                <option value="refund_request">Refund Request</option>
                <option value="seat_addons">Seat / Add-ons</option>
                <option value="name_correction">Name Correction</option>
                <option value="add_pet">Add Pet</option>
                <option value="flight_confirmation">Flight Confirmation</option>
                <option value="hotel_booking">Hotel Booking</option>
                <option value="car_rental">Car Rental</option>
                <option value="customer_support">Customer Support</option>
              </select>
            </div>

            {/* Customer Information */}
            <section className={sectionClass}>
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Customer Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Customer Name</label>
                  <input
                    name="customerName"
                    placeholder="Enter full name"
                    className={inputClass}
                    onChange={handleChange}
                    value={form.customerName}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Billing Email</label>
                  <input
                    name="billingEmail"
                    type="email"
                    placeholder="customer@example.com"
                    className={inputClass}
                    onChange={handleChange}
                    value={form.billingEmail}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Common Booking Info */}
            {emailType !== "customer_support" && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Booking Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Confirmation Number</label>
                    <input
                      name="confirmationNumber"
                      placeholder="e.g. ABC123"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.confirmationNumber}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Airline</label>
                    <input
                      name="airline"
                      placeholder="e.g. Delta Airlines"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.airline}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* New Reservation Fields */}
            {emailType === "new_reservation" && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5">Flight Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Departure</label>
                    <input
                      name="departure"
                      placeholder="Departure City/Airport (e.g. New York - JFK)"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.departure}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Arrival</label>
                    <input
                      name="arrival"
                      placeholder="Arrival City/Airport (e.g. London - LHR)"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.arrival}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Travel Date</label>
                    <input
                      type="date"
                      name="travelDate"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.travelDate}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Booking Amount (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="bookingAmount"
                      placeholder="0.00"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.bookingAmount}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Exchange Ticket */}
            {emailType === "exchange_ticket" && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5">Date Change Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Original Travel Date</label>
                    <input type="date" name="oldTravelDate" className={inputClass} onChange={handleChange} value={form.oldTravelDate} />
                  </div>
                  <div>
                    <label className={labelClass}>New Travel Date</label>
                    <input type="date" name="newTravelDate" className={inputClass} onChange={handleChange} value={form.newTravelDate} />
                  </div>
                  <div>
                    <label className={labelClass}>Change Fee (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="changeFee"
                      placeholder="0.00"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.changeFee}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Fare Difference (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="fareDifference"
                      placeholder="0.00"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.fareDifference}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Cancellation */}
            {emailType === "flight_cancellation" && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5">Cancellation Date</h3>
                <div className="max-w-md">
                  <label className={labelClass}>Date of Cancellation</label>
                  <input type="date" name="cancellationDate" className={inputClass} onChange={handleChange} value={form.cancellationDate} />
                </div>
              </section>
            )}

            {/* Refund Request */}
            {emailType === "refund_request" && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5">Refund Information</h3>
                <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
                  <div>
                    <label className={labelClass}>Refund Amount (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="refundAmount"
                      placeholder="0.00"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.refundAmount}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Cancellation Date (optional)</label>
                    <input
                      type="date"
                      name="cancellationDate"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.cancellationDate}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Customer Support Message */}
            {emailType === "customer_support" && (
              <section className={sectionClass}>
                <h3 className="text-lg font-semibold text-gray-800 mb-5">Custom Message</h3>
                <textarea
                  name="customMessage"
                  rows="6"
                  placeholder="Write your detailed message here..."
                  className={`${inputClass} resize-none`}
                  onChange={handleChange}
                  value={form.customMessage}
                />
              </section>
            )}

            {/* Success / Error Message */}
            {successMessage && (
              <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 !text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Email"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;



