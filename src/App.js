import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./components/ErrorBoundary";


/* AUTH */
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";

/* DASHBOARDS */
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

/* EMPLOYEES */
import EmployeeList from "./pages/Employees/EmployeeList";
import AddEmployee from "./pages/Employees/AddEmployee";
import EditEmployee from "./pages/Employees/EditEmployee";
import EmployeeSalary from "./pages/Employees/EmployeeSalary";
import EmployeeDetail from "./pages/Employees/EmployeeDetail";
import EmployeeDirectory from "./pages/Employees/EmployeeDirectory";
import EmployeeView from "./pages/Employees/EmployeeView";

/* PAYROLL */
import PayrollList from "./pages/Payroll/PayrollList";
import AddPayroll from "./pages/Payroll/AddPayroll";

/* ATTENDANCE */
import AttendanceActions from "./pages/Attendance/AttendanceActions";
import AttendanceList from "./pages/Attendance/AttendanceList";
import HRWorkingHours from "./pages/Attendance/HRWorkingHours";

/* LEAVE */
import MyLeaves from "./pages/Leave/MyLeaves";
import ApplyLeave from "./pages/Leave/ApplyLeave";
import ApproveLeave from "./pages/Leave/ApproveLeave";

const SIDEBAR_WIDTH = 240;

function AppLayout() {
  const location = useLocation();

  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];

  const hideSidebar = authRoutes.includes(location.pathname);

  return (
    <>
      {!hideSidebar && <Sidebar />}

      <main
        style={{
          marginLeft: hideSidebar ? 0 : SIDEBAR_WIDTH,
          minHeight: "100vh",
          padding: 24,
          background: "#F8FAFC",
        }}
      >
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* PROTECTED */}
          <Route element={<RequireAuth />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/edit/:id" element={<EditEmployee />} />
            <Route path="/employees/salary/:id" element={<EmployeeSalary />} />
            <Route path="/employees/detail/:id" element={<EmployeeDetail />} />
            <Route path="/employees/view/:id" element={<EmployeeView />} />
            <Route path="/employees/directory" element={<EmployeeDirectory />} />

            <Route path="/payroll" element={<PayrollList />} />
            <Route path="/payroll/add" element={<AddPayroll />} />

            <Route path="/attendance" element={<AttendanceList />} />
            <Route path="/attendance/actions" element={<AttendanceActions />} />
            <Route path="/attendance/working-hours" element={<HRWorkingHours />} />

            <Route path="/leave/my" element={<MyLeaves />} />
            <Route path="/leave/apply" element={<ApplyLeave />} />
            <Route path="/leave/approve" element={<ApproveLeave />} />
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default AppLayout;
