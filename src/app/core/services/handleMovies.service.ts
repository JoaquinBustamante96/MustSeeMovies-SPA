import { Injectable } from '@angular/core';
import { Page, MinimunMovie } from '@app/core/models';
import { Filter } from '../models/filter.model';
import { SearchType } from '../../modules/home/searchType.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})

export class HandleMoviesService {

  private movies$: BehaviorSubject<Array<MinimunMovie>> = new BehaviorSubject([]);
  private moviesPage: Page<MinimunMovie>;
  private filter: Filter;
  private name: string;
  private searchType: SearchType;
  private size = 3;
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

  getMovies$(): Observable<Array<MinimunMovie>> {
    return this.movies$.asObservable();
  }

  searchByFilter(filter: Filter) {
    if (!this.filter || !this.compareFilter(filter) || this.searchType != SearchType.byFilter) {
      this.searchType = SearchType.byFilter;
      this.pageNumber = 0;
      this.filter = filter;
      this.movieService.FilterMoviePage(this.filter, this.pageNumber, this.size);
    }
  }

  searchByName(name: string) {
    if (this.name != name || this.searchType != SearchType.byName) {
      this.name = name;
      this.searchType = SearchType.byName;
      this.pageNumber = 0;
      this.movieService.searchByName(this.name, this.pageNumber, this.size);
    }
  }

  nextPage() {
    if (this.pageNumber < this.moviesPage.totalPages - 1) {
      this.pageNumber++;
      switch (this.searchType) {
        case SearchType.byFilter:
          this.movieService.FilterMoviePage(this.filter, this.pageNumber, this.size);
          return;
          
        case SearchType.byName:
          this.movieService.searchByName(this.name, this.pageNumber, this.size);
          return;
      }
    }
  }

  isMoviesEmpty(): boolean {
    return this.movies$.value.length == 0;
  }

  private initialSearch() {
    this.searchByFilter({
      artMovement: "", country: "", region: "", genre: [""],
      language: "", color: "", sound: "", minRuntime: 0,
      maxRuntime: 600, startYear: "1880", endYear: "2020"
    });
  }

  private compareFilter(filter: Filter) {
    if (this.filter && JSON.stringify(this.filter) == JSON.stringify(filter)) {
      return true;
    } else {
      return false;
    }

  }

}
