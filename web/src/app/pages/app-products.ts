import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '@services/product.service';
import { Product } from '@interfaces/product.interface';
import { ProductsTable } from '@components/products/products-table';
import { SearchInput } from '@components/ui/search-input';

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
      </div>
    </div>
  `,
  imports: [ProductsTable, SearchInput],
})
export class Products implements OnInit {
  productService = inject(ProductService);
  products = signal<Product[]>([]);

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

  private getProducts(): void {
    this.productService.getAllPaginated().subscribe({
      next: (data) => {
        console.log(data);
        this.products.set(data.data);
      },
    });
  }

  private getSearchedProducts(product: string) {
    this.productService.getSearchedProducts(product).subscribe({
      next: (data) => {
        console.log(data);
        this.products.set(data.data);
      },
    });
  }
}
