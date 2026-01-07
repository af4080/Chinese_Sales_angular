// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {  LoginUser } from '../models/user-login.model';
import { CreateUser } from '../models/user-create.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = "https://localhost:7097/api/auth";
   private apiUrl = `${environment.apiUrl}/api/auth`; 

  constructor(private http: HttpClient) { }

  login(login: LoginUser): Observable<{token: string}> {
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

