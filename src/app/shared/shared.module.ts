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
} from './components/index';

import { ShowWithinDirective, OnloadDirective } from './directives/index';
import { hideWithDelayDirective } from './directives/hide-with-delay.directive';

@NgModule({
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
    SplitArrayPipe
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
    SplitArrayPipe
  ],
})
export class SharedModule { }
