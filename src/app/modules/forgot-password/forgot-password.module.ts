import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ForgotPasswordComponent, ForgotPasswordFormComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
  ]
})
export class ForgotPasswordModule { }
