import { Component, output } from '@angular/core';
import { LucideSearch } from '@lucide/angular';
@Component({
  selector: 'inventory-search-input',
  template: `
    <div class="relative">
      <svg
        lucideSearch
        class="h-5 w-5 text-primary absolute pointer-events-none left-4 top-1/2 -translate-y-1/2"
      ></svg>
      <input
        type="text"
        (keyup.enter)="searchProduct($event)"
        placeholder="Search"
        name="search"
        class="bg-dark-light w-full text-primary rounded-2xl pl-12 pr-4 py-3 inset-shadow-md focus:outline-none  focus:ring-0 placeholder:text-primary-mutated"
      />
    </div>
  `,
  imports: [LucideSearch],
  host: {
    class: 'lg:w-1/3 xl:w-1/6',
  },
})
export class InventorySearchInput {
  onInputSearch = output<string>();

  searchProduct(e: Event) {
    const el = e.target as HTMLInputElement;
    this.onInputSearch.emit(el.value);
  }
}
