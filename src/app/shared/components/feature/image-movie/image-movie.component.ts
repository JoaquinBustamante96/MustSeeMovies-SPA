import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MinimumMovie } from '@app/core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-movie',
  templateUrl: './image-movie.component.html',
  styleUrls: ['./image-movie.component.css']
})
export class ImageMovieComponent implements OnInit, OnDestroy {

  @Input() movie: MinimumMovie;
  @Output() OnMovieInformation = new EventEmitter<any>();
  showImage = false;
  entriesSubscription: Subscription;
  options= {
    root: null,
    rootMargin: "1100px 0px 1100px 0px",
    threshold: 0
  }

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.entriesSubscription) {
      this.entriesSubscription.unsubscribe();
    }
  }

  onMovieInformation() {
    this.OnMovieInformation.emit(this.movie);
  }

  onViewChange(isInView: boolean) {
    this.showImage = isInView;
  }


}
