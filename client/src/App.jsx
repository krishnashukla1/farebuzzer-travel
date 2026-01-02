
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";       
// import Dashboard from "./pages/Dashboard";
// import Bookings from "./pages/Bookings";
// import Enquiries from "./pages/Enquiries";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Reports from "./pages/Reports"
// import Users from './pages/Users'
// import Settings from './pages/Settings'

// const App = () => {
//   const token = localStorage.getItem("token");
//   const isAuthenticated = !!token;

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes - Only when NOT authenticated */}
//         {!isAuthenticated ? (
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </>
//         ) : (
//           <>
//             {/* Protected Routes - Only when authenticated */}
//             <Route
//               path="/*"
//               element={
//                 <div className="flex h-screen bg-gray-100">
//                   {/* Sidebar */}
//                   <Sidebar />

//                   {/* Main Content Area */}
//                   <div className="flex-1 flex flex-col">
//                     <Navbar />

//                     <div className="p-6 overflow-auto bg-gray-50">
//                       <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route path="/bookings" element={<Bookings />} />
//                         <Route path="/enquiries" element={<Enquiries />} />
//                         <Route path="/reports" element={<Reports />} />
//                         <Route path="/users" element={<Users />} />
//                         <Route path="/settings" element={<Settings />} />


//                         {/* Default redirect inside authenticated layout */}
//                         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//                         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//                       </Routes>
//                     </div>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Redirect any direct access to /login or /signup when already logged in */}
//             <Route path="/login" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

//===================with user admin both====================

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import AddBooking from './components1/CreateBooking'
import Enquiries from "./pages/Enquiries";
import AddEnquiry from './components1/CreateEnquiry'

import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


import AccountingDashboard from './components2/Dashboard'
import ProjectPage from './components2/ProjectPage'

import SendEmail from './pages/SendEmail'
import InboxEmail from "./pages/InboxEmail";


import WeeklyOff from './components3/WeeklyOff'
import ApplyLeave from "./components3/ApplyLeave";
import MyLeaves from "./components3/MyLeaves";
import LeaveApproval from "./components3/LeaveApproval";
import MarkAttendance from "./components3/MarkAttendance";
import MyAttendance from "./components3/MyAttendance";
import AttendanceAdmin from "./components3/AttendanceAdmin";


import MyLoginHours from "./components3/MyLoginHours";
import AdminLoginStatus from "./components3/AdminLoginStatus";
import AllLoginHours from './components3/AllLoginHours'
import BreakRequest from "./components3/BreakRequest";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        {!token && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* PROTECTED */}
        {token && (
          <Route
            path="/*"
            element={
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="p-4 overflow-auto bg-gray-50">
                    <Routes>
                      {/* Common routes (Admin + User) */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/add-booking" element={<AddBooking />} />

                      <Route path="/enquiries" element={<Enquiries />} />
                      <Route path="/add-enquiry" element={<AddEnquiry />} />
                      <Route path="/send-email" element={<SendEmail />} />
                      {/* <Route path="/weekly-off" element={<WeeklyOff />} /> */}
                      <Route path="/apply-leave" element={<ApplyLeave />} />
                      <Route path="/my-leaves" element={<MyLeaves />} />
                      <Route path="/mark-attendance" element={<MarkAttendance />} />
                      <Route path="/my-attendance" element={<MyAttendance />} />
                      <Route path="/break-request" element={<BreakRequest />} />

                      <Route path="/my-login-hours" element={<MyLoginHours />} />

                   




                      {/* ADMIN ONLY */}
                      <Route
                        path="/reports"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <Reports />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/users"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <Users />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <Settings />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/accounting-dashboard"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AccountingDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/project/:id"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <ProjectPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/weekly-off" element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <WeeklyOff />
                        </ProtectedRoute>
                      } />
                      <Route
                        path="/leave-approval"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <LeaveApproval />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/all-attendance"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <AttendanceAdmin />
                          </ProtectedRoute>
                        }
                      />


<Route
  path="/admin-login-status"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLoginStatus />
    </ProtectedRoute>
  }
/>
<Route
  path="/all-login-hours"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AllLoginHours />
    </ProtectedRoute>
  }
/>



                      {/* <Route path="send-email" element={<SendEmail />} /> */}

                      {/* Inbox Email route */}
                      <Route
                        path="/inbox-email"
                        element={
                          <ProtectedRoute allowedRoles={["admin"]}>
                            <InboxEmail />
                          </ProtectedRoute>
                        }
                      />










                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
