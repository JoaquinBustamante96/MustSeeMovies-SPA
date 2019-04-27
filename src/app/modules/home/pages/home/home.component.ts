import { Component, OnInit } from '@angular/core';
import { MinimunMovie } from '@app/core/models';
import { Filter } from '../../../../core/models/filter.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { HandleMoviesService } from '../../../../core/services/handleMovies.service';
import { UrisModules } from '@app/core/routed-modules-uris';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomePageComponent implements OnInit{

  movies$: Observable<Array<MinimunMovie>>;
  movieSubscription: Subscription;
  mobileRange = [0, 716];
  desktopRange = [717, 9000];

  constructor(private router: Router,
    private handleMoviesService: HandleMoviesService) { }

  ngOnInit() {
    this.movies$ = this.handleMoviesService.getMovies$();
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

  scrolltop(){
    window.scrollTo(0,window.innerHeight * 80 / 100);
  }
  
}
