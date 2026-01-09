// import { useState, useEffect } from 'react';
// import { FiCoffee, FiClock, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
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
//       const response = await api.getTodayStats();
//       setStats(response.data.data);

//       // Get break history
//       if (response.data.data.allBreaks) {
//         setBreakHistory(response.data.data.allBreaks);
//       }

//       // Check for pending request
//       const pending = response.data.data.allBreaks?.find(
//         (b) => b.status === 'pending'
//       );
//       setPendingRequest(pending);
//     } catch (error) {
//       toast.error('Failed to load break data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBreakData();
//   }, []);

//   const handleRequestBreak = async () => {
//     try {
//       setLoading(true);
//       const response = await api.requestBreak();

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

//   const handleCancelRequest = async () => {
//     if (!pendingRequest) return;

//     try {
//       setLoading(true);
//       // Note: You need to add a cancel endpoint in your backend
//       // For now, we'll use the reject endpoint
//       await api.reviewBreak({
//         userId: localStorage.getItem('userId'),
//         breakId: pendingRequest.id,
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

//   const formatTime = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const calculateDuration = (start, end) => {
//     if (!start || !end) return 'Ongoing';

//     const startTime = new Date(start);
//     const endTime = new Date(end);
//     const diffMs = endTime - startTime;
//     const diffMins = Math.floor(diffMs / (1000 * 60));

//     if (diffMins < 60) {
//       return `${diffMins} min`;
//     } else {
//       const hours = Math.floor(diffMins / 60);
//       const mins = diffMins % 60;
//       return `${hours}h ${mins}m`;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

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
//                 {stats ? Math.max(0, 3 - (stats.freeBreaksUsed || 0)) : 3}
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
//               <p className="text-sm text-gray-600">Current Status</p>
//               <p className={`text-xl font-bold mt-2 ${
//                 stats?.isOnBreak ? 'text-yellow-600' : 'text-green-600'
//               }`}>
//                 {stats?.isOnBreak ? 'ON BREAK' : 'ACTIVE'}
//               </p>
//             </div>
//             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//               stats?.isOnBreak ? 'bg-yellow-100' : 'bg-green-100'
//             }`}>
//               {stats?.isOnBreak ? (
//                 <FiCoffee className="w-5 h-5 text-yellow-600" />
//               ) : (
//                 <FiCheck className="w-5 h-5 text-green-600" />
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Today's Breaks</p>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {stats?.breakCount || 0}
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
//                 {stats?.breakHours || '0.00'} hrs
//               </p>
//             </div>
//             <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//               <FiClock className="w-5 h-5 text-indigo-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Section */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Take a Break</h2>

//         {pendingRequest ? (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <FiAlertCircle className="w-5 h-5 text-yellow-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">Break Request Pending</p>
//                   <p className="text-sm text-gray-600">
//                     Requested at {formatTime(pendingRequest.requestedAt)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleCancelRequest}
//                 disabled={loading}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//               >
//                 Cancel Request
//               </button>
//             </div>
//           </div>
//         ) : stats?.isOnBreak ? (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <FiCoffee className="w-5 h-5 text-yellow-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">Currently on Break</p>
//                   <p className="text-sm text-gray-600">
//                     Started at {formatTime(stats.currentBreak?.start)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => window.location.href = '/login-status'}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 End Break
//               </button>
//             </div>
//           </div>
//         ) : (
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
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex space-x-4">
//               <button
//                 onClick={handleRequestBreak}
//                 disabled={loading || !stats?.isLoggedIn}
//                 className={`flex-1 py-3 rounded-lg font-medium ${
//                   stats?.isLoggedIn
//                     ? 'bg-blue-600 text-white hover:bg-blue-700'
//                     : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 } disabled:opacity-50`}
//               >
//                 {loading ? 'Processing...' : 'Request Break'}
//               </button>

//               {!stats?.isLoggedIn && (
//                 <button
//                   onClick={() => toast.error('Please login first')}
//                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                 >
//                   Login Required
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Break History */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-6">Break History (Today)</h2>

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
//                         {breakItem.status}
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

//=====================================

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

//=========================full correct================

import { useState, useEffect } from 'react';
import {
  FiCoffee, FiClock, FiAlertCircle, FiCheck, FiX, FiLogIn, FiLogOut
} from 'react-icons/fi';
import api from '../api/axios';
import toast from 'react-hot-toast';

const BreakRequest = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breakHistory, setBreakHistory] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);

  // ✅ FIXED: formatDurationNice function (was missing)
  const formatDurationNice = (hoursDecimal) => {
    if (hoursDecimal == null || isNaN(hoursDecimal)) return '0h 0m';
    const totalMinutes = Math.round(hoursDecimal * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0 && minutes === 0) return '0h 0m';
    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  // Fetch today's shift + break data
  const fetchBreakData = async () => {
    try {
      setLoading(true);
      const response = await api.loginHours.getTodayStats(); // ✅ Use correct API method
      const data = response.data.data || response.data;
      setStats(data);

      // Handle breaks from response
      const breaks = data.allBreaks || data.breaks || [];
      setBreakHistory(breaks);

      // Find pending request
      const pending = breaks.find(b => b.status === 'pending');
      setPendingRequest(pending);

    } catch (error) {
      console.error('Error fetching break data:', error);
      toast.error(error.response?.data?.message || 'Failed to load break & login status');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreakData();
    const interval = setInterval(fetchBreakData, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // ✅ FIXED: Proper login status check
  const isLoggedIn = () => {
    if (!stats) return false;
    // Check backend response structure
    return stats.isLoggedIn !== undefined
      ? stats.isLoggedIn
      : (stats.loginTime && !stats.logoutTime);
  };

  const isOnBreak = () => !!stats?.isOnBreak;

  // ✅ FIXED: Login handler
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await api.loginHours.login();
      toast.success(response.data.message || 'Shift started successfully!');
      fetchBreakData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed - shift already started?');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Request break handler
  const handleRequestBreak = async () => {
    if (!isLoggedIn()) {
      toast.error('Please login first');
      return;
    }

    try {
      setLoading(true);
      const response = await api.loginHours.requestBreak();

      if (response.data.autoApproved) {
        toast.success(`Break #${response.data.break?.approvedBreaks || 1} started!`);
      } else if (response.data.pending) {
        toast.success('Break request sent for supervisor approval');
      }
      fetchBreakData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to request break');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: End break handler
  const handleEndBreak = async () => {
    try {
      setLoading(true);
      const response = await api.loginHours.endBreak();
      toast.success('Break ended successfully');
      fetchBreakData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to end break');
    } finally {
      setLoading(false);
    }
  };

  // Format helpers
  const formatTime = (dateString) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });
    } catch {
      return 'Invalid';
    }
  };

  const calculateDuration = (start, end) => {
    if (!start) return '—';
    if (!end) return 'Ongoing';
    try {
      const diffMs = new Date(end) - new Date(start);
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 60) return `${diffMins} min`;
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    } catch {
      return 'Error';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Free breaks calculation
  const freeBreaksLeft = stats?.allBreaks
    ? Math.max(0, 5 - stats.allBreaks.filter(b => b.status === 'approved').length)
    : 5;

  if (loading && !stats) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Break Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your shift breaks • {freeBreaksLeft}/5 free breaks left</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-500">Free breaks</p>
              <p className="text-3xl font-bold text-blue-600">{freeBreaksLeft}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiCoffee className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shift Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Shift Status</p>
              <p className={`text-2xl font-bold ${isLoggedIn() ? 'text-green-600' : 'text-red-600'
                }`}>
                {isLoggedIn() ? 'ACTIVE SHIFT' : 'NOT STARTED'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isLoggedIn()
                  ? `Since ${formatTime(stats.loginTime)}`
                  : 'Click Login to start tracking'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLoggedIn() ? 'bg-green-100' : 'bg-red-100'
              }`}>
              {isLoggedIn() ? (
                <FiLogIn className="w-6 h-6 text-green-600" />
              ) : (
                <FiLogOut className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        {/* Current Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Activity</p>
              <p className={`text-2xl font-bold ${isOnBreak() ? 'text-yellow-600' : 'text-emerald-600'
                }`}>
                {isOnBreak() ? 'ON BREAK' : 'WORKING'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isOnBreak() ? 'bg-yellow-100' : 'bg-emerald-100'
              }`}>
              {isOnBreak() ? (
                <FiCoffee className="w-6 h-6 text-yellow-600" />
              ) : (
                <FiCheck className="w-6 h-6 text-emerald-600" />
              )}
            </div>
          </div>
        </div>

        {/* Break Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Today's Breaks</p>
              <p className="text-2xl font-bold text-gray-800">
                {breakHistory.filter(b => b.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDurationNice(stats?.breakHours || 0)} total
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Action */}
      {/* <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <FiCoffee className="w-7 h-7 text-purple-600" />
          Take a Break
        </h2>

        {!isLoggedIn() ? (
          // ✅ PROMINENT LOGIN BUTTON
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl p-10 text-center shadow-2xl">
            <FiLogIn className="w-20 h-20 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Start Your Shift</h3>
            <p className="text-xl mb-8 opacity-90">
              Login to your shift before taking breaks
            </p>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="cursor-pointer px-12 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-60"
            >
              {loading ? 'Starting...' : 'LOGIN NOW →'}
            </button>
          </div>
        ) : pendingRequest ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <FiAlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Request Pending</h3>
                  <p className="text-gray-600">
                    Requested {formatTime(pendingRequest.requestedAt)} • Waiting for approval
                  </p>
                </div>
              </div>
              <button className="cursor-pointer px-8 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700">
                Cancel Request
              </button>
            </div>
          </div>
        ) : isOnBreak() ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <FiCoffee className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">On Break</h3>
                  <p className="text-gray-600">
                    Started {formatTime(stats.currentBreak?.start)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEndBreak}
                disabled={loading}
                className="cursor-pointer px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all"
              >
                {loading ? 'Ending...' : 'END BREAK'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiCoffee className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">Break Rules</h4>
                  <p className="text-sm text-gray-600">
                    • First 5 breaks auto-approved (15 min max each)<br/>
                    • Extra breaks need supervisor OK<br/>
                    • {freeBreaksLeft} free breaks left today
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleRequestBreak}
              disabled={loading}
              className="cursor-pointer w-full py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:from-purple-600 hover:to-purple-700 hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
            >
              {loading ? 'Requesting...' : `Take Break #${6 - freeBreaksLeft}`}
            </button>
          </div>
        )}
      </div> */}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
          <FiCoffee className="w-6 h-6 text-purple-600" />
          Take a Break
        </h2>

        {!isLoggedIn() ? (
          // Compact login prompt
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 text-center">
            <p className="text-gray-700 font-medium mb-3">
              Start your shift to take breaks
            </p>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="cursor-pointer px-8 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:opacity-60 transition shadow-sm"
            >
              {loading ? 'Starting...' : 'Login Now'}
            </button>
          </div>
        ) : pendingRequest ? (
          // Compact pending state
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">Pending Approval</p>
                <p className="text-xs text-gray-600">
                  Requested {formatTime(pendingRequest.requestedAt)}
                </p>
              </div>
            </div>
            <button className="cursor-pointer px-5 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
              Cancel
            </button>
          </div>
        ) : isOnBreak() ? (
          // Compact on-break state
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiCoffee className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">On Break</p>
                <p className="text-xs text-gray-600">
                  Started {formatTime(stats.currentBreak?.start)}
                </p>
              </div>
            </div>
            <button
              onClick={handleEndBreak}
              disabled={loading}
              className="cursor-pointer px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Ending...' : 'End Break'}
            </button>
          </div>
        ) : (
          // Compact request break
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
              <p className="font-medium text-gray-800 mb-1">Break Policy</p>
              <p className="text-gray-600">
                First 5 breaks auto-approved • {freeBreaksLeft} free left
              </p>
            </div>

            <button
              onClick={handleRequestBreak}
              disabled={loading}
              className="cursor-pointer w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-60 transition shadow-sm"
            >
              {loading ? 'Requesting...' : `Request Break #${6 - freeBreaksLeft}`}
            </button>
          </div>
        )}
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Break History Today</h2>
        {breakHistory.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <FiCoffee className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No breaks yet</p>
            <p className="text-gray-400 mt-2">{isLoggedIn() ? 'Take your first!' : 'Login first'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Break</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {breakHistory.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">#{i + 1}</td>
                    <td className="px-6 py-4 text-sm">
                      {formatTime(b.start)} {b.end && `→ ${formatTime(b.end)}`}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {calculateDuration(b.start, b.end)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-2 text-xs font-bold rounded-full ${getStatusColor(b.status)}`}>
                        {b.status?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ FIXED: Default export
export default BreakRequest;