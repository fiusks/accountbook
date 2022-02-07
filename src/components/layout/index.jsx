import "./style.scss";
import NavBar from "../navBar";
import { Outlet } from "react-router-dom";
import Header from "../header";
import { UserProvider } from "../../contexts/UserContext";

function Layout() {
  return (
    <UserProvider>
      <div className="layout-container">
        <nav className="navbar">
          <NavBar />
        </nav>
        <div className="header-body">
          <header className="header-layout">
            <Header />
          </header>
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
}

export default Layout;
