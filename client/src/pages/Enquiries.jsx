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
import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  MessageSquare,
  Phone,
  Mail,
  User,
  Calendar,
  Trash2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const statusConfig = {
  NEW: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "New" },
  CONTACTED: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Contacted" },
  CLOSED: { color: "bg-green-100 text-green-700 border-green-200", label: "Closed" },
};

const ITEMS_PER_PAGE = 10;

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH ================= */
  const fetchEnquiries = async () => {
    try {
      const res = await API.get("/enquiries");
      setEnquiries(res.data || []);
    } catch (err) {
      console.error("Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  /* ================= ACTIONS ================= */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/enquiries/${id}/status`, { status });
      fetchEnquiries();
    } catch {
      alert("Failed to update status ,you are not allowed");
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await API.delete(`/enquiries/${id}`);
      fetchEnquiries();
    } catch {
      alert("Failed to delete enquiry ,you are not allowed");
    }
  };

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(enquiries.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEnquiries = enquiries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-full mx-auto px-6">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-teal-600 rounded-xl shadow">
            <MessageSquare size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customer Enquiries</h1>
            <p className="text-gray-600">Manage travel enquiries efficiently</p>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="h-40 bg-white rounded-xl shadow animate-pulse" />
        ) : (
          <>
            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-teal-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Customer</th>
                      <th className="px-6 py-4 text-left">Contact</th>
                      <th className="px-6 py-4 text-left">Message</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {paginatedEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-16 text-center text-gray-400">
                          <MessageSquare size={64} className="mx-auto mb-4 opacity-40" />
                          No enquiries found
                        </td>
                      </tr>
                    ) : (
                      paginatedEnquiries.map((e) => (
                        <tr key={e._id} className="hover:bg-gray-50">
                          {/* CUSTOMER */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <User size={18} className="text-teal-600" />
                              </div>
                              <span className="font-medium">{e.name}</span>
                            </div>
                          </td>

                          {/* CONTACT */}
                          <td className="px-6 py-5 text-sm text-gray-700">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail size={14} /> {e.email}
                              </div>
                              {e.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone size={14} /> {e.phone}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* MESSAGE */}
                          <td className="px-6 py-5 max-w-md text-gray-600">
                            <p className="line-clamp-2">{e.message}</p>
                          </td>

                          {/* DATE */}
                          <td className="px-6 py-5 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              {new Date(e.createdAt).toLocaleDateString("en-IN")}
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-5 text-center">
                            <select
                              value={e.status}
                              onChange={(ev) => updateStatus(e._id, ev.target.value)}
                              className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[e.status]?.color}`}
                            >
                              <option value="NEW">New</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-5 text-center">
                            <button
                              onClick={() => deleteEnquiry(e._id)}
                              className="cursor-pointer p-2 rounded-lg hover:bg-red-100"
                            >
                              <Trash2 size={18} className="text-red-600" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <b>{startIndex + 1}</b> –{" "}
                  <b>{Math.min(startIndex + ITEMS_PER_PAGE, enquiries.length)}</b>{" "}
                  of <b>{enquiries.length}</b>
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border rounded-lg disabled:opacity-40"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <span className="text-sm font-semibold">
                    Page {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border rounded-lg disabled:opacity-40"
                  >
                    Next <ChevronRight size={16} />
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
