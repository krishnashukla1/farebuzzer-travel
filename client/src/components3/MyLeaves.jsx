import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyLeaves = async () => {
      try {
        setLoading(true);
        const res = await api.get("/leaves/me");
        setLeaves(res.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load leaves:", err);
        setError("Failed to load your leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchMyLeaves();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-500 animate-pulse text-lg font-medium">
          Loading your leaves...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow border border-red-100">
        <div className="text-center text-red-600 py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Leave History</h2>
        <span className="text-sm text-gray-500">
          {leaves.length} {leaves.length === 1 ? "record" : "records"}
        </span>
      </div>

      {leaves.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl">
          <p className="text-lg font-medium">No leave requests yet</p>
          <p className="mt-2 text-sm">Submit a new leave request to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(leave.from).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(leave.to).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
                      {leave.leaveType}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                        inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border
                        ${getStatusStyle(leave.status)}
                      `}
                    >
                      {leave.status}
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