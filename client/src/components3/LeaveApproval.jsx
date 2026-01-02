import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaves");
      setLeaves(res.data);
    } catch (err) {
      setError("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      if (newStatus === "Approved") {
        await api.put(`/leaves/${leaveId}/approve`);
      }

      // Update UI state
      setLeaves((prev) =>
        prev.map((l) =>
          l._id === leaveId ? { ...l, status: newStatus } : l
        )
      );
    } catch (err) {
      alert("Failed to update leave status");
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading leave requests...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Leave Approvals</h2>

      {leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests found.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Employee</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="hover:bg-gray-50">
                <td className="border p-2">
                  <div className="font-medium">
                    {l.userId?.name || "N/A"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {l.userId?.email}
                  </div>
                </td>

                <td className="border p-2">
                  {new Date(l.from).toLocaleDateString()}
                </td>

                <td className="border p-2">
                  {new Date(l.to).toLocaleDateString()}
                </td>

                <td className="border p-2">{l.leaveType}</td>

                <td className="border p-2">
                  <select
                    value={l.status}
                    disabled={l.status !== "Pending"}
                    onChange={(e) =>
                      handleStatusChange(l._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded border text-sm font-medium
                      ${
                        l.status === "Approved"
                          ? "text-green-600 border-green-400"
                          : l.status === "Rejected"
                          ? "text-red-600 border-red-400"
                          : "text-orange-500 border-orange-400"
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
      )}
    </div>
  );
}
