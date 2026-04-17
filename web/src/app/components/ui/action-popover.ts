import { Component } from '@angular/core';

@Component({
  selector: 'action-popover',
  template: `
    <div class="bg-dark-light rounded-2xl px-2 py-4 inset-shadow-md text-primary">
      <ul class="text-sm flex flex-col gap-y-2">
        <li class="cursor-pointer rounded-lg px-2 py-1 hover:bg-dark-medium">Edit</li>
        <li class="cursor-pointer rounded-lg px-2 py-1 hover:bg-dark-medium">Delete</li>
        <li class="cursor-pointer rounded-lg px-2 py-1 hover:bg-dark-medium">View Details</li>
      </ul>
    </div>
  `,
})
export class ActionPopover {}
