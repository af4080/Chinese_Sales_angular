// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login } from '../models/user-login.model';
import { CreateUser } from '../models/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/auth'; 

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, login).pipe(
      tap(response => {
          if (response.token) {
                
            localStorage.setItem('auth_token', response.token);
          }
        })
    );
  }

  register(user: CreateUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}

