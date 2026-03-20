

//===================with CP,Expense ammount also=========

import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import {
  Plane,
  User,
  Ticket,
  Calendar,
  Trash2,
  Filter,
  X,
  DollarSign,
  Edit2,
  Save,
  XCircle,
  TrendingUp,
  Package,
  CreditCard
} from "lucide-react";

const statusConfig = {
  FRESH: "bg-blue-100 text-blue-700",
  FOLLOW_UP: "bg-yellow-100 text-yellow-700",
  TICKETING: "bg-purple-100 text-purple-700",
  SEND_TO_TICKETING: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  CHARGEBACK: "bg-gray-200 text-gray-800",
  REFUND: "bg-red-100 text-red-700",       // Loss → red
  VOID: "bg-green-100 text-green-700",     // Benefit → green
  AMENDMENT: "bg-green-100 text-green-700" // Benefit → green
};

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "FRESH", label: "FRESH" },
  { value: "FOLLOW_UP", label: "FOLLOW_UP" },
  { value: "TICKETING", label: "TICKETING" },
  { value: "SEND_TO_TICKETING", label: "SEND_TO_TICKETING" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "CHARGEBACK", label: "CHARGEBACK" },
  { value: "REFUND", label: "REFUND" },
  { value: "VOID", label: "VOID" },
  { value: "AMENDMENT", label: "AMENDMENT" },
];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Search states
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchPnr, setSearchPnr] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Refs to preserve input focus
  const customerInputRef = useRef(null);
  const pnrInputRef = useRef(null);

  const fetchBookings = async (resetPage = true) => {
    try {
      setLoading(true);
      const currentPage = resetPage ? 1 : page;

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (searchCustomer.trim()) params.customerName = searchCustomer.trim();
      if (searchPnr.trim()) params.pnr = searchPnr.trim();
      if (searchStatus) params.status = searchStatus;

      if (searchDate) {
        const [year, month, day] = searchDate.split("-").map(Number);
        const from = new Date(Date.UTC(year, month - 1, day - 1, 18, 30, 0, 0));
        const to = new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999));
        params.from = from.toISOString();
        params.to = to.toISOString();
      }

      const res = await API.get("/bookings", { params });

      setBookings(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      if (resetPage) setPage(1);
      else setPage(res.data.pagination?.page || 1);
    } catch (err) {
      setBookings([]);
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBookings(false);
  }, []);

  // Debounced search - triggers after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchCustomer, searchPnr, searchDate, searchStatus]);

  // Page change
  useEffect(() => {
    if (page > 1) {
      fetchBookings(false);
    }
  }, [page]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      fetchBookings(false);
    } catch (err) {
      console.error("Status update failed");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings(false);
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const resetFilters = () => {
    setSearchCustomer("");
    setSearchPnr("");
    setSearchDate("");
    setSearchStatus("");
    customerInputRef.current?.focus();
  };

  const hasActiveFilters =
    searchCustomer || searchPnr || searchDate || searchStatus;

  const formatDateInIST = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    return new Date(date.getTime() + istOffsetMs).toLocaleDateString("en-IN");
  };

  // Start editing cost price and expenses
  const startEditing = (booking) => {
    setEditingId(booking._id);
    setEditData({
      costPrice: booking.costPrice || 0,
      otherExpense: booking.otherExpense || 0,
      sellingPrice: booking.sellingPrice || 0,
      cbFees: booking.cbFees || 0
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  // Save cost price and expenses
  const saveFinancialData = async (id) => {
    try {
      await API.put(`/bookings/${id}/financial`, editData);
      setEditingId(null);
      setEditData({});
      fetchBookings(false);
    } catch (err) {
      console.error("Failed to save financial data");
    }
  };

  // Calculate profit
  const calculateProfit = (booking) => {
    if (booking.status === "REFUND") {
      return -(
        (Number(booking.sellingPrice || 0) - 
        Number(booking.costPrice || 0) - 
        Number(booking.otherExpense || 0) - 
        Number(booking.cbFees || 0))
      );
    }
    return (
      Number(booking.sellingPrice || 0) - 
      Number(booking.costPrice || 0) - 
      Number(booking.otherExpense || 0) - 
      Number(booking.cbFees || 0)
    );
  };

  // Calculate total statistics
  const calculateTotals = () => {
    return bookings.reduce((totals, booking) => {
      const profit = calculateProfit(booking);
      return {
        totalSellingPrice: totals.totalSellingPrice + (Number(booking.sellingPrice) || 0),
        totalCostPrice: totals.totalCostPrice + (Number(booking.costPrice) || 0),
        totalExpenses: totals.totalExpenses + (Number(booking.otherExpense) || 0) + (Number(booking.cbFees) || 0),
        totalProfit: totals.totalProfit + profit,
        totalBookings: totals.totalBookings + 1
      };
    }, {
      totalSellingPrice: 0,
      totalCostPrice: 0,
      totalExpenses: 0,
      totalProfit: 0,
      totalBookings: 0
    });
  };

  const totals = calculateTotals();

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex gap-3 items-center text-teal-700">
        <Plane size={36} />
        Flight Bookings
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="text-emerald-600" size={20} />
                <span className="text-sm font-medium text-gray-600">Total Profit</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700">
                ${totals.totalProfit.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Bookings</div>
              <div className="text-sm font-medium text-gray-700">{totals.totalBookings}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="text-teal-600" size={20} />
                <span className="text-sm font-medium text-gray-600">Total Revenue</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${totals.totalSellingPrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Package className="text-amber-600" size={20} />
                <span className="text-sm font-medium text-gray-600">Total Cost</span>
              </div>
              <div className="text-2xl font-bold text-amber-700">
                ${totals.totalCostPrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="text-rose-600" size={20} />
                <span className="text-sm font-medium text-gray-600">Total Expenses</span>
              </div>
              <div className="text-2xl font-bold text-rose-700">
                ${totals.totalExpenses.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-teal-600" />
          <h2 className="text-lg font-semibold text-gray-800">Search & Filter</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                ref={customerInputRef}
                type="text"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
                placeholder="Enter name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PNR
            </label>
            <div className="relative">
              <Ticket size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                ref={pnrInputRef}
                type="text"
                value={searchPnr}
                onChange={(e) => setSearchPnr(e.target.value.toUpperCase())}
                placeholder="Enter PNR..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date (IST)
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="cursor-pointer w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="cursor-pointer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={resetFilters}
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition font-medium"
            >
              <X size={18} />
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Table with loading overlay */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-600 border-t-transparent mb-3"></div>
              <p className="text-gray-600 font-medium">Loading bookings...</p>
            </div>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <Ticket size={80} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">
              {hasActiveFilters
                ? "No bookings found for your search."
                : "No bookings available yet."}
            </p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Customer</th>
                  <th className="px-6 py-4 text-center">PNR</th>
                  <th className="px-6 py-4 text-center">Airline</th>
                  <th className="px-6 py-4 text-center">Selling Price</th>
                  <th className="px-6 py-4 text-center">Cost Price</th>
                  <th className="px-6 py-4 text-center">Other Expenses</th>
                  <th className="px-6 py-4 text-center">CB Fees</th>
                  <th className="px-6 py-4 text-center">MCO / Profit</th>
                  <th className="px-6 py-4 text-center">Date (IST)</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <User size={20} className="text-gray-500" />
                        <span className="font-medium text-gray-800">{b.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-700 uppercase">
                      {b.pnr || "-"}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {b.airline || "-"}
                    </td>

                    {/* Selling Price */}
                    <td className="px-6 py-4 text-center">
                      {editingId === b._id ? (
                        <div className="flex items-center justify-center gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <input
                            type="number"
                            value={editData.sellingPrice}
                            onChange={(e) => setEditData({
                              ...editData,
                              sellingPrice: e.target.value
                            })}
                            className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 font-medium text-gray-800">
                          <DollarSign size={16} className="text-emerald-600" />
                          {Number(b.sellingPrice || 0).toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>

                    {/* Cost Price */}
                    <td className="px-6 py-4 text-center">
                      {editingId === b._id ? (
                        <div className="flex items-center justify-center gap-1">
                          <Package size={14} className="text-gray-400" />
                          <input
                            type="number"
                            value={editData.costPrice}
                            onChange={(e) => setEditData({
                              ...editData,
                              costPrice: e.target.value
                            })}
                            className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 font-medium text-amber-600">
                          <Package size={16} />
                          ${Number(b.costPrice || 0).toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>

                    {/* Other Expenses */}
                    <td className="px-6 py-4 text-center">
                      {editingId === b._id ? (
                        <div className="flex items-center justify-center gap-1">
                          <CreditCard size={14} className="text-gray-400" />
                          <input
                            type="number"
                            value={editData.otherExpense}
                            onChange={(e) => setEditData({
                              ...editData,
                              otherExpense: e.target.value
                            })}
                            className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 font-medium text-rose-600">
                          <CreditCard size={16} />
                          ${Number(b.otherExpense || 0).toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>

                    {/* CB Fees */}
                    <td className="px-6 py-4 text-center">
                      {editingId === b._id ? (
                        <div className="flex items-center justify-center gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <input
                            type="number"
                            value={editData.cbFees}
                            onChange={(e) => setEditData({
                              ...editData,
                              cbFees: e.target.value
                            })}
                            className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 font-medium text-rose-600">
                          <DollarSign size={16} />
                          {Number(b.cbFees || 0).toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>

                    {/* MCO / Profit */}
                    <td className="px-6 py-4 text-center">
                      <div className={`flex items-center justify-center gap-1 font-bold ${calculateProfit(b) >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        <DollarSign size={16} />
                        {calculateProfit(b).toLocaleString("en-IN")}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-center text-sm">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        {formatDateInIST(b.createdAt)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border cursor-pointer transition ${statusConfig[b.status]}`}
                      >
                        {Object.keys(statusConfig).map((s) => (
                          <option key={s} value={s}>
                            {s.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {editingId === b._id ? (
                          <>
                            <button
                              onClick={() => saveFinancialData(b._id)}
                              className="cursor-pointer p-2 rounded-lg hover:bg-emerald-100 text-emerald-600 transition"
                              title="Save changes"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="cursor-pointer p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                              title="Cancel editing"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(b)}
                              className="cursor-pointer p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                              title="Edit financial data"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteBooking(b._id)}
                              className="cursor-pointer p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                              title="Delete booking"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 py-6 bg-gray-50">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <span className="text-lg font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                  className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
