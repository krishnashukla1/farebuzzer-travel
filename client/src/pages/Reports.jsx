

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
  DollarSign,
  Package,
  CreditCard,
  PieChart as PieIcon,
  BarChart3,
  TrendingDown
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
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

const COLORS = [
  "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", 
  "#ec4899", "#84cc16", "#f97316", "#6366f1", "#14b8a6"
];

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [airlineData, setAirlineData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [totals, setTotals] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalExpenses: 0,
    grossProfit: 0,
    amendmentProfit: 0,
    totalProfit: 0,
    netProfit: 0
  });

  // Helper function to calculate profit for a booking
  const calculateProfit = (booking) => {
    const sellingPrice = Number(booking.sellingPrice) || 0;
    const costPrice = Number(booking.costPrice) || 0;
    const otherExpense = Number(booking.otherExpense) || 0;
    const cbFees = Number(booking.cbFees) || 0;
    
    if (booking.status === "REFUND") {
      // For refunds, profit is negative
      return -(sellingPrice - costPrice - otherExpense - cbFees);
    }
    return sellingPrice - costPrice - otherExpense - cbFees;
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Fetch all bookings
        const bookingsRes = await API.get("/bookings?limit=10000");
        const bookings = bookingsRes.data?.data || [];

        console.log("Total bookings fetched:", bookings.length);

        // Calculate overall totals
        const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.sellingPrice) || 0), 0);
        const totalCost = bookings.reduce((sum, b) => sum + (Number(b.costPrice) || 0), 0);
        const totalExpenses = bookings.reduce((sum, b) => 
          sum + (Number(b.otherExpense) || 0) + (Number(b.cbFees) || 0), 0);
        
        const totalProfit = bookings.reduce((sum, b) => sum + calculateProfit(b), 0);
        const amendmentProfit = bookings.reduce((sum, b) => {
          if (b.status === "AMENDMENT") {
            return sum + calculateProfit(b);
          }
          return sum;
        }, 0);
        const grossProfit = totalRevenue - totalCost;

        setTotals({
          totalBookings: bookings.length,
          totalRevenue,
          totalCost,
          totalExpenses,
          grossProfit,
          amendmentProfit,
          totalProfit,
          netProfit: totalProfit
        });

        console.log("Calculated totals:", {
          totalProfit,
          amendmentProfit,
          grossProfit
        });

        // Airline aggregation with proper profit calculation
        const airlineMap = {};
        bookings.forEach((b) => {
          const airline = b.airline || "Unknown";
          if (!airlineMap[airline]) {
            airlineMap[airline] = {
              airline,
              bookings: 0,
              revenue: 0,
              cost: 0,
              expenses: 0,
              profit: 0,
              amendmentProfit: 0
            };
          }
          
          const profit = calculateProfit(b);
          
          airlineMap[airline].bookings += 1;
          airlineMap[airline].revenue += Number(b.sellingPrice) || 0;
          airlineMap[airline].cost += Number(b.costPrice) || 0;
          airlineMap[airline].expenses += (Number(b.otherExpense) || 0) + (Number(b.cbFees) || 0);
          airlineMap[airline].profit += profit;
          
          if (b.status === "AMENDMENT") {
            airlineMap[airline].amendmentProfit += profit;
          }
        });

        const airlineArray = Object.values(airlineMap).sort((a, b) => b.profit - a.profit);
        setAirlineData(airlineArray);

        // Monthly trend with profit calculation
        const monthMap = {};
        bookings.forEach((b) => {
          const date = new Date(b.createdAt);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          
          if (!monthMap[key]) {
            monthMap[key] = {
              month: date.toLocaleString("default", { month: "short", year: "numeric" }),
              revenue: 0,
              profit: 0,
              bookings: 0,
              cost: 0
            };
          }
          
          monthMap[key].revenue += Number(b.sellingPrice) || 0;
          monthMap[key].profit += calculateProfit(b);
          monthMap[key].bookings += 1;
          monthMap[key].cost += Number(b.costPrice) || 0;
        });

        // Sort months chronologically
        const sortedMonths = Object.values(monthMap).sort((a, b) => {
          const [ma, ya] = a.month.split(" ");
          const [mb, yb] = b.month.split(" ");
          return new Date(`${ma} 1, ${ya}`) - new Date(`${mb} 1, ${yb}`);
        });

        setMonthlyData(sortedMonths);

        // Status-wise profit data
        const statusMap = {};
        bookings.forEach((b) => {
          const status = b.status || "UNKNOWN";
          if (!statusMap[status]) {
            statusMap[status] = {
              status,
              count: 0,
              profit: 0,
              revenue: 0
            };
          }
          statusMap[status].count += 1;
          statusMap[status].profit += calculateProfit(b);
          statusMap[status].revenue += Number(b.sellingPrice) || 0;
        });

        const statusArray = Object.values(statusMap).sort((a, b) => b.count - a.count);
        setStatusData(statusArray);

        // Profit trend data (last 6 months)
        const recentMonths = sortedMonths.slice(-6);
        const profitTrend = recentMonths.map(month => ({
          name: month.month,
          profit: month.profit,
          revenue: month.revenue,
          bookings: month.bookings
        }));
        setProfitData(profitTrend);

      } catch (err) {
        console.error("Report fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const exportToCSV = () => {
    // Create CSV content
    const headers = ["Airline", "Bookings", "Revenue", "Cost", "Expenses", "Profit", "Amendment Profit"];
    const rows = airlineData.map(a => [
      a.airline,
      a.bookings,
      a.revenue,
      a.cost,
      a.expenses,
      a.profit,
      a.amendmentProfit
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `airline-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg">
                <BarIcon size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Financial Reports & Analytics
                </h1>
                <p className="text-gray-600 mt-2 text-lg font-medium">
                  Complete profit analysis • Performance insights • Revenue trends
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm text-gray-700 border border-gray-200 font-medium">
                <Calendar size={18} />
                <span>{new Date().getFullYear()} YTD Report</span>
              </div>
              <button 
                onClick={exportToCSV}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white/80 backdrop-blur-sm rounded-2xl shadow animate-pulse border border-gray-200"
              />
            ))}
          </div>
        ) : (
          <>
            {/* KPI Cards - Top Financial Overview */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-indigo-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={`$${totals.totalRevenue.toLocaleString("en-IN")}`}
                  icon={DollarSign}
                  color="indigo"
                  subtitle="Total Sales"
                  trend={totals.totalRevenue > 0 ? "Revenue" : null}
                />
                <StatCard
                  title="Total Bookings"
                  value={totals.totalBookings.toLocaleString("en-IN")}
                  icon={Plane}
                  color="blue"
                  subtitle="Completed Bookings"
                />
                <StatCard
                  title="Gross Profit"
                  value={`$${totals.grossProfit.toLocaleString("en-IN")}`}
                  icon={TrendingUp}
                  color="teal"
                  subtitle="Revenue - Cost"
                  trend={totals.grossProfit > 0 ? "▲" : "▼"}
                />
                <StatCard
                  title="Total Profit (MCO)"
                  value={`$${totals.totalProfit.toLocaleString("en-IN")}`}
                  icon={DollarSign}
                  color={totals.totalProfit >= 0 ? "green" : "red"}
                  subtitle={totals.totalProfit >= 0 ? "Net Profit ▲" : "Net Loss ▼"}
                  highlight={true}
                />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <StatCard
                  title="Total Cost"
                  value={`$${totals.totalCost.toLocaleString("en-IN")}`}
                  icon={Package}
                  color="orange"
                  subtitle="Cost of Sales"
                />
                <StatCard
                  title="Total Expenses"
                  value={`$${totals.totalExpenses.toLocaleString("en-IN")}`}
                  icon={CreditCard}
                  color="red"
                  subtitle="Operational Costs"
                />
                <StatCard
                  title="Amendment Profit"
                  value={`$${totals.amendmentProfit.toLocaleString("en-IN")}`}
                  icon={TrendingUp}
                  color="purple"
                  subtitle="From Amendments"
                />
                <StatCard
                  title="Avg Profit/Booking"
                  value={`$${totals.totalBookings > 0 ? (totals.totalProfit / totals.totalBookings).toFixed(2) : 0}`}
                  icon={BarChart3}
                  color="blue"
                  subtitle="Per Booking Average"
                />
              </div>
            </section>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Monthly Profit Trend */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Monthly Profit Trend
                    </h2>
                    <TrendingUp className="text-emerald-600" size={22} />
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tick={{ fill: "#6b7280" }}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        axisLine={false}
                        tick={{ fill: "#6b7280" }}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "10px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          padding: "12px"
                        }}
                        formatter={(value) => [`$${Number(value).toLocaleString("en-IN")}`, ""]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#10b981"
                        fill="url(#colorProfit)"
                        strokeWidth={3}
                      />
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-4 text-sm text-gray-600">
                    Total Profit: <span className="font-bold text-emerald-700">
                      ${monthlyData.reduce((sum, m) => sum + m.profit, 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profit by Status */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Profit by Booking Status
                    </h2>
                    <PieIcon className="text-indigo-600" size={22} />
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={statusData.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis 
                        dataKey="status" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        axisLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                      />
                      <YAxis
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        axisLine={false}
                        tick={{ fill: "#6b7280" }}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "10px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          padding: "12px"
                        }}
                        formatter={(value) => [`$${Number(value).toLocaleString("en-IN")}`, "Profit"]}
                        labelFormatter={(label) => `Status: ${label}`}
                      />
                      <Bar
                        dataKey="profit"
                        fill="#8b5cf6"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Airline Performance Table */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-10">
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Airline Performance Analysis
                  </h2>
                  <div className="text-sm text-gray-600">
                    Showing {airlineData.length} airlines
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Airline
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Bookings
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Cost
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Expenses
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Profit %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {airlineData.map((airline, idx) => {
                      const profitPercentage = airline.revenue > 0 
                        ? ((airline.profit / airline.revenue) * 100).toFixed(1) 
                        : 0;
                      
                      return (
                        <tr
                          key={airline.airline}
                          className="hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-3">
                                <span className="text-lg font-bold text-indigo-700">
                                  {airline.airline.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {airline.airline}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {airline.amendmentProfit > 0 ? `$${airline.amendmentProfit.toLocaleString("en-IN")} from amendments` : ''}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                            <span className="font-medium">{airline.bookings.toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className="font-medium text-gray-900">
                              ${airline.revenue.toLocaleString("en-IN")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className="font-medium text-amber-700">
                              ${airline.cost.toLocaleString("en-IN")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className="font-medium text-rose-700">
                              ${airline.expenses.toLocaleString("en-IN")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className={`font-bold ${airline.profit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                              ${airline.profit.toLocaleString("en-IN")}
                              {airline.profit >= 0 ? ' ▲' : ' ▼'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className={`font-bold ${profitPercentage >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                              {profitPercentage}%
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Summary Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Avg. Profit/Airline</div>
                    <div className="text-xl font-bold text-gray-900">
                      ${airlineData.length > 0 ? (airlineData.reduce((sum, a) => sum + a.profit, 0) / airlineData.length).toLocaleString("en-IN", {maximumFractionDigits: 0}) : 0}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Top Airline</div>
                    <div className="text-lg font-bold text-emerald-700">
                      {airlineData.length > 0 ? airlineData[0].airline : 'N/A'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Total Airlines</div>
                    <div className="text-xl font-bold text-indigo-700">
                      {airlineData.length}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Overall Profit Margin</div>
                    <div className="text-xl font-bold text-emerald-700">
                      {totals.totalRevenue > 0 ? ((totals.totalProfit / totals.totalRevenue) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;