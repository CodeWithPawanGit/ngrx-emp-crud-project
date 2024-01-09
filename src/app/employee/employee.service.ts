import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './store/employee';
import { Observable } from 'rxjs'; // Add this line

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Employee[]>('http://localhost:3000/employee');
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employee');
  }

  getById(id: number): Observable<Employee | undefined> {
    return this.http.get<Employee>(`http://localhost:3000/employee/${id}`);
  }

  create(payload: Employee) {
    return this.http.post<Employee>('http://localhost:3000/employee', payload);
  }

  update(payload: Employee) {
    return this.http.put<Employee>(
      `http://localhost:3000/employee/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/employee/${id}`);
  }
}
