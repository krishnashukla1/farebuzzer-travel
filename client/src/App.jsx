//===================with user admin both===correct=================

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Bookings from "./pages/Bookings";
// import AddBooking from './components1/CreateBooking'
// import Enquiries from "./pages/Enquiries";
// import AddEnquiry from './components1/CreateEnquiry'

// import Reports from "./pages/Reports";
// import Users from "./pages/Users";
// import Settings from "./pages/Settings";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";


// import AccountingDashboard from './components2/Dashboard'
// import ProjectPage from './components2/ProjectPage'

// import SendEmail from './pages/SendEmail'
// import InboxEmail from "./pages/InboxEmail";

// import FlightSearch from './components1/FlightSearch'




// import WeeklyOff from './components3/WeeklyOff'
// import ApplyLeave from "./components3/ApplyLeave";
// import MyLeaves from "./components3/MyLeaves";
// import LeaveApproval from "./components3/LeaveApproval";
// import MarkAttendance from "./components3/MarkAttendance";
// import MyAttendance from "./components3/MyAttendance";
// import AttendanceAdmin from "./components3/AttendanceAdmin";


// import MyLoginHours from "./components3/MyLoginHours";
// // import AdminLoginStatus from "./components3/AdminLoginStatus";
// import AllLoginHours from './components3/AllLoginHours'
// import BreakRequest from "./components3/BreakRequest";

// import MyWeeklyOff from "./components3/UserWeeklyOff"

// import AgreementPage from './components2/AgreementPage'
// import ThankYouPage from './components2/ThankYouPage'



// import Payment from "./pages/Payment";



// const App = () => {
//   const token = localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>

//            {/* ========== PUBLIC ROUTES ========== */}
//         {/* ✅ Payment route ALWAYS public rahe - token check se bahar rakhein */}
//         <Route path="/payment" element={<Payment />} />

//         {/* ✅ Agreement routes bhi public rakhein */}
//         <Route path="/agree/:token" element={<AgreementPage />} />
//         <Route path="/thank-you" element={<ThankYouPage />} />



//         {/* PUBLIC */}
//         {!token && (
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </>
//         )}

//         {/* PROTECTED */}
//         {token && (
//           <Route
//             path="/*"
//             element={
//               <div className="flex h-screen bg-gray-100">
//                 <Sidebar />
//                 <div className="flex-1 flex flex-col">
//                   <Navbar />
//                   <div className="p-4 overflow-auto bg-gray-50">
//                     <Routes>
//                       {/* Common routes (Admin + User) */}
//                       {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//                       <Route path="/bookings" element={<Bookings />} />
//                       <Route path="/add-booking" element={<AddBooking />} />

//                       <Route path="/enquiries" element={<Enquiries />} />
//                       <Route path="/add-enquiry" element={<AddEnquiry />} />
//                       <Route path="/send-email" element={<SendEmail />} />


// {/* <Route path="/payment" element={<Payment />} />  */}

//  {/* <Route path="/agree/:token" element={<AgreementPage />} />
//         <Route path="/thank-you" element={<ThankYouPage />} /> */}





//         <Route path="/flight-search" element={<FlightSearch />} />
//                       {/* <Route path="/weekly-off" element={<WeeklyOff />} /> */}
//                       <Route path="/apply-leave" element={<ApplyLeave />} />
//                       <Route path="/my-leaves" element={<MyLeaves />} />
//                       <Route path="/mark-attendance" element={<MarkAttendance />} />
//                       <Route path="/my-attendance" element={<MyAttendance />} />
//                       <Route path="/break-request" element={<BreakRequest />} />

//                       <Route path="/my-login-hours" element={<MyLoginHours />} />
//                       <Route path="/my-weekly-off" element={<MyWeeklyOff />} />





//                       {/* ADMIN ONLY */}

//                       <Route path="/dashboard" element={
//                         <ProtectedRoute allowedRoles={["admin"]}>
//                           <Dashboard />
//                         </ProtectedRoute>
//                       } />

//                       <Route
//                         path="/reports"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>

//                             <Reports />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/users"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <Users />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/settings"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <Settings />
//                           </ProtectedRoute>
//                         }
//                       />

//                       <Route
//                         path="/accounting-dashboard"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <AccountingDashboard />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/project/:id"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <ProjectPage />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route path="/weekly-off" element={
//                         <ProtectedRoute allowedRoles={["admin"]}>
//                           <WeeklyOff />
//                         </ProtectedRoute>
//                       } />
//                       <Route
//                         path="/leave-approval"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <LeaveApproval />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/all-attendance"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <AttendanceAdmin />
//                           </ProtectedRoute>
//                         }
//                       />



//                       <Route
//                         path="/all-login-hours"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <AllLoginHours />
//                           </ProtectedRoute>
//                         }
//                       />




//                       <Route path="/weekly-off" element={
//                         <ProtectedRoute allowedRoles={["admin"]}>
//                           <WeeklyOff />
//                         </ProtectedRoute>
//                       } />
//                       <Route
//                         path="/leave-approval"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <LeaveApproval />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/all-attendance"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <AttendanceAdmin />
//                           </ProtectedRoute>
//                         }
//                       />



//                       <Route
//                         path="/all-login-hours"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <AllLoginHours />
//                           </ProtectedRoute>
//                         }
//                       />



//                       {/* <Route path="send-email" element={<SendEmail />} /> */}

//                       {/* Inbox Email route */}
//                       <Route
//                         path="/inbox-email"
//                         element={
//                           <ProtectedRoute allowedRoles={["admin"]}>
//                             <InboxEmail />
//                           </ProtectedRoute>
//                         }
//                       />

//                       {/* 
//                       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//                       <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}



//                       <Route path="/" element={<Navigate to="/send-email" replace />} />
//                       <Route path="*" element={<Navigate to="/send-email" replace />} />
//                     </Routes>
//                   </div>
//                 </div>
//               </div>
//             }
//           />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


//===============2 feb==========

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";

// import AgreementPage from "./components2/AgreementPage";
// import ThankYouPage from "./components2/ThankYouPage";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* pages */
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Enquiries from "./pages/Enquiries";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import SendEmail from "./pages/SendEmail";
import PayNow from './pages/PayNow'
import InboxEmail from "./pages/InboxEmail";

/* components */
import AddBooking from "./components1/CreateBooking";
import AddEnquiry from "./components1/CreateEnquiry";
import FlightSearch from "./components1/FlightSearch";

/* admin */
import AccountingDashboard from "./components2/Dashboard";
import ProjectPage from "./components2/ProjectPage";

/* user/admin common */
import ApplyLeave from "./components3/ApplyLeave";
import MyLeaves from "./components3/MyLeaves";
import MarkAttendance from "./components3/MarkAttendance";
import MyAttendance from "./components3/MyAttendance";
import MyLoginHours from "./components3/MyLoginHours";
import BreakRequest from "./components3/BreakRequest";
import MyWeeklyOff from "./components3/UserWeeklyOff";

/* admin only */
import WeeklyOff from "./components3/WeeklyOff";
import LeaveApproval from "./components3/LeaveApproval";
import AttendanceAdmin from "./components3/AttendanceAdmin";
import AllLoginHours from "./components3/AllLoginHours";



import InvoicePage from "./pages/InvoicePage";
import CRMInvoices from "./pages/CRMInvoices";


const DashboardLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <div className="p-4 overflow-auto bg-gray-50">{children}</div>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/agree/:token" element={<AgreementPage />} /> */}
        {/* <Route path="/thank-you" element={<ThankYouPage />} /> */}

        <Route path="/invoice/:invoiceNumber" element={<InvoicePage />} />
        <Route path="/crm/invoices" element={<CRMInvoices />} />


        {/* ========== AUTH ROUTES ========== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ========== PROTECTED ROUTES ========== */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>

                  {/* Common (Admin + User) */}
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/add-booking" element={<AddBooking />} />
                  <Route path="/enquiries" element={<Enquiries />} />
                  <Route path="/add-enquiry" element={<AddEnquiry />} />
                  <Route path="/send-email" element={<SendEmail />} />
                  <Route path="/pay-now" element={<PayNow />} />
                  <Route path="/flight-search" element={<FlightSearch />} />

                  <Route path="/apply-leave" element={<ApplyLeave />} />
                  <Route path="/my-leaves" element={<MyLeaves />} />
                  <Route path="/mark-attendance" element={<MarkAttendance />} />
                  <Route path="/my-attendance" element={<MyAttendance />} />
                  <Route path="/my-login-hours" element={<MyLoginHours />} />
                  <Route path="/my-weekly-off" element={<MyWeeklyOff />} />
                  <Route path="/break-request" element={<BreakRequest />} />

                  {/* ADMIN ONLY */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
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
                  <Route
                    path="/weekly-off"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <WeeklyOff />
                      </ProtectedRoute>
                    }
                  />
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
                    path="/all-login-hours"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AllLoginHours />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/inbox-email"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <InboxEmail />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/" element={<Navigate to="/send-email" replace />} />
                  <Route path="*" element={<Navigate to="/send-email" replace />} />

                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;

