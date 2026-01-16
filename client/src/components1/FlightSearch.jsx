// import { useState } from "react";

// const API_BASE = "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api";

// export default function App() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     date: "2026-01-09",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       const params = new URLSearchParams(form).toString();
//       const res = await fetch(`${API_BASE}/flight-status?${params}`);
//       const data = await res.json();

//       if (!data.success) {
//         throw new Error(data.message || "API Error");
//       }

//       setResults(data.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
//         <h1 className="text-2xl font-bold mb-4">✈️ Flight Status Checker</h1>

//         {/* Search Form */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="airport">Airport → Airport</option>
//             <option value="flight">Flight Number</option>
//             <option value="city">City → City</option>
//           </select>

//           <input
//             name="dep"
//             placeholder="From (DEL)"
//             value={form.dep}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             name="arr"
//             placeholder="To (DXB)"
//             value={form.arr}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <button
//           onClick={fetchFlights}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>

//         {error && <p className="text-red-600 mt-4">{error}</p>}

//         {/* Results */}
//         <div className="mt-8">
//           {results.length > 0 && (
//             <table className="w-full border text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">Flight</th>
//                   <th className="border p-2">Airline</th>
//                   <th className="border p-2">Departure</th>
//                   <th className="border p-2">Arrival</th>
//                   <th className="border p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((f, i) => (
//                   <tr key={i} className="text-center">
//                     <td className="border p-2">{f.FlightNo}</td>
//                     <td className="border p-2">{f.FlightCompany}</td>
//                     <td className="border p-2">{f.FlightDepcode}</td>
//                     <td className="border p-2">{f.FlightArrcode}</td>
//                     <td className="border p-2">{f.FlightState}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {!loading && results.length === 0 && !error && (
//             <p className="text-gray-500 mt-4">No data found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//=============correct==========

// import { useState } from "react";


// const API_BASE =
//   "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api";

// export default function App() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: "2026-01-09",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       // build params correctly based on type
//       const params = new URLSearchParams();
//       params.append("type", form.type);
//       params.append("date", form.date);

//       if (form.type === "airport") {
//         params.append("dep", form.dep);
//         params.append("arr", form.arr);
//       }

//       if (form.type === "flight") {
//         params.append("fnum", form.fnum);
//       }

//       if (form.type === "city") {
//         params.append("depcity", form.depcity);
//         params.append("arrcity", form.arrcity);
//       }

//       const res = await fetch(
//         `${API_BASE}/flight-status?${params.toString()}`
//       );
//       const data = await res.json();

//       if (!data.success) {
//         throw new Error(data.message || "API Error");
//       }

//       setResults(data.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           ✈️ Flight Status Checker
//         </h1>

//         {/* Search Form */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           {/* Type */}
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="airport">Airport → Airport</option>
//             <option value="flight">Flight Number</option>
//             <option value="city">City → City</option>
//           </select>

//           {/* Airport → Airport */}
//           {form.type === "airport" && (
//             <>
//               <input
//                 name="dep"
//                 placeholder="From (DEL)"
//                 value={form.dep}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 name="arr"
//                 placeholder="To (DXB)"
//                 value={form.arr}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </>
//           )}

//           {/* Flight Number */}
//           {form.type === "flight" && (
//             <input
//               name="fnum"
//               placeholder="Flight Number (EK513)"
//               value={form.fnum}
//               onChange={handleChange}
//               className="border p-2 rounded col-span-2"
//             />
//           )}

//           {/* City → City */}
//           {form.type === "city" && (
//             <>
//               <input
//                 name="depcity"
//                 placeholder="From City (Delhi)"
//                 value={form.depcity}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 name="arrcity"
//                 placeholder="To City (Dubai)"
//                 value={form.arrcity}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </>
//           )}

//           {/* Date */}
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <button
//           onClick={fetchFlights}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>

//         {error && <p className="text-red-600 mt-4">{error}</p>}

//         {/* Results */}
//         <div className="mt-8 overflow-x-auto">
//           {results.length > 0 && (
//             <table className="w-full border text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">Flight</th>
//                   <th className="border p-2">Airline</th>
//                   <th className="border p-2">Departure</th>
//                   <th className="border p-2">Arrival</th>
//                   <th className="border p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((f, i) => (
//                   <tr key={i} className="text-center hover:bg-gray-50">
//                     <td className="border p-2">{f.FlightNo}</td>
//                     <td className="border p-2">{f.FlightCompany}</td>
//                     <td className="border p-2">
//                       {f.FlightDepcode}
//                       <br />
//                       <span className="text-xs text-gray-500">
//                         {f.FlightDeptimePlanDate}
//                       </span>
//                     </td>
//                     <td className="border p-2">
//                       {f.FlightArrcode}
//                       <br />
//                       <span className="text-xs text-gray-500">
//                         {f.FlightArrtimePlanDate}
//                       </span>
//                     </td>
//                     <td className="border p-2 capitalize">
//                       {f.FlightState}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {!loading && results.length === 0 && !error && (
//             <p className="text-gray-500 mt-4">No data found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//============correct

// import { useState } from "react";
// import API from "../api/axios";

// export default function App() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: "2026-01-09",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       // build params object (axios style)
//       const params = {
//         type: form.type,
//         date: form.date,
//       };

//       if (form.type === "airport") {
//         params.dep = form.dep;
//         params.arr = form.arr;
//       }

//       if (form.type === "flight") {
//         params.fnum = form.fnum;
//       }

//       if (form.type === "city") {
//         params.depcity = form.depcity;
//         params.arrcity = form.arrcity;
//       }

//       const res = await API.get("/flight-status", { params });

//       if (!res.data.success) {
//         throw new Error(res.data.message || "API Error");
//       }

//       setResults(res.data.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           ✈️ Flight Status Checker
//         </h1>

//         {/* Search Form */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="airport">Airport → Airport</option>
//             <option value="flight">Flight Number</option>
//             <option value="city">City → City</option>
//           </select>

//           {form.type === "airport" && (
//             <>
//               <input
//                 name="dep"
//                 placeholder="From (DEL)"
//                 value={form.dep}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 name="arr"
//                 placeholder="To (DXB)"
//                 value={form.arr}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </>
//           )}

//           {form.type === "flight" && (
//             <input
//               name="fnum"
//               placeholder="Flight Number (EK513)"
//               value={form.fnum}
//               onChange={handleChange}
//               className="border p-2 rounded col-span-2"
//             />
//           )}

//           {form.type === "city" && (
//             <>
//               <input
//                 name="depcity"
//                 placeholder="From City (Delhi)"
//                 value={form.depcity}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 name="arrcity"
//                 placeholder="To City (Dubai)"
//                 value={form.arrcity}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </>
//           )}

//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <button
//           onClick={fetchFlights}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>

//         {error && <p className="text-red-600 mt-4">{error}</p>}

//         {/* Results */}
//         <div className="mt-8 overflow-x-auto">
//           {results.length > 0 && (
//             <table className="w-full border text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">Flight</th>
//                   <th className="border p-2">Airline</th>
//                   <th className="border p-2">Departure</th>
//                   <th className="border p-2">Arrival</th>
//                   <th className="border p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((f, i) => (
//                   <tr key={i} className="text-center hover:bg-gray-50">
//                     <td className="border p-2">{f.FlightNo}</td>
//                     <td className="border p-2">{f.FlightCompany}</td>
//                     <td className="border p-2">{f.FlightDepcode}</td>
//                     <td className="border p-2">{f.FlightArrcode}</td>
//                     <td className="border p-2 capitalize">
//                       {f.FlightState}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {!loading && results.length === 0 && !error && (
//             <p className="text-gray-500 mt-4">No data found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
//=======deep==full correct=======

// import { useState } from "react";
// import API from "../api/axios";
// import {
//   Plane,
//   Search,
//   Calendar,
//   MapPin,
//   Clock,
//   Filter,
//   RefreshCw,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   ChevronRight,
//   Users,
//   Building,
//   Navigation
// } from "lucide-react";

// export default function FlightStatusChecker() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: new Date().toISOString().split('T')[0],
//     airport: "DEL",
//     status: "dep",
//     startAt: "06:00",
//     endAt: "22:00",
//     page: 1,
//     perpage: 20
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const getStatusColor = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower?.includes('scheduled') || statusLower?.includes('ontime')) return 'bg-blue-100 text-blue-800';
//     if (statusLower?.includes('departed') || statusLower?.includes('enroute')) return 'bg-purple-100 text-purple-800';
//     if (statusLower?.includes('arrived') || statusLower?.includes('landed')) return 'bg-green-100 text-green-800';
//     if (statusLower?.includes('delayed') || statusLower?.includes('late')) return 'bg-yellow-100 text-yellow-800';
//     if (statusLower?.includes('cancelled') || statusLower?.includes('diverted')) return 'bg-red-100 text-red-800';
//     return 'bg-gray-100 text-gray-800';
//   };

//   const getStatusIcon = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower?.includes('arrived')) return <CheckCircle className="w-4 h-4" />;
//     if (statusLower?.includes('delayed')) return <Clock className="w-4 h-4" />;
//     if (statusLower?.includes('cancelled')) return <XCircle className="w-4 h-4" />;
//     return <Plane className="w-4 h-4" />;
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       const params = {
//         type: form.type,
//         date: form.date,
//       };

//       // Add parameters based on search type
//       switch (form.type) {
//         case "airport":
//           params.dep = form.dep.toUpperCase();
//           params.arr = form.arr.toUpperCase();
//           break;
//         case "flight":
//           params.fnum = form.fnum.toUpperCase();
//           break;
//         case "city":
//           params.depcity = form.depcity;
//           params.arrcity = form.arrcity;
//           break;
//         case "board":
//           params.airport = form.airport.toUpperCase();
//           params.status = form.status;
//           params.page = form.page;
//           params.perpage = form.perpage;
//           break;
//         case "time":
//           params.airport = form.airport.toUpperCase();
//           params.status = form.status;
//           params.startAt = form.startAt;
//           params.endAt = form.endAt;
//           params.page = form.page;
//           params.perpage = form.perpage;
//           break;
//         default:
//           break;
//       }

//       const res = await API.get("/flight-status", { params });

//       if (!res.data.success) {
//         throw new Error(res.data.message || "API Error");
//       }

//       setResults(res.data.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to fetch flight data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       type: "airport",
//       dep: "DEL",
//       arr: "DXB",
//       fnum: "",
//       depcity: "",
//       arrcity: "",
//       date: new Date().toISOString().split('T')[0],
//       airport: "DEL",
//       status: "dep",
//       startAt: "06:00",
//       endAt: "22:00",
//       page: 1,
//       perpage: 20
//     });
//     setResults([]);
//     setError("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
//               <Plane className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Flight Status Tracker</h1>
//               <p className="text-gray-600 mt-1">Real-time flight information and airport boards</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Panel - Search Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <Search className="w-5 h-5" />
//                   Search Flights
//                 </h2>
//                 <button
//                   onClick={resetForm}
//                   className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   Reset
//                 </button>
//               </div>

//               {/* Search Type */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Search Type
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {[
//                     { value: "airport", label: "Airport", icon: <Navigation className="w-4 h-4" /> },
//                     { value: "flight", label: "Flight", icon: <Plane className="w-4 h-4" /> },
//                     { value: "city", label: "City", icon: <Building className="w-4 h-4" /> },
//                     { value: "board", label: "Board", icon: <Filter className="w-4 h-4" /> },
//                     { value: "time", label: "Time", icon: <Clock className="w-4 h-4" /> },
//                   ].map((option) => (
//                     <button
//                       key={option.value}
//                       type="button"
//                       onClick={() => setForm({ ...form, type: option.value })}
//                       className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${form.type === option.value
//                           ? 'border-blue-500 bg-blue-50 text-blue-700'
//                           : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                         }`}
//                     >
//                       {option.icon}
//                       <span className="text-xs mt-1 font-medium">{option.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Dynamic Fields based on Type */}
//               <div className="space-y-4 mb-6">
//                 {form.type === "airport" && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                         <MapPin className="w-4 h-4" />
//                         Departure Airport
//                       </label>
//                       <input
//                         name="dep"
//                         value={form.dep}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., DEL"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                         <MapPin className="w-4 h-4" />
//                         Arrival Airport
//                       </label>
//                       <input
//                         name="arr"
//                         value={form.arr}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., DXB"
//                       />
//                     </div>
//                   </>
//                 )}

//                 {form.type === "flight" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                       <Plane className="w-4 h-4" />
//                       Flight Number
//                     </label>
//                     <input
//                       name="fnum"
//                       value={form.fnum}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="e.g., EK513"
//                     />
//                   </div>
//                 )}

//                 {form.type === "city" && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Departure City
//                       </label>
//                       <input
//                         name="depcity"
//                         value={form.depcity}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., Delhi"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Arrival City
//                       </label>
//                       <input
//                         name="arrcity"
//                         value={form.arrcity}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., Dubai"
//                       />
//                     </div>
//                   </>
//                 )}

//                 {(form.type === "board" || form.type === "time") && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Airport Code
//                       </label>
//                       <input
//                         name="airport"
//                         value={form.airport}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., DEL"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Status Type
//                       </label>
//                       <select
//                         name="status"
//                         value={form.status}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       >
//                         <option value="dep">Departures</option>
//                         <option value="arr">Arrivals</option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 {form.type === "time" && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Start Time
//                       </label>
//                       <input
//                         type="time"
//                         name="startAt"
//                         value={form.startAt}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         End Time
//                       </label>
//                       <input
//                         type="time"
//                         name="endAt"
//                         value={form.endAt}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Date Selector */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={form.date}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               {/* Advanced Options Toggle */}
//               <button
//                 onClick={() => setShowAdvanced(!showAdvanced)}
//                 className="flex items-center justify-between w-full mb-4 text-sm text-gray-600 hover:text-gray-900"
//               >
//                 <span className="flex items-center gap-2">
//                   <Filter className="w-4 h-4" />
//                   Advanced Options
//                 </span>
//                 <ChevronRight className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
//               </button>

//               {showAdvanced && (
//                 <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Page
//                       </label>
//                       <input
//                         type="number"
//                         name="page"
//                         value={form.page}
//                         onChange={handleChange}
//                         min="1"
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Per Page
//                       </label>
//                       <input
//                         type="number"
//                         name="perpage"
//                         value={form.perpage}
//                         onChange={handleChange}
//                         min="1"
//                         max="100"
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Search Button */}
//               <button
//                 onClick={fetchFlights}
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw className="w-5 h-5 animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search className="w-5 h-5" />
//                     Search Flights
//                   </>
//                 )}
//               </button>

//               {error && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
//                   <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Panel - Results */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               {/* Results Header */}
//               <div className="p-6 border-b">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       Flight Results
//                       {results.length > 0 && (
//                         <span className="ml-2 text-sm font-normal text-gray-500">
//                           ({results.length} flights found)
//                         </span>
//                       )}
//                     </h2>
//                     {results.length > 0 && (
//                       <p className="text-sm text-gray-600 mt-1">
//                         Showing flights for {form.date}
//                       </p>
//                     )}
//                   </div>
//                   {results.length > 0 && (
//                     <button
//                       onClick={fetchFlights}
//                       disabled={loading}
//                       className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                     >
//                       <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                       Refresh
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Results Table */}
//               <div className="overflow-x-auto">
//                 {results.length > 0 ? (
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Flight
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Airline
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Route
//                         </th>
//                         <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Times
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {results.map((flight, index) => (
//                         <tr
//                           key={index}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0">
//                                 <div className="p-2 bg-blue-50 rounded-lg">
//                                   <Plane className="w-5 h-5 text-blue-600" />
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {flight.FlightNo || 'N/A'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {flight.FlightCompany || 'Unknown Airline'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">
//                               {flight.FlightCompany || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="text-center">
//                                 <div className="text-sm font-semibold text-gray-900">
//                                   {flight.FlightDepcode || 'N/A'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {flight.FlightDep || 'N/A'}
//                                 </div>
//                               </div>
//                               <div className="mx-4">
//                                 <ChevronRight className="w-4 h-4 text-gray-400" />
//                               </div>
//                               <div className="text-center">
//                                 <div className="text-sm font-semibold text-gray-900">
//                                   {flight.FlightArrcode || 'N/A'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {flight.FlightArr || 'N/A'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">
//                               {flight.FlightDeptime || 'N/A'} - {flight.FlightArrtime || 'N/A'}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               Duration: {flight.FlightDuration || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 ${getStatusColor(flight.FlightState)}`}>
//                               {getStatusIcon(flight.FlightState)}
//                               {flight.FlightState || 'Unknown'}
//                             </div>
//                             {flight.FlightRemark && (
//                               <div className="text-xs text-gray-500 mt-1">
//                                 {flight.FlightRemark}
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : !loading && !error ? (
//                   <div className="text-center py-16">
//                     <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <Plane className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
//                     <p className="text-gray-500 max-w-md mx-auto">
//                       Enter search criteria and click "Search Flights" to find flight information.
//                     </p>
//                   </div>
//                 ) : loading ? (
//                   <div className="text-center py-16">
//                     <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
//                       <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Searching flights...</h3>
//                     <p className="text-gray-500">Fetching real-time flight information</p>
//                   </div>
//                 ) : null}
//               </div>

//               {/* Pagination for board/time searches */}
//               {(form.type === "board" || form.type === "time") && results.length > 0 && (
//                 <div className="px-6 py-4 border-t bg-gray-50">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm text-gray-700">
//                       Showing page {form.page} of results
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => setForm({ ...form, page: Math.max(1, form.page - 1) })}
//                         disabled={form.page <= 1}
//                         className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Previous
//                       </button>
//                       <button
//                         onClick={() => setForm({ ...form, page: form.page + 1 })}
//                         className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Stats Card */}
//             {results.length > 0 && (
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-blue-700 font-medium">Total Flights</p>
//                       <p className="text-2xl font-bold text-blue-900 mt-1">{results.length}</p>
//                     </div>
//                     <Plane className="w-8 h-8 text-blue-600" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-green-700 font-medium">On Time</p>
//                       <p className="text-2xl font-bold text-green-900 mt-1">
//                         {results.filter(f => f.FlightState?.toLowerCase().includes('ontime') || f.FlightState?.toLowerCase().includes('scheduled')).length}
//                       </p>
//                     </div>
//                     <CheckCircle className="w-8 h-8 text-green-600" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-yellow-700 font-medium">Delayed</p>
//                       <p className="text-2xl font-bold text-yellow-900 mt-1">
//                         {results.filter(f => f.FlightState?.toLowerCase().includes('delayed')).length}
//                       </p>
//                     </div>
//                     <Clock className="w-8 h-8 text-yellow-600" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//==========grok===========

// import { useState } from 'react';
// import { Plane, Calendar, Search, Loader2 } from 'lucide-react';

// const API_BASE = "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api";

// export default function FlightStatusChecker() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: new Date().toISOString().split('T')[0],
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       const params = new URLSearchParams();
//       params.append("type", form.type);
//       params.append("date", form.date);

//       if (form.type === "airport") {
//         if (!form.dep || !form.arr) throw new Error("Departure & Arrival airports required");
//         params.append("dep", form.dep.toUpperCase());
//         params.append("arr", form.arr.toUpperCase());
//       }

//       if (form.type === "flight") {
//         if (!form.fnum) throw new Error("Flight number required");
//         params.append("fnum", form.fnum.toUpperCase());
//       }

//       if (form.type === "city") {
//         if (!form.depcity || !form.arrcity) throw new Error("Departure & Arrival cities required");
//         params.append("depcity", form.depcity);
//         params.append("arrcity", form.arrcity);
//       }

//       const response = await fetch(`${API_BASE}/flight-status?${params}`);
//       const data = await response.json();

//       if (!data.success) {
//         throw new Error(data.message || "Failed to fetch flight status");
//       }

//       setResults(data.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     const s = (status || "").toLowerCase();
//     if (s.includes("on time") || s.includes("scheduled")) return "text-emerald-600 bg-emerald-50";
//     if (s.includes("delayed")) return "text-amber-600 bg-amber-50";
//     if (s.includes("cancelled") || s.includes("canceled")) return "text-red-600 bg-red-50";
//     return "text-gray-600 bg-gray-50";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-4">
//             <Plane size={32} />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Flight Status Tracker
//           </h1>
//           <p className="text-lg text-gray-600">
//             Real-time flight information • Airport • Flight Number • City
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           {/* Form Section */}
//           <div className="p-6 lg:p-8 border-b border-gray-100">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               {/* Search Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Search Type
//                 </label>
//                 <select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                 >
//                   <option value="airport">Airport → Airport</option>
//                   <option value="flight">Flight Number</option>
//                   <option value="city">City → City</option>
//                 </select>
//               </div>

//               {/* Conditional fields */}
//               {form.type === "airport" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                     <input
//                       name="dep"
//                       maxLength={3}
//                       placeholder="DEL"
//                       value={form.dep}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                     <input
//                       name="arr"
//                       maxLength={3}
//                       placeholder="DXB"
//                       value={form.arr}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
//                     />
//                   </div>
//                 </>
//               )}

//               {form.type === "flight" && (
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Flight Number
//                   </label>
//                   <input
//                     name="fnum"
//                     placeholder="EK513 / AI101"
//                     value={form.fnum}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
//                   />
//                 </div>
//               )}

//               {form.type === "city" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From City</label>
//                     <input
//                       name="depcity"
//                       placeholder="Delhi"
//                       value={form.depcity}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To City</label>
//                     <input
//                       name="arrcity"
//                       placeholder="Dubai"
//                       value={form.arrcity}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                 </>
//               )}

//               {/* Date - always visible */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date
//                 </label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="date"
//                     name="date"
//                     value={form.date}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <button
//                 onClick={fetchFlights}
//                 disabled={loading}
//                 className={`
//                   w-full sm:w-auto flex items-center justify-center gap-2
//                   px-8 py-3 bg-indigo-600 text-white font-medium
//                   rounded-lg shadow-md hover:bg-indigo-700
//                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
//                   disabled:opacity-60 disabled:cursor-not-allowed
//                   transition-all duration-200
//                 `}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search size={18} />
//                     Search Flights
//                   </>
//                 )}
//               </button>
//             </div>

//             {error && (
//               <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* Results Section */}
//           {results.length > 0 && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Flight
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Airline
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Departure
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Arrival
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {results.map((flight, index) => (
//                     <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                         {flight.FlightNo}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                         {flight.FlightCompany}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-gray-900">{flight.FlightDepcode}</div>
//                         <div className="text-sm text-gray-500">
//                           {flight.FlightDeptimePlanDate || '—'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-gray-900">{flight.FlightArrcode}</div>
//                         <div className="text-sm text-gray-500">
//                           {flight.FlightArrtimePlanDate || '—'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flight.FlightState)}`}>
//                           {flight.FlightState || 'Unknown'}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {results.length === 0 && !loading && !error && form.date && (
//             <div className="p-12 text-center text-gray-500">
//               <Plane className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <p className="text-lg">No flights found for the selected criteria</p>
//               <p className="mt-2">Try different airports, date or search type</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 text-center text-sm text-gray-500">
//           Data provided by FareBuzzer Travel • {new Date().getFullYear()}
//         </div>
//       </div>
//     </div>
//   );
// }

//----correct


// import { useState } from 'react';
// import { Plane, Calendar, Search, Loader2 } from 'lucide-react';
// import API from "../api/axios"; // assuming this is your axios instance

// export default function FlightStatusChecker() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: "2026-01-20", // ← more useful for testing (future date)
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       const params = {
//         type: form.type,
//         date: form.date,
//       };

//       if (form.type === "airport") {
//         if (!form.dep || !form.arr) throw new Error("Departure & Arrival airports are required");
//         params.dep = form.dep.toUpperCase().trim();
//         params.arr = form.arr.toUpperCase().trim();
//       }

//       if (form.type === "flight") {
//         if (!form.fnum) throw new Error("Flight number is required");
//         params.fnum = form.fnum.toUpperCase().trim();
//       }

//       if (form.type === "city") {
//         if (!form.depcity || !form.arrcity) throw new Error("Departure & Arrival cities are required");
//         params.depcity = form.depcity.trim();
//         params.arrcity = form.arrcity.trim();
//       }

//       const response = await API.get("/flight-status", { params });

//       if (!response.data?.success) {
//         throw new Error(response.data?.message || "Failed to fetch flight status");
//       }

//       setResults(response.data.data || []);
//     } catch (err) {
//       console.error("Flight status error:", err);
//       setError(err.response?.data?.message || err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     const s = (status || "").toLowerCase();
//     if (s.includes("on time") || s.includes("scheduled")) return "text-emerald-700 bg-emerald-50";
//     if (s.includes("delayed")) return "text-amber-700 bg-amber-50";
//     if (s.includes("cancelled") || s.includes("canceled")) return "text-red-700 bg-red-50";
//     return "text-gray-700 bg-gray-100";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-4">
//             <Plane size={32} />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Flight Status Tracker</h1>
//           <p className="text-lg text-gray-600">
//             Real-time flight information • Airport • Flight • City
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="p-6 lg:p-8 border-b border-gray-100">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
//                 <select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                   className="cursor-pointer w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="airport">Airport → Airport</option>
//                   <option value="flight">Flight Number</option>
//                   <option value="city">City → City</option>
//                 </select>
//               </div>

//               {form.type === "airport" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                     <input
//                       name="dep"
//                       maxLength={3}
//                       placeholder="DEL"
//                       value={form.dep}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase tracking-wider"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                     <input
//                       name="arr"
//                       maxLength={3}
//                       placeholder="DXB"
//                       value={form.arr}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase tracking-wider"
//                     />
//                   </div>
//                 </>
//               )}

//               {form.type === "flight" && (
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
//                   <input
//                     name="fnum"
//                     placeholder="EK513 / AI101 / 6E215"
//                     value={form.fnum}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase tracking-wider"
//                   />
//                 </div>
//               )}

//               {form.type === "city" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From City</label>
//                     <input
//                       name="depcity"
//                       placeholder="Delhi"
//                       value={form.depcity}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To City</label>
//                     <input
//                       name="arrcity"
//                       placeholder="Dubai"
//                       value={form.arrcity}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                 </>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                 <div className="relative">
//                   <Calendar
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                     size={18}
//                   />
//                   <input
//                     type="date"
//                     name="date"
//                     value={form.date}
//                     onChange={handleChange}
//                     className="cursor-pointer w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <button
//                 onClick={fetchFlights}
//                 disabled={loading}
//                 className={`
//                   w-full sm:w-auto flex items-center justify-center gap-2
//                   px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg
//                   shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 
//                   focus:ring-indigo-500 focus:ring-offset-2
//                   disabled:opacity-60 disabled:cursor-not-allowed
//                   transition-all duration-200 cursor-pointer
//                 `}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search size={18} />
//                     Search Flights
//                   </>
//                 )}
//               </button>
//             </div>

//             {error && (
//               <div className="mt-5 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* RESULTS */}
//           {results.length > 0 && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Flight
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Airline
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Departure
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Arrival
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {results.map((flight, index) => (
//                     <tr key={index} className="hover:bg-indigo-50/40 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                         {flight.FlightNo || "—"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                         {flight.FlightCompany || "—"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">{flight.FlightDepcode || "—"}</div>
//                         <div className="text-sm text-gray-500">
//                           {flight.FlightDeptimePlanDate || "—"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">{flight.FlightArrcode || "—"}</div>
//                         <div className="text-sm text-gray-500">
//                           {flight.FlightArrtimePlanDate || "—"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
//                             flight.FlightState
//                           )}`}
//                         >
//                           {flight.FlightState || "Unknown"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {results.length === 0 && !loading && !error && form.date && (
//             <div className="p-16 text-center text-gray-500">
//               <Plane className="mx-auto h-14 w-14 text-gray-300 mb-6" />
//               <p className="text-xl font-medium text-gray-600 mb-2">
//                 No flights found
//               </p>
//               <p>Try changing airports, date or search type</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-10 text-center text-sm text-gray-500">
//           Data provided by FareBuzzer Travel • {new Date().getFullYear()}
//         </div>
//       </div>
//     </div>
//   );
// }










//----when i type keyword then automatic suggesion should be display deepsake-------CORRECT(SERACH BY AIRPORT NAME,CITY NAME,FLIGHT NUMBER)---


import { useState, useEffect, useRef, useCallback } from "react";
import API from "../api/axios";
import {
  Plane,
  Search,
  Calendar,
  MapPin,
  Clock,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Users,
  Building,
  Navigation,
  ChevronDown,
  X
} from "lucide-react";

// Airport database with IATA codes, names, and cities
const airportDatabase = [
  // Major Indian Airports
  { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India" },
  { code: "BLR", name: "Kempegowda International Airport", city: "Bengaluru", country: "India" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India" },
  { code: "CCU", name: "Netaji Subhash Chandra Bose International Airport", city: "Kolkata", country: "India" },
  { code: "GOI", name: "Dabolim Airport", city: "Goa", country: "India" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", country: "India" },
  { code: "PNQ", name: "Pune Airport", city: "Pune", country: "India" },
  { code: "COK", name: "Cochin International Airport", city: "Kochi", country: "India" },
  
  // International Airports
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
  { code: "LHR", name: "London Heathrow Airport", city: "London", country: "UK" },
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
  { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar" },
  { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "UAE" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain" },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy" },
  
  // Additional major airports
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "USA" },
  { code: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "USA" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "USA" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" },
  { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China" },
  { code: "CAN", name: "Guangzhou Baiyun International Airport", city: "Guangzhou", country: "China" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "USA" },
  { code: "SEA", name: "Seattle–Tacoma International Airport", city: "Seattle", country: "USA" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "USA" },
  { code: "YYC", name: "Calgary International Airport", city: "Calgary", country: "Canada" },
  { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada" },
  { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand" },
  { code: "WLG", name: "Wellington Airport", city: "Wellington", country: "New Zealand" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark" },
  { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden" },
  { code: "OSL", name: "Oslo Airport", city: "Oslo", country: "Norway" },
  { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
  { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria" },
  { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium" },
  { code: "LIS", name: "Lisbon Airport", city: "Lisbon", country: "Portugal" },
  { code: "ATH", name: "Athens International Airport", city: "Athens", country: "Greece" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
  { code: "MAN", name: "Manchester Airport", city: "Manchester", country: "UK" },
  { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "UK" },
  { code: "GLA", name: "Glasgow Airport", city: "Glasgow", country: "UK" },
  { code: "BHX", name: "Birmingham Airport", city: "Birmingham", country: "UK" },
];

// Airport Input Component with Autocomplete
const AirportInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Type airport code or name...",
  className = "",
  disabled = false
}) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Filter airports based on query
  const filterAirports = useCallback((searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const queryLower = searchQuery.toLowerCase();
    const filtered = airportDatabase.filter(airport => 
      airport.code.toLowerCase().includes(queryLower) ||
      airport.name.toLowerCase().includes(queryLower) ||
      airport.city.toLowerCase().includes(queryLower) ||
      airport.country.toLowerCase().includes(queryLower)
    ).slice(0, 8); // Limit to 8 suggestions

    setSuggestions(filtered);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterAirports(query);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query, filterAirports]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    setShowSuggestions(true);
  };

  const handleSelectAirport = (airport) => {
    const displayValue = `${airport.code} - ${airport.city}`;
    setQuery(displayValue);
    onChange(airport.code);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Keep suggestions open for a moment to allow selection
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const getDisplayValue = () => {
    if (!value) return query;
    
    const airport = airportDatabase.find(a => a.code === value);
    if (airport) {
      return `${airport.code} - ${airport.city}`;
    }
    return value;
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-2.5 bg-gray-50 border ${isFocused ? 'border-blue-500' : 'border-gray-300'} rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${className}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          <div className="p-2 border-b">
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{suggestions.length} airports found</span>
            </div>
          </div>
          {suggestions.map((airport, index) => (
            <button
              key={`${airport.code}-${index}`}
              type="button"
              onClick={() => handleSelectAirport(airport)}
              className="w-full text-left p-3 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-baseline">
                    <span className="font-semibold text-gray-900">{airport.code}</span>
                    <span className="ml-2 text-sm text-gray-500">•</span>
                    <span className="ml-2 font-medium text-gray-900">{airport.city}</span>
                    <span className="ml-2 text-xs text-gray-400">{airport.country}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">{airport.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No suggestions message */}
      {showSuggestions && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <div className="flex flex-col items-center text-gray-500">
            <MapPin className="w-8 h-8 mb-2" />
            <p className="text-sm">No airports found for "{query}"</p>
            <p className="text-xs mt-1">Try airport code (DEL) or city name</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function FlightStatusChecker() {
  const [form, setForm] = useState({
    type: "airport",
    dep: "DEL",
    arr: "DXB",
    fnum: "",
    depcity: "",
    arrcity: "",
    date: new Date().toISOString().split('T')[0],
    airport: "DEL",
    status: "dep",
    startAt: "06:00",
    endAt: "22:00",
    page: 1,
    perpage: 20
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Track if user has searched

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAirportChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower?.includes('scheduled') || statusLower?.includes('ontime')) return 'bg-blue-100 text-blue-800';
    if (statusLower?.includes('departed') || statusLower?.includes('enroute')) return 'bg-purple-100 text-purple-800';
    if (statusLower?.includes('arrived') || statusLower?.includes('landed')) return 'bg-green-100 text-green-800';
    if (statusLower?.includes('delayed') || statusLower?.includes('late')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower?.includes('cancelled') || statusLower?.includes('diverted')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower?.includes('arrived')) return <CheckCircle className="w-4 h-4" />;
    if (statusLower?.includes('delayed')) return <Clock className="w-4 h-4" />;
    if (statusLower?.includes('cancelled')) return <XCircle className="w-4 h-4" />;
    return <Plane className="w-4 h-4" />;
  };

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError("");
      setResults([]);

      const params = {
        type: form.type,
        date: form.date,
      };

      // Add parameters based on search type
      switch (form.type) {
        case "airport":
          if (!form.dep || !form.arr) {
            setError("Please select both departure and arrival airports");
            setLoading(false);
            return;
          }
          params.dep = form.dep.toUpperCase();
          params.arr = form.arr.toUpperCase();
          break;
        case "flight":
          if (!form.fnum) {
            setError("Please enter a flight number");
            setLoading(false);
            return;
          }
          params.fnum = form.fnum.toUpperCase();
          break;
        case "city":
          if (!form.depcity || !form.arrcity) {
            setError("Please enter both departure and arrival cities");
            setLoading(false);
            return;
          }
          params.depcity = form.depcity;
          params.arrcity = form.arrcity;
          break;
        case "board":
          if (!form.airport) {
            setError("Please select an airport");
            setLoading(false);
            return;
          }
          params.airport = form.airport.toUpperCase();
          params.status = form.status;
          params.page = form.page;
          params.perpage = form.perpage;
          break;
        case "time":
          if (!form.airport) {
            setError("Please select an airport");
            setLoading(false);
            return;
          }
          params.airport = form.airport.toUpperCase();
          params.status = form.status;
          params.startAt = form.startAt;
          params.endAt = form.endAt;
          params.page = form.page;
          params.perpage = form.perpage;
          break;
        default:
          break;
      }

      const res = await API.get("/flight-status", { params });

      if (!res.data.success) {
        throw new Error(res.data.message || "API Error");
      }

      setResults(res.data.data || []);
      setHasSearched(true); // Mark that user has performed a search
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch flight data");
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      type: "airport",
      dep: "DEL",
      arr: "DXB",
      fnum: "",
      depcity: "",
      arrcity: "",
      date: new Date().toISOString().split('T')[0],
      airport: "DEL",
      status: "dep",
      startAt: "06:00",
      endAt: "22:00",
      page: 1,
      perpage: 20
    });
    setResults([]);
    setError("");
    setHasSearched(false); // Reset search state
  };

  // REMOVED: Auto-search useEffect that was causing automatic API calls

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Flight Status Tracker</h1>
              <p className="text-gray-600 mt-1">Real-time flight information with airport autocomplete</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Search Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Flights
                </h2>
                <button
                  onClick={resetForm}
                  className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Search Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { value: "airport", label: "Airport", icon: <Navigation className="w-4 h-4" /> },
                    { value: "flight", label: "Flight", icon: <Plane className="w-4 h-4" /> },
                    { value: "city", label: "City", icon: <Building className="w-4 h-4" /> },
                    // { value: "board", label: "Board", icon: <Filter className="w-4 h-4" /> },
                    // { value: "time", label: "Time", icon: <Clock className="w-4 h-4" /> },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setForm({ ...form, type: option.value })}
                      className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${form.type === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {option.icon}
                      <span className="text-xs mt-1 font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Fields based on Type */}
              <div className="space-y-4 mb-6">
                {form.type === "airport" && (
                  <>
                    <AirportInput
                      label="Departure Airport"
                      value={form.dep}
                      onChange={(value) => handleAirportChange("dep", value)}
                      placeholder="Search departure airport..."
                    />
                    <AirportInput
                      label="Arrival Airport"
                      value={form.arr}
                      onChange={(value) => handleAirportChange("arr", value)}
                      placeholder="Search arrival airport..."
                    />
                  </>
                )}

                {form.type === "flight" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Plane className="w-4 h-4" />
                      Flight Number
                    </label>
                    <input
                      name="fnum"
                      value={form.fnum}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., EK513"
                    />
                  </div>
                )}

                {form.type === "city" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departure City
                      </label>
                      <input
                        name="depcity"
                        value={form.depcity}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Delhi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Arrival City
                      </label>
                      <input
                        name="arrcity"
                        value={form.arrcity}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Dubai"
                      />
                    </div>
                  </>
                )}

                {(form.type === "board" || form.type === "time") && (
                  <>
                    <AirportInput
                      label="Airport Code"
                      value={form.airport}
                      onChange={(value) => handleAirportChange("airport", value)}
                      placeholder="Search airport..."
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status Type
                      </label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="dep">Departures</option>
                        <option value="arr">Arrivals</option>
                      </select>
                    </div>
                  </>
                )}

                {form.type === "time" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startAt"
                        value={form.startAt}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endAt"
                        value={form.endAt}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Date Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="cursor-pointer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Advanced Options Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="cursor-pointer flex items-center justify-between w-full mb-4 text-sm text-gray-600 hover:text-gray-900"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Options
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
              </button>

              {showAdvanced && (
                <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Page
                      </label>
                      <input
                        type="number"
                        name="page"
                        value={form.page}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Per Page
                      </label>
                      <input
                        type="number"
                        name="perpage"
                        value={form.perpage}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Search Button */}
              <button
                onClick={fetchFlights}
                disabled={loading}
                className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search Flights
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Results Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Flight Results
                      {results.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          ({results.length} flights found)
                        </span>
                      )}
                    </h2>
                    {results.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        Showing flights for {form.date}
                        {form.type === "airport" && form.dep && form.arr && (
                          <span className="font-medium ml-1">
                            • {form.dep} → {form.arr}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  {results.length > 0 && (
                    <button
                      onClick={fetchFlights}
                      disabled={loading}
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </button>
                  )}
                </div>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                {results.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Flight
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Airline
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Route
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Times
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.map((flight, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                  <Plane className="w-5 h-5 text-blue-600" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {flight.FlightNo || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.FlightCompany || 'Unknown Airline'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {flight.FlightCompany || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="text-center">
                                <div className="text-sm font-semibold text-gray-900">
                                  {flight.FlightDepcode || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.FlightDep || 'N/A'}
                                </div>
                              </div>
                              <div className="mx-4">
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold text-gray-900">
                                  {flight.FlightArrcode || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.FlightArr || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {flight.FlightDeptime || 'N/A'} - {flight.FlightArrtime || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Duration: {flight.FlightDuration || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 ${getStatusColor(flight.FlightState)}`}>
                              {getStatusIcon(flight.FlightState)}
                              {flight.FlightState || 'Unknown'}
                            </div>
                            {flight.FlightRemark && (
                              <div className="text-xs text-gray-500 mt-1">
                                {flight.FlightRemark}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : !loading && !error && hasSearched ? (
                  // Show this only after user has searched and found no results
                  <div className="text-center py-16">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Plane className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      No flights match your search criteria. Try different airports or dates.
                    </p>
                  </div>
                ) : !loading && !error && !hasSearched ? (
                  // Initial state - before any search
                  <div className="text-center py-16">
                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Search</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Enter your search criteria and click "Search Flights" to find flight information.
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Navigation className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-600">Airport Search</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Plane className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-600">Flight Number</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        {/* <p className="text-xs text-gray-600">Time-based</p> */}
                        <p className="text-xs text-gray-600">City Search</p>

                      </div>
                    </div>
                  </div>
                ) : loading ? (
                  <div className="text-center py-16">
                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Searching flights...</h3>
                    <p className="text-gray-500">Fetching real-time flight information</p>
                  </div>
                ) : null}
              </div>

              {/* Pagination for board/time searches */}
              {(form.type === "board" || form.type === "time") && results.length > 0 && (
                <div className="px-6 py-4 border-t bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing page {form.page} of results
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setForm({ ...form, page: Math.max(1, form.page - 1) });
                          fetchFlights();
                        }}
                        disabled={form.page <= 1 || loading}
                        className="cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => {
                          setForm({ ...form, page: form.page + 1 });
                          fetchFlights();
                        }}
                        disabled={loading}
                        className="cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Card */}
            {results.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Total Flights</p>
                      <p className="text-2xl font-bold text-blue-900 mt-1">{results.length}</p>
                    </div>
                    <Plane className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 font-medium">On Time</p>
                      <p className="text-2xl font-bold text-green-900 mt-1">
                        {results.filter(f => f.FlightState?.toLowerCase().includes('ontime') || f.FlightState?.toLowerCase().includes('scheduled')).length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-700 font-medium">Delayed</p>
                      <p className="text-2xl font-bold text-yellow-900 mt-1">
                        {results.filter(f => f.FlightState?.toLowerCase().includes('delayed')).length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



//---------------------search by Airport name, Flight number, city name is workinng only   search by board and time is not working----------


// import { useState, useEffect, useRef, useCallback } from "react";
// import API from "../api/axios";
// import {
//   Plane,
//   Search,
//   Calendar,
//   MapPin,
//   Clock,
//   Filter,
//   RefreshCw,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   ChevronRight,
//   Users,
//   Building,
//   Navigation,
//   ChevronDown,
//   X
// } from "lucide-react";

// // Airport database with IATA codes, names, and cities
// const airportDatabase = [
//   // Major Indian Airports
//   { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India" },
//   { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
//   { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India" },
//   { code: "BLR", name: "Kempegowda International Airport", city: "Bengaluru", country: "India" },
//   { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India" },
//   { code: "CCU", name: "Netaji Subhash Chandra Bose International Airport", city: "Kolkata", country: "India" },
//   { code: "GOI", name: "Dabolim Airport", city: "Goa", country: "India" },
//   { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", country: "India" },
//   { code: "PNQ", name: "Pune Airport", city: "Pune", country: "India" },
//   { code: "COK", name: "Cochin International Airport", city: "Kochi", country: "India" },
  
//   // International Airports
//   { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
//   { code: "LHR", name: "London Heathrow Airport", city: "London", country: "UK" },
//   { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
//   { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
//   { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
//   { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
//   { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
//   { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
//   { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
//   { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
//   { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
//   { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
//   { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
//   { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia" },
//   { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
//   { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar" },
//   { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "UAE" },
//   { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
//   { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain" },
//   { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy" },
  
//   // Additional major airports
//   { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "USA" },
//   { code: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "USA" },
//   { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "USA" },
//   { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" },
//   { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China" },
//   { code: "CAN", name: "Guangzhou Baiyun International Airport", city: "Guangzhou", country: "China" },
//   { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "USA" },
//   { code: "SEA", name: "Seattle–Tacoma International Airport", city: "Seattle", country: "USA" },
//   { code: "MIA", name: "Miami International Airport", city: "Miami", country: "USA" },
//   { code: "YYC", name: "Calgary International Airport", city: "Calgary", country: "Canada" },
//   { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada" },
//   { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand" },
//   { code: "WLG", name: "Wellington Airport", city: "Wellington", country: "New Zealand" },
//   { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark" },
//   { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden" },
//   { code: "OSL", name: "Oslo Airport", city: "Oslo", country: "Norway" },
//   { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland" },
//   { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
//   { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria" },
//   { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium" },
//   { code: "LIS", name: "Lisbon Airport", city: "Lisbon", country: "Portugal" },
//   { code: "ATH", name: "Athens International Airport", city: "Athens", country: "Greece" },
//   { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
//   { code: "MAN", name: "Manchester Airport", city: "Manchester", country: "UK" },
//   { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "UK" },
//   { code: "GLA", name: "Glasgow Airport", city: "Glasgow", country: "UK" },
//   { code: "BHX", name: "Birmingham Airport", city: "Birmingham", country: "UK" },
// ];

// // Airport Input Component with Autocomplete
// const AirportInput = ({ 
//   label, 
//   value, 
//   onChange, 
//   placeholder = "Type airport code or name...",
//   className = "",
//   disabled = false
// }) => {
//   const [query, setQuery] = useState(value || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const containerRef = useRef(null);
//   const inputRef = useRef(null);

//   // Filter airports based on query
//   const filterAirports = useCallback((searchQuery) => {
//     if (!searchQuery || searchQuery.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     const queryLower = searchQuery.toLowerCase();
//     const filtered = airportDatabase.filter(airport => 
//       airport.code.toLowerCase().includes(queryLower) ||
//       airport.name.toLowerCase().includes(queryLower) ||
//       airport.city.toLowerCase().includes(queryLower) ||
//       airport.country.toLowerCase().includes(queryLower)
//     ).slice(0, 8); // Limit to 8 suggestions

//     setSuggestions(filtered);
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       filterAirports(query);
//     }, 150);

//     return () => clearTimeout(timeoutId);
//   }, [query, filterAirports]);

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     setQuery(newValue);
    
//     // Extract airport code if format is "DEL - Delhi"
//     const match = newValue.match(/^([A-Z]{3}) - .+/);
//     if (match) {
//       onChange(match[1]); // Send only the code
//     } else if (airportDatabase.find(a => a.code === newValue.toUpperCase())) {
//       onChange(newValue.toUpperCase());
//     } else {
//       onChange(newValue);
//     }
    
//     setShowSuggestions(true);
//   };

//   const handleSelectAirport = (airport) => {
//     const displayValue = `${airport.code} - ${airport.city}`;
//     setQuery(displayValue);
//     onChange(airport.code);
//     setShowSuggestions(false);
//     inputRef.current?.focus();
//   };

//   const handleClear = () => {
//     setQuery("");
//     onChange("");
//     inputRef.current?.focus();
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//     if (query.length >= 2) {
//       setShowSuggestions(true);
//     }
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//     setTimeout(() => setShowSuggestions(false), 200);
//   };

//   const getDisplayValue = () => {
//     if (!value) return query;
    
//     const airport = airportDatabase.find(a => a.code === value.toUpperCase());
//     if (airport) {
//       return `${airport.code} - ${airport.city}`;
//     }
//     return value;
//   };

//   return (
//     <div className="relative" ref={containerRef}>
//       <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//         <MapPin className="w-4 h-4" />
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           ref={inputRef}
//           type="text"
//           value={getDisplayValue()}
//           onChange={handleInputChange}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`w-full px-4 py-2.5 bg-gray-50 border ${isFocused ? 'border-blue-500' : 'border-gray-300'} rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${className}`}
//         />
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
//           {query && (
//             <button
//               type="button"
//               onClick={handleClear}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           )}
//           <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {/* Suggestions Dropdown */}
//       {showSuggestions && suggestions.length > 0 && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
//           <div className="p-2 border-b">
//             <div className="flex items-center text-xs text-gray-500">
//               <MapPin className="w-3 h-3 mr-1" />
//               <span>{suggestions.length} airports found</span>
//             </div>
//           </div>
//           {suggestions.map((airport, index) => (
//             <button
//               key={`${airport.code}-${index}`}
//               type="button"
//               onClick={() => handleSelectAirport(airport)}
//               className="w-full text-left p-3 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-b-0"
//             >
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 mt-1">
//                   <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
//                     <Plane className="w-4 h-4 text-blue-600" />
//                   </div>
//                 </div>
//                 <div className="ml-3 flex-1">
//                   <div className="flex items-baseline">
//                     <span className="font-semibold text-gray-900">{airport.code}</span>
//                     <span className="ml-2 text-sm text-gray-500">•</span>
//                     <span className="ml-2 font-medium text-gray-900">{airport.city}</span>
//                     <span className="ml-2 text-xs text-gray-400">{airport.country}</span>
//                   </div>
//                   <p className="text-xs text-gray-500 truncate mt-1">{airport.name}</p>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* No suggestions message */}
//       {showSuggestions && query.length >= 2 && suggestions.length === 0 && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
//           <div className="flex flex-col items-center text-gray-500">
//             <MapPin className="w-8 h-8 mb-2" />
//             <p className="text-sm">No airports found for "{query}"</p>
//             <p className="text-xs mt-1">Try airport code (DEL) or city name</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function FlightStatusChecker() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: new Date().toISOString().split('T')[0],
//     airport: "DEL",
//     status: "departure", // CHANGED from "dep" to "departure"
//     startAt: "0600", // CHANGED from "06:00" to "0600"
//     endAt: "2200",   // CHANGED from "22:00" to "2200"
//     page: 1,
//     perpage: 20
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Handle time inputs - convert HH:MM to HHMM format
//     if (name === "startAt" || name === "endAt") {
//       // If input is in HH:MM format, convert to HHMM
//       let formattedValue = value;
//       if (value.includes(':')) {
//         formattedValue = value.replace(':', '');
//       }
//       setForm({ ...form, [name]: formattedValue });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleAirportChange = (field, value) => {
//     setForm({ ...form, [field]: value.toUpperCase() });
//   };

//   const getStatusColor = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower?.includes('scheduled') || statusLower?.includes('ontime')) return 'bg-blue-100 text-blue-800';
//     if (statusLower?.includes('departed') || statusLower?.includes('enroute')) return 'bg-purple-100 text-purple-800';
//     if (statusLower?.includes('arrived') || statusLower?.includes('landed')) return 'bg-green-100 text-green-800';
//     if (statusLower?.includes('delayed') || statusLower?.includes('late')) return 'bg-yellow-100 text-yellow-800';
//     if (statusLower?.includes('cancelled') || statusLower?.includes('diverted')) return 'bg-red-100 text-red-800';
//     return 'bg-gray-100 text-gray-800';
//   };

//   const getStatusIcon = (status) => {
//     const statusLower = status?.toLowerCase();
//     if (statusLower?.includes('arrived')) return <CheckCircle className="w-4 h-4" />;
//     if (statusLower?.includes('delayed')) return <Clock className="w-4 h-4" />;
//     if (statusLower?.includes('cancelled')) return <XCircle className="w-4 h-4" />;
//     return <Plane className="w-4 h-4" />;
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       const params = {
//         type: form.type,
//         date: form.date,
//       };

//       // Add parameters based on search type
//       switch (form.type) {
//         case "airport":
//           if (!form.dep || !form.arr) {
//             setError("Please select both departure and arrival airports");
//             setLoading(false);
//             return;
//           }
//           params.dep = form.dep.toUpperCase();
//           params.arr = form.arr.toUpperCase();
//           break;
          
//         case "flight":
//           if (!form.fnum) {
//             setError("Please enter a flight number");
//             setLoading(false);
//             return;
//           }
//           params.fnum = form.fnum.toUpperCase();
//           break;
          
//         case "city":
//           if (!form.depcity || !form.arrcity) {
//             setError("Please enter both departure and arrival cities");
//             setLoading(false);
//             return;
//           }
//           params.depcity = form.depcity;
//           params.arrcity = form.arrcity;
//           break;
          
//         case "board":
//           if (!form.airport) {
//             setError("Please select an airport");
//             setLoading(false);
//             return;
//           }
//           params.airport = form.airport.toUpperCase();
//           params.status = form.status; // Should be "departure" or "arrival"
//           params.page = form.page;
//           params.perpage = form.perpage;
//           break;
          
//         case "time":
//           if (!form.airport) {
//             setError("Please select an airport");
//             setLoading(false);
//             return;
//           }
          
//           // Validate time format
//           if (!form.startAt || !form.endAt || form.startAt.length !== 4 || form.endAt.length !== 4) {
//             setError("Please enter valid times in HHMM format (e.g., 0600, 2200)");
//             setLoading(false);
//             return;
//           }
          
//           params.airport = form.airport.toUpperCase();
//           params.status = form.status; // Should be "departure" or "arrival"
//           params.startAt = form.startAt;
//           params.endAt = form.endAt;
//           params.page = form.page;
//           params.perpage = form.perpage;
//           break;
          
//         default:
//           break;
//       }

//       const res = await API.get("/flight-status", { params });

//       if (!res.data.success) {
//         throw new Error(res.data.message || "API Error");
//       }

//       setResults(res.data.data || []);
//       setHasSearched(true);
      
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to fetch flight data");
//       setHasSearched(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       type: "airport",
//       dep: "DEL",
//       arr: "DXB",
//       fnum: "",
//       depcity: "",
//       arrcity: "",
//       date: new Date().toISOString().split('T')[0],
//       airport: "DEL",
//       status: "departure",
//       startAt: "0600",
//       endAt: "2200",
//       page: 1,
//       perpage: 20
//     });
//     setResults([]);
//     setError("");
//     setHasSearched(false);
//   };

//   // Format time for display in input (HHMM to HH:MM)
//   const formatTimeForInput = (time) => {
//     if (!time) return "";
//     if (time.includes(':')) return time; // Already formatted
    
//     // Convert "0600" to "06:00"
//     const hours = time.slice(0, 2);
//     const minutes = time.slice(2, 4);
//     return `${hours}:${minutes}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
//               <Plane className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Flight Status Tracker</h1>
//               <p className="text-gray-600 mt-1">Real-time flight information with airport autocomplete</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Panel - Search Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <Search className="w-5 h-5" />
//                   Search Flights
//                 </h2>
//                 <button
//                   onClick={resetForm}
//                   className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   Reset
//                 </button>
//               </div>

//               {/* Search Type */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Search Type
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {[
//                     { value: "airport", label: "Airport", icon: <Navigation className="w-4 h-4" /> },
//                     { value: "flight", label: "Flight", icon: <Plane className="w-4 h-4" /> },
//                     { value: "city", label: "City", icon: <Building className="w-4 h-4" /> },
//                     { value: "board", label: "Board", icon: <Filter className="w-4 h-4" /> },
//                     { value: "time", label: "Time", icon: <Clock className="w-4 h-4" /> },
//                   ].map((option) => (
//                     <button
//                       key={option.value}
//                       type="button"
//                       onClick={() => setForm({ ...form, type: option.value })}
//                       className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${form.type === option.value
//                           ? 'border-blue-500 bg-blue-50 text-blue-700'
//                           : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                         }`}
//                     >
//                       {option.icon}
//                       <span className="text-xs mt-1 font-medium">{option.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Dynamic Fields based on Type */}
//               <div className="space-y-4 mb-6">
//                 {form.type === "airport" && (
//                   <>
//                     <AirportInput
//                       label="Departure Airport"
//                       value={form.dep}
//                       onChange={(value) => handleAirportChange("dep", value)}
//                       placeholder="Search departure airport..."
//                     />
//                     <AirportInput
//                       label="Arrival Airport"
//                       value={form.arr}
//                       onChange={(value) => handleAirportChange("arr", value)}
//                       placeholder="Search arrival airport..."
//                     />
//                   </>
//                 )}

//                 {form.type === "flight" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                       <Plane className="w-4 h-4" />
//                       Flight Number
//                     </label>
//                     <input
//                       name="fnum"
//                       value={form.fnum}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="e.g., EK513"
//                     />
//                   </div>
//                 )}

//                 {form.type === "city" && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Departure City
//                       </label>
//                       <input
//                         name="depcity"
//                         value={form.depcity}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., Delhi"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Arrival City
//                       </label>
//                       <input
//                         name="arrcity"
//                         value={form.arrcity}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="e.g., Dubai"
//                       />
//                     </div>
//                   </>
//                 )}

//                 {(form.type === "board" || form.type === "time") && (
//                   <>
//                     <AirportInput
//                       label="Airport Code"
//                       value={form.airport}
//                       onChange={(value) => handleAirportChange("airport", value)}
//                       placeholder="Search airport..."
//                     />
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Status Type
//                       </label>
//                       <select
//                         name="status"
//                         value={form.status}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       >
//                         <option value="departure">Departures</option>
//                         <option value="arrival">Arrivals</option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 {form.type === "time" && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Start Time (HHMM)
//                       </label>
//                       <input
//                         type="time"
//                         name="startAt"
//                         value={formatTimeForInput(form.startAt)}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">Format: 0600 for 6:00 AM, 2200 for 10:00 PM</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         End Time (HHMM)
//                       </label>
//                       <input
//                         type="time"
//                         name="endAt"
//                         value={formatTimeForInput(form.endAt)}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">Format: 0600 for 6:00 AM, 2200 for 10:00 PM</p>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Date Selector */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={form.date}
//                   onChange={handleChange}
//                   className="cursor-pointer w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               {/* Advanced Options Toggle */}
//               <button
//                 onClick={() => setShowAdvanced(!showAdvanced)}
//                 className="cursor-pointer flex items-center justify-between w-full mb-4 text-sm text-gray-600 hover:text-gray-900"
//               >
//                 <span className="flex items-center gap-2">
//                   <Filter className="w-4 h-4" />
//                   Advanced Options
//                 </span>
//                 <ChevronRight className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
//               </button>

//               {showAdvanced && (
//                 <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Page
//                       </label>
//                       <input
//                         type="number"
//                         name="page"
//                         value={form.page}
//                         onChange={handleChange}
//                         min="1"
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Per Page
//                       </label>
//                       <input
//                         type="number"
//                         name="perpage"
//                         value={form.perpage}
//                         onChange={handleChange}
//                         min="1"
//                         max="100"
//                         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Search Button */}
//               <button
//                 onClick={fetchFlights}
//                 disabled={loading}
//                 className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw className="w-5 h-5 animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search className="w-5 h-5" />
//                     Search Flights
//                   </>
//                 )}
//               </button>

//               {error && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
//                   <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Panel - Results */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               {/* Results Header */}
//               <div className="p-6 border-b">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       Flight Results
//                       {results.length > 0 && (
//                         <span className="ml-2 text-sm font-normal text-gray-500">
//                           ({results.length} flights found)
//                         </span>
//                       )}
//                     </h2>
//                     {results.length > 0 && (
//                       <p className="text-sm text-gray-600 mt-1">
//                         Showing flights for {form.date}
//                         {form.type === "airport" && form.dep && form.arr && (
//                           <span className="font-medium ml-1">
//                             • {form.dep} → {form.arr}
//                           </span>
//                         )}
//                         {form.type === "board" && (
//                           <span className="font-medium ml-1">
//                             • {form.status === "departure" ? "Departures" : "Arrivals"} at {form.airport}
//                           </span>
//                         )}
//                         {form.type === "time" && (
//                           <span className="font-medium ml-1">
//                             • {form.status === "departure" ? "Departures" : "Arrivals"} at {form.airport} ({form.startAt}-{form.endAt})
//                           </span>
//                         )}
//                       </p>
//                     )}
//                   </div>
//                   {results.length > 0 && (
//                     <button
//                       onClick={fetchFlights}
//                       disabled={loading}
//                       className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                     >
//                       <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                       Refresh
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Results Table */}
//               <div className="overflow-x-auto">
//                 {results.length > 0 ? (
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Flight
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Airline
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Route
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Times
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {results.map((flight, index) => (
//                         <tr
//                           key={index}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0">
//                                 <div className="p-2 bg-blue-50 rounded-lg">
//                                   <Plane className="w-5 h-5 text-blue-600" />
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {flight.FlightNo || 'N/A'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {flight.FlightCompany || 'Unknown Airline'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">
//                               {flight.FlightCompany || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="text-center">
//                                 <div className="text-sm font-semibold text-gray-900">
//                                   {flight.FlightDepcode || 'N/A'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {flight.FlightDep || 'N/A'}
//                                 </div>
//                               </div>
//                               <div className="mx-4">
//                                 <ChevronRight className="w-4 h-4 text-gray-400" />
//                               </div>
//                               <div className="text-center">
//                                 <div className="text-sm font-semibold text-gray-900">
//                                   {flight.FlightArrcode || 'N/A'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {flight.FlightArr || 'N/A'}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">
//                               {flight.FlightDeptime || 'N/A'} - {flight.FlightArrtime || 'N/A'}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               Duration: {flight.FlightDuration || 'N/A'}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 ${getStatusColor(flight.FlightState)}`}>
//                               {getStatusIcon(flight.FlightState)}
//                               {flight.FlightState || 'Unknown'}
//                             </div>
//                             {flight.FlightRemark && (
//                               <div className="text-xs text-gray-500 mt-1">
//                                 {flight.FlightRemark}
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : !loading && !error && hasSearched ? (
//                   <div className="text-center py-16">
//                     <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <Plane className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
//                     <p className="text-gray-500 max-w-md mx-auto">
//                       No flights match your search criteria. Try different airports or dates.
//                     </p>
//                   </div>
//                 ) : !loading && !error && !hasSearched ? (
//                   <div className="text-center py-16">
//                     <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
//                       <Search className="w-8 h-8 text-blue-600" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Search</h3>
//                     <p className="text-gray-500 max-w-md mx-auto">
//                       Enter your search criteria and click "Search Flights" to find flight information.
//                     </p>
//                     <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
//                       <div className="text-center">
//                         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
//                           <Navigation className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <p className="text-xs text-gray-600">Airport Search</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
//                           <Plane className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <p className="text-xs text-gray-600">Flight Number</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
//                           <Clock className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <p className="text-xs text-gray-600">Time-based</p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : loading ? (
//                   <div className="text-center py-16">
//                     <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
//                       <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Searching flights...</h3>
//                     <p className="text-gray-500">Fetching real-time flight information</p>
//                   </div>
//                 ) : null}
//               </div>

//               {/* Pagination for board/time searches */}
//               {(form.type === "board" || form.type === "time") && results.length > 0 && (
//                 <div className="px-6 py-4 border-t bg-gray-50">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm text-gray-700">
//                       Showing page {form.page} of results
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => {
//                           setForm({ ...form, page: Math.max(1, form.page - 1) });
//                           fetchFlights();
//                         }}
//                         disabled={form.page <= 1 || loading}
//                         className="cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Previous
//                       </button>
//                       <button
//                         onClick={() => {
//                           setForm({ ...form, page: form.page + 1 });
//                           fetchFlights();
//                         }}
//                         disabled={loading}
//                         className="cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Stats Card */}
//             {results.length > 0 && (
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-blue-700 font-medium">Total Flights</p>
//                       <p className="text-2xl font-bold text-blue-900 mt-1">{results.length}</p>
//                     </div>
//                     <Plane className="w-8 h-8 text-blue-600" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-green-700 font-medium">On Time</p>
//                       <p className="text-2xl font-bold text-green-900 mt-1">
//                         {results.filter(f => f.FlightState?.toLowerCase().includes('ontime') || f.FlightState?.toLowerCase().includes('scheduled')).length}
//                       </p>
//                     </div>
//                     <CheckCircle className="w-8 h-8 text-green-600" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-yellow-700 font-medium">Delayed</p>
//                       <p className="text-2xl font-bold text-yellow-900 mt-1">
//                         {results.filter(f => f.FlightState?.toLowerCase().includes('delayed')).length}
//                       </p>
//                     </div>
//                     <Clock className="w-8 h-8 text-yellow-600" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














//=================

// import { useState } from 'react';
// import { Plane, Calendar, Search, Loader2 } from 'lucide-react';

// const API_BASE = "https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api";

// export default function FlightStatusChecker() {
//   const [form, setForm] = useState({
//     type: "airport",
//     dep: "DEL",
//     arr: "DXB",
//     fnum: "",
//     depcity: "",
//     arrcity: "",
//     date: new Date().toISOString().split('T')[0],
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [results, setResults] = useState([]);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const fetchFlights = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setResults([]);

//       const params = new URLSearchParams();
//       params.append("type", form.type);
//       params.append("date", form.date);

//       if (form.type === "airport") {
//         if (!form.dep || !form.arr) throw new Error("Departure & Arrival airports required");
//         params.append("dep", form.dep.toUpperCase());
//         params.append("arr", form.arr.toUpperCase());
//       }

//       if (form.type === "flight") {
//         if (!form.fnum) throw new Error("Flight number required");
//         params.append("fnum", form.fnum.toUpperCase());
//       }

//       if (form.type === "city") {
//         if (!form.depcity || !form.arrcity) throw new Error("Departure & Arrival cities required");
//         params.append("depcity", form.depcity);
//         params.append("arrcity", form.arrcity);
//       }

//       const response = await fetch(`${API_BASE}/flight-status?${params}`);
//       const data = await response.json();

//       if (!data.success) {
//         throw new Error(data.message || "Failed to fetch flight status");
//       }

//       setResults(data.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     const s = (status || "").toLowerCase();
//     if (s.includes("on time") || s.includes("scheduled")) return "text-emerald-600 bg-emerald-50";
//     if (s.includes("delayed")) return "text-amber-600 bg-amber-50";
//     if (s.includes("cancelled") || s.includes("canceled")) return "text-red-600 bg-red-50";
//     return "text-gray-600 bg-gray-50";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-4">
//             <Plane size={32} />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Flight Status Tracker
//           </h1>
//           <p className="text-lg text-gray-600">
//             Real-time flight information • Airport • Flight Number • City
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           {/* Form Section */}
//           <div className="p-6 lg:p-8 border-b border-gray-100">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               {/* Search Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Search Type
//                 </label>
//                 <select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                 >
//                   <option value="airport">Airport → Airport</option>
//                   <option value="flight">Flight Number</option>
//                   <option value="city">City → City</option>
//                 </select>
//               </div>

//               {/* Conditional fields */}
//               {form.type === "airport" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                     <input
//                       name="dep"
//                       maxLength={3}
//                       placeholder="DEL"
//                       value={form.dep}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                     <input
//                       name="arr"
//                       maxLength={3}
//                       placeholder="DXB"
//                       value={form.arr}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
//                     />
//                   </div>
//                 </>
//               )}

//               {form.type === "flight" && (
//                 <div className="lg:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Flight Number
//                   </label>
//                   <input
//                     name="fnum"
//                     placeholder="EK513 / AI101"
//                     value={form.fnum}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
//                   />
//                 </div>
//               )}

//               {form.type === "city" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From City</label>
//                     <input
//                       name="depcity"
//                       placeholder="Delhi"
//                       value={form.depcity}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To City</label>
//                     <input
//                       name="arrcity"
//                       placeholder="Dubai"
//                       value={form.arrcity}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                 </>
//               )}

//               {/* Date - always visible */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date
//                 </label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="date"
//                     name="date"
//                     value={form.date}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <button
//                 onClick={fetchFlights}
//                 disabled={loading}
//                 className={`
//                   w-full sm:w-auto flex items-center justify-center gap-2
//                   px-8 py-3 bg-indigo-600 text-white font-medium
//                   rounded-lg shadow-md hover:bg-indigo-700
//                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
//                   disabled:opacity-60 disabled:cursor-not-allowed
//                   transition-all duration-200
//                 `}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search size={18} />
//                     Search Flights
//                   </>
//                 )}
//               </button>
//             </div>

//             {error && (
//               <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* Results Section */}
//           {results.length > 0 && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Flight
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Airline
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Departure
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Arrival
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {results.map((flight, index) => (
//                     <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
//                         {flight.FlightNo}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                         {flight.FlightCompany}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-gray-900">{flight.FlightDepcode}</div>
//                         <div className="text-sm text-gray-500">
//                           {flight.FlightDeptimePlanDate || '—'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-gray-900">{flight.FlightArrcode}</div>
//                         <div className="text-sm text-gray-500">
//                           {flight.FlightArrtimePlanDate || '—'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flight.FlightState)}`}>
//                           {flight.FlightState || 'Unknown'}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {results.length === 0 && !loading && !error && form.date && (
//             <div className="p-12 text-center text-gray-500">
//               <Plane className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <p className="text-lg">No flights found for the selected criteria</p>
//               <p className="mt-2">Try different airports, date or search type</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 text-center text-sm text-gray-500">
//           Data provided by FareBuzzer Travel • {new Date().getFullYear()}
//         </div>
//       </div>
//     </div>
//   );
// }