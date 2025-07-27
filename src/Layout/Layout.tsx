import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";
function Layout() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Layout;
