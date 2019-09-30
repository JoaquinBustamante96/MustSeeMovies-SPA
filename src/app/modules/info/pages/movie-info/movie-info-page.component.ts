import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@app/core/services';
import { Movie } from '@app/shared/models';
import { Subscription, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SEOService } from '@app/core/services/seo.service';

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
  Delay = 3000;
  mobileRange = [0, 771];
  desktopRange = [772, 9000];

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private seoService: SEOService,
  ) { }

  ngOnInit() {
    this.subscription = this.id.pipe(filter(id => id != ""))
      .subscribe(
        id => {
          const subscription = this.movieService.getMovie(id)
            .subscribe(
              movie => {
                this.seoService.addTagsForMovie(movie);
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
