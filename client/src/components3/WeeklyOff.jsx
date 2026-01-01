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

//===============================

import React, { useEffect, useState } from "react";
import api from "../api/axios";

const WeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added for better error display

  const [form, setForm] = useState({
    userId: "",
    date: "",
    reason: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("User role:", user?.role); // DEBUG: Check role

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    console.log("useEffect running"); // DEBUG: Confirm hook runs
    if (user?.role === "admin") {
      fetchAllWeeklyOff();
      fetchUsers();
    } else {
      fetchMyWeeklyOff();
    }
  }, []);

  /* =========================
     API CALLS
  ========================= */

  const fetchAllWeeklyOff = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get("/weekly-off/admin");
      console.log("Fetched weekly offs:", res.data); // DEBUG: Check data
      setWeeklyOffs((res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by recent first
    } catch (err) {
      console.error("Fetch weekly off failed", err);
      setError("Failed to fetch weekly offs: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyWeeklyOff = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get("/weekly-off/me");
      console.log("Fetched my weekly offs:", res.data); // DEBUG
      setWeeklyOffs((res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      console.error("Fetch my weekly off failed", err);
      setError("Failed to fetch your weekly offs: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const filteredUsers = (res.data || []).filter((u) => u.role !== "admin" && u._id !== user._id); // Fixed: user.id -> user._id
      console.log("Fetched users:", filteredUsers); // DEBUG: Check users
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Fetch users failed", err);
      setError("Failed to fetch users: " + (err.response?.data?.message || err.message));
    }
  };

  /* =========================
     FORM SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || !form.date) {
      alert("Employee and date are required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (editingId) {
        await api.put(`/weekly-off/admin/${editingId}`, form);
        alert("Weekly off updated successfully");
      } else {
        await api.post("/weekly-off/admin", form);
        alert("Weekly off added successfully");
      }

      resetForm();
      fetchAllWeeklyOff();
    } catch (error) {
      console.error("Submit failed", error); // DEBUG
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     EDIT / DELETE
  ========================= */

  const handleEdit = (off) => {
    console.log("Editing:", off); // DEBUG: Check edit data
    setEditingId(off._id);
    setForm({
      userId: off.userId?._id || "",
      date: off.date ? new Date(off.date).toISOString().slice(0, 10) : "", // Improved date handling
      reason: off.reason || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this weekly off?")) return;

    try {
      await api.delete(`/weekly-off/admin/${id}`);
      fetchAllWeeklyOff();
    } catch (err) {
      console.error("Delete failed", err); // DEBUG
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ userId: "", date: "", reason: "" });
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weekly Off Management</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>} {/* Added error display */}

      {/* ================= ADMIN FORM ================= */}
      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Weekly Off" : "Add Weekly Off"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Employee */}
            <select
              className="border p-2 rounded"
              value={form.userId}
              onChange={(e) =>
                setForm({ ...form, userId: e.target.value })
              }
              required
            >
              <option value="">Select Employee</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="border p-2 rounded"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              required
            />

            {/* Reason */}
            <input
              type="text"
              placeholder="Reason (optional)"
              className="border p-2 rounded"
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="md:col-span-3 flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                {isLoading
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Save"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 px-6 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              {user?.role === "admin" && (
                <th className="border p-2 text-left">Employee</th>
              )}
              <th className="border p-2">Date</th>
              <th className="border p-2">Reason</th>
              {user?.role === "admin" && (
                <th className="border p-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : weeklyOffs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  No weekly off found
                </td>
              </tr>
            ) : (
              weeklyOffs.map((off) => (
                <tr key={off._id}>
                  {user?.role === "admin" && (
                    <td className="border p-2">
                      {off.userId?.name || "Unknown"}
                      <div className="text-xs text-gray-500">
                        {off.userId?.email || ""}
                      </div>
                    </td>
                  )}
                  <td className="border p-2">
                    {off.date ? new Date(off.date).toLocaleDateString("en-IN") : "Invalid Date"}
                  </td>
                  <td className="border p-2">{off.reason || "-"}</td>
                  {user?.role === "admin" && (
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(off)}
                        className="text-blue-600 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(off._id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyOff;