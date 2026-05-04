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
          <inventory-filter-btn (onFilterChecked)="onSelectedFilter($event)"></inventory-filter-btn>
          <inventory-sort-btn (onSortSelected)="onSortSelected($event)"></inventory-sort-btn>
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
          (fetchPreviousPage)="onPrevPage()"
          (fetchNextPage)="onNextPage()"
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
    InventorySortBtn,
    InventoryTable,
    TablePagination,
    OrderStockBtn,
    OrderStockModal,
  ],
})
export class Inventory implements OnInit {
  private inventoryService = inject(InventoryService);
  private readonly PAGE_SIZE = 10;
  inventoryItems = signal<InventoryItem[]>([]);
  isModalOpen = signal<boolean>(false);
  offset = signal<number>(0);
  paginationMetadata = signal<PaginationMetadata>({
    hasNextPage: false,
    hasPreviousPage: false,
    totalElements: 0,
    numberOfElements: 0,
    currentPage: 1,
    totalPages: 1,
  });

  ngOnInit(): void {
    this.getAllPaginated();
  }

  onProductSearch(product: string | null) {
    this.offset.set(0);
    if (product) {
      this.searchInventory(product);
    } else {
      this.getAllPaginated(0);
    }
  }

  onNextPage() {
    this.offset.update((value) => value + this.PAGE_SIZE);
    this.getAllPaginated(this.offset());
  }

  onPrevPage() {
    this.offset.update((value) => value - this.PAGE_SIZE);
    this.getAllPaginated(this.offset());
  }

  onSortSelected({ sort, order }: { sort: string; order: 'ASC' | 'DESC' }) {
    //this.getSortedInventory(sort, order);
  }

  onSelectedFilter(status: string) {
    this.getAllPaginated(0, status);
  }

  setModalOpen(isOpen: boolean) {
    this.isModalOpen.set(isOpen);
  }

  private getAllPaginated(offset?: number, status?: string) {
    this.inventoryService.getAllPaginated(offset, status).subscribe({
      next: (data) => this.setPaginationResult(data),
    });
  }

  private searchInventory(term: string) {
    this.inventoryService.searchInventory(term).subscribe({
      next: (data) => this.setPaginationResult(data),
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

  private getSortedInventory(sort: string, order: 'ASC' | 'DESC') {
    this.inventoryService.getSortedInventory(sort, order).subscribe({
      next: (data) => {
        this.inventoryItems.set(data);
      },
    });
  }
}
