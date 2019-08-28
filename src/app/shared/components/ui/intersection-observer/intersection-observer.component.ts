import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-intersection-observer',
  template: '<div #intersection></div>',
  styleUrls: ['./intersection-observer.component.css']
})
export class IntersectionObserverComponent implements OnInit, OnDestroy {

  @ViewChild('intersection', { read: ElementRef, static: true }) intersection: ElementRef;
  @Output() entries = new EventEmitter<Observable<IntersectionObserverEntry[]>>();
  @Output() isInView = new EventEmitter<boolean>();
  @Input() options: IntersectionObserverInit;
  observer: IntersectionObserver;
  entries$ = new Subject<IntersectionObserverEntry[]>();

  constructor() { }

  ngOnInit() {
    if (!this.options) {
      this.options = {
        root: null,
        rootMargin: "0px",
        threshold: 0
      };
    }

    this.observer = new IntersectionObserver((entries) => {
      this.entries$.next(entries);
      if (entries[0].intersectionRatio >= 0.4) {
        this.isInView.emit(true)
      }
      else if (entries[0].intersectionRatio == 0 && !entries[0].isIntersecting) {
        this.isInView.emit(false);
      }

    }, this.options);

    this.observer.observe(this.intersection.nativeElement);
    this.entries.emit(this.entries$.asObservable());
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
