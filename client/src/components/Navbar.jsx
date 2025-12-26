// import { LogOut, User } from "lucide-react";

// const Navbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
//       {/* Left */}
//       <h1 className="text-lg font-semibold text-gray-700">
//         FareBuzzer Travel CRM
//       </h1>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2 text-gray-600">
//           <User size={18} />
//           <span className="text-sm font-medium">Admin</span>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

//====================================

import { LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios"; // ✅ IMPORT API

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <h1 className="text-lg font-semibold text-gray-700">
        FareBuzzer Travel CRM
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <User size={18} />
          <span className="text-sm font-medium text-teal-600">
            {user?.name || "User"} {/* ✅ SAFE ACCESS */}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

