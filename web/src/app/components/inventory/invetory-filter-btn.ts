import { Component, input, output, signal } from '@angular/core';
import { LucideListFilter } from '@lucide/angular';
import { InventoryFilterPopover } from './inventory-filter-popover';
import { ClickOutsideDirective } from '@directives/clickOutside.directive';

@Component({
  selector: 'inventory-filter-btn',
  template: `
    <div class="relative" (clickOutside)="closePopover()">
      <button
        (click)="togglePopover()"
        class="bg-dark-light text-primary-mutated rounded-2xl px-4 py-3 flex items-center gap-x-2 inset-shadow-md cursor-pointer "
      >
        <svg lucideListFilter class="h-5 w-5"></svg>
        Filter
      </button>
      @if (isOpen()) {
        <inventory-filter-popover
          class="absolute top-full z-10 left-0 mt-2 w-44"
          [selectedFilters]="selectedFilters"
        ></inventory-filter-popover>
      }
    </div>
  `,
  imports: [LucideListFilter, InventoryFilterPopover, ClickOutsideDirective],
})
export class InventoryFilterBtn {
  isOpen = signal<boolean>(false);
  onFilterChecked = output<Set<string>>();
  selectedFilters = new Set<string>();

  togglePopover() {
    this.isOpen.update((open) => !open);
  }

  closePopover() {
    this.isOpen.set(false);
  }
}
