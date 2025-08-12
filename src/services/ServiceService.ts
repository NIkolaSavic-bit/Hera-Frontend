import axios from "axios";
import type { Service } from "../models/Service/Service";
import type { Subservice } from "../models/Subservice/Subservice";

const API_URL = import.meta.env.VITE_API_URL;

export class ServiceService {
  
  async getAllServices(): Promise<Service[]> {
    const response = await axios.get<Service[]>(`${API_URL}/Service`);
    console.log(response);
    return response.data;
  }

  async getAllSubServices(): Promise<Subservice[]> {
    const response = await axios.get<Subservice[]>(`${API_URL}/SubService`);
    return response.data;
  }

  async getAllSubServicesByServiceId(serviceId: string): Promise<Subservice[]> {
    const response = await axios.get<Subservice[]>(
      `${API_URL}/SubService/byService/${serviceId}`
    );
    return response.data;
  }
}
