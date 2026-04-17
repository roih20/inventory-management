import { Component } from '@angular/core';
import { LucideArrowLeft } from '@lucide/angular';
import { LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'table-pagination',
  template: ` <div class="text-primary flex items-center justify-between mt-8 px-2">
    <p class="font-light">Showing <span class="font-medium">1 - 10</span> of 100 results</p>
    <div class="flex items-center gap-x-8">
      <button
        class="flex items-center gap-x-2 bg-dark-light px-3 py-1.5 rounded-lg inset-shadow-md"
      >
        <svg lucideArrowLeft class="h-5 w-5"></svg>
        <span>Previous</span>
      </button>
      <button
        class="flex items-center gap-x-2 bg-dark-light px-3 py-1.5 rounded-lg inset-shadow-md"
      >
        <span>Next</span>
        <svg lucideArrowRight class="h-5 w-5"></svg>
      </button>
    </div>
  </div>`,
  imports: [LucideArrowLeft, LucideArrowRight],
})
export class TablePagination {}
