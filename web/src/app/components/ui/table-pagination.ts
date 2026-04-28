import { Component, input, output } from '@angular/core';
import { PaginationMetadata } from '@interfaces/pagination.interface';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

@Component({
  selector: 'table-pagination',
  template: ` <div class="text-primary flex items-center justify-between mt-8 px-2">
    <p class="font-light">
      Showing {{ paginationMetadata().numberOfElements }} of
      {{ paginationMetadata().totalElements }} results
    </p>
    <div class="flex items-center gap-x-8">
      <button
        [disabled]="!paginationMetadata().hasPreviousPage"
        (click)="handlePrevPage()"
        class="bg-dark-light px-3 py-2 rounded-lg cursor-pointer inset-shadow-md disabled:cursor-not-allowed"
      >
        <svg lucideChevronLeft class="h-5 w-5"></svg>
      </button>
      <ol class="flex items-center gap-x-2 text-primary-mutated">
        @for (page of pages; track page) {
          <li class="px-2.5 py-2">{{ page }}</li>
        }
      </ol>
      <button
        [disabled]="!paginationMetadata().hasNextPage"
        (click)="handleNextPage()"
        class="bg-dark-light px-3 py-2 rounded-lg cursor-pointer inset-shadow-md disabled:cursor-not-allowed"
      >
        <svg lucideChevronRight class="h-5 w-5"></svg>
      </button>
    </div>
  </div>`,
  imports: [LucideChevronLeft, LucideChevronRight],
})
export class TablePagination {
  paginationMetadata = input.required<PaginationMetadata>();
  fetchNextPage = output<void>();
  fetchPreviousPage = output<void>();
  readonly pages = [1, 2, 3, 4, 5];

  handleNextPage() {
    this.fetchNextPage.emit();
  }

  handlePrevPage() {
    this.fetchPreviousPage.emit();
  }
}
