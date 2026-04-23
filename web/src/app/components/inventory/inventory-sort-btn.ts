import { Component, signal, input, output } from '@angular/core';
import { LucideArrowDownWideNarrow } from '@lucide/angular';
import { InventorySortPopover } from './inventory-sort-popover';
import { ClickOutsideDirective } from '@directives/clickOutside.directive';
@Component({
  selector: 'inventory-sort-btn',
  template: `
    <div class="relative" (clickOutside)="closePopover()">
      <button
        (click)="togglePopover()"
        class="bg-dark-light text-primary-mutated rounded-2xl px-4 py-3 flex items-center gap-x-2 inset-shadow-md cursor-pointer"
      >
        <svg lucideArrowDownWideNarrow class="h-5 w-5"></svg>
        Sort
      </button>
      @if (isOpen()) {
        <inventory-sort-popover
          class="absolute top-full z-10 left-0 mt-2 w-44"
          (onSelectedSort)="onSortSelected.emit($event)"
        ></inventory-sort-popover>
      }
    </div>
  `,
  imports: [LucideArrowDownWideNarrow, InventorySortPopover, ClickOutsideDirective],
})
export class InventorySortBtn {
  sortOptions = input<string[]>([]);
  isOpen = signal<boolean>(false);
  onSortSelected = output<{
    sort: string;
    order: 'ASC' | 'DESC';
  }>();

  togglePopover() {
    this.isOpen.update((open) => !open);
  }

  closePopover() {
    this.isOpen.set(false);
  }
}
