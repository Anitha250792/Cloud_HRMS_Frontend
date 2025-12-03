import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      style={{
        width: collapsed ? "70px" : "220px",
        transition: "0.3s",
        background: "#065f46",
        color: "white",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        paddingTop: "80px",
        boxShadow: "3px 0 10px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          top: 20,
          right: -15,
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "#064e3b",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {collapsed ? "»" : "«"}
      </button>

      {/* Menu List */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <MenuItem
          label="Dashboard"
          icon="📊"
          to="/"
          active={isActive("/")}
          collapsed={collapsed}
        />

        <MenuSection title="EMPLOYEES" collapsed={collapsed} />
        <MenuItem
          label="Employee List"
          icon="👥"
          to="/employees"
          active={isActive("/employees")}
          collapsed={collapsed}
        />
        <MenuItem
          label="Add Employee"
          icon="➕"
          to="/employees/add"
          active={isActive("/employees/add")}
          collapsed={collapsed}
        />

        <MenuSection title="PAYROLL" collapsed={collapsed} />
        <MenuItem
          label="Payroll Records"
          icon="💰"
          to="/payroll"
          active={isActive("/payroll")}
          collapsed={collapsed}
        />
        <MenuItem
          label="Generate Payroll"
          icon="⚙️"
          to="/payroll/add"
          active={isActive("/payroll/add")}
          collapsed={collapsed}
        />

        <MenuSection title="ATTENDANCE" collapsed={collapsed} />
        <MenuItem
          label="Check-in/Out"
          icon="⏱"
          to="/attendance/actions"
          active={isActive("/attendance/actions")}
          collapsed={collapsed}
        />
        <MenuItem
          label="Attendance Records"
          icon="📋"
          to="/attendance"
          active={isActive("/attendance")}
          collapsed={collapsed}
        />

        <MenuSection title="LEAVES" collapsed={collapsed} />
        <MenuItem
          label="Leave Requests"
          icon="📝"
          to="/leave"
          active={isActive("/leave")}
          collapsed={collapsed}
        />
        <MenuItem
          label="Apply Leave"
          icon="🟢"
          to="/leave/apply"
          active={isActive("/leave/apply")}
          collapsed={collapsed}
        />
        <MenuItem
          label="Approve Leaves"
          icon="✔️"
          to="/leave/approve"
          active={isActive("/leave/approve")}
          collapsed={collapsed}
        />

        {/* Logout */}
        <MenuItem
          label="Logout"
          icon="🚪"
          to="#"
          collapsed={collapsed}
          active={false}
          onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("google_name");
            localStorage.removeItem("google_picture");
            window.location.href = "/login";
          }}
        />
      </nav>
    </aside>
  );
}

/* ------------------ MENU ITEM (FINAL VERSION) ------------------ */
function MenuItem({ label, icon, to, active, collapsed, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        padding: "10px 16px",
        margin: "2px 10px",
        borderRadius: 8,
        textDecoration: "none",
        color: "white",
        fontWeight: active ? 700 : 500,
        background: active ? "rgba(255,255,255,0.2)" : "transparent",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "0.2s",
        fontSize: 14,
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

/* ------------------ SECTION TITLE ------------------ */
function MenuSection({ title, collapsed }) {
  if (collapsed) return null;
  return (
    <p
      style={{
        margin: "15px 20px 5px",
        color: "#d1fae5",
        fontSize: 12,
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      {title}
    </p>
  );
}

export default Sidebar;
