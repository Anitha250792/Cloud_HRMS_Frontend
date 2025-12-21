import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


function AttendanceSummary() {
  const [today, setToday] = useState({});
  const [month, setMonth] = useState({});

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const t = await api.get("attendance/summary_today/");
    setToday(t.data);

    const m = await api.get("attendance/summary_month/");
    setMonth(m.data);
  };

  return (
    <div>
      <h2>Attendance Summary</h2>

      <div className="row mt-4">
        
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Today Summary</h5>
            <p>Total Employees: {today.total_employees}</p>
            <p>Present Today: {today.present_today}</p>
            <p>Absent Today: {today.absent_today}</p>
            <p>Late Employees: {today.late_employees}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>This Month Summary</h5>
            <p>Total Hours Worked: {month.total_hours_worked}</p>
            <p>Total Present Days: {month.total_present_days}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AttendanceSummary;
