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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/leaves", form);
      alert("Leave applied successfully");
      setForm({ from: "", to: "", reason: "", leaveType: "Paid" });
    } catch (err) {
      alert("Error applying leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

      <form onSubmit={submitLeave} className="space-y-4">
        <input
          type="date"
          name="from"
          value={form.from}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="to"
          value={form.to}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Apply Leave"}
        </button>
      </form>
    </div>
  );
}
