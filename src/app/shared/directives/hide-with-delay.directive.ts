import { Directive, TemplateRef, ViewContainerRef, Input, AfterContentInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appHideWithDelay]'
})
export class hideWithDelayDirective implements AfterContentInit {

  hasView: boolean;
  delay: number;
  show = new BehaviorSubject<boolean>(true);
  @Input() appHideWithDelayDelay: number;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngAfterContentInit() {
    this.show.subscribe(
      value => {
        if (value && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!value && this.hasView) {
          setTimeout(() => {
            this.viewContainer.clear();
            this.hasView = false;
          }, this.appHideWithDelayDelay);
        }
      }
    )
  }

  @Input() set appHideWithDelay(show: boolean) {
    this.show.next(show);
  }

}
