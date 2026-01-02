import React, { useState } from "react";
import api from "../api/axios";

export default function LoginHours() {
  const [loading, setLoading] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await api.post("/login-hours/login");
      setLoggedIn(true);
      alert("Login recorded");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post("/login-hours/logout");
      setLoggedIn(false);
      setOnBreak(false);
      alert("Logout recorded");
    } catch (err) {
      alert("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const startBreak = async () => {
    try {
      setLoading(true);
      await api.post("/login-hours/break/start");
      setOnBreak(true);
      alert("Break started");
    } catch (err) {
      alert("Unable to start break");
    } finally {
      setLoading(false);
    }
  };

  const endBreak = async () => {
    try {
      setLoading(true);
      await api.post("/login-hours/break/end");
      setOnBreak(false);
      alert("Break ended");
    } catch (err) {
      alert("Unable to end break");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login Hours & Breaks
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* LOGIN */}
        <button
          onClick={handleLogin}
          disabled={loading || loggedIn}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          Login
        </button>

        {/* START BREAK */}
        <button
          onClick={startBreak}
          disabled={!loggedIn || onBreak || loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          Start Break
        </button>

        {/* END BREAK */}
        <button
          onClick={endBreak}
          disabled={!onBreak || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          End Break
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          disabled={!loggedIn || onBreak || loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
