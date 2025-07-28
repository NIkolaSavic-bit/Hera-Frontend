import ServiceCard from "../../components/Services/Services";
import Reservation from "../Reservation/Reservation";
import "./HomePage.css";

function HomePage() {
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
      ],
    },
  ];

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
          <a className="book" href="#reservation">Rezervacija</a>
        </div>
      </div>
      <div id="our-services">
        <h1>Naše Usluge</h1>
        <p className="subtitle">
          Preciznost, umetnost i pažnja u svakom tretmanu
        </p>

        <div className="services-container">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
      <div id="about-stats">O Nama</div>
      <div id="client-love">Kontakt</div>
      <div id="visit-us">Posetite Nas</div>
      <div id="reservation"><Reservation/></div>
    </div>
  );
}

export default HomePage;