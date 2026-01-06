import React, { useState } from "react";
import api from "../api/axios";

export default function MarkAttendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    try {
      setLoading(true);
      const res = await api.post("/attendance/mark");
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Attendance already marked or error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

      <button
        onClick={markAttendance}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded"
      >
        {loading ? "Marking..." : "Mark Present"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}