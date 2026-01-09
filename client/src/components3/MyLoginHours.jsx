
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


  const formatDurationNice = (hoursDecimal) => {
  if (!hoursDecimal && hoursDecimal !== 0) return '0h 0m';
  
  const totalMinutes = Math.round(hoursDecimal * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0 && minutes === 0) return '0h 0m';
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  
  return `${hours}h ${minutes}m`;
};


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
  // const formatISTTime = (dateString) => {
  //   if (!dateString) return 'N/A';
    
  //   try {
  //     const date = new Date(dateString);
  //     const istOffset = 5.5 * 60 * 60 * 1000;
  //     const istTime = new Date(date.getTime() + istOffset);
      
  //     return istTime.toLocaleTimeString('en-US', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       hour12: true
  //     });
  //   } catch (error) {
  //     return 'Invalid time';
  //   }
  // };


  const formatISTTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // No offset needed if already IST
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'   // ← safer option
    });
  } catch (e) {
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

  // When showing login status
const getLoginDisplay = () => {
  if (!todayData) return "NOT LOGGED IN";

  if (todayData.loginTime && !todayData.logoutTime) {
    return {
      text: "LOGGED IN",
      color: "text-green-600",
      subText: `Since ${formatISTTime(todayData.loginTime)}`
    };
  }

  if (todayData.loginTime && todayData.logoutTime) {
    return {
      text: "SHIFT COMPLETED",
      color: "text-blue-600",
      subText: "Logout recorded"
    };
  }

  return {
    text: "NOT LOGGED IN",
    color: "text-red-600",
    subText: "Login to start tracking"
  };
};
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
              className="cursor-pointer flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all duration-200"
            >
              <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={exportToCSV}
              disabled={!todayData}
              className="cursor-pointer flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                {/* {todayData?.workedHours || '0.00'} hrs */}
                {formatDurationNice(todayData?.workedHours)}
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
                {/* {todayData?.breakHours || '0.00'} hrs */}
                {formatDurationNice(todayData?.breakHours)}
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
                      {/* {todayData.workedHours || '0.00'} hrs */}
                      {formatDurationNice(todayData?.workedHours)}
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
                    {/* {todayData.breakHours || '0.00'} hrs */}
                    {formatDurationNice(todayData?.breakHours)}
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
            onClick={() => window.location.href = '/my-login-hours'}
            className="cursor-pointer flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            <FiLogIn className="mr-2" />
            Go to Login Status
          </button>
          
          <button
            onClick={() => window.location.href = '/break-request'}
            className="cursor-pointer flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
          >
            <FiCoffee className="mr-2" />
            Manage Breaks
          </button>
          
          <button
            onClick={exportToCSV}
            disabled={!todayData}
            className="cursor-pointer flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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