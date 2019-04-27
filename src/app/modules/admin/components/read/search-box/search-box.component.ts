import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CrudService } from '@app/modules/admin/crud.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-box-admin',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponentAdmin implements OnInit, OnDestroy {

  @Output() searchValue = new EventEmitter();
  private values$ = new BehaviorSubject('');
  suggestions = [];
  subscriptionCrudService: Subscription;
  subscriptionValues: Subscription;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.subscriptionCrudService = this.crudService.getSuggestionsByName().subscribe(
      suggestions => this.suggestions = suggestions
    )
    this.subscriptionValues = this.values$.pipe(debounceTime(500), distinctUntilChanged()).subscribe(
      value => {
        if (value != "") {
          this.crudService.setSuggestionsByName(value)
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionCrudService.unsubscribe();
    this.subscriptionValues.unsubscribe();
  }

  onSearch(value, keycode) {
    const enterKey = 13;
    if (keycode != enterKey) {
      this.values$.next(value.trim());
    }
    else if (value.length != 0 && enterKey == keycode) {
      this.searchValue.emit(value);
    }
  }

}
