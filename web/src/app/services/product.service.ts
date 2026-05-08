import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResult } from '@interfaces/pagination.interface';
import { Product } from '@interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:4321/products';

  getAllPaginated(offset?: number): Observable<PaginatedResult<Product>> {
    let params = new HttpParams();

    params = params.set('limit', 10);

    if (offset != undefined) {
      params = params.set('offset', offset);
    }

    return this.http.get<PaginatedResult<Product>>(this.API_URL, { params });
  }

  getSearchedProducts(product: string): Observable<PaginatedResult<Product>> {
    let params = new HttpParams();

    params = params.set('product', product);

    return this.http.get<PaginatedResult<Product>>(`${this.API_URL}/search`, { params });
  }
}
