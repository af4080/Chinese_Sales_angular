import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReadGift } from '../models/gift.model';
import { CreateGift } from '../models/create-gift.model';
import { UpdateGift } from '../models/update-gift.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private apiUrl = `${environment.apiUrl}/api/Gift`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ReadGift[]> {
    return this.http.get<ReadGift[]>(this.apiUrl);
  }
  // GET: api/Gift/{name}
  getByName(name: string): Observable<ReadGift> {
    return this.http.get<ReadGift>(`${this.apiUrl}/${name}`);
  }

  // GET: api/Gift/doner/{name}
  getByDonerName(name: string): Observable<ReadGift[]> {
    return this.http.get<ReadGift[]>(`${this.apiUrl}/doner/${name}`);
  }

  // GET: api/Gift/numcustomer/{count}
  getByNumCustomer(count: number): Observable<ReadGift[]> {
    return this.http.get<ReadGift[]>(`${this.apiUrl}/numcustomer/${count}`);
  }

  
  // POST: api/Gift
  create(gift: CreateGift): Observable<ReadGift> {
    return this.http.post<ReadGift>(this.apiUrl, gift);
  }

  // DELETE: api/Gift/{id}
  delete(id: number): Observable<ReadGift> {
    return this.http.delete<ReadGift>(`${this.apiUrl}/${id}`);
  }

  // PUT: api/Gift/{id}
  update(name: string, gift: UpdateGift): Observable<ReadGift> {
    return this.http.patch<ReadGift>(`${this.apiUrl}/${name}`, gift);
  }
}
