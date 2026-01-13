// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUser } from '../models/user-login.model';
import { CreateUser } from '../models/user-create.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = `${environment.apiUrl}/api/auth`;
  private tokenkey = 'auth_token';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();
  private roleSubject = new BehaviorSubject<string | null>((this.decodeToken()?.role || null));
  role$ = this.roleSubject.asObservable();


  constructor(private http: HttpClient) { }

  login(login: LoginUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, login).pipe(
      tap(response => {
        if (response.token) {

          localStorage.setItem(this.tokenkey, response.token);
          this.loggedInSubject.next(true);
          this.roleSubject.next(this.decodeToken().role || null);
          
        }
      })
    );
  }

  register(user: CreateUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  private decodeToken(): any | null {
    const token = localStorage.getItem(this.tokenkey);
    try {
      if (token) {
        const payload = token.split('.')[1];
        console.log('Decoded token payload:', JSON.parse(atob(payload)));
        return JSON.parse(atob(payload));
        
        
      }
      return null;
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }
  getUserRole(): string | null {
    return this.roleSubject.value;
  }
  isAdmin(): boolean {
    
    return this.getUserRole() === 'admin';
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenkey);
  }
  logout(): void {
    localStorage.removeItem(this.tokenkey);
    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
  }



}
