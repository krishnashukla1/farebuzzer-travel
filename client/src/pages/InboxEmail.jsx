//===============correct===============

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Inbox() {
//     const [emails, setEmails] = useState([]);

//     useEffect(() => {
//         api.get("/email") 
//             .then(res => setEmails(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">Inbox</h1>
//             <ul>

//                 {emails.map(email => (
//                     <li key={email._id} className="border-b py-4 space-y-1">
//                         <div className="flex justify-between">
//                             <strong>{email.from}</strong>
//                             <span className="text-xs text-gray-500">
//                                 {new Date(email.createdAt).toLocaleString()}
//                             </span>
//                         </div>

//                         <div className="text-sm font-medium">
//                             {email.subject}
//                         </div>


//                         <span
//                             className={`text-xs px-2 py-1 rounded ${(email.type || "received") === "received"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-blue-100 text-blue-700"
//                                 }`}
//                         >
//                             {(email.type || "received").toUpperCase()}
//                         </span>


//                         {email.meta?.customerName && (
//                             <p><strong>Customer:</strong> {email.meta.customerName}</p>
//                         )}

//                         {email.meta?.confirmationNumber && (
//                             <p><strong>PNR:</strong> {email.meta.confirmationNumber}</p>
//                         )}

//                         {email.meta?.airline && (
//                             <p><strong>Airline:</strong> {email.meta.airline}</p>
//                         )}

//                         {email.meta?.message && (
//                             <p className="text-gray-700">{email.meta.message}</p>
//                         )}
//                     </li>
//                 ))}

//             </ul>
//         </div>
//     );
// }

//=======================

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/email")
//       .then(res => setEmails(res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Inbox</h1>

//       {loading ? (
//         <p>Loading emails...</p>
//       ) : emails.length === 0 ? (
//         <p>No emails found.</p>
//       ) : (
//         <ul>
//           {emails.map(email => (
//             <li key={email._id || Math.random()} className="border-b py-4 space-y-1">
//               <div className="flex justify-between">
//                 <strong>{email.from}</strong>
//                 <span className="text-xs text-gray-500">
//                   {new Date(email.createdAt).toLocaleString()}
//                 </span>
//               </div>

//               <div className="text-sm font-medium">{email.subject}</div>

//               <span
//                 className={`text-xs px-2 py-1 rounded ${
//                   email.type?.toLowerCase() === "received"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-blue-100 text-blue-700"
//                 }`}
//               >
//                 {email.type?.toUpperCase() || "RECEIVED"}
//               </span>

//               {email.meta && (
//                 <div className="text-sm text-gray-700 space-y-1 mt-1">
//                   {email.meta.customerName && <p><strong>Customer:</strong> {email.meta.customerName}</p>}
//                   {email.meta.confirmationNumber && <p><strong>PNR:</strong> {email.meta.confirmationNumber}</p>}
//                   {email.meta.airline && <p><strong>Airline:</strong> {email.meta.airline}</p>}
//                   {email.meta.departure && <p><strong>Departure:</strong> {email.meta.departure}</p>}
//                   {email.meta.arrival && <p><strong>Arrival:</strong> {email.meta.arrival}</p>}
//                   {email.meta.travelDate && <p><strong>Travel Date:</strong> {email.meta.travelDate}</p>}
//                   {email.meta.bookingAmount && <p><strong>Booking Amount:</strong> {email.meta.bookingAmount}</p>}
//                   {email.meta.refundAmount && <p><strong>Refund Amount:</strong> {email.meta.refundAmount}</p>}
//                   {email.meta.message && <p>{email.meta.message}</p>}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

//================with pagination=============

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const ITEMS_PER_PAGE = 10;

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get("/email")
//       .then((res) => {
//         // Sort by createdAt descending (newest first)
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Pagination logic
//   const totalItems = emails.length;
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentEmails = emails.slice(startIndex, endIndex);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
//           <span className="text-sm text-gray-500">
//             {totalItems} {totalItems === 1 ? "email" : "emails"}
//           </span>
//         </div>

//         {/* Loading / Empty / Content */}
//         {loading ? (
//           <div className="text-center py-12 text-gray-500">Loading emails...</div>
//         ) : totalItems === 0 ? (
//           <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border">
//             No emails found in your inbox.
//           </div>
//         ) : (
//           <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
//             <div className="divide-y divide-gray-100">
//               {currentEmails.map((email) => (
//                 <div
//                   key={email._id || Math.random()}
//                   className="p-5 hover:bg-gray-50 transition-colors duration-150"
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-3 mb-1">
//                         <span className="font-semibold text-gray-900 truncate max-w-[280px]">
//                           {email.from}
//                         </span>

//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             email.type?.toLowerCase() === "received"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-blue-100 text-blue-800"
//                           }`}
//                         >
//                           {email.type?.toUpperCase() || "RECEIVED"}
//                         </span>
//                       </div>

//                       <h3 className="text-base font-medium text-gray-900 mb-1.5 truncate">
//                         {email.subject}
//                       </h3>

//                       <div className="text-sm text-gray-600">
//                         {email.meta && (
//                           <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm mt-3">
//                             {email.meta.customerName && (
//                               <p><span className="font-medium">Customer:</span> {email.meta.customerName}</p>
//                             )}
//                             {email.meta.confirmationNumber && (
//                               <p><span className="font-medium">PNR:</span> {email.meta.confirmationNumber}</p>
//                             )}
//                             {email.meta.airline && (
//                               <p><span className="font-medium">Airline:</span> {email.meta.airline}</p>
//                             )}
//                             {email.meta.travelDate && (
//                               <p><span className="font-medium">Travel Date:</span> {email.meta.travelDate}</p>
//                             )}
//                             {email.meta.departure && email.meta.arrival && (
//                               <p>
//                                 <span className="font-medium">Route:</span> {email.meta.departure} → {email.meta.arrival}
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="text-right text-xs text-gray-500 whitespace-nowrap">
//                       {new Date(email.createdAt).toLocaleString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   Page <span className="font-semibold">{currentPage}</span> of{" "}
//                   <span className="font-semibold">{totalPages}</span>
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//==============with styling====

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { MailOpen, Mail } from "lucide-react";

// const ITEMS_PER_PAGE = 10;

// const getRelativeTime = (date) => {
//   const diff = Math.floor((new Date() - new Date(date)) / 1000);
//   if (diff < 60) return "Just now";
//   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
//   if (diff < 172800) return "Yesterday";
//   return new Date(date).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openId, setOpenId] = useState(null);

//   useEffect(() => {
//     api
//       .get("/email")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
//   const start = (currentPage - 1) * ITEMS_PER_PAGE;
//   const visibleEmails = emails.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Booking Inbox
//           </h1>
//           <span className="text-sm text-gray-500">
//             {emails.length} Conversations
//           </span>
//         </div>

//         {loading ? (
//           <div className="text-center py-12 text-gray-500">
//             Loading inbox…
//           </div>
//         ) : emails.length === 0 ? (
//           <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500">
//             No booking emails received.
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow border">
//             {visibleEmails.map((email) => {
//               const isOpen = openId === email._id;
//               const isUnread = email.isRead === false;

//               return (
//                 <div
//                   key={email._id}
//                   className={`border-l-4 ${
//                     email.meta?.status === "refund"
//                       ? "border-red-500"
//                       : email.meta?.status === "cancellation"
//                       ? "border-yellow-500"
//                       : "border-green-500"
//                   } hover:bg-gray-50 transition`}
//                 >
//                   <div
//                     className="p-5 cursor-pointer"
//                     onClick={() => setOpenId(isOpen ? null : email._id)}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex gap-3">
//                         {isUnread ? (
//                           <Mail className="text-blue-600 mt-1" size={18} />
//                         ) : (
//                           <MailOpen className="text-gray-400 mt-1" size={18} />
//                         )}

//                         <div>
//                           <div className="flex items-center gap-2">
//                             <span className="font-semibold text-gray-900">
//                               {email.from || "Customer"}
//                             </span>

//                             {email.meta?.bookingType && (
//                               <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
//                                 {email.meta.bookingType.replace("_", " ").toUpperCase()}
//                               </span>
//                             )}
//                           </div>

//                           <p className="text-sm font-medium text-gray-800 mt-1">
//                             {email.subject}
//                           </p>

//                           <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-4">
//                             {email.meta?.customerName && (
//                               <span>
//                                 👤 {email.meta.customerName}
//                               </span>
//                             )}
//                             {email.meta?.confirmationNumber && (
//                               <span>
//                                 🎫 PNR: {email.meta.confirmationNumber}
//                               </span>
//                             )}
//                             {email.meta?.airline && (
//                               <span>
//                                 ✈ {email.meta.airline}
//                               </span>
//                             )}
//                             {email.meta?.departure && email.meta?.arrival && (
//                               <span>
//                                 🛫 {email.meta.departure} → {email.meta.arrival}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="text-xs text-gray-500 whitespace-nowrap">
//                         {getRelativeTime(email.createdAt)}
//                       </div>
//                     </div>

              
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 text-sm border rounded disabled:opacity-50"
//                 >
//                   Previous
//                 </button>

//                 <span className="text-sm text-gray-600">
//                   Page <b>{currentPage}</b> of <b>{totalPages}</b>
//                 </span>

//                 <button
//                   onClick={() =>
//                     setCurrentPage((p) => Math.min(p + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 text-sm border rounded disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//===============FULL CORRECT=============

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Mail, MailOpen, ChevronLeft, ChevronRight } from "lucide-react";

// const ITEMS_PER_PAGE = 10;

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
//   // Output example: 27/12/2025 03:45 PM
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openId, setOpenId] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get("/email")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
//   const start = (currentPage - 1) * ITEMS_PER_PAGE;
//   const visibleEmails = emails.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
//               Booking Inbox
//             </h1>
//             <p className="text-gray-500 mt-1">
//               {emails.length} {emails.length === 1 ? "conversation" : "conversations"}
//             </p>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         ) : emails.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
//             <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <Mail className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               Your inbox is empty
//             </h3>
//             <p className="text-gray-500">New booking emails will appear here</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden">
//             <div className="divide-y divide-gray-100">
//               {visibleEmails.map((email) => {
//                 const isOpen = openId === email._id;
//                 const isUnread = email.isRead === false;

//                 const statusColor =
//                   email.meta?.status === "refund"
//                     ? "from-red-500 to-rose-600"
//                     : email.meta?.status === "cancellation"
//                     ? "from-amber-500 to-yellow-600"
//                     : "from-emerald-500 to-teal-600";

//                 return (
//                   <div
//                     key={email._id}
//                     className={`group relative transition-all duration-200 hover:shadow-md ${
//                       isOpen ? "bg-indigo-50/40" : "hover:bg-gray-50/80"
//                     }`}
//                   >
//                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${statusColor} opacity-90`} />

//                     <div
//                       className="p-5 pl-8 cursor-pointer"
//                       onClick={() => setOpenId(isOpen ? null : email._id)}
//                     >
//                       <div className="flex items-start justify-between gap-4">
//                         <div className="flex gap-4 flex-1 min-w-0">
//                           <div className="mt-1.5">
//                             {isUnread ? (
//                               <Mail className="text-indigo-600" size={20} strokeWidth={2.2} />
//                             ) : (
//                               <MailOpen className="text-gray-400" size={20} />
//                             )}
//                           </div>

//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2.5 mb-1.5">
//                               <span className="font-semibold text-gray-900 truncate text-base">
//                                 {email.from || "Customer"}
//                               </span>

//                               {email.meta?.bookingType && (
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100/80 text-indigo-700 border border-indigo-200/70">
//                                   {email.meta.bookingType.replace("_", " ").toUpperCase()}
//                                 </span>
//                               )}
//                             </div>

//                             <p className="text-gray-800 font-medium line-clamp-1 mb-2.5">
//                               {email.subject}
//                             </p>

//                             <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
//                               {email.meta?.customerName && (
//                                 <span>👤 {email.meta.customerName}</span>
//                               )}
//                               {email.meta?.confirmationNumber && (
//                                 <span>🎫 PNR: {email.meta.confirmationNumber}</span>
//                               )}
//                               {email.meta?.airline && (
//                                 <span>✈ {email.meta.airline}</span>
//                               )}
//                               {email.meta?.departure && email.meta?.arrival && (
//                                 <span>🛫 {email.meta.departure} → {email.meta.arrival}</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-1 whitespace-nowrap">
//                           <span className="text-xs font-medium text-gray-700">
//                             {formatDate(email.createdAt)}
//                           </span>
//                           {isUnread && (
//                             <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1"></span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Modern Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t bg-gray-50/50 flex items-center justify-between">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="cursor-pointer flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>

//                 <div className="text-sm font-medium text-gray-700">
//                   Page <span className="text-indigo-700 font-semibold">{currentPage}</span>
//                   <span className="text-gray-400 mx-1.5">/</span>
//                   {totalPages}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="cursor-pointer flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//==============WITH PROPER CLICKABLE MODAL===========


// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Mail, MailOpen, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";

// const ITEMS_PER_PAGE = 10;

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get("/email")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
//   const start = (currentPage - 1) * ITEMS_PER_PAGE;
//   const visibleEmails = emails.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
//               Booking Inbox
//             </h1>
//             <p className="text-gray-500 mt-1">
//               {emails.length} {emails.length === 1 ? "conversation" : "conversations"}
//             </p>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         ) : emails.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
//             <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <Mail className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               Your inbox is empty
//             </h3>
//             <p className="text-gray-500">New booking emails will appear here</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden">
//             <div className="divide-y divide-gray-100">
//               {visibleEmails.map((email) => {
//                 const isUnread = email.isRead === false;

//                 const statusColor =
//                   email.meta?.status === "refund"
//                     ? "from-red-500 to-rose-600"
//                     : email.meta?.status === "cancellation"
//                     ? "from-amber-500 to-yellow-600"
//                     : "from-emerald-500 to-teal-600";

//                 return (
//                   <div
//                     key={email._id}
//                     className={`group relative transition-all duration-200 hover:shadow-md hover:bg-gray-50/80`}
//                     onClick={() => setSelectedEmail(email)}
//                   >
//                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${statusColor} opacity-90`} />

//                     <div className="p-5 pl-8 cursor-pointer">
//                       <div className="flex items-start justify-between gap-4">
//                         <div className="flex gap-4 flex-1 min-w-0">
//                           <div className="mt-1.5">
//                             {isUnread ? (
//                               <Mail className="text-indigo-600" size={20} strokeWidth={2.2} />
//                             ) : (
//                               <MailOpen className="text-gray-400" size={20} />
//                             )}
//                           </div>

//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2.5 mb-1.5">
//                               <span className="font-semibold text-gray-900 truncate text-base">
//                                 {email.from || "Customer"}
//                               </span>

//                               {email.meta?.bookingType && (
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100/80 text-indigo-700 border border-indigo-200/70">
//                                   {email.meta.bookingType.replace("_", " ").toUpperCase()}
//                                 </span>
//                               )}
//                             </div>

//                             <p className="text-gray-800 font-medium line-clamp-1 mb-2.5">
//                               {email.subject}
//                             </p>

//                             <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
//                               {email.meta?.customerName && (
//                                 <span>👤 {email.meta.customerName}</span>
//                               )}
//                               {email.meta?.customerPhone && (
//                                 <span>📞 {email.meta.customerPhone}</span>
//                               )}
//                               {email.meta?.confirmationNumber && (
//                                 <span>🎫 PNR: {email.meta.confirmationNumber}</span>
//                               )}
//                               {email.meta?.airline && (
//                                 <span>✈ {email.meta.airline}</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-1 whitespace-nowrap">
//                           <span className="text-xs font-medium text-gray-700">
//                             {formatDate(email.createdAt)}
//                           </span>
//                           {isUnread && (
//                             <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1"></span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t bg-gray-50/50 flex items-center justify-between">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="cursor-pointer flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>

//                 <div className="text-sm font-medium text-gray-700">
//                   Page <span className="text-indigo-700 font-semibold">{currentPage}</span>
//                   <span className="text-gray-400 mx-1.5">/</span>
//                   {totalPages}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="cursor-pointer flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ====================== MODAL ====================== */}
//         {selectedEmail && (
//           <div 
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={(e) => {
//               if (e.target === e.currentTarget) setSelectedEmail(null);
//             }}
//           >
//             <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
//               {/* Modal Header */}
//               <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800">
//                     {selectedEmail.subject}
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     To: {selectedEmail.to} • {formatDate(selectedEmail.createdAt)}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="p-2 rounded-full hover:bg-gray-200 transition-colors"
//                 >
//                   <X size={24} className="text-gray-600" />
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="flex-1 overflow-auto p-6 flex flex-col md:flex-row gap-6">
//                 {/* Email Preview */}
//                 <div className="flex-1 border rounded-xl overflow-hidden bg-white shadow-inner">
//                   <div className="bg-gray-50 px-4 py-2 border-b text-xs text-gray-600 font-medium">
//                     Original Email as Customer Received
//                   </div>
//                   <div 
//                     className="p-6 prose prose-sm sm:prose-base max-w-none"
//                     dangerouslySetInnerHTML={{ __html: selectedEmail.html || "<p>No content available</p>" }}
//                   />
//                 </div>

//                 {/* Meta Information */}
//                 <div className="w-full md:w-80 bg-gray-50 rounded-xl p-5 border shrink-0">
//                   <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <Eye size={18} /> Booking Details
//                   </h3>

//                   <div className="space-y-3 text-sm">
//                     {selectedEmail.meta?.customerName && (
//                       <div>
//                         <span className="text-gray-500 block">Customer Name</span>
//                         <span className="font-medium">{selectedEmail.meta.customerName}</span>
//                       </div>
//                     )}
//                     {selectedEmail.meta?.customerPhone && (
//                       <div>
//                         <span className="text-gray-500 block">Phone Number</span>
//                         <span className="font-medium">{selectedEmail.meta.customerPhone}</span>
//                       </div>
//                     )}
//                     {selectedEmail.meta?.billingEmail && (
//                       <div>
//                         <span className="text-gray-500 block">Billing Email</span>
//                         <span className="font-medium">{selectedEmail.meta.billingEmail}</span>
//                       </div>
//                     )}
//                     {selectedEmail.meta?.confirmationNumber && (
//                       <div>
//                         <span className="text-gray-500 block">Confirmation No</span>
//                         <span className="font-medium">{selectedEmail.meta.confirmationNumber}</span>
//                       </div>
//                     )}

//                     {/* Show all other meta fields dynamically */}
//                     {Object.entries(selectedEmail.meta || {})
//                       .filter(([key]) => 
//                         !["customerName", "customerPhone", "billingEmail", "confirmationNumber"].includes(key)
//                       )
//                       .map(([key, value]) => {
//                         if (!value) return null;
//                         return (
//                           <div key={key}>
//                             <span className="text-gray-500 block capitalize">
//                               {key.replace(/([A-Z])/g, " $1")}
//                             </span>
//                             <span className="font-medium">{value}</span>
//                           </div>
//                         );
//                       })}
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="p-4 border-t bg-gray-50 flex justify-end">
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//=========================


// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Mail, MailOpen, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
// const ITEMS_PER_PAGE = 10;
// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };
// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   useEffect(() => {
//     setLoading(true);
//     api
//       .get("/email")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);
//   const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
//   const start = (currentPage - 1) * ITEMS_PER_PAGE;
//   const visibleEmails = emails.slice(start, start + ITEMS_PER_PAGE);
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
//               Booking Inbox
//             </h1>
//             <p className="text-gray-500 mt-1">
//               {emails.length} {emails.length === 1 ? "conversation" : "conversations"}
//             </p>
//           </div>
//         </div>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         ) : emails.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
//             <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <Mail className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               Your inbox is empty
//             </h3>
//             <p className="text-gray-500">New booking emails will appear here</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden">
//             <div className="divide-y divide-gray-100">
//               {visibleEmails.map((email) => {
//                 const isUnread = email.isRead === false;
//                 const statusColor =
//                   email.meta?.status === "refund"
//                     ? "from-red-500 to-rose-600"
//                     : email.meta?.status === "cancellation"
//                     ? "from-amber-500 to-yellow-600"
//                     : "from-emerald-500 to-teal-600";
//                 return (
//                   <div
//                     key={email._id}
//                     className={`group relative transition-all duration-200 hover:shadow-md hover:bg-gray-50/80`}
//                     onClick={() => setSelectedEmail(email)}
//                   >
//                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${statusColor} opacity-90`} />
//                     <div className="p-5 pl-8 cursor-pointer">
//                       <div className="flex items-start justify-between gap-4">
//                         <div className="flex gap-4 flex-1 min-w-0">
//                           <div className="mt-1.5">
//                             {isUnread ? (
//                               <Mail className="text-indigo-600" size={20} strokeWidth={2.2} />
//                             ) : (
//                               <MailOpen className="text-gray-400" size={20} />
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2.5 mb-1.5">
//                               <span className="font-semibold text-gray-900 truncate text-base">
//                                 {email.from || "Customer"}
//                               </span>
//                               {email.meta?.bookingType && (
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100/80 text-indigo-700 border border-indigo-200/70">
//                                   {email.meta.bookingType.replace("_", " ").toUpperCase()}
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-gray-800 font-medium line-clamp-1 mb-2.5">
//                               {email.subject}
//                             </p>
//                             <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
//                               {email.meta?.customerName && (
//                                 <span>👤 {email.meta.customerName}</span>
//                               )}
//                               {email.meta?.customerPhone && (
//                                 <span>📞 {email.meta.customerPhone}</span>
//                               )}
//                               {email.meta?.confirmationNumber && (
//                                 <span>🎫 PNR: {email.meta.confirmationNumber}</span>
//                               )}
//                               {email.meta?.airline && (
//                                 <span>✈ {email.meta.airline}</span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end gap-1 whitespace-nowrap">
//                           <span className="text-xs font-medium text-gray-700">
//                             {formatDate(email.createdAt)}
//                           </span>
//                           {isUnread && (
//                             <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1"></span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t bg-gray-50/50 flex items-center justify-between">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="cursor-pointer flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>
//                 <div className="text-sm font-medium text-gray-700">
//                   Page <span className="text-indigo-700 font-semibold">{currentPage}</span>
//                   <span className="text-gray-400 mx-1.5">/</span>
//                   {totalPages}
//                 </div>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="cursor-pointer flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//         {/* ====================== MODAL ====================== */}
//         {selectedEmail && (
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={(e) => {
//               if (e.target === e.currentTarget) setSelectedEmail(null);
//             }}
//           >
//             <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
//               {/* Modal Header */}
//               <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800">
//                     {selectedEmail.subject}
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     To: {selectedEmail.to} • {formatDate(selectedEmail.createdAt)}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="p-2 rounded-full hover:bg-gray-200 transition-colors"
//                 >
//                   <X size={24} className="text-gray-600" />
//                 </button>
//               </div>
//               {/* Modal Body */}
//               <div className="flex-1 overflow-auto p-6 flex flex-col md:flex-row gap-6">
//                 {/* Email Preview */}
//                 <div className="flex-1 border rounded-xl overflow-hidden bg-white shadow-inner">
//                   <div className="bg-gray-50 px-4 py-2 border-b text-xs text-gray-600 font-medium">
//                     Original Email as Customer Received
//                   </div>
//                   <div
//                     className="p-6 prose prose-sm sm:prose-base max-w-none"
//                     dangerouslySetInnerHTML={{ __html: selectedEmail.html || "<p>No content available</p>" }}
//                   />
//                 </div>
//                 {/* Meta Information */}
//                 <div className="w-full md:w-80 bg-gray-50 rounded-xl p-5 border shrink-0">
//                   <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <Eye size={18} /> Booking Details
//                   </h3>
//                   <div className="space-y-3 text-sm">
//                     {selectedEmail.meta?.customerName && (
//                       <div>
//                         <span className="text-gray-500 block">Customer Name</span>
//                         <span className="font-medium">{selectedEmail.meta.customerName}</span>
//                       </div>
//                     )}
//                     {selectedEmail.meta?.customerPhone && (
//                       <div>
//                         <span className="text-gray-500 block">Phone Number</span>
//                         <span className="font-medium">{selectedEmail.meta.customerPhone}</span>
//                       </div>
//                     )}
//                     {selectedEmail.meta?.billingEmail && (
//                       <div>
//                         <span className="text-gray-500 block">Billing Email</span>
//                         <span className="font-medium">{selectedEmail.meta.billingEmail}</span>
//                       </div>
//                     )}
//                     {selectedEmail.meta?.confirmationNumber && (
//                       <div>
//                         <span className="text-gray-500 block">Confirmation No</span>
//                         <span className="font-medium">{selectedEmail.meta.confirmationNumber}</span>
//                       </div>
//                     )}
//                     {/* Show all other meta fields dynamically */}
//                     {Object.entries(selectedEmail.meta || {})
//                       .filter(([key]) =>
//                         !["customerName", "customerPhone", "billingEmail", "confirmationNumber"].includes(key)
//                       )
//                       .map(([key, value]) => {
//                         if (!value) return null;
//                         return (
//                           <div key={key}>
//                             <span className="text-gray-500 block capitalize">
//                               {key.replace(/([A-Z])/g, " $1")}
//                             </span>
//                             <span className="font-medium">{value}</span>
//                           </div>
//                         );
//                       })}
//                   </div>
//                 </div>
//               </div>
//               {/* Modal Footer */}
//               <div className="p-4 border-t bg-gray-50 flex justify-end">
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import {
//   Mail,
//   MailOpen,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Eye,
// } from "lucide-react";

// const ITEMS_PER_PAGE = 10;

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   const date = new Date(dateStr);
//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   useEffect(() => {
//     api
//       .get("/email")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
//   const start = (currentPage - 1) * ITEMS_PER_PAGE;
//   const visibleEmails = emails.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//           Booking Communications
//         </h1>

//         {loading ? (
//           <div className="h-60 flex items-center justify-center">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
//           </div>
//         ) : (
//           <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
//             {visibleEmails.map((email) => {
//               const isUnread = email.isRead === false;
//               return (
//                 <div
//                   key={email._id}
//                   onClick={() => setSelectedEmail(email)}
//                   className={`cursor-pointer px-6 py-4 border-b hover:bg-gray-50 ${
//                     isUnread ? "bg-indigo-50" : ""
//                   }`}
//                 >
//                   <div className="flex justify-between gap-4">
//                     <div className="flex gap-4 min-w-0">
//                       {isUnread ? (
//                         <Mail className="text-indigo-600" />
//                       ) : (
//                         <MailOpen className="text-gray-400" />
//                       )}
//                       <div className="min-w-0">
//                         <p className="font-semibold truncate">
//                           {email.subject}
//                         </p>
//                         <p className="text-sm text-gray-600 truncate">
//                           {email.meta?.customerName} •{" "}
//                           {email.meta?.confirmationNumber}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-xs text-gray-500 whitespace-nowrap">
//                       {formatDate(email.createdAt)}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ================= MODAL ================= */}
//         {selectedEmail && (
//           <div
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={(e) =>
//               e.target === e.currentTarget && setSelectedEmail(null)
//             }
//           >
//             <div className="w-full max-w-6xl h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//               {/* Header */}
//               <div className="flex justify-between items-center px-6 py-4 border-b bg-indigo-50">
//                 <div>
//                   <h2 className="text-xl font-bold">
//                     {selectedEmail.subject}
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     {formatDate(selectedEmail.createdAt)}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="p-2 rounded-full hover:bg-gray-200"
//                 >
//                   <X />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="flex flex-1 overflow-hidden">
//                 {/* Email Body */}
//                 <div className="flex-1 overflow-y-auto border-r">
//                   <div
//                     className="prose max-w-none p-6 break-words"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         selectedEmail.html ||
//                         "<p>No email content available</p>",
//                     }}
//                   />
//                 </div>

//                 {/* Sidebar */}
//                 <div className="w-96 bg-gray-50 border-l overflow-y-auto p-6">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Eye className="text-indigo-600" size={18} />
//                     <h3 className="font-semibold">Booking Details</h3>
//                   </div>

//                   <div className="space-y-4 text-sm">
//                     <DetailItem label="Customer" value={selectedEmail.meta?.customerName} />
//                     <DetailItem label="Phone" value={selectedEmail.meta?.customerPhone} />
//                     <DetailItem label="Billing Email" value={selectedEmail.meta?.billingEmail} />
//                     <DetailItem label="Confirmation No" value={selectedEmail.meta?.confirmationNumber} />
//                     <DetailItem label="Airline" value={selectedEmail.meta?.airline} />
//                     <DetailItem label="Old Travel Date" value={selectedEmail.meta?.oldTravelDate} />
//                     <DetailItem label="New Travel Date" value={selectedEmail.meta?.newTravelDate} />
//                     <DetailItem label="Change Fee" value={`₹${selectedEmail.meta?.changeFee || "0"}`} />
//                     <DetailItem label="Fare Difference" value={`₹${selectedEmail.meta?.fareDifference || "0"}`} />
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="border-t px-6 py-4 flex justify-end bg-gray-50">
//                 <button
//                   onClick={() => setSelectedEmail(null)}
//                   className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function DetailItem({ label, value }) {
//   return (
//     <div className="break-words">
//       <p className="text-gray-500">{label}</p>
//       <p className="font-medium text-gray-900">
//         {value || "—"}
//       </p>
//     </div>
//   );
// }

//============================correct======================================

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import {
//   Mail,
//   MailOpen,
//   User,
//   Phone,
//   Ticket,
//   Plane,
//   X,
//   Eye,
// } from "lucide-react";

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/email").then((res) => {
//       const sorted = [...res.data].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setEmails(sorted);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Booking Inbox</h1>
//           <p className="text-gray-500 mt-1">
//             {emails.length} conversations
//           </p>
//         </div>

//         {/* List */}
//         <div className="rounded-2xl bg-white shadow-sm border overflow-hidden">
//           {loading ? (
//             <div className="p-12 text-center text-gray-500">Loading...</div>
//           ) : (
//             emails.map((email) => {
//               const unread = email.isRead === false;

//               return (
//                 <div
//                   key={email._id}
//                   onClick={() => setSelectedEmail(email)}
//                   className={`relative cursor-pointer border-b px-6 py-5 hover:bg-gray-50 transition ${
//                     unread ? "bg-white" : "bg-gray-50/30"
//                   }`}
//                 >
//                   {/* Left green bar */}
//                   <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />

//                   <div className="flex items-start justify-between gap-6">
//                     {/* Left content */}
//                     <div className="flex gap-4 min-w-0">
//                       <div className="mt-1">
//                         {unread ? (
//                           <Mail className="text-indigo-600" />
//                         ) : (
//                           <MailOpen className="text-gray-400" />
//                         )}
//                       </div>

//                       <div className="min-w-0">
//                         {/* From */}
//                         <p className="font-semibold text-gray-900 truncate">
//                           {email.from || "customer@email.com"}
//                         </p>

//                         {/* Subject */}
//                         <p className="text-lg font-medium text-gray-800 mt-1">
//                           {email.subject}
//                         </p>

//                         {/* Meta row */}
//                         <div className="mt-2 flex flex-wrap gap-6 text-sm text-gray-600">
//                           {email.meta?.customerName && (
//                             <span className="flex items-center gap-1">
//                               <User size={14} />
//                               {email.meta.customerName}
//                             </span>
//                           )}

//                           {email.meta?.customerPhone && (
//                             <span className="flex items-center gap-1">
//                               <Phone size={14} />
//                               {email.meta.customerPhone}
//                             </span>
//                           )}

//                           {email.meta?.confirmationNumber && (
//                             <span className="flex items-center gap-1">
//                               <Ticket size={14} />
//                               PNR: {email.meta.confirmationNumber}
//                             </span>
//                           )}

//                           {email.meta?.airline && (
//                             <span className="flex items-center gap-1">
//                               <Plane size={14} />
//                               {email.meta.airline}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right */}
//                     <div className="flex flex-col items-end gap-2">
//                       <span className="text-sm text-gray-500 whitespace-nowrap">
//                         {formatDate(email.createdAt)}
//                       </span>

//                       {unread && (
//                         <span className="h-3 w-3 rounded-full bg-indigo-600" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* ================= MODAL (UNCHANGED – WORKING) ================= */}
//       {selectedEmail && (
//         <div
//           className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={(e) =>
//             e.target === e.currentTarget && setSelectedEmail(null)
//           }
//         >
//           <div className="w-full max-w-6xl h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//             {/* Header */}
//             <div className="flex justify-between items-center px-6 py-4 border-b bg-indigo-50">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {selectedEmail.subject}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {formatDate(selectedEmail.createdAt)}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedEmail(null)}
//                 className="p-2 rounded-full hover:bg-gray-200 cursor-pointer "
//               >
//                 <X />
//               </button>
//             </div>

//             <div className="flex flex-1 overflow-hidden">
//               {/* Email Body */}
//               <div className="flex-1 overflow-y-auto border-r">
//                 <div
//                   className="prose max-w-none p-6 break-words"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       selectedEmail.html ||
//                       "<p>No email content available</p>",
//                   }}
//                 />
//               </div>

//               {/* Sidebar */}
//               <div className="w-96 bg-gray-50 border-l overflow-y-auto p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Eye size={18} className="text-indigo-600" />
//                   <h3 className="font-semibold">Booking Details</h3>
//                 </div>

//                 <Detail label="Customer" value={selectedEmail.meta?.customerName} />
//                 <Detail label="Phone" value={selectedEmail.meta?.customerPhone} />
//                 <Detail label="Email" value={selectedEmail.meta?.billingEmail} />
//                 <Detail label="PNR" value={selectedEmail.meta?.confirmationNumber} />
//                 <Detail label="Airline" value={selectedEmail.meta?.airline} />
//                 <Detail label="Old Travel Date" value={selectedEmail.meta?.oldTravelDate} />
//                 <Detail label="New Travel Date" value={selectedEmail.meta?.newTravelDate} />
//                 <Detail label="Change Fee" value={`₹${selectedEmail.meta?.changeFee || 0}`} />
//                 <Detail label="Fare Difference" value={`₹${selectedEmail.meta?.fareDifference || 0}`} />
//               </div>
//             </div>

//             <div className="border-t px-6 py-4 flex justify-end bg-gray-50">
//               <button
//                 onClick={() => setSelectedEmail(null)}
//                 className="cursor-pointer px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div className="mb-4">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="font-medium text-gray-900 break-words">
//         {value || "—"}
//       </p>
//     </div>
//   );
// }

//=======================CORRECT============

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import {
//   Mail,
//   MailOpen,
//   User,
//   Phone,
//   Ticket,
//   Plane,
//   X,
//   Eye,
// } from "lucide-react";

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch only RECEIVED emails
//   useEffect(() => {
//     api
//       .get("/email?type=received")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//       })
//       .catch(() => alert("Failed to load inbox"))
//       .finally(() => setLoading(false));
//   }, []);

//   // 🔹 Open email + mark as read
//   const openEmail = async (email) => {
//     setSelectedEmail(email);

//     if (!email.isRead) {
//       try {
//         await api.put(`/email/${email._id}/read`);
//         setEmails((prev) =>
//           prev.map((e) =>
//             e._id === email._id ? { ...e, isRead: true } : e
//           )
//         );
//       } catch (err) {
//         console.error("Failed to mark email as read");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Booking Inbox</h1>
//           <p className="text-gray-500 mt-1">
//             {emails.length} conversations
//           </p>
//         </div>

//         {/* Inbox List */}
//         <div className="rounded-2xl bg-white shadow-sm border overflow-hidden">
//           {loading ? (
//             <div className="p-12 text-center text-gray-500">Loading...</div>
//           ) : emails.length === 0 ? (
//             <div className="p-12 text-center text-gray-500">
//               No emails found
//             </div>
//           ) : (
//             emails.map((email) => {
//               const unread = email.isRead === false;

//               return (
//                 <div
//                   key={email._id}
//                   onClick={() => openEmail(email)}
//                   className={`relative cursor-pointer border-b px-6 py-5 hover:bg-gray-50 transition ${
//                     unread ? "bg-white" : "bg-gray-50/40"
//                   }`}
//                 >
//                   {/* Left indicator */}
//                   {unread && (
//                     <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />
//                   )}

//                   <div className="flex items-start justify-between gap-6">
//                     {/* Left */}
//                     <div className="flex gap-4 min-w-0">
//                       <div className="mt-1">
//                         {unread ? (
//                           <Mail className="text-indigo-600" />
//                         ) : (
//                           <MailOpen className="text-gray-400" />
//                         )}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="font-semibold text-gray-900 truncate">
//                           {email.from || "customer@email.com"}
//                         </p>

//                         <p className="text-lg font-medium text-gray-800 mt-1 truncate">
//                           {email.subject || "No subject"}
//                         </p>

//                         <div className="mt-2 flex flex-wrap gap-6 text-sm text-gray-600">
//                           {email.meta?.customerName && (
//                             <span className="flex items-center gap-1">
//                               <User size={14} />
//                               {email.meta.customerName}
//                             </span>
//                           )}

//                           {email.meta?.customerPhone && (
//                             <span className="flex items-center gap-1">
//                               <Phone size={14} />
//                               {email.meta.customerPhone}
//                             </span>
//                           )}

//                           {email.meta?.confirmationNumber && (
//                             <span className="flex items-center gap-1">
//                               <Ticket size={14} />
//                               PNR: {email.meta.confirmationNumber}
//                             </span>
//                           )}

//                           {email.meta?.airline && (
//                             <span className="flex items-center gap-1">
//                               <Plane size={14} />
//                               {email.meta.airline}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right */}
//                     <div className="flex flex-col items-end gap-2">
//                       <span className="text-sm text-gray-500 whitespace-nowrap">
//                         {formatDate(email.createdAt)}
//                       </span>

//                       {unread && (
//                         <span className="h-3 w-3 rounded-full bg-indigo-600" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {selectedEmail && (
//         <div
//           className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={(e) =>
//             e.target === e.currentTarget && setSelectedEmail(null)
//           }
//         >
//           <div className="w-full max-w-6xl h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//             {/* Header */}
//             <div className="flex justify-between items-center px-6 py-4 border-b bg-indigo-50">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {selectedEmail.subject}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {formatDate(selectedEmail.createdAt)}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedEmail(null)}
//                 className="p-2 rounded-full hover:bg-gray-200"
//               >
//                 <X />
//               </button>
//             </div>

//             <div className="flex flex-1 overflow-hidden">
//               {/* Email body */}
//               <div className="flex-1 overflow-y-auto border-r">
//                 <div
//                   className="prose max-w-none p-6 break-words"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       selectedEmail.html ||
//                       `<pre>${selectedEmail.text || "No content"}</pre>`,
//                   }}
//                 />
//               </div>

//               {/* Sidebar */}
//               <div className="w-96 bg-gray-50 border-l overflow-y-auto p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Eye size={18} className="text-indigo-600" />
//                   <h3 className="font-semibold">Booking Details</h3>
//                 </div>

//                 <Detail label="Customer" value={selectedEmail.meta?.customerName} />
//                 <Detail label="Phone" value={selectedEmail.meta?.customerPhone} />
//                 <Detail label="Email" value={selectedEmail.meta?.billingEmail} />
//                 <Detail label="PNR" value={selectedEmail.meta?.confirmationNumber} />
//                 <Detail label="Airline" value={selectedEmail.meta?.airline} />
//                 <Detail label="Old Travel Date" value={selectedEmail.meta?.oldTravelDate} />
//                 <Detail label="New Travel Date" value={selectedEmail.meta?.newTravelDate} />
//                 <Detail label="Change Fee" value={`₹${selectedEmail.meta?.changeFee || 0}`} />
//                 <Detail label="Fare Difference" value={`₹${selectedEmail.meta?.fareDifference || 0}`} />
//               </div>
//             </div>

//             <div className="border-t px-6 py-4 flex justify-end bg-gray-50">
//               <button
//                 onClick={() => setSelectedEmail(null)}
//                 className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div className="mb-4">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="font-medium text-gray-900 break-words">
//         {value || "—"}
//       </p>
//     </div>
//   );
// }

//=================with pagination==============


// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import {
//   Mail,
//   MailOpen,
//   User,
//   Phone,
//   Ticket,
//   Plane,
//   X,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   // Calculate pagination values
//   const indexOfLastEmail = currentPage * itemsPerPage;
//   const indexOfFirstEmail = indexOfLastEmail - itemsPerPage;
//   const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

//   // 🔹 Fetch only RECEIVED emails
//   useEffect(() => {
//     api
//       .get("/email?type=received")
//       .then((res) => {
//         const sorted = [...res.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setEmails(sorted);
//         setTotalPages(Math.ceil(sorted.length / itemsPerPage));
//       })
//       .catch(() => alert("Failed to load inbox"))
//       .finally(() => setLoading(false));
//   }, []);

//   // Update total pages when emails change
//   useEffect(() => {
//     setTotalPages(Math.ceil(emails.length / itemsPerPage));
//     // Reset to first page if current page is invalid
//     if (currentPage > Math.ceil(emails.length / itemsPerPage) && emails.length > 0) {
//       setCurrentPage(1);
//     }
//   }, [emails]);

//   // 🔹 Open email + mark as read
//   const openEmail = async (email) => {
//     setSelectedEmail(email);

//     if (!email.isRead) {
//       try {
//         await api.put(`/email/${email._id}/read`);
//         setEmails((prev) =>
//           prev.map((e) =>
//             e._id === email._id ? { ...e, isRead: true } : e
//           )
//         );
//       } catch (err) {
//         console.error("Failed to mark email as read");
//       }
//     }
//   };

//   // Pagination handlers
//   const goToPage = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const renderPagination = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       // Show all pages
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Show limited pages with ellipsis
//       if (currentPage <= 3) {
//         pageNumbers.push(1, 2, 3, 4, "...", totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pageNumbers.push(
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages
//         );
//       }
//     }

//     return (
//       <div className="flex items-center justify-between px-4 py-3 bg-white border-t sm:px-6">
//         <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
//           {/* Items count */}
//           <div className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">
//               {emails.length > 0 ? indexOfFirstEmail + 1 : 0}
//             </span>{" "}
//             to{" "}
//             <span className="font-medium">
//               {Math.min(indexOfLastEmail, emails.length)}
//             </span>{" "}
//             of <span className="font-medium">{emails.length}</span> results
//           </div>

//           {/* Pagination controls */}
//           <div className="flex items-center gap-2">
//             {/* First page */}
//             <button
//               onClick={() => goToPage(1)}
//               disabled={currentPage === 1}
//               className={`p-2 rounded-lg ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <ChevronsLeft size={20} />
//             </button>

//             {/* Previous page */}
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`p-2 rounded-lg ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed  cursor-pointer"
//                   : "text-gray-700 hover:bg-gray-100 cursor-pointer"
//               }`}
//             >
//               <ChevronLeft size={20} />
//             </button>

//             {/* Page numbers */}
//             <div className="flex items-center gap-1">
//               {pageNumbers.map((page, index) =>
//                 page === "..." ? (
//                   <span key={`ellipsis-${index}`} className="px-2 text-gray-500 ">
//                     ...
//                   </span>
//                 ) : (
//                   <button
//                     key={page}
//                     onClick={() => goToPage(page)}
//                     className={`px-3 py-1 rounded-lg text-sm font-medium ${
//                       currentPage === page
//                         ? "bg-indigo-600 text-white  cursor-pointer"
//                         : "text-gray-700 hover:bg-gray-100  cursor-pointer"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 )
//               )}
//             </div>

//             {/* Next page */}
//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded-lg ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed  cursor-pointer"
//                   : "text-gray-700 hover:bg-gray-100  cursor-pointer"
//               }`}
//             >
//               <ChevronRight size={20} />
//             </button>

//             {/* Last page */}
//             <button
//               onClick={() => goToPage(totalPages)}
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded-lg ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed  cursor-pointer"
//                   : "text-gray-700 hover:bg-gray-100  cursor-pointer"
//               }`}
//             >
//               <ChevronsRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Booking Inbox</h1>
//           <p className="text-gray-500 mt-1">
//             {emails.length} conversations • Page {currentPage} of {totalPages}
//           </p>
//         </div>

//         {/* Inbox List */}
//         <div className="rounded-2xl bg-white shadow-sm border overflow-hidden">
//           {loading ? (
//             <div className="p-12 text-center text-gray-500">Loading...</div>
//           ) : emails.length === 0 ? (
//             <div className="p-12 text-center text-gray-500">
//               No emails found
//             </div>
//           ) : (
//             <>
//               {currentEmails.map((email) => {
//                 const unread = email.isRead === false;

//                 return (
//                   <div
//                     key={email._id}
//                     onClick={() => openEmail(email)}
//                     className={`relative cursor-pointer border-b px-4 md:px-6 py-4 md:py-5 hover:bg-gray-50 transition ${
//                       unread ? "bg-white" : "bg-gray-50/40"
//                     }`}
//                   >
//                     {/* Left indicator */}
//                     {unread && (
//                       <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />
//                     )}

//                     <div className="flex items-start justify-between gap-4 md:gap-6">
//                       {/* Left */}
//                       <div className="flex gap-3 md:gap-4 min-w-0 flex-1">
//                         <div className="mt-1 flex-shrink-0">
//                           {unread ? (
//                             <Mail className="text-indigo-600" size={20} />
//                           ) : (
//                             <MailOpen className="text-gray-400" size={20} />
//                           )}
//                         </div>

//                         <div className="min-w-0 flex-1">
//                           <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
//                             <p className="font-semibold text-gray-900 truncate text-sm md:text-base">
//                               {email.from || "customer@email.com"}
//                             </p>
//                             <span className="hidden md:inline text-gray-400">•</span>
//                             <p className="text-sm md:text-base font-medium text-gray-800 truncate">
//                               {email.subject || "No subject"}
//                             </p>
//                           </div>

//                           <div className="mt-2 flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm text-gray-600">
//                             {email.meta?.customerName && (
//                               <span className="flex items-center gap-1">
//                                 <User size={12} />
//                                 {email.meta.customerName}
//                               </span>
//                             )}

//                             {email.meta?.customerPhone && (
//                               <span className="flex items-center gap-1">
//                                 <Phone size={12} />
//                                 {email.meta.customerPhone}
//                               </span>
//                             )}

//                             {email.meta?.confirmationNumber && (
//                               <span className="flex items-center gap-1">
//                                 <Ticket size={12} />
//                                 PNR: {email.meta.confirmationNumber}
//                               </span>
//                             )}

//                             {email.meta?.airline && (
//                               <span className="flex items-center gap-1">
//                                 <Plane size={12} />
//                                 {email.meta.airline}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right */}
//                       <div className="flex flex-col items-end gap-1 md:gap-2 flex-shrink-0">
//                         <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
//                           {formatDate(email.createdAt)}
//                         </span>

//                         {unread && (
//                           <span className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-indigo-600" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
              
//               {/* Pagination */}
//               {totalPages > 1 && renderPagination()}
//             </>
//           )}
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {selectedEmail && (
//         <div
//           className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
//           onClick={(e) =>
//             e.target === e.currentTarget && setSelectedEmail(null)
//           }
//         >
//           <div className="w-full max-w-6xl h-[90vh] md:h-[92vh] bg-white rounded-xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//             {/* Header */}
//             <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b bg-indigo-50">
//               <div className="max-w-[80%]">
//                 <h2 className="text-lg md:text-xl font-bold truncate">
//                   {selectedEmail.subject}
//                 </h2>
//                 <p className="text-xs md:text-sm text-gray-600">
//                   {formatDate(selectedEmail.createdAt)}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedEmail(null)}
//                 className="cursor-pointer p-1 md:p-2 rounded-full hover:bg-gray-200 flex-shrink-0"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
//               {/* Email body */}
//               <div className="flex-1 overflow-y-auto border-b md:border-r">
//                 <div
//                   className="prose max-w-none p-4 md:p-6 break-words text-sm md:text-base"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       selectedEmail.html ||
//                       `<pre>${selectedEmail.text || "No content"}</pre>`,
//                   }}
//                 />
//               </div>

//               {/* Sidebar */}
//               <div className="w-full md:w-96 bg-gray-50 border-l overflow-y-auto p-4 md:p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Eye size={18} className="text-indigo-600" />
//                   <h3 className="font-semibold">Booking Details</h3>
//                 </div>

//                 <Detail label="Customer" value={selectedEmail.meta?.customerName} />
//                 <Detail label="Phone" value={selectedEmail.meta?.customerPhone} />
//                 <Detail label="Email" value={selectedEmail.meta?.billingEmail} />
//                 <Detail label="PNR" value={selectedEmail.meta?.confirmationNumber} />
//                 <Detail label="Airline" value={selectedEmail.meta?.airline} />
//                 <Detail label="Old Travel Date" value={selectedEmail.meta?.oldTravelDate} />
//                 <Detail label="New Travel Date" value={selectedEmail.meta?.newTravelDate} />
//                 <Detail label="Change Fee" value={`₹${selectedEmail.meta?.changeFee || 0}`} />
//                 <Detail label="Fare Difference" value={`₹${selectedEmail.meta?.fareDifference || 0}`} />
//               </div>
//             </div>

//             <div className="border-t px-4 md:px-6 py-3 md:py-4 flex justify-end bg-gray-50">
//               <button
//                 onClick={() => setSelectedEmail(null)}
//                 className="cursor-pointer px-4 md:px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm md:text-base"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div className="mb-3 md:mb-4">
//       <p className="text-gray-500 text-xs md:text-sm">{label}</p>
//       <p className="font-medium text-gray-900 break-words text-sm md:text-base">
//         {value || "—"}
//       </p>
//     </div>
//   );
// }


//=============21 jan====

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Mail, MailOpen, User, Phone, Ticket, Plane, X } from "lucide-react";

// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default function Inbox() {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const res = await api.get("/email/inbox/live");
//         setEmails(res.data.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
//       } catch (err) {
//         alert("Failed to load inbox");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInbox();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <h1 className="text-2xl font-bold mb-4">Booking Inbox</h1>

//       {loading ? (
//         <div className="p-12 text-center text-gray-500">Loading...</div>
//       ) : emails.length === 0 ? (
//         <div className="p-12 text-center text-gray-500">No emails found</div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow overflow-hidden">
//           {emails.map((email) => (
//             <div
//               key={email.id}
//               onClick={() => setSelectedEmail(email)}
//               className="cursor-pointer border-b px-4 py-3 hover:bg-gray-50 flex justify-between"
//             >
//               <div className="flex gap-3 items-center min-w-0 flex-1">
//                 {email.isRead ? (
//                   <MailOpen size={20} className="text-gray-400" />
//                 ) : (
//                   <Mail size={20} className="text-indigo-600" />
//                 )}
//                 <div className="truncate">
//                   <p className="font-semibold text-gray-900 truncate">{email.from}</p>
//                   <p className="text-gray-800 truncate">{email.subject}</p>
//                 </div>
//               </div>
//               <span className="text-gray-500 text-sm">{formatDate(email.date)}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {selectedEmail && (
//         <div
//           className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
//           onClick={(e) => e.target === e.currentTarget && setSelectedEmail(null)}
//         >
//           <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="flex justify-between items-center px-4 py-3 border-b bg-indigo-50">
//               <h2 className="font-bold truncate">{selectedEmail.subject}</h2>
//               <button onClick={() => setSelectedEmail(null)}>
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-4 prose max-w-none break-words">
//               <div dangerouslySetInnerHTML={{ __html: selectedEmail.html || `<pre>${selectedEmail.text}</pre>` }} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


//============
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Mail, MailOpen, X } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function InboxEmail() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllEmails = async () => {
    try {
      const inboxRes = await api.get("/email/inbox/live"); // Gmail
      const sentRes = await api.get("/email/inbox/sent");   // CRM sent

      const combined = [
        ...inboxRes.data.data,
        ...sentRes.data.data,
      ];

      combined.sort(
        (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      );

      setEmails(combined);
    } catch (err) {
      console.error(err);
      alert("Failed to load emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Booking Inbox</h1>

      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading...</div>
      ) : emails.length === 0 ? (
        <div className="p-12 text-center text-gray-500">No emails found</div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {emails.map((email) => (
            <div
              key={email.id || email._id}
              onClick={() => setSelectedEmail(email)}
              className="cursor-pointer border-b px-4 py-3 hover:bg-gray-50 flex justify-between"
            >
              <div className="flex gap-3 items-center min-w-0 flex-1">
                {email.isRead ? (
                  <MailOpen size={20} className="text-gray-400" />
                ) : (
                  <Mail size={20} className="text-indigo-600" />
                )}
                <div className="truncate">
                  <p className="font-semibold text-gray-900 truncate">{email.from}</p>
                  <p className="text-gray-800 truncate">{email.subject}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">
                {formatDate(email.date || email.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setSelectedEmail(null)}
        >
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b bg-indigo-50">
              <h2 className="font-bold truncate">{selectedEmail.subject}</h2>
              <button onClick={() => setSelectedEmail(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4 prose max-w-none break-words">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedEmail.html || `<pre>${selectedEmail.text}</pre>`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

