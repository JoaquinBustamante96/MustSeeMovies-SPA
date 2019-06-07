import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css']
})
export class SigninDialogComponent implements OnInit {

  @Input() open: Observable<any>;
  showDialog: boolean;
  showAuth: boolean;
  optionSelected: string;

  constructor() { }

  ngOnInit() {
    this.open.subscribe(
      show => {
        this.optionSelected = null;
        this.showDialog = true;
      }
    )
  }

  closeDialog() {
    this.showDialog = false;
  }

  openAuth(option: string) {
    this.closeDialog();
    this.showAuth = true;
    this.optionSelected = option;
  }

  closeAuth(){
    this.showAuth = false;
    this.optionSelected = null;
  }


}
