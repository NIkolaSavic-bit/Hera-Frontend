import React, { useState } from "react";
import "./AdminPage.css";
import ReservationManagement from "../ReservationManagement/ReservationManagement";
import RegistrationForm from "../Registration/RegistrationForm";
import FireEmployeeForm from "../FireEmployee/FireEmployee";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("reservations");
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "register":
        return <RegistrationForm />;
      case "fire":
        return <FireEmployeeForm />;
      case "reservations":
        return <ReservationManagement />;
      default:
        return <ReservationManagement />;
    }
  };

  return (
    <div className="admin-container">
      <div 
        className={`side-menu ${isMenuExpanded ? "expanded" : ""}`}
        onMouseEnter={() => setIsMenuExpanded(true)}
        onMouseLeave={() => setIsMenuExpanded(false)}
      >
        <div className="menu-header">
          <h2 className="logo">{isMenuExpanded ? "Admin Panel" : "AP"}</h2>
        </div>
        
        <nav className="menu-items">
          <button
            className={`menu-item ${activeTab === "reservations" ? "active" : ""}`}
            onClick={() => setActiveTab("reservations")}
          >
            <i className="icon">📅</i>
            {isMenuExpanded && <span>Rezervacije</span>}
          </button>
          
          <button
            className={`menu-item ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            <i className="icon">👤</i>
            {isMenuExpanded && <span>Registuj Zaposlenog</span>}
          </button>
          
          <button
            className={`menu-item ${activeTab === "fire" ? "active" : ""}`}
            onClick={() => setActiveTab("fire")}
          >
            <i className="icon">🚫</i>
            {isMenuExpanded && <span>Otpusti Zaposlenog</span>}
          </button>
        </nav>
        
        {isMenuExpanded && (
          <div className="menu-footer">
            <p>Admin Dashboard</p>
          </div>
        )}
      </div>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;