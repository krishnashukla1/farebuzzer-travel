

// import React, { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import API from "../api/axios";
// import dayjs from "dayjs";

// const WeeklyOff = () => {
//   const { user } = useOutletContext() || {};
//   const [weeklyOffs, setWeeklyOffs] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

//   // Fetch weekly off data and employees
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const [offsRes, employeesRes] = await Promise.all([
//   //         API.get("/weekly-offs"),
//   //         API.get("/employees"),
//   //       ]);

//   //       const enhancedOffs = (offsRes.data || []).map((off) => ({
//   //         ...off,
//   //         employeeId: off.employeeId?._id || off.employeeId,
//   //         dayOfWeek: off.dayOfWeek || (off.date ? dayjs(off.date).format("dddd") : ""),
//   //       }));

//   //       setWeeklyOffs(enhancedOffs);
//   //       setEmployees(employeesRes.data?.data || employeesRes.data || []);
//   //     } catch (err) {
//   //       console.error("Error fetching data:", err);
//   //       setError("Failed to load weekly off schedule");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);


//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       let offsRes;

//       if (user?.role === "admin") {
//         offsRes = await API.get("/weekly-offs/admin");
//       } else {
//         offsRes = await API.get("/weekly-offs/me");
//       }

//       setWeeklyOffs(offsRes.data || []);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to load weekly off schedule");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (user) fetchData();
// }, [user]);

//   const getEmployeeDetails = (employeeId) => {
//     if (!employeeId) return { _id: "", name: "Unknown", email: "", role: "" };
//     const employee = employees.find((emp) => emp._id === employeeId);
//     return employee || { _id: employeeId, name: "Unknown", email: "", role: "" };
//   };

//   const groupByEmployee = () => {
//     const grouped = {};
//     weeklyOffs.forEach((off) => {
//       const employeeId = off.employeeId;
//       if (!employeeId) return;
//       const employee = getEmployeeDetails(employeeId);

//       if (!grouped[employeeId]) grouped[employeeId] = { employee, dates: [] };

//       if (off.date) {
//         grouped[employeeId].dates.push({
//           date: dayjs(off.date),
//           id: off._id,
//           dayOfWeek: off.dayOfWeek || dayjs(off.date).format("dddd"),
//         });
//       }
//     });

//     return Object.values(grouped).map((item) => ({
//       ...item,
//       dates: item.dates
//         .filter((d) => (selectedMonth ? d.date.format("YYYY-MM") === selectedMonth : true))
//         .sort((a, b) => a.date - b.date),
//     }));
//   };

//   const processedWeeklyOffs = groupByEmployee();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-600">{error}</div>;

//   const myWeeklyOff = processedWeeklyOffs.find((off) => off.employee._id === user?._id);

//   return (
//     <div className="p-4 space-y-6 max-w-6xl mx-auto">
//       {/* Logged-in Employee's Weekly Off */}
//       {myWeeklyOff && (
//         <div className="bg-indigo-50 rounded-xl p-6 shadow-md">
//           <h2 className="font-bold text-lg mb-2">Your Weekly Off Days</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             {selectedMonth ? dayjs(selectedMonth).format("MMMM YYYY") : "All scheduled off days"}
//           </p>
//           <div className="flex flex-wrap gap-3">
//             {myWeeklyOff.dates.length > 0 ? (
//               myWeeklyOff.dates.map((d) => (
//                 <div key={d.id} className="px-3 py-1.5 rounded bg-white border text-indigo-800 text-sm flex items-center gap-2">
//                   <span>{d.date.format("DD MMM")}</span>
//                   <span className="text-gray-500">{d.dayOfWeek.substring(0, 3)}</span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No scheduled off days</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Month Filter */}
//       <div className="flex items-center gap-3">
//         <label className="text-gray-700 font-medium">Select Month:</label>
//         <input
//           type="month"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="border rounded px-3 py-1"
//         />
//         <button
//           onClick={() => setSelectedMonth(dayjs().format("YYYY-MM"))}
//           className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Team Weekly Off */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="font-bold text-lg mb-4">Team Weekly Off Schedule</h2>
//         {processedWeeklyOffs.length === 0 ? (
//           <p className="text-gray-500">No weekly offs scheduled</p>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Off Days</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {processedWeeklyOffs.map((off) => (
//                 <tr key={off.employee._id}>
//                   <td className="px-4 py-2">{off.employee.name}</td>
//                   <td className="px-4 py-2">{off.employee.role || "Employee"}</td>
//                   <td className="px-4 py-2 flex flex-wrap gap-2">
//                     {off.dates.map((d) => (
//                       <span key={d.id} className="px-2 py-1 bg-gray-100 rounded text-sm">
//                         {d.date.format("DD MMM")}
//                       </span>
//                     ))}
//                   </td>
//                   <td className="px-4 py-2">{off.dates.length}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeeklyOff;




import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import API from "../api/axios";
import dayjs from "dayjs";

const WeeklyOff = () => {
  const { user } = useOutletContext() || {};
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  // ✅ Fetch weekly offs (role based)
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res =
          user.role === "admin"
            ? await API.get("/weekly-offs/admin")
            : await API.get("/weekly-offs/me");

        setWeeklyOffs(res.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load weekly off schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ✅ Group weekly offs by employee
  const processedWeeklyOffs = weeklyOffs.reduce((acc, off) => {
    const employee = off.userId;
    if (!employee) return acc;

    if (!acc[employee._id]) {
      acc[employee._id] = {
        employee,
        dates: [],
      };
    }

    const dateObj = dayjs(off.date);

    if (!selectedMonth || dateObj.format("YYYY-MM") === selectedMonth) {
      acc[employee._id].dates.push({
        id: off._id,
        date: dateObj,
        dayOfWeek: dateObj.format("dddd"),
      });
    }

    return acc;
  }, {});

  const groupedData = Object.values(processedWeeklyOffs);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const myWeeklyOff = groupedData.find(
    (off) => off.employee._id === user?._id
  );

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* ✅ My Weekly Off */}
      {myWeeklyOff && (
        <div className="bg-indigo-50 rounded-xl p-6 shadow-md">
          <h2 className="font-bold text-lg mb-2">Your Weekly Off Days</h2>
          <p className="text-sm text-gray-600 mb-4">
            {dayjs(selectedMonth).format("MMMM YYYY")}
          </p>

          <div className="flex flex-wrap gap-3">
            {myWeeklyOff.dates.length > 0 ? (
              myWeeklyOff.dates.map((d) => (
                <div
                  key={d.id}
                  className="px-3 py-1.5 rounded bg-white border text-indigo-800 text-sm"
                >
                  {d.date.format("DD MMM")} ({d.dayOfWeek.slice(0, 3)})
                </div>
              ))
            ) : (
              <p className="text-gray-500">No scheduled off days</p>
            )}
          </div>
        </div>
      )}

      {/* ✅ Month Filter */}
      <div className="flex items-center gap-3">
        <label className="font-medium">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <button
          onClick={() => setSelectedMonth(dayjs().format("YYYY-MM"))}
          className="px-3 py-1 bg-gray-100 rounded"
        >
          Reset
        </button>
      </div>

      {/* ✅ Team Weekly Off (Admin) */}
      {user?.role === "admin" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-bold text-lg mb-4">
            Team Weekly Off Schedule
          </h2>

          {groupedData.length === 0 ? (
            <p className="text-gray-500">No weekly offs scheduled</p>
          ) : (
            <table className="min-w-full divide-y">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Employee</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Off Days</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {groupedData.map((off) => (
                  <tr key={off.employee._id}>
                    <td className="px-4 py-2">{off.employee.name}</td>
                    <td className="px-4 py-2">{off.employee.role}</td>
                    <td className="px-4 py-2">
                      {off.dates.map((d) => (
                        <span key={d.id} className="mr-2">
                          {d.date.format("DD MMM")}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-2">{off.dates.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyOff;
