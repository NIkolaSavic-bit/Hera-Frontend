import type { Subservice } from "../Subservice/Subservice";

export interface Service {
  name: string;
  serviceId: string;
  description: string;
  subservices: Subservice[];
}
