import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Movie } from '@app/shared/models';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit, OnDestroy {
  @Input('movie') movie$: Observable<Movie>;

  movie: Movie;
  genres: string;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {

    this.subscription = this.movie$.pipe(
      filter(
        movie => movie.id != undefined
      )
    ).subscribe(
      movie => {
        this.movie = movie;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
