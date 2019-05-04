import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MinimunMovie } from '@app/core/models';
import { Uris } from '@app/core/uris-api';
import { UrisModules } from '@app/core/routed-modules-uris';

@Component({
  selector: 'app-share-movie-buttons',
  templateUrl: './share-movie-buttons.component.html',
  styleUrls: ['./share-movie-buttons.component.css']
})
export class ShareMovieButtonsComponent implements OnInit {

  @Input() movie: MinimunMovie;
  @Input() show: string;
  theme = "circles-dark";
  include = ['pinterest', 'tumblr', 'twitter', 'whatsapp', 'facebook'];
  size = "-7";
  url: string;
  title: string;
  description: string;
  image: string;

  constructor() {
  
  }

  ngOnInit() {
    this.url = `https://moviesmustsee.com${UrisModules.movie}/${this.movie.id}`;
    this.title = this.movie.name[0];
    this.description = `${this.movie.name[0]}: ${this.movie.storyline.substring(0, 250)}...`;
    this.image = this.movie.getposterUrl();
  }

}
