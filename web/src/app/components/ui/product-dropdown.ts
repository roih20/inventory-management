import { Component, inject, output, input } from '@angular/core';
import { ProductService } from '@services/product.service';
import { Product } from '@interfaces/product.interface';
import { LucideCheck } from '@lucide/angular';
@Component({
  selector: 'product-dropdown',
  template: `
    <div class="mt-2 border border-dark-medium rounded-xl bg-dark-light overflow-hidden h-56">
      <ul
        class="flex flex-col gap-2 overflow-y-auto h-full p-3 scrollbar-thin scrollbar-track-dark-medium scrollbar-thumb-primary"
      >
        @for (product of productService.distinctProducts.value(); track product.id) {
          <li
            [class.bg-dark-medium]="product.name === selectedProduct().name"
            class="py-4 px-3 transition cursor-pointer flex items-center rounded-xl hover:bg-dark-medium"
            (click)="onSelectProduct(product)"
          >
            <p class="flex-1">{{ product.name }}</p>
            @if (product.name === selectedProduct().name) {
              <div class="bg-primary rounded-full p-1">
                <svg lucideCheck class="w-5 h-5 text-black"></svg>
              </div>
            }
          </li>
        }
      </ul>
    </div>
  `,
  imports: [LucideCheck],
})
export class ProductDropdown {
  protected readonly productService = inject(ProductService);
  selectedProduct = input.required<Partial<Product>>();
  selectProduct = output<Product>();

  onSelectProduct(product: Product) {
    this.selectProduct.emit(product);
  }
}
