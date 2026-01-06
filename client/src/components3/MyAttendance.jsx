import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.get("/attendance/me");
        setRecords(res.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load attendance:", err);
        setError("Could not load your attendance records");
      } finally {
        setLoading(false);
      }
    };

    fetchMyAttendance();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200";
      case "absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "half day":
      case "halfday":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "late":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-600 animate-pulse text-lg font-medium">
          Loading your attendance...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow border border-red-100">
        <div className="text-center text-red-600 py-10">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">My Attendance</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {records.length} records
        </span>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl">
          <p className="text-lg font-medium">No attendance records yet</p>
          <p className="mt-2 text-sm">Your daily attendance will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {records.map((record) => (
                <tr
                  key={record._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {new Date(record.date).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                        inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-medium border
                        ${getStatusStyle(record.status)}
                      `}
                    >
                      {record.status || "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}