function Header({ onLogout }) {
  return (
    <div className="header">
      <h2>Cloud HRMS</h2>

      {/* ✅ Logout Button */}
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Header;
