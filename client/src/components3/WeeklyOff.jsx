
// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// const WeeklyOff = () => {
//   const [weeklyOffs, setWeeklyOffs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [form, setForm] = useState({
//     userId: "",
//     date: "",
//     reason: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   /* =========================
//      INITIAL LOAD
//   ========================= */
//   useEffect(() => {
//     if (user?.role === "admin") {
//       fetchAllWeeklyOff();
//       fetchUsers();
//     } else {
//       fetchMyWeeklyOff();
//     }
//   }, []);

//   /* =========================
//      API CALLS
//   ========================= */

//   const fetchAllWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       const res = await api.get("/weekly-off/admin");
//       setWeeklyOffs(res.data || []);
//     } catch (err) {
//       console.error("Fetch weekly off failed", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchMyWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       const res = await api.get("/weekly-off/me");
//       setWeeklyOffs(res.data || []);
//     } catch (err) {
//       console.error("Fetch my weekly off failed", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(
//         (res.data || []).filter(
//           (u) => u.role !== "admin" && u._id !== user.id
//         )
//       );
//     } catch (err) {
//       console.error("Fetch users failed", err);
//     }
//   };

//   /* =========================
//      FORM SUBMIT
//   ========================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.userId || !form.date) {
//       alert("Employee and date are required");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       if (editingId) {
//         await api.put(`/weekly-off/admin/${editingId}`, form);
//         alert("Weekly off updated successfully");
//       } else {
//         await api.post("/weekly-off/admin", form);
//         alert("Weekly off added successfully");
//       }

//       resetForm();
//       fetchAllWeeklyOff();
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* =========================
//      EDIT / DELETE
//   ========================= */

//   const handleEdit = (off) => {
//     setEditingId(off._id);
//     setForm({
//       userId: off.userId?._id || "",
//       date: off.date ? off.date.slice(0, 10) : "",
//       reason: off.reason || "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this weekly off?")) return;

//     try {
//       await api.delete(`/weekly-off/admin/${id}`);
//       fetchAllWeeklyOff();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setForm({ userId: "", date: "", reason: "" });
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Weekly Off Management</h1>

//       {/* ================= ADMIN FORM ================= */}
//       {user?.role === "admin" && (
//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingId ? "Update Weekly Off" : "Add Weekly Off"}
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//           >
//             {/* Employee */}
//             <select
//               className="border p-2 rounded"
//               value={form.userId}
//               onChange={(e) =>
//                 setForm({ ...form, userId: e.target.value })
//               }
//               required
//             >
//               <option value="">Select Employee</option>
//               {users.map((u) => (
//                 <option key={u._id} value={u._id}>
//                   {u.name} ({u.email})
//                 </option>
//               ))}
//             </select>

//             {/* Date */}
//             <input
//               type="date"
//               min={new Date().toISOString().split("T")[0]}
//               className="border p-2 rounded"
//               value={form.date}
//               onChange={(e) =>
//                 setForm({ ...form, date: e.target.value })
//               }
//               required
//             />

//             {/* Reason */}
//             <input
//               type="text"
//               placeholder="Reason (optional)"
//               className="border p-2 rounded"
//               value={form.reason}
//               onChange={(e) =>
//                 setForm({ ...form, reason: e.target.value })
//               }
//             />

//             {/* Buttons */}
//             <div className="md:col-span-3 flex gap-3">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white px-6 py-2 rounded"
//               >
//                 {isLoading
//                   ? "Saving..."
//                   : editingId
//                   ? "Update"
//                   : "Save"}
//               </button>

//               {editingId && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="bg-gray-300 px-6 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}

//       {/* ================= TABLE ================= */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               {user?.role === "admin" && (
//                 <th className="border p-2 text-left">Employee</th>
//               )}
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Reason</th>
//               {user?.role === "admin" && (
//                 <th className="border p-2">Actions</th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-6">
//                   Loading...
//                 </td>
//               </tr>
//             ) : weeklyOffs.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-6">
//                   No weekly off found
//                 </td>
//               </tr>
//             ) : (
//               weeklyOffs.map((off) => (
//                 <tr key={off._id}>
//                   {user?.role === "admin" && (
//                     <td className="border p-2">
//                       {off.userId?.name}
//                       <div className="text-xs text-gray-500">
//                         {off.userId?.email}
//                       </div>
//                     </td>
//                   )}
//                   <td className="border p-2">
//                     {new Date(off.date).toLocaleDateString("en-IN")}
//                   </td>
//                   <td className="border p-2">{off.reason || "-"}</td>
//                   {user?.role === "admin" && (
//                     <td className="border p-2">
//                       <button
//                         onClick={() => handleEdit(off)}
//                         className="text-blue-600 mr-3"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(off._id)}
//                         className="text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WeeklyOff;

//=================correct=========================================

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// const WeeklyOff = () => {
//   const [weeklyOffs, setWeeklyOffs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null); // Added for better error display

//   const [form, setForm] = useState({
//     userId: "",
//     date: "",
//     reason: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   console.log("User role:", user?.role); // DEBUG: Check role

//   /* =========================
//      INITIAL LOAD
//   ========================= */
//   useEffect(() => {
//     console.log("useEffect running"); // DEBUG: Confirm hook runs
//     if (user?.role === "admin") {
//       fetchAllWeeklyOff();
//       fetchUsers();
//     } else {
//       fetchMyWeeklyOff();
//     }
//   }, []);

//   /* =========================
//      API CALLS
//   ========================= */

//   const fetchAllWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await api.get("/weekly-off/admin");
//       console.log("Fetched weekly offs:", res.data); // DEBUG: Check data
//       setWeeklyOffs((res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by recent first
//     } catch (err) {
//       console.error("Fetch weekly off failed", err);
//       setError("Failed to fetch weekly offs: " + (err.response?.data?.message || err.message));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchMyWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await api.get("/weekly-off/me");
//       console.log("Fetched my weekly offs:", res.data); // DEBUG
//       setWeeklyOffs((res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date)));
//     } catch (err) {
//       console.error("Fetch my weekly off failed", err);
//       setError("Failed to fetch your weekly offs: " + (err.response?.data?.message || err.message));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       const filteredUsers = (res.data || []).filter((u) => u.role !== "admin" && u._id !== user._id); // Fixed: user.id -> user._id
//       console.log("Fetched users:", filteredUsers); // DEBUG: Check users
//       setUsers(filteredUsers);
//     } catch (err) {
//       console.error("Fetch users failed", err);
//       setError("Failed to fetch users: " + (err.response?.data?.message || err.message));
//     }
//   };

//   /* =========================
//      FORM SUBMIT
//   ========================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.userId || !form.date) {
//       alert("Employee and date are required");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       if (editingId) {
//         await api.put(`/weekly-off/admin/${editingId}`, form);
//         alert("Weekly off updated successfully");
//       } else {
//         await api.post("/weekly-off/admin", form);
//         alert("Weekly off added successfully");
//       }

//       resetForm();
//       fetchAllWeeklyOff();
//     } catch (error) {
//       console.error("Submit failed", error); // DEBUG
//       setError(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* =========================
//      EDIT / DELETE
//   ========================= */

//   const handleEdit = (off) => {
//     console.log("Editing:", off); // DEBUG: Check edit data
//     setEditingId(off._id);
//     setForm({
//       userId: off.userId?._id || "",
//       date: off.date ? new Date(off.date).toISOString().slice(0, 10) : "", // Improved date handling
//       reason: off.reason || "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this weekly off?")) return;

//     try {
//       await api.delete(`/weekly-off/admin/${id}`);
//       fetchAllWeeklyOff();
//     } catch (err) {
//       console.error("Delete failed", err); // DEBUG
//       alert("Delete failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setForm({ userId: "", date: "", reason: "" });
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Weekly Off Management</h1>

//       {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>} {/* Added error display */}

//       {/* ================= ADMIN FORM ================= */}
//       {user?.role === "admin" && (
//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingId ? "Update Weekly Off" : "Add Weekly Off"}
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//           >
//             {/* Employee */}
//             <select
//               className="border p-2 rounded"
//               value={form.userId}
//               onChange={(e) =>
//                 setForm({ ...form, userId: e.target.value })
//               }
//               required
//             >
//               <option value="">Select Employee</option>
//               {users.map((u) => (
//                 <option key={u._id} value={u._id}>
//                   {u.name} ({u.email})
//                 </option>
//               ))}
//             </select>

//             {/* Date */}
//             <input
//               type="date"
//               min={new Date().toISOString().split("T")[0]}
//               className="border p-2 rounded"
//               value={form.date}
//               onChange={(e) =>
//                 setForm({ ...form, date: e.target.value })
//               }
//               required
//             />

//             {/* Reason */}
//             <input
//               type="text"
//               placeholder="Reason (optional)"
//               className="border p-2 rounded"
//               value={form.reason}
//               onChange={(e) =>
//                 setForm({ ...form, reason: e.target.value })
//               }
//             />

//             {/* Buttons */}
//             <div className="md:col-span-3 flex gap-3">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white px-6 py-2 rounded"
//               >
//                 {isLoading
//                   ? "Saving..."
//                   : editingId
//                   ? "Update"
//                   : "Save"}
//               </button>

//               {editingId && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="bg-gray-300 px-6 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}

//       {/* ================= TABLE ================= */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               {user?.role === "admin" && (
//                 <th className="border p-2 text-left">Employee</th>
//               )}
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Reason</th>
//               {user?.role === "admin" && (
//                 <th className="border p-2">Actions</th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-6">
//                   Loading...
//                 </td>
//               </tr>
//             ) : weeklyOffs.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-6">
//                   No weekly off found
//                 </td>
//               </tr>
//             ) : (
//               weeklyOffs.map((off) => (
//                 <tr key={off._id}>
//                   {user?.role === "admin" && (
//                     <td className="border p-2">
//                       {off.userId?.name || "Unknown"}
//                       <div className="text-xs text-gray-500">
//                         {off.userId?.email || ""}
//                       </div>
//                     </td>
//                   )}
//                   <td className="border p-2">
//                     {off.date ? new Date(off.date).toLocaleDateString("en-IN") : "Invalid Date"}
//                   </td>
//                   <td className="border p-2">{off.reason || "-"}</td>
//                   {user?.role === "admin" && (
//                     <td className="border p-2">
//                       <button
//                         onClick={() => handleEdit(off)}
//                         className="text-blue-600 mr-3"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(off._id)}
//                         className="text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WeeklyOff;

//==============stylish=======

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import dayjs from "dayjs";

// const WeeklyOff = () => {
//   const [weeklyOffs, setWeeklyOffs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [form, setForm] = useState({
//     userId: "",
//     date: "",
//     reason: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // ── INITIAL LOAD ────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (user?.role === "admin") {
//       fetchAllWeeklyOff();
//       fetchUsers();
//     } else {
//       fetchMyWeeklyOff();
//     }
//   }, []);

//   // ── API CALLS ───────────────────────────────────────────────────────────────
//   const fetchAllWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await api.get("/weekly-off/admin");
//       setWeeklyOffs((res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date)));
//     } catch (err) {
//       setError("Failed to fetch weekly offs");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchMyWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await api.get("/weekly-off/me");
//       setWeeklyOffs((res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date)));
//     } catch (err) {
//       setError("Failed to fetch your weekly offs");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       const filtered = (res.data || []).filter(
//         (u) => u.role !== "admin" && u._id !== user._id
//       );
//       setUsers(filtered);
//     } catch (err) {
//       setError("Failed to fetch employees");
//     }
//   };

//   // ── FORM HANDLING ───────────────────────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.userId || !form.date) {
//       alert("Employee and date are required");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       if (editingId) {
//         await api.put(`/weekly-off/admin/${editingId}`, form);
//         alert("Weekly off updated successfully");
//       } else {
//         await api.post("/weekly-off/admin", form);
//         alert("Weekly off added successfully");
//       }

//       resetForm();
//       fetchAllWeeklyOff();
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (off) => {
//     setEditingId(off._id);
//     setForm({
//       userId: off.userId?._id || "",
//       date: off.date ? dayjs(off.date).format("YYYY-MM-DD") : "",
//       reason: off.reason || "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this weekly off?")) return;
//     try {
//       await api.delete(`/weekly-off/admin/${id}`);
//       fetchAllWeeklyOff();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setForm({ userId: "", date: "", reason: "" });
//   };

//   // ── RENDER ──────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <span className="text-indigo-600">📅</span>
//             Weekly Off Management
//           </h1>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-xl p-5 shadow-sm text-red-700">
//             {error}
//           </div>
//         )}

//         {/* ── ADMIN FORM ────────────────────────────────────────────────────────── */}
//         {user?.role === "admin" && (
//           <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl p-8 shadow-lg border border-indigo-100 transform transition-all hover:shadow-xl">
//             <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center gap-3">
//               {editingId ? "✏️ Update Weekly Off" : "➕ Add New Weekly Off"}
//             </h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Employee Select */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Employee</label>
//                 <select
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm bg-white"
//                   value={form.userId}
//                   onChange={(e) => setForm({ ...form, userId: e.target.value })}
//                   required
//                 >
//                   <option value="">Select Employee</option>
//                   {users.map((u) => (
//                     <option key={u._id} value={u._id}>
//                       {u.name} ({u.email})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Date Picker */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Date</label>
//                 <input
//                   type="date"
//                   min={dayjs().format("YYYY-MM-DD")}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
//                   value={form.date}
//                   onChange={(e) => setForm({ ...form, date: e.target.value })}
//                   required
//                 />
//               </div>

//               {/* Reason */}
//               <div className="space-y-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700">Reason (optional)</label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Personal leave"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
//                   value={form.reason}
//                   onChange={(e) => setForm({ ...form, reason: e.target.value })}
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="md:col-span-3 flex gap-4 justify-end">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//                 >
//                   {isLoading ? "Saving..." : editingId ? "Update" : "Add Weekly Off"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* ── TABLE SECTION ─────────────────────────────────────────────────────── */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="p-6 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
//               <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Weekly Off Records
//             </h3>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {user?.role === "admin" && (
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Employee
//                     </th>
//                   )}
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Reason
//                   </th>
//                   {user?.role === "admin" && (
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={user?.role === "admin" ? 4 : 3} className="px-6 py-12 text-center">
//                       <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : weeklyOffs.length === 0 ? (
//                   <tr>
//                     <td colSpan={user?.role === "admin" ? 4 : 3} className="px-6 py-12 text-center text-gray-500">
//                       No weekly offs found
//                     </td>
//                   </tr>
//                 ) : (
//                   weeklyOffs.map((off) => (
//                     <tr key={off._id} className="hover:bg-indigo-50/30 transition-colors">
//                       {user?.role === "admin" && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {off.userId?.name || "Unknown"}
//                           </div>
//                           <div className="text-xs text-gray-500 mt-1">
//                             {off.userId?.email || ""}
//                           </div>
//                         </td>
//                       )}
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {off.date ? dayjs(off.date).format("DD MMM YYYY") : "—"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {off.reason || <span className="italic text-gray-400">—</span>}
//                       </td>
//                       {user?.role === "admin" && (
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(off)}
//                             className="text-indigo-600 hover:text-indigo-800 mr-4 transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(off._id)}
//                             className="text-red-600 hover:text-red-800 transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))
//                 )}
//               </tbody>


              
//             </table>
//           </div>
//         </div>

//         {/* Footer note */}
//         <div className="text-center text-sm text-gray-500 pt-8 pb-4">
//           <p>Weekly Off Management • Last updated: {dayjs().format("DD MMM YYYY")}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeeklyOff;



//=========correct fully WITH ALL MONTH SHOWING

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// const WeeklyOff = () => {
//   const [weeklyOffs, setWeeklyOffs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [form, setForm] = useState({
//     userId: "",
//     date: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   /* ================= FETCH ================= */

//   useEffect(() => {
//     if (user?.role === "admin") {
//       fetchAllWeeklyOff();
//       fetchUsers();
//     } else {
//       fetchMyWeeklyOff();
//     }
//   }, []);

//   const fetchAllWeeklyOff = async () => {
//     setIsLoading(true);
//     const res = await api.get("/weekly-off/admin");
//     setWeeklyOffs(res.data || []);
//     setIsLoading(false);
//   };

//   const fetchMyWeeklyOff = async () => {
//     setIsLoading(true);
//     const res = await api.get("/weekly-off/me");
//     setWeeklyOffs(res.data || []);
//     setIsLoading(false);
//   };

//   const fetchUsers = async () => {
//     const res = await api.get("/users");
//     setUsers((res.data || []).filter(u => u.role !== "admin"));
//   };

//   /* ================= FORM ================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (editingId) {
//       await api.put(`/weekly-off/admin/${editingId}`, form);
//     } else {
//       await api.post("/weekly-off/admin", form);
//     }

//     setEditingId(null);
//     setForm({ userId: "", date: "" });
//     fetchAllWeeklyOff();
//     setIsLoading(false);
//   };

//   const handleEdit = (off) => {
//     setEditingId(off._id);
//     setForm({
//       userId: off.userId?._id,
//       date: off.date.slice(0, 10),
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this weekly off date?")) return;
//     await api.delete(`/weekly-off/admin/${id}`);
//     fetchAllWeeklyOff();
//   };

//   /* ================= GROUP DATA ================= */

//   const groupedOffs = weeklyOffs.reduce((acc, off) => {
//     const uid = off.userId?._id || "me";

//     if (!acc[uid]) {
//       acc[uid] = {
//         employee: off.userId,
//         dates: [],
//       };
//     }

//     acc[uid].dates.push(off);
//     return acc;
//   }, {});

//   /* ================= UI ================= */

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">

//       {/* HEADER */}
//       <div className="bg-indigo-50 rounded-xl p-6 border">
//         <h1 className="text-2xl font-bold text-indigo-800">
//           📅 Weekly Off Management
//         </h1>
//         <p className="text-sm text-indigo-600">
//           Employee weekly off schedule
//         </p>
//       </div>

//       {/* ADMIN FORM */}
//       {user?.role === "admin" && (
//         <div className="bg-white rounded-xl shadow border p-6">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingId ? "✏️ Update Weekly Off" : "➕ Add Weekly Off"}
//           </h2>

//           <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//             <select
//               className="border rounded-lg px-4 py-2"
//               value={form.userId}
//               onChange={e => setForm({ ...form, userId: e.target.value })}
//               required
//             >
//               <option value="">Select Employee</option>
//               {users.map(u => (
//                 <option key={u._id} value={u._id}>{u.name}</option>
//               ))}
//             </select>

//             <input
//               type="date"
//               className="border rounded-lg px-4 py-2"
//               value={form.date}
//               onChange={e => setForm({ ...form, date: e.target.value })}
//               required
//             />

//             <div className="md:col-span-2 flex gap-3">
//               <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
//                 {editingId ? "Update" : "Save"}
//               </button>

//               {editingId && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setEditingId(null);
//                     setForm({ userId: "", date: "" });
//                   }}
//                   className="bg-gray-200 px-6 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}

//       {/* WEEKLY OFF LIST */}
//       {Object.values(groupedOffs).map((group, idx) => (
//         <div key={idx} className="bg-white rounded-xl shadow border">
//           <div className="px-6 py-4 border-b bg-gray-50">
//             <div className="font-semibold text-lg">
//               {group.employee?.name || "My Weekly Offs"}
//             </div>
//             {group.employee?.email && (
//               <div className="text-sm text-gray-500">{group.employee.email}</div>
//             )}
//           </div>

//           <div className="p-5 space-y-2">
//             {group.dates.map(off => (
//               <div
//                 key={off._id}
//                 className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2"
//               >
//                 <span className="font-medium text-gray-800">
//                   {new Date(off.date).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </span>

//                 {user?.role === "admin" && (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleEdit(off)}
//                       className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(off._id)}
//                       className="text-red-600 hover:text-red-800 text-sm font-medium"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WeeklyOff;


//================FULLY CORRECT====================================





// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Trash2,Pencil  } from "lucide-react";

// const WeeklyOff = () => {
//   const [weeklyOffs, setWeeklyOffs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [form, setForm] = useState({
//     userId: "",
//     date: "",
//   });

//   // New: Month filter (YYYY-MM format)
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toISOString().slice(0, 7) // current month by default
//   );

//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//   const isAdmin = currentUser?.role === "admin";

//   useEffect(() => {
//     if (isAdmin) {
//       fetchAllWeeklyOff();
//       fetchUsers();
//     } else {
//       fetchMyWeeklyOff();
//     }
//   }, []);

//   const fetchAllWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       const res = await api.get("/weekly-off/admin");
//       setWeeklyOffs(res.data || []);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchMyWeeklyOff = async () => {
//     try {
//       setIsLoading(true);
//       const res = await api.get("/weekly-off/me");
//       setWeeklyOffs(res.data || []);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers((res.data || []).filter(u => u.role !== "admin"));
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (editingId) {
//         await api.put(`/weekly-off/admin/${editingId}`, form);
//       } else {
//         await api.post("/weekly-off/admin", form);
//       }

//       setEditingId(null);
//       setForm({ userId: "", date: "" });
//       await fetchAllWeeklyOff();
//     } catch (error) {
//       console.error("Error saving weekly off:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (off) => {
//     setEditingId(off._id);
//     setForm({
//       userId: off.userId?._id || "",
//       date: new Date(off.date).toISOString().slice(0, 10),
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this weekly off date?")) return;

//     try {
//       setIsLoading(true);
//       await api.delete(`/weekly-off/admin/${id}`);
//       await fetchAllWeeklyOff();
//     } catch (error) {
//       console.error("Error deleting weekly off:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Group weekly offs by employee
//   const groupedOffs = weeklyOffs.reduce((acc, off) => {
//     const userId = off.userId?._id || "me";

//     if (!acc[userId]) {
//       acc[userId] = {
//         userId: userId,
//         name: off.userId?.name || "My Weekly Offs",
//         email: off.userId?.email || "",
//         dates: [],
//       };
//     }

//     const dateObj = new Date(off.date);
//     const monthKey = dateObj.toISOString().slice(0, 7); // YYYY-MM

//     // Only add if matches selected month (or show all if no filter)
//     if (!selectedMonth || monthKey === selectedMonth) {
//       acc[userId].dates.push({
//         _id: off._id,
//         date: dateObj,
//         formatted: dateObj.toLocaleDateString("en-IN", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//           weekday: "short",
//         }),
//       });
//     }

//     return acc;
//   }, {});

//   // Sort dates within each group
//   Object.values(groupedOffs).forEach(group => {
//     group.dates.sort((a, b) => a.date - b.date);
//   });

//   // Filter out employees with no dates in selected month
//   const visibleGroups = Object.values(groupedOffs).filter(group => group.dates.length > 0);

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 shadow border border-indigo-100">
//         <h1 className="text-2xl font-bold text-indigo-800">📅 Weekly Off Management</h1>
//         <p className="text-sm text-indigo-600 mt-1">Manage employee weekly holidays</p>
//       </div>

//       {/* Controls: Month Picker + Add Form */}
//      <div className="flex flex-col md:flex-row md:items-start gap-6 bg-white rounded-2xl shadow border p-6">
  
//   {/* Add/Edit Form */}
//   {isAdmin && (
//     <div className="flex-1">
//       <h2 className="text-lg font-semibold mb-3">
//         {editingId ? "✏️ Update Weekly Off" : "➕ Add New Weekly Off"}
//       </h2>

//       <form
//         className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//         onSubmit={handleSubmit}
//       >
//         <select
//           className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500"
//           value={form.userId}
//           onChange={(e) => setForm({ ...form, userId: e.target.value })}
//           required
//         >
//           <option value="">Select Employee</option>
//           {users.map((u) => (
//             <option key={u._id} value={u._id}>
//               {u.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />

//         <div className="sm:col-span-2 flex gap-4">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="cursor-pointer px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
//           >
//             {isLoading ? "Saving..." : editingId ? "Update" : "Save"}
//           </button>

//           {editingId && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingId(null);
//                 setForm({ userId: "", date: "" });
//               }}
//               className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   )}

//   {/* Month Filter */}
//   <div className="w-full md:w-64">
//     <label className="block text-lg font-medium text-gray-700 mb-3">
//       View Month
//     </label>
//     <input
//       type="month"
//       value={selectedMonth}
//       onChange={(e) => setSelectedMonth(e.target.value)}
//       className="cursor-pointer w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//     />
//   </div>

// </div>


//       {/* Monthly View - Grouped Cards */}
//       {isLoading ? (
//         <div className="text-center py-12 text-gray-500">Loading...</div>
//       ) : visibleGroups.length === 0 ? (
//         <div className="text-center py-12 text-gray-400 bg-white rounded-2xl shadow border">
//           {selectedMonth
//             ? `No weekly offs in ${new Date(selectedMonth + "-01").toLocaleDateString("en-IN", {
//                 month: "long",
//                 year: "numeric",
//               })}`
//             : "No weekly offs scheduled yet"}
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {visibleGroups.map((group) => (
//             <div
//               key={group.userId}
//               className="bg-white rounded-2xl shadow border overflow-hidden"
//             >
//               <div className="bg-gray-50 px-6 py-4 border-b">
//                 <div className="font-medium text-lg text-gray-800">{group.name}</div>
//                 {isAdmin && group.email && (
//                   <div className="text-sm text-gray-500 mt-0.5">{group.email}</div>
//                 )}
//               </div>

//               <div className="p-5 flex flex-wrap gap-3">
//                 {group.dates.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-800 text-sm"
//                   >
//                     <span className="font-medium">{item.formatted}</span>

//                     {isAdmin && (
//                       <div className="flex items-center gap-1.5 ml-1">
//                         {/* <button
//                           onClick={() =>
//                             handleEdit({
//                               _id: item._id,
//                               userId: { _id: group.userId },
//                               date: item.date,
//                             })
//                           }
//                           title="Edit this date"
//                           className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition-colors"
//                         >
//                           ✏️
//                         </button> */}
//                         <button
//   onClick={() =>
//     handleEdit({
//       _id: item._id,
//       userId: { _id: group.userId },
//       date: item.date,
//     })
//   }
//   title="Edit this date"
//   className="p-1 rounded hover:bg-indigo-100 transition"
// >
//   <Pencil className="cursor-pointer w-4 h-4 text-yellow-600 hover:text-yellow-800" />
// </button>

//                         {/* <button
//                           onClick={() => handleDelete(item._id)}
//                           title="Delete this date"
//                           className="cursor-pointer text-red-500 bg-red-500 hover:text-red-700 transition-colors"
//                         >
//                           🗑️
//                         </button> */}
//                         <button
//   onClick={() => handleDelete(item._id)}
//   title="Delete this date"
//   className="p-1 rounded hover:bg-red-100 transition"
// >
//   <Trash2 className="cursor-pointer w-4 h-4 text-red-600 hover:text-red-800" />
// </button>

//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeeklyOff;
//============================
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2 } from "lucide-react";

const WeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", date: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchWeeklyOffs();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.filter(u => u.role !== "admin"));
  };

  const fetchWeeklyOffs = async () => {
    const res = await api.get("/weekly-off/admin");
    setWeeklyOffs(res.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.date) return;

    try {
      setLoading(true);
      await api.post("/weekly-off/admin", form);
      setForm({ userId: "", date: "" });
      fetchWeeklyOffs();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this weekly off?")) return;
    await api.delete(`/weekly-off/admin/${id}`);
    fetchWeeklyOffs();
  };

  // 🔹 Group by employee
  const grouped = weeklyOffs.reduce((acc, off) => {
    const id = off.userId._id;
    if (!acc[id]) {
      acc[id] = {
        name: off.userId.name,
        email: off.userId.email,
        dates: [],
      };
    }
    acc[id].dates.push(off);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Weekly Off Management</h1>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
        <select
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Employee</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded col-span-full"
        >
          {loading ? "Saving..." : "Add Weekly Off"}
        </button>
      </form>

      {/* LIST */}
      {Object.values(grouped).map((group, i) => (
        <div key={i} className="bg-white rounded shadow">
          <div className="p-4 border-b font-semibold">
            {group.name} <span className="text-sm text-gray-500">({group.email})</span>
          </div>

          <div className="p-4 flex flex-wrap gap-3">
            {group.dates.map(d => (
              <div key={d._id} className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
                {new Date(d.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  weekday: "short",
                })}
                <Trash2
                  className="w-4 h-4 text-red-600 cursor-pointer"
                  onClick={() => handleDelete(d._id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyOff;





