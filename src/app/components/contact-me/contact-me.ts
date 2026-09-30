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
      validators: [
        Validators.required,
        Validators.minLength(4),
        this.noSurroundingWhitespaceValidator(),
        this.containsOnlyWhitespaceValidator(),
        this.nameValidCharactersValidator()
      ]
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        this.emailEndsWithLettersValidator(),
        this.noSurroundingWhitespaceValidator()
      ]
    }),
    message: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        this.containsOnlyWhitespaceValidator(),
        this.minWordsValidator(3)
      ]
    }),
  });

  emailEndsWithLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const Regex = /\.[a-z]{2,}$/;
      return Regex.test(control.value.trim()) ? null : { "ending": { value: control.value } };
    };
  }

  containsOnlyWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const isOnlyWhitespace = /^\s+$/.test(value);
      return isOnlyWhitespace ? { "whitespace": { value: control.value } } : null;
    };
  }

  minWordsValidator(minWords: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value?.trim();
      if (!val) return null;
      const wordCount = val.split(/\s+/).filter((word: string) => word.length > 0).length;
      return wordCount >= minWords ? null : { minWords: { required: minWords, actual: wordCount } };
    };
  }

  noSurroundingWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const hasSurroundingWhitespace = /^\s+|\s+$/.test(value);
      return hasSurroundingWhitespace ? { surroundingWhitespace: true } : null;
    };
  }

  nameValidCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value?.trim();
      if (!val) return null;
      const isValid = /^[\p{L}\s'-]+$/u.test(val);
      return isValid ? null : { invalidCharacters: true };
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

  //error getters
  get nameError(): string | null {
    const errors = this.name?.errors;
    if (!errors) return null;

    if (errors['required']) return "Name is required.";
    if (errors['whitespace']) return "Name cannot be only whitespaces.";
    if (errors['minlength']) return "Name is too short.";
    if (errors['invalidCharacters']) return "Name contains invalid characters.";
    if (errors['surroundingWhitespace']) return "Name cannot start or end with spaces.";

    return null;
  }

  get emailError(): string | null {
    const errors = this.email?.errors;
    if (!errors) return null;

    if (errors['required']) return "Email is required.";
    if (errors['surroundingWhitespace']) return "Email cannot start or end with spaces.";
    if (errors['email']) return "Email is not complete.";
    if (errors['ending']) return "Email has invalid domain extension.";

    return null;
  }

  get messageError(): string | null {
    const errors = this.message?.errors;
    if (!errors) return null;

    if (errors['required']) return "Message is required.";
    if (errors['whitespace']) return "Message cannot be only whitespaces.";
    if (errors['minlength']) return "Message is too short.";
    if (errors['minWords']) return `Please write at least ${errors['minWords'].required} words.`;
    if (errors['surroundingWhitespace']) return "Message cannot start or end with spaces.";

    return null;
  }

  resetTouchedOnInput(controlName: string) {
    const control = this.contactform.get(controlName);
    if (control && control.touched) {
      control.markAsUntouched();
    }
  }
}
