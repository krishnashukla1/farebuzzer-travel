//==========correct==============

// import { useState } from "react";
// import { Link } from "react-router-dom"; // ← Added for proper navigation
// import API from "../api/axios";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await API.post("/auth/login", {
//         email,
//         password
//       });

//       localStorage.setItem("token", res.data.token);
//         localStorage.setItem("role", res.data.user.role); // 🔥 THIS WAS MISSING
//       window.location.href = "/dashboard";
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
//         }}
//       >
//         {/* Dark overlay for contrast */}
//         <div className="absolute inset-0 bg-black/40"></div>

//         <div className="relative z-10 w-full max-w-lg px-4">
//           <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
//             {/* Logo/Title with travel icon */}
//             {/* <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5a2 2 0 002 2h2a2 2 0 002 2 2 2 0 002 2v1.906M12.945 20H15a2 2 0 002-2v-1a2 2 0 00-2-2 2 2 0 01-2-2v-2.945" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800">FareBuzzer Travel CRM</h2>
//               <p className="text-gray-600 mt-2">Welcome back! Manage your tours with ease</p>
//             </div> */}

//             <div className="text-center mb-8">
//               {/* Logo */}
//               <div className="inline-flex items-center justify-center w-30 h-30 bg-teal-600 rounded-full mb-4 overflow-hidden mx-auto">
//                 <img
//                   src="fbt new logo.png"
//                   alt="FareBuzzer Logo"
//                   className="w-30 h-30 object-contain"
//                 />
//               </div>


//               <h2 className="text-3xl font-bold text-gray-800">
//                 FareBuzzer Travel CRM
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Welcome back! Manage your tours with ease
//               </p>
//             </div>



//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-18 0v1.5A2.5 2.5 0 009 15.5V12" />
//                   </svg>
//                 </div>
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <div className="relative">
//                   <input
//                     type="password"
//                     placeholder="••••••••"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//               </div> */}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />

//                   {/* Lock icon */}
//                   <svg
//                     className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>

//                   {/* Eye icon */}
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-600 cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>


//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="cursor-pointer w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Logging in..." : "Sign In"}
//               </button>
//             </form>

//             {/* New: Sign Up Section */}
//             <p className="text-center text-sm text-gray-600 mt-6">
//               Don't have an account yet?{" "}
//               <Link
//                 to="/signup"
//                 className="text-teal-600 font-medium hover:underlin cursor-pointer"
//               >
//                 Sign Up
//               </Link>
//             </p>

//             <p className="text-center text-xs text-gray-500 mt-6">
//               Powered by FareBuzzer Travel CRM Dashboard
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

//===============correct with mark attendance=============

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../api/axios";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [showAttendanceModal, setShowAttendanceModal] = useState(false);
//   const [markAttendance, setMarkAttendance] = useState(false);


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");

//   try {
//     const res = await API.post("/auth/login", { email, password });

//     const { token, user } = res.data;

//     localStorage.setItem("token", token);
//     localStorage.setItem("role", user.role);

//     // 🔥 ADMIN → DIRECT DASHBOARD
//     if (user.role === "admin") {
//       window.location.href = "/dashboard";
//       return;
//     }

//     // 🔥 EMPLOYEE / AGENT → SHOW ATTENDANCE MODAL
//     setShowAttendanceModal(true);
//   } catch (err) {
//     setError(err.response?.data?.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleAttendanceSubmit = async () => {
//     try {
//       if (markAttendance) {
//         await API.post(
//           "/attendance/mark",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//       }

//       window.location.href = "/dashboard";
//     } catch (err) {
//       alert("Attendance marking failed");
//       window.location.href = "/dashboard";
//     }
//   };

//   return (
//     <>
//       {/* LOGIN FORM */}
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             FareBuzzer CRM Login
//           </h2>

//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border p-3 rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full border p-3 rounded"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="text-center mt-4 text-sm">
//             New user?{" "}
//             <Link to="/signup" className="text-teal-600">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* ATTENDANCE MODAL */}
//       {showAttendanceModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
//             <h3 className="text-lg font-bold mb-4">Mark Attendance</h3>

//             <label className="flex items-center gap-2 mb-4">
//               <input
//                 type="checkbox"
//                 checked={markAttendance}
//                 onChange={(e) => setMarkAttendance(e.target.checked)}
//               />
//               Mark today’s attendance
//             </label>

//             <button
//               onClick={handleAttendanceSubmit}
//               className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;

//========================final==============

import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Attendance modal states (only for non-admin users)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [markAttendance, setMarkAttendance] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Admin → go straight to dashboard
      if (user.role === "admin") {
        window.location.href = "/dashboard";
        return;
      }

      // Employee/Agent → show attendance modal
      setShowAttendanceModal(true);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // const handleAttendanceSubmit = async () => {
  //   try {
  //     if (markAttendance) {
  //       await API.post(
  //         "/attendance/mark",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //     }
  //     window.location.href = "/dashboard";
  //   } catch (err) {
  //     alert("Attendance marking failed, but redirecting anyway...");
  //     window.location.href = "/dashboard";
  //   }
  // };

  const handleAttendanceSubmit = async () => {
  try {
    if (markAttendance) {
      await API.post(
        "/attendance/mark",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }

    // ✅ success → redirect
    // window.location.href = "/dashboard";
    window.location.href = "/send-email";

  } catch (err) {
    const message = err.response?.data?.message;

    // ✅ Attendance already marked → NOT an error
    if (message === "Attendance already marked for today") {
      // window.location.href = "/dashboard";
      window.location.href = "/send-email";

      return;
    }

    // ❌ Real error only
    alert("Something went wrong while marking attendance");
    // window.location.href = "/dashboard";
    window.location.href = "/send-email";

  }
};

  return (
    <>
      {/* MAIN BACKGROUND + OVERLAY */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        {/* LOGIN CARD */}
        <div className="relative z-10 w-full max-w-lg px-5 sm:px-6">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10 border border-white/30">
            {/* Logo + Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-600 rounded-full mb-5 overflow-hidden mx-auto border-4 border-white shadow-lg">
                <img
                  src="/fbt new logo.png" // ← change path if needed
                  alt="FareBuzzer Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                FareBuzzer Travel CRM
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                Welcome back! Let's manage your tours
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center text-sm">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7a5 5 0 1110 0v4H7V7z"
                    />
                  </svg>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>

            {/* Links */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-teal-600 font-medium hover:text-teal-800 transition-colors"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-center text-xs text-gray-500 mt-5">
              © {new Date().getFullYear()} FareBuzzer Travel CRM
            </p>
          </div>
        </div>
      </div>

      {/* ATTENDANCE MODAL */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-5 text-center">
              Welcome back!
            </h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
  After marking your attendance, please go to the <strong>Break Request</strong> page
  and click the <strong>Login</strong> button to start your work session.
</p>


            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={markAttendance}
                onChange={(e) => setMarkAttendance(e.target.checked)}
                className="cursor-pointer w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
              />
              <span className="text-gray-700 font-medium">
                Mark today's attendance
              </span>
            </label>

            <button
              onClick={handleAttendanceSubmit}
              className="cursor-pointer w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;


//==========8 jan=========

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
// import toast from 'react-hot-toast'; // ← recommended (optional but very useful)

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Attendance modal states
//   const [showAttendanceModal, setShowAttendanceModal] = useState(false);
//   const [markAttendance, setMarkAttendance] = useState(true); // default checked
//   const [attendanceLoading, setAttendanceLoading] = useState(false);

//   const navigate = useNavigate();

  
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");


//   try {
//   const res = await API.post("/auth/login", { email, password });
//   const { token, user } = res.data;

//   localStorage.setItem("token", token);
//   localStorage.setItem("role", user.role);
//   API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//   // ── VERY IMPORTANT ── Automatically record login/attendance
//   try {
//     await API.post("/login-hours/login");  // This creates the LoginHour record
//     toast.success("Login recorded successfully!");
//   } catch (loginErr) {
//     // If already logged in today → it's OK, don't show error
//     if (!loginErr.response?.data?.message?.includes("Already logged in")) {
//       toast.error("Could not record login time");
//     }
//   }

//   // Then proceed with admin/employee logic...
//   if (user.role === "admin") {
//     navigate("/dashboard", { replace: true });
//   } else {
//     setShowAttendanceModal(true);
//   }

// }
  
  
//   catch (err) {
//     const message = err.response?.data?.message || "Login failed";
//     setError(message);
//     toast.error(message);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleAttendanceSubmit = async () => {
//   setAttendanceLoading(true);

//   try {
//     if (markAttendance) {
//       await API.post("/attendance/mark");
//       toast.success("Attendance marked successfully!");
//     } else {
//       toast("Attendance skipped for today", {
//         icon: "ℹ️",
//       });
//     }

//     // 1. First close modal (important!)
//     setShowAttendanceModal(false);

//     // 2. Small delay to let modal animation finish + state update
//     //    This solves 90% of "modal stays after redirect" problems
//     setTimeout(() => {
//       navigate("/dashboard", { replace: true });
//     }, 300); // 300ms is usually enough

//   } catch (err) {
//     const msg = err.response?.data?.message;

//     if (msg?.toLowerCase().includes("already marked")) {
//       toast.success("Attendance already marked for today");
//     } else {
//       toast.error(msg || "Failed to process attendance");
//     }

//     // Even on error → still go to dashboard (most users expect it)
//     setShowAttendanceModal(false);
//     setTimeout(() => {
//       navigate("/dashboard", { replace: true });
//     }, 400);
//   } finally {
//     setAttendanceLoading(false);
//   }
// };

// // Optional: Close modal when clicking outside or pressing Esc
// useEffect(() => {
//   if (!showAttendanceModal) return;

//   const handleEsc = (e) => {
//     if (e.key === "Escape") {
//       handleAttendanceSubmit(); // or just close without marking
//     }
//   };

//   window.addEventListener("keydown", handleEsc);
//   return () => window.removeEventListener("keydown", handleEsc);
// }, [showAttendanceModal]);


//   // const handleAttendanceSubmit = async () => {
//   //   setAttendanceLoading(true);

//   //   try {
//   //     if (markAttendance) {
//   //       await API.post("/attendance/mark");
//   //       toast.success("Attendance marked successfully!");
//   //     } else {
//   //       toast("Attendance skipped", {
//   //         icon: "ℹ️",
//   //         style: { background: "#fefcbf", color: "#92400e" }
//   //       });
//   //     }

//   //     setShowAttendanceModal(false);
//   //     navigate("/dashboard", { replace: true });

//   //   } catch (err) {
//   //     const message = err.response?.data?.message;

//   //     // Most common & expected case → already marked today
//   //     if (message?.includes("already marked")) {
//   //       toast.success("Attendance already marked today");
//   //       setShowAttendanceModal(false);
//   //       navigate("/dashboard", { replace: true });
//   //       return;
//   //     }

//   //     // Real error
//   //     toast.error(message || "Failed to mark attendance");
//   //     console.error("Attendance error:", err);
//   //   } finally {
//   //     setAttendanceLoading(false);
//   //   }
//   // };

//   // Optional: Close modal with Escape key
 
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && showAttendanceModal) {
//         handleAttendanceSubmit(); // or just close without marking
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [showAttendanceModal]);

//   return (
//     <>
//       {/* Background */}
//       <div
//         className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />

//         {/* Login Card */}
//         <div className="relative z-10 w-full max-w-lg px-5 sm:px-6">
//           <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/40">
//             {/* Logo & Title */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-full mb-5 overflow-hidden mx-auto border-4 border-white shadow-lg">
//                 <img
//                   src="/fbt new logo.png"
//                   alt="FareBuzzer Logo"
//                   className="w-full h-full object-contain p-2"
//                 />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
//                 FareBuzzer Travel CRM
//               </h2>
//               <p className="text-gray-600 mt-2 text-sm">
//                 Sign in to manage your travel operations
//               </p>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Email address
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     autoComplete="email"
//                   />
//                   <svg
//                     className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     autoComplete="current-password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2
//                   ${loading 
//                     ? "bg-teal-400 cursor-not-allowed" 
//                     : "bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl hover:scale-[1.02]"}`}
//               >
//                 {loading && <Loader2 className="animate-spin" size={20} />}
//                 {loading ? "Signing in..." : "Sign In"}
//               </button>
//             </form>

//             <div className="text-center mt-6 space-y-2">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-teal-600 font-medium hover:text-teal-800">
//                   Sign up
//                 </Link>
//               </p>
//               <p className="text-xs text-gray-500">
//                 © {new Date().getFullYear()} FareBuzzer Travel CRM
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Attendance Modal - only for non-admin users */}
//       {showAttendanceModal && (
//         <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-100">
//             <div className="text-center mb-6">
//               <CheckCircle className="mx-auto text-teal-600 mb-3" size={48} />
//               <h3 className="text-2xl font-bold text-gray-800">
//                 Welcome back!
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 Let's start your day properly
//               </p>
//             </div>

//             <div className="space-y-6">
//               <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
//                 <input
//                   type="checkbox"
//                   checked={markAttendance}
//                   onChange={(e) => setMarkAttendance(e.target.checked)}
//                   className="w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
//                 />
//                 <div>
//                   <span className="font-medium text-gray-800 block">
//                     Mark attendance as Present
//                   </span>
//                   <span className="text-sm text-gray-500">
//                     Required to access full features today
//                   </span>
//                 </div>
//               </label>

//               <button
//                 onClick={handleAttendanceSubmit}
//                 disabled={attendanceLoading}
//                 className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all
//                   ${attendanceLoading 
//                     ? "bg-teal-400 cursor-not-allowed" 
//                     : "bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl"}`}
//               >
//                 {attendanceLoading && <Loader2 className="animate-spin" size={20} />}
//                 {attendanceLoading ? "Processing..." : "Continue to Dashboard"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;

