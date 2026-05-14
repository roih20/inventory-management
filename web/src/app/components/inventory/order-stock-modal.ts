import { Component, inject, output, signal } from '@angular/core';
import { StoreDropdown } from '@components/ui/store-dropdown';
import { ProductDropdown } from '@components/ui/product-dropdown';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideX, LucideShoppingCart, LucideMapPin, LucideChevronDown } from '@lucide/angular';
import { Store } from '@interfaces/store.interface';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'order-stock-modal',
  template: `
    <div
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-dark-regular/40"
    >
      <div
        class="bg-dark-regular w-full max-w-2xl text-primary p-8 border border-dark-medium rounded-2xl"
      >
        <div class="flex items-center gap-x-6 mb-8">
          <div class="bg-primary p-3 rounded-xl">
            <svg lucideShoppingCart class="h-7 w-7 text-black"></svg>
          </div>
          <div class="flex flex-col gap-y-1 flex-1">
            <h2 class="text-left text-2xl text-primary-light">Order Stock</h2>
            <p class="text-primary-mutated">Place a new stock order</p>
          </div>
          <button type="button" (click)="onCloseModal()" class="text-primary cursor-pointer">
            <svg lucideX class="h-5 w-5"></svg>
          </button>
        </div>
        <form class="flex flex-col gap-y-4" [formGroup]="orderStockForm" (ngSubmit)="onSubmit()">
          <label class="flex flex-col gap-y-1 w-full mb-4">
            <span class="text-primary-light">Product <span class="text-red-400">*</span></span>
            <span class="text-primary-mutated text-sm">Select the product to order</span>
            <div class="mt-2 relative">
              <svg
                lucideChevronDown
                class="w-5 h-5 top-1/2 absolute -translate-y-1/2 right-4"
              ></svg>
              <button
                type="button"
                (click)="onClickProductDropdown()"
                class="border border-dark-medium bg-dark-light p-4 cursor-pointer rounded-xl text-primary-mutated text-left w-full focus:outline-none focus:ring focus:ring-white/40 focus:border-white/40"
              >
                @if (!product().name) {
                  Select product
                } @else {
                  {{ product().name }}
                }
              </button>
            </div>
            @if (isProductDropdownOpen()) {
              <product-dropdown
                [selectedProduct]="product()"
                (selectProduct)="onSelectProduct($event)"
              ></product-dropdown>
            }
          </label>
          <label class="flex flex-col gap-y-1 w-full mb-4">
            <span class="text-primary-light"
              >Quantity to order <span class="text-red-400">*</span></span
            >
            <span class="text-primary-mutated text-sm">Enter the quantity you want to add</span>
            <input
              type="number"
              formControlName="quantity"
              min="1"
              max="99"
              class="p-4 mt-2 bg-dark-light border border-dark-medium rounded-xl focus:ring focus:ring-white/40 focus:border-white/40 focus:outline-none"
            />
          </label>
          <label class="flex flex-col gap-y-1 w-full">
            <span class="text-primary-light">Location <span class="text-red-400">*</span></span>
            <span class="text-primary-mutated text-sm"
              >Select the storage location for this stock</span
            >
            <div class="relative mt-2">
              <svg lucideMapPin class="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2"></svg>
              <svg
                lucideChevronDown
                class="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2"
              ></svg>
              <button
                (click)="onClickDropwdown()"
                type="button"
                class="border border-dark-medium bg-dark-light py-4 pl-12 pr-6 rounded-xl text-primary-mutated text-left w-full focus:outline-none focus:ring focus:ring-white/40 focus:border-white/40"
              >
                @if (!storeLocation().zipCode) {
                  Select location
                } @else {
                  {{ storeLocation().street }}, {{ storeLocation().city }},
                  {{ storeLocation().state }} {{ storeLocation().zipCode }}
                }
              </button>
            </div>
            @if (isDropdownOpen()) {
              <store-dropdown
                [selectedStoredLocation]="storeLocation()"
                (selectStoreLocation)="onSelectStoreLocation($event)"
              ></store-dropdown>
            }
          </label>
          <div class="flex items-center justify-between mt-4">
            <button
              type="button"
              (click)="onCloseModal()"
              class="rounded-xl cursor-pointer text-primary bg-dark-light px-8 py-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex items-center gap-x-4 rounded-xl cursor-pointer bg-primary text-black px-4 py-4 disabled:cursor-not-allowed"
            >
              <svg lucideShoppingCart class="h-5 w-5"></svg>
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  imports: [
    LucideX,
    ReactiveFormsModule,
    LucideShoppingCart,
    LucideMapPin,
    LucideChevronDown,
    StoreDropdown,
    ProductDropdown,
  ],
})
export class OrderStockModal {
  private formBuilder = inject(FormBuilder);
  orderStockForm = this.formBuilder.nonNullable.group({
    product: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1), Validators.max(99)]],
    location: ['', Validators.required],
  });
  closeModal = output<boolean>();
  isDropdownOpen = signal<boolean>(false);
  isProductDropdownOpen = signal<boolean>(false);
  storeLocation = signal<Store>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  product = signal<Partial<Product>>({
    id: 0,
    name: '',
  });

  onSubmit() {
    console.log(this.orderStockForm.value);
  }

  onSelectStoreLocation(location: Store) {
    const { street, city, state, zipCode } = location;
    this.storeLocation.set(location);
    this.orderStockForm.get('location')?.setValue(`${street}, ${city}, ${state} ${zipCode}`);
  }

  onSelectProduct(product: Product) {
    const { id, name } = product;
    this.product.set({ id, name });
    this.orderStockForm.get('product')?.setValue(name);
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  onClickDropwdown() {
    this.isDropdownOpen.update((value) => !value);
  }

  onClickProductDropdown() {
    this.isProductDropdownOpen.update((value) => !value);
  }
}
