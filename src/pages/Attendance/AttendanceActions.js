import { useEffect, useState } from "react";
import api from "../../api/api";

function AttendanceActions() {
  const [status, setStatus] = useState("Loading...");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodayStatus();
  }, []);

  const loadTodayStatus = async () => {
    try {
      const res = await api.get("/api/attendance/my-today/");

      if (res.data.status === "NOT_MARKED") {
        setStatus("Not Checked In");
        return;
      }

      setStatus(res.data.status);
      setCheckInTime(res.data.check_in);
      setCheckOutTime(res.data.check_out);
    } catch (err) {
      console.error(err);
      setStatus("Error");
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/attendance/check-in/");
      setStatus("Checked In");
      setCheckInTime(res.data.data.check_in);
    } catch (err) {
      alert(err.response?.data?.error || "Check-in failed");
    }
    setLoading(false);
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/attendance/check-out/");
      setStatus("Checked Out");
      setCheckOutTime(res.data.data.check_out);
    } catch (err) {
      alert(err.response?.data?.error || "Check-out failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Attendance</h2>
      <h3>{status}</h3>

      {checkInTime && <p>In: {new Date(checkInTime).toLocaleTimeString()}</p>}
      {checkOutTime && <p>Out: {new Date(checkOutTime).toLocaleTimeString()}</p>}

      <button disabled={loading || status !== "Not Checked In"} onClick={handleCheckIn}>
        Check In
      </button>

      <button disabled={loading || status !== "Checked In"} onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
}
/* ------------------------------ STYLES ------------------------------ */

const page = {
  minHeight: "100vh",
  padding: 24,
  background: "#e0f2fe",
};

const title = {
  color: "#0369a1",
  marginBottom: 20,
  fontWeight: 700,
};

const card = {
  background: "white",
  padding: 24,
  borderRadius: 14,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  maxWidth: 500,
};

const label = {
  fontSize: 14,
  color: "#6b7280",
};

const value = {
  fontSize: 28,
  fontWeight: 700,
  color: "#0ea5e9",
};

const info = {
  marginTop: 8,
  fontSize: 14,
  color: "#475569",
};

const btnRow = {
  display: "flex",
  gap: 10,
  marginTop: 20,
};

const btn = {
  flex: 1,
  padding: "12px 14px",
  borderRadius: 10,
  color: "white",
  fontWeight: 600,
  border: "none",
  fontSize: 16,
  cursor: "pointer",
};

export default AttendanceActions;
