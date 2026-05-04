import { Component, input } from '@angular/core';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { TableActionsBtn } from '@components/ui/table-actions-btn';
import { LucideMapPin, LucideAArrowDown } from '@lucide/angular';

@Component({
  selector: 'inventory-table',
  template: `
    <table class="w-full table-auto">
      <thead class="">
        <tr class="text-left text-primary-mutated uppercase bg-dark-mutated">
          <th class="px-6 py-5 rounded-tl-xl">ID</th>
          <th class="px-6 py-5">Product</th>
          <th class="px-6 py-5">Category</th>
          <th class="px-6 py-5">Quantity</th>
          <th class="px-6 py-5">Status</th>
          <th class="px-6 py-5">Location</th>
          <th class="rounded-tr-xl"></th>
        </tr>
      </thead>
      <tbody class="bg-dark-light">
        @for (item of inventoryItems(); track item.id) {
          <tr class="text-left text-primary-mutated border-b border-dark-medium last:border-0">
            <td class="p-6">
              {{ item.id }}
            </td>
            <td class="p-6 font-bold text-primary">
              {{ item.product.name }}
            </td>
            <td class="p-6">
              <div class="px-3 py-0.5 bg-dark-regular rounded-full text-center inline-block">
                {{ item.product.category.name }}
              </div>
            </td>
            <td class="p-6 font-bold text-primary">
              {{ item.quantity }}
            </td>
            <td class="p-6">
              <div [class]="statusPill(item.status)">{{ item.status }}</div>
            </td>

            <td class="p-6">
              <div class="flex items-center gap-x-2">
                <svg lucideMapPin class="h-5 w-5 text-primary"></svg>
                <p>
                  {{ item.location.city }}, {{ item.location.state }} {{ item.location.zipCode }}
                </p>
              </div>
            </td>
            <td class="p-6">
              <table-actions-btn></table-actions-btn>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  imports: [TableActionsBtn, LucideMapPin],
})
export class InventoryTable {
  inventoryItems = input<InventoryItem[]>();

  statusPill(status: string): string {
    let cssClass = 'px-3 py-0.5 rounded-full text-center inline-block';
    switch (status) {
      case 'High':
        cssClass += ' bg-pill-green text-pill-green-mutated';
        break;
      case 'Medium':
        cssClass += ' bg-pill-amber text-pill-amber-mutated';
        break;
      case 'Low':
        cssClass += ' bg-pill-red text-pill-red-mutated';
        break;
      default:
        cssClass += ' bg-pill-red text-pill-red-mutated';
    }

    return cssClass;
  }
}
