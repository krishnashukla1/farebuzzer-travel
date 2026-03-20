

import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const PAGE_SIZE = 10;

export default function AttendanceAdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.get("/attendance");
        setRecords(res.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance records");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  /* -------------------- STATUS LOGIC -------------------- */
  const getFinalStatus = (record) => {
    if (record?.isLeaveApproved) return "Leave";
    if (!record?.status) return "Absent";
    return record.status;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 border-green-200";
      case "Absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "Leave":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Half Day":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Late":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  /* -------------------- DATE FILTER -------------------- */
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const recordDate = new Date(r.date);
      if (fromDate && recordDate < new Date(fromDate)) return false;
      if (toDate && recordDate > new Date(toDate)) return false;
      return true;
    });
  }, [records, fromDate, toDate]);

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, page]);

  /* -------------------- CSV DOWNLOAD -------------------- */
  const downloadCSV = () => {
    const headers = ["Name", "Email", "Date", "Status"];
    const rows = filteredRecords.map((r) => [
      r.user?.name || "",
      r.user?.email || "",
      new Date(r.date).toLocaleDateString("en-GB"),
      getFinalStatus(r),
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  /* -------------------- UI STATES -------------------- */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600 text-lg animate-pulse">
        Loading attendance records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow border border-red-100 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Attendance Overview
        </h2>

        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setPage(1);
            }}
            className="cursor-pointer border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(1);
            }}
            className="cursor-pointer border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={downloadCSV}
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Download
          </button>
        </div>
      </div>

      {/* TABLE */}
      {paginatedRecords.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl">
          No records found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Employee", "Email", "Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedRecords.map((record) => {
                const finalStatus = getFinalStatus(record);

                return (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {record.user?.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.user?.email || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(record.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${getStatusStyle(
                          finalStatus
                        )}`}
                      >
                        {finalStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="cursor-pointer px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="px-4 py-1 text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="cursor-pointer px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
