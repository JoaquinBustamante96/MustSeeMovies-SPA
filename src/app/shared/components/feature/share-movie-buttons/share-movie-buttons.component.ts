import { Component, OnInit, Input } from '@angular/core';
import { MinimumMovie } from '@app/core/models';
import { UrisModules } from '@app/core/routed-modules-uris';

@Component({
  selector: 'app-share-movie-buttons',
  templateUrl: './share-movie-buttons.component.html',
  styleUrls: ['./share-movie-buttons.component.css']
})
export class ShareMovieButtonsComponent implements OnInit {

  @Input() movie: MinimumMovie;
  @Input() show: string;
  theme = "circles-dark";
  include = ['facebook','tumblr','pinterest', 'twitter', 'whatsapp'];
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
    this.image = this.movie.getposterUrl();
  }

}
