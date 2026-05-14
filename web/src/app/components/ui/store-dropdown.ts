import { Component, inject, OnInit, output, signal, input } from '@angular/core';
import { Store } from '@interfaces/store.interface';
import { StoreService } from '@services/store.service';
import { LucideMapPin, LucideCheck } from '@lucide/angular';

@Component({
  selector: 'store-dropdown',
  template: `
    <div class="mt-2 border border-dark-medium rounded-xl p-3 bg-dark-light">
      <ul class="flex flex-col gap-2">
        @for (store of storeService.stores.value(); track store.zipCode) {
          <li
            [class.bg-dark-medium]="selectedStoredLocation().zipCode === store.zipCode"
            class="p-3 cursor-pointer transition rounded-xl hover:bg-dark-medium"
            (click)="onSelectStoreLocation(store)"
          >
            <div class="flex items-center gap-4">
              <div class="bg-dark-thin p-3 rounded-xl">
                <svg lucideMapPin class="w-5 h-5"></svg>
              </div>
              <div class="flex-1">
                <p class="">{{ store.street }}</p>
                <p class="text-primary-mutated ">
                  {{ store.city }}, {{ store.state }} {{ store.zipCode }}
                </p>
              </div>
              @if (store.zipCode === selectedStoredLocation().zipCode) {
                <div class="bg-primary rounded-full p-1.5">
                  <svg lucideCheck class="w-5 h-5 text-black"></svg>
                </div>
              }
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  imports: [LucideMapPin, LucideCheck],
})
export class StoreDropdown {
  protected readonly storeService = inject(StoreService);
  selectedStoredLocation = input.required<Store>();
  stores = signal<Store[]>([]);
  selectStoreLocation = output<Store>();

  onSelectStoreLocation(location: Store) {
    this.selectStoreLocation.emit(location);
  }
}
