//=============correct=======

// import { useState, useEffect } from 'react';
// import { FiRefreshCw, FiDownload, FiCoffee } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const AllLoginHoursToday = () => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchTodayData = async () => {
//     try {
//       setLoading(true);
//       setRefreshing(true);

//       const res = await api.get('/login-hours/today/all');

//       let data = res.data.data || res.data || [];
//       if (!Array.isArray(data)) data = [data];

//       // Filter out admin
//       const employeeData = data.filter(r =>
//         r.userId?.role?.toLowerCase() !== 'admin'
//       );

//       setRecords(employeeData);

//     } catch (err) {
//       console.error('Fetch error:', err);
//       toast.error('Failed to load today\'s attendance');
//       setRecords([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodayData();
//     const interval = setInterval(fetchTodayData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleRefresh = () => fetchTodayData();

//   // Helpers
//   const formatTime = (dateStr) => {
//     if (!dateStr) return '—';
//     try {
//       return new Date(dateStr).toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//       });
//     } catch {
//       return 'Invalid';
//     }
//   };

//   const calculateDurationMinutes = (start, end = null) => {
//     if (!start) return 0;
//     const endTime = end || new Date();
//     const diffMs = new Date(endTime) - new Date(start);
//     return diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;
//   };

//   const calculateTotalBreakMinutes = (breaks = []) => {
//     let total = 0;
//     breaks.forEach(b => {
//       if (b.start && b.end) {
//         const diff = new Date(b.end) - new Date(b.start);
//         if (diff > 0) total += Math.floor(diff / (1000 * 60));
//       }
//     });
//     return total;
//   };

//   const formatDuration = (minutes) => {
//     if (minutes <= 0) return '0h 0m';
//     const h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     return `${h}h ${m}m`;
//   };

//   const isOnBreak = (record) => {
//     const breaks = record.breaks || [];
//     return breaks.some(b => !b.end && b.status === 'approved');
//   };

//   const exportToCSV = () => {
//   if (records.length === 0) {
//     toast.info("No data to export");
//     return;
//   }

//   const headers = [
//     "Employee Name",
//     "Email",
//     "Login Time",
//     "Logout Time",
//     "Worked Hours",
//     "Break Hours",
//     "Status"
//   ];

//   const csvRows = records.map(record => {
//     const user = record.userId || {};
//     const login = formatTime(record.loginTime);
//     const logout = record.logoutTime ? formatTime(record.logoutTime) : "Ongoing";
//     const workedMin = calculateDurationMinutes(record.loginTime, record.logoutTime);
//     const breakMin = calculateTotalBreakMinutes(record.breaks || []);
//     const status = record.logoutTime ? "Logged Out" : "Logged In";

//     return [
//       `"${user.name || 'Unknown'}"`,
//       `"${user.email || '—'}"`,
//       `"${login}"`,
//       `"${logout}"`,
//       `"${formatDuration(workedMin)}"`,
//       `"${formatDuration(breakMin)}"`,
//       `"${status}"`
//     ].join(",");
//   });

//   const csvContent = [
//     headers.join(","),
//     ...csvRows
//   ].join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", `Today's_Attendance_${new Date().toISOString().split("T")[0]}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   toast.success("CSV downloaded successfully");
// };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Today's Attendance</h1>
//           <p className="text-gray-600 mt-2">
//             Live view of all active employees • {new Date().toLocaleDateString('en-GB', {
//               weekday: 'long',
//               day: 'numeric',
//               month: 'long'
//             })}
//           </p>
//         </div>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className={`cursor-pointer flex items-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm
//               ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
//           >
//             <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={18} />
//             {refreshing ? 'Refreshing...' : 'Refresh'}
//           </button>

         

//           <button
//   onClick={exportToCSV}
//   disabled={loading || records.length === 0}
//   className={`cursor-pointer flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
// >
//   <FiDownload className="mr-2" size={18} />
//   Export CSV
// </button>
//         </div>
//       </div>

//       {/* Main Table Container */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//         {/* Gradient Header */}
//         <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//           <h2 className="text-2xl font-bold">Active Employees Today</h2>
//         </div>

//         {loading ? (
//           <div className="p-16 text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
//             <p className="text-lg text-gray-600">Loading live attendance data...</p>
//           </div>
//         ) : records.length === 0 ? (
//           <div className="p-16 text-center text-gray-500">
//             <FiUsers size={80} className="mx-auto mb-6 text-gray-300" />
//             <p className="text-xl font-medium">No employees have logged in today yet</p>
//             <p className="mt-2">Check back later or refresh the page</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Employee</th>
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Login Time</th>
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Logout Time</th>
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Worked</th>
//                   {/* <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break Time</th> */}
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
//                   {/* <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break Status</th> */}
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">
//                 {records.map((record) => {
//                   const user = record.userId || {};
//                   const isLoggedIn = !!record.loginTime && !record.logoutTime;
//                   const onBreak = isOnBreak(record);

//                   const workedMin = calculateDurationMinutes(record.loginTime, record.logoutTime);
//                   const breakMin = calculateTotalBreakMinutes(record.breaks || []);

//                   return (
//                     <tr
//                       key={record._id}
//                       className="hover:bg-blue-50 transition-all duration-150"
//                     >
//                       <td className="px-8 py-6 whitespace-nowrap">
//                         <div className="flex items-center gap-4">
//                           <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md
//                             ${isLoggedIn ? 'bg-green-600' : 'bg-gray-500'}`}>
//                             {(user.name || '?')[0].toUpperCase()}
//                           </div>
//                           <div>
//                             <div className="text-base font-semibold text-gray-900">{user.name || 'Unknown'}</div>
//                             <div className="text-sm text-gray-500 mt-1">{user.email || '—'}</div>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-700">
//                         {formatTime(record.loginTime)}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
//                         {isLoggedIn ? (
//                           <span className="text-amber-600 font-semibold">Ongoing</span>
//                         ) : formatTime(record.logoutTime)}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap text-base font-semibold text-gray-900">
//                         {formatDuration(workedMin)}
//                       </td>

//                       {/* <td className="px-8 py-6 whitespace-nowrap text-base font-semibold text-gray-900">
//                         {formatDuration(breakMin)}
//                       </td> */}

//                       <td className="px-8 py-6 whitespace-nowrap">
//                         {isLoggedIn ? (
//                           <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-pulse shadow-sm">
//                             Logged In
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
//                             Logged Out
//                           </span>
//                         )}
//                       </td>

//                       {/* <td className="px-8 py-6 whitespace-nowrap">
//                         {onBreak ? (
//                           <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium shadow-sm animate-pulse">
//                             <FiCoffee size={16} /> On Break
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
//                             Available
//                           </span>
//                         )}
//                       </td> */}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Helper functions (unchanged)
// const calculateDurationMinutes = (start, end = null) => {
//   if (!start) return 0;
//   const endTime = end || new Date();
//   const diffMs = new Date(endTime) - new Date(start);
//   return diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;
// };

// const calculateTotalBreakMinutes = (breaks = []) => {
//   let total = 0;
//   breaks.forEach(b => {
//     if (b.start && b.end) {
//       const diff = new Date(b.end) - new Date(b.start);
//       if (diff > 0) total += Math.floor(diff / (1000 * 60));
//     }
//   });
//   return total;
// };

// const formatDuration = (minutes) => {
//   if (minutes <= 0) return '0h 0m';
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;
//   return `${h}h ${m}m`;
// };

// export default AllLoginHoursToday;

//-----------------chat---------


import { useState, useEffect } from "react";
import {
  FiRefreshCw,
  FiDownload,
  FiUsers,
} from "react-icons/fi";
import api from "../api/axios";
import toast from "react-hot-toast";

/* -------------------- HELPERS -------------------- */
const formatTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const minutesBetween = (start, end = null) => {
  if (!start) return 0;
  const endTime = end || new Date();
  const diff = new Date(endTime) - new Date(start);
  return diff > 0 ? Math.floor(diff / 60000) : 0;
};

const formatDuration = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
};

/* -------------------- COMPONENT -------------------- */
const AllLoginHoursToday = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodayData = async () => {
    try {
      setRefreshing(true);
      const res = await api.get("/login-hours/today/all");

      let data = res.data?.data || res.data || [];
      if (!Array.isArray(data)) data = [data];

      // remove admin users
      const employees = data.filter(
        (r) => r.userId?.role?.toLowerCase() !== "admin"
      );

      setRecords(employees);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load today's attendance");
      setRecords([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTodayData();
    const interval = setInterval(fetchTodayData, 30000);
    return () => clearInterval(interval);
  }, []);

  /* -------------------- CSV EXPORT -------------------- */
  const exportCSV = () => {
    if (!records.length) return toast("No data to export");

    const headers = [
      "Employee",
      "Email",
      "Login Time",
      "Logout Time",
      "Worked Hours",
      "Status",
    ];

    const rows = records.map((r) => {
      const worked = minutesBetween(r.loginTime, r.logoutTime);
      return [
        r.userId?.name || "Unknown",
        r.userId?.email || "—",
        formatTime(r.loginTime),
        r.logoutTime ? formatTime(r.logoutTime) : "Ongoing",
        formatDuration(worked),
        r.logoutTime ? "Logged Out" : "Logged In",
      ].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Attendance_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast.success("CSV downloaded");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Today’s Attendance
          </h1>
          <p className="text-gray-600 mt-1">
            Live employee login tracking •{" "}
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchTodayData}
            disabled={refreshing}
            className="cursor-pointer flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm disabled:opacity-60"
          >
            <FiRefreshCw
              className={`mr-2 ${refreshing && "animate-spin"}`}
            />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            disabled={!records.length}
            className="cursor-pointer flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md disabled:opacity-50"
          >
            <FiDownload className="mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-xl font-semibold">
            Logged In Employees
          </h2>
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-600">
            <div className="animate-spin h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading attendance data...
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <FiUsers size={64} className="mx-auto mb-4 text-gray-300" />
            No employee has logged in today
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  {["Employee", "Login", "Logout", "Worked", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y">
                {records.map((r) => {
                  const worked = minutesBetween(
                    r.loginTime,
                    r.logoutTime
                  );
                  const loggedIn = r.loginTime && !r.logoutTime;

                  return (
                    <tr
                      key={r._id}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {r.userId?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {r.userId?.email || "—"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {formatTime(r.loginTime)}
                      </td>

                      <td className="px-6 py-4">
                        {loggedIn ? (
                          <span className="text-amber-600 font-medium">
                            Ongoing
                          </span>
                        ) : (
                          formatTime(r.logoutTime)
                        )}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {formatDuration(worked)}
                      </td>

                      <td className="px-6 py-4">
                        {loggedIn ? (
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                            Logged In
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                            Logged Out
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLoginHoursToday;
