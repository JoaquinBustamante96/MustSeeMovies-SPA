import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng5SliderModule } from 'ng5-slider';

import { SafePipe, TruncateTextPipe, SplitArrayPipe } from './pipes/index';

import { AutosizeModule } from "ngx-autosize";

import { ShareButtonsModule } from '@ngx-share/buttons';

import {
  SearchBoxSuggestionsComponent,
  ProgressSpinnerComponent,
  IntersectionObserverListComponent,
  MatFormFieldOptionsComponent,
  SharedButtonsComponent,
  IntersectionObserverComponent,
  ShareMovieButtonsComponent,
  SearchBoxComponent,
  ToolbarComponent,
  FilterComponent,
  SelectRuntimeComponent,
  SelectYearsComponent,
  ImageMovieComponent,
  LoginComponent,
  RegisterComponent,
  LoginRegisterComponent,
  ForgotPasswordComponent
} from './components/index';

import { ShowWithinDirective, OnloadDirective } from './directives/index';
import { hideWithDelayDirective } from './directives/hide-with-delay.directive';
import { AddListComponent } from './components/feature/add-list/add-list.component';
import { ShowHidePasswordIconComponent } from './components/ui/show-hide-password-icon/show-hide-password-icon.component';
import { PasswrodVisibilityDirective } from './directives/passwrod-visibility.directive';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { SigninDialogComponent } from './components/feature/signin-dialog/signin-dialog.component';
import { AuthComponent } from './components/feature/auth/auth.component';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LcQf6UUAAAAAD0zbt8Mf7hpwgcWnz0K8dg7p49i', theme: 'dark' } as RecaptchaSettings,
    },
  ],
  declarations: [
    MatFormFieldOptionsComponent,
    TruncateTextPipe,
    OnloadDirective,
    SafePipe,
    SearchBoxSuggestionsComponent,
    ProgressSpinnerComponent,
    IntersectionObserverListComponent,
    ShowWithinDirective,
    IntersectionObserverComponent,
    hideWithDelayDirective,
    SharedButtonsComponent,
    ShareMovieButtonsComponent,
    SearchBoxComponent,
    ToolbarComponent,
    FilterComponent,
    SelectRuntimeComponent,
    SelectYearsComponent,
    ImageMovieComponent,
    SplitArrayPipe,
    AddListComponent,
    ShowHidePasswordIconComponent,
    PasswrodVisibilityDirective,
    SigninDialogComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    ForgotPasswordComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    Ng5SliderModule,
    MatDialogModule,
    ShareButtonsModule,
    AutosizeModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  exports: [
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    Ng5SliderModule,
    MatFormFieldOptionsComponent,
    TruncateTextPipe,
    CommonModule,
    OnloadDirective,
    SafePipe,
    SearchBoxSuggestionsComponent,
    ProgressSpinnerComponent,
    IntersectionObserverListComponent,
    ShowWithinDirective,
    IntersectionObserverComponent,
    hideWithDelayDirective,
    MatDialogModule,
    ShareButtonsModule,
    SharedButtonsComponent,
    ShareMovieButtonsComponent,
    SearchBoxComponent,
    ToolbarComponent,
    FilterComponent,
    SelectRuntimeComponent,
    SelectYearsComponent,
    ImageMovieComponent,
    SplitArrayPipe,
    AutosizeModule,
    AddListComponent,
    ShowHidePasswordIconComponent,
    PasswrodVisibilityDirective,
    RecaptchaModule,
    RecaptchaFormsModule,
    SigninDialogComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    ForgotPasswordComponent,
  ],
})
export class SharedModule { }
