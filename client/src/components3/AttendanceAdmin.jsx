//========correct===============

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AttendanceAdmin() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/attendance");
//         setRecords(res.data || []);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to load attendance:", err);
//         setError("Failed to load attendance records");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Present":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "Absent":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "Half Day":
//         return "bg-orange-100 text-orange-800 border-orange-200";
//       case "Late":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="text-gray-600 text-lg font-medium animate-pulse">
//           Loading attendance records...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-white rounded-2xl shadow border border-red-100">
//         <div className="text-center text-red-600 py-10">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800">Attendance Overview</h2>
//         <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//           {records.length} records
//         </span>
//       </div>

//       {records.length === 0 ? (
//         <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl">
//           <p className="text-lg font-medium">No attendance records found</p>
//           <p className="mt-2 text-sm">Records will appear here once employees start marking attendance</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Employee
//                 </th>
//                 <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-100">
//               {records.map((record) => (
//                 <tr
//                   key={record._id}
//                   className="hover:bg-gray-50 transition-colors duration-150"
//                 >
//                   {/* <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {record.userId?.name || "—"}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {record.userId?.email || "—"}
//                   </td> */}

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {record.user?.name || "—"}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {record.user?.email || "—"}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                     {new Date(record.date).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`
//                         inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border
//                         ${getStatusStyle(record.status)}
//                       `}
//                     >
//                       {record.status || "Unknown"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

//================grok========
// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// export default function AttendanceAdmin() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/attendance"); // or your endpoint for all attendance
//         let data = res.data || [];

//         // Sort by date descending (latest first)
//         data.sort((a, b) => new Date(b.date) - new Date(a.date));

//         setRecords(data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to load attendance:", err);
//         setError("Failed to load attendance records");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   // Get current page records
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

//   // Pagination controls
//   const totalPages = Math.ceil(records.length / recordsPerPage);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "present":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "absent":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "half day":
//       case "late":
//         return "bg-orange-100 text-orange-800 border-orange-200";
//       case "leave":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="text-gray-600 font-medium">Loading attendance records...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 bg-white rounded-2xl shadow border border-red-100 text-center">
//         <p className="text-red-600 text-lg font-medium">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Attendance Overview</h1>
//             <p className="text-gray-600 mt-2">
//               All employees attendance records • {new Date().toLocaleDateString()}
//             </p>
//           </div>
//           <div className="text-sm bg-gray-100 px-4 py-2 rounded-full font-medium">
//             Total Records: {records.length}
//           </div>
//         </div>

//         {records.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">No Attendance Records Yet</h3>
//             <p className="text-gray-500">Records will appear here once employees mark their attendance</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Employee
//                     </th>
//                     <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {currentRecords.map((record) => (
//                     <tr
//                       key={record._id}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className="px-8 py-6 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {record.user?.name || record.userId?.name || "—"}
//                         </div>
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">
//                         {record.user?.email || record.userId?.email || "—"}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-700 font-medium">
//                         {new Date(record.date).toLocaleDateString("en-GB", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap">
//                         <span
//                           className={`
//                             inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border shadow-sm
//                             ${getStatusStyle(record.status)}
//                           `}
//                         >
//                           {record.status || "Absent"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-8 py-6 flex items-center justify-between border-t border-gray-200 bg-gray-50">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                 >
//                   <FiChevronLeft size={16} />
//                   Previous
//                 </button>

//                 <div className="text-sm text-gray-600">
//                   Page <span className="font-bold">{currentPage}</span> of {totalPages}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                 >
//                   Next
//                   <FiChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//===========chat============

import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const PAGE_SIZE = 10;

export default function AttendanceAdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.get("/attendance");
        setRecords(res.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance records");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  /* -------------------- STATUS LOGIC -------------------- */
  const getFinalStatus = (record) => {
    if (record?.isLeaveApproved) return "Leave";
    if (!record?.status) return "Absent";
    return record.status;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 border-green-200";
      case "Absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "Leave":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Half Day":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Late":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  /* -------------------- DATE FILTER -------------------- */
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const recordDate = new Date(r.date);
      if (fromDate && recordDate < new Date(fromDate)) return false;
      if (toDate && recordDate > new Date(toDate)) return false;
      return true;
    });
  }, [records, fromDate, toDate]);

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, page]);

  /* -------------------- CSV DOWNLOAD -------------------- */
  const downloadCSV = () => {
    const headers = ["Name", "Email", "Date", "Status"];
    const rows = filteredRecords.map((r) => [
      r.user?.name || "",
      r.user?.email || "",
      new Date(r.date).toLocaleDateString("en-GB"),
      getFinalStatus(r),
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  /* -------------------- UI STATES -------------------- */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600 text-lg animate-pulse">
        Loading attendance records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow border border-red-100 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Attendance Overview
        </h2>

        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setPage(1);
            }}
            className="cursor-pointer border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(1);
            }}
            className="cursor-pointer border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={downloadCSV}
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Download
          </button>
        </div>
      </div>

      {/* TABLE */}
      {paginatedRecords.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl">
          No records found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Employee", "Email", "Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedRecords.map((record) => {
                const finalStatus = getFinalStatus(record);

                return (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {record.user?.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.user?.email || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(record.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${getStatusStyle(
                          finalStatus
                        )}`}
                      >
                        {finalStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="cursor-pointer px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="px-4 py-1 text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="cursor-pointer px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
