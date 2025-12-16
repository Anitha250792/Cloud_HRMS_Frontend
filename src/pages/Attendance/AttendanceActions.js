import { useEffect, useState } from "react";
import api from "../../api/api";

function AttendanceActions() {
  const [status, setStatus] = useState("Loading...");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const employeeId = localStorage.getItem("employee_id");

  useEffect(() => {
    loadTodayStatus();
  }, []);

  /* -------------------- LOAD TODAY'S ATTENDANCE -------------------- */
  const loadTodayStatus = async () => {
    try {
      const res = await api.get("attendance/records/");

      const today = new Date().toISOString().split("T")[0];

      const record = res.data.find(
        (r) =>
          r.employee_id === Number(employeeId) &&
          r.check_in?.startsWith(today)
      );

      if (!record) {
        setStatus("Not Checked In");
        return;
      }

      setCheckInTime(record.check_in);
      setCheckOutTime(record.check_out);

      setStatus(record.check_out ? "Checked Out" : "Checked In");
    } catch (err) {
      console.error("Load today status error:", err);
    }
  };

  /* -------------------------- CHECK IN --------------------------- */
  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/attendance/check-in/", {
        employee_id: employeeId,
      });

      setStatus("Checked In");
      setCheckInTime(res.data.data.check_in);
    } catch (err) {
      console.error("Check-in error:", err);
    }
    setLoading(false);
  };

  /* -------------------------- CHECK OUT --------------------------- */
  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/attendance/check-out/", {
        employee_id: employeeId,
      });

      setStatus("Checked Out");
      setCheckOutTime(res.data.data.check_out);
    } catch (err) {
      console.error("Check-out error:", err);
    }
    setLoading(false);
  };

  /* ------------------------------ UI ------------------------------ */
  return (
    <div style={page}>
      <h2 style={title}>⏱ Attendance — Check-in / Check-out</h2>

      <div style={card}>
        <p style={label}>Today's Status</p>
        <h3 style={value}>{status}</h3>

        {checkInTime && (
          <p style={info}>✔ Checked in at: {new Date(checkInTime).toLocaleTimeString()}</p>
        )}

        {checkOutTime && (
          <p style={info}>✔ Checked out at: {new Date(checkOutTime).toLocaleTimeString()}</p>
        )}

        <div style={btnRow}>
          <button
            style={{
              ...btn,
              background: status === "Not Checked In" ? "#22c55e" : "#9ca3af",
            }}
            disabled={status !== "Not Checked In" || loading}
            onClick={handleCheckIn}
          >
            {loading ? "Processing..." : "Check In"}
          </button>

          <button
            style={{
              ...btn,
              background: status === "Checked In" ? "#ef4444" : "#9ca3af",
            }}
            disabled={status !== "Checked In" || loading}
            onClick={handleCheckOut}
          >
            {loading ? "Processing..." : "Check Out"}
          </button>
        </div>
      </div>
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
