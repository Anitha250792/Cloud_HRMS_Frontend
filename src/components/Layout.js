import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Header />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
