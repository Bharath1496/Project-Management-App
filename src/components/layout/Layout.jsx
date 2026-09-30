import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout(
    // { children }
) {
  return (
    <div className="app-layout">

      <Navbar />

      <div className="app-body">

        <Sidebar />

        <main className="main-content">
          {/* {children} */}
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;