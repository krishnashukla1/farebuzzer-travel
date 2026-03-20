
//=========================
import { LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from 'react-hot-toast'; // ← add this if you want nice messages

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     // Step 1: Call backend logout (most important!)
  //     await API.loginHours.logout();  // ← This updates backend record

  //     toast.success("Logged out successfully", { duration: 2000 });

  //     // Step 2: Clear local storage
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("role");

  //     // Step 3: Redirect
  //     window.location.href = "/login";
  //   } catch (error) {
  //     console.error("Logout failed:", error);

  //     // Optional: still logout locally even if backend fails
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("role");
  //     window.location.href = "/login";

  //     toast.error("Logout failed on server, but you are logged out locally");
  //   }
  // };

  const handleLogout = async () => {
  try {
    await API.loginHours.logout(); // calls POST /login-hours/logout
    toast.success("Logged out successfully!");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("Logout failed on server");

    // Still clear local data (fail-safe)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }
};

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">
        FareBuzzer Travel CRM
      </h1>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <User size={18} />
          <span className="text-sm font-medium text-teal-600">
            {user?.name || "User"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;