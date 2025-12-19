import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// AUTH
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";

// DASHBOARDS
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// EMPLOYEES
import EmployeeList from "./pages/Employees/EmployeeList";
import AddEmployee from "./pages/Employees/AddEmployee";
import EditEmployee from "./pages/Employees/EditEmployee";
import EmployeeSalary from "./pages/Employees/EmployeeSalary";
import RequireAuth from "./components/RequireAuth";


// PAYROLL
import PayrollList from "./pages/Payroll/PayrollList";
import AddPayroll from "./pages/Payroll/AddPayroll";

// ATTENDANCE
import AttendanceActions from "./pages/Attendance/AttendanceActions";
import AttendanceList from "./pages/Attendance/AttendanceList";
import HRWorkingHours from "./pages/Attendance/HRWorkingHours";

// LEAVE
import LeaveList from "./pages/Leave/LeaveList";
import ApplyLeave from "./pages/Leave/ApplyLeave";
import LeaveApproval from "./pages/Leave/LeaveApproval";

const SIDEBAR_WIDTH = 240; // ✅ MUST MATCH Sidebar.js

function AppLayout() {
  const location = useLocation();

  const hideSidebarRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];

  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!hideSidebar && <Sidebar />}

      <main
        style={{
          marginLeft: hideSidebar ? 0 : SIDEBAR_WIDTH,
          minHeight: "100vh",
          padding: 24,
          background: "#F8FAFC",
          transition: "0.3s",
        }}
      >
        <Routes>
          {/* AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* DASHBOARDS */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

          {/* EMPLOYEES */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/salary/:id" element={<EmployeeSalary />} />
          <Route
  path="/employees/add"
  element={
    <RequireAuth>
      <AddEmployee />
    </RequireAuth>
  }
/>

<Route
  path="/employees"
  element={
    <RequireAuth>
      <EmployeeList />
    </RequireAuth>
  }
/>


          {/* PAYROLL */}
          <Route path="/payroll" element={<PayrollList />} />
          <Route path="/payroll/add" element={<AddPayroll />} />

          {/* ATTENDANCE */}
          <Route path="/attendance" element={<AttendanceList />} />
          <Route path="/attendance/actions" element={<AttendanceActions />} />
          <Route path="/attendance/working-hours" element={<HRWorkingHours />} />

          {/* LEAVE */}
          <Route path="/leave" element={<LeaveList />} />
          <Route path="/leave/apply" element={<ApplyLeave />} />
          <Route path="/leave/approve" element={<LeaveApproval />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
