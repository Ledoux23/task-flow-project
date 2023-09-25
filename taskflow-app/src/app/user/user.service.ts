import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8080/api/users');
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/users', user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/users/${id}`);
  }

  getUserById(id: number): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/api/users/${id}`);
  }

  getUserByName(firstName: string, lastName: string) {
    return this.http.get<any>(`http://localhost:8080/api/users/find?firstName=${firstName}&lastName=${lastName}`);
  }

  getUserByMail(mail: string) {
    return this.http.get<any>(`http://localhost:8080/api/users/findByMail?email=${mail}`);
  }




}




