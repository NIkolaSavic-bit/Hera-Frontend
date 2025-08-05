import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ReservationManagement from "../pages/ReservationManagement/ReservationManagement";
import RegistrationForm from "../components/Registration/RegistrationForm";
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
      <ReservationManagement />
      <RegistrationForm />
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
