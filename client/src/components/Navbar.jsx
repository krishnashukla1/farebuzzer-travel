
//=========correct=====
// import { LogOut, User } from "lucide-react";
// import { useState, useEffect } from "react";
// import API from "../api/axios"; // ✅ IMPORT API

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await API.get("/users/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//       }
//     };

//     fetchUser();
//   }, []);

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
//           <span className="text-sm font-medium text-teal-600">
//             {user?.name || "User"} {/* ✅ SAFE ACCESS */}
//           </span>
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

//=========================

// import { LogOut, User } from "lucide-react";
// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await API.get("/users/me");
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   // const handleLogout = async () => {
//   //   try {
//   //     await API.post("/login-hours/logout");
//   //   } catch (err) {
//   //     console.error("Logout API failed");
//   //   } finally {
//   //     // ✅ CLEAR AUTH COMPLETELY
//   //     localStorage.removeItem("token");
//   //     localStorage.removeItem("role");

//   //     // 🔥 MOST IMPORTANT LINE
//   //     delete API.defaults.headers.common["Authorization"];

//   //     setUser(null);

//   //     // notify dashboard immediately
//   //     window.dispatchEvent(new Event("attendance-updated"));

//   //     navigate("/login", { replace: true });
//   //   }
//   // };

//   const handleLogout = async () => {
//   try {
//     // Show loading state or disable button (optional but good UX)
//     // You can add setIsLoggingOut(true) here if you want

//     await API.post("/login-hours/logout");
//     toast.success("Logged out successfully"); // optional

//   } catch (err) {
//     console.error("Logout API failed:", err);
//     toast.error("Logout failed, but clearing session anyway");
//     // Still proceed to clear session even if API fails (safety)
//   } finally {
//     // Only clear auth & redirect AFTER API attempt is done
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     delete API.defaults.headers.common["Authorization"];
//     setUser(null);

//     window.dispatchEvent(new Event("attendance-updated"));

//     navigate("/login", { replace: true });
//   }
// };
//   return (
//     <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
//       <h1 className="text-lg font-semibold text-gray-700">
//         FareBuzzer Travel CRM
//       </h1>

//       <div className="flex items-center gap-4">
//         {user && (
//           <div className="flex items-center gap-2 text-gray-600">
//             <User size={18} />
//             <span className="text-sm font-medium text-teal-600">
//               {user.name}
//             </span>
//           </div>
//         )}

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

// import { LogOut, User } from "lucide-react";
// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await API.get("/users/me");
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     if (isLoggingOut) return; // Prevent double click

//     setIsLoggingOut(true);

//     try {
//       // Attempt to record proper logout (with timeout protection)
//       const logoutPromise = API.post("/login-hours/logout");

//       // Wait max 5 seconds for logout to complete (prevents hanging)
//       await Promise.race([
//         logoutPromise,
//         new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
//       ]);

//       toast.success("Logged out successfully");
//     } catch (err) {
//       console.error("Logout API failed:", err);
//       // Don't show error toast - just clear session (safety first)
//       toast("Session cleared", { icon: "⚠️" });
//     } finally {
//       // Clean up session completely
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       delete API.defaults.headers.common["Authorization"];
//       setUser(null);

//       // Notify other components
//       window.dispatchEvent(new Event("attendance-updated"));

//       // Redirect
//       navigate("/login", { replace: true });

//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
//       <h1 className="text-lg font-semibold text-gray-700">
//         FareBuzzer Travel CRM
//       </h1>

//       <div className="flex items-center gap-4">
//         {user && (
//           <div className="flex items-center gap-2 text-gray-600">
//             <User size={18} />
//             <span className="text-sm font-medium text-teal-600">
//               {user.name}
//             </span>
//           </div>
//         )}

//         <button
//           onClick={handleLogout}
//           disabled={isLoggingOut}
//           className={`cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-700 text-sm transition-opacity
//             ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           <LogOut size={16} />
//           {isLoggingOut ? 'Logging out...' : 'Logout'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  // const handleLogout = async () => {
  //   // Block multiple clicks
  //   if (isLoggingOut) return;
    
  //   setIsLoggingOut(true);
    
  //   try {
  //     // Quick logout call - don't wait too long
  //     const logoutPromise = API.post("/login-hours/logout");
      
  //     // Timeout after 2 seconds max
  //     const timeoutPromise = new Promise((_, reject) => 
  //       setTimeout(() => reject(new Error("Timeout")), 2000)
  //     );
      
  //     await Promise.race([logoutPromise, timeoutPromise]);
      
  //   } catch (err) {
  //     // Ignore errors - we'll logout locally anyway
  //     console.log("Logout API may have failed, but continuing:", err.message);
  //   }
    
  //   // ALWAYS clear local storage - this is the key fix
  //   localStorage.clear(); // Clear everything to be sure
    
  //   // Also remove specific items
  //   const itemsToRemove = [
  //     "token", "role", "userId", "userEmail", "userName", 
  //     "todayLoginTime", "isLoggedIn", "attendanceMarked"
  //   ];
    
  //   itemsToRemove.forEach(item => localStorage.removeItem(item));
    
  //   // Remove API header
  //   delete API.defaults.headers.common["Authorization"];
    
  //   // Clear state
  //   setUser(null);
    
  //   // Show success message
  //   toast.success("Logged out successfully");
    
  //   // Force navigation - use setTimeout to ensure state updates first
  //   setTimeout(() => {
  //     navigate("/login", { replace: true });
  //     // Force reload to reset any stuck state
  //     window.location.href = "/login";
  //   }, 50);
    
  //   // Don't reset isLoggingOut since we're navigating away
  // };

  // In your Navbar.jsx logout function, add this:
const handleLogout = () => {
  // Set flag that we're coming from logout
  sessionStorage.setItem("fromLogout", "true");
  
  // Clear all localStorage
  localStorage.clear();
  
  // Force full page reload to reset all state
  window.location.href = "/login";
};


  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">
        FareBuzzer Travel CRM
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 text-gray-600">
            <User size={18} />
            <span className="text-sm font-medium text-teal-600">
              {user.name}
            </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-700 text-sm transition-opacity
            ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <LogOut size={16} />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;