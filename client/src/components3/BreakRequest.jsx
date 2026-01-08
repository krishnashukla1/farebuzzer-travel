

// import { useState, useEffect } from 'react';
// import { FiCoffee, FiClock, FiAlertCircle, FiCheck, FiX, FiLogIn } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const BreakRequest = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [breakHistory, setBreakHistory] = useState([]);
//   const [pendingRequest, setPendingRequest] = useState(null);

//   const fetchBreakData = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/login-hours/today');
      
//       // Check the actual API response structure
//       console.log('API Response:', response.data);
      
//       // The API might return data differently - adjust based on actual response
//       const data = response.data.data || response.data;
//       setStats(data);
      
//       // Get break history - check both possible property names
//       const breaks = data.allBreaks || data.breaks || [];
//       setBreakHistory(breaks);
      
//       // Check for pending request
//       const pending = breaks.find(b => b.status === 'pending');
//       setPendingRequest(pending);
      
//     } catch (error) {
//       console.error('Error fetching break data:', error);
//       toast.error('Failed to load break data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBreakData();
    
//     // Refresh data every 30 seconds
//     const interval = setInterval(fetchBreakData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleRequestBreak = async () => {
//     try {
//       setLoading(true);
//       const response = await api.post('/login-hours/break/request');
      
//       if (response.data.autoApproved) {
//         toast.success('Break started automatically!');
//       } else if (response.data.pending) {
//         toast.success('Break request sent for approval');
//       }
      
//       fetchBreakData();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to request break');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const response = await api.post('/login-hours/login');
//       toast.success(response.data.message);
//       fetchBreakData();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEndBreak = async () => {
//     try {
//       setLoading(true);
//       const response = await api.post('/login-hours/break/end');
//       toast.success(response.data.message);
//       fetchBreakData();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to end break');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelRequest = async () => {
//     if (!pendingRequest) return;
    
//     try {
//       setLoading(true);
//       // You need to get the user ID from localStorage or stats
//       const userId = stats?.userId || localStorage.getItem('userId');
      
//       // Check if reviewBreak endpoint exists in your API
//       await api.post('/login-hours/break/review', {
//         userId: userId,
//         breakId: pendingRequest.id || pendingRequest._id,
//         action: 'reject',
//         rejectReason: 'Cancelled by employee'
//       });
      
//       toast.success('Break request cancelled');
//       fetchBreakData();
//     } catch (error) {
//       toast.error('Failed to cancel request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to determine if user is logged in
//   const isUserLoggedIn = () => {
//     if (!stats) return false;
    
//     // Check multiple possible properties
//     if (stats.isLoggedIn !== undefined) return stats.isLoggedIn;
//     if (stats.loggedIn !== undefined) return stats.loggedIn;
    
//     // Determine from login/logout times
//     if (stats.loginTime && !stats.logoutTime) return true;
    
//     return false;
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch (error) {
//       return 'Invalid time';
//     }
//   };

//   const calculateDuration = (start, end) => {
//     if (!start) return 'N/A';
//     if (!end) return 'Ongoing';
    
//     try {
//       const startTime = new Date(start);
//       const endTime = new Date(end);
//       const diffMs = endTime - startTime;
//       const diffMins = Math.floor(diffMs / (1000 * 60));
      
//       if (diffMins < 60) {
//         return `${diffMins} min`;
//       } else {
//         const hours = Math.floor(diffMins / 60);
//         const mins = diffMins % 60;
//         return `${hours}h ${mins}m`;
//       }
//     } catch (error) {
//       return 'Error';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Calculate free breaks left
//   const freeBreaksLeft = () => {
//     if (!stats) return 3;
    
//     const approvedBreaks = breakHistory.filter(b => b.status === 'approved').length;
//     return Math.max(0, 3 - approvedBreaks);
//   };

//   const formatHoursToHrsMins = (hours) => {
//   if (!hours || isNaN(hours)) return "0 hrs 0 mins";

//   const totalMinutes = Math.round(Number(hours) * 60);
//   const hrs = Math.floor(totalMinutes / 60);
//   const mins = totalMinutes % 60;

//   return `${hrs} hrs ${mins} mins`;
// };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Break Management</h1>
//             <p className="text-gray-600 mt-2">
//               Request and manage your breaks for today
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Free breaks left</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {freeBreaksLeft()}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <FiCoffee className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Current Status */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Login Status</p>
//               <p className={`text-xl font-bold mt-2 ${
//                 isUserLoggedIn() ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 {isUserLoggedIn() ? 'LOGGED IN' : 'NOT LOGGED IN'}
//               </p>
//             </div>
//             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//               isUserLoggedIn() ? 'bg-green-100' : 'bg-red-100'
//             }`}>
//               {isUserLoggedIn() ? (
//                 <FiCheck className="w-5 h-5 text-green-600" />
//               ) : (
//                 <FiX className="w-5 h-5 text-red-600" />
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Today's Breaks</p>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {stats?.breakCount || breakHistory?.length || 0}
//               </p>
//             </div>
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <FiClock className="w-5 h-5 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Break Time</p>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {/* {stats?.breakHours || '0.00'} hrs */}
//                   {formatHoursToHrsMins(stats?.breakHours)}
//               </p>
//             </div>
//             <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//               <FiClock className="w-5 h-5 text-indigo-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Section - FIXED LOGIC */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Take a Break</h2>
        
//         {/* User is NOT logged in */}
//         {!isUserLoggedIn() ? (
//           <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <FiLogIn className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">Start Your Shift First</p>
//                   <p className="text-sm text-gray-600">
//                     You need to log in before taking breaks
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogin}
//                 disabled={loading}
//                 className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
//               >
//                 {loading ? 'Logging in...' : 'Login Now'}
//               </button>
//             </div>
//           </div>
//         ) : 
        
//         /* User has a pending break request */
//         pendingRequest ? (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <FiAlertCircle className="w-6 h-6 text-yellow-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">Break Request Pending</p>
//                   <p className="text-sm text-gray-600">
//                     Requested at {formatTime(pendingRequest.requestedAt || pendingRequest.createdAt)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleCancelRequest}
//                 disabled={loading}
//                 className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//               >
//                 Cancel Request
//               </button>
//             </div>
//           </div>
//         ) : 
        
//         /* User is currently on break */
//         stats?.isOnBreak ? (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <FiCoffee className="w-6 h-6 text-yellow-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">Currently on Break</p>
//                   <p className="text-sm text-gray-600">
//                     Started at {formatTime(stats.currentBreak?.start)}
//                     {stats.currentBreak?.duration && ` (${stats.currentBreak.duration})`}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleEndBreak}
//                 disabled={loading}
//                 className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? 'Ending...' : 'End Break'}
//               </button>
//             </div>
//           </div>
//         ) : 
        
//         /* User is logged in and can request a break */
//         (
//           <div className="space-y-4">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                   <FiCoffee className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-800">Break Information</p>
//                   <p className="text-sm text-gray-600">
//                     First 3 breaks are auto-approved (15 minutes each). 
//                     Additional breaks require supervisor approval.
//                     {freeBreaksLeft() > 0 && ` You have ${freeBreaksLeft()} free breaks left.`}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={handleRequestBreak}
//               disabled={loading}
//               className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
//             >
//               {loading ? 'Processing...' : 'Request Break'}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Break History */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-800">Break History (Today)</h2>
//           <span className="text-sm text-gray-600">
//             Total: {breakHistory.length} breaks
//           </span>
//         </div>
        
//         {breakHistory.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCoffee className="w-8 h-8 text-gray-400" />
//             </div>
//             <p className="text-gray-600">No breaks taken today</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Start Time
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     End Time
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Duration
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {breakHistory.map((breakItem, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatTime(breakItem.start)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {breakItem.end ? formatTime(breakItem.end) : '—'}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {calculateDuration(breakItem.start, breakItem.end)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {breakItem.autoEnded ? 'Auto-ended' : 'Manual'}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(breakItem.status)}`}>
//                         {breakItem.status || 'unknown'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BreakRequest;

//==========

// import { useEffect, useState } from "react";
// import { FiCoffee, FiClock, FiCheck, FiX } from "react-icons/fi";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// const BreakRequest = () => {
//   const [stats, setStats] = useState(null);
//   const [breakHistory, setBreakHistory] = useState([]);
//   const [pendingRequest, setPendingRequest] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ AUTH comes ONLY from token
//   const isAuthenticated = !!localStorage.getItem("token");

//   // ✅ Attendance state
//   const hasActiveShift = stats?.loginTime && !stats?.logoutTime;
//   const isOnBreak = stats?.isOnBreak === true;

//   const fetchBreakData = async () => {
//     if (!isAuthenticated) return;

//     try {
//       setLoading(true);
//       const res = await api.get("/login-hours/today");

//       const data = res.data.data || res.data;
//       setStats(data);

//       const breaks = data.breaks || data.allBreaks || [];
//       setBreakHistory(breaks);

//       const pending = breaks.find(b => b.status === "pending");
//       setPendingRequest(pending || null);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load break data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBreakData();
//   }, []);

//   // 🔹 START SHIFT (attendance only)
//   const handleStartShift = async () => {
//     try {
//       setLoading(true);
//       await api.post("/login-hours/login");
//       toast.success("Shift started");
//       fetchBreakData();
//     } catch {
//       toast.error("Failed to start shift");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 REQUEST BREAK
//   const handleRequestBreak = async () => {
//     try {
//       setLoading(true);
//       await api.post("/login-hours/break/request");
//       toast.success("Break started / requested");
//       fetchBreakData();
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Break request failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 END BREAK
//   const handleEndBreak = async () => {
//     try {
//       setLoading(true);
//       await api.post("/login-hours/break/end");
//       toast.success("Break ended");
//       fetchBreakData();
//     } catch {
//       toast.error("Failed to end break");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 TIME FORMAT
//   const formatTime = (d) =>
//     d ? new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—";

//   const formatDuration = (start, end) => {
//     if (!start) return "—";
//     const e = end ? new Date(end) : new Date();
//     const mins = Math.floor((e - new Date(start)) / 60000);
//     return `${Math.floor(mins / 60)}h ${mins % 60}m`;
//   };

//   // 🚫 NOT AUTHENTICATED
//   if (!isAuthenticated) {
//     return (
//       <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
//         <p className="font-semibold text-red-600">
//           Please login from main login page.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">

//       {/* STATUS */}
//       <div className="bg-white p-6 rounded-xl shadow flex justify-between">
//         <div>
//           <p className="text-sm text-gray-500">Shift Status</p>
//           <p className={`font-bold ${hasActiveShift ? "text-green-600" : "text-red-600"}`}>
//             {hasActiveShift ? "IN PROGRESS" : "NOT STARTED"}
//           </p>
//         </div>
//         <div>
//           {hasActiveShift ? (
//             <FiCheck className="text-green-600 w-6 h-6" />
//           ) : (
//             <FiX className="text-red-600 w-6 h-6" />
//           )}
//         </div>
//       </div>

//       {/* ACTION */}
//       {!hasActiveShift ? (
//         <button
//           onClick={handleStartShift}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg"
//         >
//           Start Shift
//         </button>
//       ) : isOnBreak ? (
//         <button
//           onClick={handleEndBreak}
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-3 rounded-lg"
//         >
//           End Break
//         </button>
//       ) : (
//         <button
//           onClick={handleRequestBreak}
//           disabled={loading || pendingRequest}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg"
//         >
//           Request Break
//         </button>
//       )}

//       {/* BREAK HISTORY */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h3 className="font-semibold mb-4">Today’s Breaks</h3>
//         {breakHistory.length === 0 ? (
//           <p className="text-gray-500">No breaks today</p>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500">
//                 <th>Start</th>
//                 <th>End</th>
//                 <th>Duration</th>
//               </tr>
//             </thead>
//             <tbody>
//               {breakHistory.map((b, i) => (
//                 <tr key={i} className="border-t">
//                   <td>{formatTime(b.start)}</td>
//                   <td>{formatTime(b.end)}</td>
//                   <td>{formatDuration(b.start, b.end)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BreakRequest;

// import { useEffect, useState, useRef } from "react";
// import { FiCoffee, FiPlay } from "react-icons/fi";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// import { FiX } from "react-icons/fi";        // Stop / close
// import { FiPause } from "react-icons/fi";   // Pause / break
// import { FiSlash } from "react-icons/fi";   // End / cancel


// const BreakRequest = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [breakSeconds, setBreakSeconds] = useState(0);
//   const timerRef = useRef(null);

//   const isAuthenticated = !!localStorage.getItem("token");

//   const fetchStats = async () => {
//     try {
//       const res = await api.get("/login-hours/today");
//       const data = res.data.data;
//       setStats(data);

//       // active break detection
//       const active = data?.breaks?.find(
//         b => !b.end && b.status === "approved"
//       );

//       if (active?.start) {
//         const diff =
//           Math.floor((Date.now() - new Date(active.start)) / 1000);
//         setBreakSeconds(diff);
//       } else {
//         setBreakSeconds(0);
//       }
//     } catch (err) {
//       toast.error("Failed to load break data");
//     }
//   };

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (stats?.breaks?.some(b => !b.end && b.status === "approved")) {
//       timerRef.current = setInterval(() => {
//         setBreakSeconds(prev => prev + 1);
//       }, 1000);
//     } else {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     return () => clearInterval(timerRef.current);
//   }, [stats]);

//   useEffect(() => {
//     if (isAuthenticated) fetchStats();
//   }, []);

//   /* ================= ACTIONS ================= */
//   const startBreak = async () => {
//     try {
//       setLoading(true);
//       await api.post("/login-hours/break/request");
//       toast.success("Break started");
//       fetchStats();
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Failed to start break");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const endBreak = async () => {
//     try {
//       setLoading(true);
//       await api.post("/login-hours/break/end");
//       toast.success("Break ended");
//       fetchStats();
//     } catch {
//       toast.error("Failed to end break");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= HELPERS ================= */
//   const formatDuration = (sec) => {
//     const h = Math.floor(sec / 3600);
//     const m = Math.floor((sec % 3600) / 60);
//     const s = sec % 60;
//     return `${h.toString().padStart(2, "0")}:${m
//       .toString()
//       .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   if (!isAuthenticated) return null;

//   const activeBreak = stats?.breaks?.find(
//     b => !b.end && b.status === "approved"
//   );

//   return (
//     <div className="space-y-6">

//       {/* STATUS */}
//       <div className="bg-white p-5 rounded-xl shadow">
//         <p className="text-sm text-gray-500">Break Status</p>
//         <p className={`font-bold ${activeBreak ? "text-orange-600" : "text-green-600"}`}>
//           {activeBreak ? "ON BREAK" : "WORKING"}
//         </p>
//       </div>

//       {/* ACTION */}
//       {activeBreak ? (
//         <button
//           onClick={endBreak}
//           disabled={loading}
//           className="w-full bg-red-600 text-white py-3 rounded-lg flex justify-center gap-2"
//         >
//           <FiStop /> End Break
//         </button>
//       ) : (
//         <button
//           onClick={startBreak}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center gap-2"
//         >
//           <FiPlay /> Start Break
//         </button>
//       )}

//       {/* TIMER */}
//       {activeBreak && (
//         <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl text-center">
//           <p className="text-sm text-orange-600 mb-1">Current Break Time</p>
//           <p className="text-2xl font-bold text-orange-700">
//             {formatDuration(breakSeconds)}
//           </p>
//         </div>
//       )}

//       {/* SUMMARY */}
//       <div className="bg-white p-5 rounded-xl shadow">
//         <p className="text-sm text-gray-500 mb-2">Today Summary</p>
//         <p>Worked Time: <b>{stats?.workedHours?.toFixed(2)} hrs</b></p>
//         <p>Break Time: <b>{stats?.breakMinutes} mins</b></p>
//         <p>Status: <b>{stats?.status}</b></p>
//       </div>
//     </div>
//   );
// };

// export default BreakRequest;


import api from "../api/axios";

const LoginControls = ({ refresh }) => {
  return (
    <>
      <button onClick={() => api.post("/login-hours/login").then(refresh)}>
        Login
      </button>

      <button onClick={() => api.post("/login-hours/break/start").then(refresh)}>
        Start Break
      </button>

      <button onClick={() => api.post("/login-hours/break/end").then(refresh)}>
        End Break
      </button>

      <button onClick={() => api.post("/login-hours/logout").then(refresh)}>
        Logout
      </button>
    </>
  );
};

export default LoginControls;



