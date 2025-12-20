import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiClock,
  FiCalendar,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiDollarSign,
  FiFolder,
  FiUser,
  FiShield,
} from "react-icons/fi";

/* 🎨 COLORS */
const COLORS = {
  primary: "#2563EB",     // Blue
  highlight: "#BFDBFE",   // Light blue
  lightBlue: "#EFF6FF",
  border: "#E5E7EB",
  textDark: "#1E3A8A",
};

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");

  /* 🔐 Load user safely */
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("username");

    if (!storedRole) {
      navigate("/login", { replace: true });
    } else {
      setRole(storedRole);
      setUsername(storedName || "User");
    }
  }, [navigate]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;
  const isGroupActive = (path) => location.pathname.startsWith(path);

  /* 🚪 Logout */
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  if (!role) return null;

  return (
    <aside style={styles.sidebar(collapsed)}>
      {/* COLLAPSE BUTTON */}
      <button
        style={styles.collapseBtn}
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? "›" : "‹"}
      </button>

      {/* ===== PROFILE / LOGO ===== */}
      <div style={styles.profileBox}>
        <div style={styles.logoCircle}>
          {role === "HR" ? <FiShield size={26} /> : <FiUser size={26} />}
        </div>

        {!collapsed && (
          <div>
            <div style={styles.userName}>{username}</div>
            <div style={styles.userRole}>
              {role === "HR" ? "Administrator" : "Employee"}
            </div>
          </div>
        )}
      </div>

      <nav style={{ overflowY: "auto", height: "100%" }}>
        {/* DASHBOARD */}
        <MenuLink
          icon={<FiHome />}
          label="Dashboard"
          to={role === "HR" ? "/admin-dashboard" : "/employee-dashboard"}
          active={
            isGroupActive("/admin-dashboard") ||
            isGroupActive("/employee-dashboard")
          }
          collapsed={collapsed}
        />

        {/* ================= HR ================= */}
        {role === "HR" && (
          <>
            <Dropdown
              title="Employees"
              icon={<FiUsers />}
              open={openMenu === "employees"}
              onClick={() => toggleMenu("employees")}
              active={isGroupActive("/employees")}
              collapsed={collapsed}
            >
              <SubLink to="/employees" label="Employee List" active={isActive("/employees")} />
              <SubLink to="/employees/add" label="Add Employee" active={isActive("/employees/add")} />
            </Dropdown>

            <Dropdown
              title="Attendance"
              icon={<FiClock />}
              open={openMenu === "attendance"}
              onClick={() => toggleMenu("attendance")}
              active={isGroupActive("/attendance")}
              collapsed={collapsed}
            >
              <SubLink to="/attendance" label="Attendance Logs" active={isActive("/attendance")} />
              <SubLink to="/attendance/working-hours" label="Working Hours" active={isActive("/attendance/working-hours")} />
            </Dropdown>

            <Dropdown
              title="Payroll"
              icon={<FiDollarSign />}
              open={openMenu === "payroll"}
              onClick={() => toggleMenu("payroll")}
              active={isGroupActive("/payroll")}
              collapsed={collapsed}
            >
              <SubLink to="/payroll" label="Payroll Records" active={isActive("/payroll")} />
              <SubLink to="/payroll/add" label="Generate Payroll" active={isActive("/payroll/add")} />
            </Dropdown>

            <Dropdown
              title="Leaves"
              icon={<FiCalendar />}
              open={openMenu === "leaves"}
              onClick={() => toggleMenu("leaves")}
              active={isGroupActive("/leave")}
              collapsed={collapsed}
            >
              <SubLink to="/leave/approve" label="Approve Leaves" active={isActive("/leave/approve")} />
            </Dropdown>

            <Dropdown
              title="Documents"
              icon={<FiFolder />}
              open={openMenu === "documents"}
              onClick={() => toggleMenu("documents")}
              active={isGroupActive("/documents")}
              collapsed={collapsed}
            >
              <SubLink to="/documents/hr-view" label="Employee Documents" active={isActive("/documents/hr-view")} />
            </Dropdown>
          </>
        )}

        {/* ================= EMPLOYEE ================= */}
        {role === "EMPLOYEE" && (
          <>
            <Dropdown
              title="Attendance"
              icon={<FiClock />}
              open={openMenu === "attendance"}
              onClick={() => toggleMenu("attendance")}
              active={isGroupActive("/attendance")}
              collapsed={collapsed}
            >
              <SubLink to="/attendance/actions" label="Check In / Out" active={isActive("/attendance/actions")} />
              <SubLink to="/attendance" label="My Records" active={isActive("/attendance")} />
            </Dropdown>

            <Dropdown
              title="Leaves"
              icon={<FiCalendar />}
              open={openMenu === "leaves"}
              onClick={() => toggleMenu("leaves")}
              active={isGroupActive("/leave")}
              collapsed={collapsed}
            >
              <SubLink to="/leave" label="My Leaves" active={isActive("/leave")} />
              <SubLink to="/leave/apply" label="Apply Leave" active={isActive("/leave/apply")} />
            </Dropdown>
          </>
        )}

        {/* LOGOUT */}
        <div style={styles.logout} onClick={logout}>
          <FiLogOut />
          {!collapsed && <span>Logout</span>}
        </div>
      </nav>
    </aside>
  );
}

/* ================= COMPONENTS ================= */

function MenuLink({ icon, label, to, active, collapsed }) {
  return (
    <Link to={to} style={styles.link(active)}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

function Dropdown({ title, icon, open, onClick, active, children, collapsed }) {
  return (
    <div>
      <div style={styles.dropdownHead(active)} onClick={onClick}>
        {icon}
        {!collapsed && <span>{title}</span>}
        {!collapsed && (open ? <FiChevronDown /> : <FiChevronRight />)}
      </div>

      {open && !collapsed && (
        <div style={styles.dropdownBody}>{children}</div>
      )}
    </div>
  );
}

function SubLink({ to, label, active }) {
  return (
    <Link to={to} style={styles.subLink(active)}>
      {label}
    </Link>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: (collapsed) => ({
    width: collapsed ? 70 : 240,
    background: COLORS.primary,
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    paddingTop: 90,
    transition: "0.3s",
    zIndex: 1000,
  }),

  collapseBtn: {
    position: "absolute",
    top: 20,
    right: -12,
    width: 26,
    height: 26,
    borderRadius: "50%",
    border: `1px solid ${COLORS.border}`,
    background: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },

  profileBox: {
    position: "absolute",
    top: 16,
    left: 12,
    right: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
  },

  logoCircle: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.primary,
  },

  userName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#fff",
  },

  userRole: {
    fontSize: 12,
    color: "#BFDBFE",
    fontWeight: 600,
  },

  link: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    margin: "4px 12px",
    borderRadius: 10,
    textDecoration: "none",
    color: active ? COLORS.textDark : "#fff",
    background: active ? COLORS.highlight : "transparent",
    fontWeight: 600,
  }),

  dropdownHead: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    margin: "6px 12px",
    borderRadius: 10,
    cursor: "pointer",
    background: active ? COLORS.highlight : "rgba(255,255,255,0.15)",
    color: active ? COLORS.textDark : "#fff",
    fontWeight: 600,
  }),

  dropdownBody: {
    marginLeft: 36,
    marginTop: 6,
    marginBottom: 6,
    padding: 8,
    borderRadius: 10,
    background: COLORS.lightBlue,
  },

  subLink: (active) => ({
    display: "block",
    padding: "6px 10px",
    marginBottom: 4,
    borderRadius: 8,
    textDecoration: "none",
    background: active ? COLORS.primary : "transparent",
    color: active ? "#fff" : "#1F2937",
    fontWeight: active ? 600 : 500,
  }),

  logout: {
    margin: 16,
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#fff",
    fontWeight: 700,
  },
};

export default Sidebar;
