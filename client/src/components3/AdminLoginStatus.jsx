import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const AdminLoginStatus = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [forceLogoutLoading, setForceLogoutLoading] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/hours/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEmployees(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const term = filter.toLowerCase();
    setFiltered(
      employees.filter(e =>
        e.employee?.name?.toLowerCase().includes(term) ||
        e.employee?.email?.toLowerCase().includes(term)
      )
    );
  }, [filter, employees]);

  const handleForceLogout = async (employeeId) => {
    if (!confirm('Really force logout this user?')) return;

    setForceLogoutLoading(prev => ({ ...prev, [employeeId]: true }));

    try {
      await axios.post(
        `${API_URL}/hours/logout`,
        { employeeId }, // ← backend must support this
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Refresh list
      setEmployees(prev =>
        prev.map(e =>
          e.employee?._id === employeeId
            ? { ...e, logoutTime: new Date().toISOString(), status: 'Logged Out' }
            : e
        )
      );
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to force logout');
    } finally {
      setForceLogoutLoading(prev => ({ ...prev, [employeeId]: false }));
    }
  };

  const formatTime = (time) => (time ? moment(time).format('HH:mm') : '—');
  const formatDuration = (sec) => {
    if (!sec && sec !== 0) return '—';
    const d = moment.duration(sec, 'seconds');
    return `${Math.floor(d.asHours())}h ${d.minutes()}m`;
  };

  if (loading) return <div className="p-10 text-center">Loading attendance...</div>;

  return (
    <div className="p-4 md:p-6 max-w-full mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Live Attendance Dashboard</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search employee..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Login</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Logout</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">Break</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">Work Today</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((emp) => {
              const isLoggedIn = !!emp.loginTime && !emp.logoutTime;
              const isOnBreak = emp.currentBreak?.start && !emp.currentBreak?.end;

              return (
                <tr key={emp.employee?._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium">{emp.employee?.name || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatTime(emp.loginTime)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatTime(emp.logoutTime)}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        isLoggedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {isLoggedIn ? 'Active' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        isOnBreak ? 'bg-yellow-100 text-yellow-800 animate-pulse' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {isOnBreak ? 'ON BREAK' : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    {formatDuration(emp.workedSecondsToday)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isLoggedIn && (
                      <button
                        onClick={() => handleForceLogout(emp.employee._id)}
                        disabled={forceLogoutLoading[emp.employee._id]}
                        className={`text-sm px-3 py-1 rounded ${
                          forceLogoutLoading[emp.employee._id]
                            ? 'bg-gray-300 text-gray-500'
                            : 'bg-red-100 hover:bg-red-200 text-red-700'
                        } transition`}
                      >
                        Force Logout
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No employees found {filter ? `for "${filter}"` : 'in current shift'}
        </div>
      )}
    </div>
  );
};

export default AdminLoginStatus;