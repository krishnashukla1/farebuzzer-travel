

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2,Pencil  } from "lucide-react";

const WeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    date: "",
  });

  // New: Month filter (YYYY-MM format)
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // current month by default
  );

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      fetchAllWeeklyOff();
      fetchUsers();
    } else {
      fetchMyWeeklyOff();
    }
  }, []);

  const fetchAllWeeklyOff = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/weekly-off/admin");
      setWeeklyOffs(res.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyWeeklyOff = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/weekly-off/me");
      setWeeklyOffs(res.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers((res.data || []).filter(u => u.role !== "admin"));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        await api.put(`/weekly-off/admin/${editingId}`, form);
      } else {
        await api.post("/weekly-off/admin", form);
      }

      setEditingId(null);
      setForm({ userId: "", date: "" });
      await fetchAllWeeklyOff();
    } catch (error) {
      console.error("Error saving weekly off:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (off) => {
    setEditingId(off._id);
    setForm({
      userId: off.userId?._id || "",
      date: new Date(off.date).toISOString().slice(0, 10),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this weekly off date?")) return;

    try {
      setIsLoading(true);
      await api.delete(`/weekly-off/admin/${id}`);
      await fetchAllWeeklyOff();
    } catch (error) {
      console.error("Error deleting weekly off:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group weekly offs by employee
  const groupedOffs = weeklyOffs.reduce((acc, off) => {
    const userId = off.userId?._id || "me";

    if (!acc[userId]) {
      acc[userId] = {
        userId: userId,
        name: off.userId?.name || "My Weekly Offs",
        email: off.userId?.email || "",
        dates: [],
      };
    }

    const dateObj = new Date(off.date);
    const monthKey = dateObj.toISOString().slice(0, 7); // YYYY-MM

    // Only add if matches selected month (or show all if no filter)
    if (!selectedMonth || monthKey === selectedMonth) {
      acc[userId].dates.push({
        _id: off._id,
        date: dateObj,
        formatted: dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          weekday: "short",
        }),
      });
    }

    return acc;
  }, {});

  // Sort dates within each group
  Object.values(groupedOffs).forEach(group => {
    group.dates.sort((a, b) => a.date - b.date);
  });

  // Filter out employees with no dates in selected month
  const visibleGroups = Object.values(groupedOffs).filter(group => group.dates.length > 0);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 shadow border border-indigo-100">
        <h1 className="text-2xl font-bold text-indigo-800">📅 Weekly Off Management</h1>
        <p className="text-sm text-indigo-600 mt-1">Manage employee weekly holidays</p>
      </div>

      {/* Controls: Month Picker + Add Form */}
     <div className="flex flex-col md:flex-row md:items-start gap-6 bg-white rounded-2xl shadow border p-6">
  
  {/* Add/Edit Form */}
  {isAdmin && (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-3">
        {editingId ? "✏️ Update Weekly Off" : "➕ Add New Weekly Off"}
      </h2>

      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <select
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <div className="sm:col-span-2 flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Saving..." : editingId ? "Update" : "Save"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ userId: "", date: "" });
              }}
              className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )}

  {/* Month Filter */}
  <div className="w-full md:w-64">
    <label className="block text-lg font-medium text-gray-700 mb-3">
      View Month
    </label>
    <input
      type="month"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="cursor-pointer w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>

</div>


      {/* Monthly View - Grouped Cards */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : visibleGroups.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl shadow border">
          {selectedMonth
            ? `No weekly offs in ${new Date(selectedMonth + "-01").toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}`
            : "No weekly offs scheduled yet"}
        </div>
      ) : (
        <div className="space-y-6">
          {visibleGroups.map((group) => (
            <div
              key={group.userId}
              className="bg-white rounded-2xl shadow border overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="font-medium text-lg text-gray-800">{group.name}</div>
                {isAdmin && group.email && (
                  <div className="text-sm text-gray-500 mt-0.5">{group.email}</div>
                )}
              </div>

              <div className="p-5 flex flex-wrap gap-3">
                {group.dates.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-800 text-sm"
                  >
                    <span className="font-medium">{item.formatted}</span>

                    {isAdmin && (
                      <div className="flex items-center gap-1.5 ml-1">
                        {/* <button
                          onClick={() =>
                            handleEdit({
                              _id: item._id,
                              userId: { _id: group.userId },
                              date: item.date,
                            })
                          }
                          title="Edit this date"
                          className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          ✏️
                        </button> */}
                        <button
  onClick={() =>
    handleEdit({
      _id: item._id,
      userId: { _id: group.userId },
      date: item.date,
    })
  }
  title="Edit this date"
  className="p-1 rounded hover:bg-indigo-100 transition"
>
  <Pencil className="cursor-pointer w-4 h-4 text-yellow-600 hover:text-yellow-800" />
</button>

                        {/* <button
                          onClick={() => handleDelete(item._id)}
                          title="Delete this date"
                          className="cursor-pointer text-red-500 bg-red-500 hover:text-red-700 transition-colors"
                        >
                          🗑️
                        </button> */}
                        <button
  onClick={() => handleDelete(item._id)}
  title="Delete this date"
  className="p-1 rounded hover:bg-red-100 transition"
>
  <Trash2 className="cursor-pointer w-4 h-4 text-red-600 hover:text-red-800" />
</button>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyOff;