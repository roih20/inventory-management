import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LucideCalendar } from '@lucide/angular';

@Component({
  selector: 'bar-chart',
  template: `
    <div
      class="border border-dark-light bg-dark-regular rounded-2xl p-0.5 flex flex-col shadow-lg shadow-dark-light"
    >
      <div class="flex flex-row items-center justify-between p-3.5">
        <h2 class="text-xl text-primary font-bold">Most sold items</h2>
        <div
          class="flex flex-row items-center gap-x-2 cursor-pointer  bg-dark-light py-2 px-4 rounded-3xl inset-shadow-sm inset-shadow-dark-medium hover:inset-shadow-md"
        >
          <svg lucideCalendar class="text-primary-mutated h-5 w-5"></svg>
          <p class="text-primary-mutated">6 months</p>
        </div>
      </div>
      <div class="p-4 spacing-chart bg-dark-bold rounded-3xl">
        <canvas
          class="w-full! h-full!"
          baseChart
          [type]="barChartType"
          [data]="barChartData"
          [options]="barChartOptions"
        ></canvas>
      </div>
    </div>
  `,
  imports: [BaseChartDirective, LucideCalendar],
})
export class BarChart {
  readonly barChartType: ChartType = 'bar';

  readonly barChartData: ChartConfiguration['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 76, 80],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        borderRadius: 18,
      },
    ],
  };

  readonly barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          color: 'rgba(179, 179, 179, 0.8)',
          font: { size: 12, weight: 'bold', family: 'Roboto' },
        },
        grid: {
          color: 'rgba(179, 179, 179, 0.05)',
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: 'rgba(179, 179, 179, 0.8)',
          font: { size: 12, weight: 'bold', family: 'Roboto' },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
}
