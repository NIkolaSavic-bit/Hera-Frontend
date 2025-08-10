import type { Service } from "../Service/Service";
import type { Subservice } from "../Subservice/Subservice";

export interface Reservation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  service?: Service;
  subservices: Subservice[];
  reservationStart: string; 
}