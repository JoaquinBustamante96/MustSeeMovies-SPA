import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MinimunMovie } from '@app/core/models';


@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {

  @Input() movie: MinimunMovie;
  @Output() OnMovieInformation = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onMovieInformation() {
    this.OnMovieInformation.emit(this.movie);
  }

}
