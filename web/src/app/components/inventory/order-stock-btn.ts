import { Component, output } from '@angular/core';
import { LucidePlus } from '@lucide/angular';
@Component({
  selector: 'order-stock-btn',
  template: `
    <button
      (click)="handleOpenModal()"
      class="flex items-center gap-x-2 rounded-xl bg-primary p-4 text-dark-regular cursor-pointer"
    >
      <svg lucidePlus class="h-5 w-5"></svg>
      <span class="">Add Stock</span>
    </button>
  `,
  imports: [LucidePlus],
})
export class OrderStockBtn {
  openModal = output<boolean>();

  handleOpenModal() {
    this.openModal.emit(true);
  }
}
