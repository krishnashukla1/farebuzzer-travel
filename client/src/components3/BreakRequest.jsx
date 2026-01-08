

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


import { useState, useEffect } from 'react';
import { FiCoffee, FiClock, FiAlertCircle, FiCheck, FiX, FiLogIn } from 'react-icons/fi';
import api from '../api/axios';
import toast from 'react-hot-toast';

const BreakRequest = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [breakHistory, setBreakHistory] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const fetchBreakData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/login-hours/today');
      
      console.log('Break API Response:', response.data);
      
      const data = response.data.data || response.data;
      setStats(data);
      
      // Get break history
      const breaks = data.allBreaks || data.breaks || [];
      setBreakHistory(breaks);
      
      // Check for pending request
      const pending = breaks.find(b => b.status === 'pending');
      setPendingRequest(pending);
      
      // Update login status from API response
      const apiLoggedIn = response.data.isLoggedIn !== undefined 
        ? response.data.isLoggedIn 
        : checkLoginStatus(data);
      setIsLoggedIn(apiLoggedIn);
      
      // Update break status
      const breakStatus = checkOnBreakStatus(data, breaks);
      setIsOnBreak(breakStatus);
      
    } catch (error) {
      console.error('Error fetching break data:', error);
      
      // If 401/403, user is not logged in
      if (error.response?.status === 401 || error.response?.status === 403) {
        setIsLoggedIn(false);
        toast.error('Please login to access break features');
      } else {
        toast.error('Failed to load break data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Check login status from data
  const checkLoginStatus = (data) => {
    if (!data) {
      // Fallback to localStorage
      return localStorage.getItem('isLoggedIn') === 'true' && 
             !!localStorage.getItem('token');
    }
    
    // Check API response properties
    if (data.isLoggedIn !== undefined) return data.isLoggedIn;
    if (data.loggedIn !== undefined) return data.loggedIn;
    
    // Check if there's an active login (has login time, no logout time)
    if (data.loginTime && !data.logoutTime) return true;
    
    return false;
  };

  // Check if user is currently on break
  const checkOnBreakStatus = (data, breaks) => {
    if (!breaks || breaks.length === 0) return false;
    
    // Find active break (has start time but no end time)
    const activeBreak = breaks.find(b => b.start && !b.end);
    if (activeBreak) return true;
    
    // Check if data has isOnBreak property
    if (data.isOnBreak !== undefined) return data.isOnBreak;
    if (data.currentBreak) return true;
    
    return false;
  };

  useEffect(() => {
    fetchBreakData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchBreakData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle break request
  const handleRequestBreak = async () => {
    // Validate before making request
    if (!isLoggedIn) {
      toast.error('Please login first to take a break');
      return;
    }
    
    if (isOnBreak) {
      toast.error('You are already on a break');
      return;
    }
    
    if (pendingRequest) {
      toast.error('You already have a pending break request');
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.post('/login-hours/break/request');
      
      console.log('Break request response:', response.data);
      
      if (response.data.autoApproved) {
        toast.success('Break started automatically!');
        setIsOnBreak(true);
      } else if (response.data.pending) {
        toast.success('Break request sent for approval');
        setPendingRequest(response.data.break);
      } else {
        toast.success('Break request submitted');
      }
      
      // Refresh data
      setTimeout(() => fetchBreakData(), 1000);
      
    } catch (error) {
      console.error('Break request error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to request break';
      toast.error(errorMsg);
      
      // If error suggests not logged in, update status
      if (errorMsg.toLowerCase().includes('not logged') || 
          errorMsg.toLowerCase().includes('login') ||
          error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle end break
  const handleEndBreak = async () => {
    if (!isOnBreak) {
      toast.error('You are not currently on a break');
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.post('/login-hours/break/end');
      
      toast.success(response.data.message || 'Break ended successfully');
      setIsOnBreak(false);
      
      // Refresh data
      setTimeout(() => fetchBreakData(), 1000);
      
    } catch (error) {
      console.error('End break error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to end break';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel pending request
  const handleCancelRequest = async () => {
    if (!pendingRequest) {
      toast.error('No pending request to cancel');
      return;
    }
    
    try {
      setLoading(true);
      
      // Try different endpoint names based on your API
      try {
        await api.delete(`/login-hours/break/${pendingRequest._id || pendingRequest.id}`);
        toast.success('Break request cancelled');
      } catch (deleteError) {
        // Try POST method if DELETE doesn't work
        await api.post('/login-hours/break/cancel', {
          breakId: pendingRequest._id || pendingRequest.id
        });
        toast.success('Break request cancelled');
      }
      
      setPendingRequest(null);
      fetchBreakData();
      
    } catch (error) {
      console.error('Cancel request error:', error);
      toast.error('Failed to cancel request');
    } finally {
      setLoading(false);
    }
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid time';
    }
  };

  // Calculate duration
  const calculateDuration = (start, end) => {
    if (!start) return 'N/A';
    if (!end) return 'Ongoing';
    
    try {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const diffMs = endTime - startTime;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins < 60) {
        return `${diffMins} min`;
      } else {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return `${hours}h ${mins}m`;
      }
    } catch (error) {
      return 'Error';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate free breaks left
  const freeBreaksLeft = () => {
    if (!stats) return 3;
    
    const approvedBreaks = breakHistory.filter(b => b.status === 'approved').length;
    return Math.max(0, 3 - approvedBreaks);
  };

  // Format hours to hrs mins
  const formatHoursToHrsMins = (hours) => {
    if (!hours || isNaN(hours)) return "0 hrs 0 mins";

    const totalMinutes = Math.round(Number(hours) * 60);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return `${hrs} hrs ${mins} mins`;
  };

  // Main action button logic
  const getActionButton = () => {
    // User is NOT logged in
    if (!isLoggedIn) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <FiX className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Shift Not Started</p>
                <p className="text-sm text-gray-600">
                  Please login to start your shift and take breaks
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold text-red-600">OFFLINE</p>
            </div>
          </div>
        </div>
      );
    }
    
    // User has a pending break request
    if (pendingRequest) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiAlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Break Request Pending</p>
                <p className="text-sm text-gray-600">
                  Waiting for supervisor approval
                </p>
              </div>
            </div>
            <button
              onClick={handleCancelRequest}
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              Cancel Request
            </button>
          </div>
        </div>
      );
    }
    
    // User is currently on break
    if (isOnBreak) {
      // Find the current break
      const currentBreak = breakHistory.find(b => b.start && !b.end) || 
                          breakHistory[breakHistory.length - 1];
      
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCoffee className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Currently on Break</p>
                <p className="text-sm text-gray-600">
                  Started at {formatTime(currentBreak?.start)}
                </p>
              </div>
            </div>
            <button
              onClick={handleEndBreak}
              disabled={loading}
              className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Ending...' : 'End Break'}
            </button>
          </div>
        </div>
      );
    }
    
    // User is logged in and can request a break
    const breaksLeft = freeBreaksLeft();
    const hasFreeBreaks = breaksLeft > 0;
    
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiCoffee className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Ready for a Break?</p>
                <p className="text-sm text-gray-600">
                  {hasFreeBreaks 
                    ? `You have ${breaksLeft} free break${breaksLeft !== 1 ? 's' : ''} remaining (15 minutes each).`
                    : 'You have used all 3 free breaks. Additional breaks require approval.'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Free Breaks</p>
              <p className={`text-3xl font-bold ${hasFreeBreaks ? 'text-blue-600' : 'text-red-600'}`}>
                {breaksLeft}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRequestBreak}
          disabled={loading}
          className={`cursor-pointer w-full py-4 text-white rounded-lg font-bold text-lg transition-all duration-200 ${
            hasFreeBreaks 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
              : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'Processing...' : 
           hasFreeBreaks ? 'Start Break (Auto-Approved)' : 
           'Request Break (Requires Approval)'}
        </button>
      </div>
    );
  };

  // Render loading state
  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading break data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Break Management</h1>
            <p className="text-gray-600 mt-2">
              Request and manage your breaks for today
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`text-xl font-bold ${isLoggedIn ? 'text-green-600' : 'text-red-600'}`}>
                {isLoggedIn ? 'ACTIVE' : 'OFFLINE'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Free Breaks</p>
              <p className="text-2xl font-bold text-blue-600">
                {freeBreaksLeft()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCoffee className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shift Status</p>
              <p className={`text-xl font-bold mt-2 ${
                isLoggedIn ? 'text-green-600' : 'text-red-600'
              }`}>
                {isLoggedIn ? 'IN PROGRESS' : 'NOT STARTED'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isLoggedIn && stats?.loginTime 
                  ? `Started at ${formatTime(stats.loginTime)}`
                  : 'Login to start shift'}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isLoggedIn ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isLoggedIn ? (
                <FiCheck className="w-5 h-5 text-green-600" />
              ) : (
                <FiX className="w-5 h-5 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Breaks</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {breakHistory.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isOnBreak ? 'Currently on break' : 'No active break'}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Break Time</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {formatHoursToHrsMins(stats?.breakHours)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isOnBreak ? 'Break in progress...' : 'All breaks completed'}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Break Actions</h2>
        {getActionButton()}
      </div>

      {/* Break History */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Today's Breaks</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Total: {breakHistory.length} break{breakHistory.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={fetchBreakData}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-sm transition-colors"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
        
        {breakHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCoffee className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No breaks taken today</p>
            {isLoggedIn && (
              <p className="text-sm text-gray-500 mt-2">
                Start your first break using the button above
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Break #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {breakHistory.map((breakItem, index) => {
                  const isCurrentBreak = !breakItem.end && isOnBreak;
                  return (
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-50 ${isCurrentBreak ? 'bg-green-50 border-l-4 border-l-green-500' : ''}`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          {formatTime(breakItem.start)}
                          {isCurrentBreak && (
                            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {breakItem.end ? formatTime(breakItem.end) : '—'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {calculateDuration(breakItem.start, breakItem.end)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(breakItem.status)}`}>
                          {breakItem.status || 'unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {breakItem.autoEnded ? 'Auto' : 'Manual'}
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

// Make sure this export is at the END of the file
export default BreakRequest;