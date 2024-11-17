import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://reqres.in/api'; 

  constructor(private https: HttpClient) {}

  getUsers(): Observable<any> {
    return this.https.get(`${this.apiUrl}/users?page=1&per_page=10`); 
  }
  
  getUserById(userId: number): Observable<any> {
    return this.https.get(`${this.apiUrl}/users/${userId}`); 
  }

  createUser(user: any): Observable<any> {
    return this.https.post(`${this.apiUrl}/users`, user);
  }

  updateUser(userId: number, user: any): Observable<any> {
    return this.https.put(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.https.delete(`${this.apiUrl}/users/${userId}`);
  }

  registerUser(user: any): Observable<any> {
    return this.https.post(`${this.apiUrl}/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.https.post(`${this.apiUrl}/login`, user);
  }
}
