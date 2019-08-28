import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-intersection-observer-list',
  template: '<div #intersection></div>',
  styleUrls: ['./intersection-observer.component.css']
})
export class IntersectionObserverListComponent implements OnInit, OnDestroy {

  @Input() list: Observable<any>;
  @Output() onIntersection = new EventEmitter();
  @ViewChild('intersection', { read: ElementRef, static: true }) intersection: ElementRef;
  observer: IntersectionObserver;
  emit = true;

  constructor() { }

  ngOnInit() {
    this.list.subscribe(
      () => this.emit = true
    );
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && this.emit) {
        this.emit = false;
        this.onIntersection.emit();
      }
    }, options);
    this.observer.observe(this.intersection.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}
