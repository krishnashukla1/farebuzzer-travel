//======correct======================

// import { useState, useEffect } from 'react';
// import { FiUsers, FiClock, FiFilter, FiSearch, FiDownload } from 'react-icons/fi';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const AllLoginHours = () => {
//   const [loginHours, setLoginHours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
//     endDate: new Date()
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState('all');
//   const [employees, setEmployees] = useState([]);
//   const [stats, setStats] = useState({
//     totalRecords: 0,
//     totalHours: 0,
//     averageHours: 0
//   });

//   const fetchAllLoginHours = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         startDate: dateRange.startDate.toISOString().split('T')[0],
//         endDate: dateRange.endDate.toISOString().split('T')[0]
//       };

//       if (selectedEmployee !== 'all') {
//         params.userId = selectedEmployee;
//       }

//       const response = await api.getAllLoginHours(params);
//       setLoginHours(response.data.records || []);
      
//       // Extract unique employees
//       const uniqueEmployees = [...new Map(
//         (response.data.records || []).map(record => [
//           record.user?._id,
//           record.user
//         ])
//       ).values()];
//       setEmployees(uniqueEmployees);
      
//       // Calculate stats
//       const totalHours = (response.data.records || []).reduce((sum, record) => {
//         return sum + parseFloat(record.workedHours || 0);
//       }, 0);
      
//       const totalRecords = response.data.records?.length || 0;
      
//       setStats({
//         totalRecords,
//         totalHours: totalHours.toFixed(2),
//         averageHours: (totalHours / (totalRecords || 1)).toFixed(2)
//       });
//     } catch (error) {
//       toast.error('Failed to fetch login hours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllLoginHours();
//   }, [dateRange, selectedEmployee]);

//   const filteredLoginHours = loginHours.filter(record => {
//     if (!searchTerm) return true;
    
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       record.user?.name?.toLowerCase().includes(searchLower) ||
//       record.user?.email?.toLowerCase().includes(searchLower) ||
//       record.date?.toLowerCase().includes(searchLower) ||
//       record.status?.toLowerCase().includes(searchLower)
//     );
//   });

//   const exportToCSV = () => {
//     const headers = ['Employee', 'Date', 'Login Time', 'Logout Time', 'Worked Hours', 'Break Hours', 'Status'];
//     const csvData = filteredLoginHours.map(record => [
//       record.user?.name || 'Unknown',
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
//     a.download = `all-login-hours-${new Date().toISOString().split('T')[0]}.csv`;
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
//             <h1 className="text-2xl font-bold text-gray-800">All Login Hours</h1>
//             <p className="text-gray-600 mt-2">
//               Monitor all employee login hours and attendance
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

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Records</p>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {stats.totalRecords}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <FiClock className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Hours</p>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {stats.totalHours} hrs
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//               <FiClock className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Avg Hours/Record</p>
//               <p className="text-2xl font-bold text-gray-800 mt-2">
//                 {stats.averageHours} hrs
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//               <FiUsers className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Date Range */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Date Range
//             </label>
//             <div className="flex space-x-2">
//               <DatePicker
//                 selected={dateRange.startDate}
//                 onChange={(date) => setDateRange({...dateRange, startDate: date})}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholderText="From Date"
//                 maxDate={new Date()}
//               />
//               <DatePicker
//                 selected={dateRange.endDate}
//                 onChange={(date) => setDateRange({...dateRange, endDate: date})}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholderText="To Date"
//                 maxDate={new Date()}
//                 minDate={dateRange.startDate}
//               />
//             </div>
//           </div>

//           {/* Employee Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Employee
//             </label>
//             <select
//               value={selectedEmployee}
//               onChange={(e) => setSelectedEmployee(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Employees</option>
//               {employees.map((employee) => (
//                 <option key={employee?._id} value={employee?._id}>
//                   {employee?.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Search */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search by name, email, date..."
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Hours Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-800">Login Hours Records</h2>
//           <div className="text-sm text-gray-600">
//             Showing {filteredLoginHours.length} of {loginHours.length} records
//           </div>
//         </div>
        
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="spinner mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading login hours...</p>
//           </div>
//         ) : filteredLoginHours.length === 0 ? (
//           <div className="p-8 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiUsers className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
//             <p className="text-gray-600">No login hours found for the selected filters</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Employee
//                   </th>
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
//                 {filteredLoginHours.map((record, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
//                           <span className="text-blue-600 font-medium">
//                             {record.user?.name?.charAt(0) || 'U'}
//                           </span>
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">
//                             {record.user?.name || 'Unknown'}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {record.user?.email || 'N/A'}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatDate(record.date)}
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

// export default AllLoginHours;

//============================================================

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
//   FiXCircle
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
//     absentCount: 0
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

//       // Use direct API call instead of api.getAllLoginHours
//       let response;
//       try {
//         // First try with direct endpoint
//         response = await api.get('/login-hours', {
//           params: {
//             startDate: dateRange.startDate.toISOString().split('T')[0],
//             endDate: dateRange.endDate.toISOString().split('T')[0],
//             ...(selectedEmployee !== 'all' && { userId: selectedEmployee })
//           }
//         });
//         debugLog('Direct API call successful', response.data);
//       } catch (directError) {
//         debugLog('Direct API call failed, trying fallback', directError);
        
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
//           throw new Error('Both API endpoints failed');
//         }
//       }

//       // Handle different response structures
//       const records = response.data.records || response.data.data || response.data || [];
//       debugLog('Processed records', records);
      
//       setLoginHours(Array.isArray(records) ? records : []);

//       // Extract unique employees
//       const employeeMap = new Map();
//       records.forEach(record => {
//         if (record.userId) {
//           employeeMap.set(record.userId._id || record.userId, record.userId);
//         } else if (record.user) {
//           employeeMap.set(record.user._id || record.user, record.user);
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
//         totalRecords,
//         totalHours: totalHours.toFixed(2),
//         averageHours: totalRecords > 0 ? (totalHours / totalRecords).toFixed(2) : '0.00',
//         presentCount,
//         halfDayCount,
//         absentCount
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
//       const headers = ['Employee Name', 'Employee Email', 'Date', 'Login Time', 'Logout Time', 'Worked Hours', 'Break Hours', 'Status'];
      
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

//         return [userName, userEmail, date, loginTime, logoutTime, workedHours, breakHours, status];
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

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">All Login Hours</h1>
//             <p className="text-gray-600 mt-1">
//               Monitor employee attendance and working hours
//             </p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all duration-200"
//             >
//               <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//               {refreshing ? 'Refreshing...' : 'Refresh Data'}
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

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Total Records</p>
//               <p className="text-2xl font-bold mt-1">{stats.totalRecords}</p>
//             </div>
//             <FiCalendar className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Total Hours</p>
//               <p className="text-2xl font-bold mt-1">{stats.totalHours} hrs</p>
//             </div>
//             <FiClock className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Avg Hours/Day</p>
//               <p className="text-2xl font-bold mt-1">{stats.averageHours} hrs</p>
//             </div>
//             <FiUsers className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Present</p>
//               <p className="text-2xl font-bold mt-1">{stats.presentCount}</p>
//             </div>
//             <FiCheckCircle className="w-10 h-10 opacity-80" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm opacity-90">Absent</p>
//               <p className="text-2xl font-bold mt-1">{stats.absentCount}</p>
//             </div>
//             <FiXCircle className="w-10 h-10 opacity-80" />
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
//             <p className="text-sm text-gray-500 mt-2">Checking API endpoints...</p>
//           </div>
//         ) : loginHours.length === 0 ? (
//           <div className="p-8 text-center">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FiUsers className="w-10 h-10 text-blue-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Records Found</h3>
//             <p className="text-gray-600 mb-6">
//               No login hours found for the selected period.
//               {selectedEmployee !== 'all' && ' Try selecting "All Employees".'}
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
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredLoginHours.map((record, index) => {
//                     const userName = record.user?.name || record.userId?.name || 'Unknown';
//                     const userEmail = record.user?.email || record.userId?.email || '';
//                     const userInitial = userName.charAt(0).toUpperCase();
                    
//                     return (
//                       <tr key={index} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
//                               <span className="text-blue-600 font-bold">{userInitial}</span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-semibold text-gray-900">{userName}</div>
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
//                           <div className="text-sm font-medium text-gray-900">
//                             {formatTime(record.logoutTime)}
//                           </div>
//                           {record.logoutTime && (
//                             <div className="text-xs text-gray-500">
//                               {new Date(record.logoutTime).toLocaleDateString()}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-semibold text-gray-900">
//                             {formatHours(record.workedHours || record.totalWorkedHours)} hrs
//                           </div>
//                           {record.logoutTime && record.loginTime && (
//                             <div className="text-xs text-gray-500">
//                               {calculateDuration(record.loginTime, record.logoutTime)}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {formatHours(record.breakHours || record.totalBreakHours)} hrs
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(record.status)}
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
//                   <span className="font-semibold">Summary:</span> 
//                   <span className="ml-2">
//                     {stats.presentCount > 0 && <span className="text-green-600">{stats.presentCount} Present</span>}
//                     {stats.halfDayCount > 0 && <span className="text-yellow-600">, {stats.halfDayCount} Half Day</span>}
//                     {stats.absentCount > 0 && <span className="text-red-600">, {stats.absentCount} Absent</span>}
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

// // Helper function for duration calculation
// const calculateDuration = (start, end) => {
//   if (!start || !end) return '';
  
//   try {
//     const startTime = new Date(start);
//     const endTime = new Date(end);
//     const diffMs = endTime - startTime;
    
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${hours}h ${minutes}m`;
//   } catch (error) {
//     return '';
//   }
// };

// export default AllLoginHours;

//==================================

import { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiClock, 
  FiFilter, 
  FiSearch, 
  FiDownload, 
  FiRefreshCw,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiLogIn,
  FiLogOut,
  FiCoffee,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';
import api from '../api/axios';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AllLoginHours = () => {
  const [loginHours, setLoginHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    totalRecords: 0,
    totalHours: 0,
    averageHours: 0,
    presentCount: 0,
    halfDayCount: 0,
    absentCount: 0,
    currentlyLoggedIn: 0,
    currentlyOnBreak: 0
  });

  // Debug function to log API responses
  const debugLog = (message, data) => {
    console.log(`[AllLoginHours] ${message}:`, data);
  };

  const fetchAllLoginHours = async () => {
    try {
      setLoading(true);
      debugLog('Fetching login hours with params', {
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
        selectedEmployee
      });

      let response;
      try {
        // Try the main endpoint
        response = await api.get('/login-hours', {
          params: {
            startDate: dateRange.startDate.toISOString().split('T')[0],
            endDate: dateRange.endDate.toISOString().split('T')[0],
            ...(selectedEmployee !== 'all' && { userId: selectedEmployee })
          }
        });
        debugLog('Main API call successful', response.data);
      } catch (mainError) {
        debugLog('Main API call failed, trying alternate', mainError);
        
        // Try alternate endpoint
        try {
          response = await api.get('/api/login-hours', {
            params: {
              startDate: dateRange.startDate.toISOString().split('T')[0],
              endDate: dateRange.endDate.toISOString().split('T')[0],
              ...(selectedEmployee !== 'all' && { userId: selectedEmployee })
            }
          });
          debugLog('Alternate API call successful', response.data);
        } catch (alternateError) {
          debugLog('Both API endpoints failed', alternateError);
          
          // Try getting today's data and format it
          try {
            const todayResponse = await api.get('/login-hours/today');
            debugLog('Today data response', todayResponse.data);
            
            // Format as if it were from getAllLoginHours
            const todayData = todayResponse.data.data || todayResponse.data;
            const formattedRecords = todayData ? [{
              ...todayData,
              user: { 
                name: 'Current User', 
                email: 'user@example.com',
                _id: 'current'
              },
              userId: { 
                name: 'Current User', 
                email: 'user@example.com',
                _id: 'current'
              }
            }] : [];
            
            response = { data: { records: formattedRecords } };
          } catch (todayError) {
            throw new Error('All API endpoints failed');
          }
        }
      }

      // Handle different response structures
      let records = response.data.records || response.data.data || response.data || [];
      
      // Ensure it's an array
      if (!Array.isArray(records)) {
        records = [records];
      }
      
      debugLog('Processed records', records);
      setLoginHours(records);

      // Extract unique employees
      const employeeMap = new Map();
      records.forEach(record => {
        if (record.userId && typeof record.userId === 'object') {
          employeeMap.set(record.userId._id || record.userId.id, record.userId);
        } else if (record.user) {
          employeeMap.set(record.user._id || record.user.id, record.user);
        } else if (record.userId && typeof record.userId === 'string') {
          // If userId is just an ID string
          employeeMap.set(record.userId, { _id: record.userId, name: 'Unknown User' });
        }
      });
      
      const uniqueEmployees = Array.from(employeeMap.values());
      setEmployees(uniqueEmployees);
      debugLog('Extracted employees', uniqueEmployees);
      
      // Calculate statistics
      let totalHours = 0;
      let presentCount = 0;
      let halfDayCount = 0;
      let absentCount = 0;
      let currentlyLoggedIn = 0;
      let currentlyOnBreak = 0;
      
      records.forEach(record => {
        const hours = parseFloat(record.workedHours || record.totalWorkedHours || 0);
        totalHours += hours;
        
        const status = (record.status || '').toLowerCase();
        if (status === 'present') presentCount++;
        else if (status === 'half-day' || status === 'half day') halfDayCount++;
        else if (status === 'absent') absentCount++;
        
        // Check if currently logged in (has login time but no logout time)
        if (record.loginTime && !record.logoutTime) {
          currentlyLoggedIn++;
        }
        
        // Check if currently on break
        const breaks = record.breaks || record.allBreaks || [];
        const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
        if (isOnBreak) {
          currentlyOnBreak++;
        }
      });
      
      const totalRecords = records.length;
      
      setStats({
        totalRecords,
        totalHours: totalHours.toFixed(2),
        averageHours: totalRecords > 0 ? (totalHours / totalRecords).toFixed(2) : '0.00',
        presentCount,
        halfDayCount,
        absentCount,
        currentlyLoggedIn,
        currentlyOnBreak
      });
      
      debugLog('Calculated stats', stats);
      
    } catch (error) {
      console.error('Error fetching login hours:', error);
      debugLog('Error details', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch login hours');
      }
      
      setLoginHours([]);
      setEmployees([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllLoginHours();
    
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchAllLoginHours, 30000);
    return () => clearInterval(interval);
  }, [dateRange, selectedEmployee]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllLoginHours();
  };

  const filteredLoginHours = loginHours.filter(record => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Check various fields
    const userName = record.user?.name || record.userId?.name || '';
    const userEmail = record.user?.email || record.userId?.email || '';
    const date = record.date || '';
    const status = record.status || '';
    
    return (
      userName.toLowerCase().includes(searchLower) ||
      userEmail.toLowerCase().includes(searchLower) ||
      date.toLowerCase().includes(searchLower) ||
      status.toLowerCase().includes(searchLower)
    );
  });

  const exportToCSV = () => {
    if (filteredLoginHours.length === 0) {
      toast.error('No data to export');
      return;
    }

    try {
      const headers = ['Employee Name', 'Employee Email', 'Date', 'Login Time', 'Logout Time', 'Worked Hours', 'Break Hours', 'Status', 'Login Status', 'Break Status'];
      
      const csvData = filteredLoginHours.map(record => {
        const userName = record.user?.name || record.userId?.name || 'Unknown';
        const userEmail = record.user?.email || record.userId?.email || 'N/A';
        const date = record.date || 'N/A';
        const loginTime = record.loginTime ? new Date(record.loginTime).toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit'
        }) : 'N/A';
        const logoutTime = record.logoutTime ? new Date(record.logoutTime).toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit'
        }) : 'N/A';
        const workedHours = record.workedHours || record.totalWorkedHours || '0.00';
        const breakHours = record.breakHours || record.totalBreakHours || '0.00';
        const status = record.status || 'Pending';
        
        // Calculate login status
        const isLoggedIn = record.loginTime && !record.logoutTime;
        const loginStatus = isLoggedIn ? 'Logged In' : 'Logged Out';
        
        // Calculate break status
        const breaks = record.breaks || record.allBreaks || [];
        const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
        const breakStatus = isOnBreak ? 'On Break' : 'Not on Break';

        return [userName, userEmail, date, loginTime, logoutTime, workedHours, breakHours, status, loginStatus, breakStatus];
      });

      const csv = [
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `all-login-hours-${new Date().toISOString().split('T')[0]}.csv`;
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Handle YYYY-MM-DD format
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
      }
      
      // Handle date objects
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid time';
      
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid time';
    }
  };

  const formatHours = (hours) => {
    if (!hours && hours !== 0) return '0.00';
    return parseFloat(hours).toFixed(2);
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || '').toLowerCase();
    
    switch (statusLower) {
      case 'present':
        return (
          <div className="flex items-center">
            <FiCheckCircle className="w-4 h-4 text-green-500 mr-1.5" />
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Present
            </span>
          </div>
        );
      case 'half-day':
      case 'half day':
        return (
          <div className="flex items-center">
            <FiAlertCircle className="w-4 h-4 text-yellow-500 mr-1.5" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Half Day
            </span>
          </div>
        );
      case 'absent':
        return (
          <div className="flex items-center">
            <FiXCircle className="w-4 h-4 text-red-500 mr-1.5" />
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              Absent
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <FiAlertCircle className="w-4 h-4 text-gray-500 mr-1.5" />
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              Pending
            </span>
          </div>
        );
    }
  };

  // Get login status (logged in/out)
  const getLoginStatus = (record) => {
    const isLoggedIn = record.loginTime && !record.logoutTime;
    
    if (isLoggedIn) {
      return (
        <div className="flex items-center">
          <FiUserCheck className="w-4 h-4 text-green-500 mr-1.5" />
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Logged In
          </span>
        </div>
      );
    } else if (record.logoutTime) {
      return (
        <div className="flex items-center">
          <FiUserX className="w-4 h-4 text-gray-500 mr-1.5" />
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            Logged Out
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <FiLogIn className="w-4 h-4 text-blue-500 mr-1.5" />
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Not Logged In
          </span>
        </div>
      );
    }
  };

  // Get break status (on break/not on break)
  const getBreakStatus = (record) => {
    const breaks = record.breaks || record.allBreaks || [];
    const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
    
    if (isOnBreak) {
      return (
        <div className="flex items-center">
          <FiCoffee className="w-4 h-4 text-yellow-500 mr-1.5" />
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            On Break
          </span>
        </div>
      );
    } else if (breaks.length > 0) {
      return (
        <div className="flex items-center">
          <FiCoffee className="w-4 h-4 text-gray-500 mr-1.5" />
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            Not on Break
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <FiCoffee className="w-4 h-4 text-gray-400 mr-1.5" />
          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
            No Breaks
          </span>
        </div>
      );
    }
  };

  const handleDateChange = (type, date) => {
    if (!date) return;
    
    if (type === 'startDate' && date > dateRange.endDate) {
      setDateRange({
        startDate: date,
        endDate: date
      });
    } else if (type === 'endDate' && date < dateRange.startDate) {
      setDateRange({
        startDate: date,
        endDate: date
      });
    } else {
      setDateRange(prev => ({
        ...prev,
        [type]: date
      }));
    }
  };

  // Calculate duration helper
  const calculateDuration = (start, end) => {
    if (!start) return '';
    if (!end) return 'Ongoing';
    
    try {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const diffMs = endTime - startTime;
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Login Hours</h1>
            <p className="text-gray-600 mt-1">
              Monitor employee attendance, login status, and break information
            </p>
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
              disabled={filteredLoginHours.length === 0}
              className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FiDownload className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Live Status Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Currently Logged In</p>
              <p className="text-2xl font-bold mt-1">{stats.currentlyLoggedIn}</p>
              <p className="text-xs opacity-80 mt-1">Active sessions</p>
            </div>
            <FiLogIn className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Currently On Break</p>
              <p className="text-2xl font-bold mt-1">{stats.currentlyOnBreak}</p>
              <p className="text-xs opacity-80 mt-1">Active breaks</p>
            </div>
            <FiCoffee className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Present Today</p>
              <p className="text-2xl font-bold mt-1">{stats.presentCount}</p>
              <p className="text-xs opacity-80 mt-1">Total records</p>
            </div>
            <FiCheckCircle className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Hours</p>
              <p className="text-2xl font-bold mt-1">{stats.totalHours} hrs</p>
              <p className="text-xs opacity-80 mt-1">Average: {stats.averageHours} hrs/day</p>
            </div>
            <FiClock className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="inline mr-2" />
              Date Range
            </label>
            <div className="flex space-x-2">
              <DatePicker
                selected={dateRange.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholderText="Start Date"
                maxDate={new Date()}
                dateFormat="MMM dd, yyyy"
                isClearable
              />
              <DatePicker
                selected={dateRange.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholderText="End Date"
                maxDate={new Date()}
                minDate={dateRange.startDate}
                dateFormat="MMM dd, yyyy"
                isClearable
              />
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => setDateRange({
                  startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
                  endDate: new Date()
                })}
                className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setDateRange({
                  startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
                  endDate: new Date()
                })}
                className="flex-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* Employee Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiUser className="inline mr-2" />
              Employee
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Employees</option>
              {employees.map((employee, index) => (
                <option key={employee?._id || index} value={employee?._id}>
                  {employee?.name || `Employee ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiSearch className="inline mr-2" />
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Search records..."
              />
              <FiSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Hours Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Login Hours Records</h2>
          <div className="text-sm text-gray-600">
            Showing {filteredLoginHours.length} record{filteredLoginHours.length !== 1 ? 's' : ''}
            {loginHours.length > 0 && ` of ${loginHours.length}`}
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading login hours...</p>
            <p className="text-sm text-gray-500 mt-2">Fetching real-time status...</p>
          </div>
        ) : loginHours.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUsers className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Records Found</h3>
            <p className="text-gray-600 mb-6">
              No login hours found for the selected period.
            </p>
            <div className="space-y-3 max-w-md mx-auto">
              <button
                onClick={handleRefresh}
                className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiRefreshCw className="inline mr-2" />
                Retry Loading Data
              </button>
              <button
                onClick={() => {
                  setDateRange({
                    startDate: new Date(new Date().setDate(new Date().getDate() - 90)),
                    endDate: new Date()
                  });
                  setSelectedEmployee('all');
                }}
                className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : filteredLoginHours.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Matching Records</h3>
            <p className="text-gray-600 mb-4">
              No records match your search criteria. Try changing your search term or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedEmployee('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Login Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Logout Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Worked Hours
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Break Hours
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Login Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Break Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoginHours.map((record, index) => {
                    const userName = record.user?.name || record.userId?.name || 'Unknown';
                    const userEmail = record.user?.email || record.userId?.email || '';
                    const userInitial = userName.charAt(0).toUpperCase();
                    
                    // Check if currently logged in
                    const isLoggedIn = record.loginTime && !record.logoutTime;
                    
                    // Check if currently on break
                    const breaks = record.breaks || record.allBreaks || [];
                    const isOnBreak = breaks.some(b => !b.end && b.status === 'approved');
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              isLoggedIn 
                                ? 'bg-gradient-to-r from-green-100 to-teal-100 border-2 border-green-200' 
                                : 'bg-gradient-to-r from-blue-100 to-purple-100'
                            }`}>
                              <span className={`font-bold ${
                                isLoggedIn ? 'text-green-600' : 'text-blue-600'
                              }`}>
                                {userInitial}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 flex items-center">
                                {userName}
                                {isLoggedIn && (
                                  <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                )}
                              </div>
                              {userEmail && (
                                <div className="text-xs text-gray-500">{userEmail}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(record.date)}</div>
                          <div className="text-xs text-gray-500">{record.date || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatTime(record.loginTime)}
                          </div>
                          {record.loginTime && (
                            <div className="text-xs text-gray-500">
                              {new Date(record.loginTime).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${
                            isLoggedIn ? 'text-yellow-600' : 'text-gray-900'
                          }`}>
                            {isLoggedIn ? 'Still logged in' : formatTime(record.logoutTime)}
                          </div>
                          {record.logoutTime && !isLoggedIn && (
                            <div className="text-xs text-gray-500">
                              {new Date(record.logoutTime).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatHours(record.workedHours || record.totalWorkedHours)} hrs
                          </div>
                          {record.loginTime && (
                            <div className="text-xs text-gray-500">
                              {calculateDuration(record.loginTime, record.logoutTime || new Date())}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatHours(record.breakHours || record.totalBreakHours)} hrs
                          </div>
                          {breaks.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {breaks.length} break{breaks.length !== 1 ? 's' : ''}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(record.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getLoginStatus(record)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getBreakStatus(record)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Summary Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Live Status:</span> 
                  <span className="ml-2">
                    {stats.currentlyLoggedIn > 0 && (
                      <span className="text-green-600">
                        <FiUserCheck className="inline mr-1" />
                        {stats.currentlyLoggedIn} logged in
                      </span>
                    )}
                    {stats.currentlyOnBreak > 0 && (
                      <span className="text-yellow-600 ml-3">
                        <FiCoffee className="inline mr-1" />
                        {stats.currentlyOnBreak} on break
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  Total: {stats.totalHours} hours across {stats.totalRecords} records
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllLoginHours;