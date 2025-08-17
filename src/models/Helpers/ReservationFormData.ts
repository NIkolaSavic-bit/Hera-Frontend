export interface ReservationFormData {
  ime: string;
  prezime: string;
  brojTelefona: string;
  usluge: {
    serviceId: string;
    subservicesIds: number[];
  }[];
  datum: string;
  vreme: string;
}
