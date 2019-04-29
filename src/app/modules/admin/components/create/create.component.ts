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
export class CreateComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() updateMovie: Movie;
  @Output() resetMovie = new EventEmitter();

  formSubmitAttempt = false;
  movieForm: FormGroup;
  movieFormBuilder: MovieFormBuilder;

  languages = StaticData.languages;
  artisticsMovements = StaticData.artMovement;
  countries = StaticData.countries;
  genres = StaticData.genres;
  errorMessage = "You must enter a value";
  fieldsChip = { 'name': [], 'director': [] };

  constructor(private formbuilder: FormBuilder, private crudService: CrudService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formSubmitAttempt = false;
    this.movieFormBuilder = new MovieFormBuilder(this.formbuilder);
    if (this.updateMovie) {
      this.movieForm = this.movieFormBuilder.setMovie(this.updateMovie).build();
    } else {
      this.movieForm = this.movieFormBuilder.build();
    }
  }

  ngAfterViewInit() {
    if (this.updateMovie) {
      Object.keys(this.fieldsChip).forEach(
        key => {
          this.addValue(key, this.updateMovie[key])
        }
      )
    }
  }

  ngOnDestroy() {
    if (this.updateMovie) {
      this.resetMovie.emit();
    }
  }

  onSubmit(formDirective) {
    this.formSubmitAttempt = true;
    if (this.movieForm.valid && !this.updateMovie) {
      const movieData = this.movieFormBuilder.movieInfoGroup.value;
      this.crudService.createMovie(movieData, this.movieForm.controls.poster.value)
        .pipe(first())
        .subscribe(
          (isCreated) => {
            if (isCreated) {
              this.resetForm(formDirective);
              this.openSnackBar('Movie created');
            } else {
              this.openSnackBar('Error Creating movie');
            }
          }
        );
    }
    else if (this.movieFormBuilder.movieInfoGroup.valid && this.updateMovie) {
      const movieData = this.movieFormBuilder.movieInfoGroup.value;
      this.crudService.updateMovieData(this.updateMovie.id, movieData).subscribe(
        () => {
          this.openSnackBar("Movie updated");
          this.resetMovie.emit();
          this.resetForm(formDirective);
        },
        error => this.openSnackBar('Error Updating movie')
      );
      if (this.movieForm.controls.poster.valid) {
        this.crudService.updatePoster(this.updateMovie.id, this.movieForm.controls.poster.value);
      }
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cerrar', {
      duration: 3000,
    });
  }

  resetForm(formDirective) {
    this.formSubmitAttempt = false;
    formDirective.resetForm();
    this.movieForm.reset();
    this.resetFieldsChip();
  }

  isFieldValid(field: string): Boolean {
    if (field == 'poster') {
      return (!this.movieForm.get(field).valid && this.movieForm.get(field).touched) ||
        (this.movieForm.get(field).untouched && this.formSubmitAttempt);
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

  resetFieldsChip() {
    Object.keys(this.fieldsChip).forEach(
      key => {
        this.fieldsChip[key] = [];
      }
    )
  }

}