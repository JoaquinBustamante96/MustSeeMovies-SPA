import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { timeout } from 'q';

@Directive({
  selector: '[appPasswrodVisibility]'
})
export class PasswrodVisibilityDirective {

  @Input('appPasswrodVisibility') show: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    if (this.show) {
      this.el.nativeElement.setAttribute('type', 'text');
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
    }
  }

}
