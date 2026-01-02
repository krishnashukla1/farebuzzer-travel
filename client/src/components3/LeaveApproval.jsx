import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await api.get("/admin/leaves"); 
    // ⚠️ If you don't have this route yet, I can add backend code
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const approveLeave = async (id) => {
    await api.put(`/leaves/${id}/approve`);
    fetchLeaves();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leave Approvals</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Employee</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}>
              <td className="border p-2">{l.userId?.name}</td>
              <td className="border p-2">
                {new Date(l.from).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(l.to).toLocaleDateString()}
              </td>
              <td className="border p-2">{l.status}</td>
              <td className="border p-2">
                {l.status === "Pending" && (
                  <button
                    onClick={() => approveLeave(l._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
