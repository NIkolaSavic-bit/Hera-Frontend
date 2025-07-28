import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <button className="mobile-menu-btn">☰</button>
      <div className="logo">
        <div className="logo-image"></div>
      </div>
      <div className="name">
        <a className="name-image" href="/"></a>
      </div>
      <div className="links">
        <a href="#our-services">Usluge</a>
        <a href="#about-stats">O nama</a>
        <a href="#client-love">Kontakt</a>
      </div>
      <div className="book-now">
        <button>Rezerviši Termin </button>
      </div>
    </div>
  );
}
export default Header;
