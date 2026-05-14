import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { PaginatedResult } from '@interfaces/pagination.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:4321/inventory';

  fetchInventory(offset: number, status?: string): Observable<PaginatedResult<InventoryItem>> {
    let params = new HttpParams();

    params = params.set('limit', 10);

    params = params.set('offset', offset);

    if (status != undefined && status.length > 0) {
      params = params.set('status', status);
    }

    return this.http.get<PaginatedResult<InventoryItem>>(this.API_URL, { params });
  }

  searchInventory(product: string, offset?: number): Observable<PaginatedResult<InventoryItem>> {
    let params = new HttpParams();

    params = params.set('product', product);

    if (offset !== undefined) {
      params = params.set('offset', offset);
    }

    return this.http.get<PaginatedResult<InventoryItem>>(`${this.API_URL}/search`, { params });
  }
}
