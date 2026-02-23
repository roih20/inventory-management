import { Component, input, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-input',
  template: `
    <label class="flex flex-col">
      <span class="mb-2">{{ label() }}</span>
      <input
        [placeholder]="placeholder()"
        [type]="type()"
        [formControl]="control()"
        aria-invalid="{{ isInvalid }}"
        class="p-2 border rounded-lg focus:outline-none focus:ring placeholder:italic"
        [class]="
          isInvalid
            ? 'border-red-600 focus:ring-red-600 focus:border-red-600'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        "
      />
      @if (isInvalid) {
        <span class="italic text-sm mt-1.5 text-red-600">{{ fieldError }}</span>
      }
    </label>
  `,
  imports: [ReactiveFormsModule],
})
export class FormInput {
  control = input.required<FormControl>();
  placeholder = input.required<string>();
  type = input.required<string>();
  label = input.required<string>();

  get isInvalid(): boolean {
    return !!(this.control()?.invalid && (this.control()?.dirty || this.control()?.touched));
  }

  get fieldError(): string {
    const ctrl = this.control();
    if (!ctrl) return '';

    if (ctrl.hasError('required')) {
      return `${this.label()} is required.`;
    }

    if (ctrl.hasError('email')) {
      return 'Input must be an email address.';
    }

    if (ctrl.hasError('minlength')) {
      return `${this.label()} must be at least ${ctrl.getError('minlength').requiredLength} characters long.`;
    }

    if (ctrl.hasError('maxlength')) {
      return `${this.label()} cannot exceed ${ctrl.getError('maxlength').requiredLength} characters.`;
    }

    return '';
  }
}
