// import React, { useState, useEffect } from 'react';
// import api from "../api/axios";
// import moment from 'moment';

// const MyLoginStatus = () => {
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentTime, setCurrentTime] = useState(moment());

//   // Refresh current time every minute
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(moment());
//     }, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const fetchMyStatus = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await api.get("/login-hours/today");
//       setStatus(res.data);
//     } catch (err) {
//       console.error("Failed to fetch status:", err);
//       setError(
//         err?.response?.data?.message || 
//         "Failed to load your attendance status"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyStatus();
//     const interval = setInterval(fetchMyStatus, 30000); // auto-refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const handleAction = async (action) => {
//     if (actionLoading) return;

//     const actionName = action.includes('break') 
//       ? action.replace('break/', '').toUpperCase() + ' Break'
//       : action.toUpperCase();

//     if (!window.confirm(`Confirm ${actionName}?`)) return;

//     setActionLoading(true);

//     try {
//       await api.post(`login-hours/${action}`);
//       await fetchMyStatus();
//     } catch (err) {
//       alert(
//         err?.response?.data?.message || 
//         `Failed to ${actionName.toLowerCase()}`
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (seconds == null || isNaN(seconds)) return '—';
//     const duration = moment.duration(seconds, 'seconds');
//     const hours = Math.floor(duration.asHours());
//     const minutes = duration.minutes();
//     return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center">
//         <div className="text-gray-600 animate-pulse text-lg">
//           Loading your status...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
//           <strong>Error:</strong> {error}
//           <button
//             onClick={fetchMyStatus}
//             className="ml-4 text-red-800 underline hover:text-red-900"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!status) {
//     return (
//       <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">
//         No attendance record found for today
//       </div>
//     );
//   }

//   const isLoggedIn = !!status.loginTime && !status.logoutTime;
//   const isOnBreak = status.currentBreak?.start && !status.currentBreak?.end;

//   return (
//     <div className="max-w-3xl mx-auto p-4 sm:p-6">
//       <div className="text-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">My Attendance Status</h2>
//         <div className="text-sm text-gray-500 mt-1">
//           {currentTime.format('dddd, MMMM D, YYYY • HH:mm')}
//         </div>
//       </div>

//       <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-100">
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
//           {/* Status */}
//           <div className="text-center">
//             <div className="text-sm text-gray-500 mb-1">Status</div>
//             <div className={`text-2xl font-bold ${isLoggedIn ? 'text-green-600' : 'text-gray-600'}`}>
//               {isLoggedIn ? 'Logged In' : 'Logged Out'}
//             </div>
//           </div>

//           {/* Break */}
//           <div className="text-center">
//             <div className="text-sm text-gray-500 mb-1">Break</div>
//             <div className={`text-2xl font-bold ${isOnBreak ? 'text-yellow-600 animate-pulse' : 'text-gray-600'}`}>
//               {isOnBreak ? 'ON BREAK' : 'Available'}
//             </div>
//           </div>

//           {/* Work Time */}
//           <div className="text-center">
//             <div className="text-sm text-gray-500 mb-1">Work Today</div>
//             <div className="text-2xl font-semibold text-gray-800">
//               {formatDuration(status.workedSecondsToday)}
//             </div>
//           </div>

//           {/* Break Time */}
//           <div className="text-center">
//             <div className="text-sm text-gray-500 mb-1">Break Today</div>
//             <div className="text-2xl font-semibold text-gray-800">
//               {formatDuration(status.breakSecondsToday)}
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap justify-center gap-4">
//           {isLoggedIn ? (
//             <>
//               <button
//                 onClick={() => handleAction('break/start')}
//                 disabled={actionLoading || isOnBreak}
//                 className={`min-w-[140px] px-6 py-3 rounded-xl font-medium text-white transition-all
//                   ${isOnBreak 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-yellow-500 hover:bg-yellow-600 shadow-md'}`}
//               >
//                 Start Break
//               </button>

//               <button
//                 onClick={() => handleAction('break/end')}
//                 disabled={actionLoading || !isOnBreak}
//                 className={`min-w-[140px] px-6 py-3 rounded-xl font-medium text-white transition-all
//                   ${!isOnBreak 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700 shadow-md'}`}
//               >
//                 End Break
//               </button>

//               <button
//                 onClick={() => handleAction('logout')}
//                 disabled={actionLoading}
//                 className="min-w-[140px] px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all shadow-md"
//               >
//                 End Shift
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => handleAction('login')}
//               disabled={actionLoading}
//               className="min-w-[220px] px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
//             >
//               Start Shift / Login
//             </button>
//           )}
//         </div>

//         {/* Extra break request */}
//         {status.breakLimitExceeded && !isOnBreak && (
//           <div className="text-center mt-6">
//             <button
//               onClick={() => handleAction('break/request')}
//               disabled={actionLoading || status.pendingBreakRequest}
//               className={`text-sm ${
//                 status.pendingBreakRequest 
//                   ? 'text-gray-500 cursor-not-allowed' 
//                   : 'text-blue-600 hover:underline'
//               }`}
//             >
//               {status.pendingBreakRequest 
//                 ? 'Break extension request sent...' 
//                 : 'Request extra break time'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyLoginStatus;



//===============correct======================

// import { useState, useEffect } from 'react';
// import { FiCalendar, FiClock, FiDownload, FiFilter } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const MyLoginHours = () => {
//   const [loginHours, setLoginHours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
//     endDate: new Date()
//   });
//   const [stats, setStats] = useState({
//     totalDays: 0,
//     totalHours: 0,
//     avgHours: 0
//   });

//   const fetchLoginHours = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         startDate: dateRange.startDate.toISOString().split('T')[0],
//         endDate: dateRange.endDate.toISOString().split('T')[0]
//       };

//       const response = await api.getMyLoginHours(params);
//       setLoginHours(response.data.records || []);
      
//       // Calculate stats
//       const totalHours = response.data.records.reduce((sum, record) => {
//         return sum + parseFloat(record.workedHours || 0);
//       }, 0);
      
//       setStats({
//         totalDays: response.data.records.length,
//         totalHours: totalHours.toFixed(2),
//         avgHours: (totalHours / (response.data.records.length || 1)).toFixed(2)
//       });
//     } catch (error) {
//       toast.error('Failed to fetch login hours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLoginHours();
//   }, [dateRange]);

//   const exportToCSV = () => {
//     const headers = ['Date', 'Login Time', 'Logout Time', 'Worked Hours', 'Break Hours', 'Status'];
//     const csvData = loginHours.map(record => [
//       record.date,
//       record.loginTime ? new Date(record.loginTime).toLocaleTimeString() : 'N/A',
//       record.logoutTime ? new Date(record.logoutTime).toLocaleTimeString() : 'N/A',
//       record.workedHours,
//       record.breakHours,
//       record.status
//     ]);

//     const csv = [
//       headers.join(','),
//       ...csvData.map(row => row.join(','))
//     ].join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `login-hours-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'present':
//         return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Present</span>;
//       case 'half-day':
//         return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Half Day</span>;
//       case 'absent':
//         return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">Absent</span>;
//       default:
//         return <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Pending</span>;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">My Login Hours</h1>
//             <p className="text-gray-600 mt-2">
//               Track your daily attendance and working hours
//             </p>
//           </div>
//           <button
//             onClick={exportToCSV}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <FiDownload className="mr-2" />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Stats and Filters */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Stats Cards */}
//         <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Days</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">
//                   {stats.totalDays}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <FiCalendar className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Hours</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">
//                   {stats.totalHours} hrs
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <FiClock className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Avg Hours/Day</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">
//                   {stats.avgHours} hrs
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <FiClock className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Date Filter */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center mb-4">
//             <FiFilter className="w-5 h-5 text-gray-400 mr-2" />
//             <h3 className="font-medium text-gray-800">Date Filter</h3>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 From Date
//               </label>
//               <DatePicker
//                 selected={dateRange.startDate}
//                 onChange={(date) => setDateRange({...dateRange, startDate: date})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxDate={new Date()}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 To Date
//               </label>
//               <DatePicker
//                 selected={dateRange.endDate}
//                 onChange={(date) => setDateRange({...dateRange, endDate: date})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 maxDate={new Date()}
//                 minDate={dateRange.startDate}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Hours Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Login History</h2>
//         </div>
        
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="spinner mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading login hours...</p>
//           </div>
//         ) : loginHours.length === 0 ? (
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCalendar className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
//             <p className="text-gray-600">No login hours found for the selected date range</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Login Time
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Logout Time
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Worked Hours
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Break Hours
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loginHours.map((record, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center mr-3">
//                           <FiCalendar className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">
//                             {formatDate(record.date)}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {record.date}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatTime(record.loginTime)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatTime(record.logoutTime)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {record.workedHours} hrs
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {record.breakHours} hrs
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(record.status)}
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

// export default MyLoginHours;

//====================

// import { useState, useEffect } from 'react';
// import { FiCalendar, FiClock, FiDownload, FiFilter, FiRefreshCw } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const MyLoginHours = () => {
//   const [loginHours, setLoginHours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days default
//     endDate: new Date()
//   });
//   const [stats, setStats] = useState({
//     totalDays: 0,
//     totalHours: 0,
//     avgHours: 0,
//     presentDays: 0,
//     halfDays: 0,
//     absentDays: 0
//   });

//   const fetchLoginHours = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         startDate: dateRange.startDate.toISOString().split('T')[0],
//         endDate: dateRange.endDate.toISOString().split('T')[0]
//       };

//       console.log('Fetching login hours with params:', params); // Debug log
      
//       // Use direct API call since getMyLoginHours might not be defined
//       const response = await api.get('/login-hours/my-hours', { params });
//       console.log('API Response:', response.data); // Debug log
      
//       const records = response.data.records || response.data.data || [];
//       setLoginHours(records);
      
//       // Calculate statistics
//       let totalHours = 0;
//       let presentCount = 0;
//       let halfDayCount = 0;
//       let absentCount = 0;
      
//       records.forEach(record => {
//         const hours = parseFloat(record.workedHours || record.totalWorkedHours || 0);
//         totalHours += hours;
        
//         const status = (record.status || '').toLowerCase();
//         if (status === 'present') presentCount++;
//         else if (status === 'half-day' || status === 'half day') halfDayCount++;
//         else if (status === 'absent') absentCount++;
//       });
      
//       const totalRecords = records.length;
      
//       setStats({
//         totalDays: totalRecords,
//         totalHours: totalHours.toFixed(2),
//         avgHours: totalRecords > 0 ? (totalHours / totalRecords).toFixed(2) : '0.00',
//         presentDays: presentCount,
//         halfDays: halfDayCount,
//         absentDays: absentCount
//       });
      
//     } catch (error) {
//       console.error('Error fetching login hours:', error);
//       toast.error(error.response?.data?.message || 'Failed to fetch login hours');
//       setLoginHours([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchLoginHours();
//   }, [dateRange]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchLoginHours();
//   };

//   const exportToCSV = () => {
//     if (loginHours.length === 0) {
//       toast.error('No data to export');
//       return;
//     }

//     try {
//       const headers = ['Date', 'Login Time', 'Logout Time', 'Worked Hours', 'Break Hours', 'Status', 'Remarks'];
//       const csvData = loginHours.map(record => [
//         record.date || 'N/A',
//         record.loginTime ? new Date(record.loginTime).toLocaleTimeString('en-US', { 
//           hour12: true,
//           hour: '2-digit',
//           minute: '2-digit'
//         }) : 'N/A',
//         record.logoutTime ? new Date(record.logoutTime).toLocaleTimeString('en-US', { 
//           hour12: true,
//           hour: '2-digit',
//           minute: '2-digit'
//         }) : 'N/A',
//         record.workedHours || record.totalWorkedHours || '0.00',
//         record.breakHours || record.totalBreakHours || '0.00',
//         record.status || 'Pending',
//         record.remarks || ''
//       ]);

//       const csv = [
//         headers.join(','),
//         ...csvData.map(row => 
//           row.map(cell => `"${cell}"`).join(',') // Wrap in quotes to handle commas
//         )
//       ].join('\n');

//       const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `my-login-hours-${new Date().toISOString().split('T')[0]}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
      
//       toast.success('CSV exported successfully');
//     } catch (error) {
//       console.error('Export error:', error);
//       toast.error('Failed to export CSV');
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       // If dateString is already in YYYY-MM-DD format
//       if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
//         const [year, month, day] = dateString.split('-');
//         const date = new Date(year, month - 1, day);
//         return date.toLocaleDateString('en-US', {
//           weekday: 'short',
//           month: 'short',
//           day: 'numeric'
//         });
//       }
      
//       // If it's a date string
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return dateString;
//     }
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch (error) {
//       return 'Invalid time';
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '0.00';
//     return parseFloat(hours).toFixed(2);
//   };

//   const getStatusBadge = (status) => {
//     const statusLower = (status || '').toLowerCase();
    
//     switch (statusLower) {
//       case 'present':
//         return (
//           <div className="flex items-center">
//             <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//             <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Present</span>
//           </div>
//         );
//       case 'half-day':
//       case 'half day':
//         return (
//           <div className="flex items-center">
//             <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
//             <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Half Day</span>
//           </div>
//         );
//       case 'absent':
//         return (
//           <div className="flex items-center">
//             <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
//             <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Absent</span>
//           </div>
//         );
//       default:
//         return (
//           <div className="flex items-center">
//             <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
//             <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Pending</span>
//           </div>
//         );
//     }
//   };

//   const handleDateChange = (type, date) => {
//     if (!date) return;
    
//     // Ensure end date is not before start date
//     if (type === 'startDate' && date > dateRange.endDate) {
//       setDateRange({
//         startDate: date,
//         endDate: date
//       });
//     } else if (type === 'endDate' && date < dateRange.startDate) {
//       setDateRange({
//         startDate: date,
//         endDate: date
//       });
//     } else {
//       setDateRange(prev => ({
//         ...prev,
//         [type]: date
//       }));
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">My Login Hours</h1>
//             <p className="text-gray-600 mt-1">
//               Track your daily attendance and working hours
//             </p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
//             >
//               <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//               {refreshing ? 'Refreshing...' : 'Refresh'}
//             </button>
//             <button
//               onClick={exportToCSV}
//               disabled={loading || loginHours.length === 0}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FiDownload className="mr-2" />
//               Export CSV
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats and Filters */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Stats Cards */}
//         <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl shadow p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Days</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-1">
//                   {stats.totalDays}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Present: {stats.presentDays} | Half Day: {stats.halfDays} | Absent: {stats.absentDays}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <FiCalendar className="w-5 h-5 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Worked Hours</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-1">
//                   {stats.totalHours} hrs
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {stats.totalDays > 0 ? `${(parseFloat(stats.totalHours) / stats.totalDays).toFixed(2)} hrs/day` : 'No data'}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                 <FiClock className="w-5 h-5 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Average Hours/Day</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-1">
//                   {stats.avgHours} hrs
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Based on {stats.totalDays} day{stats.totalDays !== 1 ? 's' : ''}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <FiClock className="w-5 h-5 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Date Filter */}
//         <div className="bg-white rounded-xl shadow p-5">
//           <div className="flex items-center mb-4">
//             <FiFilter className="w-5 h-5 text-gray-400 mr-2" />
//             <h3 className="font-medium text-gray-800">Date Range</h3>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 From Date
//               </label>
//               <DatePicker
//                 selected={dateRange.startDate}
//                 onChange={(date) => handleDateChange('startDate', date)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//                 maxDate={new Date()}
//                 dateFormat="MMM dd, yyyy"
//                 placeholderText="Select start date"
//                 isClearable
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 To Date
//               </label>
//               <DatePicker
//                 selected={dateRange.endDate}
//                 onChange={(date) => handleDateChange('endDate', date)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//                 maxDate={new Date()}
//                 minDate={dateRange.startDate}
//                 dateFormat="MMM dd, yyyy"
//                 placeholderText="Select end date"
//                 isClearable
//               />
//             </div>
            
//             <div className="flex space-x-2 pt-2">
//               <button
//                 onClick={() => setDateRange({
//                   startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
//                   endDate: new Date()
//                 })}
//                 className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
//               >
//                 Last 7 Days
//               </button>
//               <button
//                 onClick={() => setDateRange({
//                   startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
//                   endDate: new Date()
//                 })}
//                 className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
//               >
//                 Last 30 Days
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Hours Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <h2 className="text-lg font-semibold text-gray-800">Login History</h2>
//           <div className="text-sm text-gray-600">
//             Showing {loginHours.length} record{loginHours.length !== 1 ? 's' : ''}
//             {dateRange.startDate && dateRange.endDate && (
//               <span className="ml-2 text-gray-500">
//                 ({dateRange.startDate.toLocaleDateString()} - {dateRange.endDate.toLocaleDateString()})
//               </span>
//             )}
//           </div>
//         </div>
        
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="spinner mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading login hours...</p>
//           </div>
//         ) : loginHours.length === 0 ? (
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCalendar className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
//             <p className="text-gray-600 mb-4">No login hours found for the selected date range</p>
//             <button
//               onClick={handleRefresh}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Refresh Data
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Login Time
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Logout Time
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Worked Hours
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Break Hours
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {loginHours.map((record, index) => (
//                     <tr key={index} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center mr-3">
//                             <FiCalendar className="w-4 h-4 text-blue-600" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {formatDate(record.date)}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {record.date || 'N/A'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatTime(record.loginTime)}
//                         </div>
//                         {record.loginTime && (
//                           <div className="text-xs text-gray-500">
//                             {new Date(record.loginTime).toLocaleDateString()}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatTime(record.logoutTime)}
//                         </div>
//                         {record.logoutTime && (
//                           <div className="text-xs text-gray-500">
//                             {new Date(record.logoutTime).toLocaleDateString()}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatHours(record.workedHours || record.totalWorkedHours)} hrs
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {record.logoutTime && record.loginTime ? (
//                             <>
//                               {Math.floor((new Date(record.logoutTime) - new Date(record.loginTime)) / (1000 * 60 * 60))}h{' '}
//                               {Math.floor(((new Date(record.logoutTime) - new Date(record.loginTime)) % (1000 * 60 * 60)) / (1000 * 60))}m
//                             </>
//                           ) : 'N/A'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatHours(record.breakHours || record.totalBreakHours)} hrs
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(record.status)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
            
//             {/* Summary footer */}
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//               <div className="flex flex-wrap items-center justify-between gap-4">
//                 <div className="text-sm text-gray-600">
//                   <span className="font-medium">Summary:</span> 
//                   {stats.presentDays > 0 && ` ${stats.presentDays} Present`}
//                   {stats.halfDays > 0 && `, ${stats.halfDays} Half Day`}
//                   {stats.absentDays > 0 && `, ${stats.absentDays} Absent`}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Total: <span className="font-medium">{stats.totalHours} hours</span> worked
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyLoginHours;

//==========
import { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiDownload, 
  FiCoffee, 
  FiLogIn, 
  FiLogOut,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiAlertCircle
} from 'react-icons/fi';
import api from '../api/axios';
import toast from 'react-hot-toast';

const MyLoginHours = () => {
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to get current shift date (3 PM to next day 2:59 PM IST)
  const getShiftDate = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istNow = new Date(now.getTime() + istOffset);
    
    // If current time is before 3 PM IST, it belongs to previous day's shift
    if (istNow.getUTCHours() < 9.5) { // 3 PM IST = 9:30 UTC
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString().split('T')[0];
    }
    
    return now.toISOString().split('T')[0];
  };

  // Format time in IST (HH:MM AM/PM)
  const formatISTTime = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(date.getTime() + istOffset);
      
      return istTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid time';
    }
  };

  // Calculate duration in hours and minutes
  const calculateDuration = (start, end) => {
    if (!start) return 'N/A';
    if (!end) return 'Ongoing';
    
    try {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const diffMs = endTime - startTime;
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours === 0) {
        return `${minutes}m`;
      }
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return 'Error';
    }
  };

  // Fetch today's login hours data
  const fetchTodayData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/login-hours/today');
      
      console.log('Today data response:', response.data); // Debug log
      
      const data = response.data.data || response.data;
      setTodayData(data);
      
    } catch (error) {
      console.error('Error fetching today data:', error);
      toast.error(error.response?.data?.message || 'Failed to load today\'s data');
      setTodayData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTodayData();
    
    // Auto-refresh every 30 seconds to get real-time updates
    const interval = setInterval(fetchTodayData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTodayData();
  };

  const exportToCSV = () => {
    if (!todayData) {
      toast.error('No data to export');
      return;
    }

    try {
      const headers = ['Date', 'Shift', 'Login Time', 'Logout Time', 'Total Hours', 'Break Time', 'Break Count', 'Status'];
      
      const csvData = [[
        todayData.date || getShiftDate(),
        '3 PM - Next Day 2:59 PM',
        formatISTTime(todayData.loginTime),
        formatISTTime(todayData.logoutTime),
        todayData.workedHours || '0.00',
        todayData.breakHours || '0.00',
        todayData.breakCount || 0,
        todayData.status || 'Pending'
      ]];

      const csv = [
        headers.join(','),
        ...csvData.map(row => 
          row.map(cell => `"${cell}"`).join(',')
        )
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `login-hours-${getShiftDate()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('CSV exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export CSV');
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || '').toLowerCase();
    
    switch (statusLower) {
      case 'present':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Present
            </span>
          </div>
        );
      case 'half-day':
      case 'half day':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              Half Day
            </span>
          </div>
        );
      case 'absent':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span className="px-3 py-1.5 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              Absent
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
              Pending
            </span>
          </div>
        );
    }
  };

  // Check if user is currently logged in
  const isLoggedIn = () => {
    if (!todayData) return false;
    
    // Multiple ways to check login status
    if (todayData.isLoggedIn !== undefined) return todayData.isLoggedIn;
    if (todayData.loginTime && !todayData.logoutTime) return true;
    
    return false;
  };

  // Calculate free breaks left
  const calculateFreeBreaksLeft = () => {
    if (!todayData || !todayData.allBreaks) return 3;
    
    const approvedBreaks = todayData.allBreaks.filter(b => b.status === 'approved').length;
    return Math.max(0, 3 - approvedBreaks);
  };

  const freeBreaksLeft = calculateFreeBreaksLeft();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Today's Login Hours</h1>
            <div className="flex items-center gap-2 mt-2">
              <FiCalendar className="w-4 h-4 text-gray-500" />
              <p className="text-gray-600">
                Shift: <span className="font-semibold">3 PM - Next Day 2:59 PM</span>
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-gray-600">
                Date: <span className="font-semibold">{getShiftDate()}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all duration-200"
            >
              <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={exportToCSV}
              disabled={!todayData}
              className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FiDownload className="mr-2" />
              Export Today's Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Login Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Login Status</p>
              <p className={`text-2xl font-bold ${
                isLoggedIn() ? 'text-green-600' : 'text-red-600'
              }`}>
                {isLoggedIn() ? 'ACTIVE' : 'NOT LOGGED IN'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {isLoggedIn() ? (
                  <FiCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FiX className="w-4 h-4 text-red-500" />
                )}
                <p className="text-xs text-gray-500">
                  {isLoggedIn() ? 'Currently logged in' : 'Login to start tracking'}
                </p>
              </div>
            </div>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              isLoggedIn() ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isLoggedIn() ? (
                <FiLogIn className="w-7 h-7 text-green-600" />
              ) : (
                <FiLogOut className="w-7 h-7 text-red-600" />
              )}
            </div>
          </div>
        </div>

        {/* Worked Hours Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Worked Hours</p>
              <p className="text-2xl font-bold text-gray-800">
                {todayData?.workedHours || '0.00'} hrs
              </p>
              <div className="flex items-center gap-2 mt-2">
                <FiClock className="w-4 h-4 text-blue-500" />
                <p className="text-xs text-gray-500">
                  {todayData?.loginTime ? `Since ${formatISTTime(todayData.loginTime)}` : 'No login time'}
                </p>
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiClock className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Break Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Break Time</p>
              <p className="text-2xl font-bold text-gray-800">
                {todayData?.breakHours || '0.00'} hrs
              </p>
              <div className="flex items-center gap-2 mt-2">
                <FiCoffee className="w-4 h-4 text-purple-500" />
                <p className="text-xs text-gray-500">
                  {todayData?.breakCount || 0} break{todayData?.breakCount !== 1 ? 's' : ''} taken
                </p>
              </div>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <FiCoffee className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Attendance Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance Status</p>
              <div className="mb-2">
                {getStatusBadge(todayData?.status)}
              </div>
              <div className="flex items-center gap-2">
                <FiAlertCircle className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-500">
                  Free breaks left: <span className="font-semibold">{freeBreaksLeft}</span>
                </p>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-teal-600">
                {todayData?.status?.charAt(0)?.toUpperCase() || 'P'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login/Logout Times */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <FiClock className="mr-2 text-blue-600" />
            Shift Timings
          </h2>
          
          <div className="space-y-6">
            {/* Login Time */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiLogIn className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Login Time</p>
                  <p className="text-sm text-gray-600">
                    {todayData?.loginTime ? formatISTTime(todayData.loginTime) : 'Not logged in yet'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  {todayData?.loginTime ? formatISTTime(todayData.loginTime) : '--:--'}
                </p>
                {todayData?.loginTime && (
                  <p className="text-xs text-gray-500">
                    {new Date(todayData.loginTime).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Logout Time */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiLogOut className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Logout Time</p>
                  <p className="text-sm text-gray-600">
                    {todayData?.logoutTime ? formatISTTime(todayData.logoutTime) : 'Shift in progress'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  {todayData?.logoutTime ? formatISTTime(todayData.logoutTime) : 'Ongoing'}
                </p>
                {todayData?.logoutTime && (
                  <p className="text-xs text-gray-500">
                    {new Date(todayData.logoutTime).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Total Duration */}
            {todayData?.loginTime && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Shift Duration</p>
                    <p className="text-2xl font-bold mt-1">
                      {calculateDuration(todayData.loginTime, todayData.logoutTime || new Date())}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Net Working Hours</p>
                    <p className="text-2xl font-bold mt-1">
                      {todayData.workedHours || '0.00'} hrs
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Break Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiCoffee className="mr-2 text-purple-600" />
              Today's Breaks
            </h2>
            <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {todayData?.breakCount || 0} total
            </div>
          </div>
          
          {(!todayData?.allBreaks || todayData.allBreaks.length === 0) ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCoffee className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No breaks taken today</p>
              <p className="text-sm text-gray-500 mt-1">
                You have {freeBreaksLeft} free break{freeBreaksLeft !== 1 ? 's' : ''} available
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {todayData.allBreaks.map((breakItem, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border ${
                    breakItem.status === 'approved' 
                      ? 'bg-green-50 border-green-200' 
                      : breakItem.status === 'pending'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        breakItem.status === 'approved' 
                          ? 'bg-green-100' 
                          : breakItem.status === 'pending'
                          ? 'bg-yellow-100'
                          : 'bg-red-100'
                      }`}>
                        <FiCoffee className={`w-5 h-5 ${
                          breakItem.status === 'approved' 
                            ? 'text-green-600' 
                            : breakItem.status === 'pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">
                            Break #{index + 1}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            breakItem.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : breakItem.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {breakItem.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {breakItem.start ? formatISTTime(breakItem.start) : 'Not started'}
                          {breakItem.end && ` → ${formatISTTime(breakItem.end)}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {calculateDuration(breakItem.start, breakItem.end)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {breakItem.autoEnded ? 'Auto-ended' : 'Manual end'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Break Summary */}
          {todayData?.allBreaks && todayData.allBreaks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-xl font-bold text-green-600">
                    {todayData.allBreaks.filter(b => b.status === 'approved').length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {todayData.allBreaks.filter(b => b.status === 'pending').length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Time</p>
                  <p className="text-xl font-bold text-purple-600">
                    {todayData.breakHours || '0.00'} hrs
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/login-status'}
            className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            <FiLogIn className="mr-2" />
            Go to Login Status
          </button>
          
          <button
            onClick={() => window.location.href = '/break-request'}
            className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
          >
            <FiCoffee className="mr-2" />
            Manage Breaks
          </button>
          
          <button
            onClick={exportToCSV}
            disabled={!todayData}
            className="flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiDownload className="mr-2" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyLoginHours;