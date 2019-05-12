import { Component, OnInit } from '@angular/core';
import { MinimumMovie } from '@app/core/models';
import { Filter } from '../../../../core/models/filter.model';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { HandleMoviesService } from '../../../../core/services/handleMovies.service';
import { UrisModules } from '@app/core/routed-modules-uris';
import { SearchType } from '../../searchType.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomePageComponent implements OnInit {

  movies$: Observable<Array<MinimumMovie>>;
  movieSubscription: Subscription;
  routerSubscription: Subscription;
  mobileRange = [0, 716];
  desktopRange = [717, 9000];
  optionSelected = SearchType.latest;

  constructor(private router: Router,
    private handleMoviesService: HandleMoviesService) { }

  ngOnInit() {
    this.movies$ = this.handleMoviesService.getMovies$();
    this.handleMoviesService.getSearchType().subscribe(
      searchType => this.optionSelected = searchType
    )
  }

  searchLatest() {
    this.handleMoviesService.searchLatest();
  }

  onIntersection() {
    this.handleMoviesService.nextPage();
  }

  searchByFilter(filter: Filter) {
    this.handleMoviesService.searchByFilter(filter);
  }

  searchByName(name: string) {
    this.handleMoviesService.searchByName(name);
  }

  OnMovieInformation(id: string) {
    this.router.navigate([UrisModules.movie, id]);
  }

  scrolltop() {
    window.scrollTo(0, window.innerHeight * 80 / 100);
  }

}
