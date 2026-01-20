// //================WITH IST=========

// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import StatCard from "../components/StatCard";
// import {
//   PlaneTakeoff, DollarSign, Receipt, AlertCircle,
//   Calendar, PhoneOutgoing, Ticket, CreditCard, XCircle,
//   RefreshCw, MessageSquare, Clock, Percent, UserCheck
// } from "lucide-react";

// const Dashboard = () => {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Convert IST local date (yyyy-mm-dd) to proper UTC range for that full IST day
//   const convertISTDateToUTC = (dateStr, isEnd = false) => {
//     if (!dateStr) return null;

//     const [year, month, day] = dateStr.split("-").map(Number);

//     if (!isEnd) {
//       // Start of IST day: 00:00 IST → subtract 5:30 to get UTC
//       return new Date(Date.UTC(year, month - 1, day - 1, 18, 30, 0, 0)); // 00:00 IST = 18:30 previous day UTC
//     } else {
//       // End of IST day: 23:59:59.999 IST → subtract 5:30
//       return new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999)); // 23:59:59.999 IST = 18:29:59.999 UTC same day
//     }
//   };

//   // const fetchDashboardData = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const params = {};

//   //     if (fromDate) {
//   //       params.from = convertISTDateToUTC(fromDate).toISOString();
//   //     }
//   //     if (toDate) {
//   //       params.to = convertISTDateToUTC(toDate, true).toISOString();
//   //     }

//   //     const res = await API.get("/dashboard", { params });
//   //     setStats(res.data);
//   //   } catch (err) {
//   //     console.error("Failed to load dashboard data", err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchDashboardData = async () => {
//   try {
//     setLoading(true);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("No token found");
//       setLoading(false);
//       return;
//     }

//     const params = {};
//     if (fromDate) params.from = convertISTDateToUTC(fromDate).toISOString();
//     if (toDate) params.to = convertISTDateToUTC(toDate, true).toISOString();

//     const res = await API.get("/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//       params,
//     });

//     setStats(res.data);
//   } catch (err) {
//     console.error("Failed to load dashboard data", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const res = await API.get("/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const today = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   if (!user) return <p className="text-white text-center mt-20">Loading user info...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-8 py-8 shadow-xl">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-3xl font-bold">
//             <span className="text-white">Welcome </span>
//             <span className="text-teal-300">{user.name}</span>
//           </h1>

//           <p className="text-purple-200 mt-0 text-lg">
//             Website: <span className="text-white font-medium">farebuzzertravel.com</span>, UserId:{" "}
//             <span className="text-teal-300 font-semibold">
//               {user?._id ? user._id.slice(-8).toUpperCase() : "N/A"}
//             </span>
//           </p>

//           <p className="text-purple-300 mt-1 flex items-center justify-center gap-2">
//             <Calendar size={18} />
//             <span>{today}</span>
//           </p>

//           {/* Date Range Search */}
//           <div className="mt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white/10 backdrop-blur-md rounded-xl p-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-purple-200 mb-1">From Date (IST)</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="cursor-pointer w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block text-sm font-medium text-purple-200 mb-1">To Date (IST)</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="cursor-pointer w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
//               />
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={fetchDashboardData}
//                 disabled={loading}
//                 className="cursor-pointer mt-6 bg-teal-500 hover:bg-teal-600 disabled:opacity-70 text-white font-semibold px-10 py-3 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="max-w-7xl mx-auto px-4 -mt-8 pb-12">
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {[1, 2, 3, 4, 5, 6].map(i => (
//               <div key={i} className="h-40 bg-white rounded-2xl animate-pulse shadow-lg" />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Top Row */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-4">
//               <StatCard title="Total Bookings" value={stats.totalBookings ?? 0} icon={PlaneTakeoff} color="blue" />
//               <StatCard title="Revenue" value={`$${stats.revenue ?? 0}`} icon={DollarSign} color="blue" />
//               {/* <StatCard title="Commission" value={stats.commission ?? 0} icon={Receipt} color="orange" /> */}
//               <StatCard title="Commission" value={`$${stats.commission ?? 0}`} icon={Receipt} color="orange" />

//               {/* <StatCard title="MCO" value={stats.mco ?? 0} icon={DollarSign} color="green" /> */}
//               <StatCard title="MCO" value={`$${stats.mco ?? 0}`} icon={DollarSign} color="green" />

//               <StatCard title="LOSS BOOKING" value={stats.authLoss ?? 0} icon={AlertCircle} color="red" />
//             </div>

//             {/* Middle Row */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-4">
//               <StatCard title="FRESH" value={stats.fresh ?? 0} icon={RefreshCw} color="lightblue" />
//               <StatCard title="AIRLINE FOLLOW-UP" value={stats.airlineFollowUp ?? 0} icon={PhoneOutgoing} color="orange" />
//               <StatCard title="SEND TO TICKETING" value={stats.sendToTicketing ?? 0} icon={Ticket} color="lightblue" />
//               <StatCard title="TICKETED & CHARGED" value={stats.ticketedCharged ?? 0} icon={CreditCard} color="lightblue" />
//               <StatCard title="CANCELLED" value={stats.cancelled ?? 0} icon={XCircle} color="lightblue" />
//               <StatCard title="CHARGE BACK" value={stats.chargeBack ?? 0} icon={RefreshCw} color="gray" />
//             </div>

//             {/* Bottom Row */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//               <StatCard title="Today Bookings" value={stats.todayBookings ?? 0} icon={PlaneTakeoff} color="lightblue" />
//               <StatCard title="Total Enquiry" value={stats.totalEnquiry ?? 0} icon={MessageSquare} color="blue" />
//               <StatCard title="Today Enquiry" value={stats.todayEnquiry ?? 0} icon={Clock} color="blue" />
//               {/* <StatCard title="Commission Today" value={stats.commissionToday ?? 0} icon={Receipt} color="orange" /> */}

//               <StatCard title="Commission Today" value={`$${stats.commissionToday ?? 0}`} icon={Receipt} color="orange" />
//               <StatCard title="Discount Today" value={stats.discountToday ?? 0} icon={Percent} color="green" />
//               <StatCard title="Users Available" value={stats.usersAvailable ?? 0} icon={UserCheck} color="gray" />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//===========================19 dec========================================================

//================WITH IST=========

import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import {
  PlaneTakeoff, DollarSign, Receipt, AlertCircle,
  Calendar, PhoneOutgoing, Ticket, CreditCard, XCircle,
  RefreshCw, MessageSquare, Clock, Percent, UserCheck
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
      return new Date(Date.UTC(year, month - 1, day - 1, 18, 30, 0, 0)); // 00:00 IST = 18:30 previous day UTC
    } else {
      // End of IST day: 23:59:59.999 IST → subtract 5:30
      return new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999)); // 23:59:59.999 IST = 18:29:59.999 UTC same day
    }
  };

  // const fetchDashboardData = async () => {
  //   try {
  //     setLoading(true);
  //     const params = {};

  //     if (fromDate) {
  //       params.from = convertISTDateToUTC(fromDate).toISOString();
  //     }
  //     if (toDate) {
  //       params.to = convertISTDateToUTC(toDate, true).toISOString();
  //     }

  //     const res = await API.get("/dashboard", { params });
  //     setStats(res.data);
  //   } catch (err) {
  //     console.error("Failed to load dashboard data", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-8 py-8 shadow-xl">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-white">Welcome </span>
            <span className="text-teal-300">{user.name}</span>
          </h1>

          <p className="text-purple-200 mt-0 text-lg">
            Website: <span className="text-white font-medium">farebuzzertravel.com</span>, UserId:{" "}
            <span className="text-teal-300 font-semibold">
              {user?._id ? user._id.slice(-8).toUpperCase() : "N/A"}
            </span>
          </p>

          <p className="text-purple-300 mt-1 flex items-center justify-center gap-2">
            <Calendar size={18} />
            <span>{today}</span>
          </p>

          {/* Date Range Search */}
          <div className="mt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white/10 backdrop-blur-md rounded-xl p-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-1">From Date (IST)</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="cursor-pointer w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-1">To Date (IST)</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="cursor-pointer w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="cursor-pointer mt-6 bg-teal-500 hover:bg-teal-600 disabled:opacity-70 text-white font-semibold px-10 py-3 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 pb-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-40 bg-white rounded-2xl animate-pulse shadow-lg" />
            ))}
          </div>
        ) : (
          <>
            {/* Top Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-4">
              <StatCard title="Total Bookings" value={stats.totalBookings ?? 0} icon={PlaneTakeoff} color="blue" />
              {/* <StatCard title="Revenue" value={`$${stats.revenue ?? 0}`} icon={DollarSign} color="blue" /> */}
              <StatCard title="Amount" value={`$${stats.revenue ?? 0}`} icon={DollarSign} color="blue" />

              {/* <StatCard title="Commission" value={stats.commission ?? 0} icon={Receipt} color="orange" /> */}
              {/* <StatCard title="Commission" value={`$${stats.commission ?? 0}`} icon={Receipt} color="orange" /> */}
              <StatCard title="Amendment" value={`$${stats.commission ?? 0}`} icon={Receipt} color="orange" />


              {/* <StatCard title="MCO" value={stats.mco ?? 0} icon={DollarSign} color="green" /> */}
             {/* <StatCard title="MCO" value={`$${stats.mco ?? 0}`} icon={DollarSign} color="green" /> */}

<StatCard
  title="MCO / PROFIT"
  value={`$${(
    stats.mco ??
    stats.totalProfit ??
    stats.profit ??
    0
  ).toLocaleString("en-IN")}`}
  icon={DollarSign}
  color="green"
/>

              <StatCard title="LOSS BOOKING" value={stats.authLoss ?? 0} icon={AlertCircle} color="red" />
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-4">
              <StatCard title="FRESH" value={stats.fresh ?? 0} icon={RefreshCw} color="lightblue" />
              <StatCard title="AIRLINE FOLLOW-UP" value={stats.airlineFollowUp ?? 0} icon={PhoneOutgoing} color="orange" />
              <StatCard title="SEND TO TICKETING" value={stats.sendToTicketing ?? 0} icon={Ticket} color="lightblue" />
              <StatCard title="TICKETED & CHARGED" value={stats.ticketedCharged ?? 0} icon={CreditCard} color="lightblue" />
              <StatCard title="CANCELLED" value={stats.cancelled ?? 0} icon={XCircle} color="lightblue" />
              <StatCard title="CHARGE BACK" value={stats.chargeBack ?? 0} icon={RefreshCw} color="gray" />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard title="Today Bookings" value={stats.todayBookings ?? 0} icon={PlaneTakeoff} color="lightblue" />
              <StatCard title="Total Enquiry" value={stats.totalEnquiry ?? 0} icon={MessageSquare} color="blue" />
              <StatCard title="Today Enquiry" value={stats.todayEnquiry ?? 0} icon={Clock} color="blue" />
              {/* <StatCard title="Commission Today" value={stats.commissionToday ?? 0} icon={Receipt} color="orange" /> */}

              {/* <StatCard title="Commission Today" value={`$${stats.commissionToday ?? 0}`} icon={Receipt} color="orange" /> */}
              <StatCard title="Amendment Today" value={`$${stats.commissionToday ?? 0}`} icon={Receipt} color="orange" />

              <StatCard title="Discount Today" value={stats.discountToday ?? 0} icon={Percent} color="green" />
              <StatCard title="Users Available" value={stats.usersAvailable ?? 0} icon={UserCheck} color="gray" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

