import React, { useState, useRef, useEffect } from "react";
import "./Reservation.css";

interface ReservationItem {
  usluga: string;
  detalji: string[];
}

interface FormData {
  ime: string;
  prezime: string;
  brojTelefona: string;
  datum: string;
  vreme: string;
  viseTermina: boolean;
  rezervacije: ReservationItem[];
}

interface DropdownProps {
  options: { value: string; label: string }[];
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onSelect(newSelected);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-toggle ${hasError ? "error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0
          ? options
              .filter((opt) => selected.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
          : placeholder}
        {required && <span className="required-asterisk">*</span>}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="checkbox-option"
              onClick={() => toggleOption(option.value)}
            >
              
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => {}}
              />
              <span>{option.label}</span>
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

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
};

const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ime: "",
    prezime: "",
    brojTelefona: "",
    datum: "",
    vreme: "",
    viseTermina: false,
    rezervacije: [{ usluga: "", detalji: [] }],
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

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

  const nailOptions = [
    { value: "manikir", label: "Manikir" },
    { value: "gel", label: "Gel lak" },
    { value: "nadogradnja", label: "Nadogradnja noktiju" },
    { value: "trajni", label: "Trajni lak" },
  ];

  const faceOptions = [
    { value: "ciscenje", label: "Čišćenje lica" },
    { value: "hidratacija", label: "Hidratacija" },
    { value: "anti-age", label: "Anti-age tretman" },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    
    if (!formData.ime) {
      newErrors.ime = true;
      isValid = false;
    }
    if (!formData.prezime) {
      newErrors.prezime = true;
      isValid = false;
    }
    if (!formData.brojTelefona) {
      newErrors.brojTelefona = true;
      isValid = false;
    }
    if (!formData.datum) {
      newErrors.datum = true;
      isValid = false;
    }
    if (!formData.vreme) {
      newErrors.vreme = true;
      isValid = false;
    }

    
    formData.rezervacije.forEach((rez, index) => {
      if (!rez.usluga) {
        newErrors[`rezervacija-${index}-usluga`] = true;
        isValid = false;
      }
      if (rez.usluga && rez.detalji.length === 0) {
        newErrors[`rezervacija-${index}-detalji`] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      viseTermina: checked,
      rezervacije: checked
        ? [...prev.rezervacije, { usluga: "", detalji: [] }]
        : [prev.rezervacije[0]],
    }));
  };

  const handleReservationChange = (
    index: number,
    field: keyof ReservationItem,
    value: string | string[]
  ) => {
    const updated = [...formData.rezervacije];
    if (field === "usluga") {
      updated[index][field] = value as string;
    } else if (field === "detalji") {
      updated[index][field] = value as string[];
    }
    setFormData((prev) => ({ ...prev, rezervacije: updated }));

    
    if (field === "usluga") {
      setErrors((prev) => ({
        ...prev,
        [`rezervacija-${index}-usluga`]: false,
      }));
    }
    if (field === "detalji") {
      setErrors((prev) => ({
        ...prev,
        [`rezervacija-${index}-detalji`]: false,
      }));
    }
  };

  const addReservation = () => {
    setFormData((prev) => ({
      ...prev,
      rezervacije: [...prev.rezervacije, { usluga: "", detalji: [] }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const reservationDetails = formData.rezervacije
      .map(
        (rez, i) =>
          `Usluga ${i + 1}: ${rez.usluga} (${
            rez.detalji.length > 0
              ? rez.detalji.join(", ")
              : "nema dodatnih informacija"
          })`
      )
      .join("\n");

    alert(`Uspešno ste zakazali termin!\n\nDetalji:
Ime: ${formData.ime}
Prezime: ${formData.prezime}
Telefon: ${formData.brojTelefona}
Datum: ${formatDate(formData.datum)}
Vreme: ${formData.vreme}
${reservationDetails}`);

    setFormData({
      ime: "",
      prezime: "",
      brojTelefona: "",
      datum: "",
      vreme: "",
      viseTermina: false,
      rezervacije: [{ usluga: "", detalji: [] }],
    });
    setErrors({});
  };

  return (
    <div id="reservation" className="appointment-container">
      <h2>Zakažite termin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ime">Ime*</label>
            <input
              type="text"
              id="ime"
              name="ime"
              value={formData.ime}
              onChange={handleChange}
              required
              placeholder="Unesite vaše ime"
              className={errors.ime ? "error" : ""}
            />
            {errors.ime && (
              <div className="error-message">Ovo polje je obavezno</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="prezime">Prezime*</label>
            <input
              type="text"
              id="prezime"
              name="prezime"
              value={formData.prezime}
              onChange={handleChange}
              required
              placeholder="Unesite vaše prezime"
              className={errors.prezime ? "error" : ""}
            />
            {errors.prezime && (
              <div className="error-message">Ovo polje je obavezno</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="brojTelefona">Broj telefona*</label>
          <input
            type="tel"
            id="brojTelefona"
            name="brojTelefona"
            value={formData.brojTelefona}
            onChange={handleChange}
            required
            placeholder="Unesite broj telefona"
            pattern="[0-9]{9,15}"
            title="Unesite validan broj telefona (samo brojevi)"
            className={errors.brojTelefona ? "error" : ""}
          />
          {errors.brojTelefona && (
            <div className="error-message">Ovo polje je obavezno</div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="datum">Datum*</label>
            <input
              type="date"
              id="datum"
              name="datum"
              value={formData.datum}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className={errors.datum ? "error" : ""}
            />
            {errors.datum && (
              <div className="error-message">Ovo polje je obavezno</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="vreme">Vreme*</label>
            <select
              id="vreme"
              name="vreme"
              value={formData.vreme}
              onChange={handleChange}
              required
              className={errors.vreme ? "error" : ""}
            >
              <option value="">Odaberite vreme</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.vreme && (
              <div className="error-message">Ovo polje je obavezno</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="custom-checkbox-label">
            <input
              type="checkbox"
              checked={formData.viseTermina}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <span className="checkmark"></span>
            Želim da zakažem više usluga
          </label>
        </div>

        {formData.rezervacije.map((rez, index) => (
          <div key={index} className="form-row">
            <div className="form-group">
              <label>Usluga {index + 1}*</label>
              <select
                value={rez.usluga}
                onChange={(e) =>
                  handleReservationChange(index, "usluga", e.target.value)
                }
                required
                className={errors[`rezervacija-${index}-usluga`] ? "error" : ""}
              >
                <option value="">-- Izaberite uslugu --</option>
                <option value="nails">Nokti</option>
                <option value="face">Lice</option>
              </select>
              {errors[`rezervacija-${index}-usluga`] && (
                <div className="error-message">Ovo polje je obavezno</div>
              )}
            </div>

            {rez.usluga === "nails" && (
              <div className="form-group">
                <label>Vrsta tretmana za nokte*</label>
                <Dropdown
                  options={nailOptions}
                  selected={rez.detalji}
                  onSelect={(values) =>
                    handleReservationChange(index, "detalji", values)
                  }
                  placeholder="Odaberite tretmane"
                  required
                  hasError={errors[`rezervacija-${index}-detalji`]}
                />
              </div>
            )}

            {rez.usluga === "face" && (
              <div className="form-group">
                <label>Vrsta tretmana za lice*</label>
                <Dropdown
                  options={faceOptions}
                  selected={rez.detalji}
                  onSelect={(values) =>
                    handleReservationChange(index, "detalji", values)
                  }
                  placeholder="Odaberite tretmane"
                  required
                  hasError={errors[`rezervacija-${index}-detalji`]}
                />
              </div>
            )}
          </div>
        ))}

        {formData.viseTermina && (
          <button type="button" className="add-btn" onClick={addReservation}>
            Dodaj još jednu uslugu
          </button>
        )}

        <button type="submit" className="submit-btn">
          Zakaži termin
        </button>
      </form>
    </div>
  );
};

export default Reservation;
