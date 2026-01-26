

//-----------------------------
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const UserWeeklyOff = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // 🔹 FETCH USER WEEKLY OFFS
  const fetchWeeklyOffs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/weekly-off/me");
      setWeeklyOffs(res.data || []);
    } catch (err) {
      console.error("Failed to load weekly offs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyOffs();
  }, []);

  // 🔹 SAFE MONTH FILTER (NO TIMEZONE BUG)
  const filteredWeeklyOffs = weeklyOffs.filter((off) => {
    const offDate = new Date(off.date);
    return (
      offDate.getFullYear() === selectedMonth.getFullYear() &&
      offDate.getMonth() === selectedMonth.getMonth()
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700">
        My Weekly Offs
      </h1>

      {/* MONTH PICKER */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
        <label className="font-semibold text-gray-700">
          Select Month:
        </label>

        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border p-2 rounded focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={() => setSelectedMonth(new Date())}
          className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : filteredWeeklyOffs.length === 0 ? (
        <div className="text-gray-500">
          No weekly offs for this month.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-3">
          {filteredWeeklyOffs
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((off) => (
              <span
                key={off._id}
                className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm shadow"
              >
                {format(new Date(off.date), "EEE, dd MMM yyyy")}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserWeeklyOff;
