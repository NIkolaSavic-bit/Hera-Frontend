import React, { useState } from "react";
import "./Reservation.css";
import type { Service } from "../../models/Service/Service";

export interface FormData {
  ime: string;
  prezime: string;
  brojTelefona: string;
  usluge: {
    serviceId: string;
    subservices: string[];
  }[];
  datum: string;
  vreme: string;
}

interface StepProps {
  services: Service[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: boolean };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  nextStep: () => void;
  prevStep?: () => void;
  currentServiceIndex?: number;
}

interface DropdownProps {
  options: string[];
  selected: string[];
  onSelect: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = "Select options",
  required = false,
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onSelect(newSelected);
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-toggle ${hasError ? "error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? selected.join(", ") : placeholder}
        {required && <span className="required-asterisk">*</span>}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="checkbox-option"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                readOnly
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
      {hasError && (
        <div className="error-message">Molimo odaberite bar jednu opciju</div>
      )}
    </div>
  );
};

const ServiceSelectionStep: React.FC<StepProps> = ({
  services,
  formData,
  setFormData,
  errors,
  setErrors,
  nextStep,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleNext = () => {
    if (selectedServices.length === 0) {
      setErrors((prev) => ({ ...prev, usluge: true }));
      return;
    }

    // Initialize service selections with empty subservices
    const newUsluge = selectedServices.map((serviceId) => ({
      serviceId,
      subservices: [],
    }));

    setFormData((prev) => ({
      ...prev,
      usluge: newUsluge,
    }));
    setErrors((prev) => ({ ...prev, usluge: false }));
    nextStep();
  };

  return (
    <div className="step-container">
      <h3>Korak 1: Odaberite usluge</h3>
      <div className="form-group">
        <label>Usluge*</label>
        <Dropdown
          options={services.map((service) => service.name)}
          selected={selectedServices.map(
            (serviceId) =>
              services.find((s) => s.serviceId === serviceId)?.name || ""
          )}
          onSelect={(values) => {
            const selectedIds = services
              .filter((s) => values.includes(s.name))
              .map((s) => s.serviceId);
            setSelectedServices(selectedIds);
          }}
          placeholder="Izaberite usluge"
          required
          hasError={errors.usluge}
        />
      </div>
      <button type="button" className="next-btn" onClick={handleNext}>
        Dalje
      </button>
    </div>
  );
};

const SubserviceSelectionStep: React.FC<StepProps> = ({
  services,
  formData,
  setFormData,
  errors,
  setErrors,
  nextStep,
  prevStep,
  currentServiceIndex = 0,
}) => {
  const currentService = formData.usluge[currentServiceIndex];
  const serviceData = services.find(
    (s) => s.serviceId === currentService.serviceId
  );

  const handleNext = () => {
    if (currentService.subservices.length === 0) {
      setErrors((prev) => ({ ...prev, detalji: true }));
      return;
    }

    setErrors((prev) => ({ ...prev, detalji: false }));

    if (currentServiceIndex < formData.usluge.length - 1) {
      // Move to next service's subservices
      nextStep();
    } else {
      // All services configured, move to personal info
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h3>
        Korak {currentServiceIndex + 2}: Odaberite detalje za{" "}
        {serviceData?.name}
      </h3>
      <div className="form-group">
        <label>Detalji usluge*</label>
        <Dropdown
          options={serviceData?.subservices?.map((s) => s.name) || []}
          selected={currentService.subservices}
          onSelect={(values) => {
            const updatedUsluge = [...formData.usluge];
            updatedUsluge[currentServiceIndex].subservices = values;
            setFormData((prev) => ({ ...prev, usluge: updatedUsluge }));
          }}
          required
          hasError={errors.detalji}
        />
      </div>
      <div className="step-buttons">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Nazad
        </button>
        <button type="button" className="next-btn" onClick={handleNext}>
          {currentServiceIndex < formData.usluge.length - 1
            ? "Dalje"
            : "Završi"}
        </button>
      </div>
    </div>
  );
};

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

const PersonalInfoStep: React.FC<StepProps> = ({
  services,
  formData,
  setFormData,
  errors,
  setErrors,
  prevStep,
  nextStep,
}) => {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      nextStep(); // go to the review step instead of alert
    }
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

interface ReservationProps {
  services?: Service[];
}

const Reservation: React.FC<ReservationProps> = ({ services = [] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    ime: "",
    prezime: "",
    brojTelefona: "",
    usluge: [],
    datum: "",
    vreme: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const hardcodedServices: Service[] = [
    {
      serviceId: "nails",
      name: "Nokti",
      subservices: [
        { name: "Manikir", price: 20 },
        { name: "Gel nokti", price: 35 },
        { name: "Pedikir", price: 25 },
      ],
    },
    {
      serviceId: "face",
      name: "Lice",
      subservices: [
        { name: "Čišćenje lica", price: 50 },
        { name: "Masaža lica", price: 40 },
        { name: "Anti-aging tretman", price: 70 },
      ],
    },
    {
      serviceId: "hair",
      name: "Kosa",
      subservices: [
        { name: "Šišanje", price: 30 },
        { name: "Feniranje", price: 25 },
        { name: "Farbanje", price: 60 },
      ],
    },
  ];

  const effectiveServices =
    services && services.length > 0 ? services : hardcodedServices;

  // New validation function for navigation
  const canGoToStep = (stepIndex: number): boolean => {
    if (stepIndex === 0) return true; // Always allow first step

    if (stepIndex === 1) {
      // To go to Step 2 (subservice for first service), must have selected at least one service
      return formData.usluge.length > 0;
    }

    if (stepIndex > 1 && stepIndex <= formData.usluge.length) {
      // For other subservices steps:
      // Previous subservices must be selected for all previous services

      // Check all previous services have at least one subservice selected
      for (let i = 0; i < stepIndex - 1; i++) {
        if (
          !formData.usluge[i] ||
          formData.usluge[i].subservices.length === 0
        ) {
          return false;
        }
      }
      return true;
    }

    if (stepIndex === formData.usluge.length + 1) {
      // Review step
      // Check all services have subservices selected
      for (let i = 0; i < formData.usluge.length; i++) {
        if (
          !formData.usluge[i] ||
          formData.usluge[i].subservices.length === 0
        ) {
          return false;
        }
      }
      return true;
    }

    if (stepIndex === formData.usluge.length + 2) {
      // Personal info step
      // Check all services have subservices selected
      for (let i = 0; i < formData.usluge.length; i++) {
        if (
          !formData.usluge[i] ||
          formData.usluge[i].subservices.length === 0
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <ServiceSelectionStep
          services={effectiveServices}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          nextStep={nextStep}
        />
      );
    }

    if (currentStep <= formData.usluge.length) {
      return (
        <SubserviceSelectionStep
          services={effectiveServices}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          nextStep={nextStep}
          prevStep={prevStep}
          currentServiceIndex={currentStep - 1}
        />
      );
    }

    if (currentStep === formData.usluge.length + 1) {
      return (
        <PersonalInfoStep
          services={effectiveServices}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    }

    if (currentStep === formData.usluge.length + 2) {
      return (
        <ReviewStep
          services={effectiveServices}
          formData={formData}
          prevStep={prevStep}
        />
      );
    }

    return null;
  };

  const totalSteps = formData.usluge.length + 3;

  return (
    <div id="reservation" className="appointment-container">
      <h2>Zakažite termin</h2>
      <div className="step-indicator">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const enabled = canGoToStep(index);
          return (
            <div
              key={index}
              className={`step-circle ${currentStep >= index ? "active" : ""} ${
                enabled ? "" : "disabled"
              }`}
              onClick={() => enabled && setCurrentStep(index)}
              style={{ cursor: enabled ? "pointer" : "default" }}
              title={
                enabled
                  ? undefined
                  : "Popunite prethodne korake pre nego što nastavite"
              }
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      {renderStep()}
    </div>
  );
};

export default Reservation;
