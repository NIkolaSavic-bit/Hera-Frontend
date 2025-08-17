import React, { useState } from "react";
import "./RegistrationForm.css";

interface RegistrationData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<
    Partial<RegistrationData & { confirmPassword: string }>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<RegistrationData & { confirmPassword: string }> =
      {};

    if (!formData.userName.trim())
      newErrors.userName = "Username je obavezno polje";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Ime je obavezno polje";

    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezno polje";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email nije validan";
    }

    if (!formData.password) {
      newErrors.password = "Sifra je obavezno polje";
    } else if (formData.password.length < 6) {
      newErrors.password = "Sifra mora imati najmanje 6 karaktera";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Potvrdi sifru je obavezno polje";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Sifre se ne poklapaju";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Broj telefona je obavezno polje";
    } else if (!/^[0-9+\- ]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Broj telefona nije validan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically send data to your backend
      console.log("Registration data:", {
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="registration-success">
        <div className="success-icon">✓</div>
        <h2>Uspešna registracija</h2>
        <p>Zaposleni je uspešno dodat u sistem.</p>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="form-header">
        <h2>Registruj novog zaposlenog</h2>
        <p>Popunite sve potrebne informacije</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="userName">Korisničko ime*</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className={errors.userName ? "error" : ""}
              placeholder="Unesite korisničko ime"
            />
            {errors.userName && (
              <span className="error-message">{errors.userName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">Ime*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
              placeholder="Unesite ime"
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Prezime*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error" : ""}
              placeholder="Unesite prezime"
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="Unesite email adresu"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Broj telefona*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error" : ""}
              placeholder="Unesite broj telefona"
            />
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Šifra*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Kreirajte šifru"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Potvrdi šifru*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
              placeholder="Ponovite šifru"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Procesiram...
            </>
          ) : (
            "Registruj zaposlenog"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
