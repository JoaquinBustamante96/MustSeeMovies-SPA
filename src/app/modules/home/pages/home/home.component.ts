import { Component, OnInit, OnDestroy } from '@angular/core';
import { MinimumMovie } from '@app/core/models';
import { Filter } from '../../../../core/models/filter.model';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { HandleMoviesService } from '../../../../core/services/handleMovies.service';
import { UrisModules } from '@app/core/routed-modules-uris';
import { SearchType } from '../../searchType.model';
import { AuthenticationService } from '@app/core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomePageComponent implements OnInit, OnDestroy {

  movies$: Observable<Array<MinimumMovie>>;
  searchTypeSubscription: Subscription;
  authSubscription: Subscription;
  mobileRange = [0, 716];
  desktopRange = [717, 9000];
  optionSelected = 'latest';
  hasSignIn: boolean;
  showSignInDialog$ = new Subject<any>();

  constructor(private router: Router,
    private handleMoviesService: HandleMoviesService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    
    this.movies$ = this.handleMoviesService.getMovies$();
    this.searchTypeSubscription = this.handleMoviesService.getSearchType().subscribe(
      searchType => {
        if (searchType == SearchType.byList) {
          if (this.handleMoviesService.getListName() == 'Watched') {
            this.optionSelected = 'watched';
          } else {
            this.optionSelected = 'watchlater'
          }
        }
        else if (searchType == SearchType.latest) {
          this.optionSelected = 'latest'
        } else {
          this.optionSelected = 'none';
        }

      }
    )

    this.authSubscription = this.authService.getHasSignIn().subscribe(
      hasSignIn => {
        this.hasSignIn = hasSignIn;
      }
    );

  }

  ngOnDestroy() {
    this.searchTypeSubscription.unsubscribe();
  }

  // onSearch(searchType: SearchType) {
  //   switch (searchType){
  //     case SearchType.byFilter
  //     return;
  //     case SearchType.
  //   }
  // }

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

  searchList(list: string) {
    if (list != 'latest' && !this.hasSignIn) {
      this.openSignInDialog();
    } else {
      this.handleMoviesService.searchBylist(list);
    }
  }

  openSignInDialog() {
    this.showSignInDialog$.next();
  }

  OnMovieInformation(id: string) {
    this.router.navigate([UrisModules.movie, id]);
  }

  scrolltop() {
    window.scrollTo(0, window.innerHeight * 80 / 100);
  }

}
