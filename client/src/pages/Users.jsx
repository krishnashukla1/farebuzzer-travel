



import { useEffect, useState } from "react";
import API from "../api/axios";
import { Users, UserPlus, Mail, Calendar, Shield, Trash2, Edit ,Eye, EyeOff} from "lucide-react";

const roleConfig = {
  admin: { color: "bg-red-100 text-red-700 border-red-200", icon: Shield, label: "Admin" },
  agent: { color: "bg-teal-100 text-teal-700 border-teal-200", icon: Users, label: "Agent" },
  manager: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Shield, label: "Manager" },
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "agent" });
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // ✅ fetch all users
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      alert("Could not load users");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  // Submit Add/Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };
      if (!dataToSend.password) delete dataToSend.password; // don't overwrite password if empty

      if (editingId) {
        await API.put(`/users/${editingId}`, dataToSend);
      } else {
        // await API.post("/users", dataToSend); // or /auth/register
        await API.post("/auth/register", dataToSend); // ✅ use backend registration endpoint

      }

      setShowModal(false);
      setFormData({ name: "", email: "", password: "", role: "agent" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    setEditingId(user._id);
    setShowModal(true);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-full mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-600 rounded-xl shadow-lg">
              <Users size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
              <p className="text-gray-600 mt-1">Manage agents, admins, and roles</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", email: "", password: "", role: "agent" });
              setShowModal(true);
            }}
            className="cursor-pointer flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-teal-700 transition shadow-lg"
          >
            <UserPlus size={20} />
            Add New User
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-white rounded-xl shadow animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="cursor-pointer bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-16 text-center">
                        <div className="text-gray-400">
                          <Users size={64} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">No users yet</p>
                          <p className="text-sm mt-2">Add your first team member to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => {
                      const RoleIcon = roleConfig[user.role]?.icon || Users;
                      return (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <Users size={20} className="text-teal-600" />
                              </div>
                              <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-gray-700 flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />
                            {user.email}
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${roleConfig[user.role]?.color || "bg-gray-100 text-gray-700"}`}
                            >
                              <RoleIcon size={14} />
                              {roleConfig[user.role]?.label || user.role}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-gray-500 text-sm flex items-center gap-2">
                            <Calendar size={14} />
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="px-6 py-5 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleEdit(user)}
                                className="cursor-pointer text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(user._id)}
                                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit User" : "Add New User"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                {/* <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Password {editingId ? "(leave blank to keep current)" : ""}
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingId}
                  />
                </div> */}
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Password {editingId ? "(leave blank to keep current)" : ""}
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required={!editingId}
                    />

                    {/* Eye Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1">Role</label>
                  <select
                    className="cursor-pointer w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                    {editingId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
