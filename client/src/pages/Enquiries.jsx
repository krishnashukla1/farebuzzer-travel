// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { MessageSquare, Phone, Mail, User, Calendar, Trash2, Loader2 } from "lucide-react";

// const statusConfig = {
//   NEW: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "New" },
//   CONTACTED: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Contacted" },
//   CLOSED: { color: "bg-green-100 text-green-700 border-green-200", label: "Closed" },
// };

// const Enquiries = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchEnquiries = async () => {
//     try {
//       const res = await API.get("/enquiries");
//       setEnquiries(res.data);
//     } catch (err) {
//       console.error("Failed to fetch enquiries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/enquiries/${id}/status`, { status });
//       fetchEnquiries();
//     } catch (err) {
//       alert("Failed to update status");
//     }
//   };

//   const deleteEnquiry = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
//     try {
//       await API.delete(`/enquiries/${id}`);
//       fetchEnquiries();
//     } catch (err) {
//       alert("Failed to delete enquiry");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Page Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-3">
//             <div className="p-3 bg-teal-600 rounded-xl shadow-lg">
//               <MessageSquare size={32} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">Customer Enquiries</h1>
//               <p className="text-gray-600 mt-1">Manage and respond to travel inquiries efficiently</p>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="grid gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-20 bg-white rounded-xl shadow animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Enquiries Table */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold">Received</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {enquiries.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="py-16 text-center">
//                           <div className="text-gray-400">
//                             <MessageSquare size={64} className="mx-auto mb-4 opacity-50" />
//                             <p className="text-lg font-medium">No enquiries yet</p>
//                             <p className="text-sm mt-2">New travel inquiries will appear here</p>
//                           </div>
//                         </td>
//                       </tr>
//                     ) : (
//                       enquiries.map((e) => (
//                         <tr
//                           key={e._id}
//                           className="hover:bg-gray-50 transition-colors duration-200"
//                         >
//                           {/* Name */}
//                           <td className="px-6 py-5">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
//                                 <User size={20} className="text-teal-600" />
//                               </div>
//                               <span className="font-medium text-gray-900">{e.name}</span>
//                             </div>
//                           </td>

//                           {/* Contact */}
//                           <td className="px-6 py-5 text-gray-700">
//                             <div className="space-y-1 text-sm">
//                               <div className="flex items-center gap-2">
//                                 <Mail size={14} />
//                                 {e.email}
//                               </div>
//                               {e.phone && (
//                                 <div className="flex items-center gap-2">
//                                   <Phone size={14} />
//                                   {e.phone}
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* Message */}
//                           <td className="px-6 py-5 text-gray-600 max-w-md">
//                             <p className="line-clamp-2">{e.message}</p>
//                           </td>

//                           {/* Date */}
//                           <td className="px-6 py-5 text-gray-500 text-sm">
//                             <div className="flex items-center gap-2">
//                               <Calendar size={14} />
//                               {new Date(e.createdAt).toLocaleDateString()}
//                             </div>
//                           </td>

//                           {/* Status */}
//                           <td className="px-6 py-5 text-center">
//                             <span
//                               className={`inline-flex px-4 py-2 rounded-full text-xs font-bold border ${statusConfig[e.status]?.color}`}
//                             >
//                               {statusConfig[e.status]?.label || e.status}
//                             </span>
//                           </td>

//                           {/* Actions */}
//                           <td className="px-6 py-5 text-center">
//                             <div className="flex items-center justify-center gap-3">
//                               <select
//                                 value={e.status}
//                                 onChange={(ev) => updateStatus(e._id, ev.target.value)}
//                                 className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
//                               >
//                                 <option value="NEW">New</option>
//                                 <option value="CONTACTED">Contacted</option>
//                                 <option value="CLOSED">Closed</option>
//                               </select>

//                               <button
//                                 onClick={() => deleteEnquiry(e._id)}
//                                 className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
//                                 title="Delete enquiry"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Summary Footer */}
//             {enquiries.length > 0 && (
//               <div className="mt-8 text-center text-sm text-gray-600">
//                 <p>
//                   Showing <span className="font-semibold">{enquiries.length}</span> enquiries
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Enquiries;

//==========stylish============


// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import {
//   MessageSquare,
//   Phone,
//   Mail,
//   User,
//   Calendar,
//   Trash2,
//   ChevronLeft,
//   ChevronRight
// } from "lucide-react";

// const statusConfig = {
//   NEW: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "New" },
//   CONTACTED: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Contacted" },
//   FOLLOW_UP: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Follow_Up" },
//   CLOSED: { color: "bg-green-100 text-green-700 border-green-200", label: "Closed" },
// };

// const ITEMS_PER_PAGE = 10;

// const Enquiries = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ================= FETCH ================= */
//   const fetchEnquiries = async () => {
//     try {
//       const res = await API.get("/enquiries");
//       setEnquiries(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch enquiries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   /* ================= ACTIONS ================= */
//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/enquiries/${id}/status`, { status });
//       fetchEnquiries();
//     } catch {
//       alert("Failed to update status ,you are not allowed");
//     }
//   };

//   const deleteEnquiry = async (id) => {
//     if (!window.confirm("Delete this enquiry?")) return;
//     try {
//       await API.delete(`/enquiries/${id}`);
//       fetchEnquiries();
//     } catch {
//       alert("Failed to delete enquiry ,you are not allowed");
//     }
//   };

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(enquiries.length / ITEMS_PER_PAGE);

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedEnquiries = enquiries.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((p) => p - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((p) => p + 1);
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-full mx-auto px-6">

//         {/* HEADER */}
//         <div className="mb-8 flex items-center gap-4">
//           <div className="p-3 bg-teal-600 rounded-xl shadow">
//             <MessageSquare size={28} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Customer Enquiries</h1>
//             <p className="text-gray-600">Manage travel enquiries efficiently</p>
//           </div>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="h-40 bg-white rounded-xl shadow animate-pulse" />
//         ) : (
//           <>
//             {/* TABLE */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-teal-600 text-white">
//                     <tr>
//                       <th className="px-6 py-4 text-left">Customer</th>
//                       <th className="px-6 py-4 text-left">Contact</th>
//                       <th className="px-6 py-4 text-left">Message</th>
//                       <th className="px-6 py-4 text-left">Date</th>
//                       <th className="px-6 py-4 text-center">Status</th>
//                       <th className="px-6 py-4 text-center">Action</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y">
//                     {paginatedEnquiries.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="py-16 text-center text-gray-400">
//                           <MessageSquare size={64} className="mx-auto mb-4 opacity-40" />
//                           No enquiries found
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedEnquiries.map((e) => (
//                         <tr key={e._id} className="hover:bg-gray-50">
//                           {/* CUSTOMER */}
//                           <td className="px-6 py-5">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
//                                 <User size={18} className="text-teal-600" />
//                               </div>
//                               <span className="font-medium">{e.name}</span>
//                             </div>
//                           </td>

//                           {/* CONTACT */}
//                           <td className="px-6 py-5 text-sm text-gray-700">
//                             <div className="space-y-1">
//                               <div className="flex items-center gap-2">
//                                 <Mail size={14} /> {e.email}
//                               </div>
//                               {e.phone && (
//                                 <div className="flex items-center gap-2">
//                                   <Phone size={14} /> {e.phone}
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* MESSAGE */}
//                           <td className="px-6 py-5 max-w-md text-gray-600">
//                             <p className="line-clamp-2">{e.message}</p>
//                           </td>

//                           {/* DATE */}
//                           <td className="px-6 py-5 text-sm text-gray-500">
//                             <div className="flex items-center gap-2">
//                               <Calendar size={14} />
//                               {new Date(e.createdAt).toLocaleDateString("en-IN")}
//                             </div>
//                           </td>

//                           {/* STATUS */}
//                           <td className="px-6 py-5 text-center">
//                             <select
//                               value={e.status}
//                               onChange={(ev) => updateStatus(e._id, ev.target.value)}
//                               className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[e.status]?.color}`}
//                             >
//                               <option value="NEW">New</option>
//                               <option value="CONTACTED">Contacted</option>
//                               <option value="FOLLOW_UP">Follow Up</option>
//                               <option value="CLOSED">Closed</option>
//                             </select>
//                           </td>

//                           {/* ACTION */}
//                           <td className="px-6 py-5 text-center">
//                             <button
//                               onClick={() => deleteEnquiry(e._id)}
//                               className="cursor-pointer p-2 rounded-lg hover:bg-red-100"
//                             >
//                               <Trash2 size={18} className="text-red-600" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* PAGINATION */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-between mt-6">
//                 <p className="text-sm text-gray-600">
//                   Showing{" "}
//                   <b>{startIndex + 1}</b> –{" "}
//                   <b>{Math.min(startIndex + ITEMS_PER_PAGE, enquiries.length)}</b>{" "}
//                   of <b>{enquiries.length}</b>
//                 </p>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={handlePrev}
//                     disabled={currentPage === 1}
//                     className="flex items-center gap-1 px-3 py-2 border rounded-lg disabled:opacity-40"
//                   >
//                     <ChevronLeft size={16} /> Prev
//                   </button>

//                   <span className="text-sm font-semibold">
//                     Page {currentPage} / {totalPages}
//                   </span>

//                   <button
//                     onClick={handleNext}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center gap-1 px-3 py-2 border rounded-lg disabled:opacity-40"
//                   >
//                     Next <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Enquiries;



//=========20 jan==========

// import { useEffect, useState, useMemo } from "react";
// import API from "../api/axios";
// import {
//   MessageSquare,
//   Phone,
//   Mail,
//   User,
//   Calendar,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   AlertCircle,
//   DollarSign,
//   TrendingUp,
//   Package
// } from "lucide-react";

// const STATUS_CONFIG = {
//   NEW: { 
//     color: "bg-blue-50 text-blue-700 border-blue-200", 
//     label: "New",
//     icon: "🆕"
//   },
//   CONTACTED: { 
//     color: "bg-amber-50 text-amber-700 border-amber-200", 
//     label: "Contacted",
//     icon: "📞"
//   },
//   FOLLOW_UP: { 
//     color: "bg-orange-50 text-orange-700 border-orange-200", 
//     label: "Follow Up",
//     icon: "🔄"
//   },
//   CLOSED: { 
//     color: "bg-emerald-50 text-emerald-700 border-emerald-200", 
//     label: "Closed",
//     icon: "✅"
//   }
// };

// const ITEMS_PER_PAGE = 10;

// const Enquiries = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [saleData, setSaleData] = useState({});

//   const [saleStatus, setSaleStatus] = useState({});
// const [amounts, setAmounts] = useState({});

//   const fetchEnquiries = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/enquiries");
//       setEnquiries(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch enquiries:", err);
//       // Consider adding toast notification here
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/enquiries/${id}/status`, { status });
//       fetchEnquiries();
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update status. You don't have permission.");
//     }
//   };

//   const deleteEnquiry = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
//     try {
//       await API.delete(`/enquiries/${id}`);
//       fetchEnquiries();
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert("Failed to delete enquiry. You don't have permission.");
//     }
//   };

//   const updateSaleData = (id, field, value) => {
//     setSaleData(prev => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: Number(value)
//       }
//     }));
//   };

//   // Calculate profit whenever sale data changes
//   const calculateProfit = (id) => {
//     const data = saleData[id];
//     if (!data?.sellingPrice || !data?.costPrice) return 0;
//     return data.sellingPrice - data.costPrice;
//   };

//   const totalPages = Math.ceil(enquiries.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
//   const paginatedEnquiries = useMemo(() => 
//     enquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE),
//     [enquiries, startIndex]
//   );

//   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-2">
//             <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl shadow-lg">
//               <MessageSquare size={32} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Customer Enquiries</h1>
//               <p className="text-gray-600 mt-1">Manage and track customer travel enquiries efficiently</p>
//             </div>
//           </div>
//           <div className="mt-6 flex items-center justify-between">
//             <div className="text-sm text-gray-500">
//               Total Enquiries: <span className="font-semibold text-gray-700">{enquiries.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
//             <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Table Container */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-teal-600 to-emerald-600">
//                     <tr>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Contact
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Message
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     {paginatedEnquiries.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="px-8 py-16 text-center">
//                           <div className="flex flex-col items-center justify-center">
//                             <MessageSquare size={72} className="text-gray-300 mb-4" />
//                             <h3 className="text-xl font-semibold text-gray-500 mb-2">
//                               No Enquiries Found
//                             </h3>
//                             <p className="text-gray-400">
//                               New customer enquiries will appear here
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedEnquiries.map((enquiry) => (
//                         <tr 
//                           key={enquiry._id} 
//                           className="hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           {/* Customer Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex items-center gap-4">
//                               <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
//                                 <User size={20} className="text-teal-600" />
//                               </div>
//                               <div>
//                                 <h4 className="font-semibold text-gray-900">{enquiry.name}</h4>
//                                 <p className="text-sm text-gray-500">Customer</p>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Contact Column */}
//                           <td className="px-8 py-6">
//                             <div className="space-y-2">
//                               <div className="flex items-center gap-3">
//                                 <Mail size={16} className="text-gray-400" />
//                                 <a 
//                                   href={`mailto:${enquiry.email}`}
//                                   className="text-sm text-gray-700 hover:text-teal-600 transition-colors"
//                                 >
//                                   {enquiry.email}
//                                 </a>
//                               </div>
//                               {enquiry.phone && (
//                                 <div className="flex items-center gap-3">
//                                   <Phone size={16} className="text-gray-400" />
//                                   <a 
//                                     href={`tel:${enquiry.phone}`}
//                                     className="text-sm text-gray-700 hover:text-teal-600 transition-colors"
//                                   >
//                                     {enquiry.phone}
//                                   </a>
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* Message Column */}
//                           <td className="px-8 py-6 max-w-xs">
//                             <p className="text-gray-600 line-clamp-2 leading-relaxed">
//                               {enquiry.message}
//                             </p>
//                           </td>

//                           {/* Date Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex items-center gap-3 text-gray-700">
//                               <Calendar size={16} className="text-gray-400" />
//                               <div className="text-sm">
//                                 <div className="font-medium">{formatDate(enquiry.createdAt)}</div>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Status Column */}
//                           <td className="px-8 py-6">
//                             <div className="space-y-4">
//                               {/* Status Selector */}
//                               <div className="flex justify-center">
//                                 <select
//                                   value={enquiry.status}
//                                   onChange={(e) => updateStatus(enquiry._id, e.target.value)}
//                                   className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:shadow-md ${STATUS_CONFIG[enquiry.status]?.color}`}
//                                 >
//                                   {Object.entries(STATUS_CONFIG).map(([value, config]) => (
//                                     <option key={value} value={value}>
//                                       {config.icon} {config.label}
//                                     </option>
//                                   ))}
//                                 </select>
//                               </div>

//                               {/* Sale Section */}
//                               {enquiry.status === "CONTACTED" && (
//                                 <div className="mt-4 space-y-3">
//                                   <select
//                                     value={saleData[enquiry._id]?.sale || "NO"}
//                                     onChange={(e) => setSaleData(prev => ({
//                                       ...prev,
//                                       [enquiry._id]: { ...prev[enquiry._id], sale: e.target.value }
//                                     }))}
//                                     className="w-full cursor-pointer px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                                   >
//                                     <option value="NO">📞 No Sale</option>
//                                     <option value="YES">💰 Sale Made</option>
//                                   </select>

//                                   {saleData[enquiry._id]?.sale === "YES" && (
//                                     <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                                       <div className="grid grid-cols-2 gap-2">
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <DollarSign size={12} className="inline mr-1" />
//                                             Amount
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="Amount"
//                                             value={saleData[enquiry._id]?.amount || ""}
//                                             onChange={(e) => updateSaleData(enquiry._id, 'amount', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <Package size={12} className="inline mr-1" />
//                                             Cost
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="Cost Price"
//                                             value={saleData[enquiry._id]?.costPrice || ""}
//                                             onChange={(e) => updateSaleData(enquiry._id, 'costPrice', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <TrendingUp size={12} className="inline mr-1" />
//                                             Selling
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="Selling Price"
//                                             value={saleData[enquiry._id]?.sellingPrice || ""}
//                                             onChange={(e) => updateSaleData(enquiry._id, 'sellingPrice', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             💰 Profit
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="Profit"
//                                             value={calculateProfit(enquiry._id)}
//                                             readOnly
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-100 font-semibold"
//                                           />
//                                         </div>
//                                       </div>
//                                     </div>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* Actions Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex justify-center">
//                               <button
//                                 onClick={() => deleteEnquiry(enquiry._id)}
//                                 className="p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors group"
//                                 title="Delete enquiry"
//                               >
//                                 <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> -{" "}
//                   <span className="font-semibold text-gray-900">
//                     {Math.min(startIndex + ITEMS_PER_PAGE, enquiries.length)}
//                   </span>{" "}
//                   of <span className="font-semibold text-gray-900">{enquiries.length}</span> enquiries
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={handlePrev}
//                     disabled={currentPage === 1}
//                     className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                   >
//                     <ChevronLeft size={18} />
//                     Previous
//                   </button>

//                   <div className="flex items-center gap-2">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       const pageNum = i + 1;
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`w-10 h-10 rounded-lg font-medium transition-all ${
//                             currentPage === pageNum
//                               ? "bg-teal-600 text-white shadow-md"
//                               : "text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                     {totalPages > 5 && (
//                       <span className="text-gray-400 px-2">...</span>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleNext}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                   >
//                     Next
//                     <ChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Enquiries;

//============================full correct===========

// import { useEffect, useState, useMemo } from "react";
// import API from "../api/axios";
// import {
//   MessageSquare,
//   Phone,
//   Mail,
//   User,
//   Calendar,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   Save,
//   DollarSign,
//   TrendingUp,
//   Package,
//   CheckCircle
// } from "lucide-react";

// const STATUS_CONFIG = {
//   NEW: { 
//     color: "bg-blue-50 text-blue-700 border-blue-200", 
//     label: "New",
//     icon: "🆕"
//   },
//   CONTACTED: { 
//     color: "bg-amber-50 text-amber-700 border-amber-200", 
//     label: "Contacted",
//     icon: "📞"
//   },
//   FOLLOW_UP: { 
//     color: "bg-orange-50 text-orange-700 border-orange-200", 
//     label: "Follow Up",
//     icon: "🔄"
//   },
//   CLOSED: { 
//     color: "bg-emerald-50 text-emerald-700 border-emerald-200", 
//     label: "Closed",
//     icon: "✅"
//   }
// };

// const ITEMS_PER_PAGE = 10;

// const Enquiries = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [saleStatus, setSaleStatus] = useState({});
//   const [saleData, setSaleData] = useState({});
//   const [saving, setSaving] = useState({});

//   // Fetch enquiries including saved sale data
//   const fetchEnquiries = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/enquiries");
//       const enquiriesData = res.data || [];
//       setEnquiries(enquiriesData);

//       // Initialize saleStatus and saleData from fetched enquiries
//       const initialSaleStatus = {};
//       const initialSaleData = {};
      
//       enquiriesData.forEach(enquiry => {
//         initialSaleStatus[enquiry._id] = enquiry.saleStatus || "NO";
//         initialSaleData[enquiry._id] = {
//           amount: enquiry.saleAmount || 0,
//           costPrice: enquiry.costPrice || 0,
//           sellingPrice: enquiry.sellingPrice || 0,
//           profit: enquiry.profit || 0
//         };
//       });
      
//       setSaleStatus(initialSaleStatus);
//       setSaleData(initialSaleData);
//     } catch (err) {
//       console.error("Failed to fetch enquiries:", err);
//       alert("Failed to load enquiries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   // Update enquiry status
//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/enquiries/${id}/status`, { status });
//       await fetchEnquiries(); // Refresh to get updated data
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update status. You don't have permission.");
//     }
//   };

//   // Save sale data to backend
//   const saveSaleData = async (id) => {
//     const data = {
//       saleStatus: saleStatus[id],
//       saleAmount: parseFloat(saleData[id]?.amount) || 0,
//       costPrice: parseFloat(saleData[id]?.costPrice) || 0,
//       sellingPrice: parseFloat(saleData[id]?.sellingPrice) || 0,
//       profit: parseFloat(saleData[id]?.profit) || 0
//     };

//     try {
//       setSaving(prev => ({ ...prev, [id]: true }));
//       await API.put(`/enquiries/${id}/sale`, data);
      
//       // Show success feedback
//       const saveBtn = document.querySelector(`[data-id="${id}"]`);
//       if (saveBtn) {
//         const originalText = saveBtn.innerHTML;
//         saveBtn.innerHTML = '<CheckCircle size={14} className="inline mr-1" /> Saved';
//         saveBtn.classList.add('bg-green-100', 'text-green-700');
        
//         setTimeout(() => {
//           saveBtn.innerHTML = originalText;
//           saveBtn.classList.remove('bg-green-100', 'text-green-700');
//         }, 2000);
//       }
      
//       // Refresh data to ensure consistency
//       await fetchEnquiries();
//     } catch (error) {
//       console.error("Save failed:", error);
//       alert("Failed to save sale data");
//     } finally {
//       setSaving(prev => ({ ...prev, [id]: false }));
//     }
//   };

//   // Update sale status
//   const handleSaleStatusChange = (id, value) => {
//     setSaleStatus(prev => ({ ...prev, [id]: value }));
    
//     // If setting to NO, clear sale data
//     if (value === "NO") {
//       setSaleData(prev => ({
//         ...prev,
//         [id]: {
//           amount: 0,
//           costPrice: 0,
//           sellingPrice: 0,
//           profit: 0
//         }
//       }));
//     }
//   };

//   // Update sale amount field
//   const handleSaleDataChange = (id, field, value) => {
//     const numValue = parseFloat(value) || 0;
    
//     setSaleData(prev => {
//       const currentData = prev[id] || { amount: 0, costPrice: 0, sellingPrice: 0, profit: 0 };
      
//       // Calculate profit if costPrice or sellingPrice changes
//       let profit = currentData.profit;
//       if (field === 'costPrice') {
//         profit = (currentData.sellingPrice || 0) - numValue;
//       } else if (field === 'sellingPrice') {
//         profit = numValue - (currentData.costPrice || 0);
//       }
      
//       return {
//         ...prev,
//         [id]: {
//           ...currentData,
//           [field]: numValue,
//           profit: profit
//         }
//       };
//     });
//   };

//   // Delete enquiry
//   const deleteEnquiry = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
//     try {
//       await API.delete(`/enquiries/${id}`);
//       fetchEnquiries();
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert("Failed to delete enquiry. You don't have permission.");
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   // Pagination
//   const totalPages = Math.ceil(enquiries.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
//   const paginatedEnquiries = useMemo(() => 
//     enquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE),
//     [enquiries, startIndex]
//   );

//   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-2">
//             <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl shadow-lg">
//               <MessageSquare size={32} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Customer Enquiries</h1>
//               <p className="text-gray-600 mt-1">Manage enquiries and track sales data</p>
//             </div>
//           </div>
//           <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="text-sm text-gray-500">
//               Total: <span className="font-semibold text-gray-700">{enquiries.length}</span> • 
//               Showing <span className="font-semibold text-gray-700">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, enquiries.length)}</span>
//             </div>
//             <div className="flex items-center gap-4 text-sm">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
//                 <span className="text-gray-600">Sales Made</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
//                 <span className="text-gray-600">In Progress</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
//             <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Table Container */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-teal-600 to-emerald-600">
//                     <tr>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Contact & Date
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Message
//                       </th>
//                       <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
//                         Status & Sales
//                       </th>
//                       <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     {paginatedEnquiries.length === 0 ? (
//                       <tr>
//                         <td colSpan="5" className="px-8 py-16 text-center">
//                           <div className="flex flex-col items-center justify-center">
//                             <MessageSquare size={72} className="text-gray-300 mb-4" />
//                             <h3 className="text-xl font-semibold text-gray-500 mb-2">
//                               No Enquiries Found
//                             </h3>
//                             <p className="text-gray-400">
//                               New customer enquiries will appear here
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedEnquiries.map((enquiry) => (
//                         <tr 
//                           key={enquiry._id} 
//                           className="hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           {/* Customer Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex items-center gap-4">
//                               <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
//                                 <User size={20} className="text-teal-600" />
//                               </div>
//                               <div>
//                                 <h4 className="font-semibold text-gray-900">{enquiry.name}</h4>
//                                 <p className="text-sm text-gray-500">Enquiry ID: {enquiry._id.slice(-8)}</p>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Contact & Date Column */}
//                           <td className="px-8 py-6">
//                             <div className="space-y-3">
//                               <div className="space-y-1">
//                                 <div className="flex items-center gap-2">
//                                   <Mail size={14} className="text-gray-400" />
//                                   <a 
//                                     href={`mailto:${enquiry.email}`}
//                                     className="text-sm text-gray-700 hover:text-teal-600 transition-colors truncate"
//                                   >
//                                     {enquiry.email}
//                                   </a>
//                                 </div>
//                                 {enquiry.phone && (
//                                   <div className="flex items-center gap-2">
//                                     <Phone size={14} className="text-gray-400" />
//                                     <span className="text-sm text-gray-700">
//                                       {enquiry.phone}
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="flex items-center gap-2 text-xs text-gray-500">
//                                 <Calendar size={12} />
//                                 {formatDate(enquiry.createdAt)}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Message Column */}
//                           <td className="px-8 py-6 max-w-xs">
//                             <p className="text-gray-600 line-clamp-3 leading-relaxed">
//                               {enquiry.message}
//                             </p>
//                           </td>

//                           {/* Status & Sales Column */}
//                           <td className="px-8 py-6">
//                             <div className="space-y-4">
//                               {/* Status Selector */}
//                               <div className="flex justify-center">
//                                 <select
//                                   value={enquiry.status}
//                                   onChange={(e) => updateStatus(enquiry._id, e.target.value)}
//                                   className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:shadow-md ${STATUS_CONFIG[enquiry.status]?.color}`}
//                                 >
//                                   {Object.entries(STATUS_CONFIG).map(([value, config]) => (
//                                     <option key={value} value={value}>
//                                       {config.icon} {config.label}
//                                     </option>
//                                   ))}
//                                 </select>
//                               </div>

//                               {/* Sale Tracking */}
//                               {enquiry.status === "CONTACTED" && (
//                                 <div className="mt-4 space-y-3">
//                                   <div className="flex items-center gap-2">
//                                     <select
//                                       value={saleStatus[enquiry._id] || "NO"}
//                                       onChange={(e) => handleSaleStatusChange(enquiry._id, e.target.value)}
//                                       className="flex-1 cursor-pointer px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                                     >
//                                       <option value="NO">📞 No Sale</option>
//                                       <option value="YES">💰 Sale Made</option>
//                                     </select>
//                                   </div>

//                                   {/* Sale Data Inputs */}
//                                   {saleStatus[enquiry._id] === "YES" && (
//                                     <div className="space-y-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
//                                       <div className="grid grid-cols-2 gap-2">
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <DollarSign size={12} className="inline mr-1" />
//                                             Amount
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="0"
//                                             value={saleData[enquiry._id]?.amount || ""}
//                                             onChange={(e) => handleSaleDataChange(enquiry._id, 'amount', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <Package size={12} className="inline mr-1" />
//                                             Cost
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="0"
//                                             value={saleData[enquiry._id]?.costPrice || ""}
//                                             onChange={(e) => handleSaleDataChange(enquiry._id, 'costPrice', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <TrendingUp size={12} className="inline mr-1" />
//                                             Selling
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="0"
//                                             value={saleData[enquiry._id]?.sellingPrice || ""}
//                                             onChange={(e) => handleSaleDataChange(enquiry._id, 'sellingPrice', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             💰 Profit
//                                           </label>
//                                           <input
//                                             type="number"
//                                             value={saleData[enquiry._id]?.profit || 0}
//                                             readOnly
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-100 font-semibold text-emerald-700"
//                                           />
//                                         </div>
//                                       </div>
                                      
//                                       {/* Summary & Save Button */}
//                                       <div className="mt-3 pt-3 border-t border-gray-200">
//                                         <div className="flex items-center justify-between">
//                                           <div className="text-xs">
//                                             <span className="text-gray-500">Total:</span>{' '}
//                                             <span className="font-semibold">
//                                               {formatCurrency(saleData[enquiry._id]?.amount || 0)}
//                                             </span>
//                                           </div>
//                                           <button
//                                             data-id={enquiry._id}
//                                             onClick={() => saveSaleData(enquiry._id)}
//                                             disabled={saving[enquiry._id]}
//                                             className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                                           >
//                                             {saving[enquiry._id] ? (
//                                               <>
//                                                 <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
//                                                 Saving...
//                                               </>
//                                             ) : (
//                                               <>
//                                                 <Save size={12} />
//                                                 Save Data
//                                               </>
//                                             )}
//                                           </button>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* Actions Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex justify-center gap-2">
//                               <button
//                                 onClick={() => deleteEnquiry(enquiry._id)}
//                                 className="cursor-pointer p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors group"
//                                 title="Delete enquiry"
//                               >
//                                 <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> -{" "}
//                   <span className="font-semibold text-gray-900">
//                     {Math.min(startIndex + ITEMS_PER_PAGE, enquiries.length)}
//                   </span>{" "}
//                   of <span className="font-semibold text-gray-900">{enquiries.length}</span> enquiries
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={handlePrev}
//                     disabled={currentPage === 1}
//                     className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                   >
//                     <ChevronLeft size={18} />
//                     Previous
//                   </button>

//                   <div className="flex items-center gap-2">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       const pageNum = i + 1;
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`w-10 h-10 rounded-lg font-medium transition-all ${
//                             currentPage === pageNum
//                               ? "bg-teal-600 text-white shadow-md"
//                               : "text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                     {totalPages > 5 && (
//                       <span className="text-gray-400 px-2">...</span>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleNext}
//                     disabled={currentPage === totalPages}
//                     className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                   >
//                     Next
//                     <ChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Enquiries;

//=============date range filter and profit amount===========


import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import {
  MessageSquare,
  Phone,
  Mail,
  User,
  Calendar,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  DollarSign,
  TrendingUp,
  Package,
  CheckCircle,
  Filter,
  TrendingUp as TrendingUpIcon,
  RefreshCw
} from "lucide-react";

const STATUS_CONFIG = {
  NEW: { 
    color: "bg-blue-50 text-blue-700 border-blue-200", 
    label: "New",
    icon: "🆕"
  },
  CONTACTED: { 
    color: "bg-amber-50 text-amber-700 border-amber-200", 
    label: "Contacted",
    icon: "📞"
  },
  FOLLOW_UP: { 
    color: "bg-orange-50 text-orange-700 border-orange-200", 
    label: "Follow Up",
    icon: "🔄"
  },
  CLOSED: { 
    color: "bg-emerald-50 text-emerald-700 border-emerald-200", 
    label: "Closed",
    icon: "✅"
  }
};

const ITEMS_PER_PAGE = 10;

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [saleStatus, setSaleStatus] = useState({});
  const [saleData, setSaleData] = useState({});
  const [saving, setSaving] = useState({});
  
  // Date range filter states
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Fetch enquiries including saved sale data
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/enquiries");
      const enquiriesData = res.data || [];
      setEnquiries(enquiriesData);
      setFilteredEnquiries(enquiriesData);

      // Initialize saleStatus and saleData from fetched enquiries
      const initialSaleStatus = {};
      const initialSaleData = {};
      
      enquiriesData.forEach(enquiry => {
        initialSaleStatus[enquiry._id] = enquiry.saleStatus || "NO";
        initialSaleData[enquiry._id] = {
          amount: enquiry.saleAmount || 0,
          costPrice: enquiry.costPrice || 0,
          sellingPrice: enquiry.sellingPrice || 0,
          profit: enquiry.profit || 0
        };
      });
      
      setSaleStatus(initialSaleStatus);
      setSaleData(initialSaleData);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
      alert("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Calculate current month range
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return {
      from: firstDay.toISOString().split('T')[0],
      to: lastDay.toISOString().split('T')[0]
    };
  };

  // Filter enquiries by date range
  const applyDateFilter = () => {
    if (!dateRange.from && !dateRange.to) {
      setFilteredEnquiries(enquiries);
      return;
    }

    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    
    if (toDate) {
      toDate.setHours(23, 59, 59, 999); // Include entire end day
    }

    const filtered = enquiries.filter(enquiry => {
      const enquiryDate = new Date(enquiry.createdAt);
      
      if (fromDate && toDate) {
        return enquiryDate >= fromDate && enquiryDate <= toDate;
      } else if (fromDate) {
        return enquiryDate >= fromDate;
      } else if (toDate) {
        return enquiryDate <= toDate;
      }
      return true;
    });

    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange({ from: "", to: "" });
    setFilteredEnquiries(enquiries);
  };

  // Calculate total profit for filtered enquiries
  const calculateTotalProfit = () => {
    return filteredEnquiries.reduce((total, enquiry) => {
      // Only include profits from enquiries with saleStatus = "YES"
      if (enquiry.saleStatus === "YES") {
        return total + (enquiry.profit || 0);
      }
      return total;
    }, 0);
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Calculate filtered dates display
  const getFilteredDatesDisplay = () => {
    if (!dateRange.from && !dateRange.to) {
      const currentMonth = getCurrentMonthRange();
      return {
        from: formatDisplayDate(currentMonth.from),
        to: formatDisplayDate(currentMonth.to),
        label: "Current Month"
      };
    }
    
    return {
      from: dateRange.from ? formatDisplayDate(dateRange.from) : "Any",
      to: dateRange.to ? formatDisplayDate(dateRange.to) : "Any",
      label: "Custom Range"
    };
  };

  // Apply filter on date range change
  useEffect(() => {
    applyDateFilter();
  }, [dateRange.from, dateRange.to, enquiries]);

  // Update enquiry status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/enquiries/${id}/status`, { status });
      await fetchEnquiries(); // Refresh to get updated data
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status. You don't have permission.");
    }
  };

  // Save sale data to backend
  const saveSaleData = async (id) => {
    const data = {
      saleStatus: saleStatus[id],
      saleAmount: parseFloat(saleData[id]?.amount) || 0,
      costPrice: parseFloat(saleData[id]?.costPrice) || 0,
      sellingPrice: parseFloat(saleData[id]?.sellingPrice) || 0,
      profit: parseFloat(saleData[id]?.profit) || 0
    };

    try {
      setSaving(prev => ({ ...prev, [id]: true }));
      await API.put(`/enquiries/${id}/sale`, data);
      
      // Show success feedback
      const saveBtn = document.querySelector(`[data-id="${id}"]`);
      if (saveBtn) {
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<CheckCircle size={14} className="inline mr-1" /> Saved';
        saveBtn.classList.add('bg-green-100', 'text-green-700');
        
        setTimeout(() => {
          saveBtn.innerHTML = originalText;
          saveBtn.classList.remove('bg-green-100', 'text-green-700');
        }, 2000);
      }
      
      // Refresh data to ensure consistency
      await fetchEnquiries();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save sale data");
    } finally {
      setSaving(prev => ({ ...prev, [id]: false }));
    }
  };

  // Update sale status
  const handleSaleStatusChange = (id, value) => {
    setSaleStatus(prev => ({ ...prev, [id]: value }));
    
    // If setting to NO, clear sale data
    if (value === "NO") {
      setSaleData(prev => ({
        ...prev,
        [id]: {
          amount: 0,
          costPrice: 0,
          sellingPrice: 0,
          profit: 0
        }
      }));
    }
  };

  // Update sale amount field
  const handleSaleDataChange = (id, field, value) => {
    const numValue = parseFloat(value) || 0;
    
    setSaleData(prev => {
      const currentData = prev[id] || { amount: 0, costPrice: 0, sellingPrice: 0, profit: 0 };
      
      // Calculate profit if costPrice or sellingPrice changes
      let profit = currentData.profit;
      if (field === 'costPrice') {
        profit = (currentData.sellingPrice || 0) - numValue;
      } else if (field === 'sellingPrice') {
        profit = numValue - (currentData.costPrice || 0);
      }
      
      return {
        ...prev,
        [id]: {
          ...currentData,
          [field]: numValue,
          profit: profit
        }
      };
    });
  };

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
    try {
      await API.delete(`/enquiries/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete enquiry. You don't have permission.");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
  const paginatedEnquiries = useMemo(() => 
    filteredEnquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [filteredEnquiries, startIndex]
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

  // Calculate total sales amount
  const totalSalesAmount = filteredEnquiries.reduce((total, enquiry) => {
    if (enquiry.saleStatus === "YES") {
      return total + (enquiry.saleAmount || 0);
    }
    return total;
  }, 0);

  // Calculate total profit
  const totalProfit = calculateTotalProfit();

  const filteredDates = getFilteredDatesDisplay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl shadow-lg">
                <MessageSquare size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Customer Enquiries</h1>
                <p className="text-gray-600 mt-1">Manage enquiries and track sales data</p>
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm"
            >
              <Filter size={18} />
              {showDateFilter ? "Hide Filter" : "Filter by Date"}
            </button>
          </div>

          {/* Date Filter Section */}
          {showDateFilter && (
            <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filter by Date Range</h3>
                <button
                  onClick={clearDateFilter}
                  className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw size={14} />
                  Clear Filter
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <div className="h-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Current Selection:</span>{' '}
                      {filteredDates.from} to {filteredDates.to}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {filteredDates.label} • {filteredEnquiries.length} enquiries found
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Profit Card */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUpIcon className="text-emerald-600" size={20} />
                    <span className="text-sm font-medium text-gray-600">Total Profit</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-700">
                      {formatCurrency(totalProfit)}
                    </span>
                    <span className="text-xs text-gray-500">
                      from {filteredEnquiries.filter(e => e.saleStatus === "YES").length} sales
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Date Range</div>
                  <div className="text-sm font-medium text-gray-700">
                    {filteredDates.from.split(' ')[0]} - {filteredDates.to.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Summary Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Total Sales</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalSalesAmount)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Enquiries</div>
                  <div className="text-sm font-medium text-gray-700">
                    {filteredEnquiries.length} total
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Status Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Date Filter</div>
                  <div className="text-lg font-bold text-gray-900">
                    {filteredDates.label}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Showing</div>
                  <div className="text-sm font-medium text-gray-700">
                    {filteredEnquiries.length} of {enquiries.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div>
              Total Enquiries: <span className="font-semibold text-gray-700">{enquiries.length}</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div>
              Filtered: <span className="font-semibold text-gray-700">{filteredEnquiries.length}</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Sales Made: {filteredEnquiries.filter(e => e.saleStatus === "YES").length}</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>In Progress</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-teal-600 to-emerald-600">
                    <tr>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Contact & Date
                      </th>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        Status & Sales
                      </th>
                      <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {paginatedEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <MessageSquare size={72} className="text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500 mb-2">
                              No Enquiries Found
                            </h3>
                            <p className="text-gray-400">
                              {dateRange.from || dateRange.to 
                                ? "No enquiries match your date filter. Try a different date range."
                                : "No enquiries found. New customer enquiries will appear here."
                              }
                            </p>
                            {(dateRange.from || dateRange.to) && (
                              <button
                                onClick={clearDateFilter}
                                className="cursor-pointer mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                              >
                                Clear Date Filter
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedEnquiries.map((enquiry) => (
                        <tr 
                          key={enquiry._id} 
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          {/* Customer Column */}
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
                                <User size={20} className="text-teal-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{enquiry.name}</h4>
                                <p className="text-sm text-gray-500">Enquiry ID: {enquiry._id.slice(-8)}</p>
                                {enquiry.saleStatus === "YES" && (
                                  <div className="mt-1 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs text-emerald-600 font-medium">
                                      Profit: {formatCurrency(enquiry.profit || 0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Contact & Date Column */}
                          <td className="px-8 py-6">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Mail size={14} className="text-gray-400" />
                                  <a 
                                    href={`mailto:${enquiry.email}`}
                                    className="text-sm text-gray-700 hover:text-teal-600 transition-colors truncate"
                                  >
                                    {enquiry.email}
                                  </a>
                                </div>
                                {enquiry.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-700">
                                      {enquiry.phone}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar size={12} />
                                {formatDate(enquiry.createdAt)}
                              </div>
                            </div>
                          </td>

                          {/* Message Column */}
                          <td className="px-8 py-6 max-w-xs">
                            <p className="text-gray-600 line-clamp-3 leading-relaxed">
                              {enquiry.message}
                            </p>
                          </td>

                          {/* Status & Sales Column */}
                          <td className="px-8 py-6">
                            <div className="space-y-4">
                              {/* Status Selector */}
                              <div className="flex justify-center">
                                <select
                                  value={enquiry.status}
                                  onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                                  className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:shadow-md ${STATUS_CONFIG[enquiry.status]?.color}`}
                                >
                                  {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                                    <option key={value} value={value}>
                                      {config.icon} {config.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Sale Tracking */}
                              {enquiry.status === "CONTACTED" && (
                                <div className="mt-4 space-y-3">
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={saleStatus[enquiry._id] || "NO"}
                                      onChange={(e) => handleSaleStatusChange(enquiry._id, e.target.value)}
                                      className="flex-1 cursor-pointer px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    >
                                      <option value="NO">📞 No Sale</option>
                                      <option value="YES">💰 Sale Made</option>
                                    </select>
                                  </div>

                                  {/* Sale Data Inputs */}
                                  {saleStatus[enquiry._id] === "YES" && (
                                    <div className="space-y-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            <DollarSign size={12} className="inline mr-1" />
                                            Amount
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="0"
                                            value={saleData[enquiry._id]?.amount || ""}
                                            onChange={(e) => handleSaleDataChange(enquiry._id, 'amount', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            <Package size={12} className="inline mr-1" />
                                            Cost
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="0"
                                            value={saleData[enquiry._id]?.costPrice || ""}
                                            onChange={(e) => handleSaleDataChange(enquiry._id, 'costPrice', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            <TrendingUp size={12} className="inline mr-1" />
                                            Selling
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="0"
                                            value={saleData[enquiry._id]?.sellingPrice || ""}
                                            onChange={(e) => handleSaleDataChange(enquiry._id, 'sellingPrice', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            💰 Profit
                                          </label>
                                          <input
                                            type="number"
                                            value={saleData[enquiry._id]?.profit || 0}
                                            readOnly
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-100 font-semibold text-emerald-700"
                                          />
                                        </div>
                                      </div>
                                      
                                      {/* Summary & Save Button */}
                                      <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                          <div className="text-xs">
                                            <span className="text-gray-500">Total:</span>{' '}
                                            <span className="font-semibold">
                                              {formatCurrency(saleData[enquiry._id]?.amount || 0)}
                                            </span>
                                          </div>
                                          <button
                                            data-id={enquiry._id}
                                            onClick={() => saveSaleData(enquiry._id)}
                                            disabled={saving[enquiry._id]}
                                            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            {saving[enquiry._id] ? (
                                              <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                Saving...
                                              </>
                                            ) : (
                                              <>
                                                <Save size={12} />
                                                Save Data
                                              </>
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Actions Column */}
                          <td className="px-8 py-6">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => deleteEnquiry(enquiry._id)}
                                className="cursor-pointer p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors group"
                                title="Delete enquiry"
                              >
                                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> -{" "}
                  <span className="font-semibold text-gray-900">
                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredEnquiries.length)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-900">{filteredEnquiries.length}</span> filtered enquiries
                  {filteredEnquiries.length !== enquiries.length && (
                    <span className="text-gray-500 ml-2">
                      ({enquiries.length} total)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all ${
                            currentPage === pageNum
                              ? "bg-teal-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="text-gray-400 px-2">...</span>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Enquiries;