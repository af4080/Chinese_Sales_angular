import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { ReadDonner } from '../model/doner-read.model';
import { Observable } from 'rxjs';
import { CreateDonner } from '../model/doner-create.model';
import { UpdateDonner } from '../model/doner-update.model';
import { environment } from '../../../enviorments/enviorment';


@Injectable({
  providedIn: 'root',
})
export class DonerService {
  
  private readonly baseUrl = `${environment.apiUrl}/api/Donner`;

  constructor(private http: HttpClient) {}

  getAllDonners(): Observable<ReadDonner[]> {
    return this.http.get<ReadDonner[]>(this.baseUrl);
  }

  getDonnerById(id: number): Observable<ReadDonner> {
    return this.http.get<ReadDonner>(`${this.baseUrl}/${id}`);
  }

  getDonnerByName(name: string): Observable<ReadDonner> {
    return this.http.get<ReadDonner>(`${this.baseUrl}/byname/${name}`);
  }

  getDonnerByEmail(email: string): Observable<ReadDonner> {
    const params = new HttpParams().set('email', email);
    return this.http.get<ReadDonner>(`${this.baseUrl}/byemail`, { params });
  }

  getDonnerByGiftId(giftId: number): Observable<ReadDonner> {
    return this.http.get<ReadDonner>(`${this.baseUrl}/bygift/${giftId}`);
  }

  addDonner(dto: CreateDonner): Observable<ReadDonner> {
    return this.http.post<ReadDonner>(this.baseUrl, dto);
  }

  updateDonner(id: number, dto: UpdateDonner): Observable<ReadDonner> {
    return this.http.put<ReadDonner>(`${this.baseUrl}/${id}`, dto);
  }

  deleteDonner(id: number): Observable<ReadDonner> {
    return this.http.delete<ReadDonner>(`${this.baseUrl}/${id}`);
  }
}
