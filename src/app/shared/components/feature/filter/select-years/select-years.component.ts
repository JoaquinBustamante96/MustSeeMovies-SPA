import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-years',
  templateUrl: './select-years.component.html',
  styleUrls: ['./select-years.component.css']
})
export class SelectYearsComponent implements OnInit {
  @Input() years: number[];
  @Input() reload$: Observable<any>;

  @Output() emitControl = new EventEmitter<FormControl>();
  @Output() allChange = new EventEmitter<boolean>();

  labelPosition = 'before';
  startYear: FormControl;
  endYear: FormControl;
  checked = false;

  constructor() { }

  ngOnInit() {

    this.reload$.subscribe(
      () => this.onAllChange(false)
    );

    this.startYear = new FormControl(this.years[0]);
    this.endYear = new FormControl(this.years[this.years.length - 1]);

    this.startYear['name'] = 'startYear';
    this.endYear['name'] = 'endYear';
    this.emitControl.emit(this.startYear);
    this.emitControl.emit(this.endYear);
  }

  onAllChange(checked: boolean) {
    this.checked = checked;
    this.allChange.emit(checked);
  }

}
