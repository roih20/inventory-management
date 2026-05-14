import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '@services/product.service';
import { Product } from '@interfaces/product.interface';
import { ProductsTable } from '@components/products/products-table';
import { SearchInput } from '@components/ui/search-input';
import { PaginatedResult, PaginationMetadata } from '@interfaces/pagination.interface';
import { TablePagination } from '@components/ui/table-pagination';

@Component({
  selector: 'app-products',
  template: `
    <div class="bg-dark-regular px-8 py-6 border border-dark-light rounded-xl flex flex-col">
      <h2 class="text-primary text-3xl mb-2">Products</h2>
      <p class="text-primary-mutated">Manage your finished goods across your stores</p>
      <hr class="text-dark-medium my-4" />
      <div class="flex items-center justify-between mt-2 mb-8">
        <search-input (onInputSearch)="onProductSearch($event)"></search-input>
      </div>
      <div class="rounded-xl border border-dark-medium">
        <products-table [products]="products()"></products-table>
        <table-pagination
          [paginationMetadata]="paginationMetadata()"
          (changePage)="onPageChange($event)"
        >
        </table-pagination>
      </div>
    </div>
  `,
  imports: [ProductsTable, SearchInput, TablePagination],
})
export class Products implements OnInit {
  readonly PAGE_SIZE = 10;
  protected readonly productService = inject(ProductService);
  products = signal<Product[]>([]);
  currentOffset = signal<number>(0);
  paginationMetadata = signal<PaginationMetadata>({
    hasNextPage: false,
    hasPreviousPage: false,
    totalElements: 0,
    numberOfElements: 0,
    currentPage: 1,
    totalPages: 1,
  });

  constructor() {
    console.log(this.currentOffset());
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onProductSearch(product: string | null) {
    if (product) {
      this.getSearchedProducts(product);
    } else {
      this.getProducts();
    }
  }

  onPageChange(currentPage: number) {
    this.currentOffset.set((currentPage - 1) * 10);
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.fetchProducts(this.currentOffset()).subscribe({
      next: (result) => {
        this.setPaginationResult(result);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  private getSearchedProducts(product: string) {
    this.productService.searchProduct(product, this.currentOffset()).subscribe({
      next: (result) => {
        this.setPaginationResult(result);
      },
      error: (response) => console.error(response),
    });
  }

  private setPaginationResult(result: PaginatedResult<Product>) {
    const {
      data,
      hasNextPage,
      hasPreviousPage,
      totalElements,
      totalPages,
      numberOfElements,
      currentPage,
    } = result;
    this.paginationMetadata.set({
      hasNextPage,
      hasPreviousPage,
      totalElements,
      totalPages,
      numberOfElements,
      currentPage,
    });
    this.products.set(data);
  }
}
