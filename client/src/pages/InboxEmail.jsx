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
//===============

import { useEffect, useState } from "react";
import api from "../api/axios";
import { Mail, MailOpen, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // Output example: 27/12/2025 03:45 PM
};

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/email")
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEmails(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleEmails = emails.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Booking Inbox
            </h1>
            <p className="text-gray-500 mt-1">
              {emails.length} {emails.length === 1 ? "conversation" : "conversations"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : emails.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your inbox is empty
            </h3>
            <p className="text-gray-500">New booking emails will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {visibleEmails.map((email) => {
                const isOpen = openId === email._id;
                const isUnread = email.isRead === false;

                const statusColor =
                  email.meta?.status === "refund"
                    ? "from-red-500 to-rose-600"
                    : email.meta?.status === "cancellation"
                    ? "from-amber-500 to-yellow-600"
                    : "from-emerald-500 to-teal-600";

                return (
                  <div
                    key={email._id}
                    className={`group relative transition-all duration-200 hover:shadow-md ${
                      isOpen ? "bg-indigo-50/40" : "hover:bg-gray-50/80"
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${statusColor} opacity-90`} />

                    <div
                      className="p-5 pl-8 cursor-pointer"
                      onClick={() => setOpenId(isOpen ? null : email._id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1 min-w-0">
                          <div className="mt-1.5">
                            {isUnread ? (
                              <Mail className="text-indigo-600" size={20} strokeWidth={2.2} />
                            ) : (
                              <MailOpen className="text-gray-400" size={20} />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <span className="font-semibold text-gray-900 truncate text-base">
                                {email.from || "Customer"}
                              </span>

                              {email.meta?.bookingType && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100/80 text-indigo-700 border border-indigo-200/70">
                                  {email.meta.bookingType.replace("_", " ").toUpperCase()}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-800 font-medium line-clamp-1 mb-2.5">
                              {email.subject}
                            </p>

                            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
                              {email.meta?.customerName && (
                                <span>👤 {email.meta.customerName}</span>
                              )}
                              {email.meta?.confirmationNumber && (
                                <span>🎫 PNR: {email.meta.confirmationNumber}</span>
                              )}
                              {email.meta?.airline && (
                                <span>✈ {email.meta.airline}</span>
                              )}
                              {email.meta?.departure && email.meta?.arrival && (
                                <span>🛫 {email.meta.departure} → {email.meta.arrival}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 whitespace-nowrap">
                          <span className="text-xs font-medium text-gray-700">
                            {formatDate(email.createdAt)}
                          </span>
                          {isUnread && (
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modern Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t bg-gray-50/50 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <div className="text-sm font-medium text-gray-700">
                  Page <span className="text-indigo-700 font-semibold">{currentPage}</span>
                  <span className="text-gray-400 mx-1.5">/</span>
                  {totalPages}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

