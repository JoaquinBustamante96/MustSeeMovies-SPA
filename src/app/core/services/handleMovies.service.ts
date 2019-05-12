import { Injectable } from '@angular/core';
import { Page, MinimumMovie } from '@app/core/models';
import { Filter } from '../models/filter.model';
import { SearchType } from '../../modules/home/searchType.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})

export class HandleMoviesService {

  private movies$: BehaviorSubject<Array<MinimumMovie>> = new BehaviorSubject([]);
  private moviesPage: Page<MinimumMovie>;
  private filter: Filter;
  private name: string;
  private searchType = new BehaviorSubject<SearchType>(SearchType.latest);
  private size = 3;
  private direction = "DESC";
  private pageNumber: number;

  constructor(private movieService: MovieService) {
    this.movieService.getMoviesPage().subscribe(
      page => {
        this.moviesPage = page;
        if (this.moviesPage.pageable.pageNumber == 0) {
          this.movies$.next(this.moviesPage.content);
        } else {
          this.movies$.next([...this.movies$.value, ...this.moviesPage.content])
        }
      }
    );
    this.initialSearch();
  }

  getMovies$(): Observable<Array<MinimumMovie>> {
    return this.movies$.asObservable();
  }

  searchLatest() {
    if (this.searchType.value != SearchType.latest) {
      this.searchType.next(SearchType.latest);
      this.pageNumber = 0;
      this.movieService.searchMinimumPage(this.pageNumber, this.size, this.direction);
    }
  }

  searchByFilter(filter: Filter) {
    if (!this.filter || !this.compareFilter(filter) || this.searchType.value != SearchType.byFilter) {
      this.searchType.next(SearchType.byFilter);
      this.pageNumber = 0;
      this.filter = filter;
      this.movieService.FilterMoviePage(this.filter, this.pageNumber, this.size);
    }
  }

  searchByName(name: string) {
    if (this.name != name || this.searchType.value != SearchType.byName) {
      this.name = name;
      this.searchType.next(SearchType.byName);
      this.pageNumber = 0;
      this.movieService.searchByName(this.name, this.pageNumber, this.size);
    }
  }

  nextPage() {
    if (this.pageNumber < this.moviesPage.totalPages - 1) {
      this.pageNumber++;
      switch (this.searchType.value) {
        case SearchType.byFilter:
          this.movieService.FilterMoviePage(this.filter, this.pageNumber, this.size);
          return;

        case SearchType.byName:
          this.movieService.searchByName(this.name, this.pageNumber, this.size);
          return;

        case SearchType.latest:
          this.movieService.searchMinimumPage(this.pageNumber, this.size, this.direction)
          return;
      }
    }
  }

  getSearchType(): Observable<SearchType> {
    return this.searchType.asObservable();
  }

  private initialSearch() {
    this.pageNumber = 0;
    this.movieService.searchMinimumPage(this.pageNumber, this.size, this.direction);
  }

  private compareFilter(filter: Filter) {
    if (this.filter && JSON.stringify(this.filter) == JSON.stringify(filter)) {
      return true;
    } else {
      return false;
    }

  }

}
