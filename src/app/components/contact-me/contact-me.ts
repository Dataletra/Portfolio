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
      return Regex.test(control.value.trim()) ? null : { invalidEmail: { value: control.value } };
    };
  }
  formReset(FormControl: string) {
    const form = this.contactform.get(FormControl);
    form?.markAsUntouched();
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


}
