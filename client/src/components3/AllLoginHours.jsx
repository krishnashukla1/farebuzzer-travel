//==========correct================
// import { useState, useEffect } from 'react';

// import { 
//   FiUsers, 
//   FiClock, 
//   FiFilter, 
//   FiSearch, 
//   FiDownload, 
//   FiRefreshCw,
//   FiCalendar,
//   FiUser,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiXCircle,
//   FiLogIn,
//   FiLogOut,
//   FiCoffee,
//   FiUserCheck,
//   FiUserX
// } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const AllLoginHours = () => {
//   const [loginHours, setLoginHours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
//     endDate: new Date()
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState('all');
//   const [employees, setEmployees] = useState([]);
//   const [stats, setStats] = useState({
//     totalRecords: 0,
//     totalHours: 0,
//     averageHours: 0,
//     presentCount: 0,
//     halfDayCount: 0,
//     absentCount: 0,
//     currentlyLoggedIn: 0,
//     currentlyOnBreak: 0
//   });

//   // Debug function to log API responses
//   const debugLog = (message, data) => {
//     console.log(`[AllLoginHours] ${message}:`, data);
//   };

//   const fetchAllLoginHours = async () => {
//     try {
//       setLoading(true);
//       debugLog('Fetching login hours with params', {
//         startDate: dateRange.startDate.toISOString().split('T')[0],
//         endDate: dateRange.endDate.toISOString().split('T')[0],
//         selectedEmployee
//       });

//       let response;
//       try {
//         // Try the main endpoint
//         response = await api.get('/login-hours', {
//           params: {
//             startDate: dateRange.startDate.toISOString().split('T')[0],
//             endDate: dateRange.endDate.toISOString().split('T')[0],
//             ...(selectedEmployee !== 'all' && { userId: selectedEmployee })
//           }
//         });
//         debugLog('Main API call successful', response.data);
//       } catch (mainError) {
//         debugLog('Main API call failed, trying alternate', mainError);
        
//         // Try alternate endpoint
//         try {
//           response = await api.get('/api/login-hours', {
//             params: {
//               startDate: dateRange.startDate.toISOString().split('T')[0],
//               endDate: dateRange.endDate.toISOString().split('T')[0],
//               ...(selectedEmployee !== 'all' && { userId: selectedEmployee })
//             }
//           });
//           debugLog('Alternate API call successful', response.data);
//         } catch (alternateError) {
//           debugLog('Both API endpoints failed', alternateError);
          
//           // Try getting today's data and format it
//           try {
//             const todayResponse = await api.get('/login-hours/today');
//             debugLog('Today data response', todayResponse.data);
            
//             // Format as if it were from getAllLoginHours
//             const todayData = todayResponse.data.data || todayResponse.data;
//             const formattedRecords = todayData ? [{
//               ...todayData,
//               user: { 
//                 name: 'Current User', 
//                 email: 'user@example.com',
//                 _id: 'current'
//               },
//               userId: { 
//                 name: 'Current User', 
//                 email: 'user@example.com',
//                 _id: 'current'
//               }
//             }] : [];
            
//             response = { data: { records: formattedRecords } };
//           } catch (todayError) {
//             throw new Error('All API endpoints failed');
//           }
//         }
//       }

//       // Handle different response structures
//       let records = response.data.records || response.data.data || response.data || [];
      
//       // Ensure it's an array
//       if (!Array.isArray(records)) {
//         records = [records];
//       }
      
//       debugLog('Processed records', records);
//       setLoginHours(records);

//       // Extract unique employees
//       const employeeMap = new Map();
//       records.forEach(record => {
//         if (record.userId && typeof record.userId === 'object') {
//           employeeMap.set(record.userId._id || record.userId.id, record.userId);
//         } else if (record.user) {
//           employeeMap.set(record.user._id || record.user.id, record.user);
//         } else if (record.userId && typeof record.userId === 'string') {
//           // If userId is just an ID string
//           employeeMap.set(record.userId, { _id: record.userId, name: 'Unknown User' });
//         }
//       });
      
//       const uniqueEmployees = Array.from(employeeMap.values());
//       setEmployees(uniqueEmployees);
//       debugLog('Extracted employees', uniqueEmployees);
      
//       // Calculate statistics
//       let totalHours = 0;
//       let presentCount = 0;
//       let halfDayCount = 0;
//       let absentCount = 0;
//       let currentlyLoggedIn = 0;
//       let currentlyOnBreak = 0;
      
//       records.forEach(record => {
//         const hours = parseFloat(record.workedHours || record.totalWorkedHours || 0);
//         totalHours += hours;
        
//         const status = (record.status || '').toLowerCase();
//         if (status === 'present') presentCount++;
//         else if (status === 'half-day' || status === 'half day') halfDayCount++;
//         else if (status === 'absent') absentCount++;
        
//         // Check if currently logged in (has login time but no logout time)
//         if (record.loginTime && !record.logoutTime) {
//           currentlyLoggedIn++;
//         }
        
//         // Check if currently on break
//         const breaks = record.breaks || record.allBreaks || [];
//         const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
//         if (isOnBreak) {
//           currentlyOnBreak++;
//         }
//       });
      
//       const totalRecords = records.length;
      
//       setStats({
//         totalRecords,
//         totalHours: totalHours.toFixed(2),
//         averageHours: totalRecords > 0 ? (totalHours / totalRecords).toFixed(2) : '0.00',
//         presentCount,
//         halfDayCount,
//         absentCount,
//         currentlyLoggedIn,
//         currentlyOnBreak
//       });
      
//       debugLog('Calculated stats', stats);
      
//     } catch (error) {
//       console.error('Error fetching login hours:', error);
//       debugLog('Error details', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
      
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       } else if (error.response?.status === 403) {
//         toast.error('Access denied. Admin privileges required.');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to fetch login hours');
//       }
      
//       setLoginHours([]);
//       setEmployees([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllLoginHours();
    
//     // Auto-refresh every 30 seconds for real-time updates
//     const interval = setInterval(fetchAllLoginHours, 30000);
//     return () => clearInterval(interval);
//   }, [dateRange, selectedEmployee]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchAllLoginHours();
//   };

//   const filteredLoginHours = loginHours.filter(record => {
//     if (!searchTerm) return true;
    
//     const searchLower = searchTerm.toLowerCase();
    
//     // Check various fields
//     const userName = record.user?.name || record.userId?.name || '';
//     const userEmail = record.user?.email || record.userId?.email || '';
//     const date = record.date || '';
//     const status = record.status || '';
    
//     return (
//       userName.toLowerCase().includes(searchLower) ||
//       userEmail.toLowerCase().includes(searchLower) ||
//       date.toLowerCase().includes(searchLower) ||
//       status.toLowerCase().includes(searchLower)
//     );
//   });

//   const exportToCSV = () => {
//     if (filteredLoginHours.length === 0) {
//       toast.error('No data to export');
//       return;
//     }

//     try {
//       const headers = ['Employee Name', 'Employee Email', 'Date', 'Login Time', 'Logout Time', 'Worked Hours', 'Break Hours', 'Status', 'Login Status', 'Break Status'];
      
//       const csvData = filteredLoginHours.map(record => {
//         const userName = record.user?.name || record.userId?.name || 'Unknown';
//         const userEmail = record.user?.email || record.userId?.email || 'N/A';
//         const date = record.date || 'N/A';
//         const loginTime = record.loginTime ? new Date(record.loginTime).toLocaleTimeString('en-US', {
//           hour12: true,
//           hour: '2-digit',
//           minute: '2-digit'
//         }) : 'N/A';
//         const logoutTime = record.logoutTime ? new Date(record.logoutTime).toLocaleTimeString('en-US', {
//           hour12: true,
//           hour: '2-digit',
//           minute: '2-digit'
//         }) : 'N/A';
//         const workedHours = record.workedHours || record.totalWorkedHours || '0.00';
//         const breakHours = record.breakHours || record.totalBreakHours || '0.00';
//         const status = record.status || 'Pending';
        
//         // Calculate login status
//         const isLoggedIn = record.loginTime && !record.logoutTime;
//         const loginStatus = isLoggedIn ? 'Logged In' : 'Logged Out';
        
//         // Calculate break status
//         const breaks = record.breaks || record.allBreaks || [];
//         const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
//         const breakStatus = isOnBreak ? 'On Break' : 'Not on Break';

//         return [userName, userEmail, date, loginTime, logoutTime, workedHours, breakHours, status, loginStatus, breakStatus];
//       });

//       const csv = [
//         headers.join(','),
//         ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
//       ].join('\n');

//       const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `all-login-hours-${new Date().toISOString().split('T')[0]}.csv`;
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
//       // Handle YYYY-MM-DD format
//       if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
//         const [year, month, day] = dateString.split('-');
//         const date = new Date(year, month - 1, day);
//         return date.toLocaleDateString('en-US', {
//           weekday: 'short',
//           month: 'short',
//           day: 'numeric'
//         });
//       }
      
//       // Handle date objects
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
      
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
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return 'Invalid time';
      
//       return date.toLocaleTimeString('en-US', {
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
//             <FiCheckCircle className="w-4 h-4 text-green-500 mr-1.5" />
//             <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//               Present
//             </span>
//           </div>
//         );
//       case 'half-day':
//       case 'half day':
//         return (
//           <div className="flex items-center">
//             <FiAlertCircle className="w-4 h-4 text-yellow-500 mr-1.5" />
//             <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
//               Half Day
//             </span>
//           </div>
//         );
//       case 'absent':
//         return (
//           <div className="flex items-center">
//             <FiXCircle className="w-4 h-4 text-red-500 mr-1.5" />
//             <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
//               Absent
//             </span>
//           </div>
//         );
//       default:
//         return (
//           <div className="flex items-center">
//             <FiAlertCircle className="w-4 h-4 text-gray-500 mr-1.5" />
//             <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
//               Pending
//             </span>
//           </div>
//         );
//     }
//   };

//   // Get login status (logged in/out)
//   // const getLoginStatus = (record) => {
//   //   const isLoggedIn = record.loginTime && !record.logoutTime;
    
//   //   if (isLoggedIn) {
//   //     return (
//   //       <div className="flex items-center">
//   //         <FiUserCheck className="w-4 h-4 text-green-500 mr-1.5" />
//   //         <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//   //           Logged In
//   //         </span>
//   //       </div>
//   //     );
//   //   } else if (record.logoutTime) {
//   //     return (
//   //       <div className="flex items-center">
//   //         <FiUserX className="w-4 h-4 text-gray-500 mr-1.5" />
//   //         <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
//   //           Logged Out
//   //         </span>
//   //       </div>
//   //     );
//   //   } else {
//   //     return (
//   //       <div className="flex items-center">
//   //         <FiLogIn className="w-4 h-4 text-blue-500 mr-1.5" />
//   //         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//   //           Not Logged In
//   //         </span>
//   //       </div>
//   //     );
//   //   }
//   // };

//   const getLoginStatus = (record) => {
//   const hasLogin = !!record.loginTime;
//   const hasLogout = !!record.logoutTime;

//   if (hasLogin && !hasLogout) {
//     return (
//       <div className="flex items-center">
//         <FiUserCheck className="w-4 h-4 text-green-500 mr-1.5" />
//         <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//           Logged In
//         </span>
//       </div>
//     );
//   }

//   if (hasLogout) {
//     return (
//       <div className="flex items-center">
//         <FiUserX className="w-4 h-4 text-gray-500 mr-1.5" />
//         <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
//           Logged Out
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center">
//       <FiLogIn className="w-4 h-4 text-blue-500 mr-1.5" />
//       <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//         Not Logged In
//       </span>
//     </div>
//   );
// };

//   // Get break status (on break/not on break)
//   const getBreakStatus = (record) => {
//     const breaks = record.breaks || record.allBreaks || [];
//     const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
    
//     if (isOnBreak) {
//       return (
//         <div className="flex items-center">
//           <FiCoffee className="w-4 h-4 text-yellow-500 mr-1.5" />
//           <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
//             On Break
//           </span>
//         </div>
//       );
//     } else if (breaks.length > 0) {
//       return (
//         <div className="flex items-center">
//           <FiCoffee className="w-4 h-4 text-gray-500 mr-1.5" />
//           <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
//             Not on Break
//           </span>
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex items-center">
//           <FiCoffee className="w-4 h-4 text-gray-400 mr-1.5" />
//           <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
//             No Breaks
//           </span>
//         </div>
//       );
//     }
//   };

//   const handleDateChange = (type, date) => {
//     if (!date) return;
    
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

//   // Calculate duration helper
//   const calculateDuration = (start, end) => {
//     if (!start) return '';
//     if (!end) return 'Ongoing';
    
//     try {
//       const startTime = new Date(start);
//       const endTime = new Date(end);
//       const diffMs = endTime - startTime;
      
//       const hours = Math.floor(diffMs / (1000 * 60 * 60));
//       const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
//       return `${hours}h ${minutes}m`;
//     } catch (error) {
//       return '';
//     }
//   };
// useEffect(() => {
//   const handleAttendanceUpdate = () => {
//     fetchAllLoginHours(); // 🔥 refresh immediately
//   };

//   window.addEventListener("attendance-updated", handleAttendanceUpdate);
//   return () =>
//     window.removeEventListener("attendance-updated", handleAttendanceUpdate);
// }, []);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">All Login Hours</h1>
//             <p className="text-gray-600 mt-1">
//               Monitor employee attendance, login status, and break information
//             </p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all duration-200"
//             >
//               <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//               {refreshing ? 'Refreshing...' : 'Refresh'}
//             </button>
//             <button
//               onClick={exportToCSV}
//               disabled={filteredLoginHours.length === 0}
//               className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//             >
//               <FiDownload className="mr-2" />
//               Export CSV
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Live Status Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Currently Logged In</p>
//               <p className="text-2xl font-bold mt-1">{stats.currentlyLoggedIn}</p>
//               <p className="text-xs opacity-80 mt-1">Active sessions</p>
//             </div>
//             <FiLogIn className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Currently On Break</p>
//               <p className="text-2xl font-bold mt-1">{stats.currentlyOnBreak}</p>
//               <p className="text-xs opacity-80 mt-1">Active breaks</p>
//             </div>
//             <FiCoffee className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Present Today</p>
//               <p className="text-2xl font-bold mt-1">{stats.presentCount}</p>
//               <p className="text-xs opacity-80 mt-1">Total records</p>
//             </div>
//             <FiCheckCircle className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Total Hours</p>
//               <p className="text-2xl font-bold mt-1">{stats.totalHours} hrs</p>
//               <p className="text-xs opacity-80 mt-1">Average: {stats.averageHours} hrs/day</p>
//             </div>
//             <FiClock className="w-10 h-10 opacity-80" />
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Date Range */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FiCalendar className="inline mr-2" />
//               Date Range
//             </label>
//             <div className="flex space-x-2">
//               <DatePicker
//                 selected={dateRange.startDate}
//                 onChange={(date) => handleDateChange('startDate', date)}
//                 className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//                 placeholderText="Start Date"
//                 maxDate={new Date()}
//                 dateFormat="MMM dd, yyyy"
//                 isClearable
//               />
//               <DatePicker
//                 selected={dateRange.endDate}
//                 onChange={(date) => handleDateChange('endDate', date)}
//                 className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//                 placeholderText="End Date"
//                 maxDate={new Date()}
//                 minDate={dateRange.startDate}
//                 dateFormat="MMM dd, yyyy"
//                 isClearable
//               />
//             </div>
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => setDateRange({
//                   startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
//                   endDate: new Date()
//                 })}
//                 className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
//               >
//                 Last 7 Days
//               </button>
//               <button
//                 onClick={() => setDateRange({
//                   startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
//                   endDate: new Date()
//                 })}
//                 className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
//               >
//                 Last 30 Days
//               </button>
//             </div>
//           </div>

//           {/* Employee Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FiUser className="inline mr-2" />
//               Employee
//             </label>
//             <select
//               value={selectedEmployee}
//               onChange={(e) => setSelectedEmployee(e.target.value)}
//               className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//             >
//               <option value="all">All Employees</option>
//               {employees.map((employee, index) => (
//                 <option key={employee?._id || index} value={employee?._id}>
//                   {employee?.name || `Employee ${index + 1}`}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Search */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <FiSearch className="inline mr-2" />
//               Search
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//                 placeholder="Search records..."
//               />
//               <FiSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Hours Table */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <h2 className="text-lg font-semibold text-gray-800">Login Hours Records</h2>
//           <div className="text-sm text-gray-600">
//             Showing {filteredLoginHours.length} record{filteredLoginHours.length !== 1 ? 's' : ''}
//             {loginHours.length > 0 && ` of ${loginHours.length}`}
//           </div>
//         </div>
        
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="spinner mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading login hours...</p>
//             <p className="text-sm text-gray-500 mt-2">Fetching real-time status...</p>
//           </div>
//         ) : loginHours.length === 0 ? (
//           <div className="p-8 text-center">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FiUsers className="w-10 h-10 text-blue-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Records Found</h3>
//             <p className="text-gray-600 mb-6">
//               No login hours found for the selected period.
//             </p>
//             <div className="space-y-3 max-w-md mx-auto">
//               <button
//                 onClick={handleRefresh}
//                 className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 <FiRefreshCw className="inline mr-2" />
//                 Retry Loading Data
//               </button>
//               <button
//                 onClick={() => {
//                   setDateRange({
//                     startDate: new Date(new Date().setDate(new Date().getDate() - 90)),
//                     endDate: new Date()
//                   });
//                   setSelectedEmployee('all');
//                 }}
//                 className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         ) : filteredLoginHours.length === 0 ? (
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiSearch className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Matching Records</h3>
//             <p className="text-gray-600 mb-4">
//               No records match your search criteria. Try changing your search term or filters.
//             </p>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedEmployee('all');
//               }}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Clear Filters
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Employee
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Login Time
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Logout Time
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Worked Hours
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Break Hours
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Login Status
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Break Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredLoginHours.map((record, index) => {
//                     const userName = record.user?.name || record.userId?.name || 'Unknown';
//                     const userEmail = record.user?.email || record.userId?.email || '';
//                     const userInitial = userName.charAt(0).toUpperCase();
                    
//                     // Check if currently logged in
//                     const isLoggedIn = record.loginTime && !record.logoutTime;
                    
//                     // Check if currently on break
//                     const breaks = record.breaks || record.allBreaks || [];
//                     const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
                    
//                     return (
//                       <tr key={index} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
//                               isLoggedIn 
//                                 ? 'bg-gradient-to-r from-green-100 to-teal-100 border-2 border-green-200' 
//                                 : 'bg-gradient-to-r from-blue-100 to-purple-100'
//                             }`}>
//                               <span className={`font-bold ${
//                                 isLoggedIn ? 'text-green-600' : 'text-blue-600'
//                               }`}>
//                                 {userInitial}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-semibold text-gray-900 flex items-center">
//                                 {userName}
//                                 {isLoggedIn && (
//                                   <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                                 )}
//                               </div>
//                               {userEmail && (
//                                 <div className="text-xs text-gray-500">{userEmail}</div>
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{formatDate(record.date)}</div>
//                           <div className="text-xs text-gray-500">{record.date || 'N/A'}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {formatTime(record.loginTime)}
//                           </div>
//                           {record.loginTime && (
//                             <div className="text-xs text-gray-500">
//                               {new Date(record.loginTime).toLocaleDateString()}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className={`text-sm font-medium ${
//                             isLoggedIn ? 'text-yellow-600' : 'text-gray-900'
//                           }`}>
//                             {/* {isLoggedIn ? 'Still logged in' : formatTime(record.logoutTime)} */}
//                             {record.logoutTime ? formatTime(record.logoutTime) : '—'}

//                           </div>
//                           {record.logoutTime && !isLoggedIn && (
//                             <div className="text-xs text-gray-500">
//                               {new Date(record.logoutTime).toLocaleDateString()}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-semibold text-gray-900">
//                             {formatHours(record.workedHours || record.totalWorkedHours)} hrs
//                           </div>
//                           {record.loginTime && (
//                             <div className="text-xs text-gray-500">
//                               {calculateDuration(record.loginTime, record.logoutTime || new Date())}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {formatHours(record.breakHours || record.totalBreakHours)} hrs
//                           </div>
//                           {breaks.length > 0 && (
//                             <div className="text-xs text-gray-500">
//                               {breaks.length} break{breaks.length !== 1 ? 's' : ''}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(record.status)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getLoginStatus(record)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getBreakStatus(record)}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
            
//             {/* Summary Footer */}
//             <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
//               <div className="flex flex-wrap items-center justify-between gap-4">
//                 <div className="text-sm text-gray-700">
//                   <span className="font-semibold">Live Status:</span> 
//                   <span className="ml-2">
//                     {stats.currentlyLoggedIn > 0 && (
//                       <span className="text-green-600">
//                         <FiUserCheck className="inline mr-1" />
//                         {stats.currentlyLoggedIn} logged in
//                       </span>
//                     )}
//                     {stats.currentlyOnBreak > 0 && (
//                       <span className="text-yellow-600 ml-3">
//                         <FiCoffee className="inline mr-1" />
//                         {stats.currentlyOnBreak} on break
//                       </span>
//                     )}
//                   </span>
//                 </div>
//                 <div className="text-sm font-semibold text-gray-800">
//                   Total: {stats.totalHours} hours across {stats.totalRecords} records
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllLoginHours;




//------------8 jan-----grok------------

// import { useState, useEffect } from 'react';
// import { 
//   FiClock, FiRefreshCw, FiDownload, FiUsers, FiLogIn, FiLogOut, 
//   FiCoffee, FiCheckCircle, FiUserCheck, FiUserX, FiAlertCircle 
// } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const AllLoginHoursToday = () => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [stats, setStats] = useState({
//     totalLoggedIn: 0,
//     totalOnBreak: 0,
//     totalWorkedHours: 0,
//     totalBreakHours: 0
//   });

//   const fetchTodayLoginHours = async () => {
//     try {
//       setLoading(true);
//       setRefreshing(true);

//       const response = await api.get('/login-hours/today/all'); // Admin endpoint for all today's records

//       let data = response.data.data || response.data || [];
//       if (!Array.isArray(data)) data = [data];

//       // Filter only employees (exclude admin if role exists)
//       const employeeRecords = data.filter(record => 
//         record.user?.role !== 'admin' && record.user?.role !== 'Admin'
//       );

//       setRecords(employeeRecords);

//       // Calculate live stats
//       let loggedIn = 0;
//       let onBreak = 0;
//       let totalWorked = 0;
//       let totalBreak = 0;

//       employeeRecords.forEach(record => {
//         if (record.loginTime && !record.logoutTime) loggedIn++;
        
//         const breaks = record.breaks || record.allBreaks || [];
//         if (breaks.some(b => !b.end && b.status === 'approved')) onBreak++;

//         totalWorked += parseFloat(record.workedHours || record.totalWorkedHours || 0);
//         totalBreak += parseFloat(record.breakHours || record.totalBreakHours || 0);
//       });

//       setStats({
//         totalLoggedIn: loggedIn,
//         totalOnBreak: onBreak,
//         totalWorkedHours: totalWorked,
//         totalBreakHours: totalBreak
//       });

//     } catch (error) {
//       console.error('Error fetching today login hours:', error);
//       toast.error('Failed to load today\'s attendance');
//       setRecords([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodayLoginHours();
//     const interval = setInterval(fetchTodayLoginHours, 30000); // Refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const handleRefresh = () => {
//     fetchTodayLoginHours();
//   };

//   // Format duration in Xh Ym
//   const formatDuration = (minutes) => {
//     if (!minutes || minutes <= 0) return '0h 0m';
//     const hrs = Math.floor(minutes / 60);
//     const mins = Math.floor(minutes % 60);
//     return `${hrs}h ${mins}m`;
//   };

//   // Format time (HH:MM AM/PM)
//   const formatTime = (dateStr) => {
//     if (!dateStr) return '—';
//     try {
//       return new Date(dateStr).toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch {
//       return 'Invalid';
//     }
//   };

//   const getStatusBadge = (status) => {
//     const s = (status || '').toLowerCase();
//     if (s === 'present') return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Present</span>;
//     if (s.includes('half')) return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Half Day</span>;
//     if (s === 'absent') return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Absent</span>;
//     return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Pending</span>;
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Today's Attendance</h1>
//           <p className="text-gray-600 mt-1">Live view of all logged-in employees</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className={`flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition
//               ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={18} />
//             {refreshing ? 'Refreshing...' : 'Refresh'}
//           </button>
//           <button
//             onClick={() => {/* Add CSV export if needed */}}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             <FiDownload className="mr-2" size={18} />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Live Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Logged In Now</p>
//               <p className="text-3xl font-bold text-green-600 mt-1">{stats.totalLoggedIn}</p>
//             </div>
//             <FiUserCheck size={40} className="text-green-100" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Currently on Break</p>
//               <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.totalOnBreak}</p>
//             </div>
//             <FiCoffee size={40} className="text-yellow-100" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Worked</p>
//               <p className="text-3xl font-bold text-blue-600 mt-1">
//                 {formatDuration(stats.totalWorkedHours * 60)}
//               </p>
//             </div>
//             <FiClock size={40} className="text-blue-100" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Breaks</p>
//               <p className="text-3xl font-bold text-purple-600 mt-1">
//                 {formatDuration(stats.totalBreakHours * 60)}
//               </p>
//             </div>
//             <FiCoffee size={40} className="text-purple-100" />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
//         <div className="px-6 py-5 border-b bg-gray-50">
//           <h2 className="text-xl font-semibold text-gray-800">Today's Active Employees</h2>
//         </div>

//         {loading ? (
//           <div className="p-12 text-center text-gray-500">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p>Loading today's attendance...</p>
//           </div>
//         ) : records.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             <FiUsers size={48} className="mx-auto mb-4 text-gray-300" />
//             <p className="text-lg font-medium">No employees logged in today yet</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Login Time</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logout Time</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Worked</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Break Time</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Break Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {records.map((record) => {
//                   const user = record.user || record.userId || {};
//                   const isLoggedIn = record.loginTime && !record.logoutTime;
//                   const breaks = record.breaks || record.allBreaks || [];
//                   const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');

//                   const totalBreakMin = (record.totalBreakHours || 0) * 60;
//                   const workedMin = (record.totalWorkedHours || 0) * 60;

//                   return (
//                     <tr key={record._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
//                             isLoggedIn ? 'bg-green-100' : 'bg-gray-100'
//                           }`}>
//                             <span className="font-bold text-gray-700">
//                               {(user.name || 'U')[0].toUpperCase()}
//                             </span>
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">{user.name || 'Unknown'}</div>
//                             <div className="text-xs text-gray-500">{user.email || '—'}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {formatTime(record.loginTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {isLoggedIn ? (
//                           <span className="text-yellow-600 font-medium">Ongoing</span>
//                         ) : formatTime(record.logoutTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {formatDuration(workedMin)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {formatDuration(totalBreakMin)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(record.status)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {isOnBreak ? (
//                           <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
//                             <FiCoffee className="mr-1" size={14} /> On Break
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                             Available
//                           </span>
//                         )}
//                       </td>
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

// export default AllLoginHoursToday;

//===========
// import { useState, useEffect } from 'react';
// import {
//   FiClock, FiRefreshCw, FiDownload, FiUserCheck, FiCoffee,
//   FiLogIn, FiLogOut, FiUsers
// } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const AllLoginHoursToday = () => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Live stats
//   const [stats, setStats] = useState({
//     totalLoggedIn: 0,
//     totalOnBreak: 0,
//     totalWorkedMinutes: 0,
//     totalBreakMinutes: 0
//   });

//   const fetchTodayData = async () => {
//     try {
//       setLoading(true);
//       setRefreshing(true);

//       const res = await api.get('/login-hours/today/all');

//       let data = res.data.data || res.data || [];
//       if (!Array.isArray(data)) data = [data];

//       // Remove admin accounts
//       const employeeData = data.filter(r =>
//         r.userId?.role?.toLowerCase() !== 'admin'
//       );

//       setRecords(employeeData);

//       // Calculate real-time stats
//       let loggedInCount = 0;
//       let onBreakCount = 0;
//       let totalWorkedMin = 0;
//       let totalBreakMin = 0;

//       const now = new Date();

//       employeeData.forEach(record => {
//         // Currently logged in?
//         if (record.loginTime && !record.logoutTime) {
//           loggedInCount++;

//           // Live worked minutes
//           const start = new Date(record.loginTime);
//           const liveMinutes = Math.floor((now - start) / (1000 * 60));
//           totalWorkedMin += liveMinutes;
//         }

//         // Currently on break?
//         const breaks = record.breaks || [];
//         const activeBreak = breaks.find(b => !b.end && b.status === 'approved');
//         if (activeBreak) {
//           onBreakCount++;

//           const breakStart = new Date(activeBreak.start);
//           const liveBreakMin = Math.floor((now - breakStart) / (1000 * 60));
//           totalBreakMin += liveBreakMin;
//         }

//         // Add completed breaks
//         breaks.forEach(b => {
//           if (b.end) {
//             totalBreakMin += Math.floor((new Date(b.end) - new Date(b.start)) / (1000 * 60));
//           }
//         });
//       });

//       setStats({
//         totalLoggedIn: loggedInCount,
//         totalOnBreak: onBreakCount,
//         totalWorkedMinutes: totalWorkedMin,
//         totalBreakMinutes: totalBreakMin
//       });

//     } catch (err) {
//       console.error('Fetch error:', err);
//       toast.error('Failed to load today\'s attendance');
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

//   const formatDuration = (totalMinutes) => {
//     if (totalMinutes <= 0) return '0h 0m';
//     const h = Math.floor(totalMinutes / 60);
//     const m = totalMinutes % 60;
//     return `${h}h ${m}m`;
//   };

//   const formatTime = (dateStr) => {
//     if (!dateStr) return '—';
//     try {
//       return new Date(dateStr).toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch {
//       return 'Invalid';
//     }
//   };

//   const getStatusBadge = (status) => {
//     const s = (status || '').toLowerCase();
//     switch (true) {
//       case s === 'present':
//         return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Present</span>;
//       case s.includes('half'):
//         return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Half Day</span>;
//       case s === 'absent':
//         return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Absent</span>;
//       default:
//         return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Pending</span>;
//     }
//   };

//   return (
//     <div className="space-y-6 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Today's Attendance</h1>
//           <p className="text-gray-600 mt-1">Live view of all active employees • {new Date().toLocaleDateString()}</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={fetchTodayData}
//             disabled={refreshing}
//             className={`flex items-center px-4 py-2.5 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 transition
//               ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
//           >
//             <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={18} />
//             {refreshing ? 'Refreshing...' : 'Refresh'}
//           </button>
//           <button className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//             <FiDownload className="mr-2" size={18} />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard
//           icon={<FiUserCheck size={32} />}
//           color="green"
//           label="Logged In Now"
//           value={stats.totalLoggedIn}
//         />
//         <StatCard
//           icon={<FiCoffee size={32} />}
//           color="amber"
//           label="Currently on Break"
//           value={stats.totalOnBreak}
//         />
//         <StatCard
//           icon={<FiClock size={32} />}
//           color="blue"
//           label="Total Worked Today"
//           value={formatDuration(stats.totalWorkedMinutes)}
//         />
//         <StatCard
//           icon={<FiCoffee size={32} />}
//           color="purple"
//           label="Total Break Time"
//           value={formatDuration(stats.totalBreakMinutes)}
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//         <div className="px-6 py-5 border-b bg-gray-50">
//           <h2 className="text-xl font-semibold text-gray-900">Active Employees Today</h2>
//         </div>

//         {loading ? (
//           <div className="p-12 text-center text-gray-500">
//             <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//             <p>Loading live attendance...</p>
//           </div>
//         ) : records.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             <FiUsers size={64} className="mx-auto mb-4 text-gray-300" />
//             <p className="text-lg font-medium">No employees have logged in today yet</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Login Time</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logout Time</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Worked</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Break Time</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Break Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {records.map((record) => {
//                   const user = record.userId || {}; // ← FIXED: use userId, not user
//                   const isLoggedIn = !!record.loginTime && !record.logoutTime;

//                   // LIVE calculation - most accurate
//                   const workedMinutes = calculateDurationMinutes(record.loginTime, record.logoutTime);
//                   const breakMinutes = calculateTotalBreakMinutes(record.breaks || []);

//                   return (
//                     <tr key={record._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-3">
//                           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
//                             ${isLoggedIn ? 'bg-green-600' : 'bg-gray-500'}`}>
//                             {(user.name || '?')[0].toUpperCase()}
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900">{user.name || 'Unknown'}</div>
//                             <div className="text-xs text-gray-500">{user.email || '—'}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                         {formatTime(record.loginTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {isLoggedIn ? (
//                           <span className="text-amber-600 font-medium">Ongoing</span>
//                         ) : formatTime(record.logoutTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                         {formatDuration(workedMinutes)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                         {formatDuration(breakMinutes)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(record.status)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {isOnBreak(record) ? (
//                           <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
//                             <FiCoffee size={14} /> On Break
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                             Available
//                           </span>
//                         )}
//                       </td>
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

// // Helpers (same as before)
// const calculateDurationMinutes = (start, end = null) => {
//   if (!start) return 0;
//   const endTime = end || new Date();
//   const diffMs = new Date(endTime) - new Date(start);
//   return diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;
// };

// const calculateTotalBreakMinutes = (breaks = []) => {
//   let total = 0;
//   for (const b of breaks) {
//     if (b.start && b.end) {
//       const diff = new Date(b.end) - new Date(b.start);
//       total += diff > 0 ? Math.floor(diff / (1000 * 60)) : 0;
//     }
//   }
//   return total;
// };

// const isOnBreak = (record) => {
//   const breaks = record.breaks || [];
//   return breaks.some(b => !b.end && b.status === 'approved');
// };

// const formatDuration = (minutes) => {
//   if (minutes <= 0) return '0h 0m';
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;
//   return `${h}h ${m}m`;
// };

// const StatCard = ({ icon, color, label, value }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm text-gray-600 font-medium">{label}</p>
//         <p className="text-3xl font-bold mt-2" style={{ color: `${color}-700` }}>
//           {value}
//         </p>
//       </div>
//       <div className={`p-3 bg-${color}-50 rounded-lg`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// export default AllLoginHoursToday;
//=====================================




// import { useState, useEffect } from 'react';
// import { FiRefreshCw, FiDownload, FiUser } from 'react-icons/fi';
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
//     const interval = setInterval(fetchTodayData, 30000); // Live feel
//     return () => clearInterval(interval);
//   }, []);

//   const handleRefresh = () => fetchTodayData();

//   // Format time (HH:MM AM/PM)
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

//   // Calculate real duration in minutes (live for ongoing)
//   const calculateDurationMinutes = (start, end = null) => {
//     if (!start) return 0;
//     const endTime = end || new Date();
//     const diffMs = new Date(endTime) - new Date(start);
//     return diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;
//   };

//   // Calculate total break minutes (only completed breaks)
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

//   // Format Xh Ym
//   const formatDuration = (minutes) => {
//     if (minutes <= 0) return '0h 0m';
//     const h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     return `${h}h ${m}m`;
//   };

//   const getStatusBadge = (status) => {
//     const s = (status || '').toLowerCase();
//     if (s === 'present') {
//       return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium animate-pulse">Present</span>;
//     }
//     if (s.includes('half')) {
//       return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Half Day</span>;
//     }
//     if (s === 'absent') {
//       return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Absent</span>;
//     }
//     return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Pending</span>;
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Today's Attendance</h1>
//           <p className="text-gray-600 mt-2">
//             Live view of all active employees • {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
//           </p>
//         </div>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className={`flex items-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm
//               ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
//           >
//             <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={18} />
//             {refreshing ? 'Refreshing...' : 'Refresh'}
//           </button>

//           <button className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md">
//             <FiDownload className="mr-2" size={18} />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Main Table */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
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
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break Time</th>
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
//                   <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {records.map((record) => {
//                   const user = record.userId || {};
//                   const isLoggedIn = !!record.loginTime && !record.logoutTime;

//                   const workedMinutes = calculateDurationMinutes(record.loginTime, record.logoutTime);
//                   const breakMinutes = calculateTotalBreakMinutes(record.breaks || []);

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
//                         {formatDuration(workedMinutes)}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap text-base font-semibold text-gray-900">
//                         {formatDuration(breakMinutes)}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap">
//                         {getStatusBadge(record.status)}
//                       </td>

//                       <td className="px-8 py-6 whitespace-nowrap">
//                         {isOnBreak(record) ? (
//                           <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium shadow-sm">
//                             <FiCoffee size={16} /> On Break
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
//                             Available
//                           </span>
//                         )}
//                       </td>
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

// // Helper functions (same as before)
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

// const isOnBreak = (record) => {
//   const breaks = record.breaks || [];
//   return breaks.some(b => !b.end && b.status === 'approved');
// };

// const formatDuration = (minutes) => {
//   if (minutes <= 0) return '0h 0m';
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;
//   return `${h}h ${m}m`;
// };

// export default AllLoginHoursToday;

//====================
import { useState, useEffect } from 'react';
import { FiRefreshCw, FiDownload, FiCoffee } from 'react-icons/fi';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AllLoginHoursToday = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodayData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);

      const res = await api.get('/login-hours/today/all');

      let data = res.data.data || res.data || [];
      if (!Array.isArray(data)) data = [data];

      // Filter out admin
      const employeeData = data.filter(r =>
        r.userId?.role?.toLowerCase() !== 'admin'
      );

      setRecords(employeeData);

    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load today\'s attendance');
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

  const handleRefresh = () => fetchTodayData();

  // Helpers
  const formatTime = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return 'Invalid';
    }
  };

  const calculateDurationMinutes = (start, end = null) => {
    if (!start) return 0;
    const endTime = end || new Date();
    const diffMs = new Date(endTime) - new Date(start);
    return diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;
  };

  const calculateTotalBreakMinutes = (breaks = []) => {
    let total = 0;
    breaks.forEach(b => {
      if (b.start && b.end) {
        const diff = new Date(b.end) - new Date(b.start);
        if (diff > 0) total += Math.floor(diff / (1000 * 60));
      }
    });
    return total;
  };

  const formatDuration = (minutes) => {
    if (minutes <= 0) return '0h 0m';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const isOnBreak = (record) => {
    const breaks = record.breaks || [];
    return breaks.some(b => !b.end && b.status === 'approved');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Today's Attendance</h1>
          <p className="text-gray-600 mt-2">
            Live view of all active employees • {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`flex items-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm
              ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={18} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>

          <button className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md">
            <FiDownload className="mr-2" size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Gradient Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-2xl font-bold">Active Employees Today</h2>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">Loading live attendance data...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <FiUsers size={80} className="mx-auto mb-6 text-gray-300" />
            <p className="text-xl font-medium">No employees have logged in today yet</p>
            <p className="mt-2">Check back later or refresh the page</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Employee</th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Login Time</th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Logout Time</th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Worked</th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break Time</th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Break Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {records.map((record) => {
                  const user = record.userId || {};
                  const isLoggedIn = !!record.loginTime && !record.logoutTime;
                  const onBreak = isOnBreak(record);

                  const workedMin = calculateDurationMinutes(record.loginTime, record.logoutTime);
                  const breakMin = calculateTotalBreakMinutes(record.breaks || []);

                  return (
                    <tr
                      key={record._id}
                      className="hover:bg-blue-50 transition-all duration-150"
                    >
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md
                            ${isLoggedIn ? 'bg-green-600' : 'bg-gray-500'}`}>
                            {(user.name || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="text-base font-semibold text-gray-900">{user.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500 mt-1">{user.email || '—'}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-700">
                        {formatTime(record.loginTime)}
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                        {isLoggedIn ? (
                          <span className="text-amber-600 font-semibold">Ongoing</span>
                        ) : formatTime(record.logoutTime)}
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap text-base font-semibold text-gray-900">
                        {formatDuration(workedMin)}
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap text-base font-semibold text-gray-900">
                        {formatDuration(breakMin)}
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap">
                        {isLoggedIn ? (
                          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-pulse shadow-sm">
                            Logged In
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            Logged Out
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-6 whitespace-nowrap">
                        {onBreak ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium shadow-sm animate-pulse">
                            <FiCoffee size={16} /> On Break
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            Available
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

// Helper functions (unchanged)
const calculateDurationMinutes = (start, end = null) => {
  if (!start) return 0;
  const endTime = end || new Date();
  const diffMs = new Date(endTime) - new Date(start);
  return diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;
};

const calculateTotalBreakMinutes = (breaks = []) => {
  let total = 0;
  breaks.forEach(b => {
    if (b.start && b.end) {
      const diff = new Date(b.end) - new Date(b.start);
      if (diff > 0) total += Math.floor(diff / (1000 * 60));
    }
  });
  return total;
};

const formatDuration = (minutes) => {
  if (minutes <= 0) return '0h 0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export default AllLoginHoursToday;

//---------------deepseek-----------

// import { useState, useEffect, useMemo } from 'react';
// import {
//   FiUsers, FiClock, FiRefreshCw, FiDownload, FiSearch,
//   FiLogIn, FiLogOut, FiCoffee, FiUserCheck, FiUserX, FiCheckCircle
// } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const AllLoginHoursToday = () => {
//   const [loginRecords, setLoginRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Format helpers
//   const formatTime = (isoString) => {
//     if (!isoString) return '—';
//     return new Date(isoString).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const formatDuration = (start, end = null) => {
//     if (!start) return '—';

//     const startTime = new Date(start);
//     const endTime = end ? new Date(end) : new Date();

//     if (isNaN(startTime) || isNaN(endTime)) return '—';

//     const diffMs = endTime - startTime;
//     if (diffMs < 0) return '—';

//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     return `${hours}h ${minutes}m`;
//   };

//   const getTotalBreakTime = (breaks = []) => {
//     let totalMs = 0;

//     for (const b of breaks) {
//       if (b.start && b.end) {
//         totalMs += new Date(b.end) - new Date(b.start);
//       }
//     }

//     if (totalMs === 0) return '0h 0m';

//     const hours = Math.floor(totalMs / (1000 * 60 * 60));
//     const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

//     return `${hours}h ${minutes}m`;
//   };

//   const fetchTodayLoginData = async () => {
//     try {
//       setLoading(true);
//       setRefreshing(true);

//       const today = new Date().toISOString().split('T')[0];

//       const response = await api.get('/login-hours/today', {
//         params: { date: today }
//       });

//       let records = response.data?.data || response.data || [];

//       // Ensure array
//       if (!Array.isArray(records)) {
//         records = [records].filter(Boolean);
//       }

//       // Filter out admin (you can adjust condition according to your data structure)
//       records = records.filter(record => {
//         const name = record?.user?.name || record?.userId?.name || '';
//         const email = record?.user?.email || record?.userId?.email || '';

//         // Example filters - customize according to your system
//         return (
//           !name.toLowerCase().includes('admin') &&
//           !email.toLowerCase().includes('admin') &&
//           record?.user?.role !== 'admin' &&
//           record?.userId?.role !== 'admin'
//         );
//       });

//       setLoginRecords(records);

//     } catch (error) {
//       console.error('Failed to load today\'s attendance:', error);
//       toast.error(error.response?.data?.message || 'Failed to load today\'s attendance');
//       setLoginRecords([]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodayLoginData();

//     // Auto refresh every 60 seconds
//     const interval = setInterval(fetchTodayLoginData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const filteredRecords = useMemo(() => {
//     if (!searchTerm.trim()) return loginRecords;

//     const term = searchTerm.toLowerCase().trim();

//     return loginRecords.filter(record => {
//       const name = (record?.user?.name || record?.userId?.name || '').toLowerCase();
//       const email = (record?.user?.email || record?.userId?.email || '').toLowerCase();

//       return name.includes(term) || email.includes(term);
//     });
//   }, [loginRecords, searchTerm]);

//   const exportToCSV = () => {
//     if (filteredRecords.length === 0) {
//       toast.error('No data to export');
//       return;
//     }

//     const headers = [
//       'Employee Name',
//       'Login Time',
//       'Logout Time',
//       'Total Duration',
//       'Break Time',
//       'Working Time',
//       'Current Status',
//       'Break Status'
//     ];

//     const csvRows = filteredRecords.map(record => {
//       const name = record?.user?.name || record?.userId?.name || 'Unknown';
//       const isLoggedIn = !!record.loginTime && !record.logoutTime;
//       const isOnBreak = (record.breaks || []).some(b => b.start && !b.end);

//       return [
//         `"${name.replace(/"/g, '""')}"`,
//         `"${formatTime(record.loginTime)}"`,
//         `"${formatTime(record.logoutTime)}"`,
//         `"${formatDuration(record.loginTime, record.logoutTime)}"`,
//         `"${getTotalBreakTime(record.breaks)}"`,
//         `"${formatDuration(record.loginTime, record.logoutTime)}"`, // you can adjust if you want pure working time
//         isLoggedIn ? 'Logged In' : (record.logoutTime ? 'Logged Out' : 'Not Logged'),
//         isOnBreak ? 'On Break' : 'Not on Break'
//       ];
//     });

//     const csvContent = [
//       headers.join(','),
//       ...csvRows
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `attendance-today-${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Today's Attendance
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Real-time employee login, logout & break status
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => {
//               setRefreshing(true);
//               fetchTodayLoginData();
//             }}
//             disabled={refreshing}
//             className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
//           >
//             <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} />
//             Refresh
//           </button>

//           <button
//             onClick={exportToCSV}
//             disabled={filteredRecords.length === 0}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
//           >
//             <FiDownload />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <StatCard
//           icon={<FiUsers className="w-6 h-6" />}
//           title="Present"
//           value={loginRecords.filter(r => r.loginTime).length}
//           color="green"
//         />
//         <StatCard
//           icon={<FiLogIn className="w-6 h-6" />}
//           title="Logged In"
//           value={loginRecords.filter(r => r.loginTime && !r.logoutTime).length}
//           color="blue"
//         />
//         <StatCard
//           icon={<FiCoffee className="w-6 h-6" />}
//           title="On Break"
//           value={loginRecords.filter(r => (r.breaks || []).some(b => b.start && !b.end)).length}
//           color="yellow"
//         />
//         <StatCard
//           icon={<FiClock className="w-6 h-6" />}
//           title="Total Hours"
//           value={loginRecords.reduce((sum, r) => {
//             const d = formatDuration(r.loginTime, r.logoutTime);
//             const [h] = d.split('h').map(Number);
//             return sum + (isNaN(h) ? 0 : h);
//           }, 0) + 'h'}
//           color="purple"
//         />
//       </div>

//       {/* Search & Filter Bar */}
//       <div className="bg-white rounded-xl shadow p-4">
//         <div className="relative max-w-md">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             placeholder="Search employee name or email..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* Main Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Today's Login Records ({filteredRecords.length})
//           </h2>
//         </div>

//         {loading ? (
//           <div className="p-12 text-center text-gray-500">
//             Loading today's attendance...
//           </div>
//         ) : filteredRecords.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             {searchTerm
//               ? "No employees match your search"
//               : "No attendance records found for today"}
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Employee
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Login
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Logout
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Total Time
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Break Time
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredRecords.map((record, idx) => {
//                   const name = record?.user?.name || record?.userId?.name || 'Unknown';
//                   const isLoggedIn = !!record.loginTime && !record.logoutTime;
//                   const isOnBreak = (record.breaks || []).some(b => b.start && !b.end);

//                   return (
//                     <tr key={idx} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
//                             {name.charAt(0).toUpperCase()}
//                           </div>
//                           <span className="ml-3 font-medium text-gray-900">{name}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {formatTime(record.loginTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {formatTime(record.logoutTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {formatDuration(record.loginTime, record.logoutTime)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         {getTotalBreakTime(record.breaks)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           {isLoggedIn && (
//                             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               <FiUserCheck className="w-3.5 h-3.5 mr-1" />
//                               Logged In
//                             </span>
//                           )}
//                           {isOnBreak && (
//                             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                               <FiCoffee className="w-3.5 h-3.5 mr-1" />
//                               Break
//                             </span>
//                           )}
//                           {!isLoggedIn && record.logoutTime && (
//                             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                               <FiLogOut className="w-3.5 h-3.5 mr-1" />
//                               Logged Out
//                             </span>
//                           )}
//                         </div>
//                       </td>
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

// // Small helper component for stats cards
// const StatCard = ({ icon, title, value, color }) => (
//   <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-5 shadow-sm`}>
//     <div className={`text-${color}-600 mb-1`}>{icon}</div>
//     <div className="text-2xl font-bold text-gray-800">{value}</div>
//     <div className="text-sm text-gray-600 mt-1">{title}</div>
//   </div>
// );

// export default AllLoginHoursToday;



