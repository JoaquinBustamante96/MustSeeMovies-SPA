import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/core/services';
import { FormGroup } from '@angular/forms';

export enum Error {
  invalidEmail, loginFailed
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() optionSelected: string;
  hasSignIn: boolean;
  loading: boolean;
  error: boolean;
  errorType: Error;
  captcha = false;
  authSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authSubscription = this.authenticationService.getHasSignIn().subscribe(
      hasSignIn => {
        this.hasSignIn = hasSignIn;
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onForgotPassword(form: FormGroup) {
    this.loading = true;
    this.authenticationService.forgotPassword(form.controls.email.value).subscribe(
      () => {
        this.closeAuth();
        this.loading = false;
      },
      error => {
        if (error.status = 404) {
          this.loading = false;
          this.captcha = true;
          this.setError(Error.invalidEmail);
        }
      }
    );
  }

  onLogin(loginForm: FormGroup) {
    this.loading = true;
    this.authenticationService.logout();
    this.authenticationService.login(loginForm.controls.user.value, loginForm.controls.password.value)
      .subscribe(
        () => { this.closeAuth() }
        , error => {
          this.loading = false;
          this.setError(Error.loginFailed);
          this.captcha = true;
        }
      )
  }

  onRegister(registerForm: FormGroup) {
    this.loading = true;
    this.authenticationService.signUp(registerForm.controls.email.value, registerForm.controls.passwords.get('password').value)
      .subscribe(
        (response) => {
          this.authenticationService.login(registerForm.get('email').value, registerForm.get('passwords').get('password').value).subscribe(
            () => {
              this.loading = false
              this.closeAuth();
            }
          );
        },
        error => {
          this.loading = false;
        }
      )
  }

  openAuth(component: string) {
    this.optionSelected = component;
    this.error = false;
  }

  closeAuth(){
    this.close.emit();
  }

  setError(error: Error) {
    this.error = true;
    this.errorType = error;
  }

  get errorMessage() {
    switch (this.errorType) {
      case Error.invalidEmail:
        return "No account found";
      case Error.loginFailed:
        return "Incorrect User or Password";
    }
  }
}
