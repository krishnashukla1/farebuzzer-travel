import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leaves/me").then((res) => {
      setLeaves(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Leaves</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}>
              <td className="border p-2">
                {new Date(l.from).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(l.to).toLocaleDateString()}
              </td>
              <td className="border p-2">{l.leaveType}</td>
              <td
                className={`border p-2 font-semibold ${
                  l.status === "Approved"
                    ? "text-green-600"
                    : l.status === "Rejected"
                    ? "text-red-600"
                    : "text-orange-500"
                }`}
              >
                {l.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
