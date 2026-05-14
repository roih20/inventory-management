import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { SearchInput } from '@components/ui/search-input';
import { InventoryFilterBtn } from '@components/inventory/invetory-filter-btn';
import { InventorySortBtn } from '@components/inventory/inventory-sort-btn';
import { InventoryTable } from '@components/inventory/inventory-table';
import { TablePagination } from '@components/ui/table-pagination';
import { OrderStockBtn } from '@components/inventory/order-stock-btn';
import { InventoryItem } from '@interfaces/intentoryItem.interface';
import { OrderStockModal } from '@components/inventory/order-stock-modal';
import { InventoryService } from '@services/inventory.service';
import { PaginatedResult, PaginationMetadata } from '@interfaces/pagination.interface';

@Component({
  selector: 'app-inventory',
  template: `
    <div class="bg-dark-regular px-8 py-6 border border-dark-light rounded-xl flex flex-col">
      <h2 class="text-primary text-3xl mb-2">Inventory</h2>
      <p class="text-primary-mutated">Manage and track stock in real-time.</p>
      <hr class="text-dark-medium my-4" />
      <!-- Inventory table -->
      <div class="flex items-center justify-between mt-2 mb-8">
        <div class="flex items-center justify-start gap-x-4 flex-1">
          <search-input (onInputSearch)="onProductSearch($event)"></search-input>
          <inventory-filter-btn (onFilterChecked)="onSelectFilter($event)"></inventory-filter-btn>
        </div>
        <order-stock-btn (openModal)="setModalOpen($event)"></order-stock-btn>
      </div>
      <div class="rounded-xl border border-dark-medium">
        @if (isModalOpen()) {
          <order-stock-modal (closeModal)="setModalOpen($event)"></order-stock-modal>
        }
        <inventory-table [inventoryItems]="inventoryItems()"></inventory-table>
        <table-pagination
          [paginationMetadata]="paginationMetadata()"
          (changePage)="onPageChange($event)"
        ></table-pagination>
      </div>
    </div>
  `,
  host: {
    class: '',
  },
  imports: [
    SearchInput,
    InventoryFilterBtn,
    InventoryTable,
    TablePagination,
    OrderStockBtn,
    OrderStockModal,
  ],
})
export class Inventory implements OnInit {
  private inventoryService = inject(InventoryService);
  inventoryItems = signal<InventoryItem[]>([]);
  isModalOpen = signal<boolean>(false);
  currentOffset = signal<number>(0);
  filterStatus = signal<string>('');
  paginationMetadata = signal<PaginationMetadata>({
    hasNextPage: false,
    hasPreviousPage: false,
    totalElements: 0,
    numberOfElements: 0,
    currentPage: 1,
    totalPages: 1,
  });

  constructor() {
    console.log(this.filterStatus());
  }

  ngOnInit(): void {
    this.getInventory();
  }

  onProductSearch(product: string | null) {
    if (product) {
      this.searchInventory(product);
    } else {
      this.getInventory();
    }
  }

  onSelectFilter(status: string) {
    this.filterStatus.set(status);
    this.getInventory();
  }

  onPageChange(currentPage: number) {
    this.currentOffset.set((currentPage - 1) * 10);
    this.getInventory();
  }

  setModalOpen(isOpen: boolean) {
    this.isModalOpen.set(isOpen);
  }

  private getInventory() {
    this.inventoryService.fetchInventory(this.currentOffset(), this.filterStatus()).subscribe({
      next: (result) => this.setPaginationResult(result),
      error: (response) => console.error(response),
    });
  }

  private searchInventory(term: string) {
    this.inventoryService.searchInventory(term).subscribe({
      next: (data) => this.setPaginationResult(data),
      error: (response) => console.error(response),
    });
  }

  private setPaginationResult(result: PaginatedResult<InventoryItem>) {
    const {
      data,
      hasNextPage,
      hasPreviousPage,
      totalElements,
      currentPage,
      numberOfElements,
      totalPages,
    } = result;
    this.inventoryItems.set(data);
    this.paginationMetadata.set({
      hasNextPage,
      hasPreviousPage,
      totalElements,
      currentPage,
      numberOfElements,
      totalPages,
    });
  }
}
