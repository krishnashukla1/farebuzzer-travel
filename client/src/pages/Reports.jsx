

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
import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import {
  BarChart as BarIcon,
  IndianRupee,
  TrendingUp,
  Calendar,
  Plane,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [reportData, setReportData] = useState({
    totalBookings: 0,
    totalAmount: 0,
    amendmentBenefit: 0,
    netProfit: 0,
    monthlyAmount: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [salesRes, monthlyRes] = await Promise.all([
          API.get("/reports/sales"),
          API.get("/reports/monthly-revenue"),
        ]);

        // setReportData({
        //   totalBookings: salesRes.data?.totalBookings || 0,
        //   totalAmount: salesRes.data?.totalAmount || 0,
        //   amendmentBenefit: salesRes.data?.amendmentBenefit || 0,
        //   netProfit: salesRes.data?.netProfit || 0,

        //   monthlyAmount: (monthlyRes.data || []).map((m) => ({
        //     month: new Date(0, m._id - 1).toLocaleString("default", {
        //       month: "short",
        //     }),
        //     amount: m.amount || 0,
        //   })),
        // });
     
     
     setReportData({
  totalBookings: salesRes.data.totalBookings || 0,
  totalAmount: salesRes.data.totalAmount || 0,
  totalAmendment: salesRes.data.amendmentBenefit || 0,
  totalMCO: salesRes.data.totalMCO || 0,
  monthlyAmount: monthlyRes.data.map((m) => ({
    month: new Date(2026, m._id - 1).toLocaleString("default", {
      month: "short",
    }),
    amount: m.amount || 0,
  })),
});

      } catch (error) {
        console.error("Failed to load reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-teal-600 rounded-xl shadow-lg">
              <BarIcon size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Reports & Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Business performance overview
              </p>
            </div>
          </div>
          <p className="text-gray-500 flex items-center gap-2">
            <Calendar size={16} />
            Year-to-Date • {new Date().getFullYear()}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-white rounded-2xl shadow animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard
                title="Total Amount"
                value={`₹${Number(reportData.totalAmount).toLocaleString("en-IN")}`}
                icon={IndianRupee}
                color="teal"
              />
              <StatCard
                title="Total Bookings"
                value={reportData.totalBookings}
                icon={Plane}
                color="indigo"
              />
              <StatCard
                title="Amendment Benefit"
                value={`₹${Number(reportData.amendmentBenefit).toLocaleString(
                  "en-IN"
                )}`}
                icon={TrendingUp}
                color="emerald"
              />
              <StatCard
                title="Net Profit / MCO"
                value={`₹${Number(reportData.netProfit).toLocaleString("en-IN")}`}
                icon={IndianRupee}
                color="purple"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Monthly Amount Trend
                </h2>

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={reportData.monthlyAmount}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(v) =>
                        `₹${Number(v).toLocaleString("en-IN")}`
                      }
                    />
                    <Bar
                      dataKey="amount"
                      fill="#14b8a6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-gray-400">
                Airline distribution coming soon
              </div>
            </div>

            <div className="mt-12 text-center text-sm text-gray-600">
              Accurate data. Better decisions ✈️
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
