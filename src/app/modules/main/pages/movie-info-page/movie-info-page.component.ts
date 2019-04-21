import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../index';
import { Movie } from '@app/core/models';
import { Subscription, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-info-page',
  templateUrl: './movie-info-page.component.html',
  styleUrls: ['./movie-info-page.component.css']
})
export class MovieInfoPageComponent implements OnInit, OnDestroy {

  id = new BehaviorSubject<string>("");
  movie$ = new BehaviorSubject<Movie>(new Movie());
  subscription: Subscription;
  paramsSubscription: Subscription;
  show: boolean;
  Delay=3000;
  mobileRange = [0, 716];
  desktopRange = [717, 9000];

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    ) {   }

  ngOnInit() {
    this.subscription = this.id.pipe(filter(id => id != ""))
      .subscribe(
        id => {
          const subscription = this.movieService.getMovie(id)
            .subscribe(
              movie => {
                this.movie$.next(movie);
                this.show = true;
                subscription.unsubscribe();
                
              }
            )
        }
      )
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      param => {
        this.id.next(param.id);
        this.show = false;
      }
    )
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  loadMovieInfo(id: string) {
    this.id.next(id);
  }

}
