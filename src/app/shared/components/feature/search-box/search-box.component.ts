import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MovieService } from '@app/core/services';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @Output() searchValue = new EventEmitter<string>();

  suggestions: string[];
  values$ = new Subject<string>();
  subscriptionMovieService: Subscription;
  subscriptionValues: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.subscriptionMovieService = this.movieService.getSuggestionsByName().subscribe(
      suggestions => this.suggestions = suggestions
    )
    this.subscriptionValues = this.values$.pipe(debounceTime(300), distinctUntilChanged()).subscribe(
      value => this.movieService.setSuggestionsByName(value)
    )
  }

  ngOnDestroy() {
    this.subscriptionMovieService.unsubscribe();
    this.subscriptionValues.unsubscribe();
  }

  onSearch(value, keycode) {
    const enterKey = 13;
    if (keycode != enterKey) {
      this.values$.next(value.trim());
    }
    else if (value.length != 0 && enterKey == keycode) {
      this.searchValue.emit(value.trim());
    }
  }

}
