

import { useState, useEffect } from "react";
import {
  FiRefreshCw,
  FiDownload,
  FiUsers,
} from "react-icons/fi";
import api from "../api/axios";
import toast from "react-hot-toast";

/* -------------------- HELPERS -------------------- */
const formatTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const minutesBetween = (start, end = null) => {
  if (!start) return 0;
  const endTime = end || new Date();
  const diff = new Date(endTime) - new Date(start);
  return diff > 0 ? Math.floor(diff / 60000) : 0;
};

const formatDuration = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
};

/* -------------------- COMPONENT -------------------- */
const AllLoginHoursToday = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodayData = async () => {
    try {
      setRefreshing(true);
      const res = await api.get("/login-hours/today/all");

      let data = res.data?.data || res.data || [];
      if (!Array.isArray(data)) data = [data];

      // remove admin users
      const employees = data.filter(
        (r) => r.userId?.role?.toLowerCase() !== "admin"
      );

      setRecords(employees);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load today's attendance");
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

  /* -------------------- CSV EXPORT -------------------- */
  const exportCSV = () => {
    if (!records.length) return toast("No data to export");

    const headers = [
      "Employee",
      "Email",
      "Login Time",
      "Logout Time",
      "Worked Hours",
      "Status",
    ];

    const rows = records.map((r) => {
      const worked = minutesBetween(r.loginTime, r.logoutTime);
      return [
        r.userId?.name || "Unknown",
        r.userId?.email || "—",
        formatTime(r.loginTime),
        r.logoutTime ? formatTime(r.logoutTime) : "Ongoing",
        formatDuration(worked),
        r.logoutTime ? "Logged Out" : "Logged In",
      ].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Attendance_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast.success("CSV downloaded");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Today’s Attendance
          </h1>
          <p className="text-gray-600 mt-1">
            Live employee login tracking •{" "}
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchTodayData}
            disabled={refreshing}
            className="cursor-pointer flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm disabled:opacity-60"
          >
            <FiRefreshCw
              className={`mr-2 ${refreshing && "animate-spin"}`}
            />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            disabled={!records.length}
            className="cursor-pointer flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md disabled:opacity-50"
          >
            <FiDownload className="mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-xl font-semibold">
            Logged In Employees
          </h2>
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-600">
            <div className="animate-spin h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading attendance data...
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <FiUsers size={64} className="mx-auto mb-4 text-gray-300" />
            No employee has logged in today
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  {["Employee", "Login", "Logout", "Worked", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y">
                {records.map((r) => {
                  const worked = minutesBetween(
                    r.loginTime,
                    r.logoutTime
                  );
                  const loggedIn = r.loginTime && !r.logoutTime;

                  return (
                    <tr
                      key={r._id}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {r.userId?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {r.userId?.email || "—"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {formatTime(r.loginTime)}
                      </td>

                      <td className="px-6 py-4">
                        {loggedIn ? (
                          <span className="text-amber-600 font-medium">
                            Ongoing
                          </span>
                        ) : (
                          formatTime(r.logoutTime)
                        )}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {formatDuration(worked)}
                      </td>

                      <td className="px-6 py-4">
                        {loggedIn ? (
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                            Logged In
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                            Logged Out
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

export default AllLoginHoursToday;
