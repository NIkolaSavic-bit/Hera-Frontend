import React, { useState, useEffect } from "react";
import "./ReservationManagement.css";

interface Reservation {
  id: string;
  ime: string;
  prezime: string;
  brojTelefona: string;
  datum: string;
  vreme: string;
  usluge: {
    naziv: string;
    detalji: string[];
  }[];
  status: "pending" | "approved" | "rejected";
}

const ReservationManagement: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data - replace with real API response
        const mockData: Reservation[] = [
          {
            id: "1",
            ime: "Ana",
            prezime: "Anić",
            brojTelefona: "0631234567",
            datum: "2023-12-15",
            vreme: "10:00",
            usluge: [
              {
                naziv: "Nokti",
                detalji: ["Manikir", "Gel lak"],
              },
            ],
            status: "pending",
          },
          {
            id: "2",
            ime: "Marko",
            prezime: "Marković",
            brojTelefona: "0649876543",
            datum: "2023-12-16",
            vreme: "14:30",
            usluge: [
              {
                naziv: "Lice",
                detalji: ["Čišćenje lica", "Hidratacija"],
              },
              {
                naziv: "Nokti",
                detalji: ["Trajni lak"],
              },
            ],
            status: "pending",
          },
          {
            id: "3",
            ime: "Jovana",
            prezime: "Jovanović",
            brojTelefona: "0655555555",
            datum: "2023-12-17",
            vreme: "11:00",
            usluge: [
              {
                naziv: "Nokti",
                detalji: ["Nadogradnja noktiju", "Gel lak"],
              },
            ],
            status: "pending",
          },
          {
            id: "4",
            ime: "Milica",
            prezime: "Milić",
            brojTelefona: "0666666666",
            datum: "2023-12-18",
            vreme: "12:00",
            usluge: [
              {
                naziv: "Frizura",
                detalji: ["Feniranje", "Pramenovi"],
              },
            ],
            status: "pending",
          },
          {
            id: "5",
            ime: "Stefan",
            prezime: "Stefanović",
            brojTelefona: "0677777777",
            datum: "2023-12-19",
            vreme: "13:00",
            usluge: [
              {
                naziv: "Nokti",
                detalji: ["Manikir", "Pedikir"],
              },
            ],
            status: "pending",
          },
          {
            id: "6",
            ime: "Petar",
            prezime: "Petrović",
            brojTelefona: "0688888888",
            datum: "2023-12-20",
            vreme: "15:00",
            usluge: [
              {
                naziv: "Lice",
                detalji: ["Čišćenje lica", "Hidratacija"],
              },
            ],
            status: "pending",
          },
          {
            id: "7",
            ime: "Ivana",
            prezime: "Ivanović",
            brojTelefona: "0699999999",
            datum: "2023-12-21",
            vreme: "16:00",
            usluge: [
              {
                naziv: "Nokti",
                detalji: ["Trajni lak"],
              },
            ],
            status: "pending",
          },
          {
            id: "8",
            ime: "Marko",
            prezime: "Nikolić",
            brojTelefona: "0700000000",
            datum: "2023-12-22",
            vreme: "17:00",
            usluge: [
              {
                naziv: "Frizura",
                detalji: ["Gej", "Pramenovi"],
              },
            ],
            status: "pending",
          },
        ];

        setReservations(mockData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      // Mock API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      setReservations((prev) =>
        prev.map((res) =>
          res.id === id ? { ...res, status: "approved" } : res
        )
      );
    } catch (error) {
      console.error("Error approving reservation:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      // Mock API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      setReservations((prev) =>
        prev.map((res) =>
          res.id === id ? { ...res, status: "rejected" } : res
        )
      );
    } catch (error) {
      console.error("Error rejecting reservation:", error);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}.`;
  };

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");

    // Format as 087/123-123 if it's a 9-digit number
    if (cleaned.length > 6) {
      return `${cleaned.substring(0, 3)}/${cleaned.substring(
        3,
        6
      )}-${cleaned.substring(6)}`;
    }

    // Return original if doesn't match expected format
    return phone;
  };

  return (
    <div className="employee-reservations-container">
      <h1>Upravljanje rezervacijama</h1>

      {loading ? (
        <div className="loading-spinner">Učitavanje rezervacija...</div>
      ) : reservations.length === 0 ? (
        <div className="no-reservations">Trenutno nema rezervacija</div>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`reservation-card ${reservation.status} ${
                expandId === reservation.id ? "expanded" : ""
              }`}
            >
              <div
                className="reservation-summary"
                onClick={() => toggleExpand(reservation.id)}
              >
                <div className="summary-content">
                  <h3>
                    {reservation.ime} {reservation.prezime}
                  </h3>
                  <div className="summary-details">
                    <span>
                      {formatDate(reservation.datum)} u {reservation.vreme}
                    </span>
                    <span className="phone-number">
                      Broj telefona:{" "}
                      {formatPhoneNumber(reservation.brojTelefona)}
                    </span>
                  </div>
                </div>
                <span className={`status-badge ${reservation.status}`}>
                  {reservation.status === "pending" && "Na čekanju"}
                  {reservation.status === "approved" && "Prihvaćeno"}
                  {reservation.status === "rejected" && "Odbijeno"}
                </span>
              </div>

              {expandId === reservation.id && (
                <div className="reservation-details">
                  <div className="detail-row">
                    <span className="detail-label">Telefon:</span>
                    <span>{formatPhoneNumber(reservation.brojTelefona)}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Usluge:</span>
                    <div className="services-list">
                      {reservation.usluge.map((usluga, index) => (
                        <div key={index} className="service-item">
                          <strong>{usluga.naziv}</strong>
                          {usluga.detalji.length > 0 && (
                            <ul>
                              {usluga.detalji.map((detalj, i) => (
                                <li key={i}>{detalj}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {reservation.status === "pending" && (
                    <div className="reservation-actions">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(reservation.id)}
                      >
                        Prihvati
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(reservation.id)}
                      >
                        Odbij
                      </button>
                    </div>
                  )}
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
