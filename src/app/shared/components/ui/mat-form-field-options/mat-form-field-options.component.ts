import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-form-field-options',
  templateUrl: './mat-form-field-options.component.html',
  styleUrls: ['./mat-form-field-options.component.css']
})
export class MatFormFieldOptionsComponent implements OnInit {

  @Input() placeholder: string;
  @Input() options: string[];
  @Output() emitControl = new EventEmitter();

  formControl = new FormControl();

  constructor() { }

  ngOnInit() {
    this.emitControl.emit(this.formControl);
  }

}
