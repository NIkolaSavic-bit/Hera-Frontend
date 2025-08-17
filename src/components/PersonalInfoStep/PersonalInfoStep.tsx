import React from "react";
import type { StepProps } from "../../models/Helpers/StepProps";
import { ReservationService } from "../../services/ReservationServise";
import type { ReservationFormData } from "../../models/Helpers/ReservationFormData";

const PersonalInfoStep = ({
  services,
  formData,
  setFormData,
  errors,
  setErrors,
  prevStep,
  nextStep,
}: StepProps) => {
  const reservationService = new ReservationService();

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const parseDurationToMinutes = (durationString: string): number => {
    if (!durationString) return 0;

    // Split the "HH:mm:ss" format
    const [hours, minutes, seconds] = durationString.split(":").map(Number);

    // Convert everything to total minutes
    return hours * 60 + minutes + Math.round(seconds / 60);
  };

  const calculateTotalDuration = (): number => {
    return formData.usluge.reduce(
      (totalMinutes: number, selectedService: any) => {
        const service = services.find(
          (s) => s.serviceId === selectedService.serviceId
        );
        if (!service) return totalMinutes;

        return (
          totalMinutes +
          selectedService.subservicesIds.reduce(
            (serviceMinutes: number, subId: number) => {
              const subservice = service.subservices.find(
                (sub) => sub.subserviceId === subId
              );
              if (!subservice) return serviceMinutes;

              return (
                serviceMinutes + parseDurationToMinutes(subservice.duration)
              );
            },
            0
          )
        );
      },
      0
    );
  };

  const calculateReservationEnd = (formData: ReservationFormData): Date => {
    const [hours, minutes] = formData.vreme.split(":").map(Number);
    const [year, month, day] = formData.datum.split("-").map(Number);

    const start = new Date(year, month - 1, day, hours, minutes);

    if (isNaN(start.getTime())) {
      throw new Error("Invalid date or time");
    }

    const totalMinutes = calculateTotalDuration();
    return new Date(start.getTime() + totalMinutes * 60000);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    if (!formData.ime) newErrors.ime = isValid = false;
    if (!formData.prezime) newErrors.prezime = isValid = false;
    if (!formData.brojTelefona) newErrors.brojTelefona = isValid = false;
    if (!formData.datum) newErrors.datum = isValid = false;
    if (!formData.vreme) newErrors.vreme = isValid = false;

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const endDate = calculateReservationEnd(formData);
      console.log("Posle:");
      console.log(endDate);
      const startDate = new Date(`${formData.datum}T${formData.vreme}:00z`);

      console.log(startDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert("Greška: nevalidan datum ili vreme.");
        return;
      }

      const reservationData = {
        firstName: formData.ime,
        lastName: formData.prezime,
        phoneNumber: formData.brojTelefona,
        serviceIds: formData.usluge.map((u) => u.serviceId),
        subserviceIds: formData.usluge.flatMap((u) => u.subservicesIds),
        reservationStart: startDate.toISOString(),
        reservationEnd: endDate.toISOString(),
      };

      await reservationService.createReservation(reservationData);
      nextStep();
    } catch (error) {
      console.error("Failed to create reservation:", error);
      alert("Došlo je do greške prilikom zakazivanja termina.");
    }
  };

  return (
    <div className="step-container">
      <h3>Korak {formData.usluge.length + 3}: Lični podaci i termin</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ime">Ime*</label>
            <input
              type="text"
              name="ime"
              value={formData.ime}
              onChange={handleChange}
              className={errors.ime ? "error" : ""}
            />
            {errors.ime && <div className="error-message">Obavezno polje</div>}
          </div>
          <div className="form-group">
            <label htmlFor="prezime">Prezime*</label>
            <input
              type="text"
              name="prezime"
              value={formData.prezime}
              onChange={handleChange}
              className={errors.prezime ? "error" : ""}
            />
            {errors.prezime && (
              <div className="error-message">Obavezno polje</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="brojTelefona">Telefon*</label>
          <input
            type="tel"
            name="brojTelefona"
            value={formData.brojTelefona}
            onChange={handleChange}
            className={errors.brojTelefona ? "error" : ""}
          />
          {errors.brojTelefona && (
            <div className="error-message">Obavezno polje</div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="datum">Datum*</label>
            <input
              type="date"
              name="datum"
              value={formData.datum}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={errors.datum ? "error" : ""}
            />
            {errors.datum && (
              <div className="error-message">Obavezno polje</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="vreme">Vreme*</label>
            <select
              name="vreme"
              value={formData.vreme}
              onChange={handleChange}
              className={errors.vreme ? "error" : ""}
            >
              <option value="">Odaberite vreme</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.vreme && (
              <div className="error-message">Obavezno polje</div>
            )}
          </div>
        </div>

        <div className="step-buttons">
          <button type="button" className="prev-btn" onClick={prevStep}>
            Nazad
          </button>
          <button type="submit" className="submit-btn">
            Zakaži termin
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
