import ImageSlider from "../../components/ImageSlider/ImageSlider";
import ServiceCard from "../../components/Services/Services";
import Contact from "../Contact/Contact";
import Reservation from "../Reservation/Reservation";
import Rating from "..//Rating/Rating";
import "./HomePage.css";
import { useState } from "react";

function HomePage() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const services = [
    {
      imagePath: "/images/laser-hair-removal.jpg",
      title: "Lasersko uklanjanje dlaka",
      description:
        "Napredna laserska tehnologija za trajno smanjenje dlaka. Bezbedni, efikasni i gotovo bezbolni tretmani za sve tipove kože.",
      priceItems: [
        { area: "Lice", price: "Od $150" },
        { area: "Pazuh", price: "Od $100" },
        { area: "Noge", price: "Od $300" },
        { area: "Bikini zona", price: "Od $200" },
        { area: "Leđa", price: "Od $250" },
        { area: "Grudi", price: "Od $180" },
        { area: "Ruke", price: "Od $120" },
        { area: "Stomak", price: "Od $220" },
        { area: "Donji deo leđa", price: "Od $200" },
        { area: "Brada", price: "Od $80" },
        { area: "Vrat", price: "Od $90" },
        { area: "Prsa", price: "Od $160" },
        { area: "Ramena", price: "Od $140" },
        { area: "Butine", price: "Od $280" },
        { area: "Potkolenice", price: "Od $240" },
        { area: "Celokupno telo", price: "Od $600" },
        { area: "Gornji deo tela", price: "Od $400" },
        { area: "Donji deo tela", price: "Od $450" },
        { area: "Intimna zona", price: "Od $300" },
        { area: "Usne", price: "Od $70" },
        { area: "Obrve", price: "Od $60" },
        { area: "Zatezanje kože", price: "Od $350" },
        { area: "Paket 6 tretmana", price: "Od $1500" },
      ],
    },
    {
      imagePath: "/images/nail-artistry.jpg",
      title: "Umetnost noktiju",
      description:
        "Luksuzne manikire i pedikire sa premium proizvodima. Od klasične elegancije do modernih dizajna noktiju.",
      priceItems: [
        { area: "Klasični manikir", price: "$45" },
        { area: "Gel manikir", price: "$65" },
        { area: "Dizajn noktiju", price: "Od $85" },
        { area: "Spa manikir", price: "$75" },
        { area: "French manikir", price: "$55" },
        { area: "Akrilni nokti", price: "$90" },
        { area: "Nadogradnja noktiju", price: "$110" },
        { area: "Parafinsko pakovanje", price: "$40" },
        { area: "Jačanje noktiju", price: "$50" },
        { area: "Popravka nokta", price: "$25" },
        { area: "Uklanjanje gel laka", price: "$20" },
        { area: "Nokti sa rupicama", price: "$95" },
        { area: "Kristalni nokti", price: "$120" },
        { area: "Zlatni detalji", price: "$100" },
        { area: "Art nokti", price: "$130" },
        { area: "Tematski dizajn", price: "$140" },
        { area: "Nokti sa slikom", price: "$150" },
        { area: "3D dizajn", price: "$160" },
        { area: "Marble efekat", price: "$110" },
        { area: "Ombre efekat", price: "$105" },
        { area: "Metalik efekat", price: "$95" },
        { area: "Matirani gel lak", price: "$85" },
        { area: "Paket manikir+pedikir", price: "$120" },
      ],
    },
    {
      imagePath: "/images/eyebrow-perfection.jpg",
      title: "Savršenstvo obrva",
      description:
        "Stručno oblikovanje obrva, bojenje i mikroblading. Ulepšajte svoju prirodnu lepotu sa savršeno oblikovanim obrvama.",
      priceItems: [
        { area: "Oblikovanje obrva", price: "$35" },
        { area: "Bojenje", price: "$25" },
        { area: "Mikroblading", price: "$450" },
        { area: "Henna obrve", price: "$40" },
        { area: "Laminacija obrva", price: "$60" },
        { area: "Korekcija obrva", price: "$30" },
        { area: "Čupanje končićem", price: "$45" },
        { area: "Senzibilna obrva", price: "$50" },
        { area: "Kombinovani tretman", price: "$75" },
        { area: "Dugotrajna boja", price: "$55" },
        { area: "Prirodni efekat", price: "$65" },
        { area: "Intenzivna boja", price: "$70" },
        { area: "Korekcija mikrobladinga", price: "$200" },
        { area: "Touch-up tretman", price: "$150" },
        { area: "Oblikovanje pincetom", price: "$30" },
        { area: "Oblikovanje voskom", price: "$35" },
        { area: "Kompletni tretman", price: "$90" },
        { area: "Oblikovanje+bojenje", price: "$50" },
        { area: "Express obrve", price: "$25" },
        { area: "VIP tretman", price: "$120" },
        { area: "Oblikovanje za specijalne prilike", price: "$80" },
        { area: "Godišnji paket održavanja", price: "$300" },
        { area: "Paket 4 tretmana", price: "$200" },
      ],
    },
  ];

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
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
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
