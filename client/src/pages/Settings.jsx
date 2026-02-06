
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Loader2, Edit, Lock, Sun, Moon, Bell } from "lucide-react";

// const Settings = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     newPassword: "",
//   });
//   const [notifications, setNotifications] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   const fetchUser = async () => {
//     try {


//       const res = await API.get("/auth/me", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setUser(res.data);
//       setFormData({ name: res.data.name, email: res.data.email, password: "", newPassword: "" });
//     } catch (err) {
//       console.error("Failed to fetch user", err);
//       alert("Could not load user info");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       const updateData = { name: formData.name, email: formData.email };
//       if (formData.newPassword) updateData.password = formData.newPassword;

//       // await API.put(`/users/${user._id}`, updateData, {
//         await API.put("/users/me", updateData, {

//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("Profile updated successfully");
//       setFormData({ ...formData, password: "", newPassword: "" });
//       fetchUser();
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin" size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} py-8 transition-colors duration-300`}>
//       <div className="max-w-4xl mx-auto px-6">
//         <h1 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Settings</h1>

//         {/* Profile Card */}
//         <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300`}>
//           <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Profile</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 Current Password <Lock size={16} className="inline ml-1" />
//               </label>
//               <input
//                 type="password"
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder="Enter current password to change"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                 New Password <Lock size={16} className="inline ml-1" />
//               </label>
//               <input
//                 type="password"
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 value={formData.newPassword}
//                 onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                 placeholder="Leave blank to keep current password"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={updating}
//               className="cursor-pointer px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex items-center gap-2 mt-3"
//             >
//               {updating ? <Loader2 className="animate-spin" size={18} /> : <Edit size={18} />}
//               Update Profile
//             </button>
//           </form>
//         </div>

//         {/* Preferences Card */}
//         <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300`}>
//           <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Preferences</h2>
//           <div className="flex flex-col gap-4">
//             {/* Notifications */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Bell size={20} className={`${darkMode ? "text-gray-200" : "text-gray-700"}`} />
//                 <span className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>Email Notifications</span>
//               </div>
//               <input
//                 type="checkbox"
//                 checked={notifications}
//                 onChange={() => setNotifications(!notifications)}
//                 className="w-5 h-5 accent-teal-600 cursor-pointer"
//               />
//             </div>

//             {/* Dark Mode */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {darkMode ? <Moon size={20} className="text-gray-200" /> : <Sun size={20} className="text-gray-700" />}
//                 <span className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>Dark Mode</span>
//               </div>
//               <input
//                 type="checkbox"
//                 checked={darkMode}
//                 onChange={() => setDarkMode(!darkMode)}
//                 className="w-5 h-5 accent-teal-600 cursor-pointer"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

//====================================

// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Loader2, Edit, Lock, Eye, EyeOff  } from "lucide-react";


// const Settings = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);


//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     newPassword: "",
//   });

//   const [notifications, setNotifications] = useState(true);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   /* ---------------- FETCH LOGGED-IN USER ---------------- */
//   const fetchUser = async () => {
//     try {
//       const res = await API.get("/auth/me");
//       setUser(res.data);
//       setFormData({
//         name: res.data.name || "",
//         email: res.data.email || "",
//         newPassword: "",
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   /* ---------------- DARK MODE HANDLER ---------------- */
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   /* ---------------- UPDATE PROFILE ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       formData.name === user.name &&
//       formData.email === user.email &&
//       !formData.newPassword
//     ) {
//       return alert("No changes detected");
//     }

//     setUpdating(true);
//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//       };

//       if (formData.newPassword) {
//         payload.password = formData.newPassword;
//       }

//       await API.put("/users/me", payload);
//       alert("Profile updated successfully");
//       fetchUser();
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin" size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
//       <div className="max-w-4xl mx-auto px-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//           Settings
//         </h1>

//         {/* ---------------- PROFILE CARD ---------------- */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//             Profile
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name */}
//             <div>
//               <label className="block mb-1 text-gray-700 dark:text-gray-300">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block mb-1 text-gray-700 dark:text-gray-300">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             {/* New Password */}
//             {/* <div>
//               <label className="block mb-1 text-gray-700 dark:text-gray-300">
//                 New Password <Lock size={16} className="inline ml-1" />
//               </label>
//               <input
//                 type="password"
//                 className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
//                 value={formData.newPassword}
//                 onChange={(e) =>
//                   setFormData({ ...formData, newPassword: e.target.value })
//                 }
//                 placeholder="Leave blank to keep current password"
//               />
//             </div> */}

//             <div>
//   <label className="block mb-1 text-gray-700 dark:text-gray-300">
//     New Password <Lock size={16} className="inline ml-1" />
//   </label>

//   <div className="relative">
//     <input
//       type={showNewPassword ? "text" : "password"}
//       className="w-full rounded border px-3 py-2 pr-10 dark:bg-gray-700 dark:text-white"
//       value={formData.newPassword}
//       onChange={(e) =>
//         setFormData({ ...formData, newPassword: e.target.value })
//       }
//       placeholder="Leave blank to keep current password"
//     />

//     {/* Eye Icon */}
//     <button
//       type="button"
//       onClick={() => setShowNewPassword((prev) => !prev)}
//       className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//     >
//       {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//     </button>
//   </div>
// </div>


//             <button
//               type="submit"
//               disabled={updating}
//               className="cursor-pointer flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded mt-3 disabled:opacity-50"
//             >
//               {updating ? (
//                 <Loader2 size={18} className="animate-spin" />
//               ) : (
//                 <Edit size={18} />
//               )}
//               Update Profile
//             </button>
//           </form>
//         </div>

 
//       </div>
//     </div>
//   );
// };

// export default Settings;


//==================

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

