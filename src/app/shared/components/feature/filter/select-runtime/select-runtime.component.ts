import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-runtime',
  templateUrl: './select-runtime.component.html',
  styleUrls: ['./select-runtime.component.css']
})
export class SelectRuntimeComponent implements OnInit {

  @Output() emitControl = new EventEmitter<FormControl>();
  @Input() reload$: Observable<any>;
  @Input('minValue') minValue: number;
  @Input('maxValue') maxValue: number;

  isAllChecked = false;
  minRuntime = new FormControl();
  maxRuntime = new FormControl();
  labelPosition = 'before';
  options: Options;
  checked = false;

  constructor() { }

  ngOnInit() {
    this.reload$.subscribe(
      ()=>{
        this.minValue=0;
        this.maxValue=600;
        this.minRuntime.setValue(this.minValue);
        this.maxRuntime.setValue(this.maxValue);
        this.onCheckBoxChange(false);
      }
    );
    this.options = {
      floor: this.minValue,
      ceil: this.maxValue,
      step: 5
    }

    this.setControlsValues(this.minValue, this.maxValue);
    this.minRuntime['name'] = 'minRuntime';
    this.maxRuntime['name'] = 'maxRuntime';
    this.emitControl.emit(this.minRuntime);
    this.emitControl.emit(this.maxRuntime);
  }

  onCheckBoxChange(checked: boolean) {
    this.checked = checked;
    if (checked) {
      this.setControlsValues(this.options.floor, this.options.ceil);
    } else {
      this.setControlsValues(this.minValue, this.maxValue);
    }
  }

  private setControlsValues(minRuntime: number, maxRuntime: number) {
    this.minRuntime.setValue(minRuntime);
    this.maxRuntime.setValue(maxRuntime);
  }

  minValueChanges(minValue: number) {
    if (minValue != this.minRuntime.value && !(this.isAllChecked)) {
      this.minRuntime.setValue(minValue);
    }
  }

  highValueChanges(maxValue: number) {
    if (maxValue != this.maxRuntime.value && !(this.isAllChecked)) {
      this.maxRuntime.setValue(maxValue);
    }
  }

}
