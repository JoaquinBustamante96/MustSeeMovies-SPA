import { Directive,Output,EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[onLoad]'
})
export class OnloadDirective implements AfterViewInit {

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngAfterViewInit(){
    setTimeout(() => this.initEvent.emit(), 1);
  }

}
