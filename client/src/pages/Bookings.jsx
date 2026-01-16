

// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Plane, User, IndianRupee, Ticket, Calendar, Trash2 } from "lucide-react";

// const statusConfig = {
//   FRESH: "bg-blue-100 text-blue-700",
//   FOLLOW_UP: "bg-yellow-100 text-yellow-700",
//   TICKETING: "bg-purple-100 text-purple-700",
//   TICKETED: "bg-green-100 text-green-700",
//   CANCELLED: "bg-red-100 text-red-700",
//   CHARGEBACK: "bg-gray-200 text-gray-800",
// };

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchBookings = async (p = page) => {
//     try {
//       setLoading(true);
//       const res = await API.get("/bookings", {
//         params: { page: p, limit: 10 },
//       });

//       setBookings(Array.isArray(res.data.data) ? res.data.data : []);
//       setTotalPages(res.data.pagination?.totalPages || 1);
//       setPage(res.data.pagination?.page || 1);
//     } catch (err) {
//       setBookings([]);
//       console.error("Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(page);
//   }, [page]);

//   const updateStatus = async (id, status) => {
//     await API.put(`/bookings/${id}/status`, { status });
//     fetchBookings();
//   };

//   const deleteBooking = async (id) => {
//     if (!confirm("Delete booking?")) return;
//     await API.delete(`/bookings/${id}`);
//     fetchBookings();
//   };

//   if (loading) {
//     return <div className="p-10 text-center">Loading bookings...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6 flex gap-2 items-center">
//         <Plane /> Flight Bookings
//       </h1>

//       {(bookings?.length ?? 0) === 0 ? (
//         <div className="text-center text-gray-400 mt-20">
//           <Ticket size={60} className="mx-auto mb-4" />
//           No bookings found
//         </div>
//       ) : (


//         <table className="w-full bg-white rounded-xl overflow-hidden border border-gray-200">
//           <thead className="bg-teal-600 text-white">
//             <tr>
//               <th className="px-4 py-3 text-left">Customer</th>
//               <th className="px-4 py-3 text-center">PNR</th>
//               <th className="px-4 py-3 text-center">Airline</th>
//               <th className="px-4 py-3 text-center">Amount</th>
//               <th className="px-4 py-3 text-center">Date</th>
//               <th className="px-4 py-3 text-center">Status</th>
//               <th className="px-4 py-3 text-center w-20">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((b) => (
//               <tr
//                 key={b._id}
//                 className="border-b last:border-none hover:bg-gray-50"
//               >
//                 {/* Customer */}
//                 <td className="px-4 py-4">
//                   <div className="flex items-center gap-2">
//                     <User size={18} className="text-gray-500" />
//                     <span className="font-medium text-gray-800">
//                       {b.customerName}
//                     </span>
//                   </div>
//                 </td>

//                 {/* PNR */}
//                 <td className="px-4 py-4 text-center font-mono text-gray-700">
//                   {b.pnr || "-"}
//                 </td>

//                 {/* Airline */}
//                 <td className="px-4 py-4 text-center text-gray-700">
//                   {b.airline || "-"}
//                 </td>

//                 {/* Amount */}
//                 <td className="px-4 py-4 text-center">
//                   <div className="flex items-center justify-center gap-1 font-semibold text-gray-900">
//                     <IndianRupee size={14} />
//                     {Number(b.amount || 0).toLocaleString("en-IN")}
//                   </div>
//                 </td>

//                 {/* Date */}
//                 <td className="px-4 py-4 text-center text-sm text-gray-600">
//                   <div className="flex items-center justify-center gap-1">
//                     <Calendar size={14} />
//                     {b.createdAt
//                       ? new Date(b.createdAt).toLocaleDateString("en-IN")
//                       : "-"}
//                   </div>
//                 </td>

//                 {/* Status */}
//                 <td className="px-4 py-4 text-center">
//                   <select
//                     value={b.status}
//                     onChange={(e) => updateStatus(b._id, e.target.value)}
//                     className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${statusConfig[b.status]}`}
//                   >
//                     {Object.keys(statusConfig).map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 {/* Action */}
//                 <td className="px-4 py-4 text-center">
//                   <button
//                     onClick={() => deleteBooking(b._id)}
//                     className="cursor-pointer p-2 rounded-lg hover:bg-red-100 transition"
//                     title="Delete booking"
//                   >
//                     <Trash2 size={18} className="text-red-600" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-between mt-6">
//           <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//             Prev
//           </button>
//           <span>
//             Page {page} / {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bookings;




//================WITH SERCHING FUNCTINALITY============


import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import {
  Plane,
  User,
  // IndianRupee,
  Ticket,
  Calendar,
  Trash2,
  Filter,
  X,
  DollarSign,
} from "lucide-react";

const statusConfig = {
  FRESH: "bg-blue-100 text-blue-700",
  FOLLOW_UP: "bg-yellow-100 text-yellow-700",
  TICKETING: "bg-purple-100 text-purple-700",
  TICKETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  CHARGEBACK: "bg-gray-200 text-gray-800",
};

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "FRESH", label: "FRESH" },
  { value: "FOLLOW_UP", label: "FOLLOW_UP" },
  { value: "TICKETING", label: "TICKETING" },
  { value: "TICKETED", label: "TICKETED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "CHARGEBACK", label: "CHARGEBACK" },
];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search states
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchPnr, setSearchPnr] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Refs to preserve input focus
  const customerInputRef = useRef(null);
  const pnrInputRef = useRef(null);

  const fetchBookings = async (resetPage = true) => {
    try {
      setLoading(true);
      const currentPage = resetPage ? 1 : page;

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (searchCustomer.trim()) params.customerName = searchCustomer.trim();
      if (searchPnr.trim()) params.pnr = searchPnr.trim();
      if (searchStatus) params.status = searchStatus;

      if (searchDate) {
        const [year, month, day] = searchDate.split("-").map(Number);
        const from = new Date(Date.UTC(year, month - 1, day - 1, 18, 30, 0, 0));
        const to = new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999));
        params.from = from.toISOString();
        params.to = to.toISOString();
      }

      const res = await API.get("/bookings", { params });

      setBookings(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      if (resetPage) setPage(1);
      else setPage(res.data.pagination?.page || 1);
    } catch (err) {
      setBookings([]);
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBookings(false);
  }, []);

  // Debounced search - triggers after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchCustomer, searchPnr, searchDate, searchStatus]);

  // Page change
  useEffect(() => {
    if (page > 1) {
      fetchBookings(false);
    }
  }, [page]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      fetchBookings(false);
    } catch (err) {
      console.error("Status update failed");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings(false);
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const resetFilters = () => {
    setSearchCustomer("");
    setSearchPnr("");
    setSearchDate("");
    setSearchStatus("");
    customerInputRef.current?.focus();
  };

  const hasActiveFilters =
    searchCustomer || searchPnr || searchDate || searchStatus;

  const formatDateInIST = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    return new Date(date.getTime() + istOffsetMs).toLocaleDateString("en-IN");
  };

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex gap-3 items-center text-teal-700">
        <Plane size={36} />
        Flight Bookings
      </h1>

      {/* Search Bar - Always stays mounted */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-teal-600" />
          <h2 className="text-lg font-semibold text-gray-800">Search & Filter</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                ref={customerInputRef}
                type="text"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
                placeholder="Enter name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PNR
            </label>
            <div className="relative">
              <Ticket size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                ref={pnrInputRef}
                type="text"
                value={searchPnr}
                onChange={(e) => setSearchPnr(e.target.value.toUpperCase())}
                placeholder="Enter PNR..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date (IST)
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="cursor-pointer w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="cursor-pointer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={resetFilters}
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition font-medium"
            >
              <X size={18} />
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Table with loading overlay */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-600 border-t-transparent mb-3"></div>
              <p className="text-gray-600 font-medium">Loading bookings...</p>
            </div>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <Ticket size={80} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">
              {hasActiveFilters
                ? "No bookings found for your search."
                : "No bookings available yet."}
            </p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Customer</th>
                  <th className="px-6 py-4 text-center">PNR</th>
                  <th className="px-6 py-4 text-center">Airline</th>
                  {/* <th className="px-6 py-4 text-center">Amount</th> */}
                  <th className="px-6 py-4 text-center">MCO / Profit</th>

                  <th className="px-6 py-4 text-center">Date (IST)</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <User size={20} className="text-gray-500" />
                        <span className="font-medium text-gray-800">
                          {b.customerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-700 uppercase">
                      {b.pnr || "-"}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {b.airline || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-gray-900">
                        {/* <IndianRupee size={16} /> */}
                        <DollarSign size={16} />

                        {/* {Number(b.amount || 0).toLocaleString("en-IN")} */}
                        {(
                          Number(b.sellingPrice || 0) -
                          Number(b.costPrice || 0) -
                          Number(b.otherExpense || 0)
                        ).toLocaleString("en-IN")}

                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        {formatDateInIST(b.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border cursor-pointer transition ${statusConfig[b.status]}`}
                      >
                        {Object.keys(statusConfig).map((s) => (
                          <option key={s} value={s}>
                            {s.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="cursor-pointer p-2 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 py-6 bg-gray-50">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <span className="text-lg font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;