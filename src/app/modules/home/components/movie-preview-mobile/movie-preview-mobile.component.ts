import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MinimunMovie } from '@app/core/models';

@Component({
  selector: 'app-movie-preview-mobile',
  templateUrl: './movie-preview-mobile.component.html',
  styleUrls: ['./movie-preview-mobile.component.css']
})
export class MoviePreviewMobileComponent implements OnInit {

  @Input() movie: MinimunMovie;
  @Output() OnMovieInformation = new EventEmitter<any>();
  showImage: boolean;
  options = {
    root: null,
    rootMargin: "1000px 0px 1000px 0px",
    threshold: 0
  }

  constructor() { }

  ngOnInit() { }

  onMovieInformation() {
    this.OnMovieInformation.emit(this.movie);
  }

  onViewChange(isInView: boolean) {
    this.showImage = isInView;
  }

}
