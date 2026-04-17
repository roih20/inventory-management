import { Component, inject, OnInit, signal } from '@angular/core';
import { NavPanel } from '@components/ui/nav-panel';
import { InventorySearchInput } from '@components/inventory/inventory-search-input';
import { InventoryFilterBtn } from '@components/inventory/invetory-filter-btn';
import { InventorySortBtn } from '@components/inventory/inventory-sort-btn';
import { InventoryTable } from '@features/tables/inventory-table';
import { TablePagination } from '@components/ui/table-pagination';
import { OrderStockBtn } from '@components/inventory/order-stock-btn';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { OrderStockModal } from '@components/inventory/order-stock-modal';
import { InventoryService } from '@services/inventory.service';
@Component({
  selector: 'app-inventory',
  template: `
    <div class="bg-dark-regular max-h-dvh min-h-dvh flex">
      <!-- Navigation panel -->
      <nav-panel></nav-panel>
      <!-- Inventory content -->
      <div
        class="bg-dark-bold w-full rounded-xl px-8 py-6 lg:px-12 lg:py-6 flex flex-col gap-y-8 overflow-y-auto lg:overflow-hidden"
      >
        <h1 class="text-primary text-4xl py-4">Inventory</h1>
        <!-- Inventory table -->
        <div class="p-4 ">
          <div class="flex items-center justify-between mb-12">
            <div class="flex items-center justify-start gap-x-4 flex-1">
              <inventory-search-input
                (onInputSearch)="onProductSearch($event)"
              ></inventory-search-input>
              <inventory-filter-btn
                (onFilterChecked)="onSelectedFilter($event)"
              ></inventory-filter-btn>
              <inventory-sort-btn></inventory-sort-btn>
            </div>
            <order-stock-btn (openModal)="openModal($event)"></order-stock-btn>
          </div>
          @if (isModalOpen()) {
            <order-stock-modal (close)="closeModal($event)"></order-stock-modal>
          }
          <inventory-table [inventoryItems]="filteredItems()"></inventory-table>
          <table-pagination></table-pagination>
        </div>
      </div>
    </div>
  `,
  imports: [
    NavPanel,
    InventorySearchInput,
    InventoryFilterBtn,
    InventorySortBtn,
    InventoryTable,
    TablePagination,
    OrderStockBtn,
    OrderStockModal,
  ],
})
export class AppInventory implements OnInit {
  private inventoryService = inject(InventoryService);
  inventoryItems = signal<InventoryItem[]>([]);
  filteredItems = signal<InventoryItem[]>([]);
  isModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventoryItems.set(data);
        this.filteredItems.set(data);
      },
      error: (error) => console.log(error),
    });
  }

  onProductSearch(term: string) {
    this.filteredItems.set(
      this.inventoryItems().filter((item) =>
        item.productName.toLowerCase().includes(term.toLowerCase()),
      ),
    );
  }

  onSelectedFilter(filters: Set<string>) {
    console.log(filters);
  }

  openModal(isOpen: boolean) {
    this.isModalOpen.set(isOpen);
  }

  closeModal(isClose: boolean) {
    this.isModalOpen.set(isClose);
  }
}
