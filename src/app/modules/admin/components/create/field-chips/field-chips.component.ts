import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, ErrorStateMatcher } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'field-chips',
  templateUrl: './field-chips.component.html',
  styleUrls: ['./field-chips.component.css']
})
export class FieldChipsComponent implements OnInit {


  @Output() emitControl = new EventEmitter<FormControl>();
  @Output() emitValues = new EventEmitter<string>();
  @Output('indexRemove') emitRemoveValues = new EventEmitter<number>();
  @Input() fieldValues: string[];
  @Input() placeholder: string;
  @Input() errorMessage: string;

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsCtrl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  matcher = new ErrorStateMatcher();

  constructor() { }

  ngOnInit() {
    this.emitControl.emit(this.chipsCtrl);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.emitValues.emit(value);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(option: string): void {
    const index = this.fieldValues.indexOf(option);
    if (index >= 0) {
      this.emitRemoveValues.emit(index)
    }
  }

  isFieldValid(): boolean {
    return !this.chipsCtrl.valid;
  }

}
