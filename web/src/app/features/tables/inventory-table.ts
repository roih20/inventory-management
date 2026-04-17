import { Component, input } from '@angular/core';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { TableActionsBtn } from '@components/ui/table-actions-btn';

@Component({
  selector: 'inventory-table',
  template: `
    <table
      class="w-full text-primary table-auto border-separate border-spacing-0 border border-dark-medium rounded-2xl"
    >
      <thead class="bg-dark-regular">
        <tr class="text-left">
          <th class="p-4 rounded-tl-2xl">Inventory ID</th>
          <th class="p-4">Product Name</th>
          <th class="p-4">Available Stock</th>
          <th class="p-4">Stock Level</th>
          <th class="p-4">Location</th>
          <th class="p-4">Last Updated</th>
          <th class="p-4 rounded-tr-2xl"></th>
        </tr>
      </thead>
      <tbody class="bg-dark-regular">
        @for (product of inventoryItems(); track product.id) {
          <tr class="group text-left text-primary-mutated">
            <td
              class="px-4 py-6 border-b border-dark-medium group-last:border-none group-last:rounded-bl-2xl"
            >
              {{ product.id }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ product.productName }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ product.availableStock }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ product.stockLevel }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ product.location }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ product.lastUpdated }}
            </td>
            <td
              class="px-4 py-6 border-b border-dark-medium group-last:border-none group-last:rounded-br-2xl"
            >
              <table-actions-btn></table-actions-btn>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  imports: [TableActionsBtn],
})
export class InventoryTable {
  inventoryItems = input<InventoryItem[]>();
}
