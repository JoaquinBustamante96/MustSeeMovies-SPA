import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-show-hide-password-icon',
  templateUrl: './show-hide-password-icon.component.html',
  styleUrls: ['./show-hide-password-icon.component.css']
})
export class ShowHidePasswordIconComponent implements OnInit {

  @Output('showPassword') visiblity = new EventEmitter<boolean>();
  @Input('show') show: boolean;

  constructor() { }

  ngOnInit() {
  }

  showHidePassword() {
    this.visiblity.emit(!this.show);
  }

}
