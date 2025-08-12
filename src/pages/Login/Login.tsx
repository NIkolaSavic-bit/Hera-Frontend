import { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import EmployeeService from "../../services/EmployeeService";
import type { EmployeeLoginDTO } from "../../models/Employee/EmployeeLoginDTO";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginDto: EmployeeLoginDTO = {
      email,
      password,
    };

    try {
      const token = await EmployeeService.login(loginDto);
      localStorage.setItem("token", token); 
      setError(null);
      alert("Prijava uspješna!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Neispravno korisničko ime ili lozinka.");
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Prijava</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Korisničko ime/e-mail</label>
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Lozinka</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="prijavi-se">Prijavi se</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
