import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MinimumMovie } from '@app/shared/models';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-movie-preview-mobile',
  templateUrl: './movie-preview-mobile.component.html',
  styleUrls: ['./movie-preview-mobile.component.css']
})
export class MoviePreviewMobileComponent implements OnInit {

  @Input() movie: MinimumMovie;
  @Output() OnMovieInformation = new EventEmitter<any>();
  showImage: boolean;
  options = {
    root: null,
    rootMargin: "1100px 0px 1100px 0px",
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
