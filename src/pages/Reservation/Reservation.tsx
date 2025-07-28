import React, { useState } from 'react';
import './Reservation.css';

interface FormData {
  ime: string;
  prezime: string;
  brojTelefona: string;
  usluga: string;
  datum: string;  
  vreme: string;
}


const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ime: '',
    prezime: '',
    brojTelefona: '',
    usluga: '',
    datum: '',
    vreme: ''
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Uspešno ste zakazali termin!\n\nDetalji:
Ime: ${formData.ime}
Prezime: ${formData.prezime}
Telefon: ${formData.brojTelefona}
Usluga: ${formData.usluga}
Datum: ${formatDate(formData.datum)}
Vreme: ${formData.vreme}`);
    setFormData({
      ime: '',
      prezime: '',
      brojTelefona: '',
      usluga: '',
      datum: '',
      vreme: ''
    });
  };

  const services = [
    { value: 'manikir', label: 'Manikir' },
    { value: 'pedikir', label: 'Pedikir' },
    { value: 'gel-lak', label: 'Gel lak' },
    { value: 'naduživanje-noktiju', label: 'Naduživanje noktiju' },
    { value: 'spa-tretman', label: 'SPA tretman' },
    { value: 'dekoracija', label: 'Dekoracija noktiju' }
  ];

  return (
    <div id="#reservation" className="appointment-container">
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
            />
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
            />
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="usluga">Odaberite uslugu*</label>
          <select
            id="usluga"
            name="usluga"
            value={formData.usluga}
            onChange={handleChange}
            required
          >
            <option value="">-- Izaberite uslugu --</option>
            {services.map(service => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
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
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="vreme">Vreme*</label>
            <select
              id="vreme"
              name="vreme"
              value={formData.vreme}
              onChange={handleChange}
              required
            >
              <option value="">Odaberite vreme</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Zakaži termin
        </button>
      </form>
    </div>
  );
};

export default Reservation;
