import type { StepProps } from "../../models/Helpers/StepProps";

const ReviewStep: React.FC<StepProps> = ({ services, formData, prevStep }) => {
  const totalPrice = formData.usluge.reduce((total, usluga) => {
    const service = services.find((s) => s.serviceId === usluga.serviceId);
    if (!service) return total;
    return (
      total +
      usluga.subservices.reduce((subTotal, subName) => {
        const subservice = service?.subservices.find(
          (sub) => sub.name === subName
        );
        return subTotal + (subservice?.price ?? 0);
      }, 0)
    );
  }, 0);

  return (
    <div className="step-container">
      <h3>Pregled zakazanog termina</h3>

      <h4>Izabrane usluge:</h4>
      {formData.usluge.length === 0 ? (
        <p>Niste odabrali nijednu uslugu.</p>
      ) : (
        <ul>
          {formData.usluge.map((usluga) => {
            const service = services.find(
              (s) => s.serviceId === usluga.serviceId
            );
            return (
              <li key={usluga.serviceId}>
                <strong>{service?.name}</strong>
                <ul>
                  {usluga.subservices.map((subName) => {
                    const subservice = service?.subservices.find(
                      (sub) => sub.name === subName
                    );
                    return (
                      <li key={subName}>
                        {subName} - {subservice?.price ?? "Cena nije dostupna"}{" "}
                        €
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}

      <h4>Lični podaci:</h4>
      <p>
        <strong>Ime:</strong> {formData.ime}
        <br />
        <strong>Prezime:</strong> {formData.prezime}
        <br />
        <strong>Telefon:</strong> {formData.brojTelefona}
        <br />
        <strong>Datum:</strong> {formData.datum}
        <br />
        <strong>Vreme:</strong> {formData.vreme}
      </p>

      <h4>Ukupna cena: {totalPrice} €</h4>

      <div className="step-buttons">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Nazad
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;