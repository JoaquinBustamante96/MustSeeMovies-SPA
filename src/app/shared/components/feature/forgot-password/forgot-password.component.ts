import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Output('forgotForm') forgot = new EventEmitter<FormGroup>();
  @Input() captcha: boolean;

  forgotForm: FormGroup;
  formSubmitAttempt = false;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      captcha: [null, Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.captcha) {
      if (this.forgotForm.valid) {
        this.formSubmitAttempt = false;
        this.forgot.emit(this.forgotForm);
      }
    } else {
      if (this.forgotForm.get('email').valid) {
        this.formSubmitAttempt = false;
        this.forgot.emit(this.forgotForm);
      }
    }
  }

  isFieldValid(field: string): Boolean {
    return (!this.forgotForm.get(field).valid && this.forgotForm.get(field).touched) ||
      (this.forgotForm.get(field).untouched && this.formSubmitAttempt);
  }

  getErrorMessage(field: string) {
    if (field == 'email' && this.forgotForm.get(field).hasError('email')) {
      return "Invalid email address";
    }
    return "You must enter a value";
  }

}
