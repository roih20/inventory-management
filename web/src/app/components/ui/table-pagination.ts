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
        (click)="handlePageChange(paginationMetadata().currentPage - 1)"
        class="p-3 border border-dark-medium rounded-xl cursor-pointer disabled:cursor-not-allowed"
      >
        <svg lucideChevronLeft class="h-5 w-5"></svg>
      </button>
      <div
        class="flex items-center justify-center p-3 border border-dark-medium rounded-xl h-11.5 w-11.5"
      >
        {{ paginationMetadata().currentPage }}
      </div>
      <button
        [disabled]="!paginationMetadata().hasNextPage"
        (click)="handlePageChange(paginationMetadata().currentPage + 1)"
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
  changePage = output<number>();

  handlePageChange(page: number) {
    this.changePage.emit(page);
  }
}
