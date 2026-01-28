import { Injectable } from '@angular/core';
import { environment } from '../../../enviorments/enviorment';
import { HttpClient } from '@angular/common/http';
import { CreateBasket } from '../models/createBasket.model';
import { Observable } from 'rxjs';
import { ReadBasket } from '../models/readBasket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketSrevice {
    private apiUrl = `${environment.apiUrl}/api/basket`;
      constructor(private http: HttpClient) {}

  createBasket(data: CreateBasket): Observable<ReadBasket> {
    return this.http.post<ReadBasket>(this.apiUrl, data);
  }
  
  getMyBasket(): Observable<ReadBasket[]> {
    return this.http.get<ReadBasket[]>(`${this.apiUrl}/me`);
  }

  getBasketById(id: number): Observable<ReadBasket> {
    return this.http.get<ReadBasket>(`${this.apiUrl}/${id}`);
  }

  updateBasket(id: number, data: number): Observable<ReadBasket> {
    return this.http.put<ReadBasket>(`${this.apiUrl}/${id}/amount?newAmount=${data}`, {});
  }
  deleteBasket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
