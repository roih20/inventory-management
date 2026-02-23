import { Component, signal } from '@angular/core';
import { AuthForm } from '@features/authentication/auth-form';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex items-center justify-center h-screen">
      <div
        class="max-w-xl w-full border border-gray-300 rounded-md shadow-lg flex flex-col items-center p-6"
      >
        <h1 class="text-2xl mb-4">Login</h1>
        <auth-form></auth-form>
      </div>
    </div>
  `,
  styleUrl: './app.css',
  imports: [AuthForm],
})
export class App {
  protected readonly title = signal('web');
}
