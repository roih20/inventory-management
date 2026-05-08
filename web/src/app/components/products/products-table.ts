import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'products-table',
  template: `
    <table class="w-full table-auto">
      <thead>
        <tr class="text-left text-primary-mutated uppercase bg-dark-mutated">
          <th class="px-6 py-5 rounded-tl-xl">ID</th>
          <th class="px-6 py-5">Product</th>
          <th class="px-6 py-5">Category</th>
          <th class="px-6 py-5">Brand</th>
          <th class="px-6 py-5">Price</th>
          <th class="rounded-tr-xl"></th>
        </tr>
      </thead>
      <tbody class="bg-dark-light">
        @for (product of products(); track product.id) {
          <tr class="text-left text-primary-mutated border-b border-dark-medium last:border-0">
            <td class="px-6 py-5">
              {{ product.id }}
            </td>
            <td class="px-6 py-5 font-bold text-primary">
              {{ product.name }}
            </td>
            <td class="px-6 py-5">
              <div class="px-3 py-1 bg-dark-mutated rounded-full text-center inline-block">
                {{ product.category.name }}
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="px-3 py-1 bg-dark-mutated rounded-full text-center inline-block">
                @if (product.brand !== null) {
                  {{ product.brand }}
                } @else {
                  N/A
                }
              </div>
            </td>
            <td class="px-6 py-5 font-bold text-primary">{{ product.price | currency }}</td>
            <td class="px-6 py-5"></td>
          </tr>
        }
      </tbody>
    </table>
  `,
  imports: [CurrencyPipe],
})
export class ProductsTable {
  products = input.required<Product[]>();
}
