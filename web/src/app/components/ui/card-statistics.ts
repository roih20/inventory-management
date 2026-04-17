import { Component, input } from '@angular/core';
import { LucideDynamicIcon, LucideIconInput } from '@lucide/angular';
@Component({
  selector: 'card-statistics',
  template: `
    <div
      class="bg-dark-regular border border-dark-light shadow-md shadow-dark-light p-4 rounded-3xl"
    >
      <div class="flex items-center gap-x-2 mb-5">
        <svg [lucideIcon]="icon()" class="text-primary-mutated"></svg>
        <h3 class="text-primary-mutated">{{ title() }}</h3>
      </div>
      <p class="text-primary-light font-light text-3xl">{{ value() }}</p>
    </div>
  `,
  imports: [LucideDynamicIcon],
})
export class CardStatistics {
  readonly title = input.required<string>();
  readonly value = input.required<string>();
  readonly icon = input.required<LucideIconInput>();
}
