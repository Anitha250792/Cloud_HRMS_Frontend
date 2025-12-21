import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


function LiveWorkingHours() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [seconds, setSeconds] = useState(0);

  // Load today's attendance
  useEffect(() => {
  api.get("/api/attendance/my-today/")
    .then(res => {
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


  // Live counter
  useEffect(() => {
    if (!checkIn || checkOut) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [checkIn, checkOut]);

  const format = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>⏱ Live Working Hours</h3>

      {checkIn ? (
        <div style={styles.time}>{format(seconds)}</div>
      ) : (
        <p style={styles.muted}>Not checked in today</p>
      )}
    </div>
  );
}

export default LiveWorkingHours;

const styles = {
  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
  },
  time: {
    fontSize: 32,
    fontWeight: 800,
    color: "#2563EB",
  },
  muted: {
    color: "#6B7280",
  },
};
