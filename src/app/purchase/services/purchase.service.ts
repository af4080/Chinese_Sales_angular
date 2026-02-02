import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadPurchase } from '../models/ReadPurchase.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  
  private apiUrl = `${environment.apiUrl}/api/purchese`;
  
  private http = inject(HttpClient);


  getBuyersDetails(): Observable<ReadPurchase[]> {
    return this.http.get<ReadPurchase[]>(`${this.apiUrl}/buyers`);
  }


  getGiftsSortedBySales(): Observable<ReadPurchase[]> {
    return this.http.get<ReadPurchase[]>(`${this.apiUrl}/gifts/sorted`);
  }

 
  getPurchasesByGift(giftName: string): Observable<ReadPurchase[]> {
    return this.http.get<ReadPurchase[]>(`${this.apiUrl}/gift/${giftName}`);
  }

  getPurchasesOrderedByPrice(): Observable<ReadPurchase[]> {
    return this.http.get<ReadPurchase[]>(`${this.apiUrl}/ordered-by-price`);
  }
}
