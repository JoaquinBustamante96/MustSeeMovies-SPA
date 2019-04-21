import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'app-genre-field',
  templateUrl: './genre-field.component.html',
  styleUrls: ['./genre-field.component.css']
})
export class GenreFieldComponent implements OnInit {

  @Output('emitControl') emitCtrl = new EventEmitter<FormControl>(); 
  @Output() emitValues = new EventEmitter<string>();
  @Output('indexRemove') emitRemoveValues = new EventEmitter<number>();
  @Input() fieldValues:string[];
  @Input() placeholder:string;
  @Input() errorMessage:string;
  @Input() suggestions:string[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  valuesControl = new FormControl('',Validators.required);
  matcher = new ErrorStateMatcher();

  constructor(){}

  ngOnInit(){
    this.emitCtrl.emit(this.valuesControl);
  }

  addChip(value :string){
    this.emitValues.emit(value);
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

  remove(genre: string): void {
    const index = this.fieldValues.indexOf(genre);
    if (index >= 0) {
      this.emitRemoveValues.emit(index)
    }
  }

}
