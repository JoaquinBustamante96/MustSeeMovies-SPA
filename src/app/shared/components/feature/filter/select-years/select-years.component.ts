import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-select-years',
  templateUrl: './select-years.component.html',
  styleUrls: ['./select-years.component.css']
})
export class SelectYearsComponent implements OnInit, OnDestroy {
  @Input() years: number[];
  @Input() reload$: Observable<any>;

  @Output() emitControl = new EventEmitter<FormControl>();
  @Output() checkBoxSelected = new EventEmitter<boolean>();

  labelPosition = 'before';
  startYear: FormControl;
  endYear: FormControl;
  checked = false;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {

    this.subscription = this.reload$.subscribe(
      () => this.onCheckBoxChange(false)
    );

    this.startYear = new FormControl(this.years[0]);
    this.endYear = new FormControl(this.years[this.years.length - 1]);

    this.startYear['name'] = 'startYear';
    this.endYear['name'] = 'endYear';
    this.emitControl.emit(this.startYear);
    this.emitControl.emit(this.endYear);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  onCheckBoxChange(checked: boolean) {
    this.checked = checked;
    this.checkBoxSelected.emit(checked);
  }

}
