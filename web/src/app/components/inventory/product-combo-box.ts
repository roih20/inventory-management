import { Component, input, signal } from '@angular/core';
import { ClickOutsideDirective } from '@directives/clickOutside.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'product-combo-box',
  template: `
    <div class="flex flex-col justify-start gap-y-2 relative" (clickOutside)="closeComboList()">
      <label for="productInput" class="font-light">Select a product</label>
      <input
        type="text"
        id="productInput"
        [formControl]="control()"
        (input)="searchProduct($event)"
        (focus)="openComboList()"
        role="combobox"
        class="p-3 bg-transparent border border-dark-thin rounded-2xl w-full focus:outline-none focus:ring-0"
      />

      @if (isComboListOpen()) {
        <div
          class="border border-dark-thin bg-dark-light rounded-2xl p-2 text-primary overflow-y-auto h-40 absolute top-22 left-0 z-20 w-full scrollbar-hidden"
        >
          <ul class="flex flex-col gap-y-2" role="listbox">
            @for (product of filteredList(); track product) {
              <li
                role="option"
                class="p-2 cursor-pointer rounded-xl hover:bg-dark-medium"
                (click)="selectProduct(product)"
              >
                {{ product }}
              </li>
            } @empty {
              <li class="p-2">Nothing found...</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  imports: [ClickOutsideDirective, ReactiveFormsModule],
})
export class ProductComboBox {
  productList: string[] = [
    'Bananas',
    'Strawberries',
    'Apple',
    'Bread',
    'Lemons',
    'Water',
    'Oil',
    'Salt',
    'Avocado',
    'Rice',
    'Orange',
    'Pineapple',
    'Watermelon',
    'Ground Beef',
    'Chicken Breast',
    'Salmon',
    'Tomatoes',
    'Milk',
    'Butter',
    'Eggs',
  ];
  control = input.required<FormControl>();
  filteredList = signal<string[]>(this.productList);
  isComboListOpen = signal<boolean>(false);

  openComboList() {
    this.isComboListOpen.set(true);
  }

  closeComboList() {
    this.isComboListOpen.set(false);
    console.log('closing combo list');
  }

  selectProduct(product: string) {
    this.control().setValue(product);
  }

  searchProduct(e: Event) {
    const value = (e.target as HTMLInputElement).value.toLowerCase();
    this.filteredList.set(this.productList.filter((p) => p.toLowerCase().includes(value)));
  }
}
