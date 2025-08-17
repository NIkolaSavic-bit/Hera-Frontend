import "./Footer.css";
function Footer() {
  return (
    <div className="main-footer">
      <div className="image-name">
        <div className="logo-footer">
          <div className="logo-image-footer"></div>
        </div>
        <div className="name-footer">
          <a className="name-image-footer" href="/"></a>
        </div>
      </div>
      <div className="zaposleni">
        <h3>Za zaposlene</h3>
        <a href="/login">Prijava na sistem</a>
      </div>
    </div>
  );
}
export default Footer;
