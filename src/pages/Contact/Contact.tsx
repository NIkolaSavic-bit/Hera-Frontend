import React from "react";
import "./Contact.css";

const Contact: React.FC = () => {
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.6938539665967!2d18.34407631546684!3d42.66766887916752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c23a9eacb7b4d%3A0x5d1c5e7e5b8e5e1f!2sCarice%20Milice%2C%20Trebinje!5e0!3m2!1sen!2sba!4v1620000000000!5m2!1sen!2sba";
  const googleMapsUrl = "https://www.google.com/maps?q=Carice+Milice,+Trebinje";

  return (
    <div className="contact-section">
      <h1>Kontakt</h1>
      <div className="contact-container">
        <div className="contact-info">
          <p>
            Instagram:{" "}
            <a href="https://www.instagram.com/demiannn.k" target="_blank" rel="noopener noreferrer">
              @Damjan Krunic
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="https://mail.google.com/mail/u/1/#inbox">
              your-email@example.com
            </a>
          </p>
          <p>Telefon: +123 456 7890</p>
          <p>
            Lokacija:{" "}
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Carice Milice, Trebinje
            </a>
          </p>
        </div>

        <div className="map-wrapper">
          <iframe
            title="Lokacija"
            src={mapEmbedUrl}
            allowFullScreen
            loading="lazy"
            className="responsive-map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;