

import React, { useState } from "react";
import api from "../api/axios";
import { CheckCircle, Loader2 } from "lucide-react";

export default function MarkAttendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const markAttendance = async () => {
    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const res = await api.post("/attendance/mark");
      setMessage(res.data.message || "Attendance marked successfully");
      setSuccess(true);
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
          "Attendance already marked or an error occurred"
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="text-teal-600" size={28} />
        <h2 className="text-xl font-semibold text-gray-800">
          Mark Attendance
        </h2>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Click the button below to mark your attendance for today.
      </p>

      {/* Button */}
      <button
        onClick={markAttendance}
        disabled={loading}
        className={`cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Marking...
          </>
        ) : (
          "Mark Present"
        )}
      </button>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
