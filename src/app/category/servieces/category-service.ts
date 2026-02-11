import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadCategory } from '../models/read-category.model';
import { Observable } from 'rxjs';
import { CreateCategory } from '../models/create-category.model';
import { UpdateCategory } from '../models/update-category.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/Category`; 

  getAllCategories(): Observable<ReadCategory[]> {
    return this.http.get<ReadCategory[]>(this.apiUrl);
  }

  
  addCategory(category: CreateCategory): Observable<ReadCategory> {
    return this.http.post<ReadCategory>(this.apiUrl, category);
  }

  updateCategory(id: number, category: UpdateCategory): Observable<ReadCategory> {
    return this.http.put<ReadCategory>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<ReadCategory> {
    return this.http.delete<ReadCategory>(`${this.apiUrl}/${id}`);
  }
}
