import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// ------------------- DASHBOARD -------------------
import Dashboard from "./pages/Dashboard";

// ------------------- EMPLOYEES -------------------
import EmployeeList from "./pages/Employees/EmployeeList";
import AddEmployee from "./pages/Employees/AddEmployee";
import EditEmployee from "./pages/Employees/EditEmployee";
import EmployeeSalary from "./pages/Employees/EmployeeSalary";

// ------------------- PAYROLL -------------------
import PayrollList from "./pages/Payroll/PayrollList";
import AddPayroll from "./pages/Payroll/AddPayroll";

// ------------------- ATTENDANCE -------------------
import AttendanceActions from "./pages/Attendance/AttendanceActions";
import AttendanceList from "./pages/Attendance/AttendanceList";

// ------------------- LEAVE -------------------
import LeaveList from "./pages/Leave/LeaveList";
import ApplyLeave from "./pages/Leave/ApplyLeave";
import LeaveApproval from "./pages/Leave/LeaveApproval";

// ------------------- AUTH -------------------
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";


function AppLayout() {
  const location = useLocation();

  // AUTH PAGES where sidebar must be hidden
  const hideSidebarRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];

  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideSidebar && <Sidebar />}

      <div style={{ marginLeft: shouldHideSidebar ? "0px" : "220px", padding: "20px" }}>
        <Routes>

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Employees */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/salary/:id" element={<EmployeeSalary />} />

          {/* Payroll */}
          <Route path="/payroll" element={<PayrollList />} />
          <Route path="/payroll/add" element={<AddPayroll />} />

          {/* Attendance */}
          <Route path="/attendance/actions" element={<AttendanceActions />} />
          <Route path="/attendance" element={<AttendanceList />} />

          {/* Leaves */}
          <Route path="/leave" element={<LeaveList />} />
          <Route path="/leave/apply" element={<ApplyLeave />} />
          <Route path="/leave/approve" element={<LeaveApproval />} />

        </Routes>
      </div>
    </>
  );
}


function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
