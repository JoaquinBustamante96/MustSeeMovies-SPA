import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/core/services';
import { snackbar } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private snackbar: snackbar) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      param => {
        this.token = param.token;
      }
    )
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  resetPassword(form: FormGroup) {
    form.get('password')
    this.authService.resetForgottenPassword(form.get('password').value, this.token).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => this.snackbar.error()
    )
  }

}
