

//====================================================

import { useState } from "react";
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
  ChevronDown,
  ChevronRight,CreditCard 
} from "lucide-react";
import { FiCoffee } from "react-icons/fi";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  // Dropdown states
  // const [isBookingsOpen, setIsBookingsOpen] = useState(true);
  // const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(true);
  // const [isEmployeeTrackerOpen, setIsEmployeeTrackerOpen] = useState(true);


  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(false);
  const [isEmployeeTrackerOpen, setIsEmployeeTrackerOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
    ${isActive
      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
      : "text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md"
    }`;

  const submenuLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-10 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive
      ? "bg-teal-700/40 text-white"
      : "text-slate-400 hover:bg-teal-700/20 hover:text-white"
    }`;

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* LOGO */}
        <div className="h-16 flex items-center justify-center bg-teal-600/20 border-b border-teal-500/30">
          {/* <div className="flex items-center gap-3">
         <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
              <Plane size={24} />
            </div> 

            <div className="p-2 bg-teal-600 rounded-lg shadow-lg">
              <img
                src="/d2.png"
                alt="Plane"
                className="w-6 h-6 object-contain"
              />
            </div>

            <h1 className="text-xl font-bold tracking-tight">
              FareBuzzer CRM
            </h1>
          </div> */}



          <div className="flex items-center gap-3">
            <img
              src="/d2.png"
              alt="FareBuzzer Logo"
              className="w-7 h-7 object-contain"
            />

            <h1 className="text-xl font-bold tracking-tight">
              FareBuzzer CRM
            </h1>
          </div>

        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Dashboard - always visible */}
          {/* <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink> */}

          {/* Bookings Section */}
          <div className="mt-2">
            <button
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
              className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md`}
            >
              <div className="flex items-center gap-4">
                <BookOpen size={20} />
                <span>Bookings</span>
              </div>
              {isBookingsOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {isBookingsOpen && (
              <div className="mt-1 space-y-1 animate-fadeIn">
                <NavLink to="/bookings" className={submenuLinkClass}>
                  <span>All Bookings</span>
                </NavLink>
                <NavLink to="/add-booking" className={submenuLinkClass}>
                  <span>Create Booking</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Enquiries Section */}
          <div className="mt-1">
            <button
              onClick={() => setIsEnquiriesOpen(!isEnquiriesOpen)}
              className={`cursor-pointer  w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md`}
            >
              <div className="flex items-center gap-4">
                <MessageSquare size={20} />
                <span>Enquiries</span>
              </div>
              {isEnquiriesOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {isEnquiriesOpen && (
              <div className="mt-1 space-y-1 animate-fadeIn">
                <NavLink to="/enquiries" className={submenuLinkClass}>
                  <span>All Enquiries</span>
                </NavLink>
                <NavLink to="/add-enquiry" className={submenuLinkClass}>
                  <span>Create Enquiry</span>
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/send-email" className={linkClass}>
            <Mail size={20} />
            <span>Send Email</span>
          </NavLink>

          <NavLink to="/pay-now" className={linkClass}>
  <CreditCard size={20} />
  <span>Pay Now</span>
</NavLink>

          <NavLink to="/flight-search" className={linkClass}>
            <Plane size={20} />
            <span>Flight Search</span>
          </NavLink>

          {/* EMPLOYEE ONLY */}
          {!isAdmin && (
            <>
              <NavLink to="/apply-leave" className={linkClass}>
                <CalendarDays size={20} />
                <span>Apply Leave</span>
              </NavLink>

              <NavLink to="/my-leaves" className={linkClass}>
                <CalendarDays size={20} />
                <span>My Leaves</span>
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
            </>
          )}

          {/* ADMIN ONLY */}
          {isAdmin && (
            <>
              <div className="h-px bg-slate-700 my-4 opacity-60" />
              <div className="text-xs font-semibold text-teal-400 px-4 mb-2 uppercase tracking-wider">
                Admin Tools
              </div>

              <NavLink to="/dashboard" className={linkClass}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>

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

              {/* Employee Tracker */}
              <div className="mt-1">
                <button
                  onClick={() => setIsEmployeeTrackerOpen(!isEmployeeTrackerOpen)}
                  className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                    text-slate-300 hover:bg-teal-600/20 hover:text-white hover:shadow-md`}
                >
                  <div className="flex items-center gap-4">
                    <CalendarX size={20} />
                    <span>Employee Tracker</span>
                  </div>
                  {isEmployeeTrackerOpen ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {isEmployeeTrackerOpen && (
                  <div className="mt-1 space-y-1 animate-fadeIn">
                    <NavLink to="/weekly-off" className={submenuLinkClass}>
                      <span>Weekly Off</span>
                    </NavLink>
                    <NavLink to="/leave-approval" className={submenuLinkClass}>
                      <span>Leave Approval</span>
                    </NavLink>
                    <NavLink to="/all-attendance" className={submenuLinkClass}>
                      <span>All Attendance</span>
                    </NavLink>
                    <NavLink to="/all-login-hours" className={submenuLinkClass}>
                      <span>All Login Hours</span>
                    </NavLink>
                  </div>
                )}
              </div>

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
            <span className="text-teal-400 font-medium">FareBuzzer Travel</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;