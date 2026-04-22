import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:4321/inventory';

  getAll(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.API_URL);
  }

  searchInventory(term: string): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.API_URL}/search?product=${term}`);
  }
}
