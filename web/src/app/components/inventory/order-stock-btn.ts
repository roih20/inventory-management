import { Component, output } from '@angular/core';
import { LucidePlus } from '@lucide/angular';
@Component({
  selector: 'order-stock-btn',
  template: `
    <button
      (click)="openStockModal()"
      class="flex items-center gap-x-2 rounded-xl bg-dark-light px-4 py-3 text-primary-mutated inset-shadow-md cursor-pointer"
    >
      <svg lucidePlus class="h-5 w-5"></svg>
      <span class="">Add Stock</span>
    </button>
  `,
  imports: [LucidePlus],
})
export class OrderStockBtn {
  openModal = output<boolean>();

  openStockModal() {
    this.openModal.emit(true);
  }
}
