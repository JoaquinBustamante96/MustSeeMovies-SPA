import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StaticData } from '@app/shared';
import { Subject } from 'rxjs';
import { MatCheckbox } from '@angular/material';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output('OnMoviesSearch') filterValues = new EventEmitter();

  filterForm: FormGroup;
  labelPosition = 'before';
  color = true;
  blackWhite = true;
  allYears = true;

  minRuntime = 0;
  maxRuntime = 600;

  countries = StaticData.countries;
  years = StaticData.years;
  artMovement = StaticData.artMovement;
  genres = StaticData.genres;
  languages = StaticData.languages
  reload$ = new Subject<any>();

  classes = ['fitFilter', 'fitSubmit-button'];
  addClasses;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    if (window.innerHeight < 600) {
      this.addClasses = true;
    }
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
    });
  }

  onSubmit(formDirective) {
    this.setColorControlValue();
    if (this.allYears) {
      this.filterForm.controls.startYear.setValue(this.years[0]);
      this.filterForm.controls.endYear.setValue(this.years[this.years.length - 1]);
    }
    else if (this.filterForm.controls.startYear > this.filterForm.controls.endYear) {
      const replace = this.filterForm.controls.startYear;
      this.filterForm.controls.startYear.setValue(this.filterForm.controls.endYear);
      this.filterForm.controls.endYear.setValue(replace);
    }

    const values = this.filterForm.value
    const controls = ["country", "artMovement", "language"];
    controls.forEach(
      control => {
        if (values[control] == null) {
          values[control] = "";
        }
      }
    )
    console.log(values)
    this.filterValues.emit(values);
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

  selectYearAllChange(checked: boolean) {
    this.allYears = checked;
  }

  setFromValues(country: string, artMovement: string,
    genre: string[], language: string, color: any, minRuntime: number, maxRuntime: number,
    startYear: number, endYear: number) {

    this.filterForm.controls.language.setValue(language);
    this.filterForm.controls.artMovement.setValue(artMovement)
    this.filterForm.controls.country.setValue(country);
    this.filterForm.controls.genre.setValue(genre);
    this.filterForm.controls.color.setValue(color);
    this.filterForm.controls.minRuntime.setValue(minRuntime);
    this.filterForm.controls.maxRuntime.setValue(maxRuntime);
    this.filterForm.controls.startYear.setValue(startYear);
    this.filterForm.controls.endYear.setValue(endYear);

  }
  OnColorCheckBoxChange(name: string) {
    if (name == 'color') {
      this.color = !this.color;
    } else {
      this.blackWhite = !this.blackWhite; 
    }
  }

  onReload() {
    this.reload$.next();
    this.color = true;
    this.blackWhite = true;
    this.setFromValues(null, null, [""], null, "", this.minRuntime, this.maxRuntime,
      StaticData.years[0], StaticData.years[StaticData.years.length - 1]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerHeight < 600) {
      this.addClasses = true;
    } else {
      this.addClasses = false;
    }
  }
}
