

// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import StatCard from "../components/StatCard";
// import {
//   BarChart as BarIcon,
//   IndianRupee,
//   TrendingUp,
//   Calendar,
//   Plane,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const Reports = () => {
//   const [reportData, setReportData] = useState({
//     totalRevenue: 0,
//     totalBookings: 0,
//     totalCommission: 0,
//     monthlyRevenue: [],
//     airlineDistribution: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const [salesRes, monthlyRes] = await Promise.all([
//           API.get("/reports/sales"),
//           API.get("/reports/monthly-revenue"),
//         ]);

//         setReportData({
//           totalRevenue: salesRes.data.totalRevenue,
//           totalBookings: salesRes.data.totalBookings,
//           totalCommission: salesRes.data.totalCommission,
//           monthlyRevenue: monthlyRes.data.map((m) => ({
//             month: new Date(0, m._id - 1).toLocaleString("default", {
//               month: "short",
//             }),
//             revenue: m.revenue,
//           })),
//           // Keep mock airline data for now
//           airlineDistribution: [
//             { name: "IndiGo", value: 128, color: "#0ea5e9" },
//             { name: "Air India", value: 82, color: "#dc2626" },
//             { name: "SpiceJet", value: 56, color: "#f97316" },
//             { name: "Vistara", value: 48, color: "#7c3aed" },
//             { name: "GoFirst", value: 28, color: "#10b981" },
//           ],
//         });
//       } catch (err) {
//         console.error("Failed to fetch reports:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   const profit = reportData.totalRevenue - reportData.totalCommission;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Page Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-3">
//             <div className="p-3 bg-teal-600 rounded-xl shadow-lg">
//               <BarIcon size={32} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 Reports & Analytics
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Insightful data to grow your travel business
//               </p>
//             </div>
//           </div>
//           <p className="text-gray-500 flex items-center gap-2">
//             <Calendar size={16} />
//             Year-to-Date Report • {new Date().getFullYear()}
//           </p>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="h-40 bg-white rounded-2xl shadow animate-pulse"
//               />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Summary Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//               <StatCard
//                 title="Total Revenue"
//                 value={`₹${Number(reportData.totalRevenue).toLocaleString(
//                   "en-IN"
//                 )}`}
//                 change="+18.4%"
//                 icon={IndianRupee}
//                 color="teal"
//               />
//               <StatCard
//                 title="Total Bookings"
//                 value={reportData.totalBookings}
//                 change="+12.1%"
//                 icon={Plane}
//                 color="indigo"
//               />
//               <StatCard
//                 title="Commission Earned"
//                 value={`₹${Number(reportData.totalCommission).toLocaleString(
//                   "en-IN"
//                 )}`}
//                 change="+22.7%"
//                 icon={TrendingUp}
//                 color="emerald"
//               />
//               <StatCard
//                 title="Net Profit"
//                 value={`₹${Number(profit).toLocaleString("en-IN")}`}
//                 change="+15.6%"
//                 icon={IndianRupee}
//                 color="purple"
//               />
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Monthly Revenue Trend */}
//               <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                   Monthly Revenue Trend
//                 </h2>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <BarChart data={reportData.monthlyRevenue}>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#e5e7eb"
//                     />
//                     <XAxis dataKey="month" />
//                     <YAxis
//                       tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//                     />
//                     <Tooltip
//                       formatter={(value) =>
//                         `₹${Number(value).toLocaleString("en-IN")}`
//                       }
//                       contentStyle={{
//                         backgroundColor: "#fff",
//                         borderRadius: "12px",
//                         border: "none",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       }}
//                     />
//                     <Bar
//                       dataKey="revenue"
//                       fill="#14b8a6"
//                       radius={[8, 8, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Airline Distribution */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                   Top Airlines
//                 </h2>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <PieChart>
//                     <Pie
//                       data={reportData.airlineDistribution}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {reportData.airlineDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend
//                       verticalAlign="bottom"
//                       height={36}
//                       formatter={(value) => (
//                         <span className="text-sm">{value}</span>
//                       )}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Footer Note */}
//             <div className="mt-12 text-center text-sm text-gray-600">
//               <p>Keep tracking performance and making smarter business decisions ✈️</p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reports;

//===================20 jan===============

// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import StatCard from "../components/StatCard";
// import {
//   BarChart as BarIcon,
//   IndianRupee,
//   TrendingUp,
//   Calendar,
//   Plane,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Reports = () => {
//   const [reportData, setReportData] = useState({
//     totalBookings: 0,
//     totalAmount: 0,        // revenue
//     amendmentBenefit: 0,   // commission
//     netProfit: 0,          // mco
//     monthlyAmount: [],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const [salesRes, monthlyRes] = await Promise.all([
//           API.get("/reports/sales"),
//           API.get("/reports/monthly-revenue"),
//         ]);

//         setReportData({
//           totalBookings: Number(salesRes.data?.totalBookings) || 0,
//           totalAmount: Number(salesRes.data?.revenue) || 0,
//           amendmentBenefit: Number(salesRes.data?.commission) || 0,
//           netProfit: Number(salesRes.data?.mco) || 0,

//           monthlyAmount: (monthlyRes.data || []).map((m) => ({
//             month: new Date(0, m._id - 1).toLocaleString("default", {
//               month: "short",
//             }),
//             amount: Number(m.amount) || 0,
//           })),
//         });
//       } catch (error) {
//         console.error("Failed to load reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-3">
//             <div className="p-3 bg-teal-600 rounded-xl shadow-lg">
//               <BarIcon size={32} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 Reports & Analytics
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Business performance overview
//               </p>
//             </div>
//           </div>
//           <p className="text-gray-500 flex items-center gap-2">
//             <Calendar size={16} />
//             Year-to-Date • {new Date().getFullYear()}
//           </p>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="h-40 bg-white rounded-2xl shadow animate-pulse"
//               />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//               <StatCard
//                 title="Total Amount"
//                 value={`₹${reportData.totalAmount.toLocaleString("en-IN")}`}
//                 icon={IndianRupee}
//                 color="teal"
//               />
//               <StatCard
//                 title="Total Bookings"
//                 value={reportData.totalBookings}
//                 icon={Plane}
//                 color="indigo"
//               />
//               <StatCard
//                 title="Amendment Benefit"
//                 value={`₹${reportData.amendmentBenefit.toLocaleString("en-IN")}`}
//                 icon={TrendingUp}
//                 color="emerald"
//               />
//               <StatCard
//                 title="Net Profit / MCO"
//                 value={`₹${reportData.netProfit.toLocaleString("en-IN")}`}
//                 icon={IndianRupee}
//                 color="purple"
//               />
//             </div>

//             {/* Chart */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                   Monthly Amount Trend
//                 </h2>

//                 <ResponsiveContainer width="100%" height={350}>
//                   <BarChart data={reportData.monthlyAmount}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis
//                       tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
//                     />
//                     <Tooltip
//                       formatter={(v) =>
//                         `₹${Number(v).toLocaleString("en-IN")}`
//                       }
//                     />
//                     <Bar
//                       dataKey="amount"
//                       fill="#14b8a6"
//                       radius={[8, 8, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-gray-400">
//                 Airline distribution coming soon
//               </div>
//             </div>

//             <div className="mt-12 text-center text-sm text-gray-600">
//               Accurate data. Better decisions ✈️
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reports;


//===================FULL CORRECT======================


// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import StatCard from "../components/StatCard";
// import {
//   BarChart as BarIcon,
//   IndianRupee,
//   TrendingUp,
//   Calendar,
//   Plane,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//     PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const Reports = () => {
//   const [loading, setLoading] = useState(true);

//   const [airlineData, setAirlineData] = useState([]);
//   const [monthlyAmount, setMonthlyAmount] = useState([]);

//   const [totals, setTotals] = useState({
//     totalBookings: 0,
//     totalAmount: 0,
//     amendmentBenefit: 0,
//     netProfit: 0,
//   });

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         // 🔥 Fetch ALL bookings (same as booking page)
//         const bookingsRes = await API.get("/bookings?limit=10000");
//         const bookings = bookingsRes.data?.data || [];

//         // ===============================
//         // AIRLINE-WISE AGGREGATION
//         // ===============================
//         const airlineMap = {};

//         bookings.forEach((b) => {
//           const airline = b.airline || "Unknown";

//           if (!airlineMap[airline]) {
//             airlineMap[airline] = {
//               airline,
//               bookings: 0,
//               amount: 0,
//               amendment: 0,
//               mco: 0,
//             };
//           }

//           airlineMap[airline].bookings += 1;
//           airlineMap[airline].amount += Number(b.sellingPrice) || 0;

//           if (b.status === "AMENDMENT") {
//             airlineMap[airline].amendment += Number(b.profit) || 0;
//           }

//           if (b.status === "VOID") {
//             airlineMap[airline].mco += Number(b.profit) || 0;
//           }
//         });

//         const airlineArray = Object.values(airlineMap);
//         setAirlineData(airlineArray);

//         // ===============================
//         // TOP CARD TOTALS (FROM AIRLINES)
//         // ===============================
//         const totalBookings = airlineArray.reduce(
//           (s, a) => s + a.bookings,
//           0
//         );
//         const totalAmount = airlineArray.reduce(
//           (s, a) => s + a.amount,
//           0
//         );
//         const amendmentBenefit = airlineArray.reduce(
//           (s, a) => s + a.amendment,
//           0
//         );
//         const netProfit = airlineArray.reduce(
//           (s, a) => s + a.mco,
//           0
//         );

//         setTotals({
//           totalBookings,
//           totalAmount,
//           amendmentBenefit,
//           netProfit,
//         });

//         // ===============================
//         // MONTHLY AMOUNT TREND
//         // ===============================
//         const monthMap = {};

//         bookings.forEach((b) => {
//           const date = new Date(b.createdAt);
//           const key = `${date.getFullYear()}-${date.getMonth()}`;

//           if (!monthMap[key]) {
//             monthMap[key] = {
//               month: date.toLocaleString("default", { month: "short" }),
//               amount: 0,
//             };
//           }

//           monthMap[key].amount += Number(b.sellingPrice) || 0;
//         });

//         setMonthlyAmount(Object.values(monthMap));
//       } catch (err) {
//         console.error("Report fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);
// const COLORS = ["#14b8a6", "#3b82f6", "#facc15", "#f87171", "#a78bfa"];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-3">
//             <div className="p-3 bg-teal-600 rounded-xl shadow-lg">
//               <BarIcon size={32} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 Reports & Analytics
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Airline & revenue performance overview
//               </p>
//             </div>
//           </div>
//           <p className="text-gray-500 flex items-center gap-2">
//             <Calendar size={16} />
//             Year-to-Date • {new Date().getFullYear()}
//           </p>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-40 bg-white rounded-xl shadow animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* TOP CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//               <StatCard
//                 title="Total Amount"
//                 value={`₹${totals.totalAmount.toLocaleString("en-IN")}`}
//                 icon={IndianRupee}
//                 color="teal"
//               />
//               <StatCard
//                 title="Total Bookings"
//                 value={totals.totalBookings}
//                 icon={Plane}
//                 color="indigo"
//               />
//               <StatCard
//                 title="Amendment Benefit"
//                 value={`₹${totals.amendmentBenefit.toLocaleString("en-IN")}`}
//                 icon={TrendingUp}
//                 color="emerald"
//               />
//               <StatCard
//                 title="Net Profit / MCO"
//                 value={`₹${totals.netProfit.toLocaleString("en-IN")}`}
//                 icon={IndianRupee}
//                 color="purple"
//               />
//             </div>

//             {/* MONTHLY CHART */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
//               <h2 className="text-xl font-semibold mb-6">
//                 Monthly Amount Trend
//               </h2>

//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={monthlyAmount}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
//                   <Tooltip
//                     formatter={(v) =>
//                       `₹${Number(v).toLocaleString("en-IN")}`
//                     }
//                   />
//                   <Bar dataKey="amount" fill="#14b8a6" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* AIRLINE TABLE */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">
//                 Airline-wise Performance
//               </h2>

//               <table className="w-full text-sm">
//                 <thead className="border-b">
//                   <tr className="text-left text-gray-600">
//                     <th>Airline</th>
//                     <th>Bookings</th>
//                     <th>Amount</th>
//                     <th>Amendment</th>
//                     <th>MCO</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {airlineData.map((a, i) => (
//                     <tr key={i} className="border-b last:border-none">
//                       <td className="py-2">{a.airline}</td>
//                       <td>{a.bookings}</td>
//                       <td>₹{a.amount.toLocaleString("en-IN")}</td>
//                       <td>₹{a.amendment.toLocaleString("en-IN")}</td>
//                       <td>₹{a.mco.toLocaleString("en-IN")}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
//   <h2 className="text-xl font-semibold mb-6">
//     Airline-wise Bookings
//   </h2>

//   <ResponsiveContainer width="100%" height={300}>
//     <PieChart>
//       <Pie
//         data={airlineData}
//         dataKey="bookings"
//         nameKey="airline"
//         cx="50%"
//         cy="50%"
//         outerRadius={100}
//         fill="#14b8a6"
//         label={(entry) => `${entry.airline} (${entry.bookings})`}
//       >
//         {airlineData.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip
//         formatter={(value, name) => [`${value} bookings`, name]}
//       />
//       <Legend />
//     </PieChart>
//   </ResponsiveContainer>
// </div>

//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reports;

//===============================STYLISH============
import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import {
  BarChart as BarIcon,
  IndianRupee,
  TrendingUp,
  Calendar,
  Plane,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [airlineData, setAirlineData] = useState([]);
  const [monthlyAmount, setMonthlyAmount] = useState([]);
  const [totals, setTotals] = useState({
    totalBookings: 0,
    totalAmount: 0,
    amendmentBenefit: 0,
    netProfit: 0,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const bookingsRes = await API.get("/bookings?limit=10000");
        const bookings = bookingsRes.data?.data || [];

        // Airline aggregation
        const airlineMap = {};
        bookings.forEach((b) => {
          const airline = b.airline || "Unknown";
          if (!airlineMap[airline]) {
            airlineMap[airline] = { airline, bookings: 0, amount: 0, amendment: 0, mco: 0 };
          }
          airlineMap[airline].bookings += 1;
          airlineMap[airline].amount += Number(b.sellingPrice) || 0;
          if (b.status === "AMENDMENT") airlineMap[airline].amendment += Number(b.profit) || 0;
          if (b.status === "VOID") airlineMap[airline].mco += Number(b.profit) || 0;
        });

        const airlineArray = Object.values(airlineMap);
        setAirlineData(airlineArray);

        // Totals
        setTotals({
          totalBookings: airlineArray.reduce((sum, a) => sum + a.bookings, 0),
          totalAmount: airlineArray.reduce((sum, a) => sum + a.amount, 0),
          amendmentBenefit: airlineArray.reduce((sum, a) => sum + a.amendment, 0),
          netProfit: airlineArray.reduce((sum, a) => sum + a.mco, 0),
        });

        // Monthly trend
        const monthMap = {};
        bookings.forEach((b) => {
          const date = new Date(b.createdAt);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          if (!monthMap[key]) {
            monthMap[key] = {
              month: date.toLocaleString("default", { month: "short", year: "numeric" }),
              amount: 0,
            };
          }
          monthMap[key].amount += Number(b.sellingPrice) || 0;
        });

        // Sort months chronologically
        const sortedMonths = Object.values(monthMap).sort((a, b) => {
          const [ma, ya] = a.month.split(" ");
          const [mb, yb] = b.month.split(" ");
          return new Date(`${ma} 1, ${ya}`) - new Date(`${mb} 1, ${yb}`);
        });

        setMonthlyAmount(sortedMonths);
      } catch (err) {
        console.error("Report fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl shadow-md">
                <BarIcon size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Reports & Analytics
                </h1>
                <p className="text-gray-600 mt-1 font-medium">
                  Airline performance • Revenue insights
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm text-sm text-gray-600 border border-gray-200">
                <Calendar size={16} />
                <span>Year-to-Date {new Date().getFullYear()}</span>
              </span>
              {/* Optional: export button */}
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-36 bg-white rounded-2xl shadow animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard
                title="Total Revenue"
                value={`$${totals.totalAmount.toLocaleString("en-IN")}`}
                icon={IndianRupee}
                trend="up"
                color="teal"
              />
              <StatCard
                title="Total Bookings"
                value={totals.totalBookings.toLocaleString("en-IN")}
                icon={Plane}
                color="blue"
              />
              <StatCard
                title="Amendment Benefit"
                value={`$${totals.amendmentBenefit.toLocaleString("en-IN")}`}
                icon={TrendingUp}
                color="emerald"
              />
              <StatCard
                title="Net Profit (MCO)"
                value={`$${totals.netProfit.toLocaleString("en-IN")}`}
                icon={IndianRupee}
                color="violet"
              />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Monthly Trend */}
              <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Monthly Revenue Trend
                  </h2>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={monthlyAmount}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tick={{ fill: "#6b7280" }} />
                      <YAxis
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        axisLine={false}
                        tick={{ fill: "#6b7280" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        formatter={(v) => [`$${Number(v).toLocaleString("en-IN")}`, "Revenue"]}
                      />
                      <Bar
                        dataKey="amount"
                        fill="#0ea5e9"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={60}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Airline Bookings Pie */}
              <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Bookings by Airline
                  </h2>
                </div>
                <div className="p-6 flex justify-center">
                  <ResponsiveContainer width="100%" height={340}>
                    <PieChart>
                      <Pie
                        data={airlineData}
                        dataKey="bookings"
                        nameKey="airline"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={2}
                        label={({ airline, bookings }) => `${airline} (${bookings})`}
                        labelLine={false}
                      >
                        {airlineData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} bookings`, name]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Airline Performance Table */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Airline-wise Performance Summary
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Airline
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        Bookings
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        Revenue
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        Amendment Benefit
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        Net Profit (MCO)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {airlineData.map((airline, idx) => (
                      <tr
                        key={airline.airline}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {airline.airline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                          {airline.bookings.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                          ${airline.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600 font-medium">
                          ${airline.amendment.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-violet-600 font-medium">
                          ${airline.mco.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;