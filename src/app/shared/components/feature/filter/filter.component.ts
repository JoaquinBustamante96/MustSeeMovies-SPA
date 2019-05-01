import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StaticData } from '@app/shared';
import { Subject } from 'rxjs';
import { MatCheckbox } from '@angular/material';
import { Filter } from '@app/core/models';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output('OnMoviesSearch') filterValues = new EventEmitter<Filter>();

  filterForm: FormGroup;
  color = true;
  blackWhite = true;
  allYears = true;

  minRuntime = 0;
  maxRuntime = 600;

  countries = StaticData.countries;
  years = StaticData.years;
  artMovements = StaticData.artMovement;
  genres = StaticData.genres;
  languages = StaticData.languages
  reload$ = new Subject<any>();

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formbuilder.group({
      country: [""],
      artMovement: [""],
      language: [""],
      genre: [[""]],
      startYear: [""],
      endYear: [""],
      minRuntime: [""],
      maxRuntime: [""],
      color: [""],
      sound: [true]
    });
  }

  onSubmit(formDirective) {
    this.setColorControlValue();
    if (this.allYears) {
      this.filterForm.controls.startYear.setValue(this.years[0]);
      this.filterForm.controls.endYear.setValue(this.years[this.years.length - 1]);
    }
    else if (this.filterForm.controls.startYear.value > this.filterForm.controls.endYear.value) {
      const replace = this.filterForm.controls.startYear;
      this.filterForm.controls.startYear.setValue(this.filterForm.controls.endYear);
      this.filterForm.controls.endYear.setValue(replace);
    }
    let values = this.filterForm.value;
    if (StaticData.regions.includes(this.filterForm.controls.country.value)) {
      values.region = this.filterForm.controls.country.value;
      values.country = "";
    } else {
      values.region = "";
    }
    const filter: Filter = {
      artMovement: values.artMovement,
      country: values.country,
      region: values.region,
      language: values.language,
      genre: values.genre,
      color: values.color,
      sound: values.sound,
      minRuntime: values.minRuntime,
      maxRuntime: values.maxRuntime,
      startYear: values.startYear,
      endYear: values.endYear,
    }
    this.filterValues.emit(filter);
  }

  private setColorControlValue() {
    if (this.color && this.blackWhite || (!this.color && !this.blackWhite)) {
      this.filterForm.controls.color.setValue("");
    }
    else if (this.color && !this.blackWhite) {
      this.filterForm.controls.color.setValue(true);
    }
    else {
      this.filterForm.controls.color.setValue(false);
    }
  }

  setControl(controlName: string, control: FormControl) {
    this.filterForm.setControl(controlName, control);
  }

  OnyearscheckBoxSelected(checked: boolean) {
    this.allYears = checked;
  }

  OnColorCheckBoxChange(name: string) {
    if (name == 'color') {
      this.color = !this.color;
    } else {
      this.blackWhite = !this.blackWhite;
    }
  }

  setFromValues(country: string, artMovement: string,
    genre: string[], language: string, color: any, sound: boolean, minRuntime: number, maxRuntime: number,
    startYear: number, endYear: number) {

    this.filterForm.controls.language.setValue(language);
    this.filterForm.controls.artMovement.setValue(artMovement)
    this.filterForm.controls.country.setValue(country);
    this.filterForm.controls.genre.setValue(genre);
    this.filterForm.controls.color.setValue(color);
    this.filterForm.controls.sound.setValue(sound);
    this.filterForm.controls.minRuntime.setValue(minRuntime);
    this.filterForm.controls.maxRuntime.setValue(maxRuntime);
    this.filterForm.controls.startYear.setValue(startYear);
    this.filterForm.controls.endYear.setValue(endYear);

  }


  onReload() {
    this.reload$.next();
    this.color = true;
    this.blackWhite = true;
    this.setFromValues("", "", [""], "", "", true, this.minRuntime, this.maxRuntime,
      StaticData.years[0], StaticData.years[StaticData.years.length - 1]);
  }

  myGenresSelected: string[];
  selectionGenreChange() {
    if (this.filterForm.controls.genre.value.length <= 4) {
      this.myGenresSelected = this.filterForm.controls.genre.value;
    } else {
      this.filterForm.controls.genre.setValue(this.myGenresSelected);
    }
  }

}
