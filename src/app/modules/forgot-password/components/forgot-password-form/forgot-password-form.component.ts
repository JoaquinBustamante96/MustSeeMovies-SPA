import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { checkPasswordsValidator } from '@app/shared/validators/checkPasswordsValidator.directive';
import { ErrorStateMatcher } from '@angular/material';

export class ErrorPasswordsNotEqualsStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control.touched && control.parent.hasError('notSame'));
  }
}


@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {

  @Output() resetForm = new EventEmitter<FormGroup>();
  resetPasswordForm: FormGroup;
  showPassword = false;
  formSubmitAttempt: boolean
  matcher = new ErrorPasswordsNotEqualsStateMatcher();

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.resetPasswordForm = this.formbuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: checkPasswordsValidator });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.resetPasswordForm.valid) {
      this.resetForm.emit(this.resetPasswordForm);
    }
  }


  isFieldValid(field: string): Boolean {
    return (!this.resetPasswordForm.get(field).valid && this.resetPasswordForm.get(field).touched) ||
      (this.resetPasswordForm.get(field).untouched && this.formSubmitAttempt) ||
      (this.resetPasswordForm.get(field).touched && this.resetPasswordForm.hasError('notSame'));
  }

  showHidePassword(visibility: boolean) {
    this.showPassword = visibility;
  }

  getErrorMessage(field: string) {
    if (field == 'confirmPassword' && this.resetPasswordForm.hasError('notSame')) {
      return "Passwords does not match";
    }
    return "You must enter a value";
  }

}
