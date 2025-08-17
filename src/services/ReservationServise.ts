import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export class ReservationService {
  async createReservation(reservationData: any) {
    try {
      const response = await axios.post(`${API_URL}/reservation/create`, reservationData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating reservation:", error.response || error.message);
      throw error;
    }
  }

  async getReservationsByDate(date: Date) {
    try {
      const isoDate = date.toISOString();
      const response = await axios.get(`${API_URL}/Reservation`, {
        params: { date: isoDate }
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching reservations:", error.response || error.message);
      return [];
    }
  }
}
