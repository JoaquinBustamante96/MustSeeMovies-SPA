import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MinimunMovie } from '@app/core/models';
import { Uris } from '@app/core/uris-api';

@Component({
  selector: 'app-share-movie-buttons',
  templateUrl: './share-movie-buttons.component.html',
  styleUrls: ['./share-movie-buttons.component.css']
})
export class ShareMovieButtonsComponent implements OnInit {

  @Input() movie: MinimunMovie;

  theme = "circles-dark";
  include = ['pinterest','tumblr','twitter','whatsapp','facebook'];
  show = "2"
  size = "-6";
  url: string;
  title: string;
  description: string;
  image: string;

  constructor() {
    if(window.innerWidth>717){
      this.show="5";
    }
   }

  ngOnInit() {
    this.url = `${Uris.api}:30/movie/${this.movie.id}`;
    this.title = this.movie.name[0];
    this.description = `${this.movie.name[0]}: ${this.movie.storyline.substring(0,250)}...`;
    this.image = this.movie.getposterUrl();
  }

}
