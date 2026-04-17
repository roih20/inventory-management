import { Component, signal } from '@angular/core';
import { ActionPopover } from './action-popover';
import { LucideEllipsisVertical } from '@lucide/angular';
import { ClickOutsideDirective } from '@directives/clickOutside.directive';

@Component({
  selector: 'table-actions-btn',
  template: `
    <div class="relative" (clickOutside)="closePopover()">
      <button (click)="togglePopover()" class="cursor-pointer hover:bg-dark-light">
        <svg lucideEllipsisVertical class="h-5 w-5 text-primary"></svg>
      </button>
      @if (isOpen()) {
        <action-popover class="absolute z-10 top-full left-0 mt-1 w-32"></action-popover>
      }
    </div>
  `,
  imports: [ClickOutsideDirective, LucideEllipsisVertical, ActionPopover],
})
export class TableActionsBtn {
  isOpen = signal<boolean>(false);

  togglePopover() {
    this.isOpen.update((open) => !open);
  }

  closePopover() {
    this.isOpen.set(false);
  }
}
