import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employee_name?: string;
  employee_age?: number;
  employee_salary?: number;
  email: string;
  contactNumber?: string;
  age?: number;
  dob?: string;
  salary?: number;
  address?: string;
  S_No?: number;
  surname?: string;
  created_time?: Date;
  updated_time?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API = environment.api_url + 'employees';
  private readonly http = inject(HttpClient);

  // ✅ Create new employee
  createEmployee(data: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.API, data);
  }

  // ✅ Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API);
  }

  // ✅ Get single employee by ID
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.API}/${id}`);
  }

  // ✅ Update employee
  updateEmployee(id: string, data: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.API}/${id}`, data);
  }

  // ✅ Delete employee
  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.API}/${id}`);
  }
}

