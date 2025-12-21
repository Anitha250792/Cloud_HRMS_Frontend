import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function LiveWorkingHours() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [seconds, setSeconds] = useState(0);

  // Load today's attendance
  useEffect(() => {
    api
      .get("/api/attendance/my-today/")
      .then((res) => {
        if (res.data.check_in) {
          const inTime = new Date(res.data.check_in);
          setCheckIn(inTime);
          setCheckOut(res.data.check_out);

          const baseSeconds = res.data.working_hours
            ? res.data.working_hours * 3600
            : Math.floor((Date.now() - inTime.getTime()) / 1000);

          setSeconds(baseSeconds);
        }
      })
      .catch(console.error);
  }, []);

  // Live counter (runs only if checked-in & not checked-out)
  useEffect(() => {
    if (!checkIn || checkOut) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [checkIn, checkOut]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  return (
    <div style={{ ...Page.card, maxWidth: 360 }}>
      <h3 style={{ marginBottom: 12 }}>⏱ Live Working Hours</h3>

      {checkIn ? (
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#2563EB",
          }}
        >
          {formatTime(seconds)}
        </div>
      ) : (
        <p style={{ color: "#6B7280" }}>Not checked in today</p>
      )}
    </div>
  );
}

export default LiveWorkingHours;
