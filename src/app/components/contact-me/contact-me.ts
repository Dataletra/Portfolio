import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

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
      validators: [Validators.required, Validators.email]
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)]
    }),
  })
}
