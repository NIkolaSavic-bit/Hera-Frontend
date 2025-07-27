import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";
function Layout() {
  return (
    <>
      <header className="header">
        <Header />
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
