import axios from "axios";
import type { EmployeeRegisterDTO } from "../models/Employee/EmployeeRegisterDTO";
import type { EmployeeLoginDTO } from "../models/Employee/EmployeeLoginDTO";
import type { Employee } from "../models/Employee/Employee";

const API_URL = import.meta.env.VITE_API_URL;

class EmployeeService {
  async register(employee: EmployeeRegisterDTO): Promise<void> {
    await axios.post(`${API_URL}/Employee/register`, employee);
  }

  async login(loginDto: EmployeeLoginDTO): Promise<string> {
    const response = await axios.post<{ token: string }>(
      `${API_URL}/Employee/login`,
      loginDto
    );
    return response.data.token;
  }

  async update(employee: Employee): Promise<void> {
    await axios.put(`${API_URL}/Employee/update`, employee);
  }

  async getById(id: number): Promise<Employee> {
    const response = await axios.get<Employee>(`${API_URL}/${id}`);
    return response.data;
  }

  async getAll(): Promise<Employee[]> {
    const response = await axios.get<Employee[]>(`${API_URL}/Employee`);
    return response.data;
  }
}

export default new EmployeeService();
