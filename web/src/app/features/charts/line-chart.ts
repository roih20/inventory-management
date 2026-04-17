import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LucideCalendar } from '@lucide/angular';

@Component({
  selector: 'line-chart',
  template: `
    <div
      class="rounded-2xl flex flex-col bg-dark-regular border border-dark-light p-0.5 shadow-lg shadow-dark-light"
    >
      <div class="flex flex-row items-center justify-between p-3.5">
        <h2 class="text-xl font-bold text-primary">Sales</h2>
        <div
          class="flex flex-row items-center gap-x-2 cursor-pointer bg-dark-light py-2 px-4 rounded-3xl inset-shadow-sm inset-shadow-dark-medium hover:inset-shadow-md"
        >
          <svg lucideCalendar class="text-primary-mutated h-5 w-5"></svg>
          <p class="text-primary-mutated">6 months</p>
        </div>
      </div>
      <div class="p-4 spacing-chart bg-dark-bold rounded-3xl">
        <canvas
          class="w-full! h-full!"
          baseChart
          [type]="lineChartType"
          [data]="lineChartData"
          [options]="lineChartOptions"
        ></canvas>
      </div>
    </div>
  `,
  imports: [BaseChartDirective, LucideCalendar],
})
export class LineChart {
  readonly lineChartType: ChartType = 'line';
  readonly lineChartData: ChartConfiguration['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 76, 80],
        fill: 'origin',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        pointHoverBackgroundColor: 'rgb(75, 192, 192)',
        borderWidth: 3,
        tension: 0.3,
      },
    ],
  };
  readonly lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
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
      y: {
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
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
}
