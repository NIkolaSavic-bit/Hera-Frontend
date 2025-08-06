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
    // Clear error when user types
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

    if (!formData.userName.trim()) newErrors.userName = "Username je obavezno polje";
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
        <h2>Uspešno ste se registrovali</h2>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <h2>Napravi profil</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="userName">Username*</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className={errors.userName ? "error" : ""}
          />
          {errors.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Ime*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
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
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
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
          />
          {errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Sifra*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Potvrdi sifru*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Registruje..." : "Registruj se"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
