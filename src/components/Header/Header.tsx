import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="logo">
        <div className="logo-image"></div>
      </div>
      <div className="name">
        <a className="name-image" href="/"></a>
      </div>
      <div className="links">
        <a href="#our-services">Services</a>
        <a href="#about-stats">About</a>
        <a href="#client-love">Contact</a>
      </div>
      <div className="book-now">
        <button>Book Now</button>
      </div>
    </div>
  );
}
export default Header;
