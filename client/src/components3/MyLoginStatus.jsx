import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const MyLoginStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMyStatus = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/hours/today`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStatus(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStatus();
    const interval = setInterval(fetchMyStatus, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (action) => {
    if (actionLoading) return;
    setActionLoading(true);

    try {
      await axios.post(
        `${API_URL}/hours/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      await fetchMyStatus();
    } catch (err) {
      alert(err?.response?.data?.message || `Failed to ${action.replace('/', ' ')}`);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds && seconds !== 0) return '—';
    const dur = moment.duration(seconds, 'seconds');
    const h = Math.floor(dur.asHours());
    const m = dur.minutes();
    return `${h}h ${m}m`;
  };

  if (loading) return <div className="p-8 text-center">Loading your status...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!status) return <div className="p-8 text-center">No data available</div>;

  const isLoggedIn = !!status.loginTime && !status.logoutTime;
  const isOnBreak = status.currentBreak?.start && !status.currentBreak?.end;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Attendance Status</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className={`text-xl font-bold ${isLoggedIn ? 'text-green-600' : 'text-gray-600'}`}>
              {isLoggedIn ? 'Logged In' : 'Logged Out'}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Break</div>
            <div className={`text-xl font-bold ${isOnBreak ? 'text-yellow-600 animate-pulse' : 'text-gray-600'}`}>
              {isOnBreak ? 'ON BREAK' : 'Available'}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Today Work</div>
            <div className="text-xl font-semibold">{formatDuration(status.workedSecondsToday)}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Today Break</div>
            <div className="text-xl font-semibold">{formatDuration(status.breakSecondsToday)}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleAction('break/start')}
                disabled={actionLoading || isOnBreak}
                className={`px-6 py-3 rounded-lg font-medium text-white transition
                  ${isOnBreak ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'}`}
              >
                Start Break
              </button>

              <button
                onClick={() => handleAction('break/end')}
                disabled={actionLoading || !isOnBreak}
                className={`px-6 py-3 rounded-lg font-medium text-white transition
                  ${!isOnBreak ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
              >
                End Break
              </button>

              <button
                onClick={() => handleAction('logout')}
                disabled={actionLoading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleAction('login')}
              disabled={actionLoading}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition shadow-md"
            >
              Login / Start Shift
            </button>
          )}
        </div>
      </div>

      {/* Extra break request (optional) */}
      {status.breakLimitExceeded && !isOnBreak && (
        <div className="text-center mt-4">
          <button
            onClick={() => handleAction('break/request')}
            disabled={actionLoading || status.pendingBreakRequest}
            className="text-sm text-blue-600 hover:underline"
          >
            {status.pendingBreakRequest ? 'Break request pending...' : 'Request extra break'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLoginStatus;