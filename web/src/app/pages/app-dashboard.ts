import { Component } from '@angular/core';
import { NavPanel } from '@components/ui/nav-panel';
import { CardStatistics } from '@components/ui/card-statistics';
import { LucideDollarSign, LucideCalendar, LucideBox, LucideVan } from '@lucide/angular';
import { LineChart } from '@features/charts/line-chart';
import { BarChart } from '@features/charts/bar-chart';
import { RecentPurchases } from '@features/purchases/recent-purchases';
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="bg-dark-regular max-h-dvh min-h-dvh flex">
      <!-- Navigation panel -->
      <nav-panel class=""></nav-panel>
      <!-- Dashboard content -->
      <div
        class="bg-dark-bold w-full rounded-xl px-8 py-6 lg:px-12 lg:py-6 flex flex-col gap-y-8 overflow-y-auto lg:overflow-hidden"
      >
        <div class="flex items-center gap-x-8 gap-y-4 flex-wrap">
          @for (item of cardStatistics; track item.title) {
            <card-statistics
              class="grow"
              [icon]="item.icon"
              [title]="item.title"
              [value]="item.value"
            ></card-statistics>
          }
        </div>
        <!-- Charts and other dashboard content -->
        <div class="flex flex-row gap-8 flex-wrap xl:flex-nowrap">
          <line-chart class="grow xl:flex-1"></line-chart>
          <bar-chart class="grow xl:flex-1"></bar-chart>
        </div>
        <!-- Recent purchases table -->
        <recent-purchases></recent-purchases>
      </div>
    </div>
  `,
  imports: [NavPanel, CardStatistics, LineChart, BarChart, RecentPurchases],
})
export class AppDashboard {
  readonly cardStatistics = [
    {
      icon: LucideDollarSign,
      title: 'Total Earnings',
      value: '$24,000.78',
    },
    {
      icon: LucideCalendar,
      title: 'Monthly Revenue',
      value: '$15,000.00',
    },
    {
      icon: LucideBox,
      title: 'Low Stock Items',
      value: '120',
    },
    {
      icon: LucideVan,
      title: 'Pending Deliveries',
      value: '250',
    },
  ];
}
