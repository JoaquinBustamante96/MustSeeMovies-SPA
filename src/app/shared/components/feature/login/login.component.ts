import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<FormGroup>();
  @Input() captcha: boolean;
  loginForm: FormGroup;
  formSubmitAttempt = false;
  errorMessage = "You must enter a value";
  showPassword = false;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      captcha: [null, Validators.required]
    });
  }

  onSubmit(form: FormGroupDirective) {
    this.formSubmitAttempt = true;
    if (this.captcha) {
      if (this.loginForm.valid) {
        this.login.emit(this.loginForm);
        this.formSubmitAttempt = false;
      }
    } else {
      if (this.loginForm.controls.password.valid && this.loginForm.controls.user.valid) {
        this.login.emit(this.loginForm);
        this.formSubmitAttempt = false;
      }
    }
  }

  isFieldValid(field: string): Boolean {
    return (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt);
  }

  showHidePassword(visibility: boolean) {
    this.showPassword = visibility;
  }

}
