

//================21 jan==============

import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import {
  PlaneTakeoff, DollarSign, Receipt, AlertCircle,
  Calendar, PhoneOutgoing, Ticket, CreditCard, XCircle,
  RefreshCw, MessageSquare, Clock, Percent, UserCheck, 
  Package, TrendingUp, Users, Briefcase, BarChart3, ShieldCheck
} from "lucide-react";

const Dashboard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Convert IST local date (yyyy-mm-dd) to proper UTC range for that full IST day
  const convertISTDateToUTC = (dateStr, isEnd = false) => {
    if (!dateStr) return null;

    const [year, month, day] = dateStr.split("-").map(Number);

    if (!isEnd) {
      // Start of IST day: 00:00 IST → subtract 5:30 to get UTC
      return new Date(Date.UTC(year, month - 1, day - 1, 18, 30, 0, 0));
    } else {
      // End of IST day: 23:59:59.999 IST → subtract 5:30
      return new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999));
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const params = {};
      if (fromDate) params.from = convertISTDateToUTC(fromDate).toISOString();
      if (toDate) params.to = convertISTDateToUTC(toDate, true).toISOString();

      const res = await API.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!user) return <p className="text-white text-center mt-20">Loading user info...</p>;

  // Helper to determine profit color
  const getProfitColor = (value) => value >= 0 ? "green" : "red";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-purple-900 px-8 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-white">Welcome, </span>
            <span className="text-teal-300">{user.name} 👋</span>
          </h1>

          <p className="text-purple-200 mt-2 text-lg">
            <span className="text-white font-medium">farebuzzertravel.com</span>
            <span className="mx-3">•</span>
            <span className="text-teal-300 font-semibold">
              ID: {user?._id ? user._id.slice(-8).toUpperCase() : "N/A"}
            </span>
          </p>

          <p className="text-purple-300 mt-3 flex items-center justify-center gap-2 text-lg">
            <Calendar size={20} />
            <span>{today}</span>
          </p>

          {/* Date Range Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg">
            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-2">From Date (IST)</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="cursor-pointer w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 focus:outline-none focus:ring-3 focus:ring-teal-500 focus:ring-offset-1 transition-all shadow-sm"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-2">To Date (IST)</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="cursor-pointer w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 focus:outline-none focus:ring-3 focus:ring-teal-500 focus:ring-offset-1 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="cursor-pointer mt-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:opacity-70 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-48 bg-white rounded-2xl animate-pulse shadow-lg" />
            ))}
          </div>
        ) : (
          <>
            {/* SECTION 1: FINANCIAL OVERVIEW */}
            <div className="mb-8 mt-15">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-indigo-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard 
                  title="Total Bookings" 
                  value={stats.totalBookings ?? 0} 
                  icon={PlaneTakeoff} 
                  color="blue"
                  trend={stats.todayBookings ? `+${stats.todayBookings} today` : null}
                />
                
                <StatCard 
                  title="Total Revenue" 
                  value={`$${(stats.revenue ?? 0).toLocaleString("en-IN")}`} 
                  icon={DollarSign} 
                  color="indigo"
                  subtitle="Total Sales"
                />
                
                <StatCard 
                  title="Total Cost" 
                  value={`$${(stats.totalCost ?? 0).toLocaleString("en-IN")}`} 
                  icon={Package} 
                  color="orange"
                  subtitle="Cost of Sales"
                />
                
                <StatCard 
                  title="Total Expenses" 
                  value={`$${(stats.totalExpenses ?? 0).toLocaleString("en-IN")}`} 
                  icon={CreditCard} 
                  color="red"
                  subtitle="Operational Costs"
                />
              </div>
            </div>

            {/* SECTION 2: PROFIT ANALYSIS */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-emerald-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Profit Analysis</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                  title="Gross Profit"
                  value={`$${(stats.grossProfit ?? 0).toLocaleString("en-IN")}`}
                  icon={TrendingUp}
                  color="teal"
                  subtitle="Revenue - Cost"
                />
                
                <StatCard
                  title="MCO / Total Profit"
                  value={`$${(stats.totalProfit ?? stats.mco ?? stats.profit ?? 0).toLocaleString("en-IN")}`}
                  icon={DollarSign}
                  color={getProfitColor(stats.totalProfit ?? 0)}
                  subtitle={stats.totalProfit >= 0 ? "Net Profit ▲" : "Net Loss ▼"}
                  highlight={true}
                />
                
                <StatCard 
                  title="Amendment Profit" 
                  value={`$${(stats.amendmentProfit ?? 0).toLocaleString("en-IN")}`} 
                  icon={Briefcase} 
                  color="purple"
                  subtitle="From Amendments"
                />
                
                <StatCard 
                  title="Avg Profit/Booking" 
                  value={`$${stats.avgProfitPerBooking ?? 0}`} 
                  icon={BarChart3} 
                  color="blue"
                  subtitle="Per Booking Average"
                />
              </div>
            </div>

            {/* SECTION 3: BOOKING STATUS BREAKDOWN */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Booking Status</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <StatCard 
                  title="FRESH" 
                  value={stats.fresh ?? 0} 
                  icon={RefreshCw} 
                  color="lightblue"
                  compact={true}
                />
                
                <StatCard 
                  title="FOLLOW-UP" 
                  value={stats.airlineFollowUp ?? 0} 
                  icon={PhoneOutgoing} 
                  color="orange"
                  compact={true}
                />
                
                <StatCard 
                  title="TO TICKETING" 
                  value={stats.sendToTicketing ?? 0} 
                  icon={Ticket} 
                  color="lightblue"
                  compact={true}
                />
                
                <StatCard 
                  title="TICKETED" 
                  value={stats.ticketedCharged ?? 0} 
                  icon={CreditCard} 
                  color="lightblue"
                  compact={true}
                />
                
                <StatCard 
                  title="CANCELLED" 
                  value={stats.cancelled ?? 0} 
                  icon={XCircle} 
                  color="lightblue"
                  compact={true}
                />
                
                <StatCard 
                  title="CHARGE BACK" 
                  value={stats.chargeBack ?? 0} 
                  icon={RefreshCw} 
                  color="gray"
                  compact={true}
                />
              </div>
            </div>

            {/* SECTION 4: TODAY'S PERFORMANCE */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-amber-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Today's Performance</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <StatCard 
                  title="Today's Bookings" 
                  value={stats.todayBookings ?? 0} 
                  icon={PlaneTakeoff} 
                  color="lightblue"
                  compact={true}
                />
                
                <StatCard 
                  title="Today's Enquiry" 
                  value={stats.todayEnquiry ?? 0} 
                  icon={MessageSquare} 
                  color="blue"
                  compact={true}
                />
                
                <StatCard 
                  title="Today's Profit" 
                  value={`$${(stats.profitToday ?? 0).toLocaleString("en-IN")}`} 
                  icon={TrendingUp} 
                  color={getProfitColor(stats.profitToday ?? 0)}
                  compact={true}
                />
                
                <StatCard 
                  title="Amendment Today" 
                  value={`$${(stats.commissionToday ?? 0).toLocaleString("en-IN")}`} 
                  icon={Receipt} 
                  color="orange"
                  compact={true}
                />
                
                <StatCard 
                  title="Total Enquiry" 
                  value={stats.totalEnquiry ?? 0} 
                  icon={MessageSquare} 
                  color="blue"
                  compact={true}
                />
                
                <StatCard 
                  title="Discount Today" 
                  value={stats.discountToday ?? 0} 
                  icon={Percent} 
                  color="green"
                  compact={true}
                />
              </div>
            </div>

            {/* SECTION 5: RISK & TEAM */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-gray-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Risk & Team</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                  title="Loss Bookings" 
                  value={stats.authLoss ?? 0} 
                  icon={AlertCircle} 
                  color="red"
                  highlight={stats.authLoss > 0}
                />
                
                <StatCard 
                  title="Available Users" 
                  value={stats.usersAvailable ?? 0} 
                  icon={UserCheck} 
                  color="gray"
                  subtitle="Active Agents"
                />
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-700 mb-2">
                      {((stats.totalBookings > 0 ? (stats.authLoss / stats.totalBookings) * 100 : 0).toFixed(1))}%
                    </div>
                    <div className="text-sm font-medium text-gray-600">Loss Ratio</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stats.authLoss} loss out of {stats.totalBookings} total bookings
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700">
                    {stats.totalBookings > 0 ? Math.round((stats.ticketedCharged / stats.totalBookings) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Ticketed Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    ${stats.avgProfitPerBooking ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Avg. Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">
                    {stats.totalEnquiry > 0 ? Math.round((stats.totalBookings / stats.totalEnquiry) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    ${stats.totalExpenses ? Math.round(stats.revenue / stats.totalExpenses) : 0}x
                  </div>
                  <div className="text-sm text-gray-600">Revenue to Expense</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;