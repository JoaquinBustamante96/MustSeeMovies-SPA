import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/core/services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit, OnDestroy {

  optionSelected: string;
  showAuth: boolean;
  hasSignIn: boolean;
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

  openAuth(component: string) {
    this.optionSelected = component;
    this.showAuth = true;
  }

  closeAuth() {
    this.showAuth = false;
    this.optionSelected = null;
  }

  logout() {
    this.authenticationService.logout();
  }

}
