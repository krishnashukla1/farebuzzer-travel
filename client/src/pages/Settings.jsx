

import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Loader2,
  Edit,
  Lock,
  Eye,
  EyeOff,
  User,
  Mail,
} from "lucide-react";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
  });

  /* ---------------- FETCH USER ---------------- */
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        newPassword: "",
      });
    } catch (err) {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ---------------- UPDATE PROFILE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name === user.name &&
      formData.email === user.email &&
      !formData.newPassword
    ) {
      return alert("No changes detected");
    }

    setUpdating(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.newPassword) {
        payload.password = formData.newPassword;
      }

      await API.put("/users/me", payload);
      alert("Profile updated successfully");
      fetchUser();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-teal-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Account Settings
        </h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-white">
              <User size={28} />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">
                {user.name}
              </p>
              <p className="text-white/80 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                New Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Leave blank to keep current password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={updating}
                className="cursor-pointer inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md disabled:opacity-50"
              >
                {updating ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Edit size={18} />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

