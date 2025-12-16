import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {

  // ✅ LOGOUT FUNCTION (CONNECTED TO HEADER)
  const logout = () => {
    localStorage.clear();   // ✅ clears JWT
    window.location.href = "/";   // ✅ redirect to login
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flexGrow: 1 }}>
        {/* ✅ Pass logout to Header */}
        <Header onLogout={logout} />

        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
