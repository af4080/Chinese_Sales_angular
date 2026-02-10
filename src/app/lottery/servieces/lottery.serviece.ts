import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviorments/enviorment';


@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  private apiUrl = `${environment.apiUrl}/api/Lottery`; // וודא שהכתובת תואמת לשרת שלך

  constructor(private http: HttpClient) { }

  // הגרלה כללית לכל המתנות
  runAllLotteries(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }

  // הגרלה למתנה ספציפית לפי שם
  runLotteryForGift(giftName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${giftName}`, {});
  }

  // איפוס מכירה סינית (זהירות!)
  startNewChineseSale(): Observable<string> {
    return this.http.put(`${this.apiUrl}/newSale`, {}, { responseType: 'text' });
  }

  // הורדת קובץ ה-ZIP עם הזוכים
  downloadWinnersZip(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/downled-winner-zip`, {
      responseType: 'blob' // חשוב מאוד כדי לטפל בקובץ בינארי
    });
  }
}
