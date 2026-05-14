import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@interfaces/store.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:4321/stores';

  stores = httpResource<Store[]>(() => this.API_URL, {
    defaultValue: [],
  });
}
