import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {

  contactform = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, this.emailEndsWithLettersValidator()]
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)]
    }),
  })

  emailEndsWithLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const Regex = /\.[a-z]{2,}$/;
      return Regex.test(control.value.trim()) ? null : { "ending": { value: control.value } };
    };
  }

  //helper getters
  get email() {
    return this.contactform.get("email")
  }

  get name() {
    return this.contactform.get("name")
  }

  get message() {
    return this.contactform.get("message")
  }

  //Email error output
  get emailError(): string | null {
    const errors = this.contactform.get('email')?.errors;
    if (!errors) return null;
    for (let a in errors) {
      if (a == 'email') {
        return "Email is not complete"
      }
      if (a == 'ending') {
        return "Email has Invalid ending (.de | .com | .org)"
      }
      return a;
    }
    return null;
  }

  resetTouchedOnInput(controlName: string) {
    const control = this.contactform.get(controlName);
    if (control && control.touched) {
      control.markAsUntouched();
    }
  }
}
