import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type SortOption = {
  label: string;
  sort: string;
  order: 'ASC' | 'DESC';
};

@Component({
  selector: 'inventory-sort-popover',
  template: `
    <div class="bg-dark-light p-2 rounded-xl text-primary-mutated inset-shadow-md">
      <ul class="flex flex-col gap-y-3 py-2 text-sm">
        @for (option of sortOptions; track option.label) {
          <li
            (click)="updateSort(option)"
            class="rounded-lg cursor-pointer p-2 hover:text-primary hover:bg-dark-medium"
          >
            {{ option.label }}
          </li>
        }
      </ul>
    </div>
  `,
})
export class InventorySortPopover {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  onSelectedSort = output<{
    sort: string;
    order: 'ASC' | 'DESC';
  }>();
  readonly sortOptions: SortOption[] = [
    {
      label: 'Quantity: Low to High',
      sort: 'quantity',
      order: 'ASC',
    },
    {
      label: 'Quantity: High to Low',
      sort: 'quantity',
      order: 'DESC',
    },
  ];

  updateSort(option: SortOption) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: option.sort,
        order: option.order,
      },
      queryParamsHandling: 'merge',
    });
    this.onSelectedSort.emit({
      sort: option.sort,
      order: option.order,
    });
  }
}
