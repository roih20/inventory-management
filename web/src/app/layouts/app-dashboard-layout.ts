import { Component } from '@angular/core';
import { NavPanel } from '@components/ui/nav-panel';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  template: `<div class="flex bg-dark-regular">
    <nav-panel></nav-panel>
    <div
      class="bg-dark-bold w-full rounded-xl px-8 py-6 lg:px-12 lg:py-6 overflow-y-auto lg:overflow-hidden"
    >
      <router-outlet></router-outlet>
    </div>
  </div>`,
  imports: [NavPanel, RouterOutlet],
})
export class DashboardLayout {}
