import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NavPanel } from '@components/ui/nav-panel';
import { InventorySearchInput } from '@components/inventory/inventory-search-input';
import { InventoryFilterBtn } from '@components/inventory/invetory-filter-btn';
import { InventorySortBtn } from '@components/inventory/inventory-sort-btn';
import { InventoryTable } from '@components/inventory/inventory-table';
import { TablePagination } from '@components/ui/table-pagination';
import { OrderStockBtn } from '@components/inventory/order-stock-btn';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { OrderStockModal } from '@components/inventory/order-stock-modal';
import { InventoryService } from '@services/inventory.service';

@Component({
  selector: 'app-inventory',
  template: `
    <div class="bg-dark-regular flex">
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
              <inventory-sort-btn (onSortSelected)="onSortSelected($event)"></inventory-sort-btn>
            </div>
            <order-stock-btn (openModal)="openModal($event)"></order-stock-btn>
          </div>
          @if (isModalOpen()) {
            <order-stock-modal (close)="closeModal($event)"></order-stock-modal>
          }
          <inventory-table [inventoryItems]="inventoryItems()"></inventory-table>
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
  isModalOpen = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    this.getAllPaginated();
  }

  onProductSearch(product: string | null) {
    if (product) {
      this.searchInventory(product);
    } else {
      this.getAllPaginated();
    }
  }

  onSortSelected({ sort, order }: { sort: string; order: 'ASC' | 'DESC' }) {
    //this.getSortedInventory(sort, order);
  }

  onSelectedFilter(status: string) {
    this.getAllPaginated(status);
  }

  openModal(isOpen: boolean) {
    this.isModalOpen.set(isOpen);
  }

  closeModal(isClose: boolean) {
    this.isModalOpen.set(isClose);
  }

  private getAllPaginated(status?: string) {
    this.inventoryService.getAllPaginated(status).subscribe({
      next: (data) => {
        console.log(data);
        this.inventoryItems.set(data.data);
      },
    });
  }

  private searchInventory(term: string) {
    this.inventoryService.searchInventory(term).subscribe({
      next: (data) => {
        this.inventoryItems.set(data);
      },
    });
  }

  private getSortedInventory(sort: string, order: 'ASC' | 'DESC') {
    this.inventoryService.getSortedInventory(sort, order).subscribe({
      next: (data) => {
        this.inventoryItems.set(data);
      },
    });
  }
}
