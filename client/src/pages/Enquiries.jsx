

//=============date range filter and profit amount====correct=======


// import { useEffect, useState, useMemo } from "react";
// import API from "../api/axios";
// import {
//   MessageSquare,
//   Phone,
//   Mail,
//   User,
//   Calendar,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   Save,
//   DollarSign,
//   TrendingUp,
//   Package,
//   CheckCircle,
//   Filter,
//   TrendingUp as TrendingUpIcon,
//   RefreshCw
// } from "lucide-react";

// const STATUS_CONFIG = {
//   NEW: { 
//     color: "bg-blue-50 text-blue-700 border-blue-200", 
//     label: "New",
//     icon: "🆕"
//   },
//   CONTACTED: { 
//     color: "bg-amber-50 text-amber-700 border-amber-200", 
//     label: "Contacted",
//     icon: "📞"
//   },
//   FOLLOW_UP: { 
//     color: "bg-orange-50 text-orange-700 border-orange-200", 
//     label: "Follow Up",
//     icon: "🔄"
//   },
//   CLOSED: { 
//     color: "bg-emerald-50 text-emerald-700 border-emerald-200", 
//     label: "Closed",
//     icon: "✅"
//   }
// };

// const ITEMS_PER_PAGE = 10;

// const Enquiries = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [filteredEnquiries, setFilteredEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [saleStatus, setSaleStatus] = useState({});
//   const [saleData, setSaleData] = useState({});
//   const [saving, setSaving] = useState({});
  
//   // Date range filter states
//   const [dateRange, setDateRange] = useState({
//     from: "",
//     to: ""
//   });
//   const [showDateFilter, setShowDateFilter] = useState(false);

//   // Fetch enquiries including saved sale data
//   const fetchEnquiries = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/enquiries");
//       const enquiriesData = res.data || [];
//       setEnquiries(enquiriesData);
//       setFilteredEnquiries(enquiriesData);

//       // Initialize saleStatus and saleData from fetched enquiries
//       const initialSaleStatus = {};
//       const initialSaleData = {};
      
//       enquiriesData.forEach(enquiry => {
//         initialSaleStatus[enquiry._id] = enquiry.saleStatus || "NO";
//         initialSaleData[enquiry._id] = {
//           amount: enquiry.saleAmount || 0,
//           costPrice: enquiry.costPrice || 0,
//           sellingPrice: enquiry.sellingPrice || 0,
//           profit: enquiry.profit || 0
//         };
//       });
      
//       setSaleStatus(initialSaleStatus);
//       setSaleData(initialSaleData);
//     } catch (err) {
//       console.error("Failed to fetch enquiries:", err);
//       alert("Failed to load enquiries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   // Calculate current month range
//   const getCurrentMonthRange = () => {
//     const now = new Date();
//     const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
//     const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
//     return {
//       from: firstDay.toISOString().split('T')[0],
//       to: lastDay.toISOString().split('T')[0]
//     };
//   };

//   // Filter enquiries by date range
//   const applyDateFilter = () => {
//     if (!dateRange.from && !dateRange.to) {
//       setFilteredEnquiries(enquiries);
//       return;
//     }

//     const fromDate = dateRange.from ? new Date(dateRange.from) : null;
//     const toDate = dateRange.to ? new Date(dateRange.to) : null;
    
//     if (toDate) {
//       toDate.setHours(23, 59, 59, 999); // Include entire end day
//     }

//     const filtered = enquiries.filter(enquiry => {
//       const enquiryDate = new Date(enquiry.createdAt);
      
//       if (fromDate && toDate) {
//         return enquiryDate >= fromDate && enquiryDate <= toDate;
//       } else if (fromDate) {
//         return enquiryDate >= fromDate;
//       } else if (toDate) {
//         return enquiryDate <= toDate;
//       }
//       return true;
//     });

//     setFilteredEnquiries(filtered);
//     setCurrentPage(1); // Reset to first page after filtering
//   };

//   // Clear date filter
//   const clearDateFilter = () => {
//     setDateRange({ from: "", to: "" });
//     setFilteredEnquiries(enquiries);
//   };

//   // Calculate total profit for filtered enquiries
//   const calculateTotalProfit = () => {
//     return filteredEnquiries.reduce((total, enquiry) => {
//       // Only include profits from enquiries with saleStatus = "YES"
//       if (enquiry.saleStatus === "YES") {
//         return total + (enquiry.profit || 0);
//       }
//       return total;
//     }, 0);
//   };

//   // Format date for display
//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "Not set";
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   // Calculate filtered dates display
//   const getFilteredDatesDisplay = () => {
//     if (!dateRange.from && !dateRange.to) {
//       const currentMonth = getCurrentMonthRange();
//       return {
//         from: formatDisplayDate(currentMonth.from),
//         to: formatDisplayDate(currentMonth.to),
//         label: "Current Month"
//       };
//     }
    
//     return {
//       from: dateRange.from ? formatDisplayDate(dateRange.from) : "Any",
//       to: dateRange.to ? formatDisplayDate(dateRange.to) : "Any",
//       label: "Custom Range"
//     };
//   };

//   // Apply filter on date range change
//   useEffect(() => {
//     applyDateFilter();
//   }, [dateRange.from, dateRange.to, enquiries]);

//   // Update enquiry status
//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/enquiries/${id}/status`, { status });
//       await fetchEnquiries(); // Refresh to get updated data
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update status. You don't have permission.");
//     }
//   };

//   // Save sale data to backend
//   const saveSaleData = async (id) => {
//     const data = {
//       saleStatus: saleStatus[id],
//       saleAmount: parseFloat(saleData[id]?.amount) || 0,
//       costPrice: parseFloat(saleData[id]?.costPrice) || 0,
//       sellingPrice: parseFloat(saleData[id]?.sellingPrice) || 0,
//       profit: parseFloat(saleData[id]?.profit) || 0
//     };

//     try {
//       setSaving(prev => ({ ...prev, [id]: true }));
//       await API.put(`/enquiries/${id}/sale`, data);
      
//       // Show success feedback
//       const saveBtn = document.querySelector(`[data-id="${id}"]`);
//       if (saveBtn) {
//         const originalText = saveBtn.innerHTML;
//         saveBtn.innerHTML = '<CheckCircle size={14} className="inline mr-1" /> Saved';
//         saveBtn.classList.add('bg-green-100', 'text-green-700');
        
//         setTimeout(() => {
//           saveBtn.innerHTML = originalText;
//           saveBtn.classList.remove('bg-green-100', 'text-green-700');
//         }, 2000);
//       }
      
//       // Refresh data to ensure consistency
//       await fetchEnquiries();
//     } catch (error) {
//       console.error("Save failed:", error);
//       alert("Failed to save sale data");
//     } finally {
//       setSaving(prev => ({ ...prev, [id]: false }));
//     }
//   };

//   // Update sale status
//   const handleSaleStatusChange = (id, value) => {
//     setSaleStatus(prev => ({ ...prev, [id]: value }));
    
//     // If setting to NO, clear sale data
//     if (value === "NO") {
//       setSaleData(prev => ({
//         ...prev,
//         [id]: {
//           amount: 0,
//           costPrice: 0,
//           sellingPrice: 0,
//           profit: 0
//         }
//       }));
//     }
//   };

//   // Update sale amount field
//   const handleSaleDataChange = (id, field, value) => {
//     const numValue = parseFloat(value) || 0;
    
//     setSaleData(prev => {
//       const currentData = prev[id] || { amount: 0, costPrice: 0, sellingPrice: 0, profit: 0 };
      
//       // Calculate profit if costPrice or sellingPrice changes
//       let profit = currentData.profit;
//       if (field === 'costPrice') {
//         profit = (currentData.sellingPrice || 0) - numValue;
//       } else if (field === 'sellingPrice') {
//         profit = numValue - (currentData.costPrice || 0);
//       }
      
//       return {
//         ...prev,
//         [id]: {
//           ...currentData,
//           [field]: numValue,
//           profit: profit
//         }
//       };
//     });
//   };

//   // Delete enquiry
//   const deleteEnquiry = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
//     try {
//       await API.delete(`/enquiries/${id}`);
//       fetchEnquiries();
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert("Failed to delete enquiry. You don't have permission.");
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   // Format currency
//   // const formatCurrency = (amount) => {
//   //   return new Intl.NumberFormat('en-IN', {
//   //     style: 'currency',
//   //     currency: 'INR',
//   //     minimumFractionDigits: 0,
//   //     maximumFractionDigits: 0
//   //   }).format(amount);
//   // };

//   const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   }).format(amount);
// };


//   // Pagination
//   const totalPages = Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
//   const paginatedEnquiries = useMemo(() => 
//     filteredEnquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE),
//     [filteredEnquiries, startIndex]
//   );

//   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

//   // Calculate total sales amount
//   const totalSalesAmount = filteredEnquiries.reduce((total, enquiry) => {
//     if (enquiry.saleStatus === "YES") {
//       return total + (enquiry.saleAmount || 0);
//     }
//     return total;
//   }, 0);

//   // Calculate total profit
//   const totalProfit = calculateTotalProfit();

//   const filteredDates = getFilteredDatesDisplay();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-8xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl shadow-lg">
//                 <MessageSquare size={32} className="text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Customer Enquiries</h1>
//                 <p className="text-gray-600 mt-1">Manage enquiries and track sales data</p>
//               </div>
//             </div>
            
//             {/* Filter Toggle Button */}
//             <button
//               onClick={() => setShowDateFilter(!showDateFilter)}
//               className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm"
//             >
//               <Filter size={18} />
//               {showDateFilter ? "Hide Filter" : "Filter by Date"}
//             </button>
//           </div>

//           {/* Date Filter Section */}
//           {showDateFilter && (
//             <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Filter by Date Range</h3>
//                 <button
//                   onClick={clearDateFilter}
//                   className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <RefreshCw size={14} />
//                   Clear Filter
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     From Date
//                   </label>
//                   <input
//                     type="date"
//                     value={dateRange.from}
//                     onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     To Date
//                   </label>
//                   <input
//                     type="date"
//                     value={dateRange.to}
//                     onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   />
//                 </div>
                
//                 <div className="sm:col-span-2">
//                   <div className="h-full p-3 bg-gray-50 rounded-lg border border-gray-200">
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Current Selection:</span>{' '}
//                       {filteredDates.from} to {filteredDates.to}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {filteredDates.label} • {filteredEnquiries.length} enquiries found
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Profit Card */}
//             <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <TrendingUpIcon className="text-emerald-600" size={20} />
//                     <span className="text-sm font-medium text-gray-600">Total Profit</span>
//                   </div>
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-2xl font-bold text-emerald-700">
//                       {formatCurrency(totalProfit)}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       from {filteredEnquiries.filter(e => e.saleStatus === "YES").length} sales
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs text-gray-500 mb-1">Date Range</div>
//                   <div className="text-sm font-medium text-gray-700">
//                     {filteredDates.from.split(' ')[0]} - {filteredDates.to.split(' ')[0]}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sales Summary Card */}
//             <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-medium text-gray-600 mb-1">Total Sales</div>
//                   <div className="text-2xl font-bold text-gray-900">
//                     {formatCurrency(totalSalesAmount)}
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs text-gray-500 mb-1">Enquiries</div>
//                   <div className="text-sm font-medium text-gray-700">
//                     {filteredEnquiries.length} total
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Filter Status Card */}
//             <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-medium text-gray-600 mb-1">Date Filter</div>
//                   <div className="text-lg font-bold text-gray-900">
//                     {filteredDates.label}
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs text-gray-500 mb-1">Showing</div>
//                   <div className="text-sm font-medium text-gray-700">
//                     {filteredEnquiries.length} of {enquiries.length}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//             <div>
//               Total Enquiries: <span className="font-semibold text-gray-700">{enquiries.length}</span>
//             </div>
//             <div className="h-4 w-px bg-gray-300"></div>
//             <div>
//               Filtered: <span className="font-semibold text-gray-700">{filteredEnquiries.length}</span>
//             </div>
//             <div className="h-4 w-px bg-gray-300"></div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
//               <span>Sales Made: {filteredEnquiries.filter(e => e.saleStatus === "YES").length}</span>
//             </div>
//             <div className="h-4 w-px bg-gray-300"></div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-amber-500"></div>
//               <span>In Progress</span>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
//             <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Table Container */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-teal-600 to-emerald-600">
//                     <tr>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Contact & Date
//                       </th>
//                       <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
//                         Message
//                       </th>
//                       <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
//                         Status & Sales
//                       </th>
//                       <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     {paginatedEnquiries.length === 0 ? (
//                       <tr>
//                         <td colSpan="5" className="px-8 py-16 text-center">
//                           <div className="flex flex-col items-center justify-center">
//                             <MessageSquare size={72} className="text-gray-300 mb-4" />
//                             <h3 className="text-xl font-semibold text-gray-500 mb-2">
//                               No Enquiries Found
//                             </h3>
//                             <p className="text-gray-400">
//                               {dateRange.from || dateRange.to 
//                                 ? "No enquiries match your date filter. Try a different date range."
//                                 : "No enquiries found. New customer enquiries will appear here."
//                               }
//                             </p>
//                             {(dateRange.from || dateRange.to) && (
//                               <button
//                                 onClick={clearDateFilter}
//                                 className="cursor-pointer mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//                               >
//                                 Clear Date Filter
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedEnquiries.map((enquiry) => (
//                         <tr 
//                           key={enquiry._id} 
//                           className="hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           {/* Customer Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex items-center gap-4">
//                               <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
//                                 <User size={20} className="text-teal-600" />
//                               </div>
//                               <div>
//                                 <h4 className="font-semibold text-gray-900">{enquiry.name}</h4>
//                                 <p className="text-sm text-gray-500">Enquiry ID: {enquiry._id.slice(-8)}</p>
//                                 {enquiry.saleStatus === "YES" && (
//                                   <div className="mt-1 flex items-center gap-1">
//                                     <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
//                                     <span className="text-xs text-emerald-600 font-medium">
//                                       Profit: {formatCurrency(enquiry.profit || 0)}
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Contact & Date Column */}
//                           <td className="px-8 py-6">
//                             <div className="space-y-3">
//                               <div className="space-y-1">
//                                 <div className="flex items-center gap-2">
//                                   <Mail size={14} className="text-gray-400" />
//                                   <a 
//                                     href={`mailto:${enquiry.email}`}
//                                     className="text-sm text-gray-700 hover:text-teal-600 transition-colors truncate"
//                                   >
//                                     {enquiry.email}
//                                   </a>
//                                 </div>
//                                 {enquiry.phone && (
//                                   <div className="flex items-center gap-2">
//                                     <Phone size={14} className="text-gray-400" />
//                                     <span className="text-sm text-gray-700">
//                                       {enquiry.phone}
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="flex items-center gap-2 text-xs text-gray-500">
//                                 <Calendar size={12} />
//                                 {formatDate(enquiry.createdAt)}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Message Column */}
//                           <td className="px-8 py-6 max-w-xs">
//                             <p className="text-gray-600 line-clamp-3 leading-relaxed">
//                               {enquiry.message}
//                             </p>
//                           </td>

//                           {/* Status & Sales Column */}
//                           <td className="px-8 py-6">
//                             <div className="space-y-4">
//                               {/* Status Selector */}
//                               <div className="flex justify-center">
//                                 <select
//                                   value={enquiry.status}
//                                   onChange={(e) => updateStatus(enquiry._id, e.target.value)}
//                                   className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:shadow-md ${STATUS_CONFIG[enquiry.status]?.color}`}
//                                 >
//                                   {Object.entries(STATUS_CONFIG).map(([value, config]) => (
//                                     <option key={value} value={value}>
//                                       {config.icon} {config.label}
//                                     </option>
//                                   ))}
//                                 </select>
//                               </div>

//                               {/* Sale Tracking */}
//                               {enquiry.status === "CONTACTED" && (
//                                 <div className="mt-4 space-y-3">
//                                   <div className="flex items-center gap-2">
//                                     <select
//                                       value={saleStatus[enquiry._id] || "NO"}
//                                       onChange={(e) => handleSaleStatusChange(enquiry._id, e.target.value)}
//                                       className="flex-1 cursor-pointer px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                                     >
//                                       <option value="NO">📞 No Sale</option>
//                                       <option value="YES">💰 Sale Made</option>
//                                     </select>
//                                   </div>

//                                   {/* Sale Data Inputs */}
//                                   {saleStatus[enquiry._id] === "YES" && (
//                                     <div className="space-y-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
//                                       <div className="grid grid-cols-2 gap-2">
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <DollarSign size={12} className="inline mr-1" />
//                                             Amount
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="0"
//                                             value={saleData[enquiry._id]?.amount || ""}
//                                             onChange={(e) => handleSaleDataChange(enquiry._id, 'amount', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <Package size={12} className="inline mr-1" />
//                                             Cost
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="0"
//                                             value={saleData[enquiry._id]?.costPrice || ""}
//                                             onChange={(e) => handleSaleDataChange(enquiry._id, 'costPrice', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             <TrendingUp size={12} className="inline mr-1" />
//                                             Selling
//                                           </label>
//                                           <input
//                                             type="number"
//                                             placeholder="0"
//                                             value={saleData[enquiry._id]?.sellingPrice || ""}
//                                             onChange={(e) => handleSaleDataChange(enquiry._id, 'sellingPrice', e.target.value)}
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs text-gray-500 mb-1">
//                                             💰 Profit
//                                           </label>
//                                           <input
//                                             type="number"
//                                             value={saleData[enquiry._id]?.profit || 0}
//                                             readOnly
//                                             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-100 font-semibold text-emerald-700"
//                                           />
//                                         </div>
//                                       </div>
                                      
//                                       {/* Summary & Save Button */}
//                                       <div className="mt-3 pt-3 border-t border-gray-200">
//                                         <div className="flex items-center justify-between">
//                                           <div className="text-xs">
//                                             <span className="text-gray-500">Total:</span>{' '}
//                                             <span className="font-semibold">
//                                               {formatCurrency(saleData[enquiry._id]?.amount || 0)}
//                                             </span>
//                                           </div>
//                                           <button
//                                             data-id={enquiry._id}
//                                             onClick={() => saveSaleData(enquiry._id)}
//                                             disabled={saving[enquiry._id]}
//                                             className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                                           >
//                                             {saving[enquiry._id] ? (
//                                               <>
//                                                 <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
//                                                 Saving...
//                                               </>
//                                             ) : (
//                                               <>
//                                                 <Save size={12} />
//                                                 Save Data
//                                               </>
//                                             )}
//                                           </button>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </td>

//                           {/* Actions Column */}
//                           <td className="px-8 py-6">
//                             <div className="flex justify-center gap-2">
//                               <button
//                                 onClick={() => deleteEnquiry(enquiry._id)}
//                                 className="cursor-pointer p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors group"
//                                 title="Delete enquiry"
//                               >
//                                 <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> -{" "}
//                   <span className="font-semibold text-gray-900">
//                     {Math.min(startIndex + ITEMS_PER_PAGE, filteredEnquiries.length)}
//                   </span>{" "}
//                   of <span className="font-semibold text-gray-900">{filteredEnquiries.length}</span> filtered enquiries
//                   {filteredEnquiries.length !== enquiries.length && (
//                     <span className="text-gray-500 ml-2">
//                       ({enquiries.length} total)
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={handlePrev}
//                     disabled={currentPage === 1}
//                     className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                   >
//                     <ChevronLeft size={18} />
//                     Previous
//                   </button>

//                   <div className="flex items-center gap-2">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       const pageNum = i + 1;
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`w-10 h-10 rounded-lg font-medium transition-all ${
//                             currentPage === pageNum
//                               ? "bg-teal-600 text-white shadow-md"
//                               : "text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                     {totalPages > 5 && (
//                       <span className="text-gray-400 px-2">...</span>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleNext}
//                     disabled={currentPage === totalPages}
//                     className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//                   >
//                     Next
//                     <ChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Enquiries;

//====================with added more field============

import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import {
  MessageSquare,
  Phone,
  Mail,
  User,
  Calendar,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  DollarSign,
  TrendingUp,
  Package,
  CheckCircle,
  Filter,
  TrendingUp as TrendingUpIcon,
  RefreshCw,
  MapPin,
  Users,
  Plane,
  Home,
  Briefcase,
  Car,
  FileText
} from "lucide-react";

const STATUS_CONFIG = {
  NEW: { 
    color: "bg-blue-50 text-blue-700 border-blue-200", 
    label: "New",
    icon: "🆕"
  },
  CONTACTED: { 
    color: "bg-amber-50 text-amber-700 border-amber-200", 
    label: "Contacted",
    icon: "📞"
  },
  FOLLOW_UP: { 
    color: "bg-orange-50 text-orange-700 border-orange-200", 
    label: "Follow Up",
    icon: "🔄"
  },
  CLOSED: { 
    color: "bg-emerald-50 text-emerald-700 border-emerald-200", 
    label: "Closed",
    icon: "✅"
  }
};

const TRAVEL_TYPE_CONFIG = {
  FLIGHT: { icon: <Plane size={14} />, label: "Flight", color: "text-blue-600 bg-blue-50" },
  HOTEL: { icon: <Home size={14} />, label: "Hotel", color: "text-green-600 bg-green-50" },
  PACKAGE: { icon: <Briefcase size={14} />, label: "Package", color: "text-purple-600 bg-purple-50" },
  VISA: { icon: <FileText size={14} />, label: "Visa", color: "text-amber-600 bg-amber-50" },
  TRANSFER: { icon: <Car size={14} />, label: "Transfer", color: "text-indigo-600 bg-indigo-50" }
};

const ITEMS_PER_PAGE = 10;

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [saleStatus, setSaleStatus] = useState({});
  const [saleData, setSaleData] = useState({});
  const [saving, setSaving] = useState({});
  
  // Date range filter states
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Fetch enquiries including saved sale data
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/enquiries");
      const enquiriesData = res.data || [];
      setEnquiries(enquiriesData);
      setFilteredEnquiries(enquiriesData);

      // Initialize saleStatus and saleData from fetched enquiries
      const initialSaleStatus = {};
      const initialSaleData = {};
      
      enquiriesData.forEach(enquiry => {
        initialSaleStatus[enquiry._id] = enquiry.saleStatus || "NO";
        initialSaleData[enquiry._id] = {
          amount: enquiry.saleAmount || 0,
          costPrice: enquiry.costPrice || 0,
          sellingPrice: enquiry.sellingPrice || 0,
          profit: enquiry.profit || 0
        };
      });
      
      setSaleStatus(initialSaleStatus);
      setSaleData(initialSaleData);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
      alert("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Calculate current month range
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return {
      from: firstDay.toISOString().split('T')[0],
      to: lastDay.toISOString().split('T')[0]
    };
  };

  // Filter enquiries by date range
  const applyDateFilter = () => {
    if (!dateRange.from && !dateRange.to) {
      setFilteredEnquiries(enquiries);
      return;
    }

    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    
    if (toDate) {
      toDate.setHours(23, 59, 59, 999); // Include entire end day
    }

    const filtered = enquiries.filter(enquiry => {
      const enquiryDate = new Date(enquiry.createdAt);
      
      if (fromDate && toDate) {
        return enquiryDate >= fromDate && enquiryDate <= toDate;
      } else if (fromDate) {
        return enquiryDate >= fromDate;
      } else if (toDate) {
        return enquiryDate <= toDate;
      }
      return true;
    });

    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange({ from: "", to: "" });
    setFilteredEnquiries(enquiries);
  };

  // Calculate total profit for filtered enquiries
  const calculateTotalProfit = () => {
    return filteredEnquiries.reduce((total, enquiry) => {
      // Only include profits from enquiries with saleStatus = "YES"
      if (enquiry.saleStatus === "YES") {
        return total + (enquiry.profit || 0);
      }
      return total;
    }, 0);
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Calculate filtered dates display
  const getFilteredDatesDisplay = () => {
    if (!dateRange.from && !dateRange.to) {
      const currentMonth = getCurrentMonthRange();
      return {
        from: formatDisplayDate(currentMonth.from),
        to: formatDisplayDate(currentMonth.to),
        label: "Current Month"
      };
    }
    
    return {
      from: dateRange.from ? formatDisplayDate(dateRange.from) : "Any",
      to: dateRange.to ? formatDisplayDate(dateRange.to) : "Any",
      label: "Custom Range"
    };
  };

  // Apply filter on date range change
  useEffect(() => {
    applyDateFilter();
  }, [dateRange.from, dateRange.to, enquiries]);

  // Update enquiry status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/enquiries/${id}/status`, { status });
      await fetchEnquiries(); // Refresh to get updated data
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status. You don't have permission.");
    }
  };

  // Save sale data to backend
  const saveSaleData = async (id) => {
    const data = {
      saleStatus: saleStatus[id],
      saleAmount: parseFloat(saleData[id]?.amount) || 0,
      costPrice: parseFloat(saleData[id]?.costPrice) || 0,
      sellingPrice: parseFloat(saleData[id]?.sellingPrice) || 0,
      profit: parseFloat(saleData[id]?.profit) || 0
    };

    try {
      setSaving(prev => ({ ...prev, [id]: true }));
      await API.put(`/enquiries/${id}/sale`, data);
      
      // Show success feedback
      const saveBtn = document.querySelector(`[data-id="${id}"]`);
      if (saveBtn) {
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<CheckCircle size={14} className="inline mr-1" /> Saved';
        saveBtn.classList.add('bg-green-100', 'text-green-700');
        
        setTimeout(() => {
          saveBtn.innerHTML = originalText;
          saveBtn.classList.remove('bg-green-100', 'text-green-700');
        }, 2000);
      }
      
      // Refresh data to ensure consistency
      await fetchEnquiries();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save sale data");
    } finally {
      setSaving(prev => ({ ...prev, [id]: false }));
    }
  };

  // Update sale status
  const handleSaleStatusChange = (id, value) => {
    setSaleStatus(prev => ({ ...prev, [id]: value }));
    
    // If setting to NO, clear sale data
    if (value === "NO") {
      setSaleData(prev => ({
        ...prev,
        [id]: {
          amount: 0,
          costPrice: 0,
          sellingPrice: 0,
          profit: 0
        }
      }));
    }
  };

  // Update sale amount field
  const handleSaleDataChange = (id, field, value) => {
    const numValue = parseFloat(value) || 0;
    
    setSaleData(prev => {
      const currentData = prev[id] || { amount: 0, costPrice: 0, sellingPrice: 0, profit: 0 };
      
      // Calculate profit if costPrice or sellingPrice changes
      let profit = currentData.profit;
      if (field === 'costPrice') {
        profit = (currentData.sellingPrice || 0) - numValue;
      } else if (field === 'sellingPrice') {
        profit = numValue - (currentData.costPrice || 0);
      }
      
      return {
        ...prev,
        [id]: {
          ...currentData,
          [field]: numValue,
          profit: profit
        }
      };
    });
  };

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
    try {
      await API.delete(`/enquiries/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete enquiry. You don't have permission.");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
  const paginatedEnquiries = useMemo(() => 
    filteredEnquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [filteredEnquiries, startIndex]
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

  // Calculate total sales amount
  const totalSalesAmount = filteredEnquiries.reduce((total, enquiry) => {
    if (enquiry.saleStatus === "YES") {
      return total + (enquiry.saleAmount || 0);
    }
    return total;
  }, 0);

  // Calculate total profit
  const totalProfit = calculateTotalProfit();

  const filteredDates = getFilteredDatesDisplay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl shadow-lg">
                <MessageSquare size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Customer Enquiries</h1>
                <p className="text-gray-600 mt-1">Manage enquiries and track sales data</p>
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm"
            >
              <Filter size={18} />
              {showDateFilter ? "Hide Filter" : "Filter by Date"}
            </button>
          </div>

          {/* Date Filter Section */}
          {showDateFilter && (
            <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filter by Date Range</h3>
                <button
                  onClick={clearDateFilter}
                  className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw size={14} />
                  Clear Filter
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <div className="h-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Current Selection:</span>{' '}
                      {filteredDates.from} to {filteredDates.to}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {filteredDates.label} • {filteredEnquiries.length} enquiries found
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Profit Card */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUpIcon className="text-emerald-600" size={20} />
                    <span className="text-sm font-medium text-gray-600">Total Profit</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-700">
                      {formatCurrency(totalProfit)}
                    </span>
                    <span className="text-xs text-gray-500">
                      from {filteredEnquiries.filter(e => e.saleStatus === "YES").length} sales
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Date Range</div>
                  <div className="text-sm font-medium text-gray-700">
                    {filteredDates.from.split(' ')[0]} - {filteredDates.to.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Summary Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Total Sales</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalSalesAmount)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Enquiries</div>
                  <div className="text-sm font-medium text-gray-700">
                    {filteredEnquiries.length} total
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Status Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Date Filter</div>
                  <div className="text-lg font-bold text-gray-900">
                    {filteredDates.label}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Showing</div>
                  <div className="text-sm font-medium text-gray-700">
                    {filteredEnquiries.length} of {enquiries.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div>
              Total Enquiries: <span className="font-semibold text-gray-700">{enquiries.length}</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div>
              Filtered: <span className="font-semibold text-gray-700">{filteredEnquiries.length}</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Sales Made: {filteredEnquiries.filter(e => e.saleStatus === "YES").length}</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>In Progress</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-teal-600 to-emerald-600">
                    <tr>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Travel Details
                      </th>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Contact & Date
                      </th>
                      <th className="px-8 py-5 text-left text-white font-semibold text-sm uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        Status & Sales
                      </th>
                      <th className="px-8 py-5 text-center text-white font-semibold text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {paginatedEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <MessageSquare size={72} className="text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500 mb-2">
                              No Enquiries Found
                            </h3>
                            <p className="text-gray-400">
                              {dateRange.from || dateRange.to 
                                ? "No enquiries match your date filter. Try a different date range."
                                : "No enquiries found. New customer enquiries will appear here."
                              }
                            </p>
                            {(dateRange.from || dateRange.to) && (
                              <button
                                onClick={clearDateFilter}
                                className="cursor-pointer mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                              >
                                Clear Date Filter
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedEnquiries.map((enquiry) => (
                        <tr 
                          key={enquiry._id} 
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          {/* Customer Column */}
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
                                <User size={20} className="text-teal-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{enquiry.name}</h4>
                                <p className="text-sm text-gray-500">Enquiry ID: {enquiry._id.slice(-8)}</p>
                                <div className="mt-1 flex items-center gap-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${TRAVEL_TYPE_CONFIG[enquiry.travelType]?.color || "bg-gray-100 text-gray-600"}`}>
                                    {TRAVEL_TYPE_CONFIG[enquiry.travelType]?.icon}
                                    <span className="ml-1">{TRAVEL_TYPE_CONFIG[enquiry.travelType]?.label || enquiry.travelType}</span>
                                  </span>
                                </div>
                                {enquiry.saleStatus === "YES" && (
                                  <div className="mt-1 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs text-emerald-600 font-medium">
                                      Profit: {formatCurrency(enquiry.profit || 0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Travel Details Column */}
                          <td className="px-8 py-6">
                            <div className="space-y-3">
                              {enquiry.origin || enquiry.destination ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-gray-400" />
                                    <div className="text-sm">
                                      <span className="font-medium text-gray-700">{enquiry.origin || "N/A"}</span>
                                      <span className="mx-2 text-gray-400">→</span>
                                      <span className="font-medium text-gray-700">{enquiry.destination || "N/A"}</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-400 italic">No travel details</div>
                              )}

                              <div className="space-y-1">
                                {enquiry.travelDate && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>Travel: {formatDate(enquiry.travelDate)}</span>
                                  </div>
                                )}
                                
                                {enquiry.passengers && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users size={14} className="text-gray-400" />
                                    <span>{enquiry.passengers} {enquiry.passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                                  </div>
                                )}

                                {enquiry.expectedBudget && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign size={14} className="text-gray-400" />
                                    <span className="text-emerald-600 font-medium">
                                      Budget: {formatCurrency(enquiry.expectedBudget)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Contact & Date Column */}
                          <td className="px-8 py-6">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Mail size={14} className="text-gray-400" />
                                  <a 
                                    href={`mailto:${enquiry.email}`}
                                    className="text-sm text-gray-700 hover:text-teal-600 transition-colors truncate"
                                  >
                                    {enquiry.email}
                                  </a>
                                </div>
                                {enquiry.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-700">
                                      {enquiry.phone}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar size={12} />
                                Enquired: {formatDate(enquiry.createdAt)}
                              </div>
                            </div>
                          </td>

                          {/* Message Column */}
                          <td className="px-8 py-6 max-w-xs">
                            <p className="text-gray-600 line-clamp-3 leading-relaxed">
                              {enquiry.message}
                            </p>
                          </td>

                          {/* Status & Sales Column */}
                          <td className="px-8 py-6">
                            <div className="space-y-4">
                              {/* Status Selector */}
                              <div className="flex justify-center">
                                <select
                                  value={enquiry.status}
                                  onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                                  className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:shadow-md ${STATUS_CONFIG[enquiry.status]?.color}`}
                                >
                                  {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                                    <option key={value} value={value}>
                                      {config.icon} {config.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Sale Tracking */}
                              {enquiry.status === "CONTACTED" && (
                                <div className="mt-4 space-y-3">
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={saleStatus[enquiry._id] || "NO"}
                                      onChange={(e) => handleSaleStatusChange(enquiry._id, e.target.value)}
                                      className="flex-1 cursor-pointer px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    >
                                      <option value="NO">📞 No Sale</option>
                                      <option value="YES">💰 Sale Made</option>
                                    </select>
                                  </div>

                                  {/* Sale Data Inputs */}
                                  {saleStatus[enquiry._id] === "YES" && (
                                    <div className="space-y-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            <DollarSign size={12} className="inline mr-1" />
                                            Amount
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="0"
                                            value={saleData[enquiry._id]?.amount || ""}
                                            onChange={(e) => handleSaleDataChange(enquiry._id, 'amount', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            <Package size={12} className="inline mr-1" />
                                            Cost
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="0"
                                            value={saleData[enquiry._id]?.costPrice || ""}
                                            onChange={(e) => handleSaleDataChange(enquiry._id, 'costPrice', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            <TrendingUp size={12} className="inline mr-1" />
                                            Selling
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="0"
                                            value={saleData[enquiry._id]?.sellingPrice || ""}
                                            onChange={(e) => handleSaleDataChange(enquiry._id, 'sellingPrice', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-500 mb-1">
                                            💰 Profit
                                          </label>
                                          <input
                                            type="number"
                                            value={saleData[enquiry._id]?.profit || 0}
                                            readOnly
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-100 font-semibold text-emerald-700"
                                          />
                                        </div>
                                      </div>
                                      
                                      {/* Summary & Save Button */}
                                      <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                          <div className="text-xs">
                                            <span className="text-gray-500">Total:</span>{' '}
                                            <span className="font-semibold">
                                              {formatCurrency(saleData[enquiry._id]?.amount || 0)}
                                            </span>
                                          </div>
                                          <button
                                            data-id={enquiry._id}
                                            onClick={() => saveSaleData(enquiry._id)}
                                            disabled={saving[enquiry._id]}
                                            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            {saving[enquiry._id] ? (
                                              <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                Saving...
                                              </>
                                            ) : (
                                              <>
                                                <Save size={12} />
                                                Save Data
                                              </>
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Actions Column */}
                          <td className="px-8 py-6">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => deleteEnquiry(enquiry._id)}
                                className="cursor-pointer p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors group"
                                title="Delete enquiry"
                              >
                                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> -{" "}
                  <span className="font-semibold text-gray-900">
                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredEnquiries.length)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-900">{filteredEnquiries.length}</span> filtered enquiries
                  {filteredEnquiries.length !== enquiries.length && (
                    <span className="text-gray-500 ml-2">
                      ({enquiries.length} total)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all ${
                            currentPage === pageNum
                              ? "bg-teal-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="text-gray-400 px-2">...</span>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Enquiries;