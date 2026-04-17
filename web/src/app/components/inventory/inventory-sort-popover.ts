import { Component, input } from '@angular/core';

@Component({
  selector: 'inventory-sort-popover',
  template: `
    <div class="bg-dark-light p-2 rounded-xl text-primary-mutated inset-shadow-md">
      <ul class="flex flex-col gap-y-3 py-2 text-sm">
        @for (option of sortOptions; track $index) {
          <li class="rounded-lg cursor-pointer p-2 hover:text-primary hover:bg-dark-medium">
            {{ option }}
          </li>
        }
      </ul>
    </div>
  `,
})
export class InventorySortPopover {
  readonly sortOptions = ['Last updated', 'Stock ascending', 'Stock descending'];
}
