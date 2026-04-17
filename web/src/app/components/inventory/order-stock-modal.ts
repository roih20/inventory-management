import { Component, inject, output } from '@angular/core';
import { ProductComboBox } from './product-combo-box';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'order-stock-modal',
  template: `
    <div
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-dark-bold/80"
    >
      <div class="bg-dark-regular w-full max-w-xl text-primary py-5 px-6 rounded-3xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-left text-lg">Order Stock</h2>
          <button
            type="button"
            (click)="closeModal()"
            class="text-primary cursor-pointer hover:bg-dark-medium rounded-lg p-1"
          >
            <svg lucideX class="h-5 w-5"></svg>
          </button>
        </div>
        <form class="flex flex-col gap-y-4" [formGroup]="orderStockForm" (ngSubmit)="onSubmit()">
          <product-combo-box
            class="w-full"
            [control]="orderStockForm.controls.product"
          ></product-combo-box>
          <label class="flex flex-col gap-y-2 w-full">
            <span class="font-light">Quantity</span>
            <input
              type="number"
              formControlName="quantity"
              min="1"
              max="99"
              class="p-3 border border-dark-thin rounded-2xl bg-transparent focus:outline-none focus:ring-0 "
            />
          </label>
          <label class="flex flex-col gap-y-2 w-full mb-2">
            <span class="font-light">Location</span>
            <select
              formControlName="location"
              class="p-3 border border-dark-thin bg-transparent rounded-2xl appearance-none focus:outline-none focus:ring-0"
            >
              <option value="warehouse A">Warehouse A</option>
              <option value="warehouse B">Warehouse B</option>
            </select>
          </label>
          <div class="flex items-center justify-between">
            <button
              type="button"
              (click)="closeModal()"
              class="px-3 py-1.5 bg-dark-light rounded-xl cursor-pointer text-primary-mutated hover:bg-dark-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="orderStockForm.invalid"
              class="px-3 py-1.5 rounded-xl cursor-pointer bg-primary text-dark-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  imports: [LucideX, ReactiveFormsModule, ProductComboBox],
})
export class OrderStockModal {
  private formBuilder = inject(FormBuilder);
  orderStockForm = this.formBuilder.nonNullable.group({
    product: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1), Validators.max(99)]],
    location: ['', Validators.required],
  });
  close = output<boolean>();

  onSubmit() {
    console.log(this.orderStockForm.value);
    this.orderStockForm.reset();
    //this.closeModal();
  }

  closeModal() {
    this.close.emit(false);
  }
}
