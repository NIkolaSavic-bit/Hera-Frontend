import React, { useState, useEffect } from "react";
import "./ReservationManagement.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface RetrieveReservationDTO {
  reservationId: number;
  serviceName: string;
  phoneNumber: string;
  customerFullName: string;
  reservationStart: string;
  reservationEnd: string;
  isFinished: boolean;
  subserviceNames: string[];
}

const ReservationManagement: React.FC = () => {
  const [reservations, setReservations] = useState<RetrieveReservationDTO[]>(
    []
  );
  const [filteredReservations, setFilteredReservations] = useState<
    RetrieveReservationDTO[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [expandId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/reservation`);
        setReservations(response.data);
        setFilteredReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const filtered = reservations.filter((reservation) => {
      // Apply status filter
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "pending" && !reservation.isFinished) ||
        (statusFilter === "completed" && reservation.isFinished);

      // Apply search term filter
      const searchMatch =
        searchTerm === "" ||
        reservation.customerFullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        reservation.serviceName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        reservation.phoneNumber.includes(searchTerm) ||
        reservation.subserviceNames.some((sub) =>
          sub.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return statusMatch && searchMatch;
    });

    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, reservations]);

  const handleApprove = async (id: number) => {
    try {
      await axios.put(`http://localhost:5118/api/reservation/${id}/approve`);
      setReservations((prev) =>
        prev.map((res) =>
          res.reservationId === id ? { ...res, isFinished: true } : res
        )
      );
    } catch (error) {
      console.error("Error approving reservation:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5118/api/reservation/${id}`);
      setReservations((prev) => prev.filter((res) => res.reservationId !== id));
    } catch (error) {
      console.error("Error rejecting reservation:", error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandId === id ? null : id);
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year}. ${hours}:${minutes}`;
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length > 6) {
      return `${cleaned.substring(0, 3)}/${cleaned.substring(
        3,
        6
      )}-${cleaned.substring(6)}`;
    }
    return phone;
  };

  return (
    <div className="reservations-management">
      <h1 className="management-title">Upravljanje rezervacijama</h1>

      <div className="filter-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Pretraži rezervacije..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="status-filter">
          <button
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            Sve
          </button>
          <button
            className={`filter-btn ${
              statusFilter === "pending" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("pending")}
          >
            Na čekanju
          </button>
          <button
            className={`filter-btn ${
              statusFilter === "completed" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("completed")}
          >
            Završeno
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Učitavanje rezervacija...</p>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="empty-state">
          <p>Nema rezultata za prikaz</p>
        </div>
      ) : (
        <div className="reservations-grid">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.reservationId}
              className={`reservation-item ${
                reservation.isFinished ? "completed" : "pending"
              } ${expandId === reservation.reservationId ? "expanded" : ""}`}
            >
              <div
                className="reservation-header"
                onClick={() => toggleExpand(reservation.reservationId)}
              >
                <div className="header-main">
                  <div className="customer-info">
                    <span className="customer-name">
                      {reservation.customerFullName}
                    </span>
                    <span className="customer-phone">
                      {formatPhoneNumber(reservation.phoneNumber)}
                    </span>
                  </div>
                  <div className="service-time">
                    <span className="service-name">
                      {reservation.serviceName}
                    </span>
                    <span className="reservation-time">
                      {formatDateTime(reservation.reservationStart)}
                    </span>
                  </div>
                </div>
                <span className="status-indicator">
                  {reservation.isFinished ? "Završeno" : "Na čekanju"}
                </span>
              </div>

              {expandId === reservation.reservationId && (
                <div className="reservation-details">
                  <div className="details-content">
                    <div className="time-range">
                      {formatDateTime(reservation.reservationStart)} -{" "}
                      {formatDateTime(reservation.reservationEnd)}
                    </div>

                    {reservation.subserviceNames.length > 0 && (
                      <div className="subservices-section">
                        <h4>Dodatne usluge:</h4>
                        <ul className="subservices-list">
                          {reservation.subserviceNames.map((name, index) => (
                            <li key={index} className="subservice-item">
                              <span className="subservice-bullet"></span>
                              {name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!reservation.isFinished && (
                      <div className="action-buttons">
                        <button
                          className="btn approve"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(reservation.reservationId);
                          }}
                        >
                          Prihvati
                        </button>
                        <button
                          className="btn reject"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(reservation.reservationId);
                          }}
                        >
                          Odbij
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;
