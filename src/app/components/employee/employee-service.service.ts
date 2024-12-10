import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private apiUrl = 'http://localhost:8081/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/list-employees`);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/${id}`);
  }
}
