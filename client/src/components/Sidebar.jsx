

// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   MessageSquare,
//   Users,
//   FileText,
//   BarChart3,
//   Settings,
//   Plane
// } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4H14v2h20v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E")`,
//         }}></div>
//       </div>

//       <div className="relative z-10">
//         {/* Logo Section */}
//         <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
//               <Plane size={24} className="text-white" />
//             </div>
//             <h1 className="text-xl font-bold tracking-tight">
//               FareBuzzer CRM
//             </h1>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 p-4 space-y-1">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//               ${isActive 
//                 ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" 
//                 : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//               }`
//             }
//           >
//             <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
//             <span>Dashboard</span>
//           </NavLink>

//           <NavLink
//             to="/bookings"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//               ${isActive 
//                 ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" 
//                 : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//               }`
//             }
//           >
//             <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
//             <span>Bookings</span>
//           </NavLink>

//           <NavLink
//             to="/enquiries"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//               ${isActive 
//                 ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" 
//                 : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//               }`
//             }
//           >
//             <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
//             <span>Enquiries</span>
//           </NavLink>

//           <NavLink
//             to="/users"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//               ${isActive 
//                 ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" 
//                 : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//               }`
//             }
//           >
//             <Users size={20} className="group-hover:scale-110 transition-transform" />
//             <span>Users</span>
//           </NavLink>

//           <NavLink
//             to="/reports"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//               ${isActive 
//                 ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" 
//                 : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//               }`
//             }
//           >
//             <BarChart3 size={20} className="group-hover:scale-110 transition-transform" />
//             <span>Reports</span>
//           </NavLink>

//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//               ${isActive 
//                 ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" 
//                 : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//               }`
//             }
//           >
//             <Settings size={20} className="group-hover:scale-110 transition-transform" />
//             <span>Settings</span>
//           </NavLink>
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-slate-800">
//           <p className="text-xs text-slate-400 text-center leading-relaxed">
//             © {new Date().getFullYear()} <span className="text-teal-400 font-medium">FareBuzzer Travel</span>
//             <br />
//             <span className="text-slate-500">Managing journeys, creating memories</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


//=================with user admin===========


// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   MessageSquare,
//   Users,
//   BarChart3,
//   Settings,
//   Plane, Wallet
// } from "lucide-react";

// const Sidebar = () => {
//   const role = localStorage.getItem("role"); // ✅ GET ROLE

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//     ${isActive
//       ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
//       : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//     }`;

//   return (
//     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-5" />

//       <div className="relative z-10">
//         {/* Logo */}
//         <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
//               <Plane size={24} className="text-white" />
//             </div>
//             <h1 className="text-xl font-bold">FareBuzzer CRM</h1>
//           </div>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 p-4 space-y-1">
//           <NavLink to="/dashboard" className={linkClass}>
//             <LayoutDashboard size={20} />
//             <span>Dashboard</span>
//           </NavLink>

//           <NavLink to="/bookings" className={linkClass}>
//             <BookOpen size={20} />
//             <span>All Bookings</span>
//           </NavLink>

//           <NavLink to="/add-booking" className={linkClass}>
//             <BookOpen size={20} />
//             <span>Create Booking</span>
//           </NavLink>

//           <NavLink to="/enquiries" className={linkClass}>
//             <MessageSquare size={20} />
//             <span>All Enquiries</span>
//           </NavLink>

//           <NavLink to="/add-enquiry" className={linkClass}>
//             <MessageSquare size={20} />
//             <span>Create Enquiry</span>
//           </NavLink>

//           <NavLink to="/send-email" className={linkClass}>
//             <Wallet size={20} />
//             <span>Send E-mail</span>
//           </NavLink>

//           {/* 🔐 ADMIN ONLY */}
//           {role === "admin" && (
//             <>
//               <NavLink to="/users" className={linkClass}>
//                 <Users size={20} />
//                 <span>Users</span>
//               </NavLink>

//               <NavLink to="/reports" className={linkClass}>
//                 <BarChart3 size={20} />
//                 <span>Reports</span>
//               </NavLink>

//               <NavLink to="/settings" className={linkClass}>
//                 <Settings size={20} />
//                 <span>Settings</span>
//               </NavLink>


//               <NavLink to="/accounting-dashboard" className={linkClass}>
//                 <Wallet size={20} />
//                 <span>Accounting</span>
//               </NavLink>


            
//               <NavLink to="/inbox-email" className={linkClass}>
//                 <Wallet size={20} />
//                 <span>Inbox E-mail</span>
//               </NavLink>

//             </>
//           )}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-slate-800">
//           <p className="text-xs text-slate-400 text-center">
//             © {new Date().getFullYear()}{" "}
//             <span className="text-teal-400 font-medium">
//               FareBuzzer Travel
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };




//=============01 jan=============

// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   MessageSquare,
//   Users,
//   BarChart3,
//   Settings,
//   Plane,
//   Wallet,
//   Mail,
//   CalendarX, CalendarDays,Clock
// } from "lucide-react";

// import { FiCoffee } from "react-icons/fi";


// const Sidebar = () => {
//   const role = localStorage.getItem("role");


// // import { NavLink } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   BookOpen,
// //   MessageSquare,
// //   Users,
// //   BarChart3,
// //   Settings,
// //   Plane, Wallet
// // } from "lucide-react";


// // const Sidebar = () => {
// //   const role = localStorage.getItem("role"); // ✅ GET ROLE


//   return (
//     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
//       {/* Background pattern (optional subtle noise) */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none" />

//       <div className="relative z-10 flex flex-col h-full">
//         {/* Logo */}
//         <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
//               <Plane size={24} className="text-white" />
//             </div>
//             <h1 className="text-xl font-bold tracking-tight">FareBuzzer CRM</h1>
//           </div>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//           {/* Core Features - same for everyone */}
//           <NavLink to="/dashboard" className={linkClass}>
//             <LayoutDashboard size={20} />
//             <span>Dashboard</span>
//           </NavLink>

// //   const linkClass = ({ isActive }) =>
// //     `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
// //     ${isActive
// //       ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
// //       : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
// //     }`;

// //   return (
// //     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
// //       {/* Background pattern */}
// //       <div className="absolute inset-0 opacity-5" />

// //       <div className="relative z-10">
// //         {/* Logo */}
// //         <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
// //           <div className="flex items-center gap-3">
// //             <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
// //               <Plane size={24} className="text-white" />
// //             </div>
// //             <h1 className="text-xl font-bold">FareBuzzer CRM</h1>
// //           </div>
// //         </div>


// //         {/* Menu */}
// //         <nav className="flex-1 p-4 space-y-1">
// //           <NavLink to="/dashboard" className={linkClass}>
// //             <LayoutDashboard size={20} />
// //             <span>Dashboard</span>
// //           </NavLink>

// //           <NavLink to="/bookings" className={linkClass}>
// //             <BookOpen size={20} />
// //             <span>All Bookings</span>
// //           </NavLink>

// //           <NavLink to="/add-booking" className={linkClass}>
// //             <BookOpen size={20} />
// //             <span>Create Booking</span>
// //           </NavLink>

// //           <NavLink to="/enquiries" className={linkClass}>
// //             <MessageSquare size={20} />
// //             <span>All Enquiries</span>
// //           </NavLink>


//           {/* Email features */}
//           <NavLink to="/send-email" className={linkClass}>
//             <Mail size={20} />
//             <span>Send Email</span>
//           </NavLink>

//           <NavLink to="/apply-leave" className={linkClass}>
//             <CalendarDays size={20} />
//             <span>Apply Leave</span>
//           </NavLink>

//           <NavLink to="/my-leaves" className={linkClass}>
//             <CalendarDays size={20} />
//             <span>My Leaves</span>
//           </NavLink>

//           <NavLink to="/mark-attendance" className={linkClass}>
//             <Clock size={20} />
//             Mark Attendance
//           </NavLink>

//           <NavLink to="/my-attendance" className={linkClass}>
//             <CalendarDays size={20} />
//             My Attendance
//           </NavLink>


//           <NavLink to="/break-request" className={linkClass}>
// <FiCoffee size={20}/>
// <span>Break Request</span>
// </NavLink>

//           <NavLink to="/my-login-hours" className={linkClass}>
//             <Clock size={20} />
//             <span>My Login Hours</span>
//           </NavLink>

          




//           {/* ==================== ADMIN ONLY ==================== */}
//           {role === "admin" && (
//             <>
//               <div className="h-px bg-slate-700 my-4 opacity-60" />

//               <div className="text-xs font-semibold text-teal-400 px-4 mb-2 uppercase tracking-wider">
//                 Admin Tools
//               </div>

//               <NavLink to="/users" className={linkClass}>
//                 <Users size={20} />
//                 <span>Users</span>
//               </NavLink>

// //           <NavLink to="/add-enquiry" className={linkClass}>
// //             <MessageSquare size={20} />
// //             <span>Create Enquiry</span>
// //           </NavLink>

// //           <NavLink to="/send-email" className={linkClass}>
// //             <Wallet size={20} />
// //             <span>Send E-mail</span>
// //           </NavLink>
// >>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc

// //           {/* 🔐 ADMIN ONLY */}
// //           {role === "admin" && (
// //             <>
// //               <NavLink to="/users" className={linkClass}>
// //                 <Users size={20} />
// //                 <span>Users</span>
// //               </NavLink>

// <<<<<<< HEAD
//               <NavLink to="/accounting-dashboard" className={linkClass}>
//                 <Wallet size={20} />
//                 <span>Accounting</span>
//               </NavLink>

//               <NavLink to="/inbox-email" className={linkClass}>
//                 <Mail size={20} />
//                 <span>Inbox Email</span>
//               </NavLink>

//               <NavLink to="/weekly-off" className={linkClass}>
//                 <CalendarX size={20} />
//                 <span>Weekly Off</span>
//               </NavLink>

//               <NavLink to="/leave-approval" className={linkClass}>
//                 <CalendarX size={20} />
//                 <span>Leave Approval</span>
//               </NavLink>
//               <NavLink to="/all-attendance" className={linkClass}>
//                 <CalendarX size={20} />
//                 <span>All-Attendance</span>
//               </NavLink>





//               <NavLink to="/all-login-hours" className={linkClass}>
//                 <Clock size={20} />
//                 <span>All Login Hours</span>
//               </NavLink>

//               <NavLink to="/settings" className={linkClass}>
//                 <Settings size={20} />
//                 <span>Settings</span>
//               </NavLink>
//             </>
//           )}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-slate-800 mt-auto">
//           <p className="text-xs text-slate-400 text-center">
//             © {new Date().getFullYear()}{" "}
//             <span className="text-teal-400 font-medium">FareBuzzer Travel</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// =======
// //               <NavLink to="/reports" className={linkClass}>
// //                 <BarChart3 size={20} />
// //                 <span>Reports</span>
// //               </NavLink>

// //               <NavLink to="/settings" className={linkClass}>
// //                 <Settings size={20} />
// //                 <span>Settings</span>
// //               </NavLink>


// //               <NavLink to="/accounting-dashboard" className={linkClass}>
// //                 <Wallet size={20} />
// //                 <span>Accounting</span>
// //               </NavLink>



// //               <NavLink to="/inbox-email" className={linkClass}>
// //                 <Wallet size={20} />
// //                 <span>Inbox E-mail</span>
// //               </NavLink>

// //                <NavLink to="/weekly-off" className={linkClass}>
// //                 <Wallet size={20} />
// //                 <span>Weekly-Off</span>
// //               </NavLink>

// //             </>
// //           )}
// //         </nav>

// //         {/* Footer */}
// //         <div className="p-4 border-t border-slate-800">
// //           <p className="text-xs text-slate-400 text-center">
// //             © {new Date().getFullYear()}{" "}
// //             <span className="text-teal-400 font-medium">
// //               FareBuzzer Travel
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Sidebar;

// //-----------------
// >>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc

// export default Sidebar;







// // const Sidebar = () => {
// //   const role = localStorage.getItem("role")?.toLowerCase(); // 🔥 FIX

// //   const isAdmin = role === "admin";

// //   const linkClass = ({ isActive }) =>
// //     `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
// //      ${
// //        isActive
// //          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
// //          : "text-slate-300 hover:bg-teal-600/20 hover:text-white"
// //      }`;

// //   return (
// //     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col">

// //       {/* LOGO */}
// //       <div className="h-16 flex items-center justify-center border-b border-slate-800">
// //         <h1 className="text-xl font-bold">FareBuzzer CRM</h1>
// //       </div>

// //       {/* MENU */}
// //       <nav className="flex-1 p-4 space-y-1">

// //         {/* COMMON (ADMIN + USER) */}
// //         <NavLink to="/dashboard" className={linkClass}>
// //           <LayoutDashboard size={20} /> Dashboard
// //         </NavLink>

// //         <NavLink to="/bookings" className={linkClass}>
// //           <BookOpen size={20} /> All Bookings
// //         </NavLink>

// //         <NavLink to="/add-booking" className={linkClass}>
// //           <BookOpen size={20} /> Create Booking
// //         </NavLink>

// //         <NavLink to="/enquiries" className={linkClass}>
// //           <MessageSquare size={20} /> All Enquiries
// //         </NavLink>

// //         <NavLink to="/add-enquiry" className={linkClass}>
// //           <MessageSquare size={20} /> Create Enquiry
// //         </NavLink>

// //         {/* 🔐 ADMIN ONLY */}
// //         {isAdmin && (
// //           <>
// //             <div className="mt-4 text-xs text-slate-400 uppercase tracking-wide">
// //               Admin Panel
// //             </div>

// //             <NavLink to="/users" className={linkClass}>
// //               <Users size={20} /> Users
// //             </NavLink>

// //             <NavLink to="/reports" className={linkClass}>
// //               <BarChart3 size={20} /> Reports
// //             </NavLink>

// //             <NavLink to="/settings" className={linkClass}>
// //               <Settings size={20} /> Settings
// //             </NavLink>

// //             <NavLink to="/accounting-dashboard" className={linkClass}>
// //               <Settings size={20} /> Accounting
// //             </NavLink>
// //           </>
// //         )}
// //       </nav>
// //     </div>
// //   );
// // };

// //=============01 jan=============

// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   MessageSquare,
//   Users,
//   BarChart3,
//   Settings,
//   Plane,
//   Wallet,
//   Mail,
//   CalendarX, CalendarDays,Clock
// } from "lucide-react";

// import { FiCoffee } from "react-icons/fi";


// const Sidebar = () => {
//   const role = localStorage.getItem("role");

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
//     ${isActive
//       ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
//       : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
//     }`;

//   return (
//     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
//       {/* Background pattern (optional subtle noise) */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none" />

//       <div className="relative z-10 flex flex-col h-full">
//         {/* Logo */}
//         <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
//               <Plane size={24} className="text-white" />
//             </div>
//             <h1 className="text-xl font-bold tracking-tight">FareBuzzer CRM</h1>
//           </div>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//           {/* Core Features - same for everyone */}
//           <NavLink to="/dashboard" className={linkClass}>
//             <LayoutDashboard size={20} />
//             <span>Dashboard</span>
//           </NavLink>

//           <NavLink to="/bookings" className={linkClass}>
//             <BookOpen size={20} />
//             <span>All Bookings</span>
//           </NavLink>

//           <NavLink to="/add-booking" className={linkClass}>
//             <BookOpen size={20} />
//             <span>Create Booking</span>
//           </NavLink>

//           <NavLink to="/enquiries" className={linkClass}>
//             <MessageSquare size={20} />
//             <span>All Enquiries</span>
//           </NavLink>

//           <NavLink to="/add-enquiry" className={linkClass}>
//             <MessageSquare size={20} />
//             <span>Create Enquiry</span>
//           </NavLink>

//           {/* Email features */}
//           <NavLink to="/send-email" className={linkClass}>
//             <Mail size={20} />
//             <span>Send Email</span>
//           </NavLink>

//           <NavLink to="/apply-leave" className={linkClass}>
//             <CalendarDays size={20} />
//             <span>Apply Leave</span>
//           </NavLink>

//           <NavLink to="/my-leaves" className={linkClass}>
//             <CalendarDays size={20} />
//             <span>My Leaves</span>
//           </NavLink>

//           <NavLink to="/mark-attendance" className={linkClass}>
//             <Clock size={20} />
//             Mark Attendance
//           </NavLink>

//           <NavLink to="/my-attendance" className={linkClass}>
//             <CalendarDays size={20} />
//             My Attendance
//           </NavLink>


//           <NavLink to="/break-request" className={linkClass}>
// <FiCoffee size={20}/>
// <span>Break Request</span>
// </NavLink>

//           <NavLink to="/my-login-hours" className={linkClass}>
//             <Clock size={20} />
//             <span>My Login Hours</span>
//           </NavLink>

          




//           {/* ==================== ADMIN ONLY ==================== */}
//           {role === "admin" && (
//             <>
//               <div className="h-px bg-slate-700 my-4 opacity-60" />

//               <div className="text-xs font-semibold text-teal-400 px-4 mb-2 uppercase tracking-wider">
//                 Admin Tools
//               </div>

//               <NavLink to="/users" className={linkClass}>
//                 <Users size={20} />
//                 <span>Users</span>
//               </NavLink>

//               <NavLink to="/reports" className={linkClass}>
//                 <BarChart3 size={20} />
//                 <span>Reports</span>
//               </NavLink>

//               <NavLink to="/accounting-dashboard" className={linkClass}>
//                 <Wallet size={20} />
//                 <span>Accounting</span>
//               </NavLink>

//               <NavLink to="/inbox-email" className={linkClass}>
//                 <Mail size={20} />
//                 <span>Inbox Email</span>
//               </NavLink>

//               <NavLink to="/weekly-off" className={linkClass}>
//                 <CalendarX size={20} />
//                 <span>Weekly Off</span>
//               </NavLink>

//               <NavLink to="/leave-approval" className={linkClass}>
//                 <CalendarX size={20} />
//                 <span>Leave Approval</span>
//               </NavLink>
//               <NavLink to="/all-attendance" className={linkClass}>
//                 <CalendarX size={20} />
//                 <span>All-Attendance</span>
//               </NavLink>





//               <NavLink to="/all-login-hours" className={linkClass}>
//                 <Clock size={20} />
//                 <span>All Login Hours</span>
//               </NavLink>

//               <NavLink to="/settings" className={linkClass}>
//                 <Settings size={20} />
//                 <span>Settings</span>
//               </NavLink>
//             </>
//           )}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-slate-800 mt-auto">
//           <p className="text-xs text-slate-400 text-center">
//             © {new Date().getFullYear()}{" "}
//             <span className="text-teal-400 font-medium">FareBuzzer Travel</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// <<<<<<< HEAD
// // export default Sidebar;
// =======
// export default Sidebar;

// >>>>>>> 4ea931ddafa401165734ba191b79e903fffb7afc




import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Plane,
  Wallet,
  Mail,
  CalendarX,
  CalendarDays,
  Clock,
} from "lucide-react";
import { FiCoffee } from "react-icons/fi";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
    ${
      isActive
        ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
        : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
    }`;

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* LOGO */}
        <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
              <Plane size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              FareBuzzer CRM
            </h1>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* COMMON */}
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/bookings" className={linkClass}>
            <BookOpen size={20} />
            <span>All Bookings</span>
          </NavLink>

          <NavLink to="/add-booking" className={linkClass}>
            <BookOpen size={20} />
            <span>Create Booking</span>
          </NavLink>

          <NavLink to="/enquiries" className={linkClass}>
            <MessageSquare size={20} />
            <span>All Enquiries</span>
          </NavLink>

          <NavLink to="/add-enquiry" className={linkClass}>
            <MessageSquare size={20} />
            <span>Create Enquiry</span>
          </NavLink>

          <NavLink to="/send-email" className={linkClass}>
            <Mail size={20} />
            <span>Send Email</span>
          </NavLink>

          <NavLink to="/apply-leave" className={linkClass}>
            <CalendarDays size={20} />
            <span>Apply Leave</span>
          </NavLink>

          <NavLink to="/my-leaves" className={linkClass}>
            <CalendarDays size={20} />
            <span>My Leaves</span>
          </NavLink>

          <NavLink to="/mark-attendance" className={linkClass}>
            <Clock size={20} />
            <span>Mark Attendance</span>
          </NavLink>

          <NavLink to="/my-attendance" className={linkClass}>
            <CalendarDays size={20} />
            <span>My Attendance</span>
          </NavLink>

          <NavLink to="/break-request" className={linkClass}>
            <FiCoffee size={20} />
            <span>Break Request</span>
          </NavLink>

          <NavLink to="/my-login-hours" className={linkClass}>
            <Clock size={20} />
            <span>My Login Hours</span>
          </NavLink>

            <NavLink to="/my-weekly-off" className={linkClass}>
            <Clock size={20} />
            <span>My Weekly Off</span>
          </NavLink>

          {/* ADMIN ONLY */}
          {role === "admin" && (
            <>
              <div className="h-px bg-slate-700 my-4 opacity-60" />
              <div className="text-xs font-semibold text-teal-400 px-4 mb-2 uppercase tracking-wider">
                Admin Tools
              </div>

              <NavLink to="/users" className={linkClass}>
                <Users size={20} />
                <span>Users</span>
              </NavLink>

              <NavLink to="/reports" className={linkClass}>
                <BarChart3 size={20} />
                <span>Reports</span>
              </NavLink>

              <NavLink to="/accounting-dashboard" className={linkClass}>
                <Wallet size={20} />
                <span>Accounting</span>
              </NavLink>

              <NavLink to="/inbox-email" className={linkClass}>
                <Mail size={20} />
                <span>Inbox Email</span>
              </NavLink>

              <NavLink to="/weekly-off" className={linkClass}>
                <CalendarX size={20} />
                <span>Weekly Off</span>
              </NavLink>

              <NavLink to="/leave-approval" className={linkClass}>
                <CalendarX size={20} />
                <span>Leave Approval</span>
              </NavLink>

              <NavLink to="/all-attendance" className={linkClass}>
                <CalendarX size={20} />
                <span>All Attendance</span>
              </NavLink>

              <NavLink to="/all-login-hours" className={linkClass}>
                <Clock size={20} />
                <span>All Login Hours</span>
              </NavLink>

              <NavLink to="/settings" className={linkClass}>
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-800 mt-auto">
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-teal-400 font-medium">
              FareBuzzer Travel
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
