import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { FormInput } from '@components/ui/form-input';

@Component({
  selector: 'auth-form',
  template: `
    <form class="w-full p-2 flex flex-col gap-y-2.5" [formGroup]="authForm" (ngSubmit)="onSubmit()">
      <form-input
        [control]="authForm.controls.email"
        placeholder="john@company.com"
        label="Email"
        type="email"
      />

      <form-input
        [control]="authForm.controls.password"
        placeholder="********"
        label="Password"
        type="password"
      />
      <button
        type="submit"
        [disabled]="authForm.invalid"
        class="text-center p-2 rounded-lg bg-blue-500 w-full text-white cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Sign In
      </button>
    </form>
  `,
  host: {
    class: 'max-w-sm w-full',
  },
  imports: [ReactiveFormsModule, FormInput],
})
export class AuthForm {
  private formBuilder = inject(FormBuilder);
  authForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  });

  onSubmit() {
    console.log(this.authForm.value);
    this.authForm.reset();
  }
}
