import { Component, output } from '@angular/core';
import { LucideSearch } from '@lucide/angular';
@Component({
  selector: 'search-input',
  template: `
    <div class="relative">
      <svg
        lucideSearch
        class="h-5 w-5 text-primary absolute pointer-events-none left-4 top-1/2 -translate-y-1/2"
      ></svg>
      <input
        type="text"
        minlength="1"
        maxlength="50"
        (keyup.enter)="search($event)"
        placeholder="Search"
        name="search"
        class="bg-dark-light w-full text-primary rounded-xl pl-12 pr-4 py-4 border border-dark-medium focus:outline-none focus:ring-0 placeholder:text-primary"
      />
    </div>
  `,
  imports: [LucideSearch],
  host: {
    class: 'w-full max-w-sm',
  },
})
export class SearchInput {
  onInputSearch = output<string | null>();

  search(e: Event) {
    const product = (e.target as HTMLInputElement).value;
    this.onInputSearch.emit(product);
  }
}
