import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gift } from '../models/gift.model';
import { CreateGift } from '../models/create-gift.model';
import { UpdateGift } from '../models/update-gift.model';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private apiUrl = 'https://localhost:5001/api/Gift';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.apiUrl);
  }
  // GET: api/Gift/{name}
  getByName(name: string): Observable<Gift> {
    return this.http.get<Gift>(`${this.apiUrl}/${name}`);
  }

  // GET: api/Gift/doner/{name}
  getByDonerName(name: string): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}/doner/${name}`);
  }

  // GET: api/Gift/numcustomer/{count}
  getByNumCustomer(count: number): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}/numcustomer/${count}`);
  }

  
  // POST: api/Gift
  create(gift: CreateGift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, gift);
  }

  // DELETE: api/Gift/{id}
  delete(id: number): Observable<Gift> {
    return this.http.delete<Gift>(`${this.apiUrl}/${id}`);
  }

  // PUT: api/Gift/{id}
  update(name: string, gift: UpdateGift): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiUrl}/${name}`, gift);
  }
}
