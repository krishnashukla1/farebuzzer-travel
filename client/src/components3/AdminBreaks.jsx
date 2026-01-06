import { useState, useEffect } from "react";
import api from "../api/axios";

export default function AdminBreaks() {
  const [requests, setRequests] = useState([]);

  // Fetch pending break requests
  const fetchRequests = async () => {
    try {
      const res = await api.get("/login-hours/break/pending");
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch break requests:", err);
    }
  };

  // Approve or reject a break request
  const handleAction = async (employeeId, breakIndex, action) => {
    try {
      await api.post("/login-hours/break/review", {
        employeeId,
        breakIndex,
        action,
      });
      fetchRequests(); // Refresh after action
    } catch (err) {
      console.error(`Failed to ${action} break:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Break Requests</h1>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Employee</th>
            <th className="border px-4 py-2">Requested At</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length ? (
            requests.map((r, i) => (
              <tr key={r._id || i}>
                <td className="border px-4 py-2">{r.employeeId?.name || "N/A"}</td>
                <td className="border px-4 py-2">
                  {r.breaks?.[0]?.requestedAt
                    ? new Date(r.breaks[0].requestedAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleAction(r.employeeId?._id, 0, "approve")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(r.employeeId?._id, 0, "reject")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No pending requests
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

}
