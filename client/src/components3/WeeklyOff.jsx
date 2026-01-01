import React, { useEffect, useState } from "react";
import api from "../api/axios";

const WeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    date: "",
    reason: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?.role === "admin") {
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
    } catch (error) {
      console.error("Failed to fetch weekly offs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyWeeklyOff = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/weekly-off/me");
      setWeeklyOffs(res.data || []);
    } catch (error) {
      console.error("Failed to fetch my weekly offs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.filter((u) => u.role !== "admin") || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.date) {
      alert("Please select employee and date");
      return;
    }

    try {
      setIsLoading(true);
      if (editingId) {
        await api.put(`/weekly-off/admin/${editingId}`, form);
        alert("Weekly off updated successfully!");
      } else {
        await api.post("/weekly-off/admin", form);
        alert("Weekly off added successfully!");
      }
      resetForm();
      fetchAllWeeklyOff();
    } catch (error) {
      console.error("Error saving weekly off:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (off) => {
    setEditingId(off._id);
    setForm({
      userId: off.userId?._id || "",
      date: off.date?.split("T")[0] || "", // format for input type="date"
      reason: off.reason || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this weekly off?")) return;

    try {
      await api.delete(`/weekly-off/admin/${id}`);
      fetchAllWeeklyOff();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete weekly off");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ userId: "", date: "", reason: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Weekly Off Management
          </h1>

          {user?.role === "admin" && (
            <button
              onClick={resetForm}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <span>+ New Weekly Off</span>
            </button>
          )}
        </div>

        {/* Form - only for admin */}
        {user?.role === "admin" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">
              {editingId ? "✏️ Update Weekly Off" : "➕ Add New Weekly Off"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Employee */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  value={form.userId}
                  onChange={(e) => setForm({ ...form, userId: e.target.value })}
                  required
                >
                  <option value="">Select employee</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} • {u.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Family event"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-3 flex flex-wrap gap-3 mt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? "Saving..." : editingId ? "Update" : "Save"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Table / List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {user?.role === "admin" && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reason
                  </th>
                  {user?.role === "admin" && (
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={user?.role === "admin" ? 4 : 3} className="px-6 py-12 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : weeklyOffs.length === 0 ? (
                  <tr>
                    <td colSpan={user?.role === "admin" ? 4 : 3} className="px-6 py-12 text-center text-gray-500">
                      No weekly offs found
                    </td>
                  </tr>
                ) : (
                  weeklyOffs.map((off) => (
                    <tr key={off._id} className="hover:bg-gray-50 transition-colors">
                      {user?.role === "admin" && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{off.userId?.name}</div>
                          <div className="text-xs text-gray-500">{off.userId?.email}</div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(off.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {off.reason || "—"}
                      </td>
                      {user?.role === "admin" && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(off)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(off._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyOff;