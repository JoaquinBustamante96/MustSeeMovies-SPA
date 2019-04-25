import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Movie } from '@app/core/models';

@Component({
  selector: 'app-movie-info-mobile',
  templateUrl: './movie-info-mobile.component.html',
  styleUrls: ['./movie-info-mobile.component.css']
})
export class MovieInfoMobileComponent implements OnInit, OnDestroy {

  @Input('movie') movie$: Observable<Movie>;


  optionSelected = "storyline";
  movie: Movie;
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

  selectOption(optionSelected: string) {
    this.optionSelected = optionSelected;
  }

}
