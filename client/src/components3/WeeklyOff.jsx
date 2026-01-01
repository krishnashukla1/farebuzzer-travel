import React, { useEffect, useState } from "react";
import api from "../api/axios";

const WeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    userId: "",
    date: "",
    reason: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAllWeeklyOff();
      fetchUsers();
    } else {
      fetchMyWeeklyOff();
    }
  }, []);

  const fetchAllWeeklyOff = async () => {
    const res = await api.get("/weekly-off/admin");
    setWeeklyOffs(res.data);
  };

  const fetchMyWeeklyOff = async () => {
    const res = await api.get("/weekly-off/me");
    setWeeklyOffs(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.filter(u => u.role !== "admin"));
  };

  // ➕ ADD or ✏️ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || !form.date) {
      alert("Employee and date required");
      return;
    }

    if (editingId) {
      await api.put(`/weekly-off/admin/${editingId}`, form);
      alert("Weekly off updated");
    } else {
      await api.post("/weekly-off/admin", form);
      alert("Weekly off added");
    }

    resetForm();
    fetchAllWeeklyOff();
  };

  // ✏️ EDIT
  const handleEdit = (off) => {
    setEditingId(off._id);
    setForm({
      userId: off.userId._id,
      date: off.date,
      reason: off.reason || ""
    });
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete weekly off?")) return;
    await api.delete(`/weekly-off/admin/${id}`);
    fetchAllWeeklyOff();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ userId: "", date: "", reason: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Weekly Off Management</h2>

      {/* 🔥 ADMIN FORM */}
      {user?.role === "admin" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6 max-w-xl"
        >
          <h3 className="font-semibold mb-3">
            {editingId ? "Update Weekly Off" : "Add Weekly Off"}
          </h3>

          {/* Employee Dropdown */}
          <select
            className="border p-2 w-full mb-3"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          >
            <option value="">Select Employee</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          {/* Calendar */}
          <input
            type="date"
            className="border p-2 w-full mb-3"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="text"
            placeholder="Reason (optional)"
            className="border p-2 w-full mb-3"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />

          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* 📋 TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              {user?.role === "admin" && <th className="border p-2">Employee</th>}
              <th className="border p-2">Date</th>
              <th className="border p-2">Reason</th>
              {user?.role === "admin" && <th className="border p-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {weeklyOffs.map((off) => (
              <tr key={off._id}>
                {user?.role === "admin" && (
                  <td className="border p-2">
                    {off.userId?.name}
                    <br />
                    <span className="text-xs text-gray-500">
                      {off.userId?.email}
                    </span>
                  </td>
                )}
                <td className="border p-2">{off.date}</td>
                <td className="border p-2">{off.reason || "-"}</td>
                {user?.role === "admin" && (
                  <td className="border p-2">
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleEdit(off)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(off._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {weeklyOffs.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No weekly off found
          </p>
        )}
      </div>
    </div>
  );
};

export default WeeklyOff;
