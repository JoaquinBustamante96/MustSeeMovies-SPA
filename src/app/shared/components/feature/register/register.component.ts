import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { checkPasswordsValidator } from '@app/shared/validators/checkPasswordsValidator.directive';
import { ErrorStateMatcher } from '@angular/material';

export class ErrorPasswordsNotEqualsStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control.touched && control.parent.hasError('notSame'));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output('registerForm') register = new EventEmitter<FormGroup>();
  @Input() captcha: boolean;
  registerForm: FormGroup;
  passwords: FormGroup;
  formSubmitAttempt = false;
  passwordsEquals = true;
  showPassword = false;
  matcher = new ErrorPasswordsNotEqualsStateMatcher();

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.passwords = this.formbuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: checkPasswordsValidator }
    )

    this.registerForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      captcha: [null, Validators.required]
    });

    this.registerForm.setControl('passwords', this.passwords);
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.passwords.hasError('notSame')) {
      this.passwordsEquals = false;
    }

    if (this.captcha) {
      if (this.registerForm.valid) {
        this.formSubmitAttempt = false;
        this.register.emit(this.registerForm);
      }
    } else {
      if (this.registerForm.controls.email.valid && this.passwords.valid) {
        this.formSubmitAttempt = false;
        this.register.emit(this.registerForm);
      }
    }
  }

  private getControl(field: string): AbstractControl {
    if (field == 'email') {
      return this.registerForm.get(field);
    }
    return this.passwords.get(field);
  }

  isFieldValid(field: string): Boolean {
    return (!this.getControl(field).valid && this.getControl(field).touched) ||
      (this.getControl(field).untouched && this.formSubmitAttempt) || 
      (this.getControl(field).touched && this.passwords.hasError('notSame'));
  }

  showHidePassword(visibility: boolean) {
    this.showPassword = visibility;
  }
  getErrorMessage(field: string) {
    if (field == 'email' && this.getControl(field).hasError('email')) {
      return "Invalid email address"
    }
    if(field == 'confirmPassword' && this.passwords.hasError('notSame')){
      return "Passwords does not match";
    }
    return "You must enter a value";
  }

}
