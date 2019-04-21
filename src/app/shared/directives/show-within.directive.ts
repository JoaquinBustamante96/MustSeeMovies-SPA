import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, HostListener, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appShowWithin]'
})
export class ShowWithinDirective implements OnInit, OnDestroy {

  private minWidth: number;
  private maxWidth: number;
  private isInRage: boolean;
  private listener: () => void;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.showIfInRange(window.innerWidth);
    this.listener = this.renderer.listen("window", "resize", (event) => this.onResize(event));
  }

  ngOnDestroy() {
    if(this.listener){
      this.listener();
    }
  }

  @Input() set appShowWithin(range: number[]) {
    this.minWidth = range[0];
    this.maxWidth = range[1];
  };

  private showIfInRange(windowWidth: number) {
    if (this.minWidth < windowWidth && windowWidth < this.maxWidth && !this.isInRage) {
      this.isInRage = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else if ((window.innerWidth > this.maxWidth || window.innerWidth < this.minWidth) && this.isInRage) {
      this.isInRage = false;
      this.viewContainer.clear();
    }
  }

  private onResize(event: any) {
    this.showIfInRange(window.innerWidth);
  }

}
