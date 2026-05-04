import { Component, input, output } from '@angular/core';
import { PaginationMetadata } from '@interfaces/pagination.interface';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

@Component({
  selector: 'table-pagination',
  template: ` <div
    class="text-primary flex items-center justify-between px-6 bg-dark-light border-t border-dark-medium rounded-b-xl"
  >
    <div class="py-4">
      <p class="font-light">
        Showing {{ paginationMetadata().numberOfElements }} of
        {{ paginationMetadata().totalElements }} results
      </p>
    </div>
    <div class="flex items-center gap-x-3 py-4 px-6 border-l border-dark-medium">
      <button
        [disabled]="!paginationMetadata().hasPreviousPage"
        (click)="handlePrevPage()"
        class="p-3 border border-dark-medium rounded-xl cursor-pointer disabled:cursor-not-allowed"
      >
        <svg lucideChevronLeft class="h-5 w-5"></svg>
      </button>
      <ol class="flex items-center gap-x-3 text-primary-mutated">
        @for (page of pages; track page) {
          <li
            class="flex items-center justify-center h-11.5 w-11.5 p-3 border border-dark-medium rounded-xl"
          >
            {{ page }}
          </li>
        }
      </ol>
      <button
        [disabled]="!paginationMetadata().hasNextPage"
        (click)="handleNextPage()"
        class="p-3 border border-dark-medium rounded-xl cursor-pointer disabled:cursor-not-allowed"
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
