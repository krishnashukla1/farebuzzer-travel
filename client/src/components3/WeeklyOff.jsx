import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isSameMonth } from "date-fns";

const WeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // current month by default

  useEffect(() => {
    fetchUsers();
    fetchWeeklyOffs();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.filter(u => u.role !== "admin"));
  };

  const fetchWeeklyOffs = async () => {
    const res = await api.get("/weekly-off/admin");
    setWeeklyOffs(res.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.date) return;

    try {
      setLoading(true);
      await api.post("/weekly-off/admin", form);
      setForm({ userId: "", date: "" });
      fetchWeeklyOffs();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this weekly off?")) return;
    await api.delete(`/weekly-off/admin/${id}`);
    fetchWeeklyOffs();
  };

  // 🔹 Filter weekly offs by selected month
  const filteredWeeklyOffs = weeklyOffs.filter(off => 
    isSameMonth(new Date(off.date), selectedMonth)
  );

  // 🔹 Group by employee
//   const grouped = filteredWeeklyOffs.reduce((acc, off) => {
//     const id = off.userId._id;
//     if (!acc[id]) {
//       acc[id] = {
//         name: off.userId.name,
//         email: off.userId.email,
//         dates: [],
//       };
//     }
//     acc[id].dates.push(off);
//     return acc;
//   }, {});

// 🔹 Group by employee AND sort dates ascending
const grouped = filteredWeeklyOffs.reduce((acc, off) => {
  const id = off.userId._id;
  if (!acc[id]) {
    acc[id] = {
      name: off.userId.name,
      email: off.userId.email,
      dates: [],
    };
  }
  acc[id].dates.push(off);
  // 🔹 Sort dates ascending after each insert
  acc[id].dates.sort((a, b) => new Date(a.date) - new Date(b.date));
  return acc;
}, {});


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Weekly Off Management</h1>

      {/* PROFESSIONAL MONTH FILTER */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
        <label className="font-semibold text-gray-700">Select Month:</label>
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="cursor-pointer border p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={() => setSelectedMonth(new Date())}
          className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      {/* ADD FORM */}
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
        <select
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          className="cursor-pointer border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        >
          <option value="">Select Employee</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <DatePicker
          selected={form.date ? new Date(form.date) : null}
          onChange={(date) => setForm({ ...form, date: date.toISOString().slice(0, 10) })}
          dateFormat="yyyy-MM-dd"
          className="cursor-pointer border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholderText="Select Date"
          required
        />

        <button
          disabled={loading}
          className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg col-span-full hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : "Add Weekly Off"}
        </button>
      </form>

      {/* LIST */}
      {Object.values(grouped).length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No weekly offs for this month.</div>
      ) : (
        Object.values(grouped).map((group, i) => (
          <div key={i} className="bg-white rounded-lg shadow mt-4">
            <div className="p-4 border-b font-semibold text-gray-800">
              {group.name} <span className="text-sm text-gray-500">({group.email})</span>
            </div>
            <div className="p-4 flex flex-wrap gap-3">
              {group.dates.map(d => (
                <div
                  key={d._id}
                  className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full shadow-sm"
                >
                  {format(new Date(d.date), "EEE, dd MMM yyyy")}
                  <Trash2
                    className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-800 transition"
                    onClick={() => handleDelete(d._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WeeklyOff;




