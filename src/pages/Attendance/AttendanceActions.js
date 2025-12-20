import { useEffect, useState } from "react";
import api from "../../api/api";

import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


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


export default AttendanceActions;
