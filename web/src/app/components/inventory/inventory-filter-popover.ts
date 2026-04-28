import { Component, input, output, signal } from '@angular/core';
import { LucideCheck } from '@lucide/angular';
@Component({
  selector: 'inventory-filter-popover',
  template: `
    <div class="bg-dark-light px-2 py-3 rounded-xl text-primary-mutated">
      <div class="mb-1">
        <h4 class="uppercase text-sm font-medium py-1 px-1">Stock level</h4>
        <ul class="flex flex-col gap-y-3 py-1 text-sm">
          @for (status of inventoryStatus; track status) {
            <li class="rounded-lg p-2 hover:text-primary hover:bg-dark-medium">
              <label class="relative flex items-center gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  (change)="onSelectFilter($event)"
                  value="{{ status }}"
                  [checked]="selectedFilters().has(status)"
                  class="appearance-none relative cursor-pointer peer w-5 h-5 border border-primary-mutated rounded-sm checked:bg-primary"
                />
                <span>{{ status }}</span>
                <svg
                  lucideCheck
                  class="h-5 w-5 text-dark-medium absolute hidden pointer-events-none peer-checked:block"
                ></svg>
              </label>
            </li>
          }
        </ul>
      </div>
      <div class="">
        <h4 class="uppercase text-sm font-medium py-1 px-1">Location</h4>
        <ul class="flex flex-col gap-y-3 py-1 text-sm">
          <li class="rounded-lg p-2 hover:text-primary hover:bg-dark-medium">
            <label class="relative flex items-center gap-x-2 cursor-pointer">
              <input
                type="checkbox"
                (change)="onSelectFilter($event)"
                value="Warehouse A"
                [checked]="selectedFilters().has('Warehouse A')"
                class="appearance-none relative cursor-pointer peer w-5 h-5 border border-primary-mutated rounded-sm checked:bg-primary"
              />
              <span>Warehouse A</span>
              <svg
                lucideCheck
                class="h-5 w-5 text-dark-medium absolute hidden pointer-events-none peer-checked:block"
              ></svg>
            </label>
          </li>
          <li class="rounded-lg p-2 hover:text-primary hover:bg-dark-medium">
            <label class="relative flex items-center gap-x-2 cursor-pointer">
              <input
                type="checkbox"
                (change)="onSelectFilter($event)"
                value="Warehouse B"
                [checked]="selectedFilters().has('Warehouse B')"
                class="appearance-none relative cursor-pointer peer w-5 h-5 border border-primary-mutated rounded-sm checked:bg-primary"
              />
              <span>Warehouse B</span>
              <svg
                lucideCheck
                class="h-5 w-5 text-dark-medium absolute hidden pointer-events-none peer-checked:block"
              ></svg>
            </label>
          </li>
        </ul>
      </div>
    </div>
  `,
  imports: [LucideCheck],
})
export class InventoryFilterPopover {
  onFilerChecked = output<string>();
  selectedFilters = input.required<Set<string>>();
  readonly inventoryStatus = ['Low', 'Medium', 'High'];

  onSelectFilter(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.onFilerChecked.emit(value);
  }
}
