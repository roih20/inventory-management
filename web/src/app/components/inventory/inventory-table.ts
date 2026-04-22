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
          <th class="p-4 rounded-tl-2xl">ID</th>
          <th class="p-4">Product</th>
          <th class="p-4">Category</th>
          <th class="p-4">Quantity</th>
          <th class="p-4">Status</th>
          <th class="p-4">Location</th>
          <th class="p-4 rounded-tr-2xl"></th>
        </tr>
      </thead>
      <tbody class="bg-dark-regular">
        @for (item of inventoryItems(); track item.id) {
          <tr class="group text-left text-primary-mutated">
            <td
              class="px-4 py-6 border-b border-dark-medium group-last:border-none group-last:rounded-bl-2xl"
            >
              {{ item.id }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ item.product.name }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ item.product.category.name }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ item.quantity }}
            </td>
            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ item.status }}
            </td>

            <td class="px-4 py-6 border-b border-dark-medium group-last:border-none">
              {{ item.location.city }}, {{ item.location.state }} {{ item.location.zipCode }}
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
