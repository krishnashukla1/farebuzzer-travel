



import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // to show loading state per row

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaves");
      setLeaves(res.data || []);
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const changeStatus = async (id, newStatus) => {
    if (!id || !newStatus) return;

    setUpdatingId(id); // show loading for this row

    try {
      const res = await api.put(`/leaves/${id}/status`, { status: newStatus });

      // Update only the changed leave - keep all other data (including userId)
      setLeaves((prev) =>
        prev.map((leave) =>
          leave._id === id
            ? { ...leave, status: res.data.leave?.status || newStatus }
            : leave
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update leave status");
      // Optional: revert UI if you want (not usually necessary)
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-lg font-medium text-gray-600 animate-pulse">
          Loading leave requests...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Leave Approvals
        </h2>
        {/* <span className="text-sm text-gray-500">
          {leaves.length} pending requests
        </span> */}
      </div>

      {leaves.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No leave requests found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {leave.userId?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {leave.userId?.email || "—"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(leave.from).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(leave.to).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {leave.leaveType}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={leave.status}
                      onChange={(e) => changeStatus(leave._id, e.target.value)}
                      disabled={updatingId === leave._id}
                      className={`
                        appearance-none
                        px-4 py-2 pr-8
                        text-sm font-medium rounded-lg border
                        focus:outline-none focus:ring-2 focus:ring-offset-1
                        transition-all duration-150
                        ${
                          updatingId === leave._id
                            ? "opacity-50 cursor-wait"
                            : "cursor-pointer hover:shadow-sm"
                        }
                        ${
                          leave.status === "Approved"
                            ? "bg-green-50 border-green-300 text-green-800"
                            : leave.status === "Rejected"
                            ? "bg-red-50 border-red-300 text-red-800"
                            : "bg-yellow-50 border-yellow-300 text-yellow-800"
                        }
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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