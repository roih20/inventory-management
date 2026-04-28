import { Component, input } from '@angular/core';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { TableActionsBtn } from '@components/ui/table-actions-btn';

@Component({
  selector: 'inventory-table',
  template: `
    <table class="w-full table-auto">
      <thead class="">
        <tr class="text-left text-primary border-b border-dark-medium">
          <th class="px-4 pb-5 pt-2">ID</th>
          <th class="px-4 pb-5 pt-2">Product</th>
          <th class="px-4 pb-5 pt-2">Category</th>
          <th class="px-4 pb-5 pt-2">Quantity</th>
          <th class="px-4 pb-5 pt-2">Status</th>
          <th class="px-4 pb-5 pt-2">Location</th>
          <th class="px-4 pb-5 pt-2"></th>
        </tr>
      </thead>
      <tbody class="">
        @for (item of inventoryItems(); track item.id) {
          <tr class="text-left text-primary-mutated border-b border-dark-medium last:border-0">
            <td class="px-4 py-6">
              {{ item.id }}
            </td>
            <td class="px-4 py-6">
              {{ item.product.name }}
            </td>
            <td class="px-4 py-6">
              {{ item.product.category.name }}
            </td>
            <td class="px-4 py-6">
              {{ item.quantity }}
            </td>
            <td class="px-4 py-6">
              {{ item.status }}
            </td>

            <td class="px-4 py-6 ">
              {{ item.location.city }}, {{ item.location.state }} {{ item.location.zipCode }}
            </td>
            <td class="px-4 py-6">
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
