import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/core/services';
import { Router } from '@angular/router';
import { UrisModules } from '@app/core/routed-modules-uris';
import { Token } from '@app/core/models/token.mode';
import { snackbar } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {

  loginForm: FormGroup;
  validationFail = false;
  loading = false;
  formSubmitAttempt = false;
  errorMessage = "You must enter a value";

  constructor(
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: snackbar
  ) { }

  ngOnInit() {
    if (this.authenticationService.getAccessToken()) {
      this.router.navigate([UrisModules.admin]);
    }

    this.loginForm = this.formbuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get loginFormControls() { return this.loginForm.controls; }

  onSubmit() {
    this.formSubmitAttempt = true;

    if (this.loginForm.valid) {
      this.loading = true;
      this.authenticationService.login(this.loginFormControls.user.value, this.loginFormControls.password.value)
        .subscribe(
          (token: Token) => {
            if (token.roles.includes('ADMIN')) {
              this.router.navigate([UrisModules.admin]);
            } else {
              this.loading = false;
              this.validationFail = true;
            }
          },
          error => {
            if (error.status == 401) {
              this.validationFail = true;
            } else {
              this.snackBarService.errorConnectingWithServer();
            }
            this.loading = false;
          });
    }
  }

  isFieldValid(field: string): Boolean {
    return (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt);
  }

}
