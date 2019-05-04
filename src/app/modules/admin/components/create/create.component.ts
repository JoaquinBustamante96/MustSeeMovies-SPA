import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CrudService } from '@app/modules/admin/crud.service';
import { Movie } from '@app/core/models';
import { StaticData } from '@app/core/models/static-data.model';
import { MovieFormBuilder } from '@app/modules/admin/components/create/MovieFormBuilder.model';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter();
  @Output() createMovie = new EventEmitter();

  formSubmitAttempt = false;
  movieForm: FormGroup;
  movieFormBuilder: MovieFormBuilder;

  languages = StaticData.languages;
  artisticsMovements = StaticData.artMovement;
  countries = StaticData.countries;
  genres = StaticData.genres;
  errorMessage = "You must enter a value";
  fieldsChip = { 'name': [], 'director': [] };

  constructor(private formbuilder: FormBuilder, private crudService: CrudService) { }

  ngOnInit() {
    this.formSubmitAttempt = false;
    this.movieFormBuilder = new MovieFormBuilder(this.formbuilder);
    if (this.movie) {
      this.movieForm = this.movieFormBuilder.setMovie(this.movie).build();
    } else {
      this.movieForm = this.movieFormBuilder.build();
    }
  }

  ngAfterViewInit() {
    if (this.movie) {
      Object.keys(this.fieldsChip).forEach(
        key => {
          this.addValue(key, this.movie[key])
        }
      )
    }
  }

  onSubmit(formDirective) {
    this.formSubmitAttempt = true;
    if (this.movieFormBuilder.movieInfoGroup.valid) {
      const data = { movie: this.movieFormBuilder.movieInfoGroup.value, poster: null }
      if (this.isPosterValid()) {
        data.poster = this.movieForm.controls.poster.value;
      }
      if (!this.movie && this.movieForm.controls.poster.valid) {
        this.createMovie.emit(data);
        this.resetForm(formDirective);
      }
      else if (this.movie) {
        this.updateMovie.emit(data)
        this.resetForm(formDirective);
      }
    }
  }

  isPosterValid(): boolean {
    if (!this.movie) {
      return this.movieForm.controls.poster.valid;
    }
    if (
      (this.movieForm.controls.poster.hasError('forbiddenSize'))
    ) { return false }
    return true;
  }

  resetForm(formDirective) {
    this.formSubmitAttempt = false;
    formDirective.resetForm();
    this.movieForm.reset();
    this.resetFieldsChip();
  }

  isFieldValid(field: string): Boolean {
    if (field == 'poster') {
      if (!this.movie) {
        return ((!this.movieForm.get(field).valid && this.movieForm.get(field).touched) ||
          (this.movieForm.get(field).untouched && this.formSubmitAttempt));
      }
      if (
        (this.movieForm.controls.poster.hasError('forbiddenSize'))
      ) { return true }
      return false;
    }
    return (!this.movieFormBuilder.movieInfoGroup.get(field).valid && this.movieFormBuilder.movieInfoGroup.get(field).touched) ||
      (this.movieFormBuilder.movieInfoGroup.get(field).untouched && this.formSubmitAttempt);
  }

  onFileChange(file) {
    this.movieForm.controls.poster.markAsTouched({ onlySelf: true });
    if (file) {
      this.movieForm.controls.poster.setValue(file);
    } else {
      this.movieForm.controls.poster.setValue("null");
    }
  }

  setControl(ctrlName: string, ctrl: FormControl) {
    this.movieFormBuilder.movieInfoGroup.setControl(ctrlName, ctrl);
  }

  addValue(fieldName: string, value: string[]) {
    const oldValues = this.fieldsChip[fieldName];
    const actualValues = [...oldValues, ...value];
    this.fieldsChip[fieldName] = actualValues;
    this.movieFormBuilder.movieInfoGroup.get(fieldName).setValue(actualValues);
  }

  removeValue(fieldName: string, index: number) {
    const values = this.fieldsChip[fieldName];
    values.splice(index, 1);
    this.fieldsChip[fieldName] = values;
    this.movieFormBuilder.movieInfoGroup.get(fieldName).setValue(values);
  }

  myGenresSelected: string[];
  selectionGenreChange() {
    if (this.movieFormBuilder.movieInfoGroup.controls.genre.value.length <= 4) {
      this.myGenresSelected = this.movieFormBuilder.movieInfoGroup.controls.genre.value;
    } else {
      this.movieFormBuilder.movieInfoGroup.controls.genre.setValue(this.myGenresSelected);
    }
  }

  resetFieldsChip() {
    Object.keys(this.fieldsChip).forEach(
      key => {
        this.fieldsChip[key] = [];
      }
    )
  }

}