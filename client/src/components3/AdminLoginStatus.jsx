// import React, { useState, useEffect } from 'react';
// import api from "../api/axios";
// import moment from 'moment';

// const AdminLoginStatus = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [forceLogoutLoading, setForceLogoutLoading] = useState({});

//   const fetchAttendance = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await api.get("/login-hours/");
//       setEmployees(res.data || []);
//       setFiltered(res.data || []);
//     } catch (err) {
//       console.error("Failed to load attendance:", err);
//       setError(
//         err?.response?.data?.message || 
//         "Failed to load attendance data"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAttendance();
//     const interval = setInterval(fetchAttendance, 45000); // ~every 45 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Filter effect
//   useEffect(() => {
//     const term = filter.toLowerCase().trim();
//     if (!term) {
//       setFiltered(employees);
//       return;
//     }

//     setFiltered(
//       employees.filter(emp =>
//         emp.employee?.name?.toLowerCase().includes(term) ||
//         emp.employee?.email?.toLowerCase().includes(term)
//       )
//     );
//   }, [filter, employees]);

//   const handleForceLogout = async (employeeId) => {
//     if (!window.confirm("Really force logout this employee?")) return;

//     setForceLogoutLoading(prev => ({ ...prev, [employeeId]: true }));

//     try {
//       await api.post("/login-hours/logout", { employeeId });

//       // Optimistic update
//       setEmployees(prev =>
//         prev.map(emp =>
//           emp.employee?._id === employeeId
//             ? { ...emp, logoutTime: new Date().toISOString(), status: 'Logged Out' }
//             : emp
//         )
//       );
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to force logout");
//     } finally {
//       setForceLogoutLoading(prev => ({ ...prev, [employeeId]: false }));
//     }
//   };

//   const formatTime = (time) => (time ? moment(time).format('HH:mm') : '—');
//   const formatDuration = (sec) => {
//     if (sec == null || isNaN(sec)) return '—';
//     const dur = moment.duration(sec, 'seconds');
//     const h = Math.floor(dur.asHours());
//     const m = dur.minutes();
//     return `${h}h ${m.toString().padStart(2, '0')}m`;
//   };

//   if (loading) {
//     return <AttendanceLoadingSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="p-6 max-w-5xl mx-auto">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//           <div className="text-red-700 font-medium mb-3">{error}</div>
//           <button
//             onClick={fetchAttendance}
//             className="px-5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 max-w-full mx-auto">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//         Live Attendance Dashboard
//       </h1>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//         />
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Employee
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Login
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Logout
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Break
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Work Today
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filtered.map((emp) => {
//               const isLoggedIn = !!emp.loginTime && !emp.logoutTime;
//               const isOnBreak = emp.currentBreak?.start && !emp.currentBreak?.end;

//               return (
//                 <tr key={emp.employee?._id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                     {emp.employee?.name || '—'}
//                   </td>
//                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
//                     {formatTime(emp.loginTime)}
//                   </td>
//                   <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
//                     {formatTime(emp.logoutTime)}
//                   </td>
//                   <td className="px-4 sm:px-6 py-4 text-center">
//                     <span
//                       className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                         isLoggedIn
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       {isLoggedIn ? 'Active' : 'Logged Out'}
//                     </span>
//                   </td>
//                   <td className="px-4 sm:px-6 py-4 text-center">
//                     <span
//                       className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                         isOnBreak
//                           ? 'bg-yellow-100 text-yellow-800 animate-pulse'
//                           : 'bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       {isOnBreak ? 'ON BREAK' : '—'}
//                     </span>
//                   </td>
//                   <td className="px-4 sm:px-6 py-4 text-center font-medium text-gray-900">
//                     {formatDuration(emp.workedSecondsToday)}
//                   </td>
//                   <td className="px-4 sm:px-6 py-4 text-center">
//                     {isLoggedIn && (
//                       <button
//                         onClick={() => handleForceLogout(emp.employee._id)}
//                         disabled={forceLogoutLoading[emp.employee._id]}
//                         className={`text-sm px-4 py-1.5 rounded-lg font-medium transition ${
//                           forceLogoutLoading[emp.employee._id]
//                             ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                             : 'bg-red-50 hover:bg-red-100 text-red-700'
//                         }`}
//                       >
//                         Force Logout
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {filtered.length === 0 && (
//         <div className="text-center py-12 text-gray-500">
//           {filter
//             ? `No employees found for "${filter}"`
//             : "No active attendance records in current shift"}
//         </div>
//       )}
//     </div>
//   );
// };

// // Simple loading skeleton
// const AttendanceLoadingSkeleton = () => (
//   <div className="p-6 max-w-full mx-auto">
//     <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse" />
//     <div className="h-10 w-full max-w-md bg-gray-200 rounded mb-6 animate-pulse" />
//     <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
//       <div className="h-12 bg-gray-100 animate-pulse" />
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="h-16 bg-gray-50 animate-pulse border-b border-gray-200" />
//       ))}
//     </div>
//   </div>
// );

// export default AdminLoginStatus;


import { useState, useEffect } from 'react'
import { FiUsers, FiClock, FiCoffee, FiAlertCircle } from 'react-icons/fi'
import api from "../api/axios";
import toast from 'react-hot-toast'
// import Loader from '../Common/Loader'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeToday: 0,
    onBreak: 0,
    pendingRequests: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch pending breaks
      const pendingBreaksRes = await api.getPendingBreaks()
      
      // Fetch all login hours for today
      const today = new Date().toISOString().split('T')[0]
      const loginHoursRes = await api.getAllLoginHours({
        startDate: today,
        endDate: today
      })

      const loginHours = loginHoursRes.data.records || []
      const activeEmployees = loginHours.filter(record => !record.logoutTime).length
      const onBreakEmployees = loginHours.filter(record => {
        // Check if any break is active
        return record.breaks?.some(b => !b.end && b.status === 'approved')
      }).length

      setStats({
        totalEmployees: 50, // This should come from user API
        activeToday: activeEmployees,
        onBreak: onBreakEmployees,
        pendingRequests: pendingBreaksRes.data.count || 0
      })

      // Format recent activity
      const activity = loginHours.map(record => ({
        id: record._id,
        employee: record.user?.name || 'Unknown',
        action: record.logoutTime ? 'Logged out' : 'Logged in',
        time: record.logoutTime || record.loginTime,
        status: record.status
      })).slice(0, 10)

      setRecentActivity(activity)
    } catch (error) {
      toast.error('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  // if (loading) return <Loader />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor employee attendance and manage break requests
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {stats.totalEmployees}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {stats.activeToday}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Break</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {stats.onBreak}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiCoffee className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {stats.pendingRequests}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.action === 'Logged in' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-sm font-medium ${
                      activity.action === 'Logged in' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.employee.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.employee}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {new Date(activity.time).toLocaleTimeString()}
                  </p>
                  <p className={`text-xs px-2 py-1 rounded-full inline-block ${
                    activity.status === 'present' ? 'bg-green-100 text-green-800' :
                    activity.status === 'half-day' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'absent' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <a
              href="/admin/breaks"
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiCoffee className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Break Approvals</p>
                  <p className="text-sm text-gray-600">
                    {stats.pendingRequests} pending requests
                  </p>
                </div>
              </div>
              <div className="text-blue-600">
                <span className="text-lg">→</span>
              </div>
            </a>

            <a
              href="/admin/hours"
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiClock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">All Login Hours</p>
                  <p className="text-sm text-gray-600">
                    View all employee attendance
                  </p>
                </div>
              </div>
              <div className="text-green-600">
                <span className="text-lg">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard