import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMovieButtonsComponent } from './share-movie-buttons.component';

describe('ShareMovieButtonsComponent', () => {
  let component: ShareMovieButtonsComponent;
  let fixture: ComponentFixture<ShareMovieButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMovieButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMovieButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
