import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-box-suggestions',
  templateUrl: './search-box-suggestions.component.html',
  styleUrls: ['./search-box-suggestions.component.css']
})
export class SearchBoxSuggestionsComponent {

  @Output() onSearch = new EventEmitter<any>();
  @Input() suggestions: string[];
  @Input() placeholder: string;

  constructor() { }

  search(value, keycode) {
    this.onSearch.emit({ value: value, keycode: keycode })
  }

}
