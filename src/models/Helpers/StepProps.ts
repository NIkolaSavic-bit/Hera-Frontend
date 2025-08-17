import type { Service } from "../Service/Service";
import type { ReservationFormData } from "./ReservationFormData";

export interface StepProps {
  services: Service[];
  formData: ReservationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
  errors: { [key: string]: boolean };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  nextStep: () => void;
  prevStep?: () => void;
  currentServiceIndex?: number;
}
