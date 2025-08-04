import React, { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <div className="login-form">
        <h2>Prijava</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Korisničko ime/e-mail</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Lozinka</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
              >
                {showPassword ? <PiEyeClosed /> : <PiEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="prijavi-se">Prijavi se</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
