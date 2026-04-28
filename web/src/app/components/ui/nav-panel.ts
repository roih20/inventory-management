import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideLogOut,
  LucideLayoutDashboard,
  LucideHeadset,
  LucideSettings,
  LucideBox,
  LucideVan,
  LucideClipboardCheck,
  LucideDynamicIcon,
  LucideClipboardList,
} from '@lucide/angular';
@Component({
  selector: 'nav-panel',
  template: `
    <nav class="text-primary h-full">
      <ul class="flex flex-col h-full">
        <li class="mb-8">
          <h1 class="text-primary-light font-medium text-lg hidden lg:block lg:text-2xl lg:px-4">
            INVENTORY07
          </h1>
        </li>
        @for (link of links; track $index) {
          <li class="mb-6 lg:mb-4">
            <a
              [routerLink]="link.href"
              class="bg-dark-light flex lg:gap-x-2 lg:items-center p-4 rounded-2xl lg:hover:bg-dark-light lg:hover:inset-shadow-2xs lg:hover:inset-shadow-dark-thin lg:hover:text-primary-light lg:bg-transparent lg:rounded-xl cursor-pointer"
            >
              <svg [lucideIcon]="link.icon" class="lg:h-5 lg:w-5"></svg>
              <span class="hidden lg:block">{{ link.title }}</span>
            </a>
          </li>
        }
        <li class="mt-auto">
          <button
            type="button"
            class="flex lg:gap-x-2 items-center p-4 bg-dark-light w-full lg:text-left cursor-pointer rounded-2xl inset-shadow-sm inset-shadow-dark-thin  text-primary-light lg:hover:inset-shadow-md"
            (click)="testButton()"
          >
            <svg lucideLogOut class="h-5 w-5 lg:h-6 lg:w-6"></svg>
            <span class="hidden lg:block">Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  `,
  host: {
    class: 'bg-dark-regular min-h-dvh rounded-xl px-4 py-8 lg:px-6 xl:w-xs',
  },
  imports: [LucideLogOut, LucideDynamicIcon, RouterLink],
})
export class NavPanel {
  readonly links = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LucideLayoutDashboard,
    },
    {
      title: 'Inventory',
      href: '/dashboard/inventory',
      icon: LucideBox,
    },
    {
      title: 'Products',
      href: '/dashboard/products',
      icon: LucideClipboardList,
    },
    {
      title: 'Sales',
      href: '#sales',
      icon: LucideClipboardCheck,
    },
    {
      title: 'Orders',
      href: '#orders',
      icon: LucideVan,
    },
    {
      title: 'Settings',
      href: '#settings',
      icon: LucideSettings,
    },
    {
      title: 'Help Center',
      href: '#help',
      icon: LucideHeadset,
    },
  ];
  testButton() {
    console.log('Test button clicked');
  }
}
