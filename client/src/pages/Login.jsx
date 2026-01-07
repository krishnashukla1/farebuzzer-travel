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

//===============

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

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [markAttendance, setMarkAttendance] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await API.post("/auth/login", { email, password });

  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("role", res.data.user.role);

  //     // show attendance modal after login
  //     setShowAttendanceModal(true);
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await API.post("/auth/login", { email, password });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);

    // 🔥 ADMIN → DIRECT DASHBOARD
    if (user.role === "admin") {
      window.location.href = "/dashboard";
      return;
    }

    // 🔥 EMPLOYEE / AGENT → SHOW ATTENDANCE MODAL
    setShowAttendanceModal(true);
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

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

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Attendance marking failed");
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      {/* LOGIN FORM */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            FareBuzzer CRM Login
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border p-3 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            New user?{" "}
            <Link to="/signup" className="text-teal-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* ATTENDANCE MODAL */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Mark Attendance</h3>

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={markAttendance}
                onChange={(e) => setMarkAttendance(e.target.checked)}
              />
              Mark today’s attendance
            </label>

            <button
              onClick={handleAttendanceSubmit}
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
