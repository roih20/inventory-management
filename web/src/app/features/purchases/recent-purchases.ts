import { Component } from '@angular/core';

@Component({
  selector: 'recent-purchases',
  template: `
    <div
      class="bg-dark-regular border border-dark-light rounded-2xl p-0.5 shadow-lg shadow-dark-light "
    >
      <!-- Section header -->
      <div class="lg:px-8 px-4 py-4 flex flex-row items-center justify-between">
        <h3 class="text-xl font-bold text-primary">Recent Purchases</h3>
        <a class="text-primary"> See all </a>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full table-fixed lg:table-auto border-collapse bg-dark-bold rounded-3xl">
          <thead>
            <tr class="border-b border-dark-light">
              <th class="text-left text-primary px-4 lg:px-8 py-5">Product</th>
              <th class="text-left text-primary px-4 lg:px-8 py-5">Location</th>
              <th class="text-left text-primary px-4 lg:px-8 py-5">Status</th>
              <th class="text-left text-primary px-4 lg:px-8 py-5">Quantity</th>
              <th class="text-left text-primary px-4 lg:px-8 py-5">Date</th>
            </tr>
          </thead>
          <tbody>
            @for (purchase of purchases; track purchase.date) {
              <tr class="border-b border-dark-light last:border-b-0 text-sm lg:text-base">
                <td class="text-primary-mutated font-light px-4 lg:px-8 py-5">
                  {{ purchase.product }}
                </td>
                <td class="text-primary-mutated font-light px-4 lg:px-8 py-5">
                  {{ purchase.location }}
                </td>
                <td class="text-primary-mutated font-light px-4 lg:px-8 py-5">
                  {{ purchase.status }}
                </td>
                <td class="text-primary-mutated font-light px-4 lg:px-8 py-5">
                  {{ purchase.quantity }}
                </td>
                <td class="text-primary-mutated font-light px-4 lg:px-8 py-5">
                  {{ purchase.date }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class RecentPurchases {
  readonly purchases = [
    {
      product: 'Doritos Nacho Cheese - 9.25oz',
      location: '4111 Copper Ridge Drive, Springfield, IL 62704',
      status: 'Delivered',
      quantity: 10,
      date: 'May 1, 2025',
    },
    {
      product: 'Doritos Nacho Cheese - 9.25oz',
      location: '4111 Copper Ridge Drive, Springfield, IL 62704',
      status: 'Delivered',
      quantity: 10,
      date: 'May 1, 2025',
    },
    {
      product: 'Doritos Nacho Cheese - 9.25oz',
      location: '4111 Copper Ridge Drive, Springfield, IL 62704',
      status: 'Delivered',
      quantity: 10,
      date: 'May 1, 2025',
    },
    {
      product: 'Doritos Nacho Cheese - 9.25oz ',
      location: '4111 Copper Ridge Drive, Springfield, IL 62704',
      status: 'Delivered',
      quantity: 10,
      date: 'May 1, 2025',
    },
    {
      product: 'Doritos Nacho Cheese - 9.25oz ',
      location: '4111 Copper Ridge Drive, Springfield, IL 62704',
      status: 'Delivered',
      quantity: 10,
      date: 'May 1, 2025',
    },
  ];
}
