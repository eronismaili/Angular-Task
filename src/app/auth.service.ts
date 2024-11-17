import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';


  constructor(private https: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.https.post(`${this.apiUrl}/register`, body);
    }

  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.https.post(`${this.apiUrl}/register`, body);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
