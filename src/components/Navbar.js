import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "#ffffff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 2000,
      }}
    >
      {/* Left Section */}
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 20,
            color: "#065f46",
            fontWeight: 700,
          }}
        >
          HRMS Cloud
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          DevOps Ready Payroll + Attendance System
        </p>
      </div>

      {/* Right Menu */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link style={navBtn} to="/profile">
          👤 Profile
        </Link>
        <Link style={navBtnBlue} to="/settings">
          ⚙️ Settings
        </Link>
        <Link style={logoutBtn} to="/logout">
          ⏻ Logout
        </Link>
      </div>
    </header>
  );
}

const navBtn = {
  color: "#065f46",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
};

const navBtnBlue = {
  background: "#ecfdf5",
  padding: "6px 14px",
  borderRadius: 20,
  textDecoration: "none",
  color: "#065f46",
  fontSize: 14,
  fontWeight: 600,
  boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
};

const logoutBtn = {
  background: "#ef4444",
  padding: "6px 14px",
  borderRadius: 20,
  textDecoration: "none",
  color: "white",
  fontSize: 14,
  fontWeight: 600,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default Navbar;
