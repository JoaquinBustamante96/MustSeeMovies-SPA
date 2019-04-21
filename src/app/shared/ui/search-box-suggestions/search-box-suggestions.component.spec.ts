import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxSuggestionsComponent } from './search-box-suggestions.component';

describe('SearchBoxSuggestionsComponent', () => {
  let component: SearchBoxSuggestionsComponent;
  let fixture: ComponentFixture<SearchBoxSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
