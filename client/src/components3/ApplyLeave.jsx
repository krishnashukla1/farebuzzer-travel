import React, { useState } from "react";
import api from "../api/axios";

export default function ApplyLeave() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    reason: "",
    leaveType: "Paid",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user starts typing again
    if (success) setSuccess(false);
    if (error) setError("");
  };

  const submitLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await api.post("/leaves", form);
      setSuccess(true);
      setForm({
        from: "",
        to: "",
        reason: "",
        leaveType: "Paid",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit leave request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Request a Leave</h2>
          <p className="mt-1.5 text-gray-600">
            Please fill in the details of your leave request
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitLeave} className="p-8 space-y-6">
          {/* Two-column layout for dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Start Date *
              </label>
              <input
                type="date"
                name="from"
                value={form.from}
                onChange={handleChange}
                required
                className="cursor-pointer w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                End Date *
              </label>
              <input
                type="date"
                name="to"
                value={form.to}
                onChange={handleChange}
                required
                className="cursor-pointer w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Leave Type *
            </label>
            <select
              name="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              className="cursor-pointer w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
            >
              <option value="Paid">Paid Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
              {/* <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Emergency">Emergency Leave</option> */}
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Reason for Leave
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={4}
              placeholder="Please provide a brief explanation..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y"
            />
          </div>

          {/* Messages */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <p className="text-green-700">
                Leave request submitted successfully!
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`
                cursor-pointer w-full md:w-auto px-8 py-3
                font-medium rounded-lg shadow-md
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${
                  loading
                    ? "bg-indigo-400 cursor-wait"
                    : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                }
                text-white
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Leave Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}