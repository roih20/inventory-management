import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private http = inject(HttpClient);
  private readonly url = 'data/inventory.json';
  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url);
  }
}
