import { Component, OnInit, OnDestroy } from '@angular/core';
import { MinimunMovie } from '@app/core/models';
import { Filter } from '../../filter.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { HandleMoviesService } from '../../services/handleMoviesService';
import { UrisModules } from '@app/core/routed-modules-uris';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})

export class MainPageComponent implements OnInit{

  movies$: Observable<Array<MinimunMovie>>;
  showFilter = true;
  movieSubscription: Subscription;
  mobileRange = [0, 716];
  desktopRange = [717, 9000];

  constructor(private router: Router,
    private handleMoviesService: HandleMoviesService) { }

  ngOnInit() {
    this.movies$ = this.handleMoviesService.getMovies$();

    if (this.handleMoviesService.isMoviesEmpty()) {
      this.searchByFilter(
        {
          artMovement: "", country: "", genre: [""],
          language: "", color: "", sound: "", minRuntime: 0,
          maxRuntime: 600, startYear: "1880", endYear: "2020"
        });
    }
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

  showHideFilter() {
    this.showFilter = !this.showFilter;
  }

  scrolltop(){
    window.scrollTo(0,0);
  }
  
}
