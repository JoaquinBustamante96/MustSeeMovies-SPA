import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MinimumMovie } from '@app/shared/models';
import { MovieService } from '@app/core/services';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UrisModules } from '@app/core/routed-modules-uris';


@Component({
  selector: 'app-gallery-movies',
  templateUrl: './gallery-movies.component.html',
  styleUrls: ['./gallery-movies.component.css']
})

export class GalleryMoviesComponent implements OnInit, OnDestroy {

  @Input() id: Observable<string>;
  @Output() onMovieSelected = new EventEmitter();
  redirectToInfoPage = UrisModules.movie;
  idSubscription: Subscription;
  movies: Array<MinimumMovie>;
  page: number = 0;
  size: number = 3;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.idSubscription = this.movieService.getRelatedMoviesPage().subscribe(
      moviesPage => this.movies = moviesPage.content
    )
    this.id.subscribe(
      id => this.movieService.setRelatedMovies(id, this.page, this.size)
    );
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  onMovieInformation(id: string) {
    this.router.navigate([this.redirectToInfoPage, id]);
    this.onMovieSelected.emit(id);
  }

}
