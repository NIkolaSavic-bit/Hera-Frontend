import ImageSlider from "../../components/ImageSlider/ImageSlider";
import ServiceCard from "../../components/Services/Services";
import Contact from "../Contact/Contact";
import Reservation from "../Reservation/Reservation";
import Rating from "..//Rating/Rating";
import { ServiceService } from "../../services/ServiceService";
import "./HomePage.css";
import { useEffect, useState } from "react";
import type { Service } from "../../models/Service/Service";

function HomePage() {
  const serviceService = new ServiceService();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [heraServices, setHeraServices] = useState<Service[]>();

useEffect(() => {
  const fetchServices = async () => {
    try {
      const allServices = await serviceService.getAllServices();
      setHeraServices(allServices);
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  fetchServices();
}, []);

  const handleCardClick = (index: number) => {
    setActiveCardIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="home-container">
      <div id="intro">
        <h1>Zasijajte svojom prirodnom lepotom</h1>
        <h3>
          Zakoračite u naše mirno i minimalističko utočište, mesto gde se luksuz
          susreće sa pažnjom i posvećenošću. Doživite nežne i efikasne tretmane
          – od laserskog uklanjanja dlačica, preko umetnosti noktiju, do
          savršeno oblikovanih obrva. Poklonite sebi trenutke opuštanja i lepote
          koje zaslužujete. Vaša nova omiljena oaza čeka na vas!
        </h3>
        <div className="intro-buttons-holder">
          <a className="services" href="#our-services">
            Usluge
          </a>
          <a className="book" href="#reservation">
            Rezervacija
          </a>
        </div>
      </div>
      <div id="our-services">
        <h1>Naše Usluge</h1>
        <p className="subtitle">
          Preciznost, umetnost i pažnja u svakom tretmanu
        </p>

        <div className="services-container">
          {heraServices && heraServices.map((service, index) => (
            <ServiceCard
              key={index}
              imagePath=".\images\eyebrow-perfection.jpg"
              service={service}
              isActive={index === activeCardIndex}
              isInactive={activeCardIndex !== null && index !== activeCardIndex}
              onClick={() => handleCardClick(index)}
              onClose={() => setActiveCardIndex(null)}
            />
          ))}
        </div>
      </div>
      <div id="about-stats">
        <div className="about-us-info">
          <div className="info-container ">
            <h2>Gde se Lepota Susreće sa Preciznošću</h2>
            <p>
              U Hestiji verujemo u moć suptilnog poboljšanja. Naš minimalistički
              pristup fokusira se na isticanje vaše prirodne lepote pomoću
              stručnih tehnika i najsavremenije tehnologije.
            </p>
            <p>
              Osnovan od strane sertifikovanih estetičara sa preko 15 godina
              zajedničkog iskustva, stvorili smo utočište gde se luksuz susreće
              sa udobnošću, a preciznost sa umetnošću.
            </p>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">
                  500
                  <div className="plus-rating ">+</div>
                </div>
                <div className="stat-text">Srećnih klijenata</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">
                  <div className="star-rating">★</div>5
                </div>
                <div className="stat-text">Prosečna ocijena</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">
                  3<div className="plus-rating ">+</div>
                </div>
                <div className="stat-text">Godina iskustva</div>
              </div>
            </div>
          </div>
        </div>
        <div className="studio-images-holder">
          <ImageSlider />
        </div>
      </div>
      <div id="client-love">
        <Contact />
      </div>
      <div id="visit-us">
        <Rating />
      </div>
      <div id="reservation">
        <Reservation />
      </div>
    </div>
  );
}

export default HomePage;
